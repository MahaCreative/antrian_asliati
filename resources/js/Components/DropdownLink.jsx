import React, { useEffect, useRef, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "@inertiajs/react";
import {
    ArrowBack,
    ArrowBackIos,
    KeyboardArrowDown,
} from "@mui/icons-material";
function DropdownLink({ logo, name, children }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        let handler = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <div
            ref={dropdownRef}
            onClick={() => setOpen(!open)}
            className={` useTransition py-2 px-3 hover:bg-slate-900 hover:cursor-pointer`}
        >
            <div className=" flex items-center justify-between ">
                <div className="flex items-center gap-x-3">
                    <p className="leading-3 tracking-tighter text-3xl text-white">
                        {logo}
                    </p>
                    <p className="tracking-tight font-light text-white capitalize">
                        {name}
                    </p>
                </div>
                <p
                    className={`${
                        open ? "" : "-rotate-90"
                    } leading-3 tracking-tighter text-sm text-white useTransition`}
                >
                    <KeyboardArrowDown color="inherit" fontSize="inherit" />
                </p>
            </div>
            <div
                className={`${
                    open ? "max-h-[300px]" : "max-h-0 overflow-hidden"
                } useTransition  w-full px-10`}
            >
                {children}
            </div>
        </div>
    );
}

function Item({ logo, links, active, name }) {
    return (
        <Link
            href={links}
            className={`${
                route().current(active) ? "bg-slate-9000" : ""
            } useTransition flex items-center gap-x-3 py-2 px-3 hover:bg-slate-800 hover:cursor-pointer`}
        >
            <p className="leading-3 tracking-tighter text-xl text-white">
                {logo}
            </p>
            <p className="tracking-tight font-light text-sm text-white capitalize">
                {name}
            </p>
        </Link>
    );
}

DropdownLink.Item = Item;
export default DropdownLink;
