import StudentCard from "./components/StudentCard";

const students = [
    {
        name: "Jiya",
        city: "Surat",
        state: "Gujarat",
        country: "India",
        course: "Full Stack Development"
    },
    {
        name: "Tisha",
        city: "Surat",
        state: "Gujarat",
        country: "India",
        course: "Full Stack Development"
    },
    {
        name: "Khushi",
        city: "Surat",
        state: "Gujarat",
        country: "India",
        course: "Full Stack Development"
    },
    {
        name: "Anjali",
        city: "Surat",
        state: "Gujarat",
        country: "India",
        course: "Full Stack Development"
    }
];

export default function Home() {
    return (

        <main className="container">
            <h1>Next.js Student Application</h1>

            <p className="subtitle">Welcome to th Next.js Practical Project</p>

            <h2>Student List</h2>

            <div className="student-grid">
                {students.map((student) => (
                    <StudentCard key={student.name}
                    name={student.name}
                    city={student.city}
                    state={student.state}
                    country={student.country}
                    course={student.course}/>
                ))}
            </div>
        </main>
    );
}