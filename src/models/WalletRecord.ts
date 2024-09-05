import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";

/**
 * Model description here for TypeScript hints.
 */

export const WalletRecord = types
  .model("WalletRecord")
  .props({
    afterValue: types.optional(types.number, 0),
    beforeValue: types.optional(types.number, 0),
    createTime: types.optional(types.string, ""),
    currencyName: types.optional(types.string, ""),
    currencyValue: types.optional(types.number, 0),
    description: types.optional(types.string, ""),
    orderId: types.optional(types.string, ""),
    orderType: types.optional(types.number, 0),
    status: types.optional(types.number, 0),
    subject: types.optional(types.string, ""),
  })
  .actions(withSetPropAction)
  .views((self) => ({}))
  .actions((self) => ({}));

export interface WalletRecord extends Instance<typeof WalletRecord> {}
export interface WalletRecordSnapshotOut
  extends SnapshotOut<typeof WalletRecord> {}
export interface WalletRecordSnapshotIn
  extends SnapshotIn<typeof WalletRecord> {}
export const createWalletRecordDefaultModel = () =>
  types.optional(WalletRecord, {});
