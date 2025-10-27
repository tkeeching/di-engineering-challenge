export const mockValidHtmlPage = `
<html>
    <head>
    </head>
    <body>
        <main>
            <table class="wikitable">
                <thead>
                    <tr>
                        <th>Mark</th>
                        <th>Athelete</th>
                        <th>Date</th>
                        <th>Venue</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1.482 m</td>
                        <td>Eleanor Egg (USA)</td>
                        <td>13 February 1926</td>
                        <td>Newark</td>
                    </tr>
                    <tr>
                        <td>1.517 m</td>
                        <td>Mildred Wiley(USA)</td>
                        <td>16 February 1928</td>
                        <td>Newark</td>
                    </tr>
                    <tr>
                        <td>1.524 m</td>
                        <td>Mildred Wiley (USA)</td>
                        <td>10 March 1928</td>
                        <td>Newark</td>
                    </tr>
                    <tr>
                        <td>1.603 m</td>
                        <td>Jean Shiley (USA)</td>
                        <td>30 March 1929</td>
                        <td>Newark</td>
                    </tr>
                </tbody>
            </table>
        </main>
    </body>
</html>
`;

export const mockInvalidHtmlPageMissingTable = `
<html>
    <head>
    </head>
    <body>
        <main>
        </main>
    </body>
</html>
`;

export const mockInvalidTableMissingNumericColumn = `
<html>
    <head>
    </head>
    <body>
        <main>
            <table class="wikitable">
                <tbody>
                    <tr>
                        <td>mock-value</td>
                        <td>mock-value</td>
                        <td>mock-value</td>
                    </tr>
                    <tr>
                        <td>mock-value</td>
                        <td>mock-value</td>
                        <td>mock-value</td>
                    </tr>
                </tbody>
            </table>
        </main>
    </body>
</html>
`;

export const mockInvalidColumnWithSomeRowMissingNumericValues = `
<html>
    <head>
    </head>
    <body>
        <main>
            <table class="wikitable">
                <thead>
                    <tr>
                        <th>Test Column 1</th>
                        <th>Test Column 2</th>
                        <th>Test Column 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1.2</td>
                        <td>mock-value</td>
                        <td>mock-value</td>
                    </tr>
                    <tr>
                        <td>2.2</td>
                        <td>mock-value</td>
                        <td>mock-value</td>
                    </tr>
                    <tr>
                        <td>mock-value</td>
                        <td>mock-value</td>
                        <td>mock-value</td>
                    </tr>
                </tbody>
            </table>
        </main>
    </body>
</html>
`;

export const mockColumnWithMissingHeader = `
<html>
    <head>
    </head>
    <body>
        <main>
            <table class="wikitable">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1.2</td>
                        <td>mock-value</td>
                        <td>mock-value</td>
                    </tr>
                    <tr>
                        <td>2.2</td>
                        <td>mock-value</td>
                        <td>mock-value</td>
                    </tr>
                    <tr>
                        <td>3.2</td>
                        <td>mock-value</td>
                        <td>mock-value</td>
                    </tr>
                </tbody>
            </table>
        </main>
    </body>
</html>
`;
