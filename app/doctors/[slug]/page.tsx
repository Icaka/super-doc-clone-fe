"use client"
import Timestamp from "react-timestamp";
import {Doctor as DoctorModel, Review, Schedule} from "@/api/models"
import {apiClient} from "@/api/client";
import {useCallback, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import ReviewForm from "@/app/doctors/[slug]/components/reviewForm";
import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css";

export default function Doctor() {
    const params = useParams<{slug: string}>()
    const [doctor, setDoctor] = useState<DoctorModel | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date>();
    useEffect(() => {
        async function fetchDoctor() {
            const doctorFetch = await apiClient.getDoctor(params.slug);
            setDoctor(doctorFetch);
        }
        fetchDoctor()
    }, [params])

    const [reviews, setReviews] = useState<Review[] | null>(null)
    useEffect(() => {
        async function fetchReviews(){
            const reviewsFetch = await apiClient.getDoctorReviews(params.slug);
            setReviews(reviewsFetch)
        }
        fetchReviews();
    }, [params]);

    const [schedule, setSchedule] = useState<Schedule | null>(null)
    const [appointmentNums, setAppointmentNums] = useState([1, 2, 3, 4, 5])
    useEffect(() => {
        async function fetchDoctorScheduleByDate(){
            const scheduleFetch = await apiClient.getDoctorSchedule(params.slug, selectedDate);
            setSchedule(scheduleFetch)
            setAppointmentNums([...appointmentNums, scheduleFetch.count])
        }
        fetchDoctorScheduleByDate()
    }, [selectedDate]);

    const generateTimeSlots = () => {
        const slots = [];
        const date = new Date();
        const startHour = 9; // schedule?.workStart
        if (startHour != null) {
            date.setHours(startHour);
        }
        date.setMinutes(0);
        let i = 0;
        // @ts-ignore
        while (i < 10) { // schedule?.count
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");

            slots.push(`${hours}:${minutes}`);

            date.setMinutes(date.getMinutes() + 30);
            i++;
        }
        return slots;
    };

    return(
        <div className="p-5">
            <h1 className={"text-2xl font-bold"}>{doctor?.firstName} {doctor?.lastName}</h1>
            {doctor?.dateOfBirth&&<h1 className={"text-2xl font-bold"}>Age: <Timestamp relative date={doctor?.dateOfBirth??Date.now()} relativeTo={Date()} /></h1>}
            <div className="p-3" style={{border: "1px solid"}}>
                <h2 className={"text-1xl font-bold"}>Reviews:</h2>
                <ul className="list-disc pl-5 ml-5">
                    {reviews?.map((re:Review)=>
                        <li key={re.id}>{re.text}: {re.score} </li>
                    )}
                </ul>
            </div>
            <ReviewForm doctorId={params.slug}/>
            <DayPicker
                //className="content-center"
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                footer={
                    selectedDate ? `Selected: ${selectedDate.toLocaleDateString()}` : "Pick a day."
                }
            />
            <div className="p-3" style={{border: "1px solid"}}>
                <h2 className={"text-1xl font-bold"}>Time Slots:</h2>
                <ul className="list-disc pl-5 ml-5">
                    {generateTimeSlots().map((slot)=>
                        <li key={slot}>{slot}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

