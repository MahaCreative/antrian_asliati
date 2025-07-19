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
        nip: "",
        poli_id: "",
        nama_lengkap: "",
        keterangan: "",
        no_hp: "",
        avatar: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            nip: model ? model.nip : "",
            poli_id: model ? model.poli.nama_poli : "",
            nama_lengkap: model ? model.nama_lengkap : "",
            keterangan: model ? model.keterangan : "",
            no_hp: model ? model.no_hp : "",
            avatar: model ? model.avatar : "",
            email: model ? model.user.email : "",
        });
        setPreviewImage("/storage/" + model?.avatar);
    }, [model]);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-dokter"), {
            preserveScroll: false,
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    " Berhasil menambahkan 1 dokter baru"
                );
                setPreviewImage();
                reset();
                closeHandler();
            },
            onError: (e) => {
                showResponse(
                    "error",
                    "Gagal",
                    " Gagal menambahkan data dokter"
                );
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-dokter"), {
            preserveScroll: false,
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    " Berhasil memperbaharui data"
                );
                setPreviewImage();
                closeHandler();
            },
            onError: (e) => {
                showResponse(
                    "error",
                    "Gagal",
                    " Gagal memperbaharui data dokter"
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
                    <div className="flex flex-row gap-3">
                        <div>
                            <InputText
                                className={"w-full"}
                                label="NIP"
                                name="nip"
                                value={data.nip}
                                errors={errors.nip}
                                onChange={(e) =>
                                    setData({ ...data, nip: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <InputText
                                name="nama_lengkap"
                                className={"w-full"}
                                label="Nama Dokter"
                                value={data.nama_lengkap}
                                errors={errors.nama_lengkap}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        nama_lengkap: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 flex-row w-full">
                        <div className="w-full">
                            <SelectOptions
                                label="Poli"
                                value={data.poli_id}
                                errors={errors.poli_id}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        poli_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">Pilih poli klinik</option>
                                {poli.map((item, key) => (
                                    <option key={key} value={item.nama_poli}>
                                        {item.nama_poli}
                                    </option>
                                ))}
                            </SelectOptions>
                        </div>
                        <div className="w-full">
                            <InputText
                                name="no_hp"
                                className={"w-full"}
                                label="Nomor Hp"
                                value={data.no_hp}
                                errors={errors.no_hp}
                                onChange={(e) =>
                                    setData({ ...data, no_hp: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <InputText
                        name="avatar"
                        className={"w-full"}
                        label="Avatar"
                        type="file"
                        errors={errors.avatar}
                        onChange={changeImage}
                    />
                    <TextArea
                        className={"w-full"}
                        label="Keterangan"
                        value={data.keterangan}
                        errors={errors.keterangan}
                        onChange={(e) =>
                            setData({ ...data, keterangan: e.target.value })
                        }
                    />

                    <InputText
                        className={"w-full"}
                        type="email"
                        label="email"
                        name="email"
                        value={data.email}
                        errors={errors.email}
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                    />
                    {model && (
                        <p className="font-bold">
                            * Biarkan kosong jika tidak ingin mengganti password
                        </p>
                    )}
                    <InputText
                        type="password"
                        className={"w-full"}
                        label="password"
                        name="password"
                        value={data.password}
                        errors={errors.password}
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                    />
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
