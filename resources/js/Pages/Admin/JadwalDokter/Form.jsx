import InputText from "@/Components/InputText";
import SelectOptions from "@/Components/SelectOptions";
import TextArea from "@/Components/TextArea";
import ResponseAlert from "@/Hook/ResponseAlert";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

export default function Form({ closeHandler, model }) {
    const { showResponse } = ResponseAlert();
    const { dokter } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        dokter_id: "",
        hari: "",
        start_time: "",
        end_time: "",
    });

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            dokter_id: model ? model.dokter.nama_lengkap : "",
            hari: model ? model.hari : "",
            start_time: model ? model.start_time : "",
            end_time: model ? model.end_time : "",
        });
    }, [model]);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-jadwal-dokter"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil menambahkan 1 data baru"
                );
            },
            onError: () => {
                showResponse("error", "Gagal", "Gagal Menambahkan 1 data baru");
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-jadwal-dokter"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil memperbaharui data jadwal"
                );
            },
            onError: () => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal memperbaharui data jadwal"
                );
            },
        });
    };

    return (
        <form onSubmit={model ? updateHandler : submitHandler}>
            <div className="">
                <div>
                    <SelectOptions
                        className={"w-full"}
                        label="hari"
                        name="hari"
                        value={data.hari}
                        errors={errors.hari}
                        onChange={(e) =>
                            setData({ ...data, hari: e.target.value })
                        }
                    >
                        <option value="">Plih Hari</option>
                        <option value="senin">Senin</option>
                        <option value="selasa">Selasa</option>
                        <option value="rabu">Rabu</option>
                        <option value="kamis">Kamis</option>
                        <option value="jumat">Jumat</option>
                        <option value="sabtu">Sabtu</option>
                        <option value="minggu">Minggu</option>
                    </SelectOptions>
                    <SelectOptions
                        className={"w-full"}
                        label="Dokter"
                        name="dokter"
                        value={data.dokter_id}
                        errors={errors.dokter_id}
                        onChange={(e) =>
                            setData({ ...data, dokter_id: e.target.value })
                        }
                    >
                        <option value="">Plih Dokter</option>
                        {dokter.map((item, key) => (
                            <option value={item.nama_lengkap}>
                                {item.nama_lengkap}
                            </option>
                        ))}
                    </SelectOptions>
                    <InputText
                        name="start_time"
                        className={"w-full"}
                        label="Jam Mulai"
                        value={data.start_time}
                        errors={errors.start_time}
                        type="time"
                        onChange={(e) =>
                            setData({ ...data, start_time: e.target.value })
                        }
                    />
                    <InputText
                        name="end_time"
                        className={"w-full"}
                        label="Jam Selesai"
                        value={data.end_time}
                        errors={errors.end_time}
                        type="time"
                        onChange={(e) =>
                            setData({ ...data, end_time: e.target.value })
                        }
                    />
                </div>
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
