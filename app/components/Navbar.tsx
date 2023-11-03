import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { UserAccount } from "./UserAccount";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    console.log(session);
  }
  return (
    <div className="p-10 bg-neutral-900 text-white flex justify-between">
      <h1>{session?.user?.email}</h1>
      <UserAccount />
    </div>
  );
};
