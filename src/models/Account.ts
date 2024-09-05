import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";

/**
 * Model description here for TypeScript hints.
 */

export const AccountModel = types
  .model("Account")
  .props({
    mobile: types.optional(types.string, ""),
  })
  .actions(withSetPropAction)
  .views((self) => ({}))
  .actions((self) => ({}));

export interface AccountModel extends Instance<typeof AccountModel> {}
export interface AccountModelSnapshotOut
  extends SnapshotOut<typeof AccountModel> {}
export interface AccountModelSnapshotIn
  extends SnapshotIn<typeof AccountModel> {}
export const createAccountModelDefaultModel = () =>
  types.optional(AccountModel, {});
