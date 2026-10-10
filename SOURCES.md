# 资料来源与内容范围 / Sources and scope

这份手册沿用原仓库的跨版本清单，并补入游戏物品名称、制作材料、用途与控制台使用说明。它是非官方玩家工具，并非完整、实时更新的游戏数据库。

## 参考资料

- [Don't Starve Wiki](https://dontstarve.wiki.gg/wiki/Don%27t_Starve_Wiki)：物品信息与用途。
- [联机版控制台指令](https://dontstarve.wiki.gg/wiki/Console/Don%27t_Starve_Together_Commands)：`c_give`、`c_spawn` 与远程控制台说明。
- [Logs](https://dontstarve.wiki.gg/wiki/Log)、[Nightmare Fuel](https://dontstarve.wiki.gg/wiki/Nightmare_Fuel)、[Pierogi](https://dontstarve.wiki.gg/wiki/Pierogi)：常用物品的用途说明。说明为中文与英文重新撰写，未复制角色台词。
- [游戏脚本镜像](https://github.com/taichunmin/dont-starve-together-game-scripts)：`strings.lua` 中的物品英文名称、`recipes.lua` 中的制作材料与用途关联。游戏内容属于 Klei Entertainment，镜像不是 Klei 官方维护的仓库。
- [联机版游戏图鉴数值快照](https://github.com/taichunmin/dont-starve-together-game-scripts/blob/0dea2f76e0321ecc6c9faa8e1e5bdd80a5fc1b64/scripts/screens/redux/scrapbookdata.lua)：559 个条目的基础属性。堆叠上限、食物恢复、伤害、耐久、护甲、生物生命等直接取自图鉴数据；防御与防水比例转为百分数，食物腐烂时间按 480 秒/游戏天换算。使用时长按图鉴燃料量/消耗速率计算，精神增益按每分钟显示。
- [DST Craft 游戏图片整理](https://github.com/fankimm/dst-craft/tree/4cfd1334ca2606c4b5ccec40dff36125cc082efe/public/images) 与 [Don't Starve Wiki](https://dontstarve.wiki.gg/)：769 个真实游戏图标或物件图片，保存在 `assets/items/`。逐文件来源记录在 `assets/items/sources.json`。游戏美术权利属于 Klei Entertainment；不将第三方仓库的代码许可视为游戏美术的许可，也未使用第三方网站品牌图片。
- [原始清单](https://github.com/x1ah/dont-starve)：保留原有名称及别名，拆分合并的代码、去掉说明性文本、修正部分明显拼写错误；同一代码的重复记录合并为别名。没有独立代码的特殊状态保留，但禁用复制。

## 当前内容

- 中英双语界面和名称搜索，英语名称优先采用游戏脚本；未匹配到的条目使用可读代码名称，中文名称仍可见。
- 123 个条目有具体说明（包含特殊状态说明和同类杂物的共同用途）；217 个条目有制作材料，113 个条目有用途关联。
- 其余条目提供分类与使用提示，以及 Wiki 检索链接，不虚构数值、掉落率或配方。
- 卡片显示最多三项关键属性，详情显示全部已收录属性及来源。数字以联机版基础值为准；食物恢复按新鲜状态，角色、技能、季节与模组可能改变实际效果。图鉴快照不代表实时更新。
- 无可靠图片的旧版本物件、特殊状态和特效保留分类图标；没有数值资料的条目提示前往 Wiki，不以零代替未知值。
- 配方基于联机版脚本。角色技能、科技解锁、事件、单机版、DLC 与模组可能改变可用性。代码语法已检查，但未在游戏内逐项执行。
- `c_give` 适合背包物品；建筑、生物和大多数世界物件自动使用 `c_spawn`。地面生成位置为鼠标所指的位置。

## English

Names and crafting relationships reference the linked Together game scripts. Descriptions are original summaries. Entries without detailed notes show category guidance and a Wiki search link. The catalog includes legacy and version-specific prefabs; it does not promise that every entry exists in every game edition. Crafting unlock conditions and special entity setup are outside the recipe ingredient list. Commands have been checked in the interface, not individually executed in the game.
