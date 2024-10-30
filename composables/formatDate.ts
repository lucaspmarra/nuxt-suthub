export function useFormatDate(input: string, removeTime?: boolean): string {
    if (removeTime && input.includes("-")) {
        const datePart = input.split("T")[0];
        const [year, month, day] = datePart.split("-");
        return `${day}/${month}/${year}`;
    }

    if (input.includes("/")) {
        const [day, month, year] = input.split("/");
        return `${year}-${month}-${day}`;
    } else if (input.includes("-")) {
        const datePart = input.split("T")[0];
        const [year, month, day] = datePart.split("-");
        return `${day}/${month}/${year}`;
    } else {
        throw new Error("Date format is invalid!");
    }
}
