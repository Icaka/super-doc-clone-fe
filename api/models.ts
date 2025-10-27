export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    picture: string;
    rating: number;
    dateOfBirth: string;
    description: string;
}

export interface Review {
    id:number;
    doctor: Doctor;
    score: number;
    text: string;
}