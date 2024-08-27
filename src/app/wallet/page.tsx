"use client";
import { Input, Toast, Button, NavBar, Space } from "antd-mobile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import sc_pub_buttonBg from "@/../public/buttonBg.png";
import walletBg from "@/../public/walletBg.png";
import sc_pub_cld from "@/../public/cld.png";
import sc_pub_imag_right from "@/../public/right.png";
import { useStores } from "@/stores/useStores";

export default function Page() {
  const router = useRouter();
  const {
    walletStore: { currttenYue },
  } = useStores();
  return (
    <div>
      <NavBar
        style={{ background: "white", height: 64 }}
        onBack={() => {
          // 调用原生方法
          (window as any).webkit.messageHandlers.event.postMessage("goBack");
        }}
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
      >
        钱包
      </NavBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // height: "100vh",
        }}
      >
        <Image src={walletBg} alt=""></Image>
        <div
          style={{
            position: "absolute",
            top: 50 + 64,
            color: "white",
            fontSize: 18,
          }}
        >
          当前此聊豆
        </div>
        <div
          style={{
            position: "absolute",
            top: 100 + 64,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image src={sc_pub_cld} alt="" />
          <div
            style={{
              color: "white",
              fontSize: 50,
              marginLeft: 10,
            }}
          >
            {currttenYue}
          </div>
        </div>

        <div
          style={{
            color: "#222222",
            fontSize: 22,
            fontWeight: "bold",
            marginLeft: 50,
            marginTop: 20,
            alignSelf: "flex-start",
          }}
        >
          激活钱包
        </div>
        <div
          style={{
            color: "#555555",
            fontSize: 16,
            marginLeft: 50,
            marginTop: 10,
            alignSelf: "flex-start",
          }}
        >
          您需激活，才可正常使用钱包
        </div>
        <Image
          style={{ marginTop: 50 }}
          onClick={() => router.push("/wallet/walletactivity")}
          src={sc_pub_buttonBg}
          width={220}
          height={50}
          alt=""
        />
      </div>
    </div>
  );
}
