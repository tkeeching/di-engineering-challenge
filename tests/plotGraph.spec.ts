import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import fs from "node:fs";
import path from "node:path";
import plotGraph from "../src/plotGraph";

// Mocks
jest.mock("chartjs-node-canvas");
jest.mock("node:fs", () => ({
    ...jest.requireActual("node:fs"),
    existsSync: jest.fn(),
    promises: {
        mkdir: jest.fn(),
        writeFile: jest.fn(),
    },
}));
jest.mock("node:path", () => ({
    ...jest.requireActual("node:path"),
    join: jest.fn(),
}));

describe("plotGraph", () => {
    const mockBuffer = Buffer.from("mock-image-data");
    const mockValues = [1.5, 2.0, 2.5, 3.0];
    const mockYTitle = "Test Height (m)";

    beforeEach(() => {
        // Default mocks
        (ChartJSNodeCanvas as jest.Mock).mockImplementation(() => ({
            renderToBuffer: jest.fn().mockResolvedValue(mockBuffer),
        }));
        (path.join as jest.Mock).mockReturnValue("output/output.png");
        (fs.existsSync as jest.Mock).mockReturnValue(false);
        (fs.promises.mkdir as jest.Mock).mockResolvedValue(undefined);
        (fs.promises.writeFile as jest.Mock).mockResolvedValue(undefined);
    });

    it("should create a graph with correct configuration", async () => {
        // Arrange

        // Act
        await plotGraph(mockValues, mockYTitle);

        // Assert
        expect(ChartJSNodeCanvas).toHaveBeenCalledWith({
            width: 800,
            height: 600,
            backgroundColour: "white",
        });

        // Get the mock instance and verify renderToBuffer was called
        const mockChartInstance = (ChartJSNodeCanvas as jest.Mock).mock
            .results[0].value;
        const renderToBufferCall =
            mockChartInstance.renderToBuffer.mock.calls[0][0];

        expect(renderToBufferCall).toMatchObject({
            type: "line",
            data: {
                labels: ["Record 1", "Record 2", "Record 3", "Record 4"],
                datasets: [
                    {
                        label: "Numeric Progression",
                        data: mockValues,
                        borderColor: "blue",
                        pointBackgroundColor: "white",
                        fill: false,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        title: { display: true, text: mockYTitle },
                        beginAtZero: false,
                    },
                },
            },
        });
    });

    it("should create output directory if it doesn't exist", async () => {
        // Arrange

        // Act
        await plotGraph(mockValues, mockYTitle);

        // Assert
        expect(fs.existsSync).toHaveBeenCalledWith("output");
        expect(fs.promises.mkdir).toHaveBeenCalledWith("output", {
            recursive: true,
        });
    });

    it("should not create output directory if it already exists", async () => {
        // Arrange
        (fs.existsSync as jest.Mock).mockReturnValue(true);

        // Act
        await plotGraph(mockValues, mockYTitle);

        // Assert
        expect(fs.existsSync).toHaveBeenCalledWith("output");
        expect(fs.promises.mkdir).not.toHaveBeenCalled();
    });

    it("should write buffer to the correct output file", async () => {
        // Arrange

        // Act
        await plotGraph(mockValues, mockYTitle);

        // Assert
        expect(path.join).toHaveBeenCalledWith("output", "output.png");
        expect(fs.promises.writeFile).toHaveBeenCalledWith(
            "output/output.png",
            mockBuffer
        );
    });

    it("should throw error when chart rendering fails", async () => {
        // Arrange
        const mockError = new Error("Chart rendering failed");
        (ChartJSNodeCanvas as jest.Mock).mockImplementation(() => ({
            renderToBuffer: jest.fn().mockRejectedValue(mockError),
        }));

        // Act

        // Assert
        await expect(plotGraph(mockValues, mockYTitle)).rejects.toThrow(
            "Failed to plot graph: Error: Chart rendering failed"
        );
    });

    it("should throw error when file writing fails", async () => {
        // Arrange
        const mockError = new Error("Write failed");
        (fs.promises.writeFile as jest.Mock).mockRejectedValue(mockError);

        // Act

        // Assert
        await expect(plotGraph(mockValues, mockYTitle)).rejects.toThrow(
            "Failed to plot graph: Error: Write failed"
        );
    });
});
