import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import type {AuctionData} from "../types/AuctionData";
import {API_URL} from "../constants";
import axios from "axios";

interface ChartDataItem {
    date: string;
    totalArrived: number;
    totalSold: number;
    avgPrice: number;
    maxPrice: number;
    count: number;
    sellRate: number;
}

const ITEMS_PER_PAGE = 10;

const HistoricalData: React.FC = () => {
    const [historicalData, setHistoricalData] = useState<AuctionData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDateRange, setSelectedDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
    const [selectedAuctioneer, setSelectedAuctioneer] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [sortField, setSortField] = useState<keyof AuctionData>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const apiUrl: string = `${API_URL}/cardamom/archieve/all`;

    useEffect(() => {
        const fetchHistoricalData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get<AuctionData[]>(apiUrl);
                setHistoricalData(response.data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_err) {
                setError("Error fetching historical data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchHistoricalData();
    }, []);


    const filteredData = useMemo(() => {
        let filtered = historicalData;

        if (selectedDateRange !== 'all') {
            const days = parseInt(selectedDateRange);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);
            filtered = filtered.filter(item => new Date(item.date) >= cutoffDate);
        }

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.Auctioneer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.date.includes(searchTerm) ||
                item.type.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Auctioneer filter
        if (selectedAuctioneer !== 'all') {
            filtered = filtered.filter(item => item.Auctioneer === selectedAuctioneer);
        }

        // Type filter
        if (selectedType !== 'all') {
            filtered = filtered.filter(item => item.type === selectedType);
        }

        // Sort
        filtered.sort((a, b) => {
            let aVal: string | number | Date;
            let bVal: string | number | Date;

            if (sortField === 'date') {
                aVal = new Date(a.date);
                bVal = new Date(b.date);
            } else if (['Lots', 'Total_Arrived', 'Qty_Sold', 'MaxPrice', 'Avg_Price'].includes(sortField)) {
                aVal = parseFloat(a[sortField] as string);
                bVal = parseFloat(b[sortField] as string);
            } else {
                aVal = a[sortField] as string;
                bVal = b[sortField] as string;
            }

            if (sortDirection === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

        return filtered;
    }, [historicalData, searchTerm, selectedDateRange, selectedAuctioneer, selectedType, sortField, sortDirection]);

    // Paginated data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredData, currentPage]);

    const chartData = useMemo(() => {
        const grouped = filteredData.reduce((acc, auction) => {
            if (!acc[auction.date]) {
                acc[auction.date] = {
                    date: auction.date,
                    totalArrived: 0,
                    totalSold: 0,
                    avgPrice: 0,
                    maxPrice: 0,
                    count: 0,
                    sellRate: 0
                };
            }
            acc[auction.date].totalArrived += parseFloat(auction.Total_Arrived);
            acc[auction.date].totalSold += parseFloat(auction.Qty_Sold);
            acc[auction.date].avgPrice += parseFloat(auction.Avg_Price);
            acc[auction.date].maxPrice = Math.max(acc[auction.date].maxPrice, parseFloat(auction.MaxPrice));
            acc[auction.date].count += 1;
            return acc;
        }, {} as Record<string, ChartDataItem>);

        return Object.values(grouped).map((item) => ({
            ...item,
            avgPrice: Math.round(item.avgPrice / item.count),
            sellRate: Math.round((item.totalSold / item.totalArrived) * 100),
            totalArrived: Math.round(item.totalArrived),
            totalSold: Math.round(item.totalSold)
        })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [filteredData]);

    // Summary statistics
    const summaryStats = useMemo(() => {
        if (filteredData.length === 0) return {avgPrice: 0, totalSold: 0, maxPrice: 0, sellRate: 0};

        const totalArrived = filteredData.reduce((sum, item) => sum + parseFloat(item.Total_Arrived), 0);
        const totalSold = filteredData.reduce((sum, item) => sum + parseFloat(item.Qty_Sold), 0);
        const avgPrice = filteredData.reduce((sum, item) => sum + parseFloat(item.Avg_Price), 0) / filteredData.length;
        const maxPrice = Math.max(...filteredData.map(item => parseFloat(item.MaxPrice)));
        const sellRate = (totalSold / totalArrived) * 100;

        return {
            avgPrice: Math.round(avgPrice),
            totalSold: Math.round(totalSold),
            maxPrice: Math.round(maxPrice),
            sellRate: Math.round(sellRate * 10) / 10
        };
    }, [filteredData]);

    const handleSort = useCallback((field: keyof AuctionData) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
        setCurrentPage(1);
    }, [sortField, sortDirection]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const uniqueAuctioneers = [...new Set(historicalData.map(item => item.Auctioneer))];

    const formatCurrency = (value: number) => `₹${value.toLocaleString()}`;
    const formatWeight = (value: number) => `${value.toLocaleString()} kg`;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-semibold text-green-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-semibold text-red-600">{error}</div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 mt-20">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Cardamom Auction Analytics</h1>
                            <p className="text-gray-600 mt-1">
                                {filteredData.length.toLocaleString()} records • Last
                                updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Filters & Search */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                            <select
                                value={selectedDateRange}
                                onChange={(e) => {
                                    setSelectedDateRange(e.target.value as '7d' | '30d' | '90d' | 'all');
                                    setCurrentPage(1);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            >
                                <option value="7d">Last 7 days</option>
                                <option value="30d">Last 30 days</option>
                                <option value="90d">Last 90 days</option>
                                <option value="all">All time</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Auctioneer</label>
                            <select
                                value={selectedAuctioneer}
                                onChange={(e) => {
                                    setSelectedAuctioneer(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            >
                                <option value="all">All Auctioneers</option>
                                {uniqueAuctioneers.map(auctioneer => (
                                    <option key={auctioneer} value={auctioneer}>
                                        {auctioneer}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-end md:col-span-2 lg:col-span-1">
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedDateRange('30d');
                                    setSelectedAuctioneer('all');
                                    setSelectedType('all');
                                    setCurrentPage(1);
                                }}
                                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-bold text-lg">₹</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Avg Price</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(summaryStats.avgPrice)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-bold text-lg">📦</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Sold</p>
                                <p className="text-2xl font-bold text-gray-900">{formatWeight(summaryStats.totalSold)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <span className="text-yellow-600 font-bold text-lg">📈</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Max Price</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(summaryStats.maxPrice)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="text-purple-600 font-bold text-lg">%</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Sell Rate</p>
                                <p className="text-2xl font-bold text-gray-900">{summaryStats.sellRate}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Side - Data Table */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-white">
                                        Auction Records ({filteredData.length.toLocaleString()})
                                    </h2>
                                    <div className="text-green-100 text-sm">
                                        Page {currentPage} of {totalPages}
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        {[
                                            {key: 'date', label: 'Date'},
                                            {key: 'Auctioneer', label: 'Auctioneer'},
                                            {key: 'Lots', label: 'Lots'},
                                            {key: 'Total_Arrived', label: 'Arrived'},
                                            {key: 'Qty_Sold', label: 'Sold'},
                                            {key: 'Avg_Price', label: 'Avg Price'},
                                            {key: 'MaxPrice', label: 'Max Price'},
                                        ].map(({key, label}) => (
                                            <th
                                                key={key}
                                                onClick={() => handleSort(key as keyof AuctionData)}
                                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                                            >
                                                <div className="flex items-center space-x-1">
                                                    <span>{label}</span>
                                                    {sortField === key && (
                                                        <span className="text-green-600">
                                                                {sortDirection === 'asc' ? '↑' : '↓'}
                                                            </span>
                                                    )}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedData.map((auction) => {
                                        const sellRate = (parseFloat(auction.Qty_Sold) / parseFloat(auction.Total_Arrived)) * 100;
                                        return (
                                            <tr key={auction.sl} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                    {auction.date}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    <div className="font-medium">
                                                        {auction.Auctioneer}
                                                    </div>
                                                    <div className="text-xs text-gray-500 capitalize">
                                                        {auction.type}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {auction.Lots}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                    {formatWeight(parseFloat(auction.Total_Arrived))}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                    <div>{formatWeight(parseFloat(auction.Qty_Sold))}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {sellRate.toFixed(1)}% sold
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-green-600">
                                                    {formatCurrency(parseFloat(auction.Avg_Price))}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-blue-600">
                                                    {formatCurrency(parseFloat(auction.MaxPrice))}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t">
                                    <div className="text-sm text-gray-700">
                                        Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of {filteredData.length} results
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Previous
                                        </button>

                                        {/* Page numbers */}
                                        {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                                            const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`px-3 py-1 text-sm border rounded-md ${
                                                        currentPage === pageNum
                                                            ? 'bg-green-600 text-white border-green-600'
                                                            : 'bg-white border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Charts */}
                    <div className="space-y-6">
                        {/* Price Trend */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Price Trends</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={chartData.slice(-30)}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="date" tick={{fontSize: 10}}/>
                                    <YAxis tick={{fontSize: 10}}/>
                                    <Tooltip formatter={(value) => formatCurrency(Number(value))}/>
                                    <Area type="monotone" dataKey="avgPrice" stroke="#10B981" fill="#10B981"
                                          fillOpacity={0.3}/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Volume Analysis */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Volume Analysis</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={chartData.slice(-20)}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="date" tick={{fontSize: 10}}/>
                                    <YAxis tick={{fontSize: 10}}/>
                                    <Tooltip formatter={(value) => formatWeight(Number(value))}/>
                                    <Bar dataKey="totalSold" fill="#3B82F6"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="bg-white bg-opacity-70 rounded-lg p-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Total Records</span>
                                        <span className="font-semibold">{filteredData.length.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-70 rounded-lg p-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Date Range</span>
                                        <span className="font-semibold text-xs">
                                            {chartData.length > 0 ? `${chartData[0]?.date} - ${chartData[chartData.length - 1]?.date}` : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-70 rounded-lg p-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Avg Sell Rate</span>
                                        <span className="font-semibold text-green-600">{summaryStats.sellRate}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoricalData;