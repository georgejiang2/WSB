import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const MyChart = ({ chartData, xKey, yKey, title }) => {
  return (
    <div className="chart-container">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis 
            domain={["auto", "auto"]} 
            tickFormatter={(value) => `${(value * 100).toFixed(2)}%`} // Convert to percentage
            label={{ value: "Percent Change (%)", angle: -90, position: "insideLeft" }} // Y-axis label
          />
          <Tooltip formatter={(value) => `${(value * 100).toFixed(2)}%`} />
          <Line type="monotone" dataKey={yKey} stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;
