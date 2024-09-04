import { api } from "@/services/api";
import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  getSnapshot,
  types,
} from "mobx-state-tree";
import { WalletModel } from "./Wallet";
import { withSetPropAction } from "./helpers/withSetPropAction";

/**
 * Model description here for TypeScript hints.
 */
export const WalletStoreModel = types
  .model("WalletStore")
  .props({
    wallet: types.optional(WalletModel, {}),
    apiCode: types.optional(types.string, ""),
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
  .actions(withSetPropAction)
  .views((self) => ({
    // get currttenYue() {
    //   return self.wallet.cash;
    // },
    // get isActivity() {
    //   return self.wallet.realityStatus === "0";
    // },
  }))
  .actions((self) => ({
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
    async fetch_getWallet() {
      const response = await api.getWallet();
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
  }));
