import React from "react";
import MyChart from "./MyChart"; // Import the chart component
import sampleData from "../portfolio_data/portfolio_total_investment.json";

function App() {
    const [portfolioData, setPortfolioData] = useState([]);

    useEffect(() => {
        const processedData = sampleData.portfolio_statistics.map((entry) => ({
          ...entry,
          percentchange: entry.investment ? entry.total_profit / entry.investment : 0, // Avoid division by zero
        }));
        
        setPortfolioData(processedData);
      }, []);
  
    return (
      <div>
        <h1>Profit-to-Investment Ratio</h1>
        {portfolioData.length ? (
          <MyChart 
            chartData={portfolioData} 
            xKey="date" 
            yKey="percentchange" 
            title="Profit / Investment Over Time" 
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
}

export default App;
