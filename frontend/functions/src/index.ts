import { onSchedule, ScheduledEvent } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const processRecurringTransactions = onSchedule("every day", async (event: ScheduledEvent) => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD
  const currentMonth = today.toISOString().slice(0, 7); // YYYY-MM

  const transactionsRef = db.collection("transactions").where("isRecurring", "==", true);
  const snapshot = await transactionsRef.get();

  snapshot.forEach(async (doc) => {
    const data = doc.data();

    // ถ้าถึงวันครบกำหนดแล้ว ไม่ต้องสร้างรายการเพิ่ม
    if (data.recurringEnd && new Date(data.recurringEnd) < today) return;

    let shouldCreateTransaction = false;
    let newAmount = data.recurringAmount || data.amount;

    // ตรวจสอบประเภทของ Recurring
    switch (data.recurringType) {
      case "daily":
        shouldCreateTransaction = true;
        break;
      case "weekly":
        const lastTransactionDate = new Date(data.date);
        if ((today.getTime() - lastTransactionDate.getTime()) / (1000 * 60 * 60 * 24) >= 7) {
          shouldCreateTransaction = true;
        }
        break;
      case "monthly":
        if (data.date.slice(8, 10) === todayStr.slice(8, 10)) {
          shouldCreateTransaction = true;
        }
        break;
      case "yearly":
        if (data.date.slice(5, 10) === todayStr.slice(5, 10)) {
          shouldCreateTransaction = true;
        }
        break;
    }

    // ถ้ามีการกำหนด custom amount ให้ใช้ค่าที่กำหนดไว้
    if (data.customRecurring && data.customRecurring[currentMonth]) {
      newAmount = data.customRecurring[currentMonth];
    }

    // ถ้าถึงกำหนดต้องสร้างรายการใหม่
    if (shouldCreateTransaction) {
      await db.collection("transactions").add({
        ...data,
        amount: newAmount,
        date: todayStr, // ตั้งวันที่เป็นวันนี้
      });
    }
  });

  return; // ✅ แก้จาก `return null;` เป็น `return;`
});
