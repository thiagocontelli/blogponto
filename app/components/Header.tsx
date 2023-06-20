'use client'

import { signOut, useSession } from "next-auth/react";
import { GoogleButton } from "./GoogleButton";
import { SignOut } from "@phosphor-icons/react";

export function Header() {
  const { data: session } = useSession()

  return (
    <div className="flex justify-between items-center py-8 px-16">
      <span className="font-bold text-2xl">Blog.</span>

      {session ? (
        <button
          onClick={() => signOut()}
          className="flex gap-4 items-center transition-all duration-200 hover:bg-red-500 hover:text-white py-2 px-4 rounded text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Sign out
          <SignOut size={20} />
        </button>
      ) : (
        <GoogleButton />
      )}

    </div>
  )
}
