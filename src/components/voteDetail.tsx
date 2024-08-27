import React from "react";
import { rm } from "@/pages/rm/rmshare";
import MediaView from "./mediaView";
import TextView from "./textView";
import VoteView from "./voteView";
type AppProps = {
  rmMsgObj: rm;
};

const VoteDetail: React.FC<AppProps> = ({ rmMsgObj }) => {
  return (
    <div>
      <TextView textValue={rmMsgObj.content} />
      <MediaView rmMsgObj={rmMsgObj}></MediaView>
      <VoteView
        voteItems={rmMsgObj.ext.voteItems}
        voteStat={rmMsgObj.voteStat}
      />
    </div>
  );
};

export default VoteDetail;
