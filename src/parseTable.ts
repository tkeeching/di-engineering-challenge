import * as cheerio from "cheerio";

type ParseTableResponse = {
    values: number[];
    title: string;
};

export default function parseTable(html: string): ParseTableResponse {
    try {
        const $ = cheerio.load(html);
        const table = $("table.wikitable").first(); // Assume first wikitable is what we want

        if (!table.length) throw new Error("No table found");

        const rows = table.find("tr");

        // Used to determine y-axis title
        const headers = rows
            .first()
            .find("th")
            .map((_, el) => $(el).text().trim())
            .get();

        let numericColumnIndex = -1; // Initialize to -1 to indicate no numeric column found yet
        const values: number[] = []; // Array to hold values extracted from first numeric column
        let title = ""; // Column title to be used for y-axis of graph

        // Find numeric column
        rows.slice(1).each((_, row) => {
            // Skip header
            $(row)
                .find("td")
                .each((i, cell) => {
                    const text = $(cell).text().trim();
                    const num = parseFloat(text);
                    if (!isNaN(num) && numericColumnIndex === -1) {
                        numericColumnIndex = i; // First potential
                        title = headers[i] || "";
                    }
                });
        });

        if (numericColumnIndex === -1)
            throw new Error("No numeric column found");

        // Extract from that column
        rows.slice(1).each((_, row) => {
            const cellText = $(row)
                .find("td")
                .eq(numericColumnIndex)
                .text()
                .trim();
            const num = parseFloat(cellText);
            if (!isNaN(num)) values.push(num);
        });

        /* istanbul ignore next */  
        // unlikely to happen given that related error would have been caught on line 43 in most cases
        if (values.length === 0) throw new Error("No numeric values extracted");

        return { values, title };
    } catch (error) {
        throw new Error(`Failed to parse table: ${error}`);
    }
}
