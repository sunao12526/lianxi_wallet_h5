"use client";
import { Input, Toast, Button, Space, NavBar } from "antd-mobile";
import Image from "next/image";
import sc_pub_imag_buttonBg from "@/../public/buttonBg.png";
import sc_pub_imag_right from "@/../public/right.png";
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
        background: "#F7F7F7",
        height: "100vh",
      }}
    >
      <NavBar
        style={{ background: "white", height: 64 }}
        right={
          <div style={{ marginRight: 15 }}>
            <Space>
              <Image
                src={sc_pub_imag_right}
                alt=""
                onClick={() => router.push("/wallet/walletSetting")}
              />
            </Space>
          </div>
        }
        onBack={() => router.back()}
      >
        激活钱包
      </NavBar>

      <div style={{ background: "white", marginTop: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Input
            autoFocus
            type={"password"}
            style={{ marginLeft: 12 }}
            placeholder="请输入支付密码"
            clearable
            value={password}
            onChange={setPassword}
          ></Input>
        </div>
        <div
          style={{
            height: 1,
            background: "#f0f0f0",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 15,
          }}
        ></div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Input
            autoFocus
            type={"password"}
            style={{ marginLeft: 12, marginRight: 20 }}
            placeholder="请确认支付密码"
            clearable
            value={passwordC}
            onChange={setPasswordC}
          ></Input>
        </div>
        <div
          style={{
            height: 0,
            background: "#f0f0f0",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 15,
          }}
        ></div>
      </div>
      <Image
        style={{ marginTop: 80, alignSelf: "center" }}
        // onClick={() => router.push("/wallet/walletactivity")}
        src={sc_pub_imag_buttonBg}
        width={220}
        height={50}
        alt=""
      />
    </div>
  );
}
