"use client";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export const UserAccount = () => {
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const dropDownButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node) &&
        dropDownButtonRef.current &&
        !dropDownButtonRef.current.contains(e.target as Node)
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
        <button
          ref={dropDownButtonRef}
          className=""
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaUserCircle size={25} />
        </button>
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

          <Link
            className="py-2 px-5 hover:bg-neutral-600"
            href={`/${data?.user.id}/profile`}
          >
            Profile
          </Link>
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
