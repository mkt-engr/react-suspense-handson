import React from "react";

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
