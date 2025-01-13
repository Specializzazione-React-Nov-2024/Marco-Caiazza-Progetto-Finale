import { Outlet } from "react-router";
import NavbarUI from "../components/NavbarUI";
import ScrollToTop from "../components/ScrollToTop";
import { useNavigate } from "react-router";
import { useEffect } from "react";


export default function AppLayout() {

    return (
        <>
        <ScrollToTop />
        <NavbarUI />
        <Outlet />
        </>
    )
}