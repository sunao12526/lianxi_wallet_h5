"use client";
import { Input, Toast, Button, Space, NavBar } from "antd-mobile";
import Image from "next/image";
import sc_pub_imag_doneBt from "@/../public/doneBt.png";
import sc_pub_imag_right from "@/../public/right.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTimer } from "react-timer-hook";
import utils from "@/utils/utils";
import { AxiosResponse } from "axios";
import httpRequest from "@/utils/httpRequest";
export default function Page() {
  const [mobile, setmobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordC, setPasswordC] = useState<string>("");
  const [safeCode, setSafeCode] = useState<string>("");
  const router = useRouter();
  const time = new Date();
  time.setSeconds(time.getSeconds());
  const { seconds, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });

  const onSubmit_sendRegisterSafeCode = async () => {
    if (!utils.validPhoneNumber(mobile)) {
      Toast.show("请输入正确的手机号");
      return;
    }
    setSafeCode("");
    const time = new Date();
    time.setSeconds(time.getSeconds() + 59);
    const res: AxiosResponse | void = await httpRequest
      .sendRegisterSafeCode(mobile)
      .catch((error) => console.log(error));
    if (res) {
      Toast.show("验证码发送成功");
      restart(time, true);
    }
  };

  const handle_confirmRegistorSafeCode = async () => {
    const res: AxiosResponse | void = await httpRequest
      .confirmRegistorSafeCode(mobile, safeCode)
      .catch((error) => console.log(error));
    if (res) {
      const { safeCode } = res.data;
      return safeCode;
    } else {
      Toast.show("验证码错误");
    }
  };

  //写一个正则表达式任意字符串长度8-20
  const passwordReg = /^.{8,20}$/;
  const onSubmit = async () => {
    if (!utils.validPhoneNumber(mobile)) {
      return Toast.show("请输入正确的手机号");
    }
    if (!passwordReg.test(password)) {
      return Toast.show("请输入8-20个字符的密码");
    }
    if (safeCode === "") {
      return Toast.show("请输入短信验证码");
    }

    const safeCodeValue = await handle_confirmRegistorSafeCode();
    if (!safeCodeValue) return;
    // const res: AxiosResponse | void = await httpRequest
    //   .regMobile(
    //     mobile,
    //     safeCodeValue,
    //   )
    //   .catch((error) => console.log(error));
    // if (res) {
    //   Toast.show("注册成功");
    //   const { mobile, password } = res.data;
    // } else {
    //   Toast.show("注册失败");
    // }
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
            value={mobile}
            onChange={setmobile}
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
            clearable
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
              //   width: seconds === 0 ? 180 : 350,
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
        onClick={() => {}}
        src={sc_pub_imag_doneBt}
        width={400}
        alt=""
      />
    </div>
  );
}
