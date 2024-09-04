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
    realityStatus: types.optional(types.number, 0),
    realityInfo: types.optional(types.string, ""),
    balance: types.optional(types.number, 0),
    cash: types.optional(types.number, 0),
    authType: types.optional(types.number, 0),
    passWord: types.optional(types.string, ""),
    status: types.optional(types.number, 0),
    alipayId: types.optional(types.string, ""),
    wechatId: types.optional(types.string, ""),
    chargeNum: types.optional(types.number, 0),
    chargeAmount: types.optional(types.number, 0),
    consumeNum: types.optional(types.number, 0),
    consumeAmount: types.optional(types.number, 0),
    incomeNum: types.optional(types.number, 0),
    incomeAmount: types.optional(types.number, 0),
    transferNum: types.optional(types.number, 0),
    transferAmount: types.optional(types.number, 0),

    chargeDayNum: types.optional(types.number, 0),
    lastChargeDate: types.optional(types.string, ""),
    transferDayNum: types.optional(types.number, 0),
    lastTransferDate: types.optional(types.string, ""),
    transferWeekValue: types.optional(types.number, 0),
    currWeekNum: types.optional(types.string, ""),
    createTime: types.optional(types.string, ""),
    updateTime: types.optional(types.string, ""),
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
