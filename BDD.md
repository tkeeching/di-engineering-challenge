**Feature: Validate Wikipedia URL Input**

    As a user
    I want the program to validate the provided Wikipedia URL
    so that invalid inputs are handled gracefully and prevent errors downstream

Scenario 1: Valid Wikipedia URL is accepted

    Given a valid Wikipedia URL
    When the URL is submitted
    Then the program accepts it
    And proceeds to content extraction

Scenario 2: URL with special characters is handled if valid

    Given a valid URL with special characters like "https://en.wikipedia.ord/wiki/Women%27s_
    When the URL is submitted
    Then the program decodes it correctly
    And proceeds to content extraction

Scenario 3: Invalid Wikipedia URL format is rejected

    Given an invalid Wikipedia URL
    When the URL is submitted
    Then the program returns an error message "Invalid URL format"
    And suggests checking the URL

Scenario 4: Non-Wikipedia URL format is rejected

    Given a non-Wikipedia URL like "https://example.com/wiki/article"
    When the URL is submitted
    Then the program returns an error message "URL must be from Wikipedia"
    And suggests checking the URL

Scenario 5: URL with missing article path is rejected

    Given a URL like "https://en.wikipedia.org/"
    When the URL is submitted
    Then the program returns an error message "URL must point to a specific Wikipedia article"
    And suggests checking the URL

Scenario 6: Handle network error or timeout

    Given a URL that causes a network timeout
    When the program attempts to fetch the page
    Then it retries once and then throws an error message "Network timeout"
    And does not crash the application

---

**Feature: Extract table from Wikipedia URL**

    As a user
    I want to parse the first relevant table from the fetched HTML
    So that I can identify structured data for numeric analysis

Scenario 1: Parse a standard Wikipedia table

    Given HTML containing a table with rows and columns
    When the program parses the tables
    Then it extracts the first table as a 2D array or object
    And the data includes headers and at least one row of values

Scenario 2: Handle page with no tables

    Given HTML without any <table> elements
    When the program attempts to parse tables
    Then it throws an error message "No tables found on the page"
    And suggests checking the URL

Scenario 3: Handle malformed or incomplete tables

    Given HTML with a table missing rows or columns
    When the program parses the table
    Then it skips invalid rows and extracts available data
    And logs warnings for incomplete structures
