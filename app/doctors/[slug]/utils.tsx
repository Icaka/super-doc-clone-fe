import {Schedule} from "@/api/models"

export const generateTimeSlots = (schedule: Schedule | null) => {
    const slots: {slotNum: number, time: string, status: boolean}[] = [];

    if(schedule != undefined) {
        const date = new Date();
        const startHour = schedule?.start;
        if (startHour != null) {
            date.setHours(parseInt(startHour.split(":")[0]));
        }
        date.setMinutes(0);
        let i = 0;
        while (i < schedule?.count) {
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");

            let status = schedule?.bookedSlots.includes(i+1);
            let time = `${hours}:${minutes}`;
            let slotNum: number = i + 1;
            slots.push({slotNum, time, status});
            date.setMinutes(date.getMinutes() + 30);
            i++;
        }
    }
    return slots;
};