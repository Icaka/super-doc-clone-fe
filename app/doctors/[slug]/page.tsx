"use client"
import Timestamp from "react-timestamp";
import {apiClient} from "@/api/client";

export default async function Doctor({
                                        params,
                                   }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const doctor = await apiClient.getDoctor(slug);
    const reviews = await apiClient.getDoctorReviews(slug);
    return(
        <div className="p-5">
            <h1 className={"text-2xl font-bold"}>{doctor.firstName} {doctor.lastName}<br/>
            Age: <Timestamp relative date={doctor.dateOfBirth} relativeTo={Date} /></h1>
            <div style={{border: "dotted"}}>
                <h2 className={"text-1xl font-bold"}>Reviews:</h2>
                <ul className="list-disc pl-5 ml-5">
                    {reviews.map((re:any)=>
                        <li><p key={re.id}>{re.text}</p></li>
                    )}
                </ul>
            </div>
        </div>
    )
}

