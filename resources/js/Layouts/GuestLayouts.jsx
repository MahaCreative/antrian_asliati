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
            {/* TOP BAR */}
            <div className="w-full py-2 px-4 md:px-8 lg:px-16 bg-blue-600 text-white text-sm">
                📞 {profile_klinik.phone_number}
            </div>

            {/* NAVBAR */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-x-2">
                            <img
                                src={"/storage/" + profile_klinik.logo_klinik}
                                alt="Logo"
                                className="h-10 w-10 rounded-md object-cover"
                            />
                            <span className="text-xl lg:text-2xl font-extrabold text-blue-700 tracking-tight">
                                {profile_klinik.nama_klinik}
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-6">
                            <button
                                onClick={() => scrollToSection(homeRef)}
                                className="text-gray-700 hover:text-blue-600 text-sm font-medium"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => scrollToSection(aboutRef)}
                                className="text-gray-700 hover:text-blue-600 text-sm font-medium"
                            >
                                About
                            </button>
                            <button
                                onClick={() => scrollToSection(poliRef)}
                                className="text-gray-700 hover:text-blue-600 text-sm font-medium"
                            >
                                Layanan Klinik
                            </button>
                            <button
                                onClick={() => scrollToSection(dokterRef)}
                                className="text-gray-700 hover:text-blue-600 text-sm font-medium"
                            >
                                Dokter
                            </button>

                            {auth.user ? (
                                <>
                                    <Link
                                        href={route("booking-antrian")}
                                        className="text-gray-700 hover:text-blue-600 text-sm font-medium"
                                    >
                                        Booking
                                    </Link>
                                    <Link
                                        href={route("history-antrian")}
                                        className="text-gray-700 hover:text-blue-600 text-sm font-medium"
                                    >
                                        History
                                    </Link>
                                    <Link
                                        href={route("profile")}
                                        className="text-gray-700 hover:text-blue-600 text-sm font-medium"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href={route("data-keluarga")}
                                        className="text-gray-700 hover:text-blue-600 text-sm font-medium"
                                    >
                                        Data Keluarga
                                    </Link>
                                    <Link
                                        as="button"
                                        href={route("logout")}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium"
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium"
                                >
                                    Login / Register
                                </Link>
                            )}
                        </div>

                        {/* Hamburger for Mobile */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setNavOpen(!navOpen)}
                                className="text-gray-700 hover:text-blue-600 focus:outline-none"
                            >
                                {navOpen ? (
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {navOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-4 pt-4 pb-6 space-y-2">
                            <button
                                onClick={() => {
                                    scrollToSection(homeRef);
                                    setNavOpen(false);
                                }}
                                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => {
                                    scrollToSection(aboutRef);
                                    setNavOpen(false);
                                }}
                                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
                            >
                                About
                            </button>
                            <button
                                onClick={() => {
                                    scrollToSection(poliRef);
                                    setNavOpen(false);
                                }}
                                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
                            >
                                Layanan Klinik
                            </button>
                            <button
                                onClick={() => {
                                    scrollToSection(dokterRef);
                                    setNavOpen(false);
                                }}
                                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
                            >
                                Dokter
                            </button>

                            {auth.user ? (
                                <>
                                    <Link
                                        href={route("booking-antrian")}
                                        className="block py-2 text-gray-700 hover:text-blue-600"
                                    >
                                        Booking
                                    </Link>
                                    <Link
                                        href={route("history-antrian")}
                                        className="block py-2 text-gray-700 hover:text-blue-600"
                                    >
                                        History
                                    </Link>
                                    <Link
                                        href={route("profile")}
                                        className="block py-2 text-gray-700 hover:text-blue-600"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href={route("data-keluarga")}
                                        className="block py-2 text-gray-700 hover:text-blue-600"
                                    >
                                        Data Keluarga
                                    </Link>
                                    <Link
                                        as="button"
                                        href={route("logout")}
                                        className="block py-2 text-red-600 hover:text-red-800"
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="block py-2 bg-blue-600 text-white text-center rounded-md mt-2 hover:bg-blue-700"
                                >
                                    Login / Register
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero */}
            <div
                ref={homeRef}
                className="relative w-full h-[500px] flex items-center justify-center text-center bg-cover bg-center"
                style={{ backgroundImage: "url('/storage/Image/hero-bg.jpg')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 px-6 max-w-4xl">
                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                        Selamat Datang di{" "}
                        <span className="text-blue-400">
                            {profile_klinik.nama_klinik}
                        </span>
                    </h1>
                    <p className="text-gray-200 mt-4 text-lg">
                        Layanan kesehatan terpercaya untuk Anda dan keluarga.
                    </p>
                    <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 hover:scale-105 transition-all">
                        Pelajari Lebih Lanjut
                    </button>
                </div>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:flex-row justify-between items-center gap-y-3 h-full gap-x-1 w-full">
                <div className="h-[300px] bg-white/70 w-[100%] md:w-[95%] backdrop-blur-sm rounded-md px-8 py-6 drop-shadow-md">
                    <p className="text-5xl text-center text-blue-500">
                        <VerifiedUser color="inherit" fontSize="inherit" />
                    </p>
                    <h1 className="font-bold py-6 text-2xl tracking-tighter text-center text-gray-800">
                        Profesionalisme
                    </h1>
                    <p className="line-clamp-4 text-center text-gray-700">
                        Kami menjunjung tinggi profesionalisme dalam setiap
                        layanan yang diberikan, yang tercermin melalui tenaga
                        medis kami yang berpengalaman, bersertifikat, dan
                        senantiasa menjaga standar etika serta mutu pelayanan
                        kesehatan.
                    </p>
                </div>
                <div className="h-[300px] bg-white/70 w-[100%] md:w-[95%] backdrop-blur-sm rounded-md px-8 py-6 drop-shadow-md">
                    <p className="text-5xl text-center text-blue-500">
                        <Favorite color="inherit" fontSize="inherit" />
                    </p>
                    <h1 className="font-bold py-6 text-2xl tracking-tighter text-center text-gray-800">
                        Empati
                    </h1>
                    <p className="line-clamp-4 text-center text-gray-700">
                        Kami memahami bahwa setiap pasien memiliki kebutuhan
                        yang unik, oleh karena itu pendekatan kami selalu ramah,
                        penuh perhatian, dan berlandaskan kepedulian yang tulus
                        demi kenyamanan dan kesembuhan pasien.
                    </p>
                </div>
                <div className="h-[300px] bg-white/70 w-[100%] md:w-[95%] backdrop-blur-sm rounded-md px-8 py-6 drop-shadow-md">
                    <p className="text-5xl text-center text-blue-500">
                        <Balance color="inherit" fontSize="inherit" />
                    </p>
                    <h1 className="font-bold py-6 text-2xl tracking-tighter text-center text-gray-800">
                        Integritas
                    </h1>
                    <p className="line-clamp-4 text-center text-gray-700">
                        Kami berkomitmen untuk menjalankan seluruh aktivitas
                        pelayanan dengan integritas tinggi, menjunjung nilai
                        kejujuran, transparansi, serta tanggung jawab dalam
                        memberikan informasi dan tindakan medis.
                    </p>
                </div>
                <div className="h-[300px] bg-white/70 w-[100%] md:w-[95%] backdrop-blur-sm rounded-md px-8 py-6 drop-shadow-md">
                    <p className="text-5xl text-center text-blue-500">
                        <BuildCircle color="inherit" fontSize="inherit" />
                    </p>
                    <h1 className="font-bold py-6 text-2xl tracking-tighter text-center text-gray-800">
                        Inovasi
                    </h1>
                    <p className="line-clamp-4 text-center text-gray-700">
                        Kami terus berinovasi dalam meningkatkan kualitas
                        layanan melalui pemanfaatan teknologi terkini yang
                        mendukung efisiensi kerja, akurasi diagnosa, serta
                        kemudahan akses layanan kesehatan bagi masyarakat.
                    </p>
                </div>
            </div>
            {/* about us */}
            {/* ABOUT US */}
            <div
                ref={aboutRef}
                className="bg-white py-20 px-4 md:px-8 lg:px-24"
            >
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    {/* Left Image */}
                    <div className="relative rounded-xl overflow-hidden shadow-xl">
                        <img
                            src={"/storage/" + profile_klinik.logo_klinik}
                            alt={profile_klinik.nama_klinik}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay Accent */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-transparent"></div>
                    </div>

                    {/* Right Content */}
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-6">
                            Tentang <span className="text-blue-600">Kami</span>
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {profile_klinik.keterangan} Lorem ipsum dolor sit
                            amet consectetur adipisicing elit. Voluptatem
                            impedit facilis et! Impedit at suscipit, iure, culpa
                            ad rerum repudiandae aspernatur similique ut quos
                            nostrum iusto natus. Distinctio consectetur aliquid
                            voluptatem assumenda.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-3 border-l-4 border-blue-500 pl-3">
                            Visi
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Menjadi pusat layanan kesehatan terpercaya dan
                            unggulan di wilayah Kabupaten Mamuju Sulawesi Barat.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-3 border-l-4 border-blue-500 pl-3">
                            Misi
                        </h3>
                        <ul className="space-y-4 mt-4">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 mt-1 text-xl">
                                    ✔
                                </span>
                                <p className="text-gray-600">
                                    Memberikan pelayanan kesehatan yang prima
                                    dan profesional
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 mt-1 text-xl">
                                    ✔
                                </span>
                                <p className="text-gray-600">
                                    Meningkatkan kesadaran masyarakat akan
                                    pentingnya hidup sehat
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 mt-1 text-xl">
                                    ✔
                                </span>
                                <p className="text-gray-600">
                                    Mengembangkan teknologi informasi dalam
                                    pelayanan medis
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* card informasi */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-20 px-6 md:px-12 flex justify-center items-center w-full">
                <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Card 1 */}
                    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 p-8 text-center">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md">
                            <MedicalInformation
                                className="text-white"
                                fontSize="large"
                            />
                        </div>
                        <div className="mt-8">
                            <p className="text-5xl font-extrabold text-gray-800">
                                {dokter.length}
                            </p>
                            <p className="text-xl font-semibold text-blue-700 mt-3 tracking-tight">
                                Dokter
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 p-8 text-center">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md">
                            <LocalHospital
                                className="text-white"
                                fontSize="large"
                            />
                        </div>
                        <div className="mt-8">
                            <p className="text-5xl font-extrabold text-gray-800">
                                {poli.length}
                            </p>
                            <p className="text-xl font-semibold text-blue-700 mt-3 tracking-tight">
                                Layanan Klinik
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 p-8 text-center">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md">
                            <Group className="text-white" fontSize="large" />
                        </div>
                        <div className="mt-8">
                            <p className="text-5xl font-extrabold text-gray-800">
                                {dokter.length}
                            </p>
                            <p className="text-xl font-semibold text-blue-700 mt-3 tracking-tight">
                                Staff
                            </p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 p-8 text-center">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md">
                            <Face className="text-white" fontSize="large" />
                        </div>
                        <div className="mt-8">
                            <p className="text-5xl font-extrabold text-gray-800">
                                {dokter.length}
                            </p>
                            <p className="text-xl font-semibold text-blue-700 mt-3 tracking-tight">
                                Pasien
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* end card */}
            <div
                ref={poliRef}
                className="bg-gradient-to-br from-white to-blue-50 py-20 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center"
            >
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 text-center">
                    Layanan Klinik
                </h1>
                <div className="flex my-4">
                    <div className="w-[80px] h-[4px] bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-center text-gray-600 max-w-3xl">
                    Kami menyediakan berbagai layanan medis dengan fasilitas dan
                    tenaga profesional yang siap membantu Anda mendapatkan
                    perawatan terbaik.
                </p>

                {/* Tabs */}
                <div className="flex flex-col md:flex-row mt-12 w-full gap-6">
                    {/* Tab List */}
                    <div className="w-full md:w-1/3 space-y-3">
                        {poli.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setPoliAktif(item.id)}
                                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 ${
                                    poliAktif === item.id
                                        ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                                        : "bg-white text-gray-700 hover:border-blue-400 border"
                                }`}
                            >
                                <p className="text-lg font-semibold capitalize">
                                    {"Poli " + item.nama_poli}
                                </p>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="w-full md:w-2/3 bg-white shadow-lg rounded-xl p-6 border">
                        {poli.map((item) =>
                            poliAktif === item.id ? (
                                <div key={item.id}>
                                    <h2 className="text-2xl font-bold text-blue-700 mb-4">
                                        {"Poli " + item.nama_poli}
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.keterangan}
                                    </p>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            </div>

            <div
                ref={dokterRef}
                className="bg-blue-50 py-20 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center"
            >
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 text-center">
                    Dokter Kami
                </h1>
                <div className="flex my-4">
                    <div className="w-[80px] h-[4px] bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-center text-gray-600 max-w-3xl mb-12">
                    Tenaga medis kami adalah profesional yang berpengalaman dan
                    bersertifikat, siap memberikan pelayanan terbaik untuk Anda.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {dokter.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 flex flex-col items-center text-center"
                        >
                            <img
                                src={"/storage/" + item.avatar}
                                alt={item.nama_lengkap}
                                className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-100 shadow-md"
                            />
                            <h3 className="text-xl font-bold text-gray-800 capitalize">
                                {item.nama_lengkap}
                            </h3>
                            <p className="text-blue-600 font-medium mt-1">
                                {item.poli?.nama_poli}
                            </p>
                            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                                {item.keterangan}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {children}
        </>
    );
}
