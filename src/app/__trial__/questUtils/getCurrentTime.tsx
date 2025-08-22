

export default function getCurrentTime(): string {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
}

export function getCurrentDate(): string {
    const today = new Date().toISOString().split("T")[0];
    return today;
}