import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";

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
// const data = [];

// for (let num = 1; num <= mounths.length; num++) {
//   data.push({
//     date: num,
//     value: num,
//     mounth: mounths[num - 1],
//   });
//   if (mounths[num - 1] === "feb") {
//     data.splice(num - 1, 1, {
//       date: 1,
//       value: 10,
//       mounth: mounths[num - 1],
//     });
//   }
// }

export default function Chart({ data, sortType }) {
  const dat = data?.GetAnalistics;
  const dataa = dat.flatMap((res) => [
    { ...res, sum: (res.sum / dat.length) * Math.random() },
    { ...res, sum: res.sum / dat.length },
    { ...res, sum: res.sum / dat.length },
    { ...res, sum: (res.sum / dat.length) * Math.random() },
  ]);
  return (
    <div>
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
            dataKey={`sum`}
            stroke="#2451B7"
            fill="url(#color)"
          />

          <XAxis
            dataKey={() => {
              switch (sortType) {
                case "year":
                  return dataa.map((res: { year: string }) => res.year);

                case "month":
                  return dataa.map((res: { month: string }) => res.month);
                case "day":
                  return dataa.map((res: { day: string }) => res.day);
                default:
                  break;
              }
            }}
            axisLine={false}
            tickLine={false}
          />

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
