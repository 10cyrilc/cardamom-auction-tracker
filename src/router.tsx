import {createBrowserRouter} from "react-router";
import Home from "./pages/PriceTracker";
import HistoricalData from "./pages/HistoricalData.tsx";
import App from "./App.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: "/history",
                element: <HistoricalData/>
            }
        ]
    },

]);