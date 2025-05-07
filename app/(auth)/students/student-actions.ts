'use server'

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export async function handleSaveStudentData(data) {
    const supabase = await createClient();

    const myData = { name: data.name, email: data.email };

    const { error } = await supabase
        .from('students')
        .insert(myData)

    console.log(error);
}

export async function handleFetchData() {
    const supabase = await createClient();
    const { error, data } = await supabase
        .from('students')
        .select("id, email, name")

    if(error) {
        return [];
    }

    return data;
}

export async function handleFetchStudentData(studentId: any) {
    const supabase = await createClient();
    const { error, data } = await supabase
        .from('students')
        .select("name")
        .eq("id", studentId)
        .single()

    if(error) {
        throw new Error("Error fetching student data");
    }


    return data;
}

export async function handleDeleteStudent(studentId: string) {
    const supabase = await createClient();

    const {error} = await supabase.from("students").delete().eq("id", studentId);

    if(error) {
        throw new Error("Error fetching student data");
    }


    redirect("/students");
}
