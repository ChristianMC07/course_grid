'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchCourse } from '@/actions/fetchCourse';
import { Course } from '@/tools/data.model';
import { editCourse } from '@/actions/editCourse';

const EditCoursePage = () => {
    const router = useRouter();
    const { id: courseID } = router.query;
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof courseID === 'string') {
            setLoading(true);
            fetchCourse(courseID).then(data => {
                setCourse(data);
                setLoading(false);
            });
        }
    }, [courseID]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Ensure 'formData' is correctly defined here
        const formData = new FormData(event.currentTarget);

        if (!courseID || !course) return;

        setLoading(true);
        await editCourse(course.courseID, formData);
        setLoading(false);
        router.push('/home/courses');
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
