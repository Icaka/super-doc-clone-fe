export default async function Doctor({
                                        params,
                                   }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const doctor = await fetch("http://localhost:8080/doctors/" + slug)
    const data = await doctor.json()
    return(
        <div>
            <p>{data.firstName}</p>
            <p>{data.lastName}</p>
            <p>Age: {data.dateOfBirth}</p>
        </div>
    )
}

