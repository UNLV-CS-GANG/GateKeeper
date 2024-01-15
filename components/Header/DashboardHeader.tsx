'use client'

import NotificationBell from '@/components/Header/NotificationBell'
import ToggleTheme from '@/components/Header/ToggleTheme'
import SidebarButton from '@/components/Sidebar/SidebarButton'
import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ArrowLeftStartOnRectangleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Image from 'next/image'

export default function DashboardHeader() {
  const router = useRouter()
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  return (
    <div className="flex h-16 w-full justify-between bg-white px-5 shadow-sm sm:grid sm:grid-cols-12 sm:px-4">
      <div className="flex place-items-center justify-center sm:col-span-3">
        <Image src={'/torii.png'} className="h-8" alt={'logo'} priority width={32} height={32} />
        <h1 className="text-xl font-medium sm:text-2xl flex items-center space-x-2">
          <button className="hidden sm:block" onClick={() => router.push('/')}>
            gatekeeper
          </button>
          <div className="block sm:hidden">
            <SidebarButton isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen}>
              <div className="flex place-items-center space-x-1">
                <p>gatekeeper</p>
                {!sidebarIsOpen && <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-gray-600" />}
                {sidebarIsOpen && <ArrowLeftStartOnRectangleIcon className="h-6 w-6 text-gray-600" />}
              </div>
            </SidebarButton>
          </div>
        </h1>
      </div>

      <div className="flex place-items-center justify-end space-x-3 sm:col-span-9 sm:space-x-5 sm:pr-10">
        {/* notification bell */}
        <NotificationBell />

        {/* dark/light mode */}
        <ToggleTheme />

        {/* user profile */}
        <div className="pl-1.5 sm:pl-0">
          <UserButton afterSignOutUrl="/" showName={false} />
        </div>
      </div>
    </div>
  )
}
