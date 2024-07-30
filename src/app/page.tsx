import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata:Metadata = {
  title: "Mail Service",
  description: "Sending your emails is now easy!!! ",
}


export default function Home() {
  return (
    <main>
      <div className="container mx-auto max-w-7xl w-full px-2 sm:px-4 md:px-8">
        {/* hero section */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2 flex flex-col pt-8 lg:pt-28">
            <h1 className="text-2xl lg:text-5xl text-slate-900 font-bold uppercase">
              Developer-Friendly Email API
            </h1>
            <p className="mt-8 text-slate-800 lg:text-xl">
              Simplify your email-sending process with our seamless API
              solution. Send emails effortlessly without managing servers or
              worrying about delivery issues. Focus on building your
              applications while we handle the complexities. Easy integration,
              robust performance, and comprehensive documentation make our API
              the perfect email solution for developers.
            </p>
          </div>
          <div className="col-span-1 my-8 p-4 flex flex-col items-center justify-center gap-8">
            <div
              style={{ boxShadow: "12px 12px black" }}
              className="p-4 rounded-2xl w-fit bg-[#D9D9D9]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="138"
                height="138"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5M19 22v-6m3 3l-3-3l-3 3" />
                  <path d="m3 7l9 6l9-6" />
                </g>
              </svg>
            </div>
            {/* <Link
              className="py-2 px-4 bg-black text-white rounded-md"
              href="/api/auth/signup"
            >
              Sign Up for Free
            </Link> */}
          </div>
        </div>

        {/* How it works */}
        <div className="my-8">
          <h2 className="text-xl lg:text-3xl text-center md:text-start uppercase text-slate-800 font-bold">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8  my-8 ">
            <Card text="Signin 🔑" />
            <Card text="Copy your API Key 🔐" />
            <Card text="Call Our Endpoint 📶" />
            <Card text="We Deliver you the email! 😊" />
          </div>
        </div>
      </div>
    </main>
  );
}

function Card({ text }: { text: string }) {
  return (
    <div
      style={{ boxShadow: "12px 12px black" }}
      className="p-4 py-12 bg-[#D9D9D9] w-full h-full flex justify-center items-center rounded-xl"
    >
      <h4 className="font-bold lg:text-2xl">{text}</h4>
    </div>
  );
}
