"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/models";
import { api } from "@/services/api";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "友接接",
//   description: "友接接",
// };

/**
 * 设置 WebViewJavascriptBridge 桥接
 */
function setupWebViewJavascriptBridge(callback: any) {
  if ((window as any).WebViewJavascriptBridge) {
    return callback((window as any).WebViewJavascriptBridge);
  }
  if ((window as any).WVJBCallbacks) {
    return (window as any).WVJBCallbacks.push(callback);
  }
  (window as any).WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement("iframe");
  WVJBIframe.style.display = "none";
  WVJBIframe.src = "https://__bridge_loaded__";
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}

export default observer(function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    walletStore: { apiCode, setIsApiCode },
  } = useStores();
  useEffect(() => {
    console.log("start");
    setIsApiCode("Y9igFx7miVkOVyhisd0bbuRZFq4GcvWW");
    api.setApicode("Y9igFx7miVkOVyhisd0bbuRZFq4GcvWW");
    // 调用原生方法
    setupWebViewJavascriptBridge(function (bridge: any) {
      // bridge.registerHandler("JS Echo", function (data, responseCallback) {
      //   console.log("JS Echo called with:", data);
      //   responseCallback(data);
      // });
      bridge.callHandler(
        "ObjC_method_getaApiCode",
        null,
        function responseCallback(responseData: { apiCode: string }) {
          console.log(responseData.apiCode);
          // 请求拦截器
          console.log("1111");
          setIsApiCode(responseData.apiCode);
          api.setApicode(responseData.apiCode);
        }
      );
    });
  }, [setIsApiCode]);
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
});
