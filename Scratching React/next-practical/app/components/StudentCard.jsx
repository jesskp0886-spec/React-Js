export default function StudentCard({
    name,
    city,
    state,
    country,
    course
})
{ 
    return(
        <div className="student-card">
            <h3>{name}</h3>

            <p>
                <strong>City:</strong>{city}
            </p>
            <p>
                <strong>State:</strong>{state}
            </p>
            <p>
                <strong>Country:</strong>{country}
            </p>
            <p>
                <strong>Course:</strong>{course}
            </p>
        </div>
    );
}