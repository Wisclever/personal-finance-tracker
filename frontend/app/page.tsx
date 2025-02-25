import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600">Personal Finance Tracker</h1>
        <p className="text-lg mt-2">จัดการรายรับ-รายจ่ายของคุณง่าย ๆ</p>
      </div>
    </div>
  );
}
