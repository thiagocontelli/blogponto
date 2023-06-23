'use client'

import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import { Fragment } from "react";
import { GoogleButton, Menu, Transition } from "@/components";
import { MoonIcon, PlusIcon, SunIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import { Tooltip } from "./Tooltip";
import { useTheme } from "next-themes";
import IconButton from "./IconButton";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function Header() {
  const { data: session } = useSession()

  const { theme, setTheme } = useTheme()
  
  return (
    <div className="flex justify-between items-center py-8 lg:px-16 px-8">

      <Link
        href='/'
        className="cursor-pointer active:scale-95 transition-transform hover:cursor-pointer"
      >
        <span
          className="font-bold text-2xl dark:text-white"
        >
          Blog.
        </span>
      </Link>

      {session ? (
        <div className="flex items-center gap-4">
          <Tooltip tooltip="Change theme">
            <IconButton
              sr="Change theme"
              onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}
            >
              {theme === 'light' ? <SunIcon className="h-6 w-6" aria-hidden="true" /> : <MoonIcon className="h-6 w-6" aria-hidden="true" />}
            </IconButton>
          </Tooltip>

          <Tooltip tooltip="Add a new post">
            <IconButton
              sr="Add new post"
              href="/posts/new"
            >
              <PlusIcon className="h-6 w-6" aria-hidden="true" />
            </IconButton>
          </Tooltip>

          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <Image
                  className="rounded-full"
                  src={session.user?.image || ''}
                  alt="User menu"
                  width={40}
                  height={40}
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <span
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                      onClick={() => signOut()}
                    >
                      Sign out
                    </span>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : (
        <GoogleButton />
      )}
    </div>
  )
}
