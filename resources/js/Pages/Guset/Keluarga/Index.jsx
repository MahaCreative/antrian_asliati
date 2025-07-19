import Modals from "@/Components/Modals";
import GuestLayouts from "@/Layouts/GuestLayouts";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Form from "./Form";
import ResponseAlert from "@/Hook/ResponseAlert";
import { router } from "@inertiajs/react";

export default function Index(props) {
    const { showResponse, ResponseMethode } = ResponseAlert();
    const keluargaRef = useRef(null);
    const keluarga = props.keluarga;
    const [modal, setModal] = useState(false);
    const [model, setModel] = useState(null);
    const closeHandler = () => {
        setModal(false);
        setModel([]);
    };

    const editHandler = (item) => {
        setModel(item);
        setModal(true);
    };

    const deleteHandler = (item) => {
        ResponseMethode(
            "warning",
            "Yaking Ingin Hapus?",
            "yakin ingin menghapus keluarga " +
                item.nama +
                "? menghapus data akan menghapus segala data yang terkait dengannya",
            () => {
                router.delete(route("delete-data-keluarga", { id: item.id }));
            },
            () => {},
            "Yakin"
        );
    };

    return (
        <div>
            <Modals
                title={model ? "Update Data" : "Create Data"}
                open={modal}
                setOpen={closeHandler}
            >
                <Form closeHandler={closeHandler} model={model} />
            </Modals>
            <div
                ref={keluargaRef}
                className="bg-white py-16 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center"
            >
                <h1 className="text-4xl font-semibold tracking-tighter text-gray-800 text-center">
                    Daftar Anggota Keluarga
                </h1>
                <p>
                    Silakan atur data anggota keluarga Anda. Anggota keluarga
                    yang sudah ditambahkan dapat digunakan untuk mendaftar
                    antrian ke poli.
                </p>
            </div>
            <div className="px-4 md:px-8 lg:px-16 useTransition">
                <button
                    onClick={() => setModal(true)}
                    className="bg-blue-600 text-white py-2 px-3 rounded-md my-3"
                >
                    Tambah Anggota Keluarga
                </button>
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
                                Status
                            </th>
                            <th className="font-medium tracking-tighter w-[160px]">
                                Tanggal Terdaftar
                            </th>
                            <th className="font-medium tracking-tighter w-[160px]">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {keluarga.length > 0 ? (
                            keluarga.map((item, key) => (
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
                                            ) + " "}
                                        </td>
                                        <td className="capitalize text-left w-[160px]">
                                            {item.alamat}
                                        </td>
                                        <td className="capitalize text-left w-[160px]">
                                            {item.status}
                                        </td>
                                        <td className="capitalize text-left w-[160px]">
                                            {moment(item.created_at).format(
                                                "D-M-Y"
                                            )}
                                        </td>
                                        <td className="capitalize text-left w-[160px]">
                                            <div className="flex gap-x-3 items-center">
                                                {item.status !== "pribadi" && (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                editHandler(
                                                                    item
                                                                )
                                                            }
                                                            className="bg-orange-500 hover:bg-orange-600 rounded-md text-white py-2 px-4 "
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                deleteHandler(
                                                                    item
                                                                )
                                                            }
                                                            className="bg-red-500 hover:bg-red-600 rounded-md text-white py-2 px-4 "
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </div>
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
                                    Belum ada data yang ditambahkan, silahkan
                                    klick tambah untuk menambahkan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

Index.layout = (page) => <GuestLayouts children={page} />;
