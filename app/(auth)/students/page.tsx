import {handleFetchData, handleFetchSingleData} from "@/app/(auth)/students/student-actions";
import StudentForm from "@/app/(auth)/students/StudentForm";
import Link from "next/link";

// Save
// Get
// Update
// Delete

// Assignment -- Fetch single student data.

// 1. Create a dynamic route with student id. /students/{studentId} and add a simple page component.
// 2. Add logic on StudentsPage to navigate to dynamic page.
// 3. Collect id on Dynamic student page and fetch data based on that id.
// 4. After fetching data use that data in dynamic component.


async function StudentsPage() {
    const data = await handleFetchData();

    return (
        <div>
            <StudentForm />
            <div>
                {data.map((student: any) => {
                    console.log(student);
                    return (
                        <div key={student.id}>
                            <Link href={`/students/${student.id}`}>{student.name} {student.email}</Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default StudentsPage;
