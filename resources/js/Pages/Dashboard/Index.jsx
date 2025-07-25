import AuthLayouts from "@/Layouts/AuthLayouts";
import { Head } from "@inertiajs/react";
import {
    Face3,
    LocalHospital,
    MedicalInformation,
    Timeline,
} from "@mui/icons-material";
import React, { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

// ✅ daftar elemen chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function Index(props) {
    const {
        countDokter,
        countPoli,
        countPasien,
        countAntrianPoli,
        chartLabels,
        chartYearlyDatasets,
        dailyLabels,
        dailyData,
    } = props;

    // tipe chart tahunan
    const [yearlyType, setYearlyType] = useState("line");
    // tipe chart harian
    const [dailyType, setDailyType] = useState("bar");

    const yearlyData = { labels: chartLabels, datasets: chartYearlyDatasets };
    const dailyDataSet = {
        labels: dailyLabels,
        datasets: [
            {
                label: "Antrian Hari Ini",
                data: dailyData,
                backgroundColor: "#3b82f6",
                borderColor: "#1e40af",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: { legend: { position: "top" }, title: { display: false } },
    };

    const cardClass =
        "rounded-xl p-6 shadow-md text-white flex flex-col justify-between";

    return (
        <div className="px-4 md:px-8 py-6 space-y-8">
            {/* Statistik Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                    className={`${cardClass} bg-gradient-to-br from-blue-500 to-blue-600`}
                >
                    <div className="flex justify-between items-center">
                        <MedicalInformation fontSize="large" />
                        <p className="text-4xl font-bold">{countDokter}</p>
                    </div>
                    <p className="mt-4 text-sm font-medium">Total Dokter</p>
                </div>

                <div
                    className={`${cardClass} bg-gradient-to-br from-pink-500 to-pink-600`}
                >
                    <div className="flex justify-between items-center">
                        <LocalHospital fontSize="large" />
                        <p className="text-4xl font-bold">{countPoli}</p>
                    </div>
                    <p className="mt-4 text-sm font-medium">Total Poli</p>
                </div>

                <div
                    className={`${cardClass} bg-gradient-to-br from-green-500 to-green-600`}
                >
                    <div className="flex justify-between items-center">
                        <Face3 fontSize="large" />
                        <p className="text-4xl font-bold">{countPasien}</p>
                    </div>
                    <p className="mt-4 text-sm font-medium">Total Pasien</p>
                </div>

                <div
                    className={`${cardClass} bg-gradient-to-br from-amber-500 to-amber-600`}
                >
                    <div className="flex justify-between items-center">
                        <Timeline fontSize="large" />
                        <p className="text-4xl font-bold">{countAntrianPoli}</p>
                    </div>
                    <p className="mt-4 text-sm font-medium">Antrian Hari Ini</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 justify-between items-center w-full">
                {/* Grafik Harian */}
                <div className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">
                            Grafik Antrian Hari Ini (Per Poli)
                        </h2>
                        <select
                            className="border rounded-md px-3 py-2"
                            value={dailyType}
                            onChange={(e) => setDailyType(e.target.value)}
                        >
                            <option value="bar">Bar Chart</option>
                            <option value="line">Line Chart</option>
                            <option value="pie">Pie Chart</option>
                        </select>
                    </div>
                    {dailyType === "bar" && (
                        <Bar data={dailyDataSet} options={chartOptions} />
                    )}
                    {dailyType === "line" && (
                        <Line data={dailyDataSet} options={chartOptions} />
                    )}
                    {dailyType === "pie" && (
                        <Pie data={dailyDataSet} options={chartOptions} />
                    )}
                </div>
                {/* Grafik Tahunan */}
                <div className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">
                            Grafik Antrian Tahunan (Per Poli)
                        </h2>
                        <select
                            className="border rounded-md px-3 py-2"
                            value={yearlyType}
                            onChange={(e) => setYearlyType(e.target.value)}
                        >
                            <option value="line">Line Chart</option>
                            <option value="bar">Bar Chart</option>
                            <option value="pie">Pie Chart</option>
                        </select>
                    </div>
                    {yearlyType === "line" && (
                        <Line data={yearlyData} options={chartOptions} />
                    )}
                    {yearlyType === "bar" && (
                        <Bar data={yearlyData} options={chartOptions} />
                    )}
                    {yearlyType === "pie" && (
                        <Pie data={yearlyData} options={chartOptions} />
                    )}
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <AuthLayouts children={page} title={"Dashboard"} />;
