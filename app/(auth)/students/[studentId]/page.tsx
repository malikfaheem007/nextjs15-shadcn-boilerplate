import { handleFetchStudentData} from "@/app/(auth)/students/student-actions";
import DeleteStudentButton from "@/app/(auth)/students/[studentId]/DeleteStudentButton";

async function StudentPage({params}: any) {
    const studentId = (await params).studentId;

    const studentData = await handleFetchStudentData(studentId);

    console.log(studentData);

    return <div>
        <p>Name: {studentData.name}</p>
        <p>Email: {studentData.email}</p>

        <DeleteStudentButton studentId={studentId} />

    </div>
}

export default StudentPage;
