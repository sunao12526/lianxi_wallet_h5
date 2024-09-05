"use client";
import { NavBar } from "antd-mobile";
import Image from "next/image";
import sc_pub_imag_doneBt from "@/../public/doneBt.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";
import { useStores } from "@/models";

export default function Page() {
  const [safeCode, setSafeCode] = useState<string>("");
  const router = useRouter();
  const {
    walletStore: { fetch_authPassWord },
  } = useStores();

  const onSubmit = async () => {
    const res = await fetch_authPassWord(safeCode);
    if (res) router.push("/wallet/walletChangepassword/walletAuthpassword");
  };

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
        设置支付密码
      </NavBar>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <div style={{ color: "#222222", fontSize: 16 }}>
          请输入支付密码,以验证身份
        </div>
        <OtpInput
          skipDefaultStyles={true}
          containerStyle={{
            height: 100,
            backgroundColor: "#fff",
          }}
          inputStyle={{
            width: 45,
            height: 59,
            borderRadius: 10,
            backgroundColor: "#F4F4F4",
            border: "0px solid rgba(0, 0, 0, 0.3)",
            marginLeft: 5,
            marginRight: 5,
            textAlign: "center",
          }}
          value={safeCode}
          onChange={setSafeCode}
          numInputs={6}
          inputType="number"
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <Image
        style={{ marginTop: 50, alignSelf: "center" }}
        onClick={onSubmit}
        src={sc_pub_imag_doneBt}
        width={window.innerWidth - 15 * 2}
        alt=""
      />
    </div>
  );
}
