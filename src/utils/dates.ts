export function getTodayString() {
    return new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD" in YOUR timezone
}