import React, { useEffect, useState } from "react";

type AppProps = {
  voteItems: object;
  voteStat: object;
};

const VoteView: React.FC<AppProps> = ({ voteItems, voteStat }) => {
  //   voteStat = { 1: 18, 2: 8 };
  const [num, setNum] = useState<number>(1);
  useEffect(() => {
    let num: number = 0;
    Object.keys(voteItems).map((key, index) => {
      type ObjectKey = keyof typeof voteItems;
      const keys = key as ObjectKey;
      let value = voteStat ? voteStat[keys] : 0;
      num = num + value;
    });
    setNum(num);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ color: "#7F7F7F" }}>{num}人参与投票</div>
      {Object.keys(voteItems).map((key, index) => {
        type ObjectKey = keyof typeof voteItems;
        const keys = key as ObjectKey;
        let text = voteItems[keys];
        let nums = voteStat ? voteStat[keys] : 0;
        let textColor = nums > 0 ? "white" : "#5F5F5F";
        let textColorR = nums > 0 && nums == num ? "white" : "#5F5F5F";
        let borderTopRightRadius = nums == num ? "15px" : "0px";
        return (
          <div
            key={index}
            style={{
              background: "#EEEEEE",
              marginTop: "10px",
              height: "30px",
              display: "flex",
              position: "relative",
              borderRadius: "15px",
            }}
          >
            <div
              style={{
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
                borderTopRightRadius: borderTopRightRadius,
                borderBottomRightRadius: borderTopRightRadius,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#75AF9E",
                width: `${(nums / num) * 100}%`,
                // width:"2%",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                fontSize: "14px",
                left: "10px",
                top: "7px",
                color: textColor,
              }}
            >
              {text}
            </div>
            <div
              style={{
                position: "absolute",
                fontSize: "14px",
                right: "10px",
                top: "7px",
                color: textColorR,
              }}
            >
              {nums}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VoteView;
