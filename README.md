# CoAgents Starter

## Project Overview

This project is a starter template for building agent-powered dashboards using CopilotKit. It consists of:

- **JavaScript Agent (`agent-js/`)**: A Node.js-based agent that powers the backend logic and connects to CopilotKit.
- **Next.js UI Dashboard (`ui/`)**: A modern dashboard interface where you can interact with the agent, add/update/remove chart modules, and see results in real time.
- **Mock Server (`mock-server/`)**: An optional local server to simulate API responses for development and testing.

---

## How to Run Everything Locally

### 1. Start the JavaScript Agent

```sh
cd agent-js
pnpm install
# Add your OpenAI API key to .env
echo "OPENAI_API_KEY=your-key-here" > .env
pnpm run dev
```

### 2. Start the Mock Server (Optional)

```sh
cd mock-server
npm install
npm start
```

- This is only needed if you want to simulate API responses for the dashboard.
- The mock server runs on port 4000 by default.

### 3. Start the UI Dashboard

```sh
cd ui
pnpm install
pnpm run dev
```

### 4. Open the Dashboard

- Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

**Note:**

- The `.devcontainer/` and `.codesandbox/` folders are optional and only needed for special development environments (VS Code Dev Containers or CodeSandbox). You do not need them for local development.
- Make sure your `.env` files are set up with valid API keys for the agent and mock server if required.

---

That's it! You now have all components running locally and can develop or test your agent-powered dashboard.
