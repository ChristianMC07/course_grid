
export interface Accounts {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt?: Date;
}

export interface Courses {
    _id: string; 
    code: string; 
    name: string; 
    description: string; 
    imageUrl: string; 
  }
  