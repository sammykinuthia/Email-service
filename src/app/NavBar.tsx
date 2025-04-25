import Link from "next/link";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton, GoogleOneTap } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const NavBar = () => {
  const { userId } = auth();
  console.log("userID - " + userId)
  return (
    <nav className="border-b-4 border-black">
      <div className="container max-w-7xl w-full mx-auto p-4 flex justify-between items-center">
        <Link className="text-xl font-bold" href={"/"}>
          Royoltech
        </Link>
        <div className="flex items-center gap-4">
          {userId && <Link className="text-black font-semibold" href={"/dashboard"}>Dashboard</Link>}
          <SignedOut>
            <span className="py-2 px-4 bg-black text-white rounded-md">
              <SignInButton />
            </span>
          </SignedOut>
          <SignedIn>
            <span className="p-1 flex items-center justify-center  bg-black text-white rounded-full">
              <UserButton />
            </span>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
