import { Avatar, Button, Dialog, Footer, List, Space } from "antd-mobile";
import Image from "next/image";
import utils from "@/utils/utils";
import lx_logo from "@/../public/logo.png";
import lx_logo1 from "@/../public/sc_logo.png";
import * as config from "@/utils/config";
import { VscSync } from "react-icons/vsc";
import { EnterpriseInfo } from "@/pages/user/signup";
import { useContext, useEffect, useState } from "react";
import { max } from "lodash";
import { Context } from "@/common/context";

export function downLoadAppHandler() {
  if (utils.device.deviceIsIOS) {
    //ios
    let tipText;
    if (utils.device.isWeixin) {
      tipText = "即将离开微信，下载“友接接”";
      // tipText = "请用浏览器打开本页面下载“友接接”";
    } else {
      tipText = "即将离开浏览器，下载“友接接”";
    }
    Dialog.confirm({
      content: tipText,
      closeOnMaskClick: true,
      onConfirm: () => onConfirm_downLoad(),
    });
  } else {
    //android
    if (utils.device.isWeixin) {
      let tipText = "请用浏览器打开本页面下载“友接接”";
      Dialog.alert({
        content: tipText,
        closeOnMaskClick: true,
      });
    } else {
      let tipText = "即将离开浏览器，下载“友接接”";
      Dialog.confirm({
        content: tipText,
        closeOnMaskClick: true,
        onConfirm: () => onConfirm_downLoad(),
      });
    }
  }
}

function onConfirm_downLoad() {
  var device = utils.device;
  var urlSchema = device.deviceIsIOS
    ? config.iosDownloadUrl
    : config.androidDownloadUrl;
  //打开下载链接
  // window.location.href = urlSchema;
  window.location.href = "itms-apps://itunes.apple.com/app/id6474501857";
}

export function openAppHandler(rmsgId: number = 0) {
  console.log(rmsgId);
  if (utils.device.deviceIsIOS) {
    //ios
    let tipText;
    if (utils.device.isWeixin) {
      tipText = "即将离开微信，打开“友接接”";
    } else {
      tipText = "即将离开浏览器，打开“友接接”";
    }
    Dialog.confirm({
      content: tipText,
      closeOnMaskClick: true,
      onConfirm: () => onConfirm(rmsgId),
    });
  } else {
    //android
    if (utils.device.isWeixin) {
      let tipText = "请用浏览器打开本页面下载“友接接”";
      Dialog.alert({
        content: tipText,
        closeOnMaskClick: true,
      });
    } else {
      let tipText = "即将离开浏览器，打开“友接接”";
      Dialog.confirm({
        content: tipText,
        closeOnMaskClick: true,
        onConfirm: () => onConfirm(rmsgId),
      });
    }
  }
}

function onConfirm(rmsgId: number = 0) {
  console.log(rmsgId);
  const urlParams = new URL(window.location.href);
  // const rmsgId: string = urlParams.searchParams.get("rmsgId") || "";
  // const shareAid = urlParams.searchParams.get("shareAid") || "";
  let path = window.location.pathname;
  let searchObj = Object.fromEntries(urlParams.searchParams);
  if (rmsgId != 0) {
    searchObj["rmsgId"] = `${rmsgId}`;
  }
  let url: string = utils.createSchemaWithpath(searchObj, path) || "";
  alert(url);
  window.location.href = url;
}

export const HeaderComponent = (props: { title: string; logo: string }) => (
  <div>
    <List style={{ "--border-top": "0px", marginBottom: "10px" }}>
      <List.Item
        prefix={
          <Avatar
            src={utils.formatImgUrl(props.logo)}
            style={{
              "--border-radius": "25px",
              "--size": "50px",
              marginLeft: "-10px",
            }}
          />
        }
        description="邀请你来友接接"
        extra={
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              border: "1px solid rgba(32, 169, 174, 100)",
              borderRadius: "5px",
              padding: "3px",
              alignItems: "center",
              color: "rgba(16, 16, 16, 100)",
              fontSize: "14px",
            }}
            onClick={() => openAppHandler()}
          >
            <Image src={lx_logo} alt="" width="32" height="32"></Image>
            <div style={{ marginLeft: "5px", marginRight: "15px" }}>
              打开友接接
            </div>
          </div>
        }
      >
        {props.title}
      </List.Item>
    </List>
  </div>
);

export const CenterComponent = () => (
  <div
    style={{
      display: "flex",
      position: "fixed",
      flexDirection: "column",
      left: 0,
      bottom: 0,
      width: "100%",
      height: "100px",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(32, 169, 174, 100)",
        borderRadius: "23px",
        padding: "10px",
        color: "white",
        fontSize: "17px",
        width: "150px",
      }}
      onClick={() => openAppHandler()}
    >
      <Image src={lx_logo1} alt="" width="26" height="26"></Image>
      <div style={{ marginLeft: "5px" }}>APP内打开</div>
    </div>
  </div>
);

export const FootComponent = () => (
  <Footer
    // label="没有更多了"
    content={
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Image src={lx_logo} alt="" width="100" height="100"></Image>
        <div style={{}}>友接接</div>
        <div style={{ marginTop: "1px" }}>更好的沟通</div>
        <Button
          block
          style={{
            marginTop: "15px",
            marginBottom: "80px",
            "--background-color": "rgba(32, 169, 174, 100)",
            "--border-width": "0px",
            "--text-color": "white",
            "--border-radius": "20px",
          }}
          onClick={() => openAppHandler()}
        >
          打开
        </Button>
      </div>
    }
  ></Footer>
);

export const DownloadComponent = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      left: 0,
      bottom: 0,
      width: "100%",
      height: "100px",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(32, 169, 174, 100)",
        borderRadius: "23px",
        padding: "10px",
        color: "white",
        fontSize: "17px",
        width: "150px",
      }}
      onClick={() => downLoadAppHandler()}
    >
      <Image src={lx_logo} alt="" width="26" height="26"></Image>
      <div style={{ marginLeft: "5px" }}>APP下载</div>
    </div>
  </div>
);

type AppProps = {
  enterpriseInfo: EnterpriseInfo | null;
};

export const FootComponentNew: React.FC<AppProps> = ({ enterpriseInfo }) => {
  const [top, settop] = useState(500);
  const { state } = useContext(Context);

  useEffect(() => {
    const height = 250;
    const top = window.innerHeight - height;
    const res = max([top, state.minTopValue]) || 0;
    settop(res);
  }, [state.minTopValue]);

  return (
    <div
      style={{
        position: "absolute",
        top: top,
        alignSelf: "center",
        width: "90%",
      }}
    >
      <Footer
        label={enterpriseInfo ? enterpriseInfo.name : "友接接"}
        content={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Space style={{ "--gap": "30px" }} align="center">
              <Image src={lx_logo} alt="" width="80" height="80" />
              {enterpriseInfo ? <VscSync size={30} /> : null}
              {enterpriseInfo ? (
                <Image
                  src={utils.formatImgUrl(enterpriseInfo.logo)}
                  alt=""
                  width="70"
                  height="70"
                />
              ) : null}
            </Space>
            <Button
              block
              style={{
                marginTop: "15px",
                marginBottom: "20px",
                width: "120px",
                "--background-color": "rgba(32, 169, 174, 100)",
                "--border-width": "0px",
                "--text-color": "white",
                "--border-radius": "20px",
              }}
              onClick={() => downLoadAppHandler()}
            >
              APP下载
            </Button>
          </div>
        }
      ></Footer>
    </div>
  );
};
