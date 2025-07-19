import AuthLayouts from "@/Layouts/AuthLayouts";
import { Head } from "@inertiajs/react";
import {
    Face3,
    LocalHospital,
    MedicalInformation,
    Timelapse,
    Timeline,
} from "@mui/icons-material";
import React from "react";

export default function Index(props) {
    const countPoli = props.countPoli;
    const countDokter = props.countDokter;
    const countPasien = props.countPasien;

    const countAntrianPoli = props.countAntrianPoli;
    console.log(countPoli);

    return (
        <div className="px-4 md:px-8 ">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-2">
                <div className=" rounded-md  bg-gradient-to-br from-blue-500  to-blue-600 flex justify-between flex-col items-center">
                    <div className="px-5 flex flex-row items-center justify-between w-full py-6">
                        <p className="text-6xl text-white leading-3">
                            <MedicalInformation
                                color="inherit"
                                fontSize="inherit"
                            />
                        </p>
                        <div className="text-right">
                            <p className="tracking-tighter text-white text-5xl font-bold">
                                {countDokter}
                            </p>
                        </div>
                    </div>
                    <p className="w-full text-center tracking-tight text-white text-sm font-semibold py-4 border-white border-t">
                        Jumlah Layanan Dokter
                    </p>
                </div>
                <div className=" rounded-md  bg-gradient-to-br from-pink-500  to-pink-600 flex justify-between flex-col items-center">
                    <div className="px-5 flex flex-row items-center justify-between w-full py-6">
                        <p className="text-6xl text-white leading-3">
                            <LocalHospital color="inherit" fontSize="inherit" />
                        </p>
                        <div className="text-right">
                            <p className="tracking-tighter text-white text-5xl font-bold">
                                {countPoli}
                            </p>
                        </div>
                    </div>
                    <p className="w-full text-center tracking-tight text-white text-sm font-semibold py-4 border-white border-t">
                        Jumlah Layanan Klinik
                    </p>
                </div>
                <div className=" rounded-md  bg-gradient-to-br from-green-500  to-green-600 flex justify-between flex-col items-center">
                    <div className="px-5 flex flex-row items-center justify-between w-full py-6">
                        <p className="text-6xl text-white leading-3">
                            <Face3 color="inherit" fontSize="inherit" />
                        </p>
                        <div className="text-right">
                            <p className="tracking-tighter text-white text-5xl font-bold">
                                {countPasien}
                            </p>
                        </div>
                    </div>
                    <p className="w-full text-center tracking-tight text-white text-sm font-semibold py-4 border-white border-t">
                        Jumlah Pasien Terdaftar
                    </p>
                </div>

                <div className=" rounded-md  bg-gradient-to-br from-amber-500  to-amber-600 flex justify-between flex-col items-center">
                    <div className="px-5 flex flex-row items-center justify-between w-full py-6">
                        <p className="text-6xl text-white leading-3">
                            <Timeline color="inherit" fontSize="inherit" />
                        </p>
                        <div className="text-right">
                            <p className="tracking-tighter text-white text-5xl font-bold">
                                {countAntrianPoli}
                            </p>
                        </div>
                    </div>
                    <p className="w-full text-center tracking-tight text-white text-sm font-semibold py-4 border-white border-t">
                        Jumlah Antrian Poli Saat Ini
                    </p>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <AuthLayouts children={page} title={"Dashboard"} />;
