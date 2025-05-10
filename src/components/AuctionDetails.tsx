import {ArrowLeft, ChartColumnStacked, Database, IndianRupee, Package, TrendingUp} from "lucide-react";
import React from "react";
import type {AuctionData} from "../types/AuctionData";

interface AuctionDetailsProps {
    auction: AuctionData;
    onBack: () => void;
}

const AuctionDetails: React.FC<AuctionDetailsProps> = ({auction, onBack}) => (
    <div>
        <button
            className="mb-4 flex items-center text-emerald-600 hover:text-emerald-800 focus:outline-none transition-colors text-lg"
            onClick={onBack}
        >
            <ArrowLeft className="h-6 w-6 mr-1"/>
            <span>Back to selection</span>
        </button>

        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-6 py-6 sm:px-8 bg-emerald-50">
                <h3 className="text-xl leading-7 font-medium text-gray-900">
                    Auction Details - {auction.date}
                </h3>
                <p className="mt-1 max-w-2xl text-base text-gray-500">
                    Auctioneer: {auction.Auctioneer}
                </p>
            </div>
            <div className="px-6 py-6 sm:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
                        <Package className="h-8 w-8 text-emerald-500 mb-2"/>
                        <h4 className="text-base font-medium text-gray-500">Lots</h4>
                        <p className="text-xl font-semibold text-gray-900">{auction.Lots}</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
                        <Database className="h-8 w-8 text-emerald-500 mb-2"/>
                        <h4 className="text-base font-medium text-gray-500">Total Arrivals</h4>
                        <p className="text-xl font-semibold text-gray-900">{auction.Total_Arrived}</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
                        <Package className="h-8 w-8 text-emerald-500 mb-2"/>
                        <h4 className="text-base font-medium text-gray-500">Quantity Sold</h4>
                        <p className="text-xl font-semibold text-gray-900">{auction.Qty_Sold}</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
                        <IndianRupee className="h-8 w-8 text-emerald-500 mb-2"/>
                        <h4 className="text-base font-medium text-gray-500">Maximum Price</h4>
                        <p className="text-xl font-semibold text-gray-900">{auction.MaxPrice}</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
                        <TrendingUp className="h-8 w-8 text-emerald-500 mb-2"/>
                        <h4 className="text-base font-medium text-gray-500">Average Price</h4>
                        <p className="text-xl font-semibold text-gray-900">{auction.Avg_Price}</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
                        <ChartColumnStacked className="h-8 w-8 text-emerald-500 mb-2"/>
                        <h4 className="text-base font-medium text-gray-500">Type</h4>
                        <p className="text-xl font-semibold text-gray-900">{auction.type}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default AuctionDetails;