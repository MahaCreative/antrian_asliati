import InputText from "@/Components/InputText";
import GuestLayouts from "@/Layouts/GuestLayouts";
import { Link, useForm } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";

export default function Index() {
    const loginRef = useRef(null);
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
    });
    useEffect(() => {
        loginRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("login"));
    };
    return (
        <div
            ref={loginRef}
            className="bg-white py-16 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center"
        >
            <h1 className="text-4xl font-semibold tracking-tighter text-gray-800 text-center">
                Login
            </h1>
            <div className="flex my-2">
                <div className="w-[90px] h-[2px] bg-gray-200 rounded-tl-md rounded-tr-md"></div>
                <div className="w-[90px] h-[2px] bg-blue-500"></div>
                <div className="w-[90px] h-[2px] bg-gray-200 rounded-bl-md rounded-br"></div>
            </div>
            <p className="tracking-tighter text-center text-gray-600">
                Silahkan memasukkan username yang terdaftar dengan benar untuk
                login kesistem kami
            </p>
            <div className="drop-shadow-md bg-white py-6 px-8 flex justify-center items-center w-full lg:w-1/2">
                <form onSubmit={submitHandler} action="" className="w-full">
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
                            Login Now
                        </button>
                        <Link
                            href={route("register")}
                            className="tracking-tighter hover:text-blue-600"
                        >
                            Register jika belum punya akun?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

Index.layout = (page) => <GuestLayouts children={page} title={"Login"} />;
