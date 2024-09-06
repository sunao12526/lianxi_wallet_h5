"use client";
import { Input, NavBar } from "antd-mobile";
import Image from "next/image";
import sc_pub_imag_doneBt from "@/../public/doneBt.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStores } from "@/models";
import { observer } from "mobx-react-lite";

export default observer(function Page() {
  const [password, setPassword] = useState<string>("");
  const [passwordC, setPasswordC] = useState<string>("");
  const router = useRouter();
  const {
    walletStore: { fetch_setPassWord },
  } = useStores();
  const onSubmit = async () => {
    await fetch_setPassWord(password, passwordC);
  };
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
        设置支付密码
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
        style={{ marginTop: 50, alignSelf: "center" }}
        onClick={onSubmit}
        src={sc_pub_imag_doneBt}
        width={window.innerWidth - 10 * 2}
        alt=""
      />
    </div>
  );
});
