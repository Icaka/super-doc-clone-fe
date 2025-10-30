import {ChangeEvent, useCallback, useState} from "react";
import {apiClient} from "@/api/client";

interface ReviewFormParams{
    doctorId: string;
}

export default function ReviewForm(params: ReviewFormParams) {
    const [reviewText, setReviewText] = useState("");


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setReviewText(e.currentTarget.value);
    }

    const createReview = useCallback(async () => {
        await apiClient.createReview(params.doctorId, 3, reviewText);
    }, [params, reviewText])

    return (
        <form>
            <button style={{padding: '10px 8px',backgroundColor: 'skyblue', marginTop: '20%'}}
                    onClick={createReview}
                    color="#841584"
            >Review!</button>
            <label>Review:
                <input style={{border:'solid'}}
                    type="text"
                    value={reviewText}
                    onChange={handleChange}
                />
            </label>
        </form>
    )
}