// @ts-ignore
export default function SlotButton({ slot, booked }) {
    return (
        <button
            onClick={() => {}}
            className={`px-4 py-2 mr-1 rounded-md border 
                ${booked ? "bg-blue-400 text-white" : "bg-white"}`
            }
        >
            {slot}
        </button>
    );
}