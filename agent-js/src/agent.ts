/**
 * This is the main entry point for the agent.
 * It defines the workflow graph, state, tools, nodes and edges.
 *
 * To use Azure OpenAI, set the following environment variables:
 *   AZURE_OPENAI_API_KEY
 *   AZURE_OPENAI_INSTANCE_NAME
 *   AZURE_OPENAI_DEPLOYMENT_NAME
 *   AZURE_OPENAI_API_VERSION (optional, defaults to '2024-02-15-preview')
 *
 * If these are not set, the agent will use standard OpenAI with OPENAI_API_KEY.
 */

import { z } from "zod";
import { RunnableConfig } from "@langchain/core/runnables";
import { tool } from "@langchain/core/tools";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { AIMessage, SystemMessage } from "@langchain/core/messages";
import { MemorySaver, START, StateGraph } from "@langchain/langgraph";
import { Annotation } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";

// 1. Import necessary helpers for CopilotKit actions
import { convertActionsToDynamicStructuredTools } from "@copilotkit/sdk-js/langgraph";
import { CopilotKitStateAnnotation } from "@copilotkit/sdk-js/langgraph";

// 2. Define our agent state, which includes CopilotKit state to
//    provide actions to the state.
export const AgentStateAnnotation = Annotation.Root({
  language: Annotation<"english" | "spanish">,
  ...CopilotKitStateAnnotation.spec,
});

// 3. Define the type for our agent state
export type AgentState = typeof AgentStateAnnotation.State;

// 4. Define tools to get market movers and stock history from the mock server
const getMarketMovers = tool(
  async (args) => {
    console.log("getMarketMovers called with args:", args);
    const res = await fetch("http://localhost:4000/api/market-movers");
    return await res.json();
  },
  {
    name: "getMarketMovers",
    description: "Get the current market movers (top gainers/losers)",
    schema: z.object({}),
  }
);

const getStockHistory = tool(
  async (args) => {
    console.log("getStockHistory called with args:", args);
    const res = await fetch(
      `http://localhost:4000/api/stock-history?ticker=${args.ticker}`
    );
    return await res.json();
  },
  {
    name: "getStockHistory",
    description: "Get historical stock data for a given ticker symbol",
    schema: z.object({
      ticker: z.string().describe("The ticker symbol to get history for"),
    }),
  }
);

// 5. Put our tools into an array
const tools = [getMarketMovers, getStockHistory];

// --- Azure/OpenAI config helper ---
function getChatOpenAI() {
  const azureKey = process.env.AZURE_OPENAI_API_KEY;
  const azureInstance = process.env.AZURE_OPENAI_INSTANCE_NAME;
  const azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
  const azureApiVersion =
    process.env.AZURE_OPENAI_API_VERSION || "2024-02-15-preview";

  if (azureKey && azureInstance && azureDeployment) {
    // Use Azure OpenAI
    return new ChatOpenAI({
      azure: true,
      azureOpenAIApiKey: azureKey,
      azureOpenAIApiInstanceName: azureInstance,
      azureOpenAIApiDeploymentName: azureDeployment,
      azureOpenAIApiVersion: azureApiVersion,
      temperature: 0,
      model: "gpt-4o",
    });
  } else {
    // Use standard OpenAI
    return new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
      model: "gpt-4o",
    });
  }
}

// 6. Define the chat node, which will handle the chat logic
async function chat_node(state: AgentState, config: RunnableConfig) {
  // 6.1 Define the model, lower temperature for deterministic responses
  const model = getChatOpenAI();

  // 6.2 Bind the tools to the model, include CopilotKit actions. This allows
  //     the model to call tools that are defined in CopilotKit by the frontend.
  const modelWithTools = model.bindTools!([
    ...convertActionsToDynamicStructuredTools(state.copilotkit?.actions || []),
    ...tools,
  ]);

  // 6.3 Define the system message, which will be used to guide the model, in this case
  //     we also add in the language to use from the state.
  const systemMessage = new SystemMessage({
    content: `You are a helpful assistant. Talk in ${
      state.language || "english"
    }.`,
  });

  const response = await modelWithTools.invoke(
    [systemMessage, ...state.messages],
    config
  );

  // 6.5 Return the response, which will be added to the state
  return {
    messages: response,
  };
}

// 7. Define the function that determines whether to continue or not,
//    this is used to determine the next node to run
function shouldContinue({ messages, copilotkit }: AgentState) {
  // 7.1 Get the last message from the state
  const lastMessage = messages[messages.length - 1] as AIMessage;

  // 7.2 If the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage.tool_calls?.length) {
    const actions = copilotkit?.actions;
    const toolCallName = lastMessage.tool_calls![0].name;

    // 7.3 Only route to the tool node if the tool call is not a CopilotKit action
    if (
      !actions ||
      actions.every((action: any) => action.name !== toolCallName)
    ) {
      return "tool_node";
    }
  }

  // 7.4 Otherwise, we stop (reply to the user) using the special "__end__" node
  return "__end__";
}

// Define the workflow graph
const workflow = new StateGraph(AgentStateAnnotation)
  .addNode("chat_node", chat_node)
  .addNode("tool_node", new ToolNode(tools))
  .addEdge(START, "chat_node")
  .addEdge("tool_node", "chat_node")
  .addConditionalEdges("chat_node", shouldContinue as any);

const memory = new MemorySaver();

export const graph = workflow.compile({
  checkpointer: memory,
});
