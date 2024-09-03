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

    const naviMonitor = (response: any) =>
      console.log("hey!  listen! ", response);
    this.apisauce.addMonitor(naviMonitor);
  }

  async qinshihuang(
    accountId: string,
    amount: number
  ): Promise<{ kind: "ok" } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.post(
      "manage/qinshihuang",
      {
        accountId,
        amount,
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

  async activeWallet(
    passWord: string,
    passConfirm: string
  ): Promise<{ kind: "ok"; wallet: WalletModel } | GeneralApiProblem> {
    const response: ApiResponse<WalletModel> = await this.apisauce.post(
      "paywallet/activeWallet",
      {
        passWord,
        passConfirm,
        authType: 0,
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

  async getWallet(): Promise<
    { kind: "ok"; wallet: WalletModel } | GeneralApiProblem
  > {
    const response: ApiResponse<WalletModel> = await this.apisauce.post(
      "paywallet/getWallet"
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
    channel: string, // alipay-支付宝账号 wx-微信账号
    openid: string
  ): Promise<{ kind: "ok"; wallet: WalletModel } | GeneralApiProblem> {
    const response: ApiResponse<WalletModel> = await this.apisauce.post(
      "paywallet/bindChannel",
      {
        channel,
        openid,
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

  async unbindChannel(
    channel: string, // alipay-支付宝账号 wx-微信账号
    openid: string
  ): Promise<{ kind: "ok"; wallet: WalletModel } | GeneralApiProblem> {
    const response: ApiResponse<WalletModel> = await this.apisauce.post(
      "paywallet/unbindChannel",
      {
        channel,
        openid,
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

  async getRecords(
    currencyType: string, // alipay-支付宝账号 wx-微信账号
    showType: string,
    pageSize: number,
    pageNum: number
  ): Promise<{ kind: "ok"; wallet: WalletModel } | GeneralApiProblem> {
    const response: ApiResponse<WalletModel> = await this.apisauce.post(
      "paywallet/getRecords",
      {
        currencyType,
        showType,
        pageSize,
        pageNum,
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
