import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { UserAccount } from "./UserAccount";
import { LuShoppingCart } from "react-icons/lu";
import Link from "next/link";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return (
    <div className="p-10 z-50 sticky top-0 bg-neutral-900 text-white flex justify-between">
      <h1>{session?.user?.email}</h1>
      <h1>{session?.user?.role}</h1>
      <div className="flex gap-4">
        <UserAccount />
        <Link href={`/${session.user.id}/cart`}>
          <LuShoppingCart size={25} />
        </Link>
      </div>
    </div>
  );
};
