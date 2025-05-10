import React, {useEffect, useState} from "react";
import {ArrowUp, Database, Heart} from "lucide-react";

interface FooterProps {
    yourName?: string;
    showScrollTop?: boolean;
}


const Footer: React.FC<FooterProps> = ({
                                           yourName = "Your Name",
                                           showScrollTop = true
                                       }) => {
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

    useEffect(() => {
        if (!showScrollTop) return;

        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showScrollTop]);

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    return (
        <footer className="bg-emerald-900 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">

                    <div className="flex items-center space-x-2">
                        <span className="text-emerald-100">Made with</span>
                        <Heart className="h-4 w-4 text-red-400 fill-current"/>
                        <span className="text-emerald-100">by</span>
                        <a
                            href="https://github.com/10cyrilc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-emerald-300 hover:text-emerald-200 transition-colors"
                        >
                            {yourName}
                        </a>
                    </div>

                    <span className="hidden md:block mx-3 text-emerald-600">•</span>

                    <div className="flex items-center space-x-2">
                        <span className="text-emerald-100">Made possible with</span>
                        <Database className="h-4 w-4 text-emerald-300"/>
                        <span className="text-emerald-100">by</span>
                        <a
                            href="https://github.com/Tibinsunny/indianspices-api"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-emerald-300 hover:text-emerald-200 transition-colors"
                        >
                            Tibin Sunny
                        </a>
                    </div>
                </div>

            </div>

            {showScrollTop && showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 p-3 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-6 w-6"/>
                </button>
            )}
        </footer>
    );
};

export default Footer;