import React from "react";

async function getData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("hello world");
      resolve("hello world");
    }, 3000);
  });
}

const UserInfo = async () => {
  const data: string = await getData();
  return <div>{data}</div>;
};

export default UserInfo;
