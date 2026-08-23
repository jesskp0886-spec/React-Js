function Welcome(){
    const studentName = "Jiya";
    const course = "Full Stack Development";
    const institute = "Red & White Education";
    const currentDate = new Date().toLocaleDateString();

    return(
        <section className="Welcome">
            <h2>Welcome, {studentName}!</h2>
            <p>
                <strong>Course : </strong> {course}
            </p>
            <p>
                <strong>Institute : </strong> {institute}
            </p>
            <p>
                <strong>Current Date : </strong> {currentDate}
            </p>

            <img src="./student.jpg" alt="Student" className="student-image" />
            
        </section>
    );
}
export default Welcome;