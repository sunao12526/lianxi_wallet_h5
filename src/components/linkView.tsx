import { Tag } from "antd-mobile";
import React from "react";
import { rm } from "@/pages/rm/rmshare";
import utils from "@/utils/utils";
import Image from "next/image";

type AppProps = {
  rmMsgObj: rm;
};

const LinkView: React.FC<AppProps> = ({ rmMsgObj }) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <div
        style={{
          position:'relative',
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#EEEEEE",
          borderRadius: "5px",
          maxHeight: "66px",
        }}
        onClick={() => (window.location.href = rmMsgObj.article?.url || "")}
      >
        <Image
          src={utils.formatImgUrl(rmMsgObj.article?.image)}
          alt=""
          width="50"
          height="50"
          style={{ margin: "8px", borderRadius: "5px" }}
        />
        <div
          className="text-container"
          style={{ fontSize: "14px", color: "#7F7F7F", marginRight: "40px" }}
        >
          {rmMsgObj.article?.title}
        </div>
        <style jsx>{`
          .text-container {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        `}</style>
        {rmMsgObj.article?.sourceWeb && (
          <Tag
            color="#DDDDDD"
            style={{
              "--text-color": "#888888",
              position:'absolute',
              right:"5px",
              top:"5px",
            }}
          >
            {rmMsgObj.article?.sourceWeb}
          </Tag>
        )}
      </div>
    </div>
  );
};

export default LinkView;
