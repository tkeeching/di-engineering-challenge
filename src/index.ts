import fetchPage from "./fetchPage";
import { isValidWikipediaUrl } from "./helpers";
import parseTable from "./parseTable";
import plotGraph from "./plotGraph";

export default async function main() {
    console.info("================");
    console.info("START OF PROGRAM");
    console.info("================");

    const url = process.argv[2];    // taking URL input from cli
    /**
     * Example of URLs to try:
     * Valid URLs:
     * "https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression"
     * "https://en.wikipedia.org/wiki/Men%27s_100_metres_world_record_progression"
     * "https://en.wikipedia.org/wiki/Women%27s_100_metres_world_record_progression"
     * "https://en.wikipedia.org/wiki/Apple"
     *
     * Invalid URLs:
     * Not using https: "http://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression"
     * Invalid format: "https://en.wikipedia.org/Women%27s_high_jump_world_record_progression"
     * Missing article path: "https://en.wikipedia.org/wiki/"
     * Non-Wikipedia: "https://google.com"
     */

    try {
        if (!url) {
            throw new Error("No URL provided. Please provide a URL");
        }

        const trimmedUrl = url.trim();

        if (!isValidWikipediaUrl(trimmedUrl)) {
            throw new Error(
                "Invalid URL format. Please provide a valid Wikipedia URL"
            );
        }

        console.info(`Fetching page from ${trimmedUrl} ...`);
        const html = await fetchPage(trimmedUrl);

        console.info(`Parsing table...`);
        const { values, title: yTitle } = parseTable(html);

        console.info(`Plotting graph and saving to output.png...`);
        await plotGraph(values, yTitle);

        console.info("Graph saved to output/output.png");
    } catch (error) {
        console.error(`Program terminated early due to: ${error.message}`);
    } finally {
        console.info("==============");
        console.info("END OF PROGRAM");
        console.info("==============");
    }
}

main();
