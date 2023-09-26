import {GameTable} from "../model/GameTable.js";
import {GameItem} from "../model/GameItem.js";
import {RuntimeException} from "../exception/RuntimeException.js";
import {NeedEnvWarning} from "../warning/NeedEnvWarning.js";
import {UnzipException} from "../exception/UnzipException.js";
import {DirWarning} from "../warning/DirWarning.js";

let tableItems: GameItem[] = [];
tableItems.push(new GameItem("runtimeStart", new RuntimeException.Start()));
tableItems.push(new GameItem("runtimeRunning", new RuntimeException.Running()));
tableItems.push(new GameItem("runtimeEnd", new RuntimeException.End()));
tableItems.push(new GameItem("PassWordError", new UnzipException.PassWordError()));
tableItems.push(new GameItem("Broken", new UnzipException.Broken()));
tableItems.push(new GameItem("needEnvWarningNeedInstall", new NeedEnvWarning.NeedInstall()));
tableItems.push(new GameItem("needEnvWarningNeedSimulator", new NeedEnvWarning.NeedSimulator()));
tableItems.push(new GameItem("needEnvWarningNeedInstall", new DirWarning.EngDir()));

let table1: GameTable = new GameTable("test", tableItems);

export {table1};
