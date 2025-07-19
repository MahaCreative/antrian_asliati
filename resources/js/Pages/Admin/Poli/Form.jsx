import InputText from "@/Components/InputText";
import TextArea from "@/Components/TextArea";
import ResponseAlert from "@/Hook/ResponseAlert";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function Form({ closeHandler, model }) {
    const { showResponse } = ResponseAlert();
    const { data, setData, post, reset, errors } = useForm({
        kd_poli: "",
        nama_poli: "",
        keterangan: "",
    });

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            kd_poli: model ? model.kd_poli : "",
            nama_poli: model ? model.nama_poli : "",
            keterangan: model ? model.keterangan : "",
        });
    }, [model]);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-poli"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil menambahkan 1 poli baru"
                );
            },
            onError: () => {
                showResponse("error", "Gagal", "Gagal menambahkan 1 poli baru");
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-poli"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil meperbaharui data poli"
                );
            },
            onError: () => {
                showResponse("error", "Gagal", "Gagal meperbaharui data poli");
            },
        });
    };
    return (
        <form onSubmit={model ? updateHandler : submitHandler}>
            <InputText
                className={"w-full"}
                label="Kode Poli"
                value={data.kd_poli}
                errors={errors.kd_poli}
                onChange={(e) => setData({ ...data, kd_poli: e.target.value })}
            />
            <InputText
                className={"w-full"}
                label="Nama Poli"
                value={data.nama_poli}
                errors={errors.nama_poli}
                onChange={(e) =>
                    setData({ ...data, nama_poli: e.target.value })
                }
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
