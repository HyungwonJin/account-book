"use client";
import Image from "next/image";
import { useGoBack } from "@/app/hooks/useGoBack";
import { useState } from "react";

type IncomeType = "income" | "expense";

export default function Page() {
  const goBack = useGoBack();
  const [isCamera, setIsCamera] = useState(false);
  const [isIncome, setIsIncome] = useState<IncomeType>("income");

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="absolute h-screen w-full bg-black bg-opacity-40 top-0 left-0 z-10">
      <div
        className="absolute right-4 top-4 bg-background rounded-xl"
        onClick={goBack}
      >
        <Image src="/images/close.svg" alt="close" width={20} height={20} />
      </div>
      <div className="absolute h-90vh bottom-0 p-5 bg-background w-full rounded-t-xl">
        <div className="flex">
          <div
            className={`grow flex justify-center font-bold text-xl pb-[10px] ${
              isCamera
                ? "text-gray-2 border-b-2 border-b-gray-2"
                : "text-primary border-b-2 border-b-primary"
            }`}
            onClick={() => setIsCamera(false)}
          >
            手入力
          </div>
          <div
            className={`grow flex justify-center font-bold text-xl pb-[10px] ${
              isCamera
                ? "text-primary border-b-2 border-b-primary"
                : "text-gray-2 border-b-2 border-b-gray-2"
            }`}
            onClick={() => setIsCamera(true)}
          >
            カメラ
          </div>
        </div>
        <div className="mt-6 bg-gray-1 rounded-lg flex p-[5px] h-[42px]">
          <div
            className={`grow flex items-center justify-center rounded-lg ${
              isIncome === "income" ? "bg-background shadow" : ""
            }`}
            onClick={() => setIsIncome("income")}
          >
            収入
          </div>
          <div
            className={`grow flex items-center justify-center rounded-lg ${
              isIncome === "expense" ? "bg-background shadow" : ""
            }`}
            onClick={() => setIsIncome("expense")}
          >
            支出
          </div>
        </div>
        <div className="mt-6">
          <div className="relative flex items-center">
            <div className="absolute left-0 pl-3 pt-2 items-center justify-center">
              <span className="text-2xl text-gray-2">¥</span>
            </div>
            <input
              type="number"
              className="w-full h-12 border-0 bg-background border-b-2 px-4 mt-2 focus:outline-none focus:border-b-2 focus:border-primary text-xl text-right"
              placeholder="金額を入力してください。"
            />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-2xl">日付</span>
          <input
            type="date"
            className="border-0 bg-background p-2 rounded focus:outline-none focus:border-b-primary text-xl text-right border-b-2 border"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
}
