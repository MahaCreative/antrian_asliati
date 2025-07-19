import InputText from "@/Components/InputText";
import AuthLayouts from "@/Layouts/AuthLayouts";
import moment from "moment";
import React from "react";

export default function Index(props) {
    const pasien = props.pasien;
    return (
        <div className="bg-white py-4 drop-shadow-sm px-4 mx-8 my-4 rounded-md">
            <div className="flex justify-between items-center py-6">
                <InputText className={"w-[200px]"} placeholder="Cari..." />
            </div>
            <table className="table w-full">
                <thead>
                    <tr className="border-b border-blue-500/50 bg bg-blue-100">
                        <th className="font-medium tracking-tighter w-[10px]">
                            #
                        </th>

                        <th className="font-medium tracking-tighter w-[160px]">
                            Nik
                        </th>
                        <th className="font-medium tracking-tighter w-[160px]">
                            BPJS
                        </th>
                        <th className="font-medium tracking-tighter w-[160px]">
                            Phone Number
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
                            Alamat
                        </th>
                        <th className="font-medium tracking-tighter w-[160px]">
                            Tanggal Terdaftar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pasien.length > 0 ? (
                        pasien.map((item, key) => (
                            <>
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
                                        <p>{item.nik}</p>
                                    </td>
                                    <td className="capitalize text-center w-[160px]">
                                        <p>{item.bpjs}</p>
                                    </td>
                                    <td className="capitalize text-center w-[160px]">
                                        <p>{item.phone_number}</p>
                                    </td>
                                    <td className="capitalize text-center w-[160px]">
                                        {item.nama}
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
                                    <td className="capitalize text-left w-[160px]">
                                        {item.alamat}
                                    </td>
                                    <td className="capitalize text-left w-[160px]">
                                        {moment(item.created_at).format(
                                            "D-M-Y"
                                        )}
                                    </td>
                                </tr>
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

Index.layout = (page) => <AuthLayouts children={page} title={"Data Pasien"} />;
