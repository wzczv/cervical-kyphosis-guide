# AdSense + 广告同意（CMP）一键上线指南

写给站长（产品经理视角）｜准备日期：2026-06-10｜状态：**已备好，未上线，对现网零影响**

---

## 一句话说明

广告接入代码已经全部写好放在仓库里，但处于"熄火"状态。等 AdSense 审核通过、拿到 publisher ID 后，**跑一条命令**就能全站上线，包含欧盟合规的广告同意（Consent Mode v2 + Google 认证 CMP）。

## 现在仓库里多了什么（都不影响现网）

| 文件 | 作用 | 现在的状态 |
| --- | --- | --- |
| `assets/ads.js` | 同意默认值 + AdSense 加载器 + 广告位填充 | `ENABLED=false`，且没有任何页面引用它 → 完全不生效 |
| `scripts/enable-ads.mjs` | 一键上线脚本 | 只是个工具，不跑就什么都不做 |
| 本文档 | 操作手册 | — |

## 上线前提（按顺序）

1. **先不要动**：等站点在 GSC 有稳定展示量（见《90天增长与变现行动方案》Phase 3）。
2. 申请 AdSense → 通过审核 → 拿到 `ca-pub-` 开头的 publisher ID。
3. 在 AdSense 后台开启 **Privacy & messaging → 欧洲法规消息（GDPR message）**。这是 Google 自家的认证 CMP，欧盟/英国访客会看到 Google 的同意弹窗，同意结果自动同步给广告系统——你不用再写任何代码。
4. （可选）在 AdSense 后台建一个"自适应展示广告"单元，记下 slot ID。不建也行，默认走 Auto ads，由 Google 自动决定版位。

## 上线操作（就这一步）

在网站目录里跑（结果自动复制到剪贴板）：

```bash
cd ~/Documents/"Cervical Kyphosis" && node scripts/enable-ads.mjs ca-pub-你的ID 2>&1 | tee /dev/tty | pbcopy
```

想先预览不改文件，加 `--dry-run`；建了手动广告单元就加 `--slot=广告单元ID`。

脚本会自动完成 4 件事（可重复跑，不会重复注入）：

1. 把 `assets/ads.js` 点火（`ENABLED=true` + 写入你的 publisher ID）。
2. 把 `assets/analytics.js` 的同意逻辑从「设默认值」改为「更新值」，让两个脚本不打架（ads.js 接管默认值）。
3. 给全站 150+ 个页面注入 `<script src="/assets/ads.js">`，位置在 analytics.js **之前**（同意默认值必须先于一切 Google 标签执行）。
4. 在站点根目录生成 `ads.txt`。

然后 `git diff` 过目一眼 → commit → push，上线完成。

## 合规与策略要点（已在代码里落实）

- **Consent Mode v2 双层默认值**：欧盟/英国/瑞士默认全部拒绝（等 Google CMP 收集同意后自动放行）；其他地区广告信号默认放行、统计仍走你现有的同意横幅。
- **YMYL 克制投放**：手动单元模式下每页最多填 3 个广告位（`MAX_FILLED_SLOTS_PER_PAGE`），且只填模板里预留的 `.ad-slot` 占位——这些占位本来就避开了红旗症状/急诊提示区。
- **统计横幅不变**：访客体验和现在一致；接受统计后 GA4 照常工作（脚本已处理兼容）。

## 上线后 24 小时检查清单

- [ ] 打开任意文章页，控制台无报错，`ads.txt` 能访问（cervicalcurveguide.com/ads.txt）。
- [ ] 用欧盟 VPN 访问：应先看到 Google 的同意弹窗。
- [ ] AdSense 后台 → 站点状态无"需要修复"项。
- [ ] 确认红旗/免责声明区域附近没有广告渲染。

## 回滚

```bash
cd ~/Documents/"Cervical Kyphosis" && git revert HEAD && git push 2>&1 | tee /dev/tty | pbcopy
```
