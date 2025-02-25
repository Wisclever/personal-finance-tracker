"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";
import Navbar from "./components/Navbar";
import TransactionList from "./components/TransactionList";
import AddTransactionForm from "./components/AddTransactionForm";

type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // ✅ ฟังก์ชันเพิ่มธุรกรรมลง Firestore
  const addTransaction = async (newTransaction: Omit<Transaction, "id">) => {
    try {
      await addDoc(collection(db, "transactions"), {
        ...newTransaction,
        date: serverTimestamp(), // ใช้ timestamp ของ Firestore
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "transactions"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const transaction = doc.data();
        return {
          id: doc.id,
          ...transaction,
          date: transaction.date?.seconds
            ? new Date(transaction.date.seconds * 1000).toISOString().split("T")[0]
            : "Unknown Date", // แปลง Timestamp เป็น YYYY-MM-DD
        };
      }) as Transaction[];
      setTransactions(data);
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center">📊 Summary</h1>

        {/* แสดงยอดเงินคงเหลือ */}
        <div className="mt-4 p-6 bg-white shadow-md rounded-lg text-center">
          <h2 className="text-lg font-semibold">💰 ยอดเงินคงเหลือ</h2>
          <p className="text-2xl font-bold">
            {transactions.reduce((acc, t) => acc + (t.type === "income" ? t.amount : -t.amount), 0).toLocaleString()} บาท
          </p>
        </div>

        {/* ฟอร์มเพิ่มธุรกรรม */}
        <AddTransactionForm onAdd={addTransaction} />

        {/* รายการธุรกรรม */}
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
