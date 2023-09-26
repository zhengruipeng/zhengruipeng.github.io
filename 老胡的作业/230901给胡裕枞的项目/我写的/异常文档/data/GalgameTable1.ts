import {GameTable} from "../model/GameTable.js";
import {GameItem} from "../model/GameItem.js";
import {RuntimeException} from "../exception/RuntimeException.js";
import {NeedEnvWarning} from "../warning/NeedEnvWarning.js";
import {UnzipException} from "../exception/UnzipException.js";
import {DirWarning} from "../warning/DirWarning.js";

let tableItems: GameItem[] = [];
tableItems.push(new GameItem("第一个游戏", new RuntimeException.Start()));
tableItems.push(new GameItem("第二个游戏", new RuntimeException.End()));

let galgameTable: GameTable = new GameTable("galgame1", tableItems);

export {galgameTable};
