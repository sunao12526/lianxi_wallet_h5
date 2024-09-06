"use client";
import { useStores } from "@/models";
import { NavBar, List, Form } from "antd-mobile";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

export default observer(function Page() {
  const router = useRouter();
  const {
    walletStore: { isBindAlipay, realityStatusInfo, realityStatusValue },
  } = useStores();
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
          extra={realityStatusValue}
          clickable
          onClick={() => router.push("/wallet/walletRealname")}
        >
          实名认证
        </List.Item>
      </List>
      <List header={realityStatusInfo}>
        <List.Item
          clickable
          onClick={() => router.push("/wallet/walletChangepassword")}
        >
          修改支付密码
        </List.Item>
        <List.Item
          clickable
          onClick={() => router.push("/wallet/walletForgetpassword")}
        >
          忘记支付密码
        </List.Item>
        <List.Item
          clickable
          extra={isBindAlipay ? "已添加" : "未添加"}
          onClick={() => router.push("/wallet/walletBindAlipay")}
        >
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
});
