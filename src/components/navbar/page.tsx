

'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, User, Menu, LogOut, Settings } from 'lucide-react'
import { CartContext } from '../context/cartContext'
import { signOut, useSession } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function NavBar() {
  const { cartContent, isLoading } = useContext(CartContext) || {}
  const cartCount = cartContent?.numOfCartItems ?? 0
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Brands', href: '/brands' },
    { name: 'Categories', href: '/categories' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-r from-indigo-900/80 to-blue-950/70 border-b border-indigo-700/20 shadow-lg">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">

          <div className="flex items-center gap-6">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-indigo-300 hover:text-indigo-100 hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-gradient-to-b from-indigo-950 to-blue-950 text-white p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-indigo-700">
                    <span className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      e-commerce
                    </span>
                  </div>
                  <div className="flex-1 p-6 space-y-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block text-lg font-semibold transition-all duration-300 ${isActive(link.href)
                            ? 'text-cyan-400 translate-x-2'
                            : 'text-gray-300 hover:text-cyan-300 hover:translate-x-2'
                          }`}
                        onClick={() => {
                          const sheetCloseBtn = document.querySelector<HTMLButtonElement>("[data-state='open'] button")
                          sheetCloseBtn?.click()

                        }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                e-commerce
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 font-medium text-sm transition-colors ${isActive(link.href) ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-200'
                  }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-cyan-200 hover:bg-white/10">
                <ShoppingCart className="h-6 w-6" />
                {!isLoading && cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold border-2 border-indigo-900 shadow animate-pulse">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User */}
            {status === 'authenticated' ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-cyan-500/30 hover:ring-cyan-400/50 transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {session?.user?.name?.charAt(0) || 'U'}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 mt-2 bg-indigo-950/95 backdrop-blur-lg border border-indigo-700/30 text-white shadow-2xl">
                  <DropdownMenuLabel className="p-4">
                    <div className="font-medium text-cyan-300">{session.user?.name}</div>
                    <div className="text-xs text-gray-400 truncate">{session.user?.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-indigo-700/30" />
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-indigo-900/50">
                    <Link href="/profile" className="flex items-center px-4 py-3">
                      <User className="mr-3 h-5 w-5 text-cyan-400" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-indigo-900/50">
                    <Link href="/settings" className="flex items-center px-4 py-3">
                      <Settings className="mr-3 h-5 w-5 text-cyan-400" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-indigo-700/30" />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="cursor-pointer text-red-400 hover:bg-red-900/50 hover:text-red-300 px-4 py-3"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-cyan-200 hover:bg-white/10 font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold shadow-lg transition-all hover:shadow-xl hover:scale-105">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Guest Icon */}
            {status !== 'authenticated' && (
              <Link href="/login" className="md:hidden">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-cyan-200">
                  <User className="h-6 w-6" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
