// Import React correctly
import React from "react"; // <-- Fixed this line

// --- Widget Components ---

// Placeholder Portfolio Summary Widget
const PortfolioSummary = () => (
  // Container for the portfolio summary widget
  <div className="bg-gray-800 p-4 rounded-lg shadow-md h-full flex flex-col justify-between">
    <div>
      {/* Widget Title */}
      <h2 className="text-lg font-semibold text-gray-300 mb-2">
        Portfolio Overview
      </h2>
      {/* Total Portfolio Value */}
      <p className="text-3xl font-bold text-white">$5,250,430.80</p>
      {/* Daily Change */}
      <p className="text-sm text-green-400 mt-1">+1.25% (+ $64,820.15) Today</p>
    </div>
    {/* Timestamp */}
    <div className="mt-4">
      <p className="text-sm text-gray-400">As of: 27 Apr 2025, 1:30 PM BST</p>
    </div>
  </div>
);

// Placeholder Asset Allocation Widget
const AssetAllocation = () => (
  // Container for the asset allocation widget
  <div className="bg-gray-800 p-4 rounded-lg shadow-md h-full">
    {/* Widget Title */}
    <h2 className="text-lg font-semibold text-gray-300 mb-3">
      Asset Allocation
    </h2>
    {/* Simple bar chart representation using divs */}
    <div className="space-y-2">
      {/* Equities */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Equities</span>
        <span className="text-sm text-white font-medium">60%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        {/* Progress bar for Equities */}
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: "60%" }}
        ></div>
      </div>

      {/* Fixed Income */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-gray-400">Fixed Income</span>
        <span className="text-sm text-white font-medium">25%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        {/* Progress bar for Fixed Income */}
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: "25%" }}
        ></div>
      </div>

      {/* Alternatives */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-gray-400">Alternatives</span>
        <span className="text-sm text-white font-medium">10%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        {/* Progress bar for Alternatives */}
        <div
          className="bg-yellow-500 h-2 rounded-full"
          style={{ width: "10%" }}
        ></div>
      </div>

      {/* Cash */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-gray-400">Cash</span>
        <span className="text-sm text-white font-medium">5%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        {/* Progress bar for Cash */}
        <div
          className="bg-gray-500 h-2 rounded-full"
          style={{ width: "5%" }}
        ></div>
      </div>
    </div>
  </div>
);

// Placeholder Market Movers Widget
const MarketMovers = () => (
  // Container for the market movers widget
  <div className="bg-gray-800 p-4 rounded-lg shadow-md h-full">
    {/* Widget Title */}
    <h2 className="text-lg font-semibold text-gray-300 mb-3">Market Movers</h2>
    {/* List of market movers */}
    <ul className="space-y-2">
      {/* Individual stock item */}
      <li className="flex justify-between items-center text-sm">
        <span className="text-white">AAPL</span>
        <span className="text-green-400">+2.5%</span> {/* Positive change */}
      </li>
      <li className="flex justify-between items-center text-sm">
        <span className="text-white">MSFT</span>
        <span className="text-green-400">+1.8%</span> {/* Positive change */}
      </li>
      <li className="flex justify-between items-center text-sm">
        <span className="text-white">GOOGL</span>
        <span className="text-red-400">-0.5%</span> {/* Negative change */}
      </li>
      <li className="flex justify-between items-center text-sm">
        <span className="text-white">AMZN</span>
        <span className="text-green-400">+1.2%</span> {/* Positive change */}
      </li>
      <li className="flex justify-between items-center text-sm">
        <span className="text-white">TSLA</span>
        <span className="text-red-400">-3.1%</span> {/* Negative change */}
      </li>
    </ul>
  </div>
);

// Placeholder Client List Widget
const ClientList = () => (
  // Container for the client list widget
  <div className="bg-gray-800 p-4 rounded-lg shadow-md h-full">
    {/* Widget Title */}
    <h2 className="text-lg font-semibold text-gray-300 mb-3">
      Watchlist Clients
    </h2>
    {/* List of clients */}
    <ul className="space-y-2">
      {/* Individual client item */}
      <li className="text-sm text-gray-300 hover:text-white cursor-pointer">
        Johnathan Smith Trust
      </li>
      <li className="text-sm text-gray-300 hover:text-white cursor-pointer">
        Eleanor Vance Holdings
      </li>
      <li className="text-sm text-gray-300 hover:text-white cursor-pointer">
        Robert Miller Foundation
      </li>
      <li className="text-sm text-gray-300 hover:text-white cursor-pointer">
        Sophia Chen Family Office
      </li>
      <li className="text-sm text-gray-300 hover:text-white cursor-pointer">
        David Williams Retirement
      </li>
    </ul>
  </div>
);

// Placeholder News Feed Widget
const NewsFeed = () => (
  // Container for the news feed widget
  <div className="bg-gray-800 p-4 rounded-lg shadow-md h-full">
    {/* Widget Title */}
    <h2 className="text-lg font-semibold text-gray-300 mb-3">Relevant News</h2>
    {/* List of news items */}
    <ul className="space-y-3">
      {/* Individual news item */}
      <li className="text-sm">
        {/* News link */}
        <a href="#" className="text-blue-400 hover:underline">
          Central Bank signals potential rate hike pause...
        </a>
        {/* News source and time */}
        <p className="text-xs text-gray-500">Reuters - 1h ago</p>
      </li>
      <li className="text-sm">
        <a href="#" className="text-blue-400 hover:underline">
          Tech sector rebounds on strong earnings reports...
        </a>
        <p className="text-xs text-gray-500">Bloomberg - 2h ago</p>
      </li>
      <li className="text-sm">
        <a href="#" className="text-blue-400 hover:underline">
          Oil prices dip amid global demand concerns...
        </a>
        <p className="text-xs text-gray-500">Financial Times - 3h ago</p>
      </li>
      <li className="text-sm">
        <a href="#" className="text-blue-400 hover:underline">
          Analysis: Impact of new ESG regulations on portfolios...
        </a>
        <p className="text-xs text-gray-500">WealthManagement.com - 4h ago</p>
      </li>
    </ul>
  </div>
);

// Placeholder Calendar Widget
const CalendarWidget = () => (
  // Container for the calendar widget
  <div className="bg-gray-800 p-4 rounded-lg shadow-md h-full">
    {/* Widget Title */}
    <h2 className="text-lg font-semibold text-gray-300 mb-3">
      Upcoming Events
    </h2>
    {/* List of calendar events */}
    <ul className="space-y-2">
      {/* Individual event item */}
      <li className="text-sm">
        {/* Event description */}
        <p className="text-white font-medium">
          10:00 AM - Client Review: J. Smith
        </p>
        {/* Event location/details */}
        <p className="text-xs text-gray-400">Virtual Meeting</p>
      </li>
      <li className="text-sm">
        <p className="text-white font-medium">
          02:00 PM - Portfolio Strategy Meeting
        </p>
        <p className="text-xs text-gray-400">Conference Room B</p>
      </li>
      <li className="text-sm">
        <p className="text-white font-medium">
          Tomorrow, 9:00 AM - Market Outlook Webinar
        </p>
        <p className="text-xs text-gray-400">Online</p>
      </li>
    </ul>
  </div>
);

// --- Main App Component ---
function App() {
  return (
    // Main container with dark background, padding, and font settings
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 font-sans">
      {/* Header Section */}
      <header className="mb-6">
        {/* Dashboard Title */}
        <h1 className="text-2xl font-semibold text-white">
          Wealth Management Dashboard
        </h1>
        {/* Placeholder for user info/logout button */}
        {/* Example: <div className="text-right text-sm">User: Alex | Logout</div> */}
      </header>
      {/* Dashboard Grid Layout */}
      {/* Uses Tailwind CSS grid for responsiveness: 1 col on small, 2 on medium, 3 on large screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Row 1: Portfolio Summary (spans 2 cols on large screens) and Asset Allocation */}
        <div className="lg:col-span-2">
          {" "}
          {/* Spans 2 columns on large screens and above */}
          <PortfolioSummary />
        </div>
        <div>
          {" "}
          {/* Takes 1 column */}
          <AssetAllocation />
        </div>

        {/* Row 2: Market Movers, Client List, Calendar */}
        <div>
          {" "}
          {/* Takes 1 column */}
          <MarketMovers />
        </div>
        <div>
          {" "}
          {/* Takes 1 column */}
          <ClientList />
        </div>
        <div>
          {" "}
          {/* Takes 1 column */}
          <CalendarWidget />
        </div>

        {/* Row 3: News Feed (spans full width on large screens) */}
        <div className="lg:col-span-3">
          {" "}
          {/* Spans all 3 columns on large screens and above */}
          <NewsFeed />
        </div>

        {/* Add more widgets/rows here following the grid pattern */}
        {/* Example:
           <div className="lg:col-span-1"> <AnotherWidget /> </div>
           <div className="lg:col-span-2"> <YetAnotherWidget /> </div>
        */}
      </div>{" "}
      {/* End of grid */}
    </div> // End of main container
  );
}

// Export the App component as the default export
export default App;
