// @ts-ignore
type SlotButtonProps = {
    slot: number;
    time: string;
    booked: boolean,
    selected: boolean;
    onSelect: (booked: boolean, slot: number) => void;
};

export default function SlotButton({ slot, time, booked, selected, onSelect}: SlotButtonProps) {

    return (
        <button
            onClick={() => onSelect(booked, slot)}
                className={`px-4 py-2 mr-1 rounded-md border
                ${booked && "bg-blue-400 text-white hover:bg-sky-700"}
                ${selected ? "bg-teal-300 hover:bg-teal-300" : "hover:bg-red-200"}`

            }
        >
            {time}
        </button>
    );
}