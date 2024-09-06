"use client";
import {
  Input,
  Toast,
  Button,
  NavBar,
  Form,
  ImageUploader,
  ImageUploadItem,
  Grid,
} from "antd-mobile";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import sc_pub_imag_ps_sfz_z from "@/../public/ps_sfz_z.png";
import sc_pub_imag_ps_sfz_f from "@/../public/ps_sfz_f.png";
import sc_pub_imag_sfz_z from "@/../public/sfz_z.png";
import sc_pub_imag_sfz_f from "@/../public/sfz_f.png";
import sc_pub_imag_sfz_close from "@/../public/sfz_close.png";
import { useStores } from "@/models";

export default observer(function Page() {
  const [imgFile, setimgFile] = useState<string>("");
  const [file, setfile] = useState<File>();
  const [imgFilef, setimgFilef] = useState<string>("");
  const [filef, setfilef] = useState<File>();
  const router = useRouter();
  const {
    walletStore: { fetch_verifyRealName },
  } = useStores();

  const onSubmit = async ({ name, num }: { name: string; num: string }) => {
    const res = await fetch_verifyRealName(name, num, file, filef);
    if (res) {
      router.back();
    }
  };

  const mockUpload = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setimgFile(reader.result as string);
      setfile(file);
    };
    const imageItem: ImageUploadItem = {
      key: "",
      url: "",
    };
    return imageItem;
  };

  const mockUploadf = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setimgFilef(reader.result as string);
      setfilef(file);
    };
    const imageItem: ImageUploadItem = {
      key: "",
      url: "",
    };
    return imageItem;
  };
  const beforeUpload = (file: File) => {
    if (file.size > 1024 * 1024 * 10) {
      Toast.show("请选择小于 10M 的图片");
      return null;
    }
    return file;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#F7F7F7",
        height: "100vh",
      }}
    >
      <NavBar
        style={{ background: "white", height: 64 }}
        onBack={() => router.back()}
      >
        实名认证
      </NavBar>

      <Form
        layout="horizontal"
        onFinish={onSubmit}
        footer={
          <div>
            <Button
              block
              type="submit"
              color="primary"
              size="large"
              style={{ marginTop: 50 }}
            >
              提交
            </Button>
          </div>
        }
      >
        <Form.Header>请填写此聊账户本人的身份证信息</Form.Header>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: "姓名不能为空" }]}
        >
          <Input
            onChange={console.log}
            placeholder="请输入本人姓名"
            clearable
          />
        </Form.Item>
        <Form.Item
          name="num"
          label="证件号"
          rules={[{ required: true, message: "证件号不能为空" }]}
        >
          <Input
            onChange={console.log}
            placeholder="请输入身份证号"
            clearable
          />
        </Form.Item>
        <Form.Header>请拍摄你的身份证</Form.Header>
        <Form.Item>
          <Grid columns={2} gap={10}>
            <Grid.Item>
              <div className="flex items-center justify-center overflow-hidden">
                <ImageUploader
                  beforeUpload={beforeUpload}
                  upload={mockUpload}
                  renderItem={() => null}
                >
                  <div style={{ width: 160, height: 100 }}>
                    <Image
                      src={imgFile.length > 0 ? imgFile : sc_pub_imag_ps_sfz_z}
                      alt={""}
                      width={160}
                      height={100}
                    />
                    <Image
                      onClick={() => {
                        setimgFile("");
                        setfile(undefined);
                      }}
                      style={{
                        visibility: imgFile.length > 0 ? "visible" : "hidden",
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 1,
                      }}
                      src={sc_pub_imag_sfz_close}
                      alt={""}
                      width={21}
                      height={21}
                    />
                  </div>
                </ImageUploader>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className="flex items-center justify-center">
                <Image
                  src={sc_pub_imag_sfz_z}
                  alt={""}
                  width={160}
                  height={100}
                />
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className="flex items-center justify-center overflow-hidden">
                <ImageUploader
                  beforeUpload={beforeUpload}
                  upload={mockUploadf}
                  renderItem={() => null}
                >
                  <div style={{ width: 160, height: 100 }}>
                    <Image
                      src={
                        imgFilef.length > 0 ? imgFilef : sc_pub_imag_ps_sfz_f
                      }
                      alt={""}
                      width={160}
                      height={100}
                    />
                    <Image
                      onClick={() => {
                        setimgFilef("");
                        setfilef(undefined);
                      }}
                      style={{
                        visibility: imgFilef.length > 0 ? "visible" : "hidden",
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 1,
                      }}
                      src={sc_pub_imag_sfz_close}
                      alt={""}
                      width={21}
                      height={21}
                    />
                  </div>
                </ImageUploader>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className="flex items-center justify-center">
                <Image
                  src={sc_pub_imag_sfz_f}
                  alt={""}
                  width={160}
                  height={100}
                />
              </div>
            </Grid.Item>
          </Grid>
        </Form.Item>

        <Form.Header>以上信息仅供此次证明，将严格保密</Form.Header>
        <Form.Item hidden></Form.Item>
      </Form>
    </div>
  );
});
