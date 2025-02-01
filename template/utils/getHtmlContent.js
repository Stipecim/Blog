import createException from "./createException";


const exception = createException('GetHTMLContent');

const parseDom = async (FILE_PATH) => {
    const response = await fetch(FILE_PATH);
    const text = await response.text();
    const parser = new DOMParser();
    const newDocument = parser.parseFromString(text, 'text/html');

    return newDocument;
}

const getHtmlAsText = async (FILE_PATH) => {
    const response = await fetch(FILE_PATH);
    const text = await response.text();

    return text;
}

/**
 * Processes a file or URL based on the given path and mode.
 * The mode determines whether the function returns HTML as plain text or as a parsed DOM.
 *
 * @param {string} path - The file path or URL to be processed.
 * @param {"dom" | "text"} mode - The operation mode that determines the return type.
 *                         - 'text': Returns the content as plain HTML text.
 *                         - 'dom': Returns the content as a parsed DOM object.
 * @returns {Promise<string|Document>} The function returns either HTML text or a parsed DOM based on the specified mode.
 */
const getHtmlContent = async (path, mode) => {
    if(!mode) throw exception('Mode is not specified');


    const FILE_PATH = `${location.origin}${path.startsWith('/') ? path : `/${path}`}`; 

    if(mode === 'dom') return parseDom(FILE_PATH);

    if(mode === 'text') return getHtmlAsText(FILE_PATH);


    throw exception('Make sure you specify mode correctly');

}

export default getHtmlContent;