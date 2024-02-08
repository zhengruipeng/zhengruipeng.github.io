import { GameTable } from "../model/GameTable.js";
import { GameItem } from "../model/GameItem.js";
import { RuntimeException } from "../exception/RuntimeException.js";
let tableItems = [];
tableItems.push(new GameItem("第一个游戏", new RuntimeException.Start()));
tableItems.push(new GameItem("第二个游戏", new RuntimeException.End()));
let galgameTable = new GameTable("galgame1", tableItems);
export { galgameTable };
