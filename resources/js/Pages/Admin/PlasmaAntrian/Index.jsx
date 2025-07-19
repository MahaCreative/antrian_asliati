import { router, usePage } from "@inertiajs/react";
import React from "react";

export default function Index(props) {
    const { profile_klinik, backgroundAntrian } = usePage().props;
    const antrianUmum = props.antrianUmum;
    const antrianPoli = props.antrianPoli;
    Echo.channel("calledOffline").listen("PanggilAntrianOfflineEvents", (e) => {
        router.reload({ preserveScroll: true });
    });
    Echo.channel("antrianPoli").listen("AntrianPoliEvents", (e) => {
        console.log(e);

        router.reload({ preserveScroll: true });
    });
    return (
        <div className="h-screen bg-blue-50 py-8 px-8 flex flex-col items-center justify-center w-full">
            <div className="drop-shadow-md  rounded-md py-2 px-4  bg-blue-50 w-full">
                <div className="flex flex-row items-start gap-x-3">
                    <img
                        className="bg-blue-500 h-12 w-12 object-cover object-center rounded-md"
                        src={`/storage/${profile_klinik.logo_klinik}`}
                        alt={profile_klinik.nama_klinik}
                    />
                    <div>
                        <h1 className="capitalize font-bold text-xl tracking-tight text-blue-500">
                            {profile_klinik.nama_klinik}
                        </h1>
                        <p className="capitalize text-xs tracking-tighter leading-3">
                            {profile_klinik.address} Phone{" "}
                            {profile_klinik.phone_number}
                        </p>
                    </div>
                    <p></p>
                </div>
                <div className="flex flex-row gap-x-4 items-start justify-between py-6">
                    <div className="grid grid-cols-1  gap-2 w-full">
                        <div className="w-full bg-blue-600 drop-shadow-md h-[250px] flex flex-col items-center justify-center gap-y-6 rounded-md">
                            <p className="text-white text-xl">Antrian Umum</p>

                            {antrianUmum ? (
                                <p className="tracking-tighter font-bold text-6xl text-white">
                                    {antrianUmum.kd_antrian}
                                </p>
                            ) : (
                                <p className="tracking-tighter font-bold text-lg text-center text-white">
                                    Belum ada antrian terpanggil
                                </p>
                            )}

                            <div className="text-center border-t border-white/50 w-full flex flex-col justify-center py-3">
                                {antrianUmum ? (
                                    <p className="tracking-tighter font-bold uppercase text-2xl text-white">
                                        {antrianUmum.tujuan}
                                    </p>
                                ) : (
                                    <p className="tracking-tighter font-bold text-lg text-center text-white">
                                        Belum ada antrian terpanggil
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full bg-green-600 drop-shadow-md h-[250px] flex flex-col items-center justify-center gap-y-6 rounded-md">
                            <p className="text-white text-xl">Antrian Poli</p>
                            {antrianPoli ? (
                                <p className="tracking-tighter font-bold text-6xl text-white">
                                    {antrianPoli.kd_antrian}
                                </p>
                            ) : (
                                <p className="tracking-tighter font-bold text-lg text-center text-white">
                                    Belum ada antrian terpanggil
                                </p>
                            )}
                            <div className="text-center border-t border-white/50 w-full">
                                {antrianPoli ? (
                                    <p className="tracking-tighter font-bold uppercase text-2xl text-white">
                                        {antrianPoli.nama}
                                    </p>
                                ) : (
                                    <p className="tracking-tighter font-bold text-lg text-center text-white">
                                        Belum ada antrian terpanggil
                                    </p>
                                )}
                                {antrianPoli ? (
                                    <p className="tracking-tighter font-bold uppercase text-2xl text-white">
                                        {antrianPoli.tujuan}
                                    </p>
                                ) : (
                                    <p className="tracking-tighter font-bold text-lg text-center text-white">
                                        Belum ada antrian terpanggil
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        {backgroundAntrian ? (
                            backgroundAntrian.jenis == "image" ? (
                                <img
                                    src={
                                        backgroundAntrian.jenis_source ==
                                        "upload"
                                            ? "/storage/" +
                                              backgroundAntrian.file_name
                                            : backgroundAntrian.file_name
                                    }
                                    alt=""
                                    className="w-full h-[350px] object-contain bg-blue-500"
                                />
                            ) : (
                                <video src="" />
                            )
                        ) : (
                            <img
                                src={"/storage/" + profile_klinik.logo_klinik}
                                alt=""
                                className="w-full h-[350px] bg-blue-500"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
