import { useEffect, useState } from "react";
import k from "./assets/banks/k.png";
import scb from "./assets/banks/scb.png";
import k1 from "./assets/banks/k1.png";
import bbl from "./assets/banks/bbl.png";
import ttb from "./assets/banks/ttb.png";
import ktb from "./assets/banks/ktb.png";

// ข้อมูลธนาคาร
const banks = [
  { name: "กสิกรไทย", logo: k },
  { name: "ไทยพาณิชย์", logo: scb },
  { name: "กรุงศรี", logo: k1 },
  { name: "กรุงเทพ", logo: bbl },
  { name: "ทีเอ็มบีธนชาต", logo: ttb },
  { name: "กรุงไทย", logo: ktb },
];

// ฟังก์ชันสุ่มรายการธุรกรรม
const generateFakeSale = () => {
  const names = ["090X", "084X", "087X", "096X", "099X", "085X", "093X"];
  const now = new Date();

// แปลงเป็นวันที่ไทยแบบ "20/08/2568" และเวลา "13:45"
const dateStr = `${now.getDate().toString().padStart(2,'0')}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getFullYear()+543}`;
const timeStr = now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });

  const randomName = names[Math.floor(Math.random() * names.length)];
  
  const randomBank = banks[Math.floor(Math.random() * banks.length)];

  return {
    id: Date.now(),
    name: randomName,
    bank: randomBank.name,
    logo: randomBank.logo,
    amount: (Math.floor(Math.random() * 5000) + 500).toLocaleString(),
    time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
    date: dateStr,
    time: timeStr,
    
  };
}

export default function App() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // เพิ่มรายการใหม่ทุก 5 วินาที
    const interval = setInterval(() => {
      setSales((prev) => [generateFakeSale(), ...prev].slice(0,8)); // แสดงล่าสุด 10 รายการ
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        🏆 อันดับการถอน
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {sales.map((sale) => (
          <div
            key={sale.id}
            className="flex items-center bg-white shadow-md rounded-2xl p-4 transition transform hover:scale-105"
          >
            <img
              src={sale.logo}
              alt={sale.bank}
              className="w-16 h-16 object-contain rounded-xl bg-gray-100 p-2"
            />
            <div className="ml-4">
              <p className="font-semibold">
                {sale.name} ถอนเงินเข้า {sale.bank}
              </p>
              <p className="text-green-600 font-bold">฿ {sale.amount}</p>
              <p className="text-sm text-gray-500">
                วันที่ {sale.date} เวลา {sale.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
