// app/api/gantt-data/route.ts
import { NextResponse } from 'next/server';

const rawData = [
  { 品番: "A", 作業年月日時分: "202509191600", 通板時間: 123 },
  { 品番: "B", 作業年月日時分: "202509190232", 通板時間: 211 },
  { 品番: "C", 作業年月日時分: "202509191424", 通板時間: 211 },
  { 品番: "D", 作業年月日時分: "202509191852", 通板時間: 136 },
  { 品番: "E", 作業年月日時分: "202509201352", 通板時間: 132 },
];

function parseDate(str: string): Date {
  const year = Number(str.slice(0, 4));
  const month = Number(str.slice(4, 6)) - 1;
  const day = Number(str.slice(6, 8));
  const hour = Number(str.slice(8, 10));
  const min = Number(str.slice(10, 12));
  return new Date(year, month, day, hour, min);
}

export async function GET() {
  const data = rawData.map(row => {
    const end = parseDate(row.作業年月日時分);
    const start = new Date(end.getTime() - row.通板時間 * 60 * 1000);
    return {
      品番: row.品番,
      start: start.toISOString(),
      end: end.toISOString(),
      duration: row.通板時間,
    }
  });
  return NextResponse.json(data);
}
