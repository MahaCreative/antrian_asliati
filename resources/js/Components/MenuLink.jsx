import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "@inertiajs/react";
export default function MenuLink({ logo, links, active, name }) {
    console.log("check Route" + route().current(active));

    return (
        <Link
            href={links}
            className={`${
                route().current(active) ? "bg-slate-900" : ""
            } useTransition flex items-center gap-x-3 py-2 px-3 hover:bg-slate-900 hover:cursor-pointer`}
        >
            <p className="leading-3 tracking-tighter text-3xl text-white">
                {logo}
            </p>
            <p className="tracking-tight font-light text-white capitalize">
                {name}
            </p>
        </Link>
    );
}
