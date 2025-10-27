export const isValidWikipediaUrl = (url: string): boolean => {
    const wikiRegex = /^https:\/\/([a-z]{2}\.)?wikipedia\.org\/wiki\/[^\s]+$/i;

    return wikiRegex.test(url);
}