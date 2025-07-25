import React, { useState, useEffect } from "react";
import axios from "axios";
import InputText from "@/Components/InputText";
import SelectOptions from "@/Components/SelectOptions";
import { router } from "@inertiajs/react";

export default function RekamMedisReportPage() {
    const [reportType, setReportType] = useState("daily");
    const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
    const [dateFrom, setDateFrom] = useState(
        new Date().toISOString().substr(0, 10)
    );
    const [dateTo, setDateTo] = useState(
        new Date().toISOString().substr(0, 10)
    );
    const [monthFrom, setMonthFrom] = useState(new Date().getMonth() + 1);
    const [monthTo, setMonthTo] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [dokterId, setDokterId] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios
            .get(route("admin.report.rekam-medis.getDoctors"))
            .then((response) => {
                setDoctors(response.data);
            });
    }, []);

    const generateReport = () => {
        setLoading(true);
        let payload = {
            report_type: reportType,
            dokter_id: dokterId || null,
        };
        if (reportType === "daily") {
            payload.date_from = dateFrom;
            payload.date_to = dateTo;
        } else if (reportType === "monthly") {
            payload.month_from = monthFrom;
            payload.month_to = monthTo;
            payload.year = year;
        } else if (reportType === "yearly") {
            payload.year = year;
        }
        axios
            .post(route("admin.report.rekam-medis.generate"), payload)
            .then((response) => {
                setReportData(response.data.data || []);
                setTotal(response.data.total || 0);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const printReport = () => {
        // Navigate to print page with query params using Inertia
        const queryParams = new URLSearchParams();
        queryParams.append("report_type", reportType);
        if (reportType === "daily") {
            queryParams.append("date_from", dateFrom);
            queryParams.append("date_to", dateTo);
        } else if (reportType === "monthly") {
            queryParams.append("month_from", monthFrom);
            queryParams.append("month_to", monthTo);
            queryParams.append("year", year);
        } else if (reportType === "yearly") {
            queryParams.append("year", year);
        }
        if (dokterId) {
            queryParams.append("dokter_id", dokterId);
        }
        router.visit(
            route("admin.report.rekam-medis.print") +
                `?${queryParams.toString()}`
        );
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Laporan Rekam Medis</h1>
            <div className="bg-white p-6 rounded shadow mb-6">
                <div className="mb-4 max-w-sm">
                    <SelectOptions
                        label="Jenis Laporan"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                    >
                        <option value="daily">Harian</option>
                        <option value="monthly">Bulanan</option>
                        <option value="yearly">Tahunan</option>
                    </SelectOptions>
                </div>
                {reportType === "daily" && (
                    <>
                        <div className="mb-4 max-w-sm">
                            <InputText
                                label="Tanggal Mulai"
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 max-w-sm">
                            <InputText
                                label="Tanggal Selesai"
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                            />
                        </div>
                    </>
                )}
                {reportType === "monthly" && (
                    <>
                        <div className="mb-4 max-w-sm">
                            <SelectOptions
                                label="Bulan Mulai"
                                value={monthFrom}
                                onChange={(e) =>
                                    setMonthFrom(parseInt(e.target.value))
                                }
                            >
                                {[
                                    "Januari",
                                    "Februari",
                                    "Maret",
                                    "April",
                                    "Mei",
                                    "Juni",
                                    "Juli",
                                    "Agustus",
                                    "September",
                                    "Oktober",
                                    "November",
                                    "Desember",
                                ].map((monthName, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {monthName}
                                    </option>
                                ))}
                            </SelectOptions>
                        </div>
                        <div className="mb-4 max-w-sm">
                            <SelectOptions
                                label="Bulan Selesai"
                                value={monthTo}
                                onChange={(e) =>
                                    setMonthTo(parseInt(e.target.value))
                                }
                            >
                                {[
                                    "Januari",
                                    "Februari",
                                    "Maret",
                                    "April",
                                    "Mei",
                                    "Juni",
                                    "Juli",
                                    "Agustus",
                                    "September",
                                    "Oktober",
                                    "November",
                                    "Desember",
                                ].map((monthName, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {monthName}
                                    </option>
                                ))}
                            </SelectOptions>
                        </div>
                        <div className="mb-4 max-w-sm">
                            <InputText
                                label="Tahun"
                                type="number"
                                value={year}
                                onChange={(e) =>
                                    setYear(parseInt(e.target.value))
                                }
                            />
                        </div>
                    </>
                )}
                {reportType === "yearly" && (
                    <div className="mb-4 max-w-sm">
                        <InputText
                            label="Tahun"
                            type="number"
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                        />
                    </div>
                )}
                <div className="mb-4 max-w-sm">
                    <SelectOptions
                        label="Pilih Dokter"
                        value={dokterId}
                        onChange={(e) => setDokterId(e.target.value)}
                    >
                        <option value="">Semua Dokter</option>
                        {doctors.map((dokter) => (
                            <option key={dokter.id} value={dokter.id}>
                                {dokter.name}
                            </option>
                        ))}
                    </SelectOptions>
                </div>
                <button
                    onClick={generateReport}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {loading ? "Memuat..." : "Generate Laporan"}
                </button>
            </div>

            {reportData.length > 0 && (
                <div className="bg-white p-6 rounded shadow overflow-auto">
                    <h2 className="text-lg font-semibold mb-2">
                        Hasil Laporan
                    </h2>
                    <p>Total Data: {total}</p>
                    <table className="w-full border-collapse border border-gray-300 mt-2">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">
                                    ID
                                </th>
                                <th className="border border-gray-300 p-2">
                                    Pasien
                                </th>
                                <th className="border border-gray-300 p-2">
                                    Dokter
                                </th>
                                <th className="border border-gray-300 p-2">
                                    Tanggal
                                </th>
                                <th className="border border-gray-300 p-2">
                                    Keluhan
                                </th>
                                <th className="border border-gray-300 p-2">
                                    Diagnosa
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.map((item) => (
                                <tr key={item.id}>
                                    <td className="border border-gray-300 p-2">
                                        {item.id}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {item.pasien
                                            ? item.pasien.nama
                                            : item.pasien_id}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {item.dokter && item.dokter.user
                                            ? item.dokter.user.name
                                            : item.dokter_id}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {item.tanggal}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {item.keluhan}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {item.diagnosa}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        onClick={printReport}
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Cetak Laporan
                    </button>
                </div>
            )}
        </div>
    );
}
