import React from "react";
import { rm } from "@/pages/rm/rmshare";
import TextView from "./textView";
import MediaView from "./mediaView";
type AppProps = {
  rmMsgObj: rm;
};

const ImageTextDetail: React.FC<AppProps> = ({ rmMsgObj }) => {
  return (
    <div>
      <TextView textValue={rmMsgObj.content} />
      <MediaView rmMsgObj={rmMsgObj}></MediaView>
    </div>
  );
};

export default ImageTextDetail;
