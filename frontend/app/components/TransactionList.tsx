"use client";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";

type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
};

// ✅ เพิ่ม Type สำหรับ props
type TransactionListProps = {
  transactions: Transaction[];
};

export default function TransactionList({ transactions }: TransactionListProps) {
  // ✅ ฟังก์ชันลบธุรกรรม
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("คุณต้องการลบธุรกรรมนี้หรือไม่?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "transactions", id));
      alert("ลบธุรกรรมเรียบร้อย ✅");
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">📋 รายการธุรกรรมล่าสุด</h2>
      <ul className="mt-2 bg-white shadow-md rounded-lg divide-y">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <li key={t.id} className="p-4 flex justify-between items-center">
              <span>
                {t.date} - {t.category}  
                <span className={t.type === "income" ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                  {t.type === "income" ? "+" : "-"}{t.amount.toLocaleString()} บาท
                </span>
              </span>
              <button
                onClick={() => handleDelete(t.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                ❌ ลบ
              </button>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">ไม่มีรายการธุรกรรม</p>
        )}
      </ul>
    </div>
  );
}
