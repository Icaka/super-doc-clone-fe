export default function DoctorList() {
    const Doctors = [{
        firstName: "Ivan",
        lastName: "Draganov"
    }, {
        firstName: "John",
        lastName: "Doe"
    }]

    return(
        <div>
            {Doctors.map(d=>
                <p>{d.firstName} {d.lastName}</p>)
            }
        </div>

    )
}