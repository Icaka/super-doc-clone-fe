import {Doctor, Review} from "@/api/models";

class APIClient {
    private readonly url: string | undefined;

    public constructor(url: string){
        this.url = url;
    }

    public async getDoctors(): Promise<Doctor[]>{
        const doctorsData = await fetch(this.url + "/doctors");
        return await doctorsData.json();
    }

    public async getDoctor(id: string): Promise<Doctor>{
        const doctor = await fetch(this.url + "/doctors/" + id);
        return await doctor.json();
    }

    public async getDoctorReviews(id: string): Promise<Review[]>{
        const reviewData = await fetch(this.url + "/doctors/" + id + "/reviews");
        return await reviewData.json();
    }
}

export const apiClient = new APIClient("http://localhost:8080");