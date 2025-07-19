import { Head, Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import MenuLink from "../Components/MenuLink";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
    ArrowForward,
    ArrowForwardIos,
    Face,
    Group,
    Home,
    Image,
    List,
    LocalHospital,
    LockClock,
    MedicalInformation,
    Print,
    Settings,
    Timelapse,
    Timeline,
} from "@mui/icons-material";
import DropdownLink from "@/Components/DropdownLink";

export default function AuthLayouts({ title, children }) {
    const { profile_klinik, auth } = usePage().props;
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openUser, setOpenUser] = useState(false);
    console.log(auth.user);

    return (
        <div className="w-full min-h-screen bg-blue-50 flex items-start font-serif">
            {/* navigation */}
            <Head title={title} />
            <div
                className={`${
                    openSidebar ? "w-[350px]" : "w-0"
                } useTransition  bg-gradient-to-br from-blue-500 via-blue-800 to-blue-900 min-h-screen  relative`}
            >
                <div className={`${openSidebar ? "" : "hidden"}`}>
                    <div className="py-2 flex items-center gap-x-1 border-b border-white/50">
                        <img
                            src={"/storage/" + profile_klinik.logo_klinik}
                            alt={profile_klinik.nama_klinik}
                            className="w-20 h-20 object-cover object-center"
                        />
                        <div>
                            <h1 className="capitalize text-lg font-serif text-white tracking-tighter leading-5 font-semibold my-2">
                                {profile_klinik.nama_klinik}
                            </h1>
                            <p className="font-light tracking-tighter leading-4 text-xs text-white">
                                {profile_klinik.address}
                            </p>
                        </div>
                    </div>
                    {/* navigation */}

                    <MenuLink
                        links={route("dashboard")}
                        logo={
                            <DashboardIcon color="inherit" fontSize="inherit" />
                        }
                        active={"dashboard"}
                        name={"Dashboard"}
                    />
                    {auth.user.role == "petugas" && (
                        <MenuLink
                            links={route("admin.profile-klinik")}
                            logo={
                                <Settings color="inherit" fontSize="inherit" />
                            }
                            active={"admin.profile-klinik"}
                            name={"Profile Klinik"}
                        />
                    )}

                    <p className="font-light text-white mx-4 my-3 text-sm border-b border-white/50">
                        {" "}
                        Master Data
                    </p>

                    {auth.user.role == "petugas" && (
                        <>
                            <MenuLink
                                links={route("admin.kelola-poli")}
                                logo={
                                    <LocalHospital
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                                active={"admin.kelola-poli"}
                                name={"kelola poli"}
                            />
                            <DropdownLink
                                logo={
                                    <MedicalInformation
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                                name={"kelola dokter"}
                            >
                                <DropdownLink.Item
                                    links={route("admin.kelola-dokter")}
                                    logo={
                                        <MedicalInformation
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    }
                                    active={"admin.kelola-dokter"}
                                    name={"Dokter"}
                                />
                                <DropdownLink.Item
                                    links={route("admin.kelolad-jadwal-dokter")}
                                    logo={
                                        <LockClock
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    }
                                    active={"admin.kelolad-jadwal-dokter"}
                                    name={"Jadwal Dokter"}
                                />
                            </DropdownLink>
                        </>
                    )}
                    {auth.user.role == "dokter" && (
                        <MenuLink
                            links={route("admin.antrian-poli")}
                            logo={
                                <Timeline color="inherit" fontSize="inherit" />
                            }
                            active={"admin.antrian-poli"}
                            name={"Antrian Klinik"}
                        />
                    )}
                    {auth.user.role == "petugas" && (
                        <DropdownLink
                            logo={<Group color="inherit" fontSize="inherit" />}
                            name={"User"}
                        >
                            <DropdownLink.Item
                                links={route("admin.kelola-petugas")}
                                logo={
                                    <Group color="inherit" fontSize="inherit" />
                                }
                                active={"admin.kelola-petugas"}
                                name={"Kelola Petugas"}
                            />

                            <DropdownLink.Item
                                links={route("admin.kelola-pasien")}
                                logo={
                                    <Face color="inherit" fontSize="inherit" />
                                }
                                active={"admin.kelola-pasien"}
                                name={"Data Pasien"}
                            />
                        </DropdownLink>
                    )}
                    {auth.user.role == "dokter" && (
                        <DropdownLink
                            logo={<Group color="inherit" fontSize="inherit" />}
                            name={"Pasien"}
                        >
                            <DropdownLink.Item
                                links={route("admin.kelola-petugas")}
                                logo={
                                    <Group color="inherit" fontSize="inherit" />
                                }
                                active={"admin.kelola-petugas"}
                                name={"Data Pasien"}
                            />

                            <DropdownLink.Item
                                links={route("admin.kelola-pasien")}
                                logo={
                                    <Face color="inherit" fontSize="inherit" />
                                }
                                active={"admin.kelola-pasien"}
                                name={"Riwayat Pemeriksaan"}
                            />
                        </DropdownLink>
                    )}
                    <p className="font-light text-white mx-4 my-3 text-sm border-b  border-white/50">
                        {" "}
                        Laporan
                    </p>
                    <MenuLink
                        links={route("admin.kelola-poli")}
                        logo={<Print color="inherit" fontSize="inherit" />}
                        active={"admin.kelola-poli"}
                        name={"Laporan Antrian Klinik"}
                    />
                </div>
                <button
                    onClick={() => setOpenSidebar(!openSidebar)}
                    className={`${
                        openSidebar ? "-right-5" : "-right-6"
                    } useTransition absolute top-[45%]  w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center`}
                >
                    <p className="text-white">
                        <KeyboardDoubleArrowRightIcon
                            color="inherit"
                            fontSize="inherit"
                        />
                    </p>
                </button>
            </div>
            {/* body */}
            <div className="w-full">
                {/* Top */}
                <div className="bg-white w-full drop-shadow-md px-5  flex flex-row justify-between items-center">
                    <p className="text-blue-700 font-medium text-lg tracking-tighter">
                        {title}
                    </p>
                    <div
                        onClick={() => setOpenUser(!openUser)}
                        className="flex gap-x-3 items-center hover:bg-blue-100 py-3 px-5 hover:cursor-pointer relative"
                    >
                        <img
                            src={"/storage/" + auth.user.avatar}
                            alt={auth.user.name}
                            className="w-12 h-12"
                        />
                        <p className="text-blue-500 text-xl capitalize">
                            {auth.user.name}
                        </p>
                        <p
                            className={`${
                                openUser ? "rotate-90" : ""
                            } text-blue-500`}
                        >
                            <ArrowForwardIos
                                color="inherit"
                                fontSize="inherit"
                            />
                        </p>
                        <div
                            className={`${
                                openUser ? "hidden" : ""
                            } absolute -bottom-20 w-[200px] right-0 z-[99999] bg-white rounded-md py-2 px-4 drop-shadow-md`}
                        >
                            <Link
                                as="button"
                                className="bloc hover:bg-blue-100 px-3 py-1 w-full"
                            >
                                Proflie
                            </Link>
                            <Link
                                href={route("logout")}
                                as="button"
                                className="block hover:bg-blue-100 px-3 py-2 w-full"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
                {/* body */}
                <div>
                    <div className="py-3 px-8">
                        <div className="flex gap-4 items-center border-b border-x-white/50">
                            <Link className="text-blue-400 font-medium">
                                Dashboard
                            </Link>
                            <p>/</p>
                            <p>{title}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
