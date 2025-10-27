import main from "../src/index";
import * as fetchPage from "../src/fetchPage";
import * as parseTable from "../src/parseTable";
import * as plotGraph from "../src/plotGraph";
import * as helpers from "../src/helpers";
import {
    mockValidHtmlPage,
    mockInvalidTableMissingNumericColumn,
    mockInvalidHtmlPageMissingTable,
} from "./fixture/index";

// Global spies
const isValidWikipediaUrlSpy: jest.SpyInstance = jest.spyOn(
    helpers,
    "isValidWikipediaUrl"
);
const fetchPageSpy: jest.SpyInstance = jest.spyOn(fetchPage, "default");
const parseTableSpy: jest.SpyInstance = jest.spyOn(parseTable, "default");
const plotGraphSpy: jest.SpyInstance = jest.spyOn(plotGraph, "default");
const consoleErrorSpy: jest.SpyInstance = jest.spyOn(console, "error");

// Global constants
const mockUrl = "https://mock-url.com";

describe("main", () => {
    describe("Given a valid Wikipedia URL with a table containing numeric data", () => {
        it("should fetch the page, extract numerics, plot a graph, and save the image", async () => {
            // Arrange
            process.argv[2] = mockUrl;
            const mockParseTableReturnValue = {
                values: [1.482, 1.517, 1.524, 1.603],
                title: "Mark",
            };
            isValidWikipediaUrlSpy.mockReturnValueOnce(true);
            fetchPageSpy.mockResolvedValueOnce(mockValidHtmlPage);
            parseTableSpy.mockReturnValueOnce(mockParseTableReturnValue);

            // Act
            await main();

            // Assert
            expect(fetchPageSpy).toHaveBeenCalledWith(mockUrl);
            expect(parseTableSpy).toHaveBeenCalledWith(mockValidHtmlPage);
            expect(plotGraphSpy).toHaveBeenCalledWith(
                mockParseTableReturnValue.values,
                mockParseTableReturnValue.title
            );
        });
    });
    describe("Given a valid Wikipedia URL with no numeric table", () => {
        it("should return 'No numeric column found' error and not output an image", async () => {
            // Arrange
            process.argv[2] = mockUrl;
            isValidWikipediaUrlSpy.mockReturnValueOnce(true);
            fetchPageSpy.mockResolvedValueOnce(
                mockInvalidTableMissingNumericColumn
            );

            // Act
            await main();

            // Assert
            expect(fetchPageSpy).toHaveBeenCalledWith(mockUrl);
            expect(parseTableSpy).toHaveBeenCalledWith(
                mockInvalidTableMissingNumericColumn
            );
            expect(plotGraphSpy).not.toHaveBeenCalled();
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "Program terminated early due to: Failed to parse table: Error: No numeric column found"
            );
        });
    });
    describe("Given a valid Wikipedia URL with no table", () => {
        it("should return 'No table found' error and not output an image", async () => {
            // Arrange
            process.argv[2] = mockUrl;
            isValidWikipediaUrlSpy.mockReturnValueOnce(true);
            fetchPageSpy.mockResolvedValueOnce(mockInvalidHtmlPageMissingTable);

            // Act
            await main();

            // Assert
            expect(fetchPageSpy).toHaveBeenCalledWith(mockUrl);
            expect(parseTableSpy).toHaveBeenCalledWith(
                mockInvalidHtmlPageMissingTable
            );
            expect(plotGraphSpy).not.toHaveBeenCalled();
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "Program terminated early due to: Failed to parse table: Error: No table found"
            );
        });
    });
    describe("Given an invalid Wikipedia URL", () => {
        it("should throw error", async () => {
            // Arrange
            process.argv[2] = "invalid-url";
            // isValidWikipediaUrlSpy.mockReturnValueOnce(true);

            // Act
            await main();

            // Assert
            expect(fetchPageSpy).not.toHaveBeenCalled();
            expect(parseTableSpy).not.toHaveBeenCalled();
            expect(plotGraphSpy).not.toHaveBeenCalled();
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "Program terminated early due to: Invalid URL format. Please provide a valid Wikipedia URL"
            );
        });
    });
});
