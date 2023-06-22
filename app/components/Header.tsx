'use client'

import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import { Fragment } from "react";
import { GoogleButton, Menu, Transition } from "@components";
import { PlusIcon } from '@heroicons/react/24/outline'
import { redirect } from 'next/navigation'
import Link from "next/link";
import { Tooltip } from "./Tooltip";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function Header() {
  const { data: session } = useSession()

  return (
    <div className="flex justify-between items-center py-8 lg:px-16 px-8">
      <span className="font-bold text-2xl">Blog.</span>

      {session ? (
        <div className="flex items-center gap-4">
          <Tooltip tooltip="Add a new post">
            <Link
              className="flex rounded text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-700"
              href={'/posts/new'}
            >
              <span className="sr-only">Add post</span>
              <PlusIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
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
