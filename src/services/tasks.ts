// Write tasks to firestore through code
import { collection, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
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
};

export type TasksCallback = (tasks: Task[]) => void;

export async function subscribeToTasks(userId: string, date: string, callback: TasksCallback) {
    const taskRef = collection(db, "users", userId, "days", date, "tasks");
    const unsubscribe = onSnapshot(taskRef, (querySnapshot) => {
        const taskList: Task[] = [];
        querySnapshot.forEach((doc) => {
            taskList.push({
                id: doc.id,
                ...(doc.data() as Omit<Task, "id">)
            } as Task);
        });
        callback(taskList);
    }, (error) => {
        console.error("Error listening to task change: ", error);
    });
    return unsubscribe;
};