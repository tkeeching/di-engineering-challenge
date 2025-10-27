import { isValidWikipediaUrl } from "../src/helpers";

describe("helper functions", () => {
    describe("isValidWikipediaUrl", () => {
        it("should return true if it is a valid Wikipedia URL with english locale", () => {
            // Arrange
            const validUrl =
                "https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression";

            // Act
            const result = isValidWikipediaUrl(validUrl);

            // Assert
            expect(result).toBeTruthy();
        });
        it("should return true if it is a valid Wikipedia URL with french locale", () => {
            // Arrange
            const validUrl =
                "https://fr.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression";

            // Act
            const result = isValidWikipediaUrl(validUrl);

            // Assert
            expect(result).toBeTruthy();
        });
        it("should return false if the URL start with number", () => {
            // Arrange
            const invalidUrl =
                "https://123.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression";

            // Act
            const result = isValidWikipediaUrl(invalidUrl);

            // Assert
            expect(result).toBeFalsy();
        });
        it("should return false if the URL does not use https", () => {
            // Arrange
            const invalidUrl =
                "http://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression";

            // Act
            const result = isValidWikipediaUrl(invalidUrl);

            // Assert
            expect(result).toBeFalsy();
        });
        it("should return false if the URL does not have wiki path", () => {
            // Arrange
            const invalidUrl =
                "https://en.wikipedia.org/Women%27s_high_jump_world_record_progression";

            // Act
            const result = isValidWikipediaUrl(invalidUrl);

            // Assert
            expect(result).toBeFalsy();
        });
        it("should return false if the URL does not have article path", () => {
            // Arrange
            const invalidUrl = "https://en.wikipedia.org/wiki/";

            // Act
            const result = isValidWikipediaUrl(invalidUrl);

            // Assert
            expect(result).toBeFalsy();
        });
        it("should return false if the URL does not have both wiki and article path", () => {
            // Arrange
            const invalidUrl = "https://en.wikipedia.org/";

            // Act
            const result = isValidWikipediaUrl(invalidUrl);

            // Assert
            expect(result).toBeFalsy();
        });
    });
});
