import { Space, Tag } from "antd-mobile";
import React from "react";
import Image from "next/image";
import {
  rewardDesc,
  rewardIcon,
  rm,
  SCFeedRewardType,
} from "@/pages/rm/rmshare";
import link from "@/../public/link.png";
import sc_feed_reward_quote from "@/../public/sc_feed_reward_quote.png";

type AppProps = {
  rmMsgObj: rm;
};


export function xs_reasonView(rmMsgObj: rm) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          border: "dashed #75AF9E",
          padding: "8px",
          position: "relative",
        }}
      >
        <Image
          src={sc_feed_reward_quote}
          width={25}
          height={25}
          alt={""}
          style={{ position: "absolute", left: "-16px", top: "-13px" }}
        />
        <div style={{ fontSize: "17px", textAlign: "center" }}>
          {rmMsgObj.status == 1 ? "事件遗憾中止" : "事件圆满完结"}
        </div>
        <div
          style={{
            color: "#7F7F7F",
            fontSize: "14px",
            width: "180px",
            wordBreak: "break-word",
            lineHeight: "18px",
          }}
        >
          {rmMsgObj.ext.reason}
        </div>
      </div>
    </div>
  );
}


const XsView: React.FC<AppProps> = ({ rmMsgObj }) => {
  return (
    <div>
      <Space direction="vertical" style={{ "--gap": "10px", marginTop: "5px" }}>
        {rmMsgObj.ext.article && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image src={link} width={15} height={15} alt={""} />
            <div
              style={{ color: "#3AA8E1", fontSize: "14px", marginLeft: "5px" }}
            >
              {rmMsgObj.ext.article?.title || rmMsgObj.ext.article?.url}
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Tag color="#75AF9E" style={{ "--text-color": "white" }}>
            求助悬赏
          </Tag>
          {rmMsgObj.status === 0 &&
            rmMsgObj.ext.rewardType != SCFeedRewardType.SCFeedReward_None && (
              <Image
                src={rewardIcon(rmMsgObj.ext.rewardType)}
                width={17}
                height={17}
                alt={""}
                style={{ marginLeft: "10px" }}
              />
            )}
          {rmMsgObj.status === 0 &&
            rmMsgObj.ext.rewardType != SCFeedRewardType.SCFeedReward_None && (
              <div
                style={{
                  color: "#F26565",
                  fontSize: "12px",
                  marginLeft: "10px",
                }}
              >
                {rewardDesc(rmMsgObj.ext.rewardType)}
              </div>
            )}
          {rmMsgObj.status === 1 && (
            <div
              style={{ color: "#ACACAC", fontSize: "12px", marginLeft: "10px" }}
            >
              遗憾中止
            </div>
          )}
          {rmMsgObj.status === 2 && (
            <div
              style={{ color: "#E86F00", fontSize: "12px", marginLeft: "10px" }}
            >
              圆满完结
            </div>
          )}
        </div>
      </Space>
    </div>
  );
};

export default XsView;