import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/logo.jpg'
import React, { ReactNode } from 'react'
import DashboardLinks from '@/components/DashboardLinks'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, User2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const DashboardLayout = ({children}: {children: ReactNode}) => {
  return (
    <>
        <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <div className='hidden border-r bg-muted/40 md:block bg-gray-300'>
                <div className='flex flex-col max-h-screen h-full gap-2 bg-gray-300'>
                    <div className='h-16 flex items-center justify-center border-b px-4 lg:h-[70px] lg:px-6 bg-white'>
                        <Link href={'/'} className='flex items-center gap-3'>
                            <div className='relative w-12 h-12 rounded-full overflow-hidden'>
                                <Image 
                                    src={Logo} 
                                    alt='logo'
                                    fill
                                    className='object-cover' 
                                    priority
                                />
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-xl font-semibold'>News<span className='text-blue-600'>Feed</span></p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex-1'>
                        <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
                            <DashboardLinks />
                        </nav>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <header className='flex h-14 items-center gap-4 border-b bg-gray-500 px-4 lg:h-[60px] lg:px-6'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant={'outline'} size={'icon'} className='md:hidden'>
                                <Menu className='size-5' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={'left'}>
                            <nav className='grid mt-10 gap-2'>
                                <DashboardLinks />
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className='flex items-center ml-auto'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={'outline'} size={'icon'} className='rounded-full'>
                                    <User2 className='size-5' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem asChild>
                                    <Link href={'/dashboard'}>Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={'/dashboard/invoices'}>Invoices</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem asChild>
                                    <Link href={'/'}>Logout</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-200'>
                    {children}
                </main>
            </div>
        </div>
        {/* <Toaster 
            richColors
            closeButton
            theme='light'
        /> */}
    </>
  )
}

export default DashboardLayout