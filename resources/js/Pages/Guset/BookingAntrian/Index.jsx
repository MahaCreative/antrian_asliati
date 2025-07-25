import InputText from "@/Components/InputText";
import SelectOptions from "@/Components/SelectOptions";
import TextArea from "@/Components/TextArea";
import GuestLayouts from "@/Layouts/GuestLayouts";
import { router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id"; // agar hari bahasa Indonesia
import axios from "axios";
import ResponseAlert from "@/Hook/ResponseAlert";
dayjs.locale("id");
export default function Index(props) {
    const { showResponse } = ResponseAlert();
    const [loading, setLoading] = useState(false);
    const user = props.user;
    const antrianSaya = props.antrianSaya;
    const pasien = props.pasien;
    const poli = props.poli;
    const dokter = props.dokter;
    const jadwalDokter = props.jadwalDokter;
    const [jumlahAntrian, setJumlahAntrian] = useState(null);
    const bookingRef = useRef(null);

    const { data, setData, post, reset, errors, setError } = useForm({
        id: user.id,
        name: "",
        phone_number: "",
        nik: "",
        bpjs: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        alamat: "",
        tanggal_kunjungan: "",
        dokter_id: "",
        poli_id: "",
        keluarga_id: "",
    });
    const changeTanggalKunjungan = (e) => {
        const selectedDate = e.target.value; // format: YYYY-MM-DD
        const selectedDay = dayjs(selectedDate).format("dddd").toLowerCase();

        // gunakan nama variabel baru agar tidak konflik
        const jadwalDokterFiltered = jadwalDokter.filter(
            (j) => j.dokter_id == data.dokter_id
        );

        // cek apakah selectedDay ada di jadwal dokter
        const isHariBuka = jadwalDokterFiltered.some(
            (j) => j.hari.toLowerCase() === selectedDay
        );

        if (!isHariBuka) {
            alert(
                `Dokter tidak praktek di hari ${selectedDay}. Silakan pilih hari lain.`
            );
            setData("tanggal_kunjungan", "");
            return;
        }

        setData("tanggal_kunjungan", selectedDate);
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true); // mulai loading
        try {
            const response = await axios.post(
                route("store-booking-antrian"),
                data
            );

            // ✅ jika sukses
            if (response.data && response.data.kd_antrian) {
                showResponse(
                    "success",
                    "Antrian Berhasil Dibuat",
                    `Kode Antrian Anda: ${response.data.kd_antrian}`
                );

                // reset form kalau mau
                reset();
            } else {
                showResponse(
                    "success",
                    "Antrian Berhasil Dibuat",
                    "Antrian berhasil dibuat, silakan tunggu giliran Anda."
                );
            }
        } catch (err) {
            // ✅ tangani validasi error dari server
            if (err.response && err.response.data) {
                if (err.response.data.errors) {
                    setError(err.response.data.errors);
                }
                if (err.response.data.message) {
                    showResponse(
                        "error",
                        "Gagal Membuat Antrian",
                        err.response.data.message
                    );
                }
            } else {
                // jika error tidak dikenal
                showResponse(
                    "error",
                    "Kesalahan Sistem",
                    "Terjadi kesalahan saat menghubungi server."
                );
            }
        } finally {
            setLoading(false); // selesai loading
        }
    };

    const cekJumlahAntrian = async (dokterId, poliId, tanggal) => {
        if (!dokterId || !poliId || !tanggal) return;
        try {
            const response = await axios.post(route("cek-jumlah-antrian"), {
                dokter_id: dokterId,
                poli_id: poliId,
                tanggal_kunjungan: tanggal,
            });
            setJumlahAntrian(response.data.jumlah);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        cekJumlahAntrian(data.dokter_id, data.poli_id, data.tanggal_kunjungan);
    }, [data.dokter_id, data.poli_id, data.tanggal_kunjungan]);

    return (
        <div className="w-full">
            <div className="bg-gradient-to-r from-blue-50 to-white py-12 px-6">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
                    Reservasi Antrian Online
                </h1>
                <p className="text-center text-gray-600 max-w-2xl mx-auto">
                    Dapatkan nomor antrian Anda secara online dengan cepat dan
                    mudah. Tidak perlu antre lama di klinik, cukup isi form
                    berikut dan datang sesuai jadwal.
                </p>

                <div className="bg-white py-10 px-4 md:px-8 lg:px-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
                        Reservasi Jadwal Pemeriksaan
                    </h1>
                    <div className="flex my-3 justify-center">
                        <div className="w-[60px] h-[3px] bg-gray-200 rounded-l-md"></div>
                        <div className="w-[60px] h-[3px] bg-blue-500"></div>
                        <div className="w-[60px] h-[3px] bg-gray-200 rounded-r-md"></div>
                    </div>
                    <p className="text-center text-gray-600 max-w-3xl mx-auto">
                        Silakan isi formulir di bawah ini untuk mengambil nomor
                        antrian. Pastikan Anda memilih poli dan dokter sesuai
                        jadwal praktek yang tersedia.
                    </p>

                    {/* Flexbox utama */}
                    <div className="mt-10 flex flex-col lg:flex-row gap-8">
                        {/* Formulir */}
                        <div className="lg:w-1/2 bg-gray-50 p-6 rounded-xl shadow-md">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Formulir Pendaftaran
                            </h2>
                            <form
                                onSubmit={submitHandler}
                                className="space-y-4"
                            >
                                <SelectOptions
                                    name="keluarga_id"
                                    label="Pilih Keluarga"
                                    value={data.keluarga_id}
                                    errors={errors.keluarga_id}
                                    onChange={(e) =>
                                        setData("keluarga_id", e.target.value)
                                    }
                                >
                                    <option value="">
                                        Pilih anggota keluarga
                                    </option>
                                    {pasien.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nama} ({item.status})
                                        </option>
                                    ))}
                                </SelectOptions>

                                <SelectOptions
                                    name="poli_id"
                                    label="Layanan Klinik"
                                    value={data.poli_id}
                                    errors={errors.poli_id}
                                    onChange={(e) =>
                                        setData("poli_id", e.target.value)
                                    }
                                >
                                    <option value="">
                                        Pilih Layanan Klinik
                                    </option>
                                    {poli.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nama_poli}
                                        </option>
                                    ))}
                                </SelectOptions>

                                <SelectOptions
                                    name="dokter_id"
                                    label="Dokter"
                                    value={data.dokter_id}
                                    errors={errors.dokter_id}
                                    onChange={(e) =>
                                        setData("dokter_id", e.target.value)
                                    }
                                >
                                    <option value="">Pilih Dokter</option>
                                    {dokter
                                        .filter(
                                            (d) =>
                                                data.poli_id === "" ||
                                                d.poli_id == data.poli_id
                                        )
                                        .map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.nama_lengkap}
                                            </option>
                                        ))}
                                </SelectOptions>

                                {data.dokter_id !== "" && (
                                    <InputText
                                        label="Tanggal Kunjungan"
                                        type="date"
                                        name="tanggal_kunjungan"
                                        value={data.tanggal_kunjungan}
                                        errors={errors.tanggal_kunjungan}
                                        onChange={(e) =>
                                            changeTanggalKunjungan(e)
                                        }
                                        className="w-full"
                                    />
                                )}
                            </form>
                        </div>

                        {/* Jadwal Dokter */}
                        <div className="lg:w-1/2 bg-gray-50 p-6 rounded-xl shadow-md">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Jadwal Dokter
                            </h2>
                            <p className="text-gray-600 mb-4 text-sm">
                                Lihat jadwal praktek dokter di bawah ini sebelum
                                memilih tanggal.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border">
                                    <thead>
                                        <tr className="bg-blue-100 text-gray-700">
                                            <th className="py-2 px-3 border">
                                                #
                                            </th>
                                            <th className="py-2 px-3 border">
                                                Nama Dokter
                                            </th>
                                            <th className="py-2 px-3 border">
                                                Poli
                                            </th>
                                            <th className="py-2 px-3 border">
                                                Hari
                                            </th>
                                            <th className="py-2 px-3 border">
                                                Mulai
                                            </th>
                                            <th className="py-2 px-3 border">
                                                Selesai
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jadwalDokter.map(
                                            (item, idx) =>
                                                data.dokter_id ==
                                                    item.dokter_id && (
                                                    <tr
                                                        key={item.id}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="py-2 px-3 border text-center">
                                                            {idx + 1}
                                                        </td>
                                                        <td className="py-2 px-3 border capitalize">
                                                            {
                                                                item.dokter
                                                                    .nama_lengkap
                                                            }
                                                        </td>
                                                        <td className="py-2 px-3 border capitalize">
                                                            {
                                                                item.dokter.poli
                                                                    ?.nama_poli
                                                            }
                                                        </td>
                                                        <td className="py-2 px-3 border capitalize">
                                                            {item.hari}
                                                        </td>
                                                        <td className="py-2 px-3 border">
                                                            {item.start_time}
                                                        </td>
                                                        <td className="py-2 px-3 border">
                                                            {item.end_time}
                                                        </td>
                                                    </tr>
                                                )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {data.dokter_id &&
                                data.poli_id &&
                                data.tanggal_kunjungan && (
                                    <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                                        <p className="text-gray-700">
                                            Antrian saat ini untuk dokter{" "}
                                            <span className="font-semibold">
                                                {
                                                    dokter.find(
                                                        (d) =>
                                                            d.id ==
                                                            data.dokter_id
                                                    )?.nama_lengkap
                                                }
                                            </span>{" "}
                                            di poli{" "}
                                            <span className="font-semibold">
                                                {
                                                    poli.find(
                                                        (p) =>
                                                            p.id == data.poli_id
                                                    )?.nama_poli
                                                }
                                            </span>{" "}
                                            pada tanggal{" "}
                                            <span className="font-semibold">
                                                {dayjs(
                                                    data.tanggal_kunjungan
                                                ).format("DD MMMM YYYY")}
                                            </span>{" "}
                                            adalah:
                                        </p>
                                        <p className="text-3xl font-bold text-blue-700 mt-2">
                                            {jumlahAntrian ?? "…"} pasien
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {jumlahAntrian > 20 &&
                                                "⚠️ Antrian sudah cukup banyak, Anda bisa mempertimbangkan memilih hari lain."}
                                        </p>
                                    </div>
                                )}
                            <button
                                onClick={submitHandler}
                                type="submit"
                                className="py-2 px-4 my-2 bg-blue-600 hover:bg-blue-800 transition text-white tracking-tighter rounded-md disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading
                                    ? "Mengambil Antrian..."
                                    : "Ambil Antrian"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* INFO ANTRIAN SAYA */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">
                        Antrian Saya
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-xl shadow-md">
                            <thead>
                                <tr className="bg-blue-100 text-gray-700">
                                    <th className="py-3 px-4 text-left">
                                        Kode
                                    </th>
                                    <th className="py-3 px-4 text-left">
                                        Poli
                                    </th>
                                    <th className="py-3 px-4 text-left">
                                        Tanggal
                                    </th>
                                    <th className="py-3 px-4 text-left">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {antrianSaya.map((a) => (
                                    <tr
                                        key={a.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="py-2 px-4 font-bold">
                                            {a.kd_antrian || "-"}
                                        </td>
                                        <td className="py-2 px-4">
                                            {a.poli?.nama_poli}
                                        </td>
                                        <td className="py-2 px-4">
                                            {a.tanggal_kunjungan}
                                        </td>
                                        <td className="py-2 px-4">
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                Menunggu
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <GuestLayouts children={page} title={"Buat Antrian"} />
);
