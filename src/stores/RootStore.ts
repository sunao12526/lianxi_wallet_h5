import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { WalletStoreModel } from "./WalletStore";

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  walletStore: types.optional(WalletStoreModel, {} as any),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
