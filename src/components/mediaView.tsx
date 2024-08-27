import { Space, ImageViewer, TextAreaRef } from "antd-mobile";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { rm, media, LXMediaType } from "@/pages/rm/rmshare";
import utils from "@/utils/utils";
import Image from "next/image";
import Player from "griffith";
type AppProps = {
  rmMsgObj: rm;
};

const MediaView: React.FC<AppProps> = ({ rmMsgObj }) => {
  const [refwidth, setRefwidth] = useState(15);
  const textarea = useRef<TextAreaRef>(null);
  const divref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let st = textarea.current?.nativeElement?.style;
    st?.setProperty(`overflow`, `hidden`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (divref.current?.offsetWidth) {
      setRefwidth(divref.current.offsetWidth);
    }
  }, []);

  const getImages = (rmMsgObj: rm) =>
    rmMsgObj.medialist.map((media) => utils.formatImgUrl(media.filePath));

  return (
    <div style={{ marginTop: "10px" }} ref={divref}>
      {(() => {
        if (rmMsgObj.medialist.length == 0) {
          return null;
        } else {
          if (rmMsgObj.medialist.length == 1) {
            let media: media = rmMsgObj.medialist[0];
            let width: number = refwidth;
            let height: number = width;
            if (media.imageSize) {
              height =
                (width * parseInt(media.imageSize.split(",")[1])) /
                parseInt(media.imageSize.split(",")[0]);
            }
            if (media.fileType == LXMediaType.LXMediaTypeImage) {
              return (
                <Image
                  src={utils.formatImgUrl(rmMsgObj.medialist[0].filePath)}
                  style={{ borderRadius: "8px" }}
                  width={width}
                  height={height}
                  alt=""
                  onClick={() =>
                    ImageViewer.show({
                      image: utils.formatImgUrl(media.filePath),
                    })
                  }
                />
              );
            } else if (
              media.fileType == LXMediaType.LXMediaTypeLittleVideo ||
              media.fileType == LXMediaType.LXMediaTypeVideo
            ) {
              let sources = {
                hd: {
                  play_url: utils.formatImgUrl(media.filePath),
                  width: 300,
                  height: 150,
                },
              };
              let cover = utils.formatImgUrl(media.fileImagePath);
              return (
                <div style={{ width: `${width}px`, height: "200px" }}>
                  <Player id="" sources={sources} cover={cover} />
                </div>
              );
            }
          } else if (rmMsgObj.medialist.length > 1) {
            return (
              <Space
                wrap
                style={{ "--gap-horizontal": "5px", "--gap-vertical": "5px" }}
              >
                {rmMsgObj.medialist.map((media, index) => {
                  let width: number = (refwidth - 5 * 3) / 3;
                  width = Math.floor(width);
                  return (
                    <Image
                      src={utils.formatImgUrl(media.filePath)}
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                      width={width}
                      height={width}
                      alt=""
                      key={index}
                      onClick={() => {
                        ImageViewer.Multi.show({
                          images: getImages(rmMsgObj),
                          defaultIndex: index,
                        });
                      }}
                    />
                  );
                })}
              </Space>
            );
          }
        }
      })()}
    </div>
  );
};

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

export default MediaView;
