"use client";
import { Toast, NavBar, Space, Grid, List, Radio, Popup } from "antd-mobile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useStores } from "@/models";

import sc_pub_buttonBg from "@/../public/buttonBg.png";
import walletBg from "@/../public/walletBg.png";
import sc_pub_cld from "@/../public/cld.png";
import sc_pub_imag_right from "@/../public/right.png";
import sc_pub_chargeBt from "@/../public/chargeBt.png";
import sc_pub_zhifubao from "@/../public/zhifubao.png";
import sc_pub_weixin from "@/../public/weixin.png";

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
        onClick={() => router.push("/wallet/walletActivity")}
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
    walletStore: {
      items,
      currentItem,
      setCurrentItem,
      visibleCharge,
      setVisibleCharge,
    },
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
    <div
      style={{
        display: "flex",
        flex: 1,
        width: "100%",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignSelf: "center" }}>
        <Grid
          columns={3}
          gap={8}
          style={{
            background: "#F7F7F7",
            padding: 5,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
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
      <div>
        <List
          style={{
            "--border-bottom": "solid 8px #F7F7F7",
            "--border-top": "0px ",
          }}
        >
          <List.Item prefix={<Radio>已阅读并同意</Radio>} clickable>
            <div style={{ color: "#6A70F8" }}>《用户充值协议》</div>
          </List.Item>
        </List>
        <List
          style={{
            "--border-bottom": "solid 8px #F7F7F7",
            "--border-top": "0px",
          }}
        >
          <List.Item
            clickable
            onClick={() => router.push("/wallet/walletHistory")}
          >
            交易记录
          </List.Item>
        </List>
        <Image
          style={{ marginTop: 50, marginLeft: 20 }}
          onClick={() => {
            setVisibleCharge(true);
          }}
          src={sc_pub_chargeBt}
          width={window.innerWidth - 20 * 2}
          alt=""
        />
      </div>
      <Popup
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          height: "50vh",
        }}
        visible={visibleCharge}
        onMaskClick={() => {
          setVisibleCharge(false);
        }}
        onClose={() => {
          setVisibleCharge(false);
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ color: "#222222", fontSize: 14, marginTop: 10 }}>
              需要支付
            </div>
            <div style={{ color: "#000000", fontSize: 35, marginTop: 12 }}>
              ￥{currentItem}
            </div>
            <div
              style={{
                color: "#555555",
                fontSize: 16,
                alignSelf: "self-start",
                marginLeft: 22,
                marginTop: 12,
              }}
            >
              请选择支付方式
            </div>
          </div>
          <List
            mode="card"
            header=""
            style={{
              "--border-bottom": "0px",
              "--border-top": "0px",
            }}
          >
            <List.Item
              prefix={<Image src={sc_pub_zhifubao} width={40} alt="" />}
              extra={<Radio></Radio>}
              arrowIcon={false}
              onClick={() => {}}
            >
              账单
            </List.Item>
          </List>
          <List
            mode="card"
            header=""
            style={{
              "--border-bottom": "0px",
              "--border-top": "0px",
            }}
          >
            <List.Item
              prefix={<Image src={sc_pub_weixin} width={40} alt="" />}
              extra={<Radio></Radio>}
              arrowIcon={false}
              onClick={() => {}}
            >
              微信支付
            </List.Item>
          </List>
          <Image
            style={{ marginTop: 20, marginLeft: 20 }}
            onClick={() => {}}
            src={sc_pub_chargeBt}
            width={window.innerWidth - 20 * 2}
            alt=""
          />
        </div>
      </Popup>
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
          <div
            style={{
              marginRight: 15,
              paddingBottom: 10,
              paddingTop: 10,
            }}
            onClick={() => router.push("/wallet/walletSetting")}
          >
            <Space>
              <Image src={sc_pub_imag_right} alt="" />
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
