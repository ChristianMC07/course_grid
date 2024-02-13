import React, { use } from 'react';
import Link from 'next/link';
import Hero from '../../components/hero';
import homeImg from "@/../public/images/homeImg.jpg"
import * as actions from '@/tools/actions';
import * as toolkit from '@/tools/Toolkit';

interface HomePageProps {
    params: {
        _id: string
    }
}


export default async function Home(props: HomePageProps) {
    const isAuthenticated = true; // Hardcoded for now, replace with actual auth check

    const id = props.params._id;

    const userInfo = await actions.getUserInfo(decodeURIComponent(id));

    return (
        <>
            <nav className="container mx-auto p-8 flex justify-between items-center">
                <Link href="/home">Logo</Link>
                <div className="space-x-4">
                    {isAuthenticated ? (
                        <>
                            <Link href="/workspace">Workspace</Link>

                            <Link href="/">Log Out</Link>
                        </>
                    ) : (
                        <Link href="/login">Login</Link>
                    )}
                </div>
            </nav>

            <Hero
                imgData={homeImg}
                imgAlt="A vibrant community engaging in activities"
                title={`Welcome Back ${toolkit.capitalizeWords(userInfo.firstName)}`}
            />

            <div className="container mx-auto p-8">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <p>Welcome to your personalized dashboard. Here, you can manage your workspace, settings, and more.</p>

            </div>
        </>
    );
};