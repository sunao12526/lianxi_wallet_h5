"use client";
import { Input, Toast, Button, Space, NavBar, List, Switch } from "antd-mobile";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [password, setPassword] = useState<string>("");
  const [passwordC, setPasswordC] = useState<string>("");
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <NavBar
        className="shadow-md"
        style={{ background: "white", height: 64 }}
        onBack={() => router.back()}
      >
        详情
      </NavBar>

      <div className="self-center text-base mt-10">结算金额</div>
      <div className="self-center text-3xl mt-3">3000元</div>
      <div
        className="self-center w-11/12 bg-gray-200 mt-10"
        style={{ height: 0.5 }}
      />

      <div className="flex flex-row items-center ml-5 mt-6">
        <div className="text-sm mr-3" style={{ color: "#999999" }}>
          当前状态
        </div>
        <div className="text-sm">结算成功</div>
      </div>
      <div className="flex flex-row items-center ml-5 mt-3">
        <div className="text-sm mr-3" style={{ color: "#999999" }}>
          结算明细
        </div>
        <div className="text-sm ">2232332此聊豆结算3000元</div>
      </div>
      <div className="flex flex-row items-center ml-5 mt-3">
        <div className="text-sm mr-6" style={{ color: "#999999" }}>
          订单号
        </div>
        <div className="text-sm ">25674785745648695867</div>
      </div>
      <div className="flex flex-row items-center ml-5 mt-3">
        <div className="text-sm mr-3" style={{ color: "#999999" }}>
          发起时间
        </div>
        <div className="text-sm ">2019-04-10 14:11:17</div>
      </div>
      <div className="flex flex-row items-center ml-5 mt-3">
        <div className="text-sm mr-3" style={{ color: "#999999" }}>
          处理时间
        </div>
        <div className="text-sm ">2019-04-10 14:11:17</div>
      </div>
    </div>
  );
}
