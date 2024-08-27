import { Space, ImageViewer, Tag, Steps } from "antd-mobile";
import React from "react";
import { rm, SCInnerTemplate } from "@/pages/rm/rmshare";
import utils from "@/utils/utils";
import Image from "next/image";
import moment from "moment";
import MediaView from "./mediaView";
import LinkView from "./linkView";
import fc_publish_loc_selected from "@/../public/fc_publish_loc_selected.png";
import VoteView from "./voteView";
import { Step } from "antd-mobile/es/components/steps/step";
import TextView from "./textView";

function contentView(rmMsgObj: rm) {
  if (rmMsgObj.templateId === SCInnerTemplate.SCInnerTemplate_Image) {
    return <MediaView rmMsgObj={rmMsgObj}></MediaView>;
  } else if (rmMsgObj.templateId === SCInnerTemplate.SCInnerTemplate_URL) {
    return <LinkView rmMsgObj={rmMsgObj}></LinkView>;
  } else if (rmMsgObj.templateId === SCInnerTemplate.SCInnerTemplate_Vote) {
    return (
      <div>
        <MediaView rmMsgObj={rmMsgObj}></MediaView>
        <VoteView
          voteItems={rmMsgObj.ext.voteItems}
          voteStat={rmMsgObj.voteStat}
        />
      </div>
    );
  } else if (rmMsgObj.templateId === SCInnerTemplate.SCInnerTemplate_QA) {
    return <MediaView rmMsgObj={rmMsgObj} />;
  } else if (rmMsgObj.templateId === SCInnerTemplate.SCInnerTemplate_Forward) {
    return <MediaView rmMsgObj={rmMsgObj} />;
  }
}

function RmCommonCell(rmMsgObj: rm) {
  let time: string = moment(rmMsgObj.createTime).calendar();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", background: "white" }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Image
          style={{ borderRadius: "25px" }}
          src={utils.formatImgUrl(rmMsgObj.sender.logo)}
          width={40}
          height={40}
          alt=""
          onClick={() =>
            ImageViewer.show({
              image: utils.formatImgUrl(rmMsgObj.sender.logo),
            })
          }
        />
        <div style={{ fontSize: "16px", marginLeft: "10px", color: "#75AF9E" }}>
          {rmMsgObj.sender.nickname}
        </div>
      </div>
      <div style={{ color: "var(--adm-color-text)" }}>
        <TextView textValue={rmMsgObj.content}></TextView>
      </div>
      {contentView(rmMsgObj)}
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        {/* 地址 */}
        {rmMsgObj.address && rmMsgObj.address.length > 0 && (
          <Space style={{ marginLeft: "5px", marginTop: "5px" }}>
            <Image
              src={fc_publish_loc_selected}
              width={15}
              height={16}
              alt={""}
            />
            <div style={{ color: "#669BD2", fontSize: "14px" }}>
              {rmMsgObj.address}
            </div>
          </Space>
        )}
        {/* 时间 */}
        <div style={{ color: "#7F7F7F", fontSize: "12px", marginTop: "10px" }}>
          {time}
        </div>
      </div>
    </div>
  );
}

type AppProps = {
  rmMsgObj: rm;
};

const ForwardView: React.FC<AppProps> = ({ rmMsgObj }) => {
  let time: string = moment(rmMsgObj.createTime).calendar();
  return (
    <div style={{ background: "white", paddingTop: "8px" }}>
      <Steps direction="vertical">
        <Step title={RmCommonCell(rmMsgObj)} status="process" />
        {rmMsgObj.forwardRmsgList.map((item, index) => {
          return (
            <Step key={index} title={RmCommonCell(item)} status="process" />
          );
        })}
        <Step title={RmCommonCell(rmMsgObj.sourceRmsg)} status="process" />
      </Steps>
      <div style={{ background: "#F3F7F6", height: 10, width: "100%" }}></div>
    </div>
  );
};

export default ForwardView;
