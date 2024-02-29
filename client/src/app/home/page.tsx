import Link from 'next/link';
import Hero from '../components/hero';
import homeImg from "@/../public/images/homeImg.jpg"
import * as actions from '@/tools/actions';
import * as toolkit from '@/tools/Toolkit';
import { auth, currentUser } from '@clerk/nextjs';




export default async function Home() {

    // const { userId } = auth();
    const userInfo = await currentUser();



    const isAuthenticated = true; // Hardcoded for now, replace with actual auth check

    return (
        <>
            <Hero
                imgData={homeImg}
                imgAlt="A vibrant community engaging in activities"
                title={`Welcome back ${userInfo?.firstName}`}
            />

            <div className="container mx-auto p-8">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <p>Welcome to your personalized dashboard. Here, you can manage your courses, settings, and more.</p>
            </div>
        </>
    );
};