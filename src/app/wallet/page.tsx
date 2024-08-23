"use client";
import { Input, Toast, Button } from "antd-mobile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import sc_pub_mask from "@/../public/buttonBg.png";
import sc_pub_mask1 from "@/../public/v02-waves-23 1.png";
import sc_pub_imag1 from "@/../public/椭圆形.png";
export default function Page() {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Image src={sc_pub_mask1} alt=""></Image>
      <div
        style={{
          position: "absolute",
          top: 50,
          color: "white",
          fontSize: 18,
        }}
      >
        当前此聊豆
      </div>
      <div
        style={{
          position: "absolute",
          top: 100,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Image src={sc_pub_imag1} alt="" />
        <div
          style={{
            color: "white",
            fontSize: 50,
            marginLeft: 10,
          }}
        >
          2000
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
        src={sc_pub_mask}
        width={220}
        height={50}
        alt=""
      />
    </div>
  );
}
