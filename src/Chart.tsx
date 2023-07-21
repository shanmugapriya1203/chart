import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { ChartData } from "./ChartData";
import Header from "./Header";
import Footer from "./Footer";
import { BASE_URL, API_ENDPOINTS } from "./apiConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const fetchData = () => {
  return axios.get<ChartData[]>(`${BASE_URL}${API_ENDPOINTS.GET_CHART_DATA}`);
};

const Charts: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [value, setValue] = useState<number | "">("");
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    fetchData().then((response) => {
      setChartData(response.data);
    });
  }, []);

  const chartLabels = chartData.map((data) => data.label);
  const chartValues = chartData.map((data) => data.value);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Chart Data",
        data: chartValues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!label || value === "") {
      alert("Label and value are required ");
      return
    }

    axios
      .post(`${BASE_URL}${API_ENDPOINTS.POST_CHART_DATA}`, { label, value })
      .then((response) => {
        console.log(response.data);
        fetchData().then((response) => {
          setChartData(response.data);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setLabel("")
    setValue("")
  };

  return (
    <>
      <Header />
      <div className="chart-form-container">
        <div className="chart-container chart-form-box">
          <h1>Live chart Update</h1>
          <Line data={data} options={options} />
        </div>

        <form onSubmit={handleSubmit} className="data-form">
          <h1>Add Data</h1>
          <input
            type="text"
            value={label}
            placeholder="Label"
            onChange={(e) => setLabel(e.target.value)}
          />
          <input
            type="number"
            value={value}
            placeholder="Value"
            onChange={(e) => setValue(parseFloat(e.target.value))}
          />
          <button type="submit">Add Data</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Charts;
