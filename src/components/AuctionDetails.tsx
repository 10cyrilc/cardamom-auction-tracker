import {ArrowLeft, BarChart3, Database, Eye, IndianRupee, Package, TrendingUp} from "lucide-react";
import type {AuctionData} from "../types/AuctionData";

interface AuctionDetailsProps {
    auction: AuctionData;
    onBack: () => void;
}

const AuctionDetails = ({auction, onBack}: AuctionDetailsProps) => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <button
                onClick={onBack}
                className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors text-lg"
            >
                <ArrowLeft className="w-5 h-5 mr-2"/>
                Back to Auctions
            </button>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
        {new Date(auction.date).toLocaleDateString()}
      </span>
        </div>

        <div
            className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 overflow-hidden">
            <div className="bg-emerald-50 px-8 py-6 border-b border-emerald-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                    {auction.type} Auction Details
                </h3>
                <p className="text-gray-600 flex items-center">
                    <Eye className="w-4 h-4 mr-2"/>
                    Auctioneer: <span className="font-medium ml-1">{auction.Auctioneer}</span>
                </p>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-700">Total Lots</h4>
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-emerald-600"/>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{auction.Lots}</p>
                        <p className="text-sm text-gray-500 mt-1">auction lots</p>
                    </div>

                    <div
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-700">Total Arrivals</h4>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Database className="w-5 h-5 text-blue-600"/>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{auction.Total_Arrived}</p>
                        <p className="text-sm text-gray-500 mt-1">kg arrived</p>
                    </div>

                    <div
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-700">Quantity Sold</h4>
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-green-600"/>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-green-600">{auction.Qty_Sold}</p>
                        <p className="text-sm text-gray-500 mt-1">kg sold</p>
                    </div>

                    <div
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-700">Average Price</h4>
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-emerald-600"/>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-emerald-600">₹{auction.Avg_Price}</p>
                        <p className="text-sm text-gray-500 mt-1">per kg</p>
                    </div>

                    <div
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-700">Maximum Price</h4>
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <IndianRupee className="w-5 h-5 text-orange-600"/>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">₹{auction.MaxPrice}</p>
                        <p className="text-sm text-gray-500 mt-1">highest bid</p>
                    </div>

                    <div
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-700">Auction Type</h4>
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 text-purple-600"/>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-purple-600">{auction.type}</p>
                        <p className="text-sm text-gray-500 mt-1">session type</p>
                    </div>
                </div>

                {/* Sales Performance Indicator */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-emerald-600"/>
                        Sales Performance
                    </h4>
                    <div className="flex items-center space-x-4">
                        <div className="flex-1">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Sold vs Arrived</span>
                                <span>{((parseFloat(auction.Qty_Sold) / parseFloat(auction.Total_Arrived)) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                    style={{width: `${(parseFloat(auction.Qty_Sold) / parseFloat(auction.Total_Arrived)) * 100}%`}}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default AuctionDetails;