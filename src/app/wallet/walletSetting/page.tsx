"use client";
import { Toast, NavBar, List } from "antd-mobile";
import { useRouter } from "next/navigation";

export default function Page() {
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
        <List.Item
          clickable
          onClick={() => router.push("/wallet/walletSettle")}
        >
          结算此聊豆
        </List.Item>
        <List.Item
          clickable
          onClick={() => router.push("/wallet/walletSettleHistory")}
        >
          结算记录
        </List.Item>
        <List.Item clickable>常见问题</List.Item>
      </List>
    </div>
  );
}
