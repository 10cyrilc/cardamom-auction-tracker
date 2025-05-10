import Navbar from './components/Navigation/NavBar';
import PriceTracker from './pages/PriceTracker';
import Footer from './components/Navigation/Footer';
import {APP_NAME, DEV_NAME, GITHUB_URL} from './constants';

function App() {

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar appName={APP_NAME} githubUrl={GITHUB_URL} />
            <main className="flex-grow flex items-center justify-center">
                <PriceTracker />
            </main>
            <Footer yourName={DEV_NAME} showScrollTop={true} />
        </div>
    );
}

export default App;