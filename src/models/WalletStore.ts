import { api } from "@/services/api";
import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  getSnapshot,
  types,
} from "mobx-state-tree";
import { WalletModel } from "./Wallet";

/**
 * Model description here for TypeScript hints.
 */
export const WalletStoreModel = types
  .model("WalletStore")
  .props({
    wallet: types.optional(WalletModel, {}),
    currttenYue: types.optional(types.number, 3626),
    isActivity: types.optional(types.boolean, true),
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
  .views((self) => ({}))
  .actions((self) => ({
    setCurrentItem(item: SnapshotIn<typeof self.currentItem>) {
      self.currentItem = item;
    },
    setVisibleCharge(visible: SnapshotIn<typeof self.visibleCharge>) {
      self.visibleCharge = visible;
    },
  }))
  .actions((self) => ({
    async fetch_verifyRealName(
      name: string,
      idCardNumber: string,
      idCardFront: string,
      idCardBack: string
    ) {
      api.verifyRealName(name, idCardNumber, idCardFront, idCardBack);
    },
  }));
