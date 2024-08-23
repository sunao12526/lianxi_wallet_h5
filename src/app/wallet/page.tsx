"use client";
import { Input, Toast, Button } from "antd-mobile";
export default function Page() {
  return (
    <div style={{ height: "100vh" }}>
      <h1>Home1</h1>
      <Button
        // onClick={onSubmit}
        size="middle"
        style={{
          "--background-color": "#76AF9E",
          "--text-color": "white",
          marginTop: 60,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        注册
      </Button>
    </div>
  );
}
