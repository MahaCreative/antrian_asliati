import InputText from "@/Components/InputText";
import SelectOptions from "@/Components/SelectOptions";
import TextArea from "@/Components/TextArea";
import ResponseAlert from "@/Hook/ResponseAlert";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function Form({ closeHandler, model }) {
    const { showResponse } = ResponseAlert();
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        nik: "",
        bpjs: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        status: "",
        alamat: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("store-data-keluarga"), {
            preserveScroll: true,
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil menambahkan 1 data keluarga baru"
                );
                closeHandler();
            },
            onError: () => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal menambahkan 1 data keluarga baru"
                );
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("update-data-keluarga"), {
            preserveScroll: true,
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil mengubah data keluarga"
                );
                closeHandler();
            },
            onError: () => {
                showResponse("error", "Gagal", "Gagal mengubah data keluarga");
            },
        });
    };
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            name: model ? model.nama : "",

            nik: model ? model.nik : "",
            bpjs: model ? model.bpjs : "",
            jenis_kelamin: model ? model.jenis_kelamin : "",
            tanggal_lahir: model ? model.tanggal_lahir : "",
            status: model ? model.status : "",
            alamat: model ? model.alamat : "",
        });
    }, []);
    return (
        <div className="w-full">
            <div className="drop-shadow-md bg-white py-6 px-8 flex justify-center items-center w-full ">
                <form
                    onSubmit={model ? updateHandler : submitHandler}
                    action=""
                    className="w-full"
                >
                    <div className="flex gap-x-3 flex-col md:flex-row">
                        <div className="w-full">
                            <InputText
                                label={"nik"}
                                type="text"
                                name="nik"
                                value={data.nik}
                                errors={errors.nik}
                                onChange={(e) =>
                                    setData({ ...data, nik: e.target.value })
                                }
                                className={"w-full"}
                            />
                        </div>
                        <div className="w-full">
                            <InputText
                                label={"bpjs"}
                                type="text"
                                name="bpjs"
                                value={data.bpjs}
                                errors={errors.bpjs}
                                onChange={(e) =>
                                    setData({ ...data, bpjs: e.target.value })
                                }
                                className={"w-full"}
                            />
                        </div>
                    </div>
                    <InputText
                        label={"name"}
                        type="text"
                        name="name"
                        value={data.name}
                        errors={errors.name}
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                        }
                        className={"w-full"}
                    />

                    <div className="flex gap-x-3 flex-col md:flex-row">
                        <div className="w-full">
                            <SelectOptions
                                name="jenis_kelamin"
                                label={"Jenis Kelamin"}
                                value={data.jenis_kelamin}
                                errors={errors.jenis_kelamin}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        jenis_kelamin: e.target.value,
                                    })
                                }
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="laki-laki">Laki-Laki</option>
                                <option value="perempuan">Perempuan</option>
                            </SelectOptions>
                        </div>
                        <div className="w-full">
                            <SelectOptions
                                name="status"
                                label={"status Keluarga"}
                                value={data.status}
                                errors={errors.status}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        status: e.target.value,
                                    })
                                }
                            >
                                <option value="">Pilih Status Keluarga</option>
                                <option value="anak">Anak</option>
                                <option value="istri">Istri</option>
                                <option value="ayah">Ayah</option>
                                <option value="ibu">Ayah</option>
                                <option value="keluarga">Keluarga</option>
                            </SelectOptions>
                        </div>
                        <div className="w-full">
                            <InputText
                                label={"tanggal_lahir"}
                                type="date"
                                name="tanggal_lahir"
                                value={data.tanggal_lahir}
                                errors={errors.tanggal_lahir}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        tanggal_lahir: e.target.value,
                                    })
                                }
                                className={"w-full"}
                            />
                        </div>
                    </div>
                    <TextArea
                        label={"alamat"}
                        name="alamat"
                        value={data.alamat}
                        errors={errors.alamat}
                        onChange={(e) =>
                            setData({
                                ...data,
                                alamat: e.target.value,
                            })
                        }
                        className={"w-full"}
                    />

                    <div className="flex gap-x-4 items-center my-3">
                        <button className="bg-blue-500 hover:bg-blue-600 rounded-md text-white py-2 px-4 ">
                            {model ? "Update" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
