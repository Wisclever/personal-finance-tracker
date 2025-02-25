import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      {/* โลโก้ หรือ ชื่อเว็บ */}
      <h1 className="text-xl font-bold">💰 Personal Finance Tracker</h1>

      {/* เมนูนำทาง */}
      <div className="flex space-x-6">
        <Link href="/" className="hover:underline">Summary</Link>
        <Link href="/income" className="hover:underline">Income</Link>
        <Link href="/expense" className="hover:underline">Expense</Link>
        <Link href="/about" className="hover:underline">About Us</Link>
      </div>
    </nav>
  );
}
