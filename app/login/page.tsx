"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <button
        onClick={() => signIn("google")}
        className="px-3 py-2 border-2 border-white"
      >
        Login
      </button>
    </div>
  );
};

export default Page;
