// frontend/src/components/graphs/Graph.tsx
import React, { useState, useEffect } from "react";
import MyChart from "./MyChart";
import sampleData from "../../portfolio_data/portfolio_total_investment.json";
import spxData from "../../portfolio_data/spx_data.json";
import "./Graph.css";

interface PortfolioEntry {
  date: string;
  investment: number;
  today_profit: number;
  total_profit: number;
  percentchange?: number;
}

interface SPXEntry {
  Date: string;
  "Percent Change": number;
}

interface CombinedDataPoint {
  date: string;
  portfolioValue?: number;
  spxValue?: number;
}

const Graph: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioEntry[]>([]);
  const [comparisonData, setComparisonData] = useState<CombinedDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      // Process portfolio data
      const processedData: PortfolioEntry[] = sampleData.portfolio_statistics.map(
        (entry: PortfolioEntry) => ({
          ...entry,
          // Convert total_profit / investment to a percentage
          percentchange: entry.investment ? entry.total_profit / entry.investment : 0,
        })
      );
      setPortfolioData(processedData);

      // Build a map for date -> CombinedDataPoint
      const combinedDataMap = new Map<string, CombinedDataPoint>();

      // Add portfolio data
      processedData.forEach((entry) => {
        combinedDataMap.set(entry.date, {
          date: entry.date,
          portfolioValue: entry.percentchange ? entry.percentchange * 100 : 0,
        });
      });

      // Merge S&P 500 data
      spxData.forEach((entry: SPXEntry) => {
        const date = entry.Date;
        const existing = combinedDataMap.get(date) || { date };
        combinedDataMap.set(date, {
          ...existing,
          spxValue: entry["Percent Change"],
        });
      });

      // Convert map to sorted array
      const combinedArray = Array.from(combinedDataMap.values()).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setComparisonData(combinedArray);
    } catch (error) {
      console.error("Error processing data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Compute summary stats
  const getStats = () => {
    if (!portfolioData.length) return null;

    const latestEntry = portfolioData[portfolioData.length - 1];
    const overallChange = latestEntry.percentchange || 0;
    const overallChangePercent = (overallChange * 100).toFixed(2);

    // Format currency
    const currentInvestment = latestEntry.investment.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const totalProfit = latestEntry.total_profit.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // S&P 500 performance
    let spxPerformance = "N/A";
    if (spxData && spxData.length > 0) {
      const latestSPX = spxData[spxData.length - 1];
      spxPerformance = `${latestSPX["Percent Change"].toFixed(2)}%`;
    }

    return { overallChangePercent, currentInvestment, totalProfit, spxPerformance };
  };

  const stats = getStats();

  return (
    <div className="graph-container">
      <h1 className="graph-title">Portfolio Performance Dashboard</h1>

      {isLoading ? (
        <div className="loading-container">
          <div className="animate-pulse flex flex-col items-center">
            <div className="loading-bar mb-3" />
            <div className="loading-bar wide" />
          </div>
        </div>
      ) : portfolioData.length ? (
        <>
          {stats && (
            <div className="stats-container">
              <div className="stat-card">
                <p>Total Investment</p>
                <p>{stats.currentInvestment}</p>
              </div>
              <div className="stat-card">
                <p>Total Profit</p>
                <p>{stats.totalProfit}</p>
              </div>
              <div className="stat-card">
                <p>Your ROI</p>
                <p className={parseFloat(stats.overallChangePercent) >= 0 ? "positive" : "negative"}>
                  {stats.overallChangePercent}%
                </p>
              </div>
              <div className="stat-card">
                <p>S&P 500 Return</p>
                <p
                  className={
                    stats.spxPerformance !== "N/A" && parseFloat(stats.spxPerformance) >= 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {stats.spxPerformance}
                </p>
              </div>
            </div>
          )}

          {comparisonData.length > 0 && (
            <div className="chart-section">
              <MyChart
                chartData={comparisonData}
                xKey="date"
                title="Performance Comparison"
                subtitle="WSB vs. S&P 500"
              />
            </div>
          )}
        </>
      ) : (
        <div className="empty-data-container">
          <p>No portfolio data available</p>
        </div>
      )}
    </div>
  );
};

export default Graph;
