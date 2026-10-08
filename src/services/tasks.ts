// Write tasks to firestore through code
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Task } from "@/types";

// everything the caller gives
export type NewTask = Omit<Task, "createdAt" | "completed">; 

// this function fills in the rest
export async function addTask(task: NewTask) {
    const taskRef = collection(db, "users", task.userId, "days", task.date, "tasks");
    // generates unique id for new document with addDoc
    const docRef = await addDoc(taskRef, {
        ...task,
        completed: false,
        createdAt: serverTimestamp(), 
    });
    return docRef.id;
}