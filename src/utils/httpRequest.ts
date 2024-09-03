import { Toast } from "antd-mobile";
import axios from "axios";
import qs from "qs";
import * as config from "../utils/config";
import utils from "./utils";

/****** 创建axios实例 ******/
const service = axios.create({
  baseURL: config.enConfig.url, // api的base_url
  timeout: 500000, // 请求超时时间
});

/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(
  (config) => {
    console.log(config);
    if (config.url === "/file/upload") return config;
    config.method === "post"
      ? (config.data = qs.stringify({ ...config.data }))
      : (config.params = { ...config.params });
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";

    return config;
  },
  (error) => {
    //请求错误处理
    Promise.reject(error);
  }
);

/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  async (response) => {
    //成功请求到数据
    {
      const { data } = response;
      console.log("响应原始data");
      console.log(data);
    }
    let { data, code, msg } = response.data;
    let dataString = await handleCode(data, code, msg);
    // console.log(typeof dataString);
    // let endoce_dataString;
    // try {
    //     endoce_dataString = decodeURIComponent(dataString)
    // } catch (error) {
    //     endoce_dataString = dataString
    // }
    // response.data = JSON.parse(endoce_dataString.replace(/\n/g, "\\n").replace(/\r/g, "\\r")) //后端接口返回的数据换行采用了\r\n方式，使得json文本无法解析带换行符的内容

    response.data = utils.getObjectFromJson(dataString);
    console.log("最终响应");
    console.log(response);
    return response;
  },
  (error) => {
    //响应错误处理
    console.log("响应错误处理");
    console.log(error);
    return Promise.reject(error);
  }
);
function handleCode(data: { v: number; d: string }, code: string, msg: string) {
  const STATUS = {
    "200"() {
      if (data.v === 0) {
        return data.d;
      }
      return utils.unzip(data.d);
    },
    "-1"() {
      Toast.show(msg);
      return Promise.reject({ code, msg });
    },
    "400"() {
      Toast.show("请求错误");
      return Promise.reject({ code, msg: "请求错误" });
    },
    "401"() {
      Toast.show("未授权请求!");
      return Promise.reject({ code, msg: "未授权请求!" });
    },
    "403"() {
      Toast.show("拒绝请求");
      return Promise.reject({ code, msg: "拒绝请求" });
    },
    "500"() {
      Toast.show("服务器错误");
      return Promise.reject({ code, msg: "服务器错误" });
    },
  };

  type ObjectKey = keyof typeof STATUS;
  let codes = code as ObjectKey;
  return STATUS[codes] ? STATUS[codes]() : Promise.reject(data);
}

const getRmsgByH5 = (rmsgId: string) =>
  service.post("/rmsg/getRmsg", { rmsgId });
const getRecommendRmsgList = (
  existIds: string,
  category: number = 0,
  rows: number = 50
) => service.post("/rmsg/getRecommendRmsgList", { existIds, category, rows });

const getMobilePersonByH5 = (showAccountId: string) =>
  service.post("/account/getMobilePerson", { showAccountId });

const sendRegisterSafeCode = (mobile: string) =>
  service.post("/account/sendRegisterSafeCode", { mobile });
const confirmRegistorSafeCode = (mobile: string, code: string) =>
  service.post("/account/confirmRegistorSafeCode", { mobile, code });
const regMobile = (
  mobile: string,
  safeCode: string,
  password: string,
  name: string,
  logo: string,
  enterpriseCode: string,
  codeAid: string,
  codeHomeId: string
) =>
  service.post("/account/regMobile", {
    mobile,
    safeCode,
    password,
    name,
    logo,
    enterpriseCode,
    codeAid,
    codeHomeId,
    clientType: 2,
    clientVersion: "3006000",
    channelId: "N1002",
    oauthType: 0,
    batchId: "B1002",
  });

const login = (mobile: string, password: string, mobileId: string) => {
  return service.post("/account/login", {
    mobileOrEmail: mobile,
    password: utils.PWDMD5EncodedString(password),
    clientType: 2,
    clientVersion: "3006000",
    mobileId: mobileId,
  });
};

const createHome = (name: string, logo: string, des: string, apiCode: string) =>
  service.post("/home/createHome", {
    name,
    logo,
    des,
    privacy: 9,
    type: 0,
    noActiveFlag: 0,
    recommendFlag: 0,
    apiCode,
  });

const getEnterprise = (enterpriseId: string) =>
  service.post("/enterprise/getEnterprise", {
    enterpriseId,
  });

const getEnterpriseByCode = (enterpriseCode: string) =>
  service.post("/enterprise/getEnterpriseByCode", {
    enterpriseCode,
  });

const uploadImage = (file: File) => {
  const data: FormData = new FormData();
  data.append("file", file);
  data.append("uploadModule", "2");
  data.append("originalFlag", "1");
  data.append("uploadType", "1");
  data.append("clientType", "2");
  return service.post("/file/upload", data);
};

// const getMobilePerson = (showAccountId: number = 11893) => service.post('/account/getMobilePerson', { showAccountId });
// const getUserRmsgStat = (category: number = 0) => service.post('/rmsg/getUserRmsgStat', { category });

// // https://testapp.lianxi.com/rmsg/getUserRmsgStat?channelIds=0%2C2%2C3%2C9998%2C9999&clientType=2&clientVersion=3005002&lang=zh_CN&showAccountId=11893
// // https://testapp.lianxi.com/account/getMobilePerson?clientType=2&clientVersion=3005002&lang=zh_CN&showAccountId=11893
// // https://testapp.lianxi.com/rmsg/getPersonRmsgList?category=1&channelIds=9999&clientVersion=3005002&lang=zh_CN&showAccountId=11893&clientType=2&rows=20

// https://testapp.lianxi.com/rmsg/getPersonRmsgCountGroupByTemplate?clientType=2&clientVersion=3006000&lang=zh_CN&showAccountId=11893
// https://testapp.lianxi.com/account/getMobilePerson?clientType=2&clientVersion=3006000&lang=zh_CN&showAccountId=11893
// https://testapp.lianxi.com/rmsg/getPersonRmsgList?category=1&templateIds=5&clientVersion=3006000&lang=zh_CN&showAccountId=11893&clientType=2&rows=20
// https://testapp.lianxi.com/rmsg/getPersonRmsgList?category=1&templateIds=4&clientVersion=3006000&lang=zh_CN&showAccountId=11893&clientType=2&rows=20
// https://testapp.lianxi.com/rmsg/getPersonRmsgList?category=1&templateIds=2&clientVersion=3006000&lang=zh_CN&showAccountId=11893&clientType=2&rows=20
// https://testapp.lianxi.com/rmsg/getPersonRmsgList?category=1&templateIds=1&clientVersion=3006000&lang=zh_CN&showAccountId=11893&clientType=2&rows=20
// https://testapp.lianxi.com/rmsg/getPersonRmsgList?clientType=2&clientVersion=3006000&lang=zh_CN&rows=20&showAccountId=11893&category=1

// // https://testapp.lianxi.com/account/getRecommendPersonList?clientType=2&clientVersion=3005002&lang=zh_CN&type=-1&num=20
// // https://testapp.lianxi.com/relation/getFansList?clientType=2&clientVersion=3005002&lang=zh_CN&num=20&personId=11893
// // https://testapp.lianxi.com/relation/getFriendList?clientType=2&clientVersion=3005002&lang=zh_CN&personId=11893

const verifyRealName = (
  name: string,
  idCardNumber: string,
  idCardFront: string,
  idCardBack: string
) =>
  service.post("/paywallet/verifyRealName", {
    name,
  });

const httpRequest = {
  service,
  getRmsgByH5,
  getRecommendRmsgList,
  getMobilePersonByH5,
  sendRegisterSafeCode,
  confirmRegistorSafeCode,
  regMobile,
  uploadImage,
  createHome,
  login,
  getEnterprise,
  getEnterpriseByCode,
};
export default httpRequest;
