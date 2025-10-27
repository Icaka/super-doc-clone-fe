import {apiClient} from "@/api/client";

export default async function DoctorList() {
    const doctors = await apiClient.getDoctors()

    return(
        <div>
            {doctors.map((d)=>
                <p key={d.id}><a href={"/doctors/" + d.id}>{d.firstName} {d.lastName}</a></p>)
            }
        </div>

    )
}