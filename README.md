# Detector Inspector Engineering Challenge

## Overview

This Node.js program fetches a Wikipedia page via a URL, parses the
first table for a numeric column, extracts the numerical values, and generates a line graph
as a PNG image.

## Design Approach

-   **Modular**: Separate core functionality into individual functions ([`fetchPage`](./src/fetchPage.ts),
    [`parseTable`](./src/parseTable.ts), [`plotGraph`](./src/plotGraph.ts)) which are then invoked in the [`main`](./src/index.ts) function.
    This allows for separation of concerns as well as easy testing and debugging. They can also be easily extended to
    handle more complex requirements.
-   **TDD/BDD**: Wrote tests first (eg., mock HTML for parsing) to ensure reliability.
    [BDD requirements](./BDD.md) were established prior to implementation as a guide for implementing the
    unit tests for the [`fetchPage`](./src/fetchPage.ts) and [`parseTable`](./src/parseTable.ts) functions. In the interest of time,
    the requirements for [`plotGraph`](./src/plotGraph.ts) have not been documented, which can be an improvement
    for the next revision. Each of the core functions
    has their accompanying unit tests which can be found in [`tests/`](./tests). The test coverage threshold is set to 80%.
-   **Error Handling**: Checks for no table/column and invalid numbers. Each core functions are
    wrapped in `try...catch` block which allows for early error detection and more granular error messages such as invalid URL and any downstream errors.
-   **Scalability**: Currently, the program only parses one table from a Wikipedia page
    and runs locally in a Node.js environment. This could be extend to handle multiple tables as
    well as being hosted as serverless function via Firebase Cloud Functions/AWS Lambda for ease of access.

## Assumptions

1. The input is a Wikipedia URL
   (eg. https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression).
2. The output is a graph image in PNG format, named `output.png`.
3. Table is in standard HTML format, and first table found is the target.
4. Table in Wikipedia has class attribute 'wikitable'.
5. Numeric column is the one with float/integer values.
6. Numeric column could have different units, such as metre (m), second (s), etc.
7. Error handling: Handle edge cases such as invalid URLs, empty table or non-numeric data.
8. No authentication or rate-limiting issues given the input URL is public data
   (eg. Wikipedia).
9. No external APIs, program is self-contained.

## Getting Started

Follow the steps below to setup the project and run the program on your computer.

### Prerequisites

Make sure you have the following version of Node.js and npm or later.

-   Node.js: v20.10.0
-   npm: v6.14.5

### Setup

1. Clone this repo to your local computer with `git clone https://github.com/tkeeching/di-engineering-challenge.git`
2. Navigate to the root of the cloned repo with `cd di-engineering-challenge`, and install Node dependencies with `npm install`

### Run

1. To start the program, run: `npm start <wikipedia-url>`, for example,

    ```
    npm start https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression
    ```

2. List of URLs to try,

    ```
    Valid URLs:
    "https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression"
    "https://en.wikipedia.org/wiki/Men%27s_100_metres_world_record_progression"
    "https://en.wikipedia.org/wiki/Women%27s_100_metres_world_record_progression"

    Invalid URLs:
    Not using https: "https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression"
    Invalid format: "https://en.wikipedia.org/Women%27s_high_jump_world_record_progression"
    Missing article path: "https://en.wikipedia.org/wiki/"
    Non-Wikipedia: "https://google.com"
    ```

3. The graph image output can be found in [`output/`](./output) folder

    Sample graph image output,

    ![sample output png](/sample/output.png)

### Test

To run the unit tests, run `npm test`. After the test has completed, you will get a coverage report that looks like the following image. (coverage report is stored in `coverage/` folder)

    ![coverage](/sample/coverage.png)

## Potential Improvements

-   Currently, the program retrieves the first table it encounters. This could create issue
    if the first table is empty or does not contain numeric values. The
    program can be extended to add checks if the first table contains valid data,
    if not, it should keep scanning the page for the next table with valid data.
-   Currently, the legend in the graph is hardcoded as 'Numeric Progression' in the
    config. This can potentially be enhanced to better reflect the data by dynamically
    selecting a more meaningful label based on the table data.
-   Currently, the error messages are plain texts used directly within each functions and
    their corresponding unit tests. This can be refactored to have the texts stored as
    constants within a single file (eg. constants.ts) where they can then be referenced
    wherever needed.
-   Currently, the program only runs locally in a Node.js environment which requires
    the user to have basic technical knowledge to setup and run. Further improvement
    can be made to create a front end UI which is more user-friendly and can cater to
    non-technical users.
-   The program can also be built using Python to keep it lightweight and remove
    unnecessary dependencies.
