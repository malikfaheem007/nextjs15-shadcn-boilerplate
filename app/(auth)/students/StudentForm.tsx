"use client"

import {useForm} from "react-hook-form";
import {handleSaveStudentData} from "@/app/(auth)/students/student-actions";

function StudentForm() {
    const {handleSubmit, register} = useForm();

    async function onSubmit(data: any) {
        await handleSaveStudentData(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <input type="email" placeholder="Student Email" {...register("email")}/>
            <input type="text" placeholder="Student Name" {...register("name")}/>
            <button type="submit">Save</button>

        </form>
    );
}

export default StudentForm;
