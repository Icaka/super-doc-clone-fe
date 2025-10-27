"use client"
import Timestamp from "react-timestamp";
import {Doctor as DoctorModel, Review} from "@/api/models"
import {apiClient} from "@/api/client";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";

export default function Doctor() {
    const params = useParams<{slug: string}>()
    const [doctor, setDoctor] = useState<DoctorModel | null>(null)
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

    return(
        <div className="p-5">
            <h1 className={"text-2xl font-bold"}>{doctor?.firstName} {doctor?.lastName}<br/>
            Age: <Timestamp relative date={doctor?.dateOfBirth??Date.now()} relativeTo={Date} /></h1>
            <div style={{border: "dotted"}}>
                <h2 className={"text-1xl font-bold"}>Reviews:</h2>
                <ul className="list-disc pl-5 ml-5">
                    {reviews?.map((re:any)=>
                        <li key={re.id}>{re.text}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

