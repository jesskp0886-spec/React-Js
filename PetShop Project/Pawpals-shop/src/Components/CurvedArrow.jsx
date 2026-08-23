import React from "react";
import "./CurvedArrow.css";

const CurvedArrow = () => {
    return (
        <svg
            className="curved-arrow"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Curved arrow line */}
            <path
                d="M8 29 C12 18, 18 10, 30 8"
                className="arrow-line"
            />

            {/* Arrow head */}
            <path
                d="M22 7 L30 8 L27 16"
                className="arrow-head"
            />
        </svg>
    );
};

export default CurvedArrow;