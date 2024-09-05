"use client";
import { Input, Toast, NavBar } from "antd-mobile";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useRouter } from "next/navigation";
import sc_pub_imag_alipayBtadd from "@/../public/alipayBtadd.png";
import sc_pub_imag_alipayBt from "@/../public/alipayBt.png";
import { useStores } from "@/models";

export default observer(function Page() {
  const [openid, setopenid] = useState<string>("");
  const router = useRouter();
  const {
    walletStore: {
      fetch_bindBankCard,
      fetch_unbindChannel,
      isBindAlipay,
      wallet,
    },
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
        支付宝账号
      </NavBar>
      {isBindAlipay ? (
        <>
          <div style={{ background: "white", marginTop: 20 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: 15,
                marginRight: 15,
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <div style={{ fontSize: "17px", color: "#222222" }}>
                支付宝账号
              </div>
              <div style={{ fontSize: "17px", color: "#999999" }}>
                {wallet.alipayId}
              </div>
            </div>
          </div>
          <Image
            style={{ marginTop: 50, alignSelf: "center" }}
            onClick={() => {
              fetch_unbindChannel("alipay", openid);
              router.back();
            }}
            src={sc_pub_imag_alipayBt}
            width={window.innerWidth - 30}
            alt=""
          />
        </>
      ) : (
        <>
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
                value={openid}
                onChange={setopenid}
              ></Input>
            </div>
          </div>
          <Image
            style={{ marginTop: 50, alignSelf: "center" }}
            onClick={() => {
              if (openid === "") {
                return Toast.show("请输入支付宝账号");
              }
              fetch_bindBankCard("alipay", openid);
              router.back();
            }}
            src={sc_pub_imag_alipayBtadd}
            width={window.innerWidth - 30}
            alt=""
          />
        </>
      )}
    </div>
  );
});
