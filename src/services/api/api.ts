/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce";
import axios from "axios";
import Config from "../../config";
import type { ApiConfig } from "./api.types";
import { _rootStore, WalletStoreModel } from "@/models";
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem";
import { WalletModel } from "@/models/Wallet";
import qs from "qs";
import { Toast } from "antd-mobile";
import utils from "@/utils/utils";
import { WalletRecord } from "@/models/WalletRecord";

// import setupMocks from "./mock"
// 设置Mock方法
// setupMocks()

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
};

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance;
  config: ApiConfig;
  hasapicode: boolean = false;
  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
    // const naviMonitor = (response: any) =>
    //   console.log("hey!  listen! ", response);
    // this.apisauce.addMonitor(naviMonitor);

    this.apisauce.addAsyncResponseTransform(async (response) => {
      //成功请求到数据
      {
        const { data } = response;
        console.log("响应原始data");
        console.log(data);
      }
      let { data, code, msg } = response.data;
      let dataString = await this.handleCode(data, code, msg);
      response.data = utils.getObjectFromJson(dataString);
      console.log("最终响应");
      console.log(response.data);
    });
  }

  setApicode(apiCode: string) {
    console.log("setApicode");
    if (!this.hasapicode) {
      this.hasapicode = true;
      console.log("setApicode111");
      this.apisauce.addAsyncRequestTransform(async (request) => {
        console.log(request.data);
        //判断request.data是string
        if (typeof request.data === "string") {
          return;
        }
        console.log("2222");
        if (request.data) {
          request.data.apiCode = apiCode;
        } else {
          request.data = { apiCode };
        }
        request.data = qs.stringify({ ...request.data });
        if (request.headers)
          request.headers["Content-Type"] = "application/x-www-form-urlencoded";
        console.log(request);
      });
    }
  }

  handleCode(data: { v: number; d: string }, code: string, msg: string) {
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

  async login(
    mobile: string,
    password: string
  ): Promise<{ kind: "ok" } | GeneralApiProblem> {
    const mobileId: string = await utils.mobileId();
    const response: ApiResponse<any> = await this.apisauce.post(
      "/account/login",
      {
        mobileOrEmail: mobile,
        password: utils.PWDMD5EncodedString(password),
        clientType: 2,
        clientVersion: "1000006",
        mobileId,
      }
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const rawData = response.data;
    if (rawData) {
      return { kind: "ok", ...rawData };
    } else return { kind: "bad-data" };
  }

  async qinshihuang(
    accountId: number,
    amount: number
  ): Promise<{ kind: "ok"; wallet: WalletModel } | GeneralApiProblem> {
    const response: ApiResponse<{ wallet: WalletModel }> =
      await this.apisauce.post("manage/qinshihuang", {
        accountId,
        amount,
      });
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const rawData = response.data;
    if (rawData) {
      const wallet: WalletModel = rawData.wallet;
      return { kind: "ok", wallet };
    } else return { kind: "bad-data" };
  }

  async activeWallet(
    passWord: string,
    passConfirm: string
  ): Promise<{ kind: "ok"; wallet: WalletModel } | GeneralApiProblem> {
    const response: ApiResponse<{ wallet: WalletModel }> =
      await this.apisauce.post("paywallet/activeWallet", {
        passWord,
        passConfirm,
        authType: 0,
      });
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const rawData = response.data;
    if (rawData) {
      const wallet: WalletModel = rawData.wallet;
      return { kind: "ok", wallet };
    } else return { kind: "bad-data" };
  }

  async getWallet(): Promise<
    { kind: "ok"; wallet: WalletModel } | GeneralApiProblem
  > {
    const response: ApiResponse<{ wallet: WalletModel }> =
      await this.apisauce.post("paywallet/getWallet");
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const rawData = response.data;
    if (rawData) {
      const wallet: WalletModel = rawData.wallet;
      return { kind: "ok", wallet };
    } else return { kind: "bad-data" };
  }

  async authPassWord(
    authPassWord: string
  ): Promise<{ kind: "ok" } | GeneralApiProblem> {
    const response: ApiResponse<void> = await this.apisauce.post(
      "paywallet/authPassWord",
      {
        authPassWord,
      }
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    return { kind: "ok" };
  }

  async setPassWord(
    passWord: string,
    passConfirm: string
  ): Promise<{ kind: "ok" } | GeneralApiProblem> {
    const response: ApiResponse<void> = await this.apisauce.post(
      "paywallet/setPassWord",
      {
        passWord,
        passConfirm,
      }
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    return { kind: "ok" };
  }

  async sendSMSCode(
    passWord: string,
    passConfirm: string
  ): Promise<{ kind: "ok"; code: string } | GeneralApiProblem> {
    const response: ApiResponse<{ code: string }> = await this.apisauce.post(
      "paywallet/sendSMSCode",
      {
        passWord,
        passConfirm,
      }
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const rawData = response.data;
    if (rawData) {
      return { kind: "ok", code: rawData.code };
    } else return { kind: "bad-data" };
  }

  async authSMSCode(code: string): Promise<{ kind: "ok" } | GeneralApiProblem> {
    const response: ApiResponse<void> = await this.apisauce.post(
      "paywallet/authSMSCode",
      {
        code,
      }
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    return { kind: "ok" };
  }

  async bindChannel(
    channel: "alipay" | "wx",
    openid: string
  ): Promise<{ kind: "ok"; wallet: WalletModel } | GeneralApiProblem> {
    const response: ApiResponse<{ wallet: WalletModel }> =
      await this.apisauce.post("paywallet/bindChannel", {
        channel,
        openid,
      });
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const rawData = response.data;
    if (rawData) {
      const wallet: WalletModel = rawData.wallet;
      return { kind: "ok", wallet };
    } else return { kind: "bad-data" };
  }

  async unbindChannel(
    channel: "alipay" | "wx",
    openid: string
  ): Promise<{ kind: "ok"; wallet: WalletModel } | GeneralApiProblem> {
    const response: ApiResponse<{ wallet: WalletModel }> =
      await this.apisauce.post("paywallet/unbindChannel", {
        channel,
        openid,
      });
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const rawData = response.data;
    if (rawData) {
      const wallet: WalletModel = rawData.wallet;
      return { kind: "ok", wallet };
    } else return { kind: "bad-data" };
  }

  async getRecords(
    showType: 0 | 1 | 2 = 1,
    pageNum: number = 1,
    pageSize: number = 100
  ): Promise<{ kind: "ok"; records: WalletRecord[] } | GeneralApiProblem> {
    const response: ApiResponse<{ records: WalletRecord[] }> =
      await this.apisauce.post("paywallet/getRecords", {
        currencyType: 2,
        showType,
        pageSize,
        pageNum,
      });
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    const rawData = response.data?.records;
    if (rawData) {
      // This is where we transform the data into the shape we expect for our MST model.
      const records: WalletRecord[] =
        rawData?.map((raw: any) => ({
          ...raw,
        })) ?? [];
      return { kind: "ok", records };
    } else return { kind: "bad-data" };
  }

  async verifyRealName(
    name: string,
    idCardNumber: string,
    idCardFront: string,
    idCardBack: string
  ): Promise<{ kind: "ok" } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.post(
      "paywallet/verifyRealName",
      {
        name,
        idCardNumber,
        idCardFront,
        idCardBack,
      }
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const rawData = response.data;
    if (rawData) {
      return { kind: "ok", ...rawData };
    } else return { kind: "bad-data" };
  }

  async queryCharge(
    orderId: string
  ): Promise<{ kind: "ok"; wallet: WalletModel } | GeneralApiProblem> {
    const response: ApiResponse<WalletModel> = await this.apisauce.post(
      "payment/queryCharge",
      {
        orderId,
      }
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const rawData = response.data;
    if (rawData) {
      const wallet: WalletModel = { ...rawData };
      return { kind: "ok", wallet };
    } else return { kind: "bad-data" };
  }

  async createTransfer(
    channel: string,
    amount: string,
    passWord: string
  ): Promise<{ kind: "ok"; wallet: WalletModel } | GeneralApiProblem> {
    const response: ApiResponse<WalletModel> = await this.apisauce.post(
      "payment/createTransfer",
      {
        channel,
        amount,
        passWord,
      }
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const rawData = response.data;
    if (rawData) {
      const wallet: WalletModel = { ...rawData };
      return { kind: "ok", wallet };
    } else return { kind: "bad-data" };
  }

  async createCharge(
    channel: string,
    amount: string,
    clientIp: string,
    deviceType: string,
    mark: string
  ): Promise<{ kind: "ok"; wallet: WalletModel } | GeneralApiProblem> {
    const response: ApiResponse<WalletModel> = await this.apisauce.post(
      "payment/createCharge",
      {
        channel,
        amount,
        clientIp,
        deviceType,
        mark,
      }
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const rawData = response.data;
    if (rawData) {
      const wallet: WalletModel = { ...rawData };
      return { kind: "ok", wallet };
    } else return { kind: "bad-data" };
  }
}

// Singleton instance of the API for convenience
export const api = new Api();
