import React, { useMemo, useState } from "react";
import FontAwesomeIcon from "../../../../node_modules/react-fontawesome";
function Vote(props) {

    const { count, rating, color, onRating } = props;
    const [hoverRating, setHoverRating] = useState(0);

    const getColor = (index) => {
        if (hoverRating >= index) {
            return color.filled;
        } else if (!hoverRating && rating >= index) {
            return color.filled;
        }

        return color.unfilled;
    };

    const starRating = useMemo(() => {
        return Array(count)
            .fill(0)
            .map((_, i) => i + 1)
            .map((idx) => (
                <i 
                key={idx} 
                className="fa fa-star cursor-pointer" 
                onClick={() => onRating(idx)}
                style={{ color: getColor(idx) }}
                onMouseEnter={() => setHoverRating(idx)}
                onMouseLeave={() => setHoverRating(0)}>
                </i>
            ));
    }, [count, rating, hoverRating]);
    return (
        <div className="vote">{starRating}</div>
    );
}
export default Vote;