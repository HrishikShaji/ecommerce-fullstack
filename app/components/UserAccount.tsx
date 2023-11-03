"use client";
import { FaUserCircle } from "react-icons/fa";
import { signIn, useSession, signOut } from "next-auth/react";
import { useState } from "react";

export const UserAccount = () => {
  const { status, data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative ">
      <div className="">
        {status === "unauthenticated" ? (
          <button
            className="px-3 py-2 border-2 border-white"
            onClick={() => signIn("google")}
          >
            Login
          </button>
        ) : (
          <button className="" onClick={() => setIsOpen(!isOpen)}>
            <FaUserCircle size={25} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="shadow-neutral-800 shadow-md absolute -right-0 mt-2 z-10 bg-neutral-800  flex flex-col gap-2 pt-5">
          <h1 className="px-5">{data?.user?.email}</h1>
          <button
            onClick={() => signOut()}
            className="py-2 hover:bg-neutral-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
