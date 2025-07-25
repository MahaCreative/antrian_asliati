import React, { useState } from "react";
import GuestLayouts from "@/Layouts/GuestLayouts";
import InputText from "@/Components/InputText";

import TextArea from "@/Components/TextArea";
import AuthLayouts from "@/Layouts/AuthLayouts";
import { useForm } from "@inertiajs/react";
import moment from "moment";

export default function ProsesAntrian({ pasien, rekamMedis, id_antrian }) {
    // pasien = {nama, tgl_lahir, nik, alamat, jenis_kelamin, foto}
    // rekamMedis = array daftar rekam medis sebelumnya
    const { data, setData, post, errors, reset } = useForm({
        id_antrian: id_antrian || "", // pastikan ada id_antrian
        keluhan: "",
        pemeriksaan: "",
        diagnosa: "",
        rencana: "",
        tindakan: "",
        obat: "", // ini bisa diisi string dipisah koma atau array
        hasil_penunjang: null, // ini untuk file
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setData(name, files); // untuk multiple file
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // kirim ke backend (axios.post)
        post(route("proses-antrian.store", pasien.id));
    };

    return (
        <div className="px-6 py-6 w-full">
            {/* Header Data Pasien */}
            <div className="bg-white p-4 rounded-md shadow-md mb-6 flex flex-col md:flex-row items-center gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                    {/* Foto pasien jika ada */}
                    {pasien.avatar ? (
                        <img
                            src={pasien.avatar}
                            alt="Foto Pasien"
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                            Foto
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {pasien.nama}
                    </h2>
                    <p className="text-gray-600 text-sm">
                        TTL: {pasien.tgl_lahir} | NIK: {pasien.nik}
                    </p>
                    <p className="text-gray-600 text-sm">
                        Alamat: {pasien.alamat}
                    </p>
                    <p className="text-gray-600 text-sm">
                        Jenis Kelamin: {pasien.jenis_kelamin}
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-md shadow-md mb-6 space-y-4 w-full"
            >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Input Rekam Medis
                </h3>

                {/* Keluhan & Pemeriksaan */}
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full">
                        <TextArea
                            className="w-full"
                            label="Keluhan"
                            name="keluhan"
                            value={data.keluhan}
                            onChange={handleChange}
                            placeholder="Keluhan pasien..."
                        />
                    </div>
                    <div className="w-full">
                        <TextArea
                            className="w-full"
                            label="Pemeriksaan Fisik"
                            name="pemeriksaan"
                            value={data.pemeriksaan}
                            onChange={handleChange}
                            placeholder="Hasil pemeriksaan fisik..."
                        />
                    </div>
                </div>

                {/* Diagnosa & Rencana */}
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full">
                        <TextArea
                            className="w-full"
                            label="Diagnosa"
                            name="diagnosa"
                            value={data.diagnosa}
                            onChange={handleChange}
                            placeholder="Diagnosa dokter..."
                        />
                    </div>
                    <div className="w-full">
                        <TextArea
                            className="w-full"
                            label="Rencana"
                            name="rencana"
                            value={data.rencana}
                            onChange={handleChange}
                            placeholder="Rencana tindakan selanjutnya..."
                        />
                    </div>
                </div>

                {/* Tindakan */}
                <div className="w-full">
                    <TextArea
                        className="w-full"
                        label="Tindakan"
                        name="tindakan"
                        value={data.tindakan}
                        onChange={handleChange}
                        placeholder="Tindakan medis yang dilakukan..."
                    />
                </div>

                {/* Obat */}
                <div className="w-full">
                    <InputText
                        className="w-full"
                        label="Obat (pisahkan dengan koma)"
                        name="obat"
                        value={data.obat}
                        onChange={(e) => setData("obat", e.target.value)}
                        placeholder="Contoh: Paracetamol, Amoxicillin"
                    />
                </div>

                {/* Hasil Penunjang */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hasil Penunjang (upload file/lampiran)
                    </label>
                    <input
                        type="file"
                        name="hasil_penunjang"
                        multiple
                        onChange={(e) =>
                            setData("hasil_penunjang", e.target.files)
                        }
                        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        Simpan Rekam Medis
                    </button>
                </div>
            </form>

            <div className="bg-white p-6 rounded-md shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Riwayat Rekam Medis
                </h3>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-sm font-medium text-left">
                                    Tanggal
                                </th>
                                <th className="px-4 py-3 text-sm font-medium text-left">
                                    Keluhan
                                </th>
                                <th className="px-4 py-3 text-sm font-medium text-left">
                                    Pemeriksaan
                                </th>
                                <th className="px-4 py-3 text-sm font-medium text-left">
                                    Diagnosa
                                </th>
                                <th className="px-4 py-3 text-sm font-medium text-left">
                                    Rencana
                                </th>
                                <th className="px-4 py-3 text-sm font-medium text-left">
                                    Tindakan
                                </th>
                                <th className="px-4 py-3 text-sm font-medium text-left">
                                    Obat
                                </th>
                                <th className="px-4 py-3 text-sm font-medium text-left">
                                    Hasil Penunjang
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {rekamMedis.length > 0 ? (
                                rekamMedis.map((rm, idx) => (
                                    <tr
                                        key={idx}
                                        className={`border-b hover:bg-blue-50 ${
                                            idx % 2 === 0
                                                ? "bg-gray-50"
                                                : "bg-white"
                                        }`}
                                    >
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            {moment(rm.tanggal).format(
                                                "DD-MM-YYYY"
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            {rm.keluhan || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            {rm.pemeriksaan || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            {rm.diagnosa || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            {rm.rencana || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            {rm.tindakan || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            {Array.isArray(rm.obat)
                                                ? rm.obat.join(", ")
                                                : rm.obat || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            {rm.hasil_penunjang &&
                                            rm.hasil_penunjang.length > 0 ? (
                                                rm.hasil_penunjang.map(
                                                    (path, index) => {
                                                        // gabungkan path dengan base url, misalnya pakai /storage/
                                                        const fullUrl = `/storage/${path}`;
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex items-center gap-2 mb-2"
                                                            >
                                                                <a
                                                                    href={
                                                                        fullUrl
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 underline"
                                                                >
                                                                    Lihat Hasil{" "}
                                                                    {index + 1}
                                                                </a>
                                                            </div>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <span className="text-gray-500 italic">
                                                    Tidak ada hasil penunjang.
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="text-center py-6 text-gray-500 italic"
                                    >
                                        Belum ada data rekam medis.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

ProsesAntrian.layout = (page) => (
    <AuthLayouts children={page} title="Rekam Medis" />
);
