import React, { useState, useMemo } from "react";
import { Loadable } from "./Loadable";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const AlwaysSuspend: React.VFC = () => {
  console.log("AlwaysSuspend is rendered");
  throw sleep(1000);
};

export default AlwaysSuspend;

export const SometimesSuspend: React.VFC = () => {
  if (Math.random() < 0.5) {
    throw sleep(1000);
  }
  return <p>Hello,world!</p>;
};

type Props = {
  name: string;
};

export const RenderingNotifier: React.VFC<Props> = ({ name }) => {
  console.log(`${name} is rendered`);

  return null;
};

export async function fetchData1(): Promise<string> {
  await sleep(Math.floor(Math.random() * 1000));
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
}

//toFixedは引数の桁分残す
//let numObj = 12345.6789
// numObj.toFixed(1)      // '12345.7' を返す : 四捨五入

let data: string | undefined;

const dataMap: Map<string, unknown> = new Map();

export function useData<T>(cacheKey: string, fetch: () => Promise<T>): T {
  const cachedData = dataMap.get(cacheKey) as T | undefined;
  if (cachedData === undefined) {
    throw fetch().then((d) => dataMap.set(cacheKey, d));
  }
  return cachedData;
}

export const DataLoader1: React.VFC = () => {
  const data = useData("DataLoader1", fetchData1);
  return (
    <div>
      <div>Data is {data}</div>
    </div>
  );
};

export const DataLoader2: React.VFC = () => {
  const data = useData("DataLoader2", fetchData1);
  return (
    <div>
      <div>Data is {data}</div>
    </div>
  );
};

export const DataLoader: React.VFC<{
  data: Loadable<string>;
}> = ({ data }) => {
  const value = data.getOrThrow();
  return (
    <div>
      <div>Data is {value}</div>
    </div>
  );
};
