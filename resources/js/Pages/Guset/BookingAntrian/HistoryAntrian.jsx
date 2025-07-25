import ResponseAlert from "@/Hook/ResponseAlert";
import GuestLayouts from "@/Layouts/GuestLayouts";
import { router } from "@inertiajs/react";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function HistoryAntrian(props) {
    const { showALert } = ResponseAlert();
    const antrianPoli = props.antrianPoli || [];
    const progress = props.progress || [];
    const [params, setParams] = useState({
        cari: "",
        dari_tanggal: "",
        sampai_tanggal: "",
    });

    const getProgress = (item) => {
        const match = progress.find(
            (p) =>
                p.poli_id === item.poli_id &&
                p.tanggal_kunjungan === item.tanggal_kunjungan
        );
        return match ? match.terakhir_dipanggil : null;
    };
    useEffect(() => {
        Echo.channel("antrianPoli").listen("AntrianPoliEvents", (data) => {
            console.log("Data dipanggil:", data);

            // cek apakah kd_antrian yang datang ada di daftar antrian user
            const found = antrianPoli.find(
                (item) => item.kd_antrian === data.antrian.kd_antrian
            );

            if (found) {
                // kalau ditemukan, berarti ini antrian user
                alert(
                    `⚡ Antrian Anda (${found.kd_antrian}) sedang dipanggil!`
                );
            }

            // reload data jika diperlukan
            router.reload({ preserveScroll: true });
        });
    }, [antrianPoli]); // pastikan listen hanya sekali, dan antrianPoli di-deps jika daftar berubah

    return (
        <div className="px-4 md:px-8 lg:px-16 py-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Riwayat Antrian
                </h1>
                <p className="text-gray-500 mt-2 text-sm">
                    Lihat riwayat antrian Anda beserta progres antrian saat ini.
                </p>
            </div>
            {/* Filter */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Cari nama / kode antrian..."
                    value={params.cari}
                    onChange={(e) =>
                        setParams({ ...params, cari: e.target.value })
                    }
                    className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3"
                />
                <input
                    type="date"
                    value={params.dari_tanggal}
                    onChange={(e) =>
                        setParams({ ...params, dari_tanggal: e.target.value })
                    }
                    className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-48"
                />
                <input
                    type="date"
                    value={params.sampai_tanggal}
                    onChange={(e) =>
                        setParams({ ...params, sampai_tanggal: e.target.value })
                    }
                    className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-48"
                />
            </div>
            {/* Card List */}
            {antrianPoli.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {antrianPoli.map((item, idx) => {
                        const currentProgress = getProgress(item);
                        return (
                            <div
                                key={idx}
                                className={`rounded-xl shadow-md overflow-hidden border-t-4 transition-transform hover:scale-105 ${
                                    item.status === "called"
                                        ? "border-red-500"
                                        : item.status === "selesai"
                                        ? "border-green-500"
                                        : "border-blue-500"
                                } bg-white`}
                            >
                                <div className="p-5 flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">
                                            {moment(
                                                item.tanggal_kunjungan
                                            ).format("DD MMM YYYY")}
                                        </span>
                                        <span
                                            className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                                                item.status === "called"
                                                    ? "bg-red-100 text-red-600"
                                                    : item.status === "selesai"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-blue-100 text-blue-600"
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {item.nama_pasien}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Poli:{" "}
                                        <span className="font-medium text-gray-800">
                                            {item.poli?.nama_poli}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Dokter:{" "}
                                        <span className="font-medium text-gray-800">
                                            {item.dokter?.nama_lengkap}
                                        </span>
                                    </p>
                                    <div className="mt-2">
                                        <span className="text-gray-500 text-sm">
                                            Kode Antrian
                                        </span>
                                        <div className="text-2xl font-bold text-blue-600">
                                            {item.kd_antrian}
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        {currentProgress ? (
                                            <p className="text-sm text-gray-600">
                                                Dipanggil sampai:{" "}
                                                <span className="font-bold text-green-600">
                                                    {currentProgress}
                                                </span>
                                                <br />
                                                Antrian Anda:{" "}
                                                <span className="font-bold text-blue-600">
                                                    {item.kd_antrian}
                                                </span>
                                            </p>
                                        ) : (
                                            <p className="text-sm text-yellow-600 font-medium">
                                                Belum ada progres
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    Belum ada data antrian.
                </div>
            )}

            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    📢 Panggilan Antrian Hari Ini
                </h2>
                {Object.keys(props.panggilanHariIni || {}).length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(props.panggilanHariIni).map(
                            ([poli_id, daftar], idx) => {
                                const namaPoli =
                                    daftar[0]?.poli?.nama_poli ||
                                    "Poli Tidak Diketahui";
                                // filter yg sudah dipanggil saja (status called/selesai)
                                const sudahDipanggil = daftar.filter(
                                    (a) =>
                                        a.status === "called" ||
                                        a.status === "selesai"
                                );
                                const terakhirDipanggil =
                                    sudahDipanggil.length > 0
                                        ? sudahDipanggil[
                                              sudahDipanggil.length - 1
                                          ].kd_antrian
                                        : "-";

                                return (
                                    <div
                                        key={idx}
                                        className="rounded-xl shadow-md overflow-hidden border-t-4 border-blue-500 bg-white"
                                    >
                                        <div className="p-5 flex flex-col gap-2">
                                            <h3 className="text-lg font-bold text-blue-700">
                                                {namaPoli}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Antrian terakhir dipanggil:
                                            </p>
                                            <p className="text-3xl font-extrabold text-green-600">
                                                {terakhirDipanggil}
                                            </p>
                                            <div className="mt-3">
                                                <p className="text-sm text-gray-500 mb-1">
                                                    Daftar Antrian Hari Ini:
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {daftar.map((a, i) => (
                                                        <span
                                                            key={i}
                                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                                a.status ===
                                                                "called"
                                                                    ? "bg-yellow-100 text-yellow-700"
                                                                    : a.status ===
                                                                      "selesai"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-gray-100 text-gray-700"
                                                            }`}
                                                        >
                                                            {a.kd_antrian}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        Belum ada panggilan antrian untuk hari ini.
                    </div>
                )}
            </div>
        </div>
    );
}

HistoryAntrian.layout = (page) => <GuestLayouts children={page} />;
