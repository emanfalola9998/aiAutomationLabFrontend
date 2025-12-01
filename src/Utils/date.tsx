export default function formatDateWithConditionalYear(input: string) {
    if(!input){
        return "blogs not present"
    }
    
    const parts = input.split("/") 
    
    let day, month, year;
    const currentYear = new Date().getFullYear();

    if (parts.length === 2) {
        // No year provided, use current year
        [day, month] = parts;
        year = currentYear;
    } else if (parts.length === 3) {
        [day, month, year] = parts;
        year = parseInt(year, 10);
    } else {
        throw new Error("Invalid date format. Use DD/MM or DD/MM/YYYY");
    }

    // Create Date object in ISO format YYYY-MM-DD
    const date = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);

    // Format options based on year condition
    const options = (year === currentYear)
        ? { month: "long", day: "numeric" }               // current year: "March 24"
        : { month: "long", day: "numeric", year: "numeric" }; // other year: "March 24, 2024"

    return date.toLocaleDateString("en-US", options);
}

// Examples:
console.log(formatDateWithConditionalYear("24/03"));        // March 24 (current year)
console.log(formatDateWithConditionalYear("24/03/2025"));   // March 24 (assuming 2025 is current year)
console.log(formatDateWithConditionalYear("24/03/2024"));   // March 24, 2024 (different year)
