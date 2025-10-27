import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import fs from "node:fs";
import path from "node:path";

export default async function plotGraph(
    values: number[],
    yTitle: string
): Promise<void> {
    try {
        const width = 800;
        const height = 600;
        const backgroundColour = "white";
        const canvasRenderService = new ChartJSNodeCanvas({
            width,
            height,
            backgroundColour,
        });

        const configuration = {
            type: "line",
            data: {
                labels: values.map((_, i) => `Record ${i + 1}`),
                datasets: [
                    {
                        label: "Numeric Progression",
                        data: values,
                        borderColor: "blue",
                        pointBackgroundColor: "white",
                        fill: false,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        title: { display: true, text: yTitle },
                        beginAtZero: false,
                    },
                },
            },
        };

        const buffer = await canvasRenderService.renderToBuffer(
            configuration as any
        );

        const folderName = "output";
        const fileName = "output.png";
        const outputPath = path.join(folderName, fileName);

        // Create output folder if it does not exist
        if (!fs.existsSync(folderName)) {
            await fs.promises.mkdir(folderName, { recursive: true });
        }

        await fs.promises.writeFile(outputPath, buffer);
    } catch (error) {
        throw new Error(`Failed to plot graph: ${error}`);
    }
}
