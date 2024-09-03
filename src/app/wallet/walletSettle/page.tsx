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
import sc_pub_jiesuanBG from "@/../public/jiesuanBG.png";

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
    ></div>
  );
});

export default function Page() {
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
    walletStore: { currttenYue, isActivity },
  } = useStores();
  return (
    <div style={{ background: "#F7F7F7", height: "100vh" }}>
      <NavBar
        style={{ background: "white", height: 64 }}
        onBack={() => {
          router.back();
        }}
      >
        结算此聊豆
      </NavBar>
      <div
        style={
          {
            // display: "flex",
            // flex: 1,
            // flexDirection: "column",
            // alignItems: "center",
            // background: "#F7F7F7",
          }
        }
      >
        <div
          className="bg-jiesuan"
          style={{
            width: window.innerWidth - 10 * 2,
            height: ((window.innerWidth - 10 * 2) * 318) / 728,
            marginLeft: 10,
            marginTop: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="flex flex-1 flex-col justify-center items-center">
            <div className="text-base font-light text-center text-white text-opacity-60 mb-2">
              当前此聊豆
            </div>
            <div className="text-4xl font-medium text-center text-white ">
              {currttenYue}
            </div>
          </div>

          <div
            className="h-16 bg-opacity-30"
            style={{ width: 1, background: "#DBDBDB" }}
          ></div>

          <div className="flex flex-1 flex-col justify-center items-center  relative">
            <div className="text-base font-light text-center text-white text-opacity-60 mb-2">
              折算金额
            </div>
            <div className="text-4xl font-medium text-center text-white ">
              {currttenYue}
            </div>
            <div className="text-sm font-light text-center text-white text-opacity-60 mb-2 absolute -bottom-10  ">
              本周剩余结算额度100元
            </div>
          </div>
        </div>
        <div className="text-sm font-light text-center text-slate-950">
          每笔可结算金额100-1000元
        </div>
        <div>
          <List header="请选择结算方式">
            <List.Item
              clickable
              onClick={() => router.push("/wallet/walletHistory")}
            >
              使用微信结算此聊豆
            </List.Item>
            <List.Item
              clickable
              onClick={() => router.push("/wallet/walletHistory")}
            >
              使用支付宝结算此聊豆
            </List.Item>
          </List>
        </div>
      </div>
    </div>
  );
}
