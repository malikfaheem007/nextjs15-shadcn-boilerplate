'use client'
import {Button} from "@/components/ui/button";
import {handleDeleteStudent} from "@/app/(auth)/students/student-actions";

function DeleteStudentButton({studentId}: any) {
    return (
        <div>
            <Button onClick={() => handleDeleteStudent(studentId)}>Delete</Button>
        </div>
    );
}

export default DeleteStudentButton;
