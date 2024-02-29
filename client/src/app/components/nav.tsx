'use client';

import { UserButton, useUser, auth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

export default function Nav() {
    const { user, isLoaded } = useUser();

    return (
        <header>
            <nav className='flex items-center h-[15vh] justify-between p-6 lg:px-8 border border-t-0 border-l-0 border-r-0 border-b-gray-600' aria-label='Global'>
                <div className='flex lg:flex-1'>

                    {/* THIS WORKS */}

                    {user != null ? <a href='/home' className='-m-1.5 p-1.5'>Home</a> : <a href='/' className='-m-1.5 p-1.5'>
                        Logo
                    </a>}


                </div>
                {
                    user == null && (
                        <div className='flex gap-x-4'>
                            <Link href="/sign-in">Sign In</Link>
                            <Link href="/sign-up">Register</Link>
                        </div>
                    )
                }


                {
                    isLoaded && user && (
                        <div className='flex gap-x-10'>
                            <Link className='text-blue-900 font-bold hover:text-blue-400 ' href='/home/courses'>Courses</Link>
                            <UserButton afterSignOutUrl='/' />
                        </div>
                    )
                }

            </nav>
        </header>
    );


}