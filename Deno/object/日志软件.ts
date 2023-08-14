import {format} from "https://deno.land/std/datetime/mod.ts";
import {assert} from "https://deno.land/std@0.198.0/assert/assert.ts";
import {Mapper, MapperEvent} from "../package/Mapper.ts";

const LOG_FILE_PATH = "./logs/log.txt"; // 日志文件路径

interface LogEntry {
    timestamp: string;
    operation: string;
    path: string;
    isDir: boolean;
}

function logOperation(operation: string, path: string, isDir: boolean): void {
    const entry: LogEntry = {
        operation,
        path,
        timestamp: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        isDir
    };
    const logEntry = JSON.stringify(entry);
    Deno.writeTextFileSync(LOG_FILE_PATH, `${logEntry}\n`, {append: true});
}

//去重
let lastCommand = "";

function handleFileOperation(operation: string, path: string): void {
    const command = `执行了 ${operation}操作 在文件： ${path}`;
    if (lastCommand === command) return;

    console.log(command);
    lastCommand = command;
    logOperation(operation, path, false);
}

function handleDirectoryOperation(operation: string, path: string): void {
    const command = `执行了 ${operation}操作 在目录: ${path}`;
    if (lastCommand === command) return;

    console.log(command);
    lastCommand = command;
    logOperation(operation, path, true);
}

function handleFileCreation(path: string): void {
    handleFileOperation("添加", path);
}

function handleFileDeletion(path: string): void {
    handleFileOperation("删除", path);
}

function handleFileModification(path: string): void {
    handleFileOperation("修改", path);
}

function handleDirectoryCreation(path: string): void {
    handleDirectoryOperation("添加", path);
}

function handleDirectoryDeletion(path: string): void {
    handleDirectoryOperation("删除", path);
}

function handleDirectoryModification(path: string): void {
    handleDirectoryOperation("修改", path);
}

async function watchDirectory(path: string): Promise<void> {
    for await(const entry of Deno.readDir(path)) {
        if (entry.isFile) {
            console.log(entry)
            handleFileModification(entry.path);
        } else if (entry.isDirectory) {
            handleDirectoryModification(entry.path);
        }
    }
}

async function watchChanges(path: string): Promise<void> {

    if (!(await Deno.stat(path)).isFile &&
        !(await Deno.stat(path)).isDirectory) {
        console.log("Path does not exist.");
        return;
    }

    const stats = await Deno.stat(path);
    const mapper = new Mapper(null, null);

    if (stats.isFile) {
        console.log("Watching file changes...");

        const watcher = Deno.watchFs(path, {recursive: true});

        mapper.map("create", (event: MapperEvent) => {
            handleFileCreation(event.customData[0].paths[0]);
        });
        mapper.map("modify", (event: MapperEvent) => {
            handleFileModification(event.customData[0].paths[0]);
        });
        mapper.map("remove", (event: MapperEvent) => {
            handleFileDeletion(event.customData[0].paths[0]);
        });

        for await (const event of watcher) {
            if (["any", "access", "other"].includes(event.kind)) {
                continue;
            }

            mapper.target = event.kind;
            await mapper.callSync(event);
        }
    } else if (stats.isDirectory) {
        console.log("Watching directory changes...");

        const watcher = Deno.watchFs(path, {recursive: true});

        mapper.map("create", (event) => {
            handleDirectoryCreation(event.customData[0].paths[0]);
        });
        mapper.map("modify", (event) => {
            handleDirectoryModification(event.customData[0].paths[0]);
        });
        mapper.map("remove", (event) => {
            handleDirectoryDeletion(event.customData[0].paths[0]);
        });

        for await (const event of watcher) {
            if (["any", "access", "other"].includes(event.kind)) {
                continue;
            }

            mapper.target = event.kind;
            await mapper.callSync(event);
        }

        // 监听目录下文件修改
        watchDirectory(path);
    }
}

assert((await Deno.stat(LOG_FILE_PATH)).isFile); // 确保日志文件夹存在

const directoryToWatch:string = prompt("输入监视的路径") ?? ""; // 要监视的目录路径
watchChanges(directoryToWatch);

/*
* deno run --allow-write --allow-read 日志软件.ts
* */