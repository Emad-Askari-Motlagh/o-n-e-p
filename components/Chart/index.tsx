import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import styles from "./styles.module.scss";
import Head from "next/head";

const mounths = [
  "jan",
  "feb",
  "march",
  "aprill",
  "maj",
  "jun",
  "jul",
  "august",
  "oktuber",
  "september",
  "november",
  "december",
];

export default function Chart({ data, sortType }) {
  const dat = data?.GetAnalistics;
  const dataa = dat?.length && dat?.flatMap((res) => [res]);
  return (
    <div className={styles.container}>
      <Head></Head>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={dataa}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="sum"
            stroke="#2451B7"
            fill="url(#color)"
          />

          <XAxis dataKey="_id" axisLine={false} tickLine={false} />

          <YAxis axisLine={true} tickLine={true} tickCount={50} dataKey="sum" />

          <Tooltip />

          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  return (
    <div className="tooltip" style={{ color: "wheat" }}>
      kk
    </div>
  );

  return null;
}
