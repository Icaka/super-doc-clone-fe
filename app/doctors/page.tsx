export default async function DoctorList() {
    const doctorsData = await fetch("http://localhost:8080/doctors")
    const doctors = await doctorsData.json()

    return(
        <div>
            {doctors.map((d:any)=>
                <p key={d.id}>{d.firstName} {d.lastName}</p>)
            }
        </div>

    )
}