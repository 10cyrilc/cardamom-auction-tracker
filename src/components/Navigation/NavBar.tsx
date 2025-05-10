import React, {useEffect, useState} from 'react';
import {Github, Leaf, Menu, X} from 'lucide-react';

interface NavbarProps {
    appName?: string;
    githubUrl?: string;
}


const Navbar: React.FC<NavbarProps> = ({
                                           appName = "Cardamom Auction Tracker",
                                           githubUrl = "https://github.com/10crilc/cardamom-tracker"
                                       }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-md ${
            isScrolled ? ' py-2' : ' py-4'
        }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">

                        <Leaf className={`h-8 w-8 ${isScrolled ? 'text-emerald-600' : 'text-emerald-700'}`}/>
                        <span className={`font-bold text-xl ${isScrolled ? 'text-gray-800' : 'text-emerald-800'}`}>
                {appName}
              </span>
                    </div>

                    {/* Github Link (Desktop) */}
                    <div className="hidden md:flex items-center">
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                        >
                            <Github className="h-5 w-5"/>
                            <span>GitHub</span>
                        </a>
                    </div>

                    {/* Mobile Navigation Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-full hover:bg-emerald-100 transition-colors"
                            aria-label="Menu"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6 text-emerald-700"/>
                            ) : (
                                <Menu className="h-6 w-6 text-emerald-700"/>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div
                        className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
                        <nav className="container mx-auto px-4 py-4 flex flex-col">
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 py-3 text-gray-700"
                            >
                                <Github className="h-5 w-5"/>
                                <span>GitHub</span>
                            </a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
