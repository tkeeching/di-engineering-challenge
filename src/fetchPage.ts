import axios from "axios";

export default async function fetchPage(url: string): Promise<string> {
    try {
        const response = await axios.get(url);
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
