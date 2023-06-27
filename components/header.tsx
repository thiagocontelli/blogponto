'use client'

import { GoogleButton, Tooltip } from "@components";
import { Moon, Plus, Sun } from 'lucide-react';
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Header() {
  const { data: session } = useSession()

  const { theme, setTheme } = useTheme()

  return (
    <div className="flex justify-between items-center py-8 lg:px-16 px-8">
      <Link
        href='/'
        className="cursor-pointer active:scale-95 transition-transform hover:cursor-pointer font-bold text-2xl"
      >
        Blog.
      </Link>

      {session ? (
        <div className="flex items-center gap-4">
          <Tooltip tooltip="Change theme">
            <Button
              variant='ghost'
              size='icon'
              onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}
            >
              {theme === 'light' ? <Sun /> : <Moon />}
            </Button>
          </Tooltip>

          <Tooltip tooltip='Add a new post'>
            <Button variant='ghost' size='icon' asChild>
              <Link href='/posts/new'><Plus /></Link>
            </Button>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session.user?.image || ''} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <GoogleButton />
      )}
    </div>
  )
}
