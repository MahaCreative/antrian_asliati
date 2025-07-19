import InputText from "@/Components/InputText";
import SelectOptions from "@/Components/SelectOptions";
import AuthLayouts from "@/Layouts/AuthLayouts";
import { router, usePage } from "@inertiajs/react";
import moment from "moment";
import React, { useState } from "react";

export default function Index(props) {
    const antrianPoli = props.antrianPoli;
    const [params, setParams] = useState({ poli: "", date: "" });
    const { poli } = usePage().props;
    const updateHandler = (id, value) => {
        router.post(route("admin.panggil-antrian-poli"), {
            antrian_id: id,
            status: value,
        });
    };
    return (
        <div className="bg-white py-4 drop-shadow-sm px-4 mx-8 my-4 rounded-md">
            <div className="flex justify-between items-center py-6">
                <div className="w-1/6">
                    <SelectOptions
                        onChange={(e) =>
                            setParams({ ...params, poli: e.target.value })
                        }
                    >
                        <option value={""}>Pilih poli terlebih dahulu</option>
                        {poli.map((item, key) => (
                            <option key={key} value={item.id}>
                                {item.nama_poli}
                            </option>
                        ))}
                    </SelectOptions>
                </div>
                <InputText className={"w-[200px]"} placeholder="Cari..." />
            </div>
            <table className="table w-full">
                <thead>
                    <tr className="border-b border-blue-500/50">
                        <th className="font-medium tracking-tighter w-[10px]">
                            #
                        </th>

                        <th className="font-medium tracking-tighter w-24">
                            Kd Antrian
                        </th>

                        <th className="font-medium tracking-tighter w-[160px]">
                            Nama Pasien
                        </th>

                        <th className="font-medium tracking-tighter w-[160px]">
                            Tanggal Lahir
                        </th>
                        <th className="font-medium tracking-tighter w-[160px]">
                            Umur
                        </th>

                        <th className="font-medium tracking-tighter w-[160px]">
                            Poli Tujuan
                        </th>
                        <th className="font-medium tracking-tighter w-[160px]">
                            Dokter
                        </th>
                        <th className="font-medium tracking-tighter w-[160px]">
                            Status
                        </th>

                        <th className="font-medium tracking-tighter">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {antrianPoli.length > 0 ? (
                        antrianPoli.map((item, key) => (
                            <>
                                {item.poli_id == params.poli && (
                                    <tr
                                        key={key}
                                        className={`${
                                            item.status == "called"
                                                ? "bg-red-100"
                                                : item.status == "selesai" &&
                                                  "bg-green-100"
                                        } border-b border-blue-600/50`}
                                    >
                                        <td className={`text-center w-[10px]`}>
                                            {key + 1}
                                        </td>

                                        <td className="capitalize text-center w-[160px]">
                                            {item.kd_antrian}
                                        </td>

                                        <td className="capitalize text-center w-[160px]">
                                            {item.nama_pasien}
                                        </td>
                                        <td className="capitalize text-center w-[160px]">
                                            {item.tanggal_lahir}
                                        </td>
                                        <td className="capitalize text-center w-[160px]">
                                            {moment().diff(
                                                moment(
                                                    item.tanggal_lahir,
                                                    "YYYY-MM-DD"
                                                ),
                                                "years"
                                            ) + " Tahun"}
                                        </td>

                                        <td className="capitalize text-center w-[160px]">
                                            {item.poli.nama_poli}
                                        </td>
                                        <td className="capitalize text-center w-[160px]">
                                            {item.dokter.nama_lengkap}
                                        </td>

                                        <td className="capitalize w-[179px] text-center">
                                            {item.status}
                                        </td>

                                        <td className="flex justify-center items-center">
                                            {item.status != "selesai" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            updateHandler(
                                                                item.id,
                                                                "called"
                                                            )
                                                        }
                                                        className="py-1.5 px-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 useTransition"
                                                    >
                                                        Panggil
                                                    </button>

                                                    {item.status ==
                                                        "called" && (
                                                        <button
                                                            onClick={() =>
                                                                prosesHandler(
                                                                    item
                                                                )
                                                            }
                                                            className="py-1.5 px-2 rounded-md text-white bg-green-500 hover:bg-green-600 useTransition"
                                                        >
                                                            Proses
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))
                    ) : (
                        <tr>
                            <td
                                className="py-2 text-center bg-blue-100"
                                colSpan={12}
                            >
                                Belum ada data yang ditambahkan, silahkan klick
                                tambah untuk menambahkan
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

Index.layout = (page) => (
    <AuthLayouts children={page} title={"Kelola Antrian Offline"} />
);
