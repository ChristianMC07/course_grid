
export interface Accounts {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt?: Date;
}

export interface User {
    _id: string;
    courses?: Course[];
}

export interface Course {
    courseID: string;
    courseName: string
    courseDescription: string;
    coursePhoto: string;
}