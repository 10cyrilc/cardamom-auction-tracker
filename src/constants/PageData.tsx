import {BarChart3, Calendar, Search, Smartphone, TrendingUp} from "lucide-react";

export const howItWorks = [
    {
        step: 1,
        title: "Select a Date",
        description: "Choose the auction date from our comprehensive dropdown to view all available auctions for that day.",
        icon: Calendar
    },
    {
        step: 2,
        title: "Pick an Auction",
        description: "Browse through available auctions and select one to dive deep into detailed pricing and volume information.",
        icon: Search
    },
    {
        step: 3,
        title: "Analyze Data",
        description: "Use insights including price ranges, volumes, and trends to stay informed of current market.",
        icon: TrendingUp
    }
]

export const appFeatures = [
    {
        step: 1,
        title: "Updated Data",
        description: "Stay ahead with data refreshed twice daily, ensuring you never miss critical price changes or market updates.",
        icon: TrendingUp,
        gradient: "emerald"
    },
    {
        step: 2,
        title: "Detailed Analytics",
        description: "Dive into detailed historical data to uncover market trends, price shifts, and actionable insights about the current market.",
        icon: BarChart3,
        gradient: "blue"
    },
    {
        step: 3,
        title: "Mobile Optimized",
        description: "Track auctions anytime, anywhere—our responsive design delivers a flawless experience on mobile, tablet, and desktop.",
        icon: Smartphone,
        gradient: "purple"
    }
];