// @filename: app.ts
import { createCatName, type Cat, type Dog } from "./1 类型导出.js";

export type Animals = Cat | Dog;
const name = createCatName();