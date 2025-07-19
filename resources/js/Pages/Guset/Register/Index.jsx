import InputText from "@/Components/InputText";
import SelectOptions from "@/Components/SelectOptions";
import TextArea from "@/Components/TextArea";
import GuestLayouts from "@/Layouts/GuestLayouts";
import { Link, useForm } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";

export default function Index() {
    const registerRef = useRef(null);
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
        name: "",
        phone_number: "",
        avatar: "",
        nik: "",
        bpjs: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        alamat: "",
    });
    useEffect(() => {
        registerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("register"), {
            preserveScroll: true,
        });
    };
    return (
        <div
            ref={registerRef}
            className="bg-white py-16 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center"
        >
            <h1 className="text-4xl font-semibold tracking-tighter text-gray-800 text-center">
                Register
            </h1>
            <div className="flex my-2">
                <div className="w-[90px] h-[2px] bg-gray-200 rounded-tl-md rounded-tr-md"></div>
                <div className="w-[90px] h-[2px] bg-blue-500"></div>
                <div className="w-[90px] h-[2px] bg-gray-200 rounded-bl-md rounded-br"></div>
            </div>
            <p className="tracking-tighter text-center text-gray-600">
                Silahkan mengisi form registrasi dibawah ini dengan benar.
            </p>
            <div className="drop-shadow-md bg-white py-6 px-8 flex justify-center items-center w-full lg:w-1/2">
                <form onSubmit={submitHandler} action="" className="w-full">
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
                    <InputText
                        label={"phone_number"}
                        type="text"
                        name="name"
                        value={data.phone_number}
                        errors={errors.phone_number}
                        onChange={(e) =>
                            setData({ ...data, phone_number: e.target.value })
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
                                <option value="[perempuan">Perempuan</option>
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
                    <InputText
                        label={"avatar"}
                        type="file"
                        name="name"
                        errors={errors.avatar}
                        onChange={(e) =>
                            setData({ ...data, avatar: e.target.files[0] })
                        }
                        className={"w-full"}
                    />
                    <InputText
                        label={"email"}
                        type="email"
                        name="email"
                        value={data.email}
                        errors={errors.email}
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                        className={"w-full"}
                    />
                    <InputText
                        label={"password"}
                        type="password"
                        name="password"
                        value={data.password}
                        errors={errors.password}
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                        className={"w-full"}
                    />
                    <div className="flex gap-x-4 items-center my-3">
                        <button className="py-2 px-4 rounded-md text-white bg-blue-600">
                            Register
                        </button>
                        <Link
                            href={route("login")}
                            className="tracking-tighter hover:text-blue-600"
                        >
                            Login jika punya akun?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

Index.layout = (page) => <GuestLayouts children={page} title={"Register"} />;
