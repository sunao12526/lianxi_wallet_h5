"use client";
import { Input, Toast, Button, Space, NavBar } from "antd-mobile";
import Image from "next/image";
import sc_pub_imag_alipayBtadd from "@/../public/alipayBtadd.png";
import sc_pub_imag_alipayBt from "@/../public/alipayBt.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const [mobile, setmobile] = useState<string>("");
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#F7F7F7",
        height: "100vh",
      }}
    >
      <NavBar
        style={{ background: "white", height: 64 }}
        onBack={() => router.back()}
      >
        支付宝账号
      </NavBar>

      <div style={{ background: "white", marginTop: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 15,
            marginRight: 15,
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          <div style={{ width: 120, fontSize: "17px", color: "#222222" }}>
            支付宝账号
          </div>
          <Input
            autoFocus
            type="number"
            placeholder="请输支付宝账号"
            clearable
            value={mobile}
            onChange={setmobile}
          ></Input>
        </div>
      </div>
      <Image
        style={{ marginTop: 50, alignSelf: "center" }}
        onClick={() => {}}
        src={sc_pub_imag_alipayBtadd}
        width={350}
        alt=""
      />
    </div>
  );
}
