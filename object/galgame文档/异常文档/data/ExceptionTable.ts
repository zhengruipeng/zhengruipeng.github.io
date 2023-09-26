import {GameTable} from "../model/GameTable.js";
import {GameItem} from "../model/GameItem.js";
import {RuntimeException} from "../exception/RuntimeException.js";
import {NeedEnvWarning} from "../warning/NeedEnvWarning.js";
import {UnzipException} from "../exception/UnzipException.js";
import {DirWarning} from "../warning/DirWarning.js";

let tableItems: GameItem[] = [];
tableItems.push(new GameItem(new RuntimeException.Start().info, new RuntimeException.Start()));
tableItems.push(new GameItem(new RuntimeException.Running().info, new RuntimeException.Running()));
tableItems.push(new GameItem(new RuntimeException.End().info, new RuntimeException.End()));
tableItems.push(new GameItem(new UnzipException.PassWordError().info, new UnzipException.PassWordError()));
tableItems.push(new GameItem(new UnzipException.Broken().info, new UnzipException.Broken()));

let exceptionTable: GameTable = new GameTable("严重错误", tableItems);

export {exceptionTable};
