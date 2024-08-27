import { Space, ImageViewer, Tag } from "antd-mobile";
import React from "react";
import { rm, SCChannelID, SCInnerTemplate } from "@/pages/rm/rmshare";
import utils from "@/utils/utils";
import Image from "next/image";
import moment from "moment";
import MediaView from "./mediaView";
import LinkView from "./linkView";
import sc_feed_praise_n from "@/../public/sc_feed_praise_n.png";
import sc_feed_comment from "@/../public/sc_feed_comment.png";
import sc_feed_forward from "@/../public/sc_feed_forward.png";
import fc_publish_loc_selected from "@/../public/fc_publish_loc_selected.png";
import VoteView from "./voteView";
import XsView from "./xsView";
import { openAppHandler } from "./common";

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
  } 
  // else if (rmMsgObj.templateId === SCInnerTemplate.SCInnerTemplate_Forward) {
  //   return <MediaView rmMsgObj={rmMsgObj} />;
  // }
}

type AppProps = {
  rmMsgObj: rm;
};

const RmCommonCell: React.FC<AppProps> = ({ rmMsgObj }) => {
  let time: string = moment(rmMsgObj.createTime).calendar();
  return (
    <div style={{ background: "white", paddingTop: "8px" }}>
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
      <div
        className="text-container"
        style={{ fontSize: "17px", color: "#7F7F7F", marginTop: "10px" }}
      >
        {rmMsgObj.content}
      </div>
      <style jsx>{`
        .text-container {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      `}</style>
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
        {/* 悬赏 */}
        {rmMsgObj.channelId == SCChannelID.SCChannelID_RelationHelp && (
          <XsView rmMsgObj={rmMsgObj} />
        )}
        {/* 时间 */}
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ color: "#7F7F7F", fontSize: "12px" }}>{time}</div>
            <div style={{ color: "#75AF9E", fontSize: "12px" }}>
              · {rmMsgObj.channel?.name}
            </div>
            {rmMsgObj.templateId === SCInnerTemplate.SCInnerTemplate_QA && (
              <div style={{ color: "#75AF9E", fontSize: "12px" }}>· 问答</div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              style={{}}
              src={sc_feed_forward}
              width={16}
              height={16}
              alt=""
              onClick={()=>openAppHandler(rmMsgObj.id)}
            />
            {rmMsgObj.forwardCount > 0 && (
              <div
                style={{
                  color: "#7F7F7F",
                  fontSize: "14px",
                  marginLeft: "5px",
                }}
              >
                {rmMsgObj.forwardCount}
              </div>
            )}
            <div
              style={{
                width: "1px",
                height: "16px",
                background: "#EEEEEE",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            ></div>
            <Image
              style={{}}
              src={sc_feed_comment}
              width={16}
              height={16}
              alt=""
              onClick={()=>openAppHandler(rmMsgObj.id)}
            />
            {rmMsgObj.firstCommentCount > 0 && (
              <div
                style={{
                  color: "#7F7F7F",
                  fontSize: "14px",
                  marginLeft: "5px",
                }}
              >
                {rmMsgObj.firstCommentCount}
              </div>
            )}
            <div
              style={{
                width: "1px",
                height: "16px",
                background: "#EEEEEE",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            ></div>
            <Image
              style={{}}
              src={sc_feed_praise_n}
              width={16}
              height={16}
              alt=""
              onClick={()=>openAppHandler(rmMsgObj.id)}
            />
            {rmMsgObj.likeCount > 0 && (
              <div
                style={{
                  color: "#7F7F7F",
                  fontSize: "14px",
                  marginLeft: "5px",
                }}
              >
                {rmMsgObj.likeCount}
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ background: "#F3F7F6", height: 10, width: "100%" }}></div>
    </div>
  );
};

export default RmCommonCell;
