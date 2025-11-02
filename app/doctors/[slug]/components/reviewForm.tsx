import {ChangeEvent, useCallback, useState} from "react";
import {apiClient} from "@/api/client";

interface ReviewFormParams{
    doctorId: string;
}

export default function ReviewForm(params: ReviewFormParams) {
    const [reviewText, setReviewText] = useState("");
    const [ratingBox, setRatingBox] = useState(0);


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setReviewText(e.currentTarget.value);
    }

    function handleRadioButton(e: ChangeEvent<HTMLInputElement>) {
        console.log("score: " + e.currentTarget.value);
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
            <label>
                <input
                    type="radio"
                    value="1"
                    checked={ratingBox === 1}
                    onChange={handleRadioButton}
                /> 1
            </label>
            <label>
                <input
                    type="radio"
                    value="2"
                    checked={ratingBox === 2}
                    onChange={handleRadioButton}
                /> 2
            </label>
            <label>
                <input
                    type="radio"
                    value="3"
                    checked={ratingBox === 3}
                    onChange={handleRadioButton}
                /> 3
            </label>
            <label>
                <input
                    type="radio"
                    value="4"
                    checked={ratingBox === 4}
                    onChange={handleRadioButton}
                /> 4
            </label>
            <label>
                <input
                    type="radio"
                    value="5"
                    checked={ratingBox === 5}
                    onChange={handleRadioButton}
                /> 5
            </label>
        </form>
    )
}