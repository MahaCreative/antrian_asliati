import InputText from "@/Components/InputText";
import Modals from "@/Components/Modals";
import AuthLayouts from "@/Layouts/AuthLayouts";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import Form from "./Form";
import { router } from "@inertiajs/react";

export default function Index(props) {
    const petugas = props.petugas;
    const [model, setModel] = useState(null);
    const [modalTambah, setModalTambah] = useState(false);
    const closeHandler = () => {
        setModalTambah(false);
        setModel(null);
    };
    const editData = (data) => {
        setModel(data);
        setModalTambah(true);
    };
    const deleteData = (id) => {
        router.post(route("admin.delete-petugas", id));
    };
    return (
        <>
            <Modals
                title={model ? "Update Data" : "Create Data"}
                open={modalTambah}
                setOpen={closeHandler}
            >
                <Form closeHandler={closeHandler} model={model} />
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
                        <p>Tambah Petugas</p>
                    </button>
                    <InputText className={"w-[200px]"} placeholder="Cari..." />
                </div>
                <table className="table w-full">
                    <thead>
                        <tr className="border-b border-blue-500/50">
                            <th className="font-medium tracking-tighter w-10">
                                #
                            </th>

                            <th className="font-medium tracking-tighter w-24">
                                Avatar
                            </th>
                            <th className="font-medium tracking-tighter">
                                Nama Petugas
                            </th>
                            <th className="font-medium tracking-tighter">
                                Email
                            </th>
                            <th className="font-medium tracking-tighter">
                                Phone Number
                            </th>
                            <th className="font-medium tracking-tighter">
                                Role
                            </th>
                            <th className="font-medium tracking-tighter">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {petugas.length > 0 ? (
                            petugas.map((item, key) => (
                                <tr key={key}>
                                    <td className="text-center">{key + 1}</td>
                                    <td className="w-24">
                                        <img
                                            src={"/storage/" + item.avatar}
                                            alt={item.nama_lengkap}
                                            className="w-24 object-cover object-center"
                                        />
                                    </td>
                                    <td className="capitalize text-center w-[300px]">
                                        {item.name}
                                    </td>
                                    <td className="capitalize w-10 text-center">
                                        {item.email}
                                    </td>
                                    <td className="capitalize text-center">
                                        {item.phone_number}
                                    </td>
                                    <td className="capitalize w-10 text-center">
                                        {item.role}
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
                                    colSpan={7}
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
    <AuthLayouts children={page} title={"Kelola Petugas"} />
);
