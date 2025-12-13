import {ChangeEvent, useCallback, useState} from "react";
import {apiClient} from "@/api/client";
import SlotButton from "@/app/doctors/[slug]/components/slotButton";
import {Schedule} from "@/api/models";
import {generateTimeSlots} from "@/app/doctors/[slug]/utils";

interface ScheduleSectionParams{
    doctorId: string,
    schedule: Schedule | null,
}

export default function ScheduleSection(params: ScheduleSectionParams) {

    const [selectedButton, setSelectedButton] = useState<number | null>(null)

    const bookButton = () => {

    }

    return (
        <div className="p-3" style={{border: "1px solid"}}>
            <h2 className={"text-1xl font-bold"}>Time Slots:</h2>
            <ul className="list-disc">
                {generateTimeSlots(params.schedule).map((slot)=>
                    <SlotButton key={slot.slotNum} slot={slot.slotNum} time={slot.time}
                                booked={slot.status} selected={selectedButton === slot.slotNum} onSelect={setSelectedButton}/>
                )}
            </ul>
            <button
                className={`mt-1 px-4 py-2 mr-1 rounded-md border`}
                onClick={bookButton}>Book</button>
        </div>
    )
}