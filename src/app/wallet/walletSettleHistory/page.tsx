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
        background: "#F7F7F7",
        height: "100vh",
      }}
    >
      <NavBar
        style={{ background: "white", height: 64 }}
        onBack={() => router.back()}
      >
        结算记录
      </NavBar>

      <List header=" ">
        <List.Item
          extra="+345此聊豆"
          clickable
          arrowIcon={false}
          description="2019-09-01"
        >
          充值
        </List.Item>
        <List.Item
          extra="-345此聊豆"
          clickable
          arrowIcon={false}
          description="2019-09-01"
        >
          提现
        </List.Item>
        <List.Item
          extra="+345此聊豆"
          clickable
          arrowIcon={false}
          description="2019-09-01"
        >
          提现
        </List.Item>
      </List>
    </div>
  );
}
