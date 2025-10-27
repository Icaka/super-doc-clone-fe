"use client"
import Timestamp from "react-timestamp";

export default async function Doctor({
                                        params,
                                   }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const doctor = await fetch("http://localhost:8080/doctors/" + slug)
    const data = await doctor.json()
    const reviews = await fetch("http://localhost:8080/doctors/" + slug + "/reviews")
    const reviewsData = await reviews.json()
    console.log(reviewsData)
    return(
        <div className="p-5">
            <h1 className={"text-2xl font-bold"}>{data.firstName} {data.lastName}<br/>
            Age: <Timestamp relative date={data.dateOfBirth} relativeTo={Date} /></h1>
            <div style={{border: "dotted"}}>
                <h2 className={"text-1xl font-bold"}>Reviews:</h2>
                <ul className="list-disc pl-5 ml-5">
                    {reviewsData.map((re:any)=>
                        <li><p key={re.id}>{re.text}</p></li>
                    )}
                </ul>
            </div>
        </div>
    )
}

