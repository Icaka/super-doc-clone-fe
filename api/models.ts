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

export interface Schedule {
    id: number;
    count: number;
    length: number;
    start: string;
    date: string;
    doctor: Doctor;
    bookedSlots: number[];
}