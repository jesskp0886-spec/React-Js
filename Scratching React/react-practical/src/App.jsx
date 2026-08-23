import { useEffect, useState } from 'react'
import Header from './Component/Header'
import Welcome from './Component/Welcome'
import Footer from './Component/Footer'
import StudentCard from './Component/StudentCard'
import './App.css'
import { use } from 'react'

function App() {
  const array1 = ["HTML", "CSS", "javaScript"];
  const array2 = ["React", "Node.js", "Next.js"];
  const mergedArray = [...array1, ...array2];
  const object1 = {
    name: "Jiya",
    course:"Full Stack Development"
  };

  const object2 = {
    city: "Surat",
    country:"India"
  };

  const mergedObject = {
    ...object1,
    ...object2
  };

  const copiedObject = {
    ...object1
  };

  function calculateTotal(...numbers){
    return numbers.reduce((total, number) => total + number, 0);
  }

  const restResult = calculateTotal(10, 20, 30, 40);

  const [name, setName] = useState("Student");
  const [number, setNumber] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [subjects, setSubjects] = useState(["React", "JavaScript"]);

  const [student, setStudent] = useState({
    name: "Student",
    course: "Full Stack Development"
  });


  const[studentName, setStudentName] = useState("");
  const[studentList, setStudentList] = useState(() => {
    const savedStudents = localStorage.getItem("students");

    return savedStudents? JSON.parse(savedStudents) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "students",JSON.stringify(studentList)
    );
  }, [studentList]);

  function addStudent(){
    if(studentName.trim() === ""){
      return;
    }

    setStudentList([
      ...studentList,studentName
    ]);

    setStudentName("");
  }

  function deleteStudent(index) {
    const updateStudents = studentList.filter(
      (_, i) => i !== index
    );
    setStudentList(updateStudents);
  }

  function resetStates() {
    setName("Student");
    setNumber(0);
    setIsActive(false);
    setSubjects(["React", "JavaScript"]);

    setStudent({
      name: "Student",
      course: "Full Stack Development"
    });
  }


  return (
    <>
      <div>
        <Header/>
          <main className="container">
            <Welcome/>

            <section className="section">

              <h2>Task 3 : Rest & Spread Operator</h2>

              <div className="output-box">
                <h3>Merge Two Arrays</h3>

                <p>{mergedArray.join(", ")}</p>

                <h3>Merge Two Object</h3>

                <p>{JSON.stringify(mergedObject)}</p>

                <h3>Rest Operator function</h3>

                <p>Total : {restResult}</p>

              </div>
            </section>

            <section className="section">
              
              <h2>Task 4 : Props - Student Cards</h2>

              <div className="student-grid">

                <StudentCard
                  name="Jiya"
                  city="Surat"
                  state="Gujarat"
                  country="India"
                  course="Full Stack Development"
                />

                <StudentCard
                  name="Tisha"
                  city="Surat"
                  state="Gujarat"
                  country="India"
                  course="Full Stack Development"
                />

                <StudentCard
                  name="Mahek"
                  city="Surat"
                  state="Gujarat"
                  country="India"
                  course="Full Stack Development"
                />

                <StudentCard
                  name="Riya"
                  city="Surat"
                  state="Gujarat"
                  country="India"
                  course="Full Stack Development"
                />

                <StudentCard
                  name="Jenny"
                  city="Surat"
                  state="Gujarat"
                  country="India"
                  course="Full Stack Development"
                />

              </div>
            </section>

            <section className="section">

              <h2>Task 5 : useState Examples</h2>

              <div className="state-box">

                <h3>String State</h3>

                <p>{name}</p>

                <button onClick={() => setName("React Student")}>Update String</button>

                <h3>Number State</h3>

                <p>{number}</p>

                <button onClick={() => setNumber(number + 1)}>Add Number</button>

                <h3>Boolean State</h3>

                <p>{isActive ? "Active" : "Inactive"}</p>

                <button onClick={() => setIsActive(!isActive)}>Change Boolean</button>

                <h3>Array State</h3>

                <p>{subjects.join(", ")}</p>

                <button onClick={() => setSubjects([...subjects, "Next.js", "HTML", "CSS","BootStrap"])}>Add Subject</button>

                <h3>Object State</h3>

                <p>{student.name} - {student.course}</p>

                <button onClick={() => setStudent({...student, name: "Update Student"})}>Update Object</button>

                <br />

                <button className="reset-button" onClick={resetStates}>Reset Data</button>

              </div>
            </section>

            <section className="section">

              <h2>Task 6 : Student Information Manager</h2>

              <div className="manager">

                <input type="text" placeholder="Enter Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />

                <button onClick={addStudent}>Add Student</button>

                <h3>Student List</h3>
                {studentList.length === 0 ? ( 
                  <p>No students added yet.</p>
                ) : ( 
                  <ul>
                    {studentList.map((stu, index) => (
                      <li key={index}>
                        {stu}
                        <button onClick={() => deleteStudent(index) }>Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
            
          </main>
        <Footer/>
      </div>
    </>
  );
}

export default App;


