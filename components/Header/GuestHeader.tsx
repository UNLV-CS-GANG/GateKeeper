'use client'

import { useAuth, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import ArrowButton from '../Common/ArrowButton'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import classNames from '@/lib/classNames'
import GuestSlideOver from '../Sidebar/GuestSlideOver'
import Image from 'next/image'

export default function DashboardHeader() {
  const router = useRouter()

  const { isSignedIn } = useAuth()
  const { signOut } = useClerk()

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  return (
    <>
      <div className="fixed top-4 z-20 w-full">
        <div
          className={classNames(
            sidebarIsOpen ? 'opacity-0' : 'opacity-100',
            'relative mx-4 flex h-10 justify-between rounded-full bg-gray-200 bg-opacity-10 px-4 backdrop-blur-md transition-opacity duration-500 sm:mx-20 sm:h-16 sm:px-20'
          )}
        >
          {/* app title */}
          <div className="flex items-center space-x-2">
            <Image src={'/torii.png'} alt={'logo'} priority width={32} height={32} />
            <h1 className="text-base font-medium sm:text-2xl">
              <button onClick={() => router.push('/')}>gatekeeper</button>
            </h1>
          </div>

          {/* routes */}
          <div className="hidden place-items-center justify-center space-x-16 font-medium sm:flex">
            <a
              className="rounded-xl px-3 py-2 transition-colors duration-200 hover:bg-gray-500 hover:bg-opacity-20"
              href="/"
            >
              Home
            </a>
            <a className="rounded-xl px-3 py-2 transition-colors duration-200 hover:bg-gray-500 hover:bg-opacity-20">
              GitHub
            </a>
            <a
              className="rounded-xl px-3 py-2 transition-colors duration-200 hover:bg-gray-500 hover:bg-opacity-20"
              href="/contact"
            >
              Contact
            </a>
          </div>

          {/* login/logout */}
          <div className="hidden place-items-center justify-center sm:flex">
            {isSignedIn ? (
              <ArrowButton text="Log out" onClick={() => signOut(() => router.push('/'))} />
            ) : (
              <ArrowButton text="Log in" onClick={() => router.push('/sign-in')} />
            )}
          </div>

          {/* mobile navigation */}
          <div className="flex place-items-center justify-center sm:hidden">
            <button onClick={() => setSidebarIsOpen(true)}>
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <GuestSlideOver isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
      </div>
    </>
  )
}
