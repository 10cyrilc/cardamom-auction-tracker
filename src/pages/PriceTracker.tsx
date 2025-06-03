import React, {useEffect, useMemo, useState} from "react";
import type {AuctionData} from "../types/AuctionData";
import axios from "axios";
import DateSelector from "../components/DateSelector";
import AuctionSelector from "../components/AuctionSelector";
import AuctionDetails from "../components/AuctionDetails";
import LoadingSpinner from "../components/Loader";
import {API_URL} from "../constants";
import {Globe, Search, TrendingUp} from "lucide-react";
import {appFeatures, howItWorks} from "../constants/PageData.tsx";

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
                setError(null)
            } catch (err) {
                setError("Failed to fetch auction data. Please try again later.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const uniqueDates = useMemo((): string[] => {
        if (!auctionData.length) return [];

        const dates: string[] = [];
        let prevDate: string | null = null;

        auctionData.forEach((item) => {
            if (item.date !== prevDate) {
                dates.push(item.date);
                prevDate = item.date;
            }
        });

        return dates;
    }, [auctionData]);

    const auctionsForSelectedDate = useMemo((): AuctionData[] => {
        if (!selectedDate) return [];
        return auctionData.filter((item) => item.date === selectedDate);
    }, [selectedDate, auctionData]);

    const selectedAuction = useMemo((): AuctionData | null => {
        if (!selectedAuctionId) return null;
        return auctionData.find((item) => String(item.sl) === selectedAuctionId) || null;
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
            <div
                className="flex flex-col justify-center items-center px-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 border border-gray-200">
                    <div className="text-center">
                        <div
                            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <h3 className="text-xl font-semibold text-red-600 mb-2">Oops! Something went wrong</h3>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white w-full">
            {/* Hero Section */}
            <section
                className="relative bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20"></div>

                <div className="relative px-6 py-24 sm:py-32 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div
                            className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium mb-8">
                            <TrendingUp className="w-4 h-4 mr-2"/>
                            Market Data
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Cardamom
                            <span
                                className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Auction Tracker
              </span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-emerald-100 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Monitor cardamom auction prices in real-time, explore detailed insights, and stay ahead of
                            market trends with our comprehensive tracking platform.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => document.getElementById("auction-section")?.scrollIntoView({behavior: "smooth"})}
                                className="bg-white text-emerald-700 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center"
                            >
                                <Search className="w-5 h-5 mr-2"/>
                                Explore Auctions
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Features</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Get the necessary data required to analyze the latest market price with history support of upto 5 days
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {appFeatures.map((item) => (
                            <div
                                key={item.step}
                                className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div
                                    className={`w-16 h-16 bg-gradient-to-br from-${item.gradient}-400 to-${item.gradient}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className="w-8 h-8 text-white"/>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))
                        }


                    </div>
                </div>
            </section>

            <main id="auction-section" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8">
                            <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
                                <Globe className="w-8 h-8 mr-3"/>
                                Cardamom Auction Dashboard
                            </h2>
                            <p className="text-emerald-100">
                                Select a date and auction to view detailed pricing information
                            </p>
                        </div>

                        <div className="p-8">
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
                                        selectedAuction &&
                                        <AuctionDetails auction={selectedAuction} onBack={handleBack}/>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* How It Works Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600">
                            Get started in three simple steps
                        </p>
                    </div>

                    <div className="space-y-8">
                        {howItWorks.map((item, index) => (
                            <div key={index} className="flex items-start">
                                <div
                                    className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                                    <item.icon className="w-8 h-8 text-white"/>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-3">
                    <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full mr-4">
                      Step {item.step}
                    </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default PriceTracker;