import React from "react";
import { rm } from "@/pages/rm/rmshare";
import TextView from "./textView";
import LinkView from "./linkView";

type AppProps = {
  rmMsgObj: rm;
};

const LinkText: React.FC<AppProps> = ({ rmMsgObj }) => {
  return (
    <div>
      <TextView textValue={rmMsgObj.content}></TextView>
      <LinkView rmMsgObj={rmMsgObj}></LinkView>
    </div>
  );
};

export default LinkText;
