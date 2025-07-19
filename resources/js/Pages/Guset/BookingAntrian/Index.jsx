import InputText from "@/Components/InputText";
import SelectOptions from "@/Components/SelectOptions";
import TextArea from "@/Components/TextArea";
import GuestLayouts from "@/Layouts/GuestLayouts";
import { useForm, usePage } from "@inertiajs/react";
import React, { useRef } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id"; // agar hari bahasa Indonesia
dayjs.locale("id");
export default function Index(props) {
    const user = props.user;
    const pasien = props.pasien;
    const antrianSaya = props.antrianSaya;
    console.log(antrianSaya);

    const bookingRef = useRef(null);
    const { poli, dokter, jadwalDokter } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        id: user.id,
        name: "",
        phone_number: "",
        nik: "",
        bpjs: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        alamat: "",
        tanggal_kunjungan: "",
        dokter_id: "",
        poli_id: "",
        keluarga_id: "",
    });
    const changeTanggalKunjungan = (e) => {
        const selectedDate = e.target.value; // format: YYYY-MM-DD
        const selectedDay = dayjs(selectedDate).format("dddd").toLowerCase();

        // gunakan nama variabel baru agar tidak konflik
        const jadwalDokterFiltered = jadwalDokter.filter(
            (j) => j.dokter_id == data.dokter_id
        );

        // cek apakah selectedDay ada di jadwal dokter
        const isHariBuka = jadwalDokterFiltered.some(
            (j) => j.hari.toLowerCase() === selectedDay
        );

        if (!isHariBuka) {
            alert(
                `Dokter tidak praktek di hari ${selectedDay}. Silakan pilih hari lain.`
            );
            setData("tanggal_kunjungan", "");
            return;
        }

        setData("tanggal_kunjungan", selectedDate);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("store-booking-antrian"));
    };

    return (
        <div>
            <div
                ref={bookingRef}
                className="bg-white py-16 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center"
            >
                <h1 className="text-4xl font-semibold tracking-tighter text-gray-800 text-center">
                    Reservasi Jadwal Pemeriksaan
                </h1>
                <div className="flex my-2">
                    <div className="w-[90px] h-[2px] bg-gray-200 rounded-tl-md rounded-tr-md"></div>
                    <div className="w-[90px] h-[2px] bg-blue-500"></div>
                    <div className="w-[90px] h-[2px] bg-gray-200 rounded-bl-md rounded-br"></div>
                </div>
                <p className="tracking-tighter text-center text-gray-600">
                    Silahkan mengambil antrian dengan mengisi form dibawah ini,
                    jika antrian anda sukses anda tinggal menunggu di poli tidak
                    perlu melakukan registrasi kembali
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 items-start">
                <div className="drop-shadow-md bg-white py-6 px-8 flex justify-center items-center w-full lg:w-1/2">
                    <form onSubmit={submitHandler} action="" className="w-full">
                        <p className=" font-bold tracking-tighter text-3xl border-b-2 border-blue-500 px-4 text-gray-600 inline-block">
                            Jadwal Pemeriksaan
                        </p>
                        <div className="my-3 drop-shadow-md bg-white py-6 px-8 rounded-md">
                            <p className="text-sm my-3 py-1 px-2 rounded-md bg-gray-100">
                                Silakan pilih salah satu anggota keluarga yang
                                telah Anda daftarkan sebelumnya untuk
                                melanjutkan proses pendaftaran pemeriksaan.
                                Pastikan data anggota keluarga tersebut sudah
                                lengkap dan benar agar proses pemeriksaan dapat
                                berjalan dengan lancar.
                            </p>
                            <div>
                                <SelectOptions
                                    name="keluarga_id"
                                    label={"Pilih Keluarga"}
                                    value={data.keluarga_id}
                                    errors={errors.keluarga_id}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            keluarga_id: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">
                                        Pilih anggota keluarga
                                    </option>
                                    {pasien.map((item, key) => (
                                        <option
                                            className="capitalize"
                                            key={key}
                                            value={item.id}
                                        >
                                            {item.nama + ` (${item.status})`}
                                        </option>
                                    ))}
                                </SelectOptions>
                            </div>
                            <div className="flex gap-x-3 flex-col md:flex-row">
                                <div>
                                    <SelectOptions
                                        name="poli_id"
                                        label={"Layanan Klinik"}
                                        value={data.poli_id}
                                        errors={errors.poli_id}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                poli_id: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">
                                            Pilih Layanan Klinik
                                        </option>
                                        {poli.map((item, key) => (
                                            <option key={key} value={item.id}>
                                                {item.nama_poli}
                                            </option>
                                        ))}
                                    </SelectOptions>
                                </div>
                                <div>
                                    <SelectOptions
                                        name="dokter_id"
                                        label={"Dokter"}
                                        value={data.dokter_id}
                                        errors={errors.dokter_id}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                dokter_id: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">
                                            Pilih Dokter Spesialis
                                        </option>
                                        {dokter.map((item, key) => (
                                            <>
                                                {(item.poli_id ==
                                                    data.poli_id ||
                                                    data.poli_id == "") && (
                                                    <option
                                                        key={key}
                                                        value={item.id}
                                                    >
                                                        {item.nama_lengkap}
                                                    </option>
                                                )}
                                            </>
                                        ))}
                                    </SelectOptions>
                                </div>
                                {data.dokter_id !== "" &&
                                    data.poli_id !== "" && (
                                        <div>
                                            <InputText
                                                label={"tanggal_kunjungan"}
                                                type="date"
                                                name="tanggal_kunjungan"
                                                value={data.tanggal_kunjungan}
                                                errors={
                                                    errors.tanggal_kunjungan
                                                }
                                                onChange={(e) =>
                                                    changeTanggalKunjungan(e)
                                                }
                                                className={"w-full"}
                                            />
                                        </div>
                                    )}
                            </div>
                            <button className="py-2 px-4 my-2 bg-blue-600 hover:bg-blue-800 useTransition text-white tracking-tighter rounded-md">
                                Ambil Antrian
                            </button>
                        </div>
                        <p className=" font-bold tracking-tighter text-3xl border-b-2 border-blue-500 px-4 text-gray-600 inline-block">
                            Jadwal Operasional Dokter {data.dokter_id}
                        </p>
                        <div className="my-3 drop-shadow-md bg-white py-6 px-8 rounded-md">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-blue-600 py-2">
                                        <th className="w-10">#</th>
                                        <th className="">Nama Dokter</th>
                                        <th className="">Hari</th>
                                        <th className="">Jadwal Mulai</th>
                                        <th className="">Jadwal Selesai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jadwalDokter.map((item, key) => (
                                        <>
                                            {(data.dokter_id == "" ||
                                                data.dokter_id ==
                                                    item.dokter_id) && (
                                                <tr key={key}>
                                                    <td className="text-center">
                                                        {key + 1}
                                                    </td>
                                                    <td className="text-center capitalize">
                                                        {
                                                            item.dokter
                                                                .nama_lengkap
                                                        }
                                                    </td>
                                                    <td className="text-center capitalize">
                                                        {item.hari}
                                                    </td>
                                                    <td className="text-center capitalize">
                                                        {item.start_time}
                                                    </td>
                                                    <td className="text-center capitalize">
                                                        {item.end_time}
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full md:w-1/2 px-8 justify-center items-center">
                    {antrianSaya.map((item, key) => (
                        <div className="w-full bg-blue-600 drop-shadow-md h-[250px] flex flex-col px-8 py-3  gap-y-3 rounded-md">
                            <div className="h-full flex flex-col justify-center items-center gap-y-4">
                                <p className="text-white text-xl">
                                    Antrian Anda
                                </p>
                                <p className="text-7xl text-white font-semibold tracking-tighter uppercase font-mono">
                                    <p className="text-7xl text-white font-semibold tracking-tighter uppercase font-mono">
                                        {item.kd_antrian}
                                    </p>
                                </p>
                                <div className="text-center border-t border-white/50 w-full">
                                    <p className="text-xl tracking-tighter text-white capitalize">
                                        Nama Pasien
                                    </p>
                                    <p className="text-xl tracking-tighter text-white capitalize">
                                        {item.nama_pasien}
                                    </p>
                                    <p className="tracking-tighter font-bold text-2xl text-white capitalize">
                                        {item.poli.nama_poli}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <GuestLayouts children={page} title={"Buat Antrian"} />
);
