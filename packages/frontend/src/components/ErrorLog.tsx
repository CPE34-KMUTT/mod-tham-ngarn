import { type } from "os";
import React, { useEffect, useState } from "react";
import ErrorLogData from "src/data/ErrorLogData";
import ErrorLogItem from "./ErrorLogItem";

type DataPerPage = { name: string; id: string }[][];
type PerPageData = { name: string; id: string }[][];
function ErrorLog() {
  const [errorLogData, setErrorLogData] = useState(ErrorLogData);
  const [dataInPage, setDataInPage] = useState([]);
  const [page, setPage] = useState(0);
  //ข้อมูลทั้งหมด
  //จำนวนข้อมูลแต่ละหน้า กี่จำนวนต่อหนึ่งหน้า
  //จำนวนเลขหน้า = ข้อมลทั้งหมด / จำนวนข้อมูลแต่ละหน้า
  const pagination: any = () => {
    const foodPerPage = 3; //แสดง 3 รายการต่อหนึ่งหน้า
    const page = Math.ceil(ErrorLogData.length / foodPerPage); //จำนวนเลขหน้า

    const newFood = Array.from({ length: page }, (data, index) => {
      const start = index * foodPerPage; //[[0,..],[7,..]]
      return ErrorLogData.slice(start, start + foodPerPage);
    });
    return newFood;
  };

  useEffect(() => {
    const paginate = pagination();
    setDataInPage(paginate);
    setErrorLogData(paginate[page]);
  }, [page]);

  //รับเลขหน้ามาจากปุ่ม
  const handlePage = (index: number) => {
    setPage(index);
  };
  return (
    <div className="w-full h-full">
      {/* Title */}
      <div className="self-start p-2 ml-12 text-xl  font-bold text-[#CBC3D8]">
        <span>ErrorLogs</span>
      </div>
      {/* ErrorLog */}
      <div className="flex flex-col w-full h-full px-5 py-3 space-y-6 ">
        <div className="min-h-[208px] space-y-2">
          {errorLogData.map((element, index) => {
            return <ErrorLogItem key={index} {...element} />;
          })}
        </div>
        <div className="flex self-center flex-1 h-full space-x-3 justify-self-end">
          {dataInPage.map((data: number, index: number) => {
            return (
              <button
                className="w-8 h-8 "
                key={index}
                onClick={() => handlePage(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ErrorLog;
