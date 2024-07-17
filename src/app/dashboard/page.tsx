import React, { useRef, useState } from "react";
import CopyToClipBoard from "../_components/CopyToClipBoard";
import CreateSecret from "../_components/CreateSecret";
import { auth, currentUser } from "@clerk/nextjs/server";

import prisma from "../../../prisma/db";
import { redirect } from "next/navigation";
import { Metadata } from "next";


export const metadata:Metadata = {
  title: "Mail Service | Dashboard",
  description: "Sending your emails is now easy!!! ",
  robots: {
    index: false,
    follow: false,
  },
};


const DashboardPage = async () => {
  const user = await currentUser();
  if (!user) return redirect("/");
  const userSecret = await prisma.userSecret.findFirst({
    where: { userId: user?.id },
  });
  if (!userSecret) {
    return <CreateSecret   userId={user?.id} />;
  }

  const sampleJson = `{
    "name":"samuel",
    "subject":"Welcome Onboard",
    "intro":"welcome to the our signup list",
    "email":"sam@gmail.com",
    "phone":"+254 790 000 000",
    "to":"admin@gmai.com",
    "key":"${userSecret.secretkey}",
}`;
  return (
    <div className="container  mx-auto p-4 flex flex-col items-center ">
      <h1 className="font-bold text-2xl my-4">How To</h1>
      <div className="max-w-4xl w-full rounded-2xl border-8 border-black p-8 bg-[#D9D9D9]">
        <ol className="list-decimal">
          <li className="font-bold">
            <h4 className="">Copy The Key</h4>
            <CopyToClipBoard
              text={userSecret.secretkey}
            />
          </li>
          <li className="font-bold">
            <h4 className="">Sample JSON</h4>
            <p className="italic font-normal">Note that this is just a sample with some required fields, you can add other fields relevant to your email</p>
            <CopyToClipBoard text={sampleJson} />
          </li>
          <li className="font-bold">
            <h4 className="">Make a POST Request to this endpoint</h4>
            <CopyToClipBoard text={"https://mail.royoltech.com/api/email"} />
          </li>
        </ol>
      </div>
    </div>
  );
};

export default DashboardPage;
