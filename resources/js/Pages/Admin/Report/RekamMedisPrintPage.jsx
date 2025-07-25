import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePage } from "@inertiajs/react";

export default function RekamMedisPrintPage() {
    const { url } = usePage();
    const [reportData, setReportData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    // Parse query parameters from URL
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const reportType = queryParams.get("report_type");
    const dateFrom = queryParams.get("date_from");
    const dateTo = queryParams.get("date_to");
    const monthFrom = queryParams.get("month_from");
    const monthTo = queryParams.get("month_to");
    const year = queryParams.get("year");
    const dokterId = queryParams.get("dokter_id");

    useEffect(() => {
        const payload = {
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
    }, [reportType, dateFrom, dateTo, monthFrom, monthTo, year, dokterId]);

    if (loading) {
        return <div className="p-4 max-w-4xl mx-auto">Loading...</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto bg-white">
            <h1 className="text-2xl font-bold mb-4">
                Laporan Cetak Rekam Medis
            </h1>
            <p>Total Data: {total}</p>
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 p-2">ID</th>
                        <th className="border border-gray-400 p-2">Pasien</th>
                        <th className="border border-gray-400 p-2">Dokter</th>
                        <th className="border border-gray-400 p-2">Tanggal</th>
                        <th className="border border-gray-400 p-2">Keluhan</th>
                        <th className="border border-gray-400 p-2">Diagnosa</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((item) => (
                        <tr key={item.id}>
                            <td className="border border-gray-400 p-2">
                                {item.id}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {item.pasien
                                    ? item.pasien.nama
                                    : item.pasien_id}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {item.dokter && item.dokter.user
                                    ? item.dokter.user.name
                                    : item.dokter_id}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {item.tanggal}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {item.keluhan}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {item.diagnosa}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={() => window.print()}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
                Cetak Laporan
            </button>
        </div>
    );
}
