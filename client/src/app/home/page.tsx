'use client';

import React from 'react';
import Link from 'next/link';
import Hero from './../components/hero'; 
import homeImg from "@/../public/images/homeImg.jpg"

const HomePage: React.FC = () => {
    const isAuthenticated = true; // Hardcoded for now, replace with actual auth check
  
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
              title="Welcome Back to Our Community!"
            />

            <div className="container mx-auto p-8">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <p>Welcome to your personalized dashboard. Here, you can manage your workspace, settings, and more.</p>
                
            </div>
        </>
    );
};

export default HomePage;