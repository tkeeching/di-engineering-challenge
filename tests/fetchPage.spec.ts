import axios from "axios";
import * as fetchPage from "../src/fetchPage";
import { mockValidHtmlPage } from "./fixture/index";

// Mocks
jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("fetchPage", () => {
    it("should fetch HTML content when URL is valid", async () => {
        // Arrange
        const validUrl = "https://en.wikipedia.org/wiki/mock-article";
        mockAxios.get.mockResolvedValueOnce({ data: mockValidHtmlPage });

        // Act
        const result = await fetchPage.default(validUrl);

        // Assert
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(result.indexOf("<html>")).toBeTruthy();
        expect(result.indexOf("</html>")).toBeTruthy();
    });
    it("should return 404 error when no Wikipedia page is found with the URL", async () => {
        // Arrange
        const validUrl = "https://en.wikipedia.org/wiki/mock-article";
        mockAxios.get.mockRejectedValueOnce(new Error("mock-error"));

        // Act
        const result = fetchPage.default(validUrl);

        // Assert
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        await expect(result).rejects.toThrow("mock-error");
    });
    it("should show meaningful error when Wikipedia page is not found", async () => {
        // Arrange
        const validUrl = "https://en.wikipedia.org/wiki/mock-article";
        const mockError = {
            response: {
                status: 404,
            },
        };
        mockAxios.get.mockRejectedValueOnce(mockError);

        // Act
        const result = fetchPage.default(validUrl);

        // Assert
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        await expect(result).rejects.toThrow(
            "Article not found. Please make sure URL is valid."
        );
    });
    it("should throw unexpected error when failed to fetch from URL", async () => {
        // Arrange
        const validUrl = "https://en.wikipedia.org/wiki/mock-article";
        mockAxios.get.mockRejectedValueOnce(new Error("mock-error"));

        // Act
        const result = fetchPage.default(validUrl);

        // Assert
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        await expect(result).rejects.toThrow("mock-error");
    });
});
