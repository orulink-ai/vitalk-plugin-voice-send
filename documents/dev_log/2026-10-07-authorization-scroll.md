# 语音发送1.0.1与宿主修复

时间：2026-10-07 Asia/Shanghai；作者KID / Codex。关联故障：https://github.com/orulink-ai/ViTalk/issues/46。

本仓库没有AGENTS.md、开发档案README及模板，沿用本次ViTalk任务档案规则创建基本索引；现有首次发布记录保留。任务ID：task-0f043e22-ad10-4d8b-9749-0812d5aed825。

目标：安装定义与package版本由1.0.0升为1.0.1，配套宿主0.6.13的滚动与Windows CLI启动修复。独立包不包含宿主UI代码；旧宿主无法因升级定义取得修复。最低版本由公共受信目录声明。

验证：npm test 2通过；npm run build通过；安装包SHA256为57a88fc952bd2924d34f68b6789359c0ac1ae1ec104d20a52333b34e9bdb7211，与宿主定义一致。版本元数据更新不采用TDD，使用构建字节、清单版本及兼容回归验收。真实授权同意及消息投递尚未执行。

提交前状态：本地已验证，待PR合入及固定v1.0.1 Release；保留v1.0.0原始资产。关联宿主档案：documents/dev_log/2026-10-07/2026-10-07_插件滚动与飞书授权修复/index.md。
