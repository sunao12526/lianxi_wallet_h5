"use client";
import { NavBar, List } from "antd-mobile";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useStores } from "@/models";

export default observer(function Page() {
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
    walletStore: { currttenYue },
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
              // onClick={() => router.push("/wallet/walletHistory")}
            >
              使用微信结算此聊豆
            </List.Item>
            <List.Item
              clickable
              // onClick={() => router.push("/wallet/walletHistory")}
            >
              使用支付宝结算此聊豆
            </List.Item>
          </List>
        </div>
      </div>
    </div>
  );
});
