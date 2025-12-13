// @ts-ignore
type SlotButtonProps = {
    slot: number;
    time: string;
    booked: boolean,
    selected: boolean;
    onSelect: (slot: number) => void;
};

export default function SlotButton({ slot, time, booked, selected, onSelect}: SlotButtonProps) {

    return (
        <button
            onClick={() => onSelect(slot)}
                className={`px-4 py-2 mr-1 rounded-md border
                ${booked ? "bg-blue-400 text-white hover:bg-sky-700" : " hover:bg-red-200"}
                ${selected ? "bg-violet-700 border-blue-600" : " hover:bg-gray-100"}`

            }
        >
            {time}
        </button>
    );
}