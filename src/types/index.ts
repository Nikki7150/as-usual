// Schema for Firestore document
import { Timestamp } from "firebase/firestore";

export interface Task {
    title: string;
    completed: boolean;
    sourceTemplateId: string | null; // tells which template it is connected to
    createdAt: Timestamp;
    userId: string;
    minutesBefore: number | null;
    taskTime: string; // "08:00" format
    date: string; // date of task - "2026-10-07" (YYYY-MM-DD)
}

export interface RecurringTemplate {
    title: string;
    createdAt: Timestamp;
    userId: string;
    minutesBefore: number | null; // minutes before the actual time for reminder 
    taskTime: string; // "08:00" format
    repeatedDays: number[]; // stores Date().getDay()
}
