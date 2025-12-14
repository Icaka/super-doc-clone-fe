import {Doctor, Review, Schedule} from "@/api/models";

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

    public async createReview(doctorId: string, rating: number, content: string) {
        await fetch(this.url + "/doctors/" + doctorId + "/reviews/create", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                score: rating,
                text: content,
            }),
        });
    }

    public async createAppointment(doctorId: string, date: string | undefined, slot: number | null) {
        await fetch(this.url + "/doctor/" + doctorId + "/appointments/create", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: date,
                slot: slot,
            }),
        })
    }

    public async searchDoctor(query: string): Promise<Doctor[]> {
        const doctors = await fetch(this.url + "/doctors/search/" + query)
        return await doctors.json();
    }

    public async getDoctorSchedule(id: string, currDate: Date | undefined): Promise<Schedule> {
        if(currDate == undefined) {
            // @ts-ignore
            return;
        }
        const date = currDate?.toLocaleDateString("en-CA").split("T")[0]; // YYYY-MM-DD
        const response = await fetch(`${this.url}/doctors/${id}/schedule?date=${date}`);

        if (!response.ok) {
            throw new Error("Failed to fetch doctor schedule");
        }
        return await response.json();
    }
}

export const apiClient = new APIClient("http://localhost:8080");