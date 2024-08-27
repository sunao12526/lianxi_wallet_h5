"use client";
import { Input, Toast, Button, NavBar, Space, Grid } from "antd-mobile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import sc_pub_buttonBg from "@/../public/buttonBg.png";
import walletBg from "@/../public/walletBg.png";
import sc_pub_cld from "@/../public/cld.png";
import sc_pub_imag_right from "@/../public/right.png";
import sc_pub_imag_Mask from "@/../public/Mask.png";
import { useStores } from "@/stores/useStores";

function Page_no_active() {
  const router = useRouter();
  return (
    <>
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
    </>
  );
}

const Page_active = observer(function Page_active() {
  const styles = {
    display: "flex",
    flex: 1,
    width: (window.innerWidth - 8 * 2 - 15 * 2) / 3,
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: "5px",
    backgroundColor: "white",
  };

  const router = useRouter();
  const {
    walletStore: { items, currentItem, setCurrentItem },
  } = useStores();

  function handleColor(item: string) {
    if (currentItem === item) {
      return {
        titleColor: "white",
        desColor: "white",
      };
    } else {
      return {
        titleColor: "black",
        desColor: "#999999",
      };
    }
  }
  return (
    <div style={{ color: "red" }}>
      <Grid columns={3} gap={8} style={{ background: "#F7F7F7", padding: 5 }}>
        {items.map((item) => {
          return (
            <Grid.Item key={item} onClick={() => setCurrentItem(item)}>
              <div
                style={styles}
                className={
                  currentItem === item
                    ? `bg-hero-pattern bg-cover bg-center`
                    : ""
                }
              >
                <div
                  style={{
                    color: handleColor(item).titleColor,
                    fontSize: 16,
                  }}
                >
                  {item}元
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    marginTop: 5,
                  }}
                >
                  <Image
                    src={sc_pub_cld}
                    width={15}
                    style={{ marginBottom: 2 }}
                    alt=""
                  />
                  <div
                    style={{
                      color: handleColor(item).desColor,
                      fontSize: 14,
                      // fontWeight: "200",
                      marginLeft: 3,
                    }}
                  >
                    {Number(item) * 7}此聊豆
                  </div>
                </div>
              </div>
            </Grid.Item>
          );
        })}
      </Grid>
    </div>
  );
});

export default function Page() {
  const router = useRouter();
  const {
    walletStore: { currttenYue, isActivity },
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
        {isActivity ? <Page_active></Page_active> : Page_no_active()}
      </div>
    </div>
  );
}
