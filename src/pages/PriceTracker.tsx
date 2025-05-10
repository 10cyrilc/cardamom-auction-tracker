import React, {useEffect, useMemo, useState} from "react";
import type {AuctionData} from "../types/AuctionData";
import axios from "axios";
import DateSelector from "../components/DateSelector";
import AuctionSelector from "../components/AuctionSelector";
import AuctionDetails from "../components/AuctionDetails";
import LoadingSpinner from "../components/Loader";
import {API_URL} from "../constants";

const PriceTracker: React.FC = () => {
    const [auctionData, setAuctionData] = useState<AuctionData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedAuctionId, setSelectedAuctionId] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const apiUrl: string = `${API_URL}/cardamom/archieve`;

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await axios.get<AuctionData[]>(apiUrl);
                setAuctionData(response.data);
                setSelectedDate(response.data[0].date);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch auction data. Please try again later.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Get unique dates from the auction data
    const uniqueDates = useMemo((): string[] => {
        if (!auctionData.length) return [];

        const dates: string[] = [];
        let prevDate: string | null = null;

        auctionData.forEach(item => {
            if (item.date !== prevDate) {
                dates.push(item.date);
                prevDate = item.date;
            }
        });

        return dates;
    }, [auctionData]);

    // Get auction for the selected date
    const auctionsForSelectedDate = useMemo((): AuctionData[] => {
        if (!selectedDate) return [];
        return auctionData.filter(item => item.date === selectedDate);
    }, [selectedDate, auctionData]);

    // Get selected auction details
    const selectedAuction = useMemo((): AuctionData | null => {
        if (!selectedAuctionId) return null;
        return auctionData.find(item => String(item.sl) === selectedAuctionId) || null;
    }, [selectedAuctionId, auctionData]);

    const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedDate(e.target.value);
        setShowDetails(false);
        setSelectedAuctionId(null);
    };

    const handleAuctionSelect = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setSelectedAuctionId(e.currentTarget.value);
        setShowDetails(true);
    };

    const handleBack = (): void => {
        setShowDetails(false);
    };

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center px-4">
                <div className="max-w-md w-full bg-white shadow rounded-lg p-8">
                    <div className="text-center">
                        <h3 className="mt-2 text-lg font-medium text-red-600">Error</h3>
                        <p className="mt-1 text-sm text-gray-500">{error}</p>
                        <div className="mt-6">
                            <button
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Cardamom Auction Prices</h2>

                    {loading ? (
                        <LoadingSpinner/>
                    ) : (
                        <>
                            {!showDetails ? (
                                <>
                                    <DateSelector
                                        dates={uniqueDates}
                                        selectedDate={selectedDate}
                                        onDateChange={handleDateChange}
                                    />

                                    {selectedDate && auctionsForSelectedDate.length > 0 && (
                                        <AuctionSelector
                                            auctions={auctionsForSelectedDate}
                                            onAuctionSelect={handleAuctionSelect}
                                        />
                                    )}
                                </>
                            ) : (
                                selectedAuction && (
                                    <AuctionDetails
                                        auction={selectedAuction}
                                        onBack={handleBack}
                                    />
                                )
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PriceTracker;