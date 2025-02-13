import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {TicketCheckInPage} from "./pages/TicketCheckInPage.tsx";
// import {TicketCheckoutPage} from "./pages/TicketCheckoutPage.tsx";
import RootLayout from "./layout/RootLayout.tsx";

const router = createBrowserRouter([
    {
        path: `/`,
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <TicketCheckInPage/>,
            },
            // {
            //     path: `/check-out`,
            //     element: <TicketCheckoutPage/>,
            // },
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
