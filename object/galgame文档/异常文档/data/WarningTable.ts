import {GameTable} from "../model/GameTable.js";
import {GameItem} from "../model/GameItem.js";
import {RuntimeException} from "../exception/RuntimeException.js";
import {NeedEnvWarning} from "../warning/NeedEnvWarning.js";
import {UnzipException} from "../exception/UnzipException.js";
import {DirWarning} from "../warning/DirWarning.js";

let tableItems: GameItem[] = [];
tableItems.push(new GameItem(new NeedEnvWarning.NeedInstall().info, new NeedEnvWarning.NeedInstall()));
tableItems.push(new GameItem(new NeedEnvWarning.NeedSimulator().info, new NeedEnvWarning.NeedSimulator()));
tableItems.push(new GameItem(new DirWarning.EngDir().info, new DirWarning.EngDir()));

let warningTable: GameTable = new GameTable("警告", tableItems);

export {warningTable};
