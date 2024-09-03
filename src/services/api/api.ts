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
}

// Singleton instance of the API for convenience
export const api = new Api();
