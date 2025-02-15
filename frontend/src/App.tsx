import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {TicketCheckInPage} from "./pages/TicketCheckInPage.tsx";
import RootLayout from "./layout/RootLayout.tsx";
import {TicketCheckOutPage} from "./pages/TicketCheckoutPage.tsx";

const router = createBrowserRouter([
    {
        path: `/`,
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <TicketCheckInPage/>,
            },
            {
                path: `/check-in`,
                element: <TicketCheckInPage/>,
            },
            {
                path: `/check-out`,
                element: <TicketCheckOutPage/>,
            },
        ]
    }
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
