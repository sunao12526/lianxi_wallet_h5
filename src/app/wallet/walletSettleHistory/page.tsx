"use client";
import { NavBar, List, Result } from "antd-mobile";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStores } from "@/models";

export default function Page() {
  const router = useRouter();
  const {
    walletStore: { fetch_getRecords, walletSettleList },
  } = useStores();
  useEffect(() => {
    fetch_getRecords(2);
  }, [fetch_getRecords]);

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
        className="shadow-md"
        style={{ background: "white", height: 64 }}
        onBack={() => router.back()}
      >
        结算记录
      </NavBar>
      {walletSettleList.length === 0 ? (
        <Result
          className="mt-20"
          status="info"
          title="暂无数据"
          description="没有找到你需要的数据"
        />
      ) : (
        <List header=" ">
          {walletSettleList.map((item) => (
            <List.Item
              key={item.orderId}
              extra={
                (item.afterValue >= item.beforeValue ? "+" : "-") +
                `${item.currencyValue}${item.currencyName}`
              }
              clickable
              arrowIcon={false}
              description={item.createTime}
            >
              {item.subject}
            </List.Item>
          ))}
        </List>
      )}
    </div>
  );
}
