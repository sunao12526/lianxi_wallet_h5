import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  getSnapshot,
  types,
} from "mobx-state-tree";

/**
 * Model description here for TypeScript hints.
 */
export const WalletStoreModel = types
  .model("WalletStore")
  .props({
    currttenYue: types.optional(types.number, 100),
    isActivity: types.optional(types.boolean, true),
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
  }));
