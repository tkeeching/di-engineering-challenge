import parseTable from "../src/parseTable";
import {
    mockValidHtmlPage,
    mockInvalidHtmlPageMissingTable,
    mockInvalidTableMissingNumericColumn,
    mockInvalidColumnWithSomeRowMissingNumericValues,
    mockColumnWithMissingHeader,
} from "./fixture/index";

describe("parseTable", () => {
    it("should return an array of numeric values if a table is found in the HTML input", () => {
        // Arrange

        // Act
        const result = parseTable(mockValidHtmlPage);

        // Assert
        expect(result).toMatchObject({
            values: [1.482, 1.517, 1.524, 1.603],
            title: "Mark",
        });
    });
    it("should return 'No table found' error when HTML input does not contain any table", () => {
        // Arrange

        // Act
        const operation = () => parseTable(mockInvalidHtmlPageMissingTable);

        // Assert
        expect(operation).toThrow("No table found");
    });
    it("should return 'No numeric column found' error when table does not contain numeric column", () => {
        // Arrange

        // Act
        const operation = () =>
            parseTable(mockInvalidTableMissingNumericColumn);

        // Assert
        expect(operation).toThrow("No numeric column found");
    });
    it("should extract numeric values and ignore non-numeric cells in the numeric column", () => {
        // Arrange

        // Act
        const result = parseTable(
            mockInvalidColumnWithSomeRowMissingNumericValues
        );

        // Assert
        expect(result).toMatchObject({
            values: [1.2, 2.2],
            title: "Test Column 1",
        });
    });
    it("should set title to empty string if column header does not exist", () => {
        // Arrange

        // Act
        const result = parseTable(mockColumnWithMissingHeader);

        // Assert
        expect(result).toMatchObject({
            values: [1.2, 2.2, 3.2],
            title: "",
        });
    });
});
