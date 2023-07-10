import {assertEquals} from "std/testing/asserts.ts";

assertEquals(1, 2).catch(() => console.log("第一个不相等"));
assertEquals(2, 2).catch(() => console.log("第一个不相等"));
assertEquals("2", 2).catch(() => console.log("第一个不相等"));
