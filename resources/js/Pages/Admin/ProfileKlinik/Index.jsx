import InputText from "@/Components/InputText";
import TextArea from "@/Components/TextArea";
import AuthLayouts from "@/Layouts/AuthLayouts";
import { useForm, usePage } from "@inertiajs/react";
import React, { useRef, useState } from "react";

export default function Index(props) {
    const profile = props.profile;
    const { data, setData, post, reset, errors } = useForm({
        nama_klinik: profile.nama_klinik,
        address: profile.address,
        phone_number: profile.phone_number,
        logo_klinik: profile.logo_klinik,
        keterangan: profile.keterangan,
    });
    const imageRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const resetData = () => {
        setData({
            ...data,
            nama_klinik: profile.nama_klinik,
            address: profile.address,
            phone_number: profile.phone_number,
            logo_klinik: profile.logo_klinik,
        });
        setPreview(null);
    };
    const changeImage = (e) => {
        let image = e.target.files[0];
        setPreview(URL.createObjectURL(image));
        setData((prevData) => ({ ...prevData, logo_klinik: image }));
    };

    const imageHandler = () => {
        imageRef.current.click();
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-profile-klinik"));
    };
    return (
        <div className="px-8">
            <div className="bg-white drop-shadow-md rounded-md py-3 px-4 w-full">
                <div className="w-full flex flex-col items-center justify-center">
                    <img
                        className="w-24 h-24 rounded-full bg-blue-500 object-cover object-center"
                        src={"/storage/" + profile.logo_klinik}
                        alt={profile.nama_klinik}
                    />
                    <h1 className="font-medium tracking-tighter text-xl capitalize">
                        {profile.nama_klinik}
                    </h1>
                    <p className="font-light tracking-tighter text-sm capitalize">
                        {profile.address} Phone : {profile.phone_number}
                    </p>
                </div>
            </div>
            <div className="flex items-start justify-between gap-x-3 w-full py-6">
                <form
                    onSubmit={submitHandler}
                    className="bg-white drop-shadow-md rounded-md py-3 px-4 w-full"
                >
                    <InputText
                        label={"nama klinik"}
                        name={"nama_klinik"}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        value={data.nama_klinik}
                        errors={errors.nama_klinik}
                    />
                    <InputText
                        label={"Alamat klinik"}
                        name={"address"}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        value={data.address}
                        errors={errors.address}
                    />
                    <InputText
                        label={"Telephone klinik"}
                        name={"phone_number"}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        value={data.phone_number}
                        errors={errors.phone_number}
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
                    <div className="flex gap-x-3 items-center">
                        <button className="bg-blue-500 hover:bg-blue-700 useTransition text-sm text-white py-2 px-3 rounded-md my-3">
                            Update Profile
                        </button>
                        <button
                            type="button"
                            onClick={resetData}
                            className="bg-red-500 hover:bg-red-700 useTransition text-sm text-white py-2 px-3 rounded-md my-3"
                        >
                            Clear
                        </button>
                    </div>
                </form>
                <div className="bg-white drop-shadow-md rounded-md py-3 px-4 w-full ">
                    <input
                        ref={imageRef}
                        type="file"
                        onChange={changeImage}
                        hidden
                    />
                    <img
                        src={`${
                            preview
                                ? preview
                                : "/storage/" + profile.logo_klinik
                        }`}
                        alt={profile.nama_klinik}
                        className="bg-blue-500 w-full h-[250px] object-center object-cover rounded-md"
                    />
                    <div className="flex gap-x-3 items-center">
                        <button
                            onClick={() => imageHandler()}
                            className="bg-blue-500 text-white py-2 px-3 rounded-md my-3"
                        >
                            Change Image
                        </button>
                        <p className="text-xs font-light tracking-tighter">
                            {data.logo_klinik}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AuthLayouts children={page} title={"Profile Hotel"} />
);
