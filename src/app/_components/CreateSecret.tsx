"use client";
import React, { useEffect } from "react";
import { generateKey } from "../actions";
import { useFormState, useFormStatus } from "react-dom";

const CreateSecret = ({ userId }: { userId: string }) => {
  const [state, formAction] = useFormState(generateKey, null);
  const { pending } = useFormStatus();
  
  return (
    <div className="w-full min-h-96 flex justify-center items-center flex-col">
      <div
        style={{ boxShadow: "12px 12px black" }}
        className="p-4 py-12 bg-[#D9D9D9]  flex flex-col justify-center items-center rounded-xl"
      >
        <h1 className="text-lg mb-8  font-semibold">Seems You dont have a secret key{" "}</h1>
        <form action={formAction} method="POST">
          <input type="text" name="userId" hidden value={userId} />
          <button
            type="submit"
            disabled={pending}
            className="text-2xl py-2 px-4 rounded-md bg-black text-slate-200 font-bold"
          >
            {pending ? "Generating Secret ..." : "Generate Secret"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSecret;
