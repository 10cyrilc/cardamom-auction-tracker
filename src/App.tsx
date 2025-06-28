import Navbar from './components/Navigation/NavBar';
import Footer from './components/Navigation/Footer';
import {APP_NAME, DEV_NAME, GITHUB_URL} from './constants';
import {Outlet} from "react-router";

function App() {

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar appName={APP_NAME} githubUrl={GITHUB_URL}/>
            <main className="flex-grow flex items-center justify-center">
                <Outlet/>
            </main>
            <Footer yourName={DEV_NAME} showScrollTop={true}/>
        </div>
    );
}

export default App;