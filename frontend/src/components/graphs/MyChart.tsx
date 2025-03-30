import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Label
} from "recharts";
import dayjs from "dayjs"; // Import dayjs for date formatting

// Define props type
interface MyChartProps {
  chartData: Array<{ [key: string]: number | string }>; // Accepts any valid data format
  xKey: string;
  yKey: string;
  title: string;
  subtitle?: string;
}

const MyChart: React.FC<MyChartProps> = ({ chartData, xKey, yKey, title, subtitle }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
      {/* Title section with better styling */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart 
          data={chartData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <defs>
            {/* Gradient for the line */}
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.3}/>
            </linearGradient>
            
            {/* Gradient for the area under the line */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          {/* Lighter grid for better readability */}
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          
          {/* Format X-axis with better styling */}
          <XAxis 
            dataKey={xKey} 
            tickFormatter={(date) => dayjs(date).format("MMM D")} 
            angle={-45} 
            textAnchor="end" 
            interval="preserveStartEnd"
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={{ stroke: '#e0e0e0' }}
          />

          {/* Format Y-axis with better styling */}
          <YAxis 
            domain={["auto", "auto"]} 
            tickFormatter={(value: number) => `${(value * 100).toFixed(1)}%`} 
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={{ stroke: '#e0e0e0' }}
          >
            <Label 
                value="Percent Change (%)" 
                angle={-90} 
                position="insideLeft" 
                style={{ textAnchor: 'middle', fill: '#666', fontSize: 13 }}
                offset={-10}
            />
          </YAxis>

          {/* Enhanced tooltip */}
          <Tooltip 
            formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, "Change"]} 
            labelFormatter={(date) => `${dayjs(date).format("MMM D, YYYY")}`}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              padding: '10px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
            itemStyle={{ color: '#8884d8' }}
          />
          
          {/* Legend with better styling */}
          <Legend 
            verticalAlign="top" 
            height={36} 
            formatter={() => "Percent Change"} 
            wrapperStyle={{ fontSize: '12px', color: '#666' }}
          />

          {/* Line with nicer styling and area fill */}
          <Line 
            type="monotone" 
            dataKey={yKey} 
            name="Percent Change"
            stroke="url(#colorValue)" 
            strokeWidth={3}
            activeDot={{ r: 8, fill: '#8884d8', strokeWidth: 2, stroke: '#fff' }}
            dot={{ r: 4, fill: '#8884d8', strokeWidth: 2, stroke: '#fff' }}
            fillOpacity={1}
            fill="url(#areaGradient)"
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Optional legend or explanation text */}
      <div className="mt-4 text-xs text-gray-500 italic text-center">
        Source: Data collected through {dayjs().format("MMMM YYYY")}
      </div>
    </div>
  );
};

export default MyChart;