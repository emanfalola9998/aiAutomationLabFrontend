export default function formatDateWithConditionalYear(input: string) {
    if (!input) return "blogs not present";

    let day, month, year;
    const currentYear = new Date().getFullYear();

    if (input.includes("/")) {
        const parts = input.split("/");
        if (parts.length === 2) {
            [day, month] = parts;
            year = currentYear;
        } else if (parts.length === 3) {
            [day, month, year] = parts;
            year = parseInt(year, 10);
        } else {
            throw new Error("Invalid date format. Use DD/MM or DD/MM/YYYY");
        }
    } else if (input.includes("-")) {
        // ISO format YYYY-MM-DD
        [year, month, day] = input.split("-");
        year = parseInt(year, 10);
    } else {
        throw new Error("Invalid date format.");
    }

    const date = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);

    const options =
        year === currentYear
            ? { month: "short", day: "numeric" }
            : { month: "short", day: "numeric", year: "numeric" };

    return date.toLocaleDateString("en-US", options);
}
