"use client";

import { signIn, useSession, signOut } from "next-auth/react";

export const UserAccount = () => {
  const { status } = useSession();
  return (
    <div>
      {status === "unauthenticated" ? (
        <button
          className="px-3 py-2 border-2 border-white"
          onClick={() => signIn("google")}
        >
          Login
        </button>
      ) : (
        <button
          className="px-3 py-2 border-2 border-white"
          onClick={() => signOut()}
        >
          Logout
        </button>
      )}
    </div>
  );
};
