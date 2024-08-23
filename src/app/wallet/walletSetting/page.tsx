"use client";
import { Input, Toast, Button, Space, NavBar, List, Switch } from "antd-mobile";
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
        onBack={() => router.back()}
      >
        支付管理
      </NavBar>

      <List header=" ">
        <List.Item
          extra="已认证"
          clickable
          description="管理已授权的产品和设备"
        >
          实名认证
        </List.Item>
        <List.Item clickable>修改支付密码</List.Item>
        <List.Item clickable>忘记支付密码</List.Item>
        <List.Item clickable extra="已认证">
          支付宝账号
        </List.Item>
        <List.Item clickable>常见问题</List.Item>
      </List>
    </div>
  );
}
