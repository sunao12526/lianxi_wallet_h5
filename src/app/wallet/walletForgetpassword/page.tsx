"use client";
import { Input, Toast, Button, NavBar } from "antd-mobile";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTimer } from "react-timer-hook";
import { observer } from "mobx-react-lite";
import sc_pub_imag_doneBt from "@/../public/doneBt.png";
import { useStores } from "@/models";
export default observer(function Page() {
  const [password, setPassword] = useState<string>("");
  const [passwordC, setPasswordC] = useState<string>("");
  const [safeCode, setSafeCode] = useState<string>("");
  const router = useRouter();
  const {
    walletStore: {
      loginAccount,
      fetch_sendSMSCode,
      fetch_authSMSCode,
      fetch_setPassWord,
    },
  } = useStores();

  const time = new Date();
  time.setSeconds(time.getSeconds());
  const { seconds, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });

  const onSubmit_sendRegisterSafeCode = async () => {
    setSafeCode("");
    const time = new Date();
    time.setSeconds(time.getSeconds() + 59);
    fetch_sendSMSCode();
    restart(time, true);
  };

  //写一个正则表达式任意字符串长度只能是6位
  const passwordReg = /^.{6,6}$/;
  const onSubmit = async () => {
    if (!passwordReg.test(password) || !passwordReg.test(passwordC)) {
      return Toast.show("请输入6位密码");
    }
    if (safeCode === "") {
      return Toast.show("请输入短信验证码");
    }
    const res = await fetch_authSMSCode(safeCode);
    if (res) {
      const res = await fetch_setPassWord(password, passwordC);
      if (res) router.back();
    }
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
        找回支付密码
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
          <div style={{ width: 70, fontSize: "17px", color: "#222222" }}>
            手机号
          </div>
          <Input
            autoFocus
            type="number"
            placeholder="请输入手机号"
            clearable
            value={loginAccount.mobile}
            readOnly
          ></Input>
        </div>

        <div
          style={{
            height: 1,
            background: "#f0f0f0",
            marginLeft: 15,
            marginRight: 15,
            marginTop: 0,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 15,
            marginRight: 15,
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          <div
            style={{
              width: 70,
              fontSize: "17px",
              color: "#222222",
            }}
          >
            验证码
          </div>
          <Input
            autoFocus
            type="number"
            placeholder="输入短信验证码"
            value={safeCode}
            onChange={setSafeCode}
          ></Input>
          <Button
            onClick={onSubmit_sendRegisterSafeCode}
            size="small"
            style={{
              "--background-color": "#76AF9E",
              "--text-color": "white",
              height: 30,
              position: "absolute",
              right: 15,
            }}
            disabled={seconds !== 0}
          >
            {seconds === 0 ? "获取验证码" : `重新获取 ${seconds}S`}
          </Button>
        </div>

        <div
          style={{
            height: 1,
            background: "#f0f0f0",
            marginLeft: 15,
            marginRight: 15,
            marginTop: 0,
          }}
        />

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
          <div style={{ width: 70, fontSize: "17px", color: "#222222" }}>
            密码
          </div>
          <Input
            autoFocus
            type="password"
            style={{ marginLeft: 0 }}
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
            marginLeft: 15,
            marginRight: 15,
            marginTop: 0,
          }}
        />

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
          <div style={{ width: 70, fontSize: "17px", color: "#222222" }}>
            密码
          </div>
          <Input
            type="password"
            style={{ marginLeft: 0 }}
            placeholder="请确认支付密码"
            clearable
            value={passwordC}
            onChange={setPasswordC}
          ></Input>
        </div>
      </div>
      <Image
        style={{ marginTop: 50, alignSelf: "center" }}
        onClick={onSubmit}
        src={sc_pub_imag_doneBt}
        width={400}
        alt=""
      />
    </div>
  );
});
