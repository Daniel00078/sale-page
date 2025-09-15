import { useEffect, useState } from "react";

// ✅ import โลโก้บริษัท
import companyLogo from "./assets/ceetong.png";
import lineLogo from "./assets/line.webp";

// ✅ import โลโก้ธนาคาร
import k from "./assets/banks/k.webp";
import scb from "./assets/banks/scb.webp";
import k1 from "./assets/banks/k1.webp";
import bbl from "./assets/banks/bbl.webp";
import ttb from "./assets/banks/ttb.webp";
import ktb from "./assets/banks/ktb.webp";

// ✅ import รูปเกม
import game1 from "./assets/games/game1.webp";
import game2 from "./assets/games/game2.webp";
import game3 from "./assets/games/game3.webp";
import game4 from "./assets/games/game4.webp";
import game5 from "./assets/games/game5.webp";
import game6 from "./assets/games/game6.webp";

// ✅ import รูป carousel
import banner1 from "./assets/banners/banner1.webp";
import banner2 from "./assets/banners/banner2.webp";
import banner3 from "./assets/banners/banner3.webp";
import cer from "./assets/banners/cer.webp";
import mm from "./assets/banners/mm.webp";

// ✅ import พื้นหลัง
import bg1 from "./assets/bg/bg1.jpg";
import bg2 from "./assets/bg/bg2.webp";
import bg3 from "./assets/bg/bg3.jpg";
import bg4 from "./assets/bg/bg4.png";
import bg5 from "./assets/bg/bg5.png";

// ✅ ธนาคาร
const banks = [
  { name: "กสิกรไทย", logo: k },
  { name: "ไทยพาณิชย์", logo: scb },
  { name: "กรุงศรี", logo: k1 },
  { name: "กรุงเทพ", logo: bbl },
  { name: "ทีเอ็มบีธนชาต", logo: ttb },
  { name: "กรุงไทย", logo: ktb },
];

// ✅ ฟังก์ชันสุ่มธุรกรรม
const generateFakeSale = () => {
  const names = ["090X", "084X", "087X", "096X", "099X", "085X", "093X"];
  const now = new Date();
  const dateStr = `${now.getDate().toString().padStart(2, "0")}/${
    (now.getMonth() + 1).toString().padStart(2, "0")
  }/${now.getFullYear() + 543}`;
  const timeStr = now.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomBank = banks[Math.floor(Math.random() * banks.length)];

  let amount;
  const chance = Math.random();
  if (chance < 0.75) {
    amount = Math.floor(Math.random() * 4500) + 500;
  } else if (chance < 0.85) {
    amount = Math.floor(Math.random() * 5000) + 5000;
  } else {
    amount = Math.floor(Math.random() * 40000) + 10000;
  }

  return {
    id: Date.now(),
    name: randomName,
    bank: randomBank.name,
    logo: randomBank.logo,
    amount: amount.toLocaleString(),
    date: dateStr,
    time: timeStr,
  };
};

export default function SalePage() {
  // ✅ ธุรกรรม
  const [sales, setSales] = useState(() =>
    Array.from({ length: 1 }, () => generateFakeSale())
  );

  // ✅ ออนไลน์
  const [onlineCounts, setOnlineCounts] = useState(() =>
    Array.from({ length: 6 }, () => Math.floor(Math.random() * 3000) + 100)
  );

  // ✅ Carousel
  const images = [banner1, banner2, banner3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Lazy load เกม
  const games = [game1, game2, game3, game4, game5, game6];
  const [loadedGames, setLoadedGames] = useState(
    Array(games.length).fill(false)
  );

  useEffect(() => {
    games.forEach((game, idx) => {
      const timer = setTimeout(() => {
        setLoadedGames((prev) => {
          const newState = [...prev];
          newState[idx] = true;
          return newState;
        });
      }, idx * 300); // โหลดทีละเกม 300ms
      return () => clearTimeout(timer);
    });
  }, []);

  // ✅ อัปเดตธุรกรรมทุก 3 วิ
  useEffect(() => {
    const interval = setInterval(() => {
      setSales((prev) => [generateFakeSale(), ...prev].slice(0, 4));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ✅ อัปเดตจำนวนออนไลน์ทุก 5 วิ
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCounts((prev) =>
        prev.map((count) => Math.max(0, count + Math.floor(Math.random() * 11) - 5))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Carousel auto slide ทุก 3 วิ
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center text-white overflow-hidden">
      {/* พื้นหลัง */}
      <div className="absolute inset-0">
        <img
          src={bg2}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* โลโก้บริษัท */}
      <img
        src={companyLogo}
        alt="Company Logo"
        className="w-120 h-100 mt-10 mb-1 z-10 drop-shadow-[0_0_30px_rgba(255,215,0,1)]"
      />
      <h2 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg z-10 animate-flicker">
        เว็บตรงอันดับ 1
      </h2>
      <h2 className="text-2l font-extrabold mb-5 text-center drop-shadow-lg z-10">
        การันตีแตก 100% ตั้งแต่ครั้งแรก 🎊
      </h2>

      {/* ปุ่ม */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 justify-center items-center z-10">
        <a
          href="https://line.me/ti/p/@859avxgd"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center justify-center px-12 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-extrabold text-xl rounded-full shadow-[0_0_30px_5px_rgba(255,215,0,0.9)] overflow-hidden group transition transform hover:scale-110 duration-500 animate-super-button"
        >
          <span className="relative z-10">✨ สมัครสมาชิก</span>
        </a>
        <a
          href="https://line.me/ti/p/@859avxgd"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-full shadow-lg shadow-green-500/40 hover:scale-110 hover:shadow-green-300/70 transition transform duration-500 overflow-hidden group"
        >
          <img src={lineLogo} alt="LINE" className="w-7 h-7 relative z-10" />
          <span className="relative z-10">ติดต่อสอบถาม</span>
        </a>
      </div>

      {/* การถอน */}
      <h2 className="text-4xl font-extrabold text-yellow-500 mb-8 text-center drop-shadow-lg z-10 animate-flicker">
        🏆 อันดับการถอน
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl mb-12 z-10">
        {sales.map((sale) => (
          <div
            key={sale.id}
            className="flex items-center bg-gray-900 bg-opacity-80 shadow-2xl rounded-2xl p-5"
          >
            <img
              src={sale.logo}
              alt={sale.bank}
              className="w-20 h-20 object-contain rounded-xl bg-gray-200 p-2"
            />
            <div className="ml-5">
              <p className="font-semibold text-lg">
                {sale.name} ถอนเงินเข้า {sale.bank}
              </p>
              <p className="text-green-400 font-bold text-xl">฿ {sale.amount}</p>
              <p className="text-gray-400 text-sm">
                วันที่ {sale.date} เวลา {sale.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* เกมฮิต */}
      <h2 className="text-4xl font-extrabold text-yellow-500 mb-8 text-center drop-shadow-lg z-10 animate-flicker">
        🎮 เกมฮิต
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mx-auto mb-16 z-10">
        {games.map((game, idx) => (
          <div
            key={idx}
            className="relative group rounded-3xl overflow-hidden shadow-2xl border-2 border-yellow-500/40 hover:shadow-yellow-400/80 transition transform hover:-translate-y-2 hover:scale-105 duration-500"
          >
            {loadedGames[idx] ? (
              <img
                src={game}
                alt={`Game ${idx + 1}`}
                className="w-full h-64 object-cover group-hover:brightness-110 transition duration-500"
              />
            ) : (
              <div className="w-full h-64 bg-gray-800 animate-pulse" />
            )}
            <div className="absolute bottom-6 left-0 right-0 text-center space-y-3">
              <p className="text-lg md:text-xl font-bold text-yellow-300 drop-shadow-md">
                🟢 ออนไลน์ {onlineCounts[idx].toLocaleString()}
              </p>
              <a
                href="https://line.me/ti/p/@859avxgd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-extrabold text-lg rounded-full shadow-lg shadow-yellow-500/40 hover:scale-110 hover:shadow-yellow-400/70 transition transform duration-500"
              >
                เล่นเลย 🚀
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel */}
      <h2 className="text-4xl font-extrabold text-yellow-500 mb-8 text-center drop-shadow-lg z-10 animate-flicker">
        🤩 โปรโมชั่นเพียบ
      </h2>
      <div className="w-full max-w-3xl mx-auto mb-16 z-10 relative">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={images[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Banner เดี่ยว */}
      <div className="w-full max-w-3xl mx-auto mb-16 z-10">
        <img
          src={cer}
          alt="Single Banner"
          className="w-full h-full object-cover rounded-3xl shadow-2xl"
        />
      </div>
      <div className="w-full max-w-3xl mx-auto mb-16 z-10">
        <img
          src={mm}
          alt="Single Banner"
          className="w-full h-full object-cover rounded-3xl shadow-2xl"
        />
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes flicker {
          0%,19%,21%,23%,25%,54%,56%,100% { opacity:1; text-shadow:0 0 8px #FFA500, 0 0 20px #000000ff, 0 0 30px #FFA500; }
          20%,24%,55% { opacity:0.4; text-shadow:none; }
        }
        .animate-flicker { animation: flicker 3s infinite; }
        .animate-super-button {
          background: linear-gradient(270deg, #FFD700, #FFEC8B, #FFC700, #FFE066);
          background-size: 600% 600%;
          color: black;
          font-weight: 800;
          border-radius: 9999px;
          animation: gradientShift 5s ease infinite, pulseGlow 2s ease infinite;
          box-shadow: 0 0 15px rgba(255,215,0,0.6);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .animate-super-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 35px rgba(255,215,0,1), 0 0 50px rgba(255,255,200,0.8);
        }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes pulseGlow { 0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(255,215,0,0.6); } 50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(255,215,0,0.9); } }
      `}</style>
    </div>
  );
}
