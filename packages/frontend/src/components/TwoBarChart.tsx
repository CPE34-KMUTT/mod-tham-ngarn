import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const TwoBarChart = () => {
  return (
    <>
      <div className="self-start p-3 pt-6 ml-12 text-xl font-bold text-[#CBC3D8]">
        What is this Bars?
      </div>
      <div className="flex flex-col justify-around md:flex-row">
        <div className="h-[300px] w-[300px] md:w-[400px] xl:w-[900px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" tick={{ fill: "white" }} />
              <YAxis tick={{ fill: "white" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#7743EF" />
              <Bar dataKey="uv" fill="#E78DD2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xl font-bold">
          <span className="flex items-center justify-center">
            Hello this is Xiaoxuxx
          </span>
        </div>
      </div>
    </>
  );
};

export default TwoBarChart;