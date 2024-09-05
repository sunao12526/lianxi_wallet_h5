import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  getSnapshot,
  types,
} from "mobx-state-tree";
import { Toast } from "antd-mobile";
import { api } from "@/services/api";
import { withSetPropAction } from "./helpers/withSetPropAction";
import { WalletRecord } from "./WalletRecord";
import { WalletModel } from "./Wallet";
/**
 * Model description here for TypeScript hints.
 */
export const WalletStoreModel = types
  .model("WalletStore")
  .props({
    wallet: types.optional(WalletModel, {}),
    apiCode: types.optional(types.string, ""),
    // 充值记录
    walletRecordList: types.array(WalletRecord),
    // 结算记录
    walletSettleList: types.array(WalletRecord),
    // 是否同意充值协议
    isAgreeCharge: types.optional(types.boolean, false),
    // 支付方式
    payType: types.optional(
      // types.enumeration(["支付宝", "微信",]),
      types.union(types.literal("支付宝"), types.literal("微信")),
      "支付宝"
    ),
    // 充值弹窗是否显示
    visibleCharge: types.optional(types.boolean, false),

    items: types.optional(types.array(types.string), [
      "1",
      "6",
      "30",
      "98",
      "298",
      "518",
    ]),
    currentItem: types.optional(
      types.enumeration(["1", "6", "30", "98", "298", "518"]),
      "1"
    ),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get currttenYue() {
      return self.wallet.cash;
    },
    get isActivity() {
      return self.wallet.status === 1;
    },
    get isBindAlipay() {
      return self.wallet.alipayId !== "";
    },
  }))
  .actions((self) => ({
    // 支付方式
    setPayType(payType: typeof self.payType) {
      self.payType = payType;
    },
    // 确认充值
    confirmCharge() {
      if (!self.isAgreeCharge) {
        return Toast.show("请阅读并同意用户充值协议");
      } else {
        this.setVisibleCharge(true);
      }
    },
    setAgreeCharge() {
      self.isAgreeCharge = !self.isAgreeCharge;
    },
    setCurrentItem(item: string) {
      self.currentItem = item;
    },
    setVisibleCharge(visible: boolean) {
      self.visibleCharge = visible;
    },
    setIsApiCode(apiCode: string) {
      self.apiCode = apiCode;
    },
  }))
  .actions((self) => ({
    async fetch_login() {
      const response = await api.login("18610239072", "1234567811");
    },
    async fetch_getWallet() {
      const response = await api.getWallet();
      if (response.kind === "ok") {
        self.setProp("wallet", response.wallet);
      }
    },
    async fetch_activate(passWord: string, passConfirm: string) {
      const response = await api.activeWallet(passWord, passConfirm);
      if (response.kind === "ok") {
        self.setProp("wallet", response.wallet);
      }
    },
    async fetch_verifyRealName(
      name: string,
      idCardNumber: string,
      idCardFront: string,
      idCardBack: string
    ) {
      api.verifyRealName(name, idCardNumber, idCardFront, idCardBack);
    },
    async fetch_qinshihuang(amount: number) {
      const response = await api.qinshihuang(self.wallet.accountId, amount);
      if (response.kind === "ok") {
        self.setProp("wallet", response.wallet);
        Toast.show("充值成功");
      } else {
        Toast.show("充值失败");
      }
    },
    async fetch_queryCharge(orderId: string) {
      const response = await api.queryCharge(orderId);
      if (response.kind === "ok") {
      } else {
      }
    },
    async fetch_getRecords(showType: 1 | 2 = 1) {
      const response = await api.getRecords(showType);
      if (response.kind === "ok") {
        if (showType === 1) {
          self.setProp("walletRecordList", response.records);
        } else {
          self.setProp("walletSettleList", response.records);
        }
      }
    },
    async fetch_bindBankCard(channel: "alipay" | "wx", openid: string) {
      const response = await api.bindChannel(channel, openid);
      if (response.kind === "ok") {
        self.setProp("wallet", response.wallet);
        Toast.show("绑定成功");
      } else {
        Toast.show("绑定失败");
      }
    },
    async fetch_unbindChannel(channel: "alipay" | "wx", openid: string) {
      const response = await api.unbindChannel(channel, openid);
      if (response.kind === "ok") {
        self.setProp("wallet", response.wallet);
        Toast.show("解除绑定成功");
      } else {
        Toast.show("解除绑定失败");
      }
    },
  }));
