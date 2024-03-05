
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
    weeks?: Week[];
}

export interface Week {
    weekName: string;
    rows: Row[];
}

export interface Row {
    classID: string;
    learningOutcome: string;
    enablingOutcome: string;
    material: string;
    assessment: string;
    notes: string;
}