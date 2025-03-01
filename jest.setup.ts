import "@testing-library/jest-dom";

if (typeof structuredClone === "undefined") {
  globalThis.structuredClone = <T>(obj: T): T => {
    if (obj === undefined) return undefined as T;
    return JSON.parse(JSON.stringify(obj));
  };
}