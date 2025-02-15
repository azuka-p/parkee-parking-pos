import { Outlet } from "react-router-dom";
import {Navbar} from "../components/Navbar/Navbar.tsx";

const RootLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
};

export default RootLayout;
