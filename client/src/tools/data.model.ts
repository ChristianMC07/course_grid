
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
    grids?: Grid[];
}

export interface Grid {
    gridName: string;
    weeks?: Row[];
}

export interface Row {
    classID: string;
    learningOut: string;
    enablingOut: string;
    material: string;
    assesment: string;
    notes: string;
}