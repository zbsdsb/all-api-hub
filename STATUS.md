## 当前任务目标

- 将本地未推送的 import/export 修复与当前 Model List endpoint type 展示修复整理后推送远端，并创建 PR。

## 已完成

- 已确认当前仓库为 `/Users/zbs/projectwork/zbs/all-api-hub`，远端为 `origin=https://github.com/zbsdsb/all-api-hub.git`。
- 已确认本地 `main` 相比 `origin/main` 超前 1 个提交：`91905744 🐛 fix(import-export): 修复密钥导出和密钥页卡住加载状态`。
- 已确认当前未提交改动集中在 Model List endpoint type 展示与对应测试补充。
- 已创建发布分支 `codex-import-export-and-model-list-fixes`。
- 已修复测试基座里的 storage shim 问题，并通过 `pnpm run validate:staged`。

## 下一步计划

- 提交剩余改动。
- 推送远端，并创建 draft PR。

## 关键文件变更

- `src/features/ImportExport/`
- `src/services/importExport/`
- `src/features/ModelList/components/ModelItem/`
- `tests/entrypoints/options/pages/ModelList/`
- `tests/features/ModelList/components/`
- `tests/setup.shared.ts`
