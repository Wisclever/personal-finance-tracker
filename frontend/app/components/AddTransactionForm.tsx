"use client";
import { useState } from "react";

type Transaction = {
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
  isRecurring?: boolean;
  recurringType?: "monthly" | "weekly" | "daily" | "yearly";
  recurringAmount?: number;
  recurringEnd?: string;
  customRecurring?: Record<string, number>;
};

type AddTransactionFormProps = {
  onAdd: (newTransaction: Transaction) => void;
};

export default function AddTransactionForm({ onAdd }: AddTransactionFormProps) {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [recurringType, setRecurringType] = useState<"monthly" | "weekly" | "daily" | "yearly">("monthly");
  const [recurringAmount, setRecurringAmount] = useState<number>(0);
  const [recurringEnd, setRecurringEnd] = useState<string>("");
  const [customRecurring, setCustomRecurring] = useState<Record<string, number>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    const newTransaction: Transaction = {
      amount,
      category,
      type,
      date,
    };

    if (isRecurring) {
      newTransaction.isRecurring = true;
      newTransaction.recurringType = recurringType;
      newTransaction.recurringAmount = recurringAmount;
      newTransaction.recurringEnd = recurringEnd;
      newTransaction.customRecurring = customRecurring;
    }

    onAdd(newTransaction);

    setAmount(0);
    setCategory("");
    setIsRecurring(false);
    setRecurringAmount(0);
    setRecurringEnd("");
    setCustomRecurring({});
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">➕ เพิ่มรายการ</h2>
      <div className="mt-2">
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="จำนวนเงิน" className="border p-2 rounded w-full" />
      </div>
      <div className="mt-2">
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}
          placeholder="หมวดหมู่" className="border p-2 rounded w-full" />
      </div>
      <div className="mt-2">
        <select value={type} onChange={(e) => setType(e.target.value as "income" | "expense")}
          className="border p-2 rounded w-full">
          <option value="income">📈 รายรับ</option>
          <option value="expense">📉 รายจ่าย</option>
        </select>
      </div>
      <div className="mt-2">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full" />
      </div>
      <div className="mt-2 flex items-center">
        <input type="checkbox" checked={isRecurring} onChange={() => setIsRecurring(!isRecurring)}
          className="mr-2" />
        <label>เป็นรายการเกิดซ้ำ?</label>
      </div>

      {isRecurring && (
        <>
          <div className="mt-2">
            <select value={recurringType} onChange={(e) => setRecurringType(e.target.value as any)}
              className="border p-2 rounded w-full">
              <option value="daily">ทุกวัน</option>
              <option value="weekly">ทุกสัปดาห์</option>
              <option value="monthly">ทุกเดือน</option>
              <option value="yearly">ทุกปี</option>
            </select>
          </div>
          <div className="mt-2">
            <input type="number" value={recurringAmount} onChange={(e) => setRecurringAmount(Number(e.target.value))}
              placeholder="จำนวนเงินต่อรอบ" className="border p-2 rounded w-full" />
          </div>
          <div className="mt-2">
            <input type="date" value={recurringEnd} onChange={(e) => setRecurringEnd(e.target.value)}
              className="border p-2 rounded w-full" placeholder="วันที่สิ้นสุด" />
          </div>
        </>
      )}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-3 w-full">
        บันทึก
      </button>
    </form>
  );
}
