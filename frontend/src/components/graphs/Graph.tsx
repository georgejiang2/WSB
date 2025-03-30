import React, { useState, useEffect } from "react";
import MyChart from "./MyChart";
import sampleData from "../../portfolio_data/portfolio_total_investment.json";

// Define the expected structure of the portfolio data
interface PortfolioEntry {
    date: string;
    investment: number;
    today_profit: number;
    total_profit: number;
    percentchange?: number; // This will be added in useEffect
}

const Graph: React.FC = () => {
    const [portfolioData, setPortfolioData] = useState<PortfolioEntry[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        try {
            const processedData: PortfolioEntry[] = sampleData.portfolio_statistics.map((entry: PortfolioEntry) => ({
                ...entry,
                percentchange: entry.investment ? entry.total_profit / entry.investment : 0, // Avoid division by zero
            }));

            setPortfolioData(processedData);
        } catch (error) {
            console.error("Error processing portfolio data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Calculate summary statistics
    const getStats = () => {
        if (!portfolioData.length) return null;

        const latestEntry = portfolioData[portfolioData.length - 1];
        
        // Calculate overall growth
        const overallChange = latestEntry.percentchange || 0;
        const overallChangePercent = (overallChange * 100).toFixed(2);
        
        // Format the investment amount with commas and decimal places
        const currentInvestment = latestEntry.investment.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        // Format total profit
        const totalProfit = latestEntry.total_profit.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        return { overallChangePercent, currentInvestment, totalProfit };
    };

    const stats = getStats();

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Portfolio Performance Dashboard</h1>
                <p className="text-gray-600">Track your investment returns over time</p>
            </div>
            
            {isLoading ? (
                <div className="flex justify-center items-center h-64 bg-white rounded-lg border border-gray-200">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                        <div className="h-32 w-full max-w-md bg-gray-200 rounded"></div>
                    </div>
                </div>
            ) : portfolioData.length ? (
                <>
                    {/* Stats Summary Cards */}
                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-500 mb-1">Total Investment</p>
                                <p className="text-xl font-bold text-gray-800">{stats.currentInvestment}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-500 mb-1">Total Profit</p>
                                <p className="text-xl font-bold text-gray-800">{stats.totalProfit}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-500 mb-1">Return on Investment</p>
                                <p className={`text-xl font-bold ${parseFloat(stats.overallChangePercent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {stats.overallChangePercent}%
                                </p>
                            </div>
                        </div>
                    )}
                    
                    {/* Main Chart */}
                    <MyChart 
                        chartData={portfolioData.map(entry => ({
                            date: entry.date,
                            investment: entry.investment,
                            today_profit: entry.today_profit,
                            total_profit: entry.total_profit,
                            percentchange: entry.percentchange ?? 0, // Ensure it's always a number
                        })) as { [key: string]: string | number }[]} 
                        xKey="date" 
                        yKey="percentchange" 
                        title="Profit / Investment Over Time" 
                        subtitle="Ratio of total profit to invested capital"
                    />
                    
                    {/* Additional context or tips */}
                    <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="text-sm font-semibold text-blue-800 mb-2">About This Chart</h3>
                        <p className="text-sm text-blue-700">
                            This chart shows your return on investment (ROI) over time, calculated as the ratio of profit to investment. 
                            A positive percentage indicates profits, while a negative percentage indicates losses relative to your investment.
                        </p>
                    </div>
                </>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                    <p className="text-gray-600">No portfolio data available</p>
                </div>
            )}
        </div>
    );
};

export default Graph;