import {ChangeEvent, useCallback, useState} from "react";
import {apiClient} from "@/api/client";

interface ReviewFormParams{
    doctorId: string;
}

export default function ReviewForm(params: ReviewFormParams) {
    const [reviewText, setReviewText] = useState("");
    const [ratingBox, setRatingBox] = useState(0);
    const arr = [1, 2, 3, 4, 5];

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setReviewText(e.currentTarget.value);
    }

    function handleRadioButton(e: ChangeEvent<HTMLInputElement>) {
        setRatingBox(parseInt(e.currentTarget.value));
    }

    const createReview = useCallback(async () => {
        await apiClient.createReview(params.doctorId, ratingBox, reviewText);
    }, [params, reviewText, ratingBox])

    return (
        <form>
            <button style={{padding: '10px 8px',backgroundColor: 'skyblue'}}
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
            <p>Rate doctor:</p>
            {arr.map((i)=>
                <label key={i}>
                    <input
                        type="radio"
                        value={i}
                        checked={ratingBox === i}
                        onChange={handleRadioButton}
                    /> {i}
                </label>
            )}
        </form>
    )
}