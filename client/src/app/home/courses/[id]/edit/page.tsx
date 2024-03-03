'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchCourse } from '@/actions/fetchCourse';
import { Course } from '@/tools/data.model';

const EditCoursePage = () => {
    const router = useRouter();
    const { id: courseID } = router.query;
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch the course on component mount
    useEffect(() => {
        if (typeof courseID === 'string') {
            setLoading(true);
            fetchCourse(courseID).then(fetchedCourse => {
                setCourse(fetchedCourse);
                setLoading(false);
            }).catch(error => {
                console.error('Error fetching course:', error);
                setLoading(false);
            });
        }
    }, [courseID]);

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!courseID || !course) {
            console.error("Invalid course data");
            return;
        }

        const formData = new FormData(event.currentTarget);
        setLoading(true);

        try {
            const response = await fetch('/api/courses/edit', {
                method: 'POST',
                body: JSON.stringify({
                    courseID,
                    ...Object.fromEntries(formData)
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            await response.json();
            router.push('/home/courses');
        } catch (error) {
            console.error('Error updating course:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>Edit Course</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="courseName">Course Name:</label>
                    <input
                        id="courseName"
                        name="courseName"
                        type="text"
                        defaultValue={course?.courseName || ''}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="courseDescription">Course Description:</label>
                    <textarea
                        id="courseDescription"
                        name="courseDescription"
                        defaultValue={course?.courseDescription || ''}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="coursePhoto">Course Photo:</label>
                    <input
                        type="file"
                        id="coursePhoto"
                        name="coursePhoto"
                    />
                </div>
                <button type="submit" disabled={loading}>Update Course</button>
                <Link href="/home/courses"><a>Cancel</a></Link>
            </form>
        </div>
    );
};

export default EditCoursePage;
