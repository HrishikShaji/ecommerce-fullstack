"use client";
import { FaUserCircle } from "react-icons/fa";
import { signIn, useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export const UserAccount = () => {
  const { status, data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);
  const dropDownButtonRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target) &&
        dropDownButtonRef.current &&
        !dropDownButtonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
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
          <button
            ref={dropDownButtonRef}
            className=""
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaUserCircle size={25} />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          ref={dropDownRef}
          className="shadow-neutral-800 shadow-md absolute -right-0 mt-2 z-10 bg-neutral-800  flex flex-col gap-2 pt-5"
        >
          <h1 className="px-5">{data?.user?.email}</h1>
          {data?.user.role === "ADMIN" && (
            <Link className="py-2 px-5 hover:bg-neutral-600" href="/dashboard">
              Dashboard
            </Link>
          )}
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
