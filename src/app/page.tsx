import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto max-w-7xl w-full">
        {/* hero section */}
        <div className="grid grid-cols-3">
          <div className="col-span-2 flex flex-col pt-28">
            <h1 className="text-5xl text-slate-700 font-bold uppercase">
              Instant signup emails
            </h1>
            <p className="mt-8 text-slate-800 text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
              magni! Totam ipsum dicta fugiat culpa soluta. Officia cumque eum
              atque deleniti dolores eveniet exercitationem aut voluptates nemo
              fuga quia animi, illum ullam libero, labore repudiandae quis ipsum
              ipsa sunt similique.
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
          <h2 className="text-3xl uppercase text-slate-800 font-bold">
            How It Works
          </h2>
          <div className="grid grid-cols-4 gap-8  my-8">
            <Card text="Signin 🔑"/>
            <Card text="Copy your API Key 🔐"/>
            <Card text="Call Our Endpoint 📶"/>
            <Card text="We Deliver you the email! 😊"/>
          </div>
        </div>
      </div>
    </main>
  );
}

function Card({text}:{text:string}) {
  return (
    <div  style={{ boxShadow: "12px 12px black" }} className="p-4 py-12 bg-[#D9D9D9] w-full h-full flex justify-center items-center rounded-xl">
      <h4 className="font-bold text-2xl">{text}</h4>
    </div>
  );
}
