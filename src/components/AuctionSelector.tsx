import { Database } from "lucide-react";
import React from "react";
import type { AuctionData } from "../types/AuctionData";

interface AuctionSelectorProps {
    auctions: AuctionData[];
    onAuctionSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AuctionSelector: React.FC<AuctionSelectorProps> = ({ auctions, onAuctionSelect }) => (
    <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Available Auctions</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {auctions.map((auction, index) => (
                <div key={`auction-${auction.sl}`} className="flex flex-col">
                    <button
                        value={auction.sl}
                        onClick={onAuctionSelect}
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                    >
                        <Database className="mr-2 h-5 w-5" />
                        Auction {index + 1}
                    </button>
                    <p className="mt-2 text-sm text-gray-600 text-center">
                        Auctioneer: {auction.Auctioneer}
                    </p>
                </div>
            ))}
        </div>
    </div>
);
export default  AuctionSelector;