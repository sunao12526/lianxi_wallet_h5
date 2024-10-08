"use client";
import { NavBar, List, Result } from "antd-mobile";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useStores } from "@/models";

export default observer(function Page() {
  const router = useRouter();
  const {
    walletStore: { fetch_getRecords, walletRecordList },
  } = useStores();
  useEffect(() => {
    fetch_getRecords();
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
        交易记录
      </NavBar>

      {walletRecordList.length === 0 ? (
        <Result
          className="mt-20"
          status="info"
          title="暂无数据"
          description="没有找到你需要的数据"
        />
      ) : (
        <List header=" ">
          {walletRecordList.map((item) => (
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
});
