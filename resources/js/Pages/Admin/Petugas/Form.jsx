import InputText from "@/Components/InputText";
import SelectOptions from "@/Components/SelectOptions";
import TextArea from "@/Components/TextArea";
import ResponseAlert from "@/Hook/ResponseAlert";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

export default function Form({ closeHandler, model }) {
    const { showResponse } = ResponseAlert();
    const [previewImage, setPreviewImage] = useState(null);
    const imageRef = useRef(null);
    const { poli } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        phone_number: "",
        email: "",
        password: "",
        role: "",
        avatar: "",
    });

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            name: model ? model.name : "",
            phone_number: model ? model.phone_number : "",
            email: model ? model.email : "",
            role: model ? model.role : "",
            avatar: model ? model.avatar : "",
        });
        setPreviewImage("/storage/" + model?.avatar);
    }, [model]);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-petugas"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil menambahkan 1 petugas baru"
                );
            },
            onError: () => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal Menambahkan 1 petugas baru"
                );
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-petugas"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil memperbaharui data petugas"
                );
            },
            onError: () => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal memperbaharui data petugas"
                );
            },
        });
    };
    const changeImage = (e) => {
        const data = e.target.files[0];
        setPreviewImage(URL.createObjectURL(data));
        setData((prevData) => ({ ...prevData, avatar: data }));
    };
    return (
        <form onSubmit={model ? updateHandler : submitHandler}>
            <div className="flex flex-row gap-x-3 items-start">
                <div>
                    <InputText
                        className={"w-full"}
                        label="Nama Petugas"
                        name="name"
                        value={data.name}
                        errors={errors.name}
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                        }
                    />
                    <div className="flex gap-x-3 items-start">
                        <div>
                            <InputText
                                name="email"
                                className={"w-full"}
                                label="email"
                                type="email"
                                value={data.email}
                                errors={errors.email}
                                onChange={(e) =>
                                    setData({ ...data, email: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            {model && (
                                <p className="text-gray-500 text-xs tracking-tighter font-bold">
                                    *Biarkan kosong jika tidak ingin mengganti
                                    password
                                </p>
                            )}
                            <InputText
                                name="password"
                                className={"w-full"}
                                label="password"
                                type="password"
                                value={data.password}
                                errors={errors.password}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <InputText
                        name="phone_number"
                        className={"w-full"}
                        label="Nomor Hp"
                        value={data.phone_number}
                        errors={errors.phone_number}
                        onChange={(e) =>
                            setData({ ...data, phone_number: e.target.value })
                        }
                    />
                    <InputText
                        name="avatar"
                        className={"w-full"}
                        label="Avatar"
                        type="file"
                        errors={errors.avatar}
                        onChange={changeImage}
                    />

                    <SelectOptions
                        label="Role"
                        value={data.role}
                        errors={errors.role}
                        onChange={(e) =>
                            setData({ ...data, role: e.target.value })
                        }
                    >
                        <option value="">Pilih Role</option>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                    </SelectOptions>
                </div>
                <img
                    src={
                        previewImage
                            ? previewImage
                            : "/storage/default_logo.png"
                    }
                    className="bg-blue-500 rounded-md w-[300px] h-[330px]"
                    alt=""
                />
            </div>
            <div className="flex gap-x-3 items-center justify-between py-3">
                <button className="bg-blue-500 py-2 px-3 rounded-md text-white hover:bg-blue-700">
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => closeHandler()}
                    className="bg-red-500 py-2 px-3 rounded-md text-white hover:bg-red-700"
                >
                    Cancell
                </button>
            </div>
        </form>
    );
}
