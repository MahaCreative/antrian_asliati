import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    ArrowBackIos,
    Balance,
    BuildCircle,
    Circle,
    Face,
    Favorite,
    Group,
    HeartBroken,
    LocalHospital,
    MedicalInformation,
    Menu,
    VerifiedUser,
    ViewComfyAltOutlined,
} from "@mui/icons-material";
import React, { useRef, useState } from "react";

export default function GuestLayouts({ children, title }) {
    const { poli, dokter, profile_klinik, auth } = usePage().props;
    const [poliAktif, setPoliAktif] = useState(1);
    const [navOpen, setNavOpen] = useState(false);
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const poliRef = useRef(null);
    const dokterRef = useRef(null);
    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };
    Echo.channel("global").listen("GlobalEvents", (data) => {
        router.reload({ preserveScroll: true });
    });

    return (
        <>
            <Head title={title} />
            <div className="w-full py-4 px-4 md:px-8 lg:px-16 useTransition bg-blue-500 ">
                <p className="tracking-tighter leading-3 text-sm text-white">
                    📞 {profile_klinik.phone_number}
                </p>
            </div>
            {/* navbar */}
            <div className="w-full px-4 md:px-8 lg:px-16 useTransition drop-shadow-md bg-white flex items-center justify-between">
                {/* logo */}
                <div className="flex gap-x- items-center">
                    <img
                        src={"/storage/" + profile_klinik.logo_klinik}
                        alt=""
                        className="bg-blue-500 w-12 "
                    />
                    <p className="w-full md:w-[70%] text-blue-700 font-extrabold font-serif text-lg lg:text-2xl useTransition  tracking-tighter text-blue-950">
                        {profile_klinik.nama_klinik}
                    </p>
                </div>
                {/* endlogo */}
                {/* navbar  */}
                <div className="hidden md:flex flex-row gap-x-2 md:gap-x-5 lg:gap-x-10 items-center">
                    <button
                        onClick={() => scrollToSection(homeRef)}
                        className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => scrollToSection(aboutRef)}
                        className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                    >
                        About
                    </button>
                    <button
                        onClick={() => scrollToSection(poliRef)}
                        className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                    >
                        Layanan Klinik
                    </button>
                    <button
                        onClick={() => scrollToSection(dokterRef)}
                        className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                    >
                        Dokter
                    </button>

                    {auth.user ? (
                        <>
                            <Link
                                href={route("booking-antrian")}
                                className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                            >
                                Booking Antrian
                            </Link>
                            <Link
                                href={route("profile")}
                                className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                            >
                                Profile
                            </Link>
                            <Link
                                href={route("data-keluarga")}
                                className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                            >
                                Data Keluarga
                            </Link>
                            <Link
                                as="button"
                                href={route("logout")}
                                className="py-2 px-4 rounded-full bg-red-600 text-center hover:bg-red-800 text-white"
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <Link
                            href={route("login")}
                            className="py-2 px-4 rounded-full bg-blue-600 text-center hover:bg-blue-800 text-white"
                        >
                            Login / Register
                        </Link>
                    )}
                </div>
                <button
                    onClick={() => setNavOpen(!navOpen)}
                    className="text-blue-500 text-4xl inline md:hidden hover:bg-blue-500 hover:text-white useTransition py-1.5 px-2 rounded-md"
                >
                    <Menu color="inherit" fontSize="inherit" />
                </button>
                {/* end navbar  */}
            </div>
            <div
                className={`${
                    navOpen ? "" : "hidden"
                } flex md:hidden flex-col py-3 gap-x-2 md:gap-x-5 lg:gap-x-10 items-center`}
            >
                <button
                    onClick={() => scrollToSection(homeRef)}
                    className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                >
                    Home
                </button>
                <button
                    onClick={() => scrollToSection(aboutRef)}
                    className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                >
                    About
                </button>
                <button
                    onClick={() => scrollToSection(poliRef)}
                    className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                >
                    Layanan Klinik
                </button>
                <button
                    onClick={() => scrollToSection(dokterRef)}
                    className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                >
                    Dokter
                </button>

                {auth.user ? (
                    <>
                        <Link
                            href={route("booking-antrian")}
                            className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                        >
                            Booking Antrian
                        </Link>
                        <Link
                            href={route("profile")}
                            className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                        >
                            Profile
                        </Link>
                        <Link
                            href={route("data-keluarga")}
                            className="font-light useTransition hover:text-blue-600 text-sm md:text-sm lg:text-lg"
                        >
                            Data Keluarga
                        </Link>
                        <Link
                            as="button"
                            href={route("logout")}
                            className="py-2 px-4 rounded-full bg-red-600 text-center hover:bg-red-800 text-white"
                        >
                            Logout
                        </Link>
                    </>
                ) : (
                    <Link
                        href={route("login")}
                        className="py-2 px-4 rounded-full bg-blue-600 text-center hover:bg-blue-800 text-white"
                    >
                        Login / Register
                    </Link>
                )}
            </div>
            {/* end Navbar */}

            {/* hearo */}
            <div
                ref={homeRef}
                className="bg-[url('/storage/Image/hero-bg.jpg')] bg-cover bg-center w-full py-32 object-cover object-center flex flex-col items-center justify-center"
            >
                <div className="w-full px-4 md:px-8 lg:px-16 useTransition">
                    <h1 className="md:text-3xl lg:text-5xl tracking-tighter font-extrabold font-sans tracking-tighter capitalize text-blue-800">
                        selamat datang di {profile_klinik.nama_klinik}
                    </h1>
                    <p className="font-light tracking-tighter">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet eos esse quasi recusandae perspiciatis animi a
                        at facere delectus dolor?
                    </p>
                    <div className="py-16  flex flex-col md:flex-row items-center justify-center md:justify-between gap-3">
                        <div className="py-8 px-8 rounded-md bg-blue-600 w-[80%] md:w-[40%] lg:w-[35%] drop-shadow-md">
                            <p className="text-white font-sans font-bold text-3xl tracking-tighter capitalize">
                                Kenapa memilih kami ?
                            </p>
                            <h1 className="text-5xl font-extrabold text-white tracking-tighter capitalize">
                                {profile_klinik.nama_klinik}
                            </h1>
                            <p className="tracking-tighter text-white py-6 line-clamp-5">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Aperiam non suscipit vitae
                                provident mollitia accusamus eos minus nobis,
                                quaerat dicta magni veniam, incidunt quasi
                                provident mollitia accusamus eos minus nobis,
                                quaerat dicta magni veniam, incidunt quasi
                                provident mollitia accusamus eos minus nobis,
                                quaerat dicta magni veniam, incidunt quasi
                            </p>
                            <button className="py-2.5 px-5 text-xl leading-3 bg-blue-500 mt-6 rounded-full tracking-tighter text-white hover:bg-blue-800 useTransition flex flex-row gap-x-7 items-center">
                                <p>Learn More</p>
                                <p className="rotate-180 ">
                                    <ArrowBackIos
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </p>
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full md:w-[60%] lg:w-[75%]">
                            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:flex-row justify-between items-center gap-y-3 h-full gap-x-1 w-full">
                                <div className="h-[300px] bg-white/70 w-[100%] md:w-[95%] backdrop-blur-sm rounded-md px-8 py-6 drop-shadow-md">
                                    <p className="text-5xl text-center text-blue-500">
                                        <VerifiedUser
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <h1 className="font-bold py-6 text-2xl tracking-tighter text-center text-gray-800">
                                        Profesionalisme
                                    </h1>
                                    <p className="line-clamp-4 text-center text-gray-700">
                                        Kami menjunjung tinggi profesionalisme
                                        dalam setiap layanan yang diberikan,
                                        yang tercermin melalui tenaga medis kami
                                        yang berpengalaman, bersertifikat, dan
                                        senantiasa menjaga standar etika serta
                                        mutu pelayanan kesehatan.
                                    </p>
                                </div>
                                <div className="h-[300px] bg-white/70 w-[100%] md:w-[95%] backdrop-blur-sm rounded-md px-8 py-6 drop-shadow-md">
                                    <p className="text-5xl text-center text-blue-500">
                                        <Favorite
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <h1 className="font-bold py-6 text-2xl tracking-tighter text-center text-gray-800">
                                        Empati
                                    </h1>
                                    <p className="line-clamp-4 text-center text-gray-700">
                                        Kami memahami bahwa setiap pasien
                                        memiliki kebutuhan yang unik, oleh
                                        karena itu pendekatan kami selalu ramah,
                                        penuh perhatian, dan berlandaskan
                                        kepedulian yang tulus demi kenyamanan
                                        dan kesembuhan pasien.
                                    </p>
                                </div>
                                <div className="h-[300px] bg-white/70 w-[100%] md:w-[95%] backdrop-blur-sm rounded-md px-8 py-6 drop-shadow-md">
                                    <p className="text-5xl text-center text-blue-500">
                                        <Balance
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <h1 className="font-bold py-6 text-2xl tracking-tighter text-center text-gray-800">
                                        Integritas
                                    </h1>
                                    <p className="line-clamp-4 text-center text-gray-700">
                                        Kami berkomitmen untuk menjalankan
                                        seluruh aktivitas pelayanan dengan
                                        integritas tinggi, menjunjung nilai
                                        kejujuran, transparansi, serta tanggung
                                        jawab dalam memberikan informasi dan
                                        tindakan medis.
                                    </p>
                                </div>
                                <div className="h-[300px] bg-white/70 w-[100%] md:w-[95%] backdrop-blur-sm rounded-md px-8 py-6 drop-shadow-md">
                                    <p className="text-5xl text-center text-blue-500">
                                        <BuildCircle
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <h1 className="font-bold py-6 text-2xl tracking-tighter text-center text-gray-800">
                                        Inovasi
                                    </h1>
                                    <p className="line-clamp-4 text-center text-gray-700">
                                        Kami terus berinovasi dalam meningkatkan
                                        kualitas layanan melalui pemanfaatan
                                        teknologi terkini yang mendukung
                                        efisiensi kerja, akurasi diagnosa, serta
                                        kemudahan akses layanan kesehatan bagi
                                        masyarakat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* END HERO */}
            {/* about us */}
            <div ref={aboutRef}>
                <div className="useTransition py-16 px-4 md:px-8 lg:px-16 bg-white flex flex-col md:flex-row">
                    <img
                        src={"/storage/" + profile_klinik.logo_klinik}
                        alt={profile_klinik.nama_klinik}
                        className="w-full md:w-[45%] bg-blue-500"
                    />
                    <div className="px-4  text-gray-700 tracking-tighter md:w-[60%]">
                        <p className="font-bold text-4xl py-1 border-b-4 border-blue-500 inline">
                            About Us
                        </p>
                        <p className="my-2.5 text-base text-gray-500">
                            {profile_klinik.keterangan} Lorem ipsum dolor sit
                            amet consectetur adipisicing elit. Voluptatem
                            impedit facilis et! Impedit at suscipit, iure, culpa
                            ad rerum repudiandae aspernatur similique ut quos
                            nostrum iusto natus. Distinctio consectetur aliquid
                            voluptatem assumenda. Laudantium necessitatibus
                            assumenda explicabo consectetur nam porro adipisci,
                            minus natus doloremque unde eos fugit nostrum cum
                            vero amet nobis ratione eius autem magnam vitae.
                            Illo, dignissimos? Ex deserunt fugit iste ullam
                            minima aspernatur exercitationem quod corrupti
                            possimus, quia, rerum reprehenderit? Id harum
                            praesentium et, assumenda, vero modi incidunt
                            cupiditate corporis magnam eaque commodi dolores!
                            Nesciunt in eaque soluta libero non beatae optio
                            illo distinctio blanditiis, error ex maxime.
                        </p>
                        <p className="font-bold text-4xl py-1 border-b-4 border-blue-500 inline">
                            Visi
                        </p>
                        <p className="my-2.5 text-base text-gray-500 ">
                            Menjadi pusat layanan kesehatan terpercaya dan
                            unggulan di wilayah Kabupaten Mamuju Sulawesi Barat.
                        </p>
                        <p className="font-bold text-4xl py-1 border-b-4 border-blue-500 inline">
                            Misi
                        </p>
                        <div className="flex gap-x-3 items-center mt-5">
                            <p className="text-5xl text-blue-500">
                                <Circle color="inherit" fontSize="inherit" />
                            </p>
                            <p>
                                Memberikan pelayanan kesehatan yang prima dan
                                profesional
                            </p>
                        </div>
                        <div className="flex gap-x-3 items-center mt-5">
                            <p className="text-5xl text-blue-500">
                                <Circle color="inherit" fontSize="inherit" />
                            </p>
                            <p>
                                Meningkatkan kesadaran masyarakat akan
                                pentingnya hidup sehat
                            </p>
                        </div>
                        <div className="flex gap-x-3 items-center mt-5">
                            <p className="text-5xl text-blue-500">
                                <Circle color="inherit" fontSize="inherit" />
                            </p>
                            <p>
                                Mengembangkan teknologi informasi dalam
                                pelayanan medis
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-blue-50 py-16 px-8 flex justify-center items-center w-full">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-9">
                    <div className="drop-shadow-md bg-white rounded-md p-4 relative text-center w-[100%] md:w-[200px] lg:w-[300px]">
                        <div className="absolute -top-5 left-[45%] w-10 h-10 rounded-full bg-blue-600 text-center flex flex-col items-center justify-center">
                            <p className="text-white">
                                <MedicalInformation />
                            </p>
                        </div>
                        <div className="py-8 px-8">
                            <p className="text-5xl font-bold text-gray-700">
                                {dokter.length}
                            </p>
                            <p className="text-2xl font-bold text-blue-700 mt-4">
                                Dokter
                            </p>
                        </div>
                    </div>
                    <div className="drop-shadow-md bg-white rounded-md p-4 relative text-center w-[100%] md:w-[200px] lg:w-[300px]">
                        <div className="absolute -top-5 left-[45%] w-10 h-10 rounded-full bg-blue-600 text-center flex flex-col items-center justify-center">
                            <p className="text-white">
                                <LocalHospital />
                            </p>
                        </div>
                        <div className="py-8 px-8">
                            <p className="text-5xl font-bold text-gray-700">
                                {poli.length}
                            </p>
                            <p className="text-2xl font-bold text-blue-700 mt-4">
                                Layanan Klinik
                            </p>
                        </div>
                    </div>
                    <div className="drop-shadow-md bg-white rounded-md p-4 relative text-center w-[100%] md:w-[200px] lg:w-[300px]">
                        <div className="absolute -top-5 left-[45%] w-10 h-10 rounded-full bg-blue-600 text-center flex flex-col items-center justify-center">
                            <p className="text-white">
                                <Group />
                            </p>
                        </div>
                        <div className="py-8 px-8">
                            <p className="text-5xl font-bold text-gray-700">
                                {dokter.length}
                            </p>
                            <p className="text-2xl font-bold text-blue-700 mt-4">
                                Staff
                            </p>
                        </div>
                    </div>
                    <div className="drop-shadow-md bg-white rounded-md p-4 relative text-center w-[100%] md:w-[200px] lg:w-[300px]">
                        <div className="absolute -top-5 left-[45%] w-10 h-10 rounded-full bg-blue-600 text-center flex flex-col items-center justify-center">
                            <p className="text-white">
                                <Face />
                            </p>
                        </div>
                        <div className="py-8 px-8">
                            <p className="text-5xl font-bold text-gray-700">
                                {dokter.length}
                            </p>
                            <p className="text-2xl font-bold text-blue-700 mt-4">
                                Pasien
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref={poliRef}
                className="bg-white py-16 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center"
            >
                <h1 className="text-4xl font-semibold tracking-tighter text-gray-800 text-center">
                    Layanan Klinik
                </h1>
                <div className="flex my-2">
                    <div className="w-[90px] h-[2px] bg-gray-200 rounded-tl-md rounded-tr-md"></div>
                    <div className="w-[90px] h-[2px] bg-blue-500"></div>
                    <div className="w-[90px] h-[2px] bg-gray-200 rounded-bl-md rounded-br"></div>
                </div>
                <p className="tracking-tighter text-center text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Rerum veritatis eos aliquid suscipit perspiciatis libero
                    ullam labore. Beatae blanditiis voluptate soluta, deleniti
                    iste officiis similique aliquid ducimus consequuntur
                    accusamus asperiores.
                </p>
                <div className="flex flex-col gap-x-6 md:flex-row w-full py-6">
                    <div className="w-full lg:w-[30%]">
                        {poli.map((item, key) => (
                            <div
                                onClick={() => setPoliAktif(item.id)}
                                key={key}
                                className={`${
                                    poliAktif == item.id
                                        ? " border-blue-600 bg-blue-600 "
                                        : " border-gray-400"
                                } py-2 border-r-2 px-4`}
                            >
                                <button
                                    className={`tracking-tighter font-semibold capitalize ${
                                        poliAktif == item.id
                                            ? "text-white"
                                            : "text-gray-600 "
                                    }`}
                                >
                                    {item.nama_poli}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="w-full lg:w-[70%]">
                        {poli.map((item, key) => (
                            <div key={key}>
                                {poliAktif == item.id && (
                                    <div
                                        onClick={() => setPoliAktif(item.id)}
                                        className={`${
                                            poliAktif == item.id ? " " : " "
                                        } py-2`}
                                    >
                                        <p className="tracking-tighter text-gray-600 ">
                                            {item.keterangan}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                ref={dokterRef}
                className="bg-blue-50 py-16 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center"
            >
                <h1 className="text-4xl font-semibold tracking-tighter text-gray-800 text-center">
                    Dokter Kami
                </h1>
                <div className="flex my-2">
                    <div className="w-[90px] h-[2px] bg-gray-200 rounded-tl-md rounded-tr-md"></div>
                    <div className="w-[90px] h-[2px] bg-blue-500"></div>
                    <div className="w-[90px] h-[2px] bg-gray-200 rounded-bl-md rounded-br"></div>
                </div>
                <p className="tracking-tighter text-md text-gray-500 text-center my-3">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Distinctio, ad pariatur? Aut, labore accusantium odit
                    molestias sequi quos beatae vero. Quidem culpa reprehenderit
                    veniam molestiae vel fuga asperiores temporibus perferendis?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 w-full">
                    {dokter.map((item, key) => (
                        <div
                            key={key}
                            className="py-4 px-8 rounded-md drop-shadow-md bg-white flex flex-row items-center gap-x-12 w-full"
                        >
                            <img
                                src={"/storage/" + item.avatar}
                                alt={item.nama_lengkap}
                                className="bg-blue-500 w-24 h-24 rounded-full drop-shadow-md"
                            />
                            <div>
                                <p className="text-gray-700 tracking-tighter text-4xl font-bold capitalize">
                                    {item.nama_lengkap}
                                </p>
                                <p className="text-gray-700 tracking-tighter text-xl font-medium capitalize my-3">
                                    {item.poli.nama_poli}
                                </p>
                                <p className="tracking-tighter text-gray-500">
                                    {item.keterangan}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {children}
        </>
    );
}
