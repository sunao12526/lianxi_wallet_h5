import { Toast } from "antd-mobile";
import router from "next/router";

export function common(state: any, action: { type: any; payload: any }) {
  switch (action.type) {
    case "getfooterTop":
      return { ...state, minTopValue: action.payload };
    case "regMobileSuccess":
      router.push({
        pathname: "/user/regMobileSuccess",
      });
      return { ...state, regMobileSuccess: true, ...action.payload };
    case "regMobileFail":
      router.push({
        pathname: "/user/regMobileSuccess",
      });
      return { ...state, regMobileSuccess: false };
    case "loginSuccess":
      return { ...state, ...action.payload };
    case "createHomeSuccess":
      router.push({
        pathname: "/user/createHomeResult",
      });
      return { ...state, createHomeSuccess: true, ...action.payload };
    case "createHomeFail":
      router.push({
        pathname: "/user/createHomeResult",
      });
      return { ...state, createHomeSuccess: false };
    default:
      return state;
  }
}
