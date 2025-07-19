import InputText from "@/Components/InputText";
import Modals from "@/Components/Modals";
import AuthLayouts from "@/Layouts/AuthLayouts";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import Form from "./Form";
import { router } from "@inertiajs/react";

export default function Index(props) {
    const dokter = props.dokter;
    const [model, setModel] = useState(null);
    const [modalTambah, setModalTambah] = useState(false);

    const closeHandler = () => {
        setModalTambah(false);
        setModel(null);
    };
    const editData = (data) => {
        setModalTambah(true);
        setModel(data);
    };
    const deleteData = (id) => {
        router.post(route("admin.delete-dokter", id));
    };

    return (
        <>
            <Modals open={modalTambah} setOpen={closeHandler}>
                <Form model={model} closeHandler={closeHandler} />
            </Modals>
            <div className="bg-white py-4 drop-shadow-sm px-4 mx-8 my-4 rounded-md">
                <div className="flex justify-between items-center py-6">
                    <button
                        onClick={() => setModalTambah(true)}
                        className="bg-blue-500 py-2 px-4 rounded-md shadow-md flex items-center gap-x-3 text-white tracking-tight useTransition hover:bg-blue-700"
                    >
                        <p className="text-white leading-3 text-xl">
                            <Add color="inherit" fontSize="inherit" />
                        </p>
                        <p>Tambah Dokter</p>
                    </button>
                    <InputText className={"w-[200px]"} placeholder="Cari..." />
                </div>
                <table className="table w-full">
                    <thead>
                        <tr className="border-b border-blue-500/50">
                            <th className="font-medium tracking-tighter w-[10px]">
                                #
                            </th>

                            <th className="font-medium tracking-tighter w-24">
                                Avatar
                            </th>
                            <th className="font-medium tracking-tighter w-[160px]">
                                NIP
                            </th>
                            <th className="font-medium tracking-tighter w-[160px]">
                                Email
                            </th>
                            <th className="font-medium tracking-tighter w-[160px]">
                                Nama Dokter
                            </th>
                            <th className="font-medium tracking-tighter w-[160px]">
                                Poli
                            </th>

                            <th className="font-medium tracking-tighter">
                                No Hp
                            </th>

                            <th className="font-medium tracking-tighter">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dokter.length > 0 ? (
                            dokter.map((item, key) => (
                                <tr key={key}>
                                    <td className="text-center w-[10px]">
                                        {key + 1}
                                    </td>
                                    <td className="w-24">
                                        <img
                                            src={"/storage/" + item.avatar}
                                            alt={item.nama_lengkap}
                                            className="w-24 object-cover object-center"
                                        />
                                    </td>
                                    <td className="capitalize text-center w-[160px]">
                                        {item.nip}
                                    </td>
                                    <td className="capitalize text-center w-[160px]">
                                        {item.user.email}
                                    </td>
                                    <td className="capitalize text-center w-[160px]">
                                        {item.nama_lengkap}
                                    </td>
                                    <td className="capitalize w-[179px] text-center">
                                        {item.poli.nama_poli}
                                    </td>
                                    <td className="capitalize w-[179px] text-center">
                                        {item.no_hp}
                                    </td>

                                    <td className="flex justify-center items-center">
                                        <button
                                            onClick={() => editData(item)}
                                            className="py-1.5 px-2 rounded-md text-white bg-orange-500 hover:bg-orange-600 useTransition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteData(item.id)}
                                            className="py-1.5 px-2 rounded-md text-white bg-red-500 hover:bg-red-600 useTransition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    className="py-2 text-center bg-blue-100"
                                    colSpan={8}
                                >
                                    Belum ada data yang ditambahkan, silahkan
                                    klick tambah untuk menambahkan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

Index.layout = (page) => (
    <AuthLayouts children={page} title={"Kelola Dokter"} />
);
