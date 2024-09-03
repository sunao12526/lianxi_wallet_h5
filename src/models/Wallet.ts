import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";

/**
 * Model description here for TypeScript hints.
 */

export const WalletModel = types
  .model("Wallet")
  .props({
    accountId: types.optional(types.number, 0),
    mobile: types.optional(types.string, ""),
    realityStatus: types.optional(types.string, ""),
    realityInfo: types.optional(types.number, 0),
    balance: types.optional(types.number, 0),
    cash: types.optional(types.number, 0),
    authType: types.optional(types.number, 0),
    passWord: types.optional(types.number, 0),
    status: types.optional(types.string, ""),
    alipayId: types.optional(types.string, ""),
    wechatId: types.optional(types.string, ""),
    chargeNum: types.optional(types.string, ""),
    chargeAmount: types.optional(types.string, ""),
    consumeNum: types.optional(types.string, ""),
    consumeAmount: types.optional(types.string, ""),
    incomeNum: types.optional(types.string, ""),
    incomeAmount: types.optional(types.string, ""),
    transferNum: types.optional(types.string, ""),
    transferAmount: types.optional(types.string, ""),

    chargeDayNum: types.optional(types.string, ""),
    lastChargeDate: types.optional(types.number, 1),
    transferDayNum: types.optional(types.string, ""),
    lastTransferDate: types.optional(types.number, 0),
    transferWeekValue: types.optional(types.number, 0),
    currWeekNum: types.optional(types.number, 0),
    createTime: types.optional(types.number, 0),
    updateTime: types.optional(types.number, 0),
  })
  .actions(withSetPropAction)

  .views((self) => ({}))
  .actions((self) => ({}));

export interface WalletModel extends Instance<typeof WalletModel> {}
export interface WalletModelSnapshotOut
  extends SnapshotOut<typeof WalletModel> {}
export interface WalletModelSnapshotIn extends SnapshotIn<typeof WalletModel> {}
export const createWalletModelDefaultModel = () =>
  types.optional(WalletModel, {});
