import { TextArea, TextAreaRef } from "antd-mobile";
import React, { useEffect, useRef } from "react";

type AppProps = {
  textValue: string | undefined;
};

const TextView: React.FC<AppProps> = ({ textValue }) => {
  // textValue = "何为容器运行时. 容器运行时顾名思义就是要掌控容容容时顾名思义就是要掌控容容容"
  const textarea = useRef<TextAreaRef>(null);
  useEffect(() => {
    let st = textarea.current?.nativeElement?.style;
    st?.setProperty(`overflow`, `hidden`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ paddingTop: "10px" }}>
      {(() => {
        if (textValue) {
          if (textValue.length > 40) {
            return (
              <div>
                <TextArea
                  ref={textarea}
                  defaultValue={textValue}
                  autoSize
                  showCount
                  readOnly
                ></TextArea>
              </div>
            );
          } else {
            return <div style={{ fontSize: "17px" }}>{textValue}</div>;
          }
        }
      })()}
    </div>
  );
};

export default TextView;
