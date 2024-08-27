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
    currttenYue: types.optional(types.number, 3000),
    handleStatus: types.optional(
      types.union(
        types.literal("修改用户"),
        types.literal("创建用户"),
        types.literal("创建成功"),
        types.literal("修改成功"),
        types.literal("删除成功"),
        types.literal("操作失败")
      ),
      "创建用户"
    ),
  })
  .views((self) => ({}));
