import {Database, Search} from "lucide-react";
import React from "react";
import type { AuctionData } from "../types/AuctionData";

interface AuctionSelectorProps {
    auctions: AuctionData[];
    onAuctionSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AuctionSelector = ({ auctions, onAuctionSelect }: AuctionSelectorProps) => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Search className="w-5 h-5 mr-2 text-emerald-600" />
            Available Auctions
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
            {auctions.map((auction, index) => (
                <div key={`auction-${auction.sl}`} className="group">
                    <button
                        value={auction.sl.toString()}
                        onClick={onAuctionSelect}
                        className="w-full p-6 border border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all duration-300 text-left bg-gradient-to-r from-white to-gray-50 hover:from-emerald-50 hover:to-white group-hover:scale-[1.02]"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-emerald-200 transition-colors">
                                    <Database className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                        {auction.type} Auction
                                    </h4>
                                    <p className="text-sm text-gray-500">Auction #{index + 1}</p>
                                </div>
                            </div>
                            <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                ₹{auction.Avg_Price}
              </span>
                        </div>

                        <div className="mb-3">
                            <p className="text-sm text-gray-600 font-medium">
                                Auctioneer: <span className="text-gray-800">{auction.Auctioneer}</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                            <div>
                                <span className="font-medium text-gray-500">Lots:</span>
                                <div className="font-semibold text-gray-800">{auction.Lots}</div>
                            </div>
                            <div>
                                <span className="font-medium text-gray-500">Arrived:</span>
                                <div className="font-semibold text-gray-800">{auction.Total_Arrived}kg</div>
                            </div>
                            <div>
                                <span className="font-medium text-gray-500">Sold:</span>
                                <div className="font-semibold text-gray-800">{auction.Qty_Sold}kg</div>
                            </div>
                        </div>
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default  AuctionSelector;