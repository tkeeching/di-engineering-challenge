import axios from "axios";

export default async function fetchPage(url: string): Promise<string> {
    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
                    "AppleWebKit/537.36 (KHTML, like Gecko) " +
                    "Chrome/142.0.0.0 Safari/537.36",
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error(
                "Article not found. Please make sure URL is valid."
            );
        } else {
            throw new Error(`Failed to fetch page: ${error}`);
        }
    }
}
