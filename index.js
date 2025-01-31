
class htmlDocumentError extends Error {
    constructor(message){
        super();
        this.message = message;
        this.name = 'htmlDocument Exception';
    }
}

/**
 * @class
 * @param {fileName: string, filePath: string }
 */
function htmlDocument(){ 
    
    async function fetchElementAsText(filePath){
        const response = await fetch(`${location.origin}/${filePath}`);
        console.log('response from fetch', response)
        const text = await response.text();
        return text; 
    }// dom parser possibly needed !! instead of just inner html 
    
    // function parseTextToDOM(htmlText){
    //     const parser = new DOMParser();
    //     const newDocument = parser.parseFromString(htmlText, 'text/html');  
    //     return newDocument;
    // }

    async function initializeInnerHTML(name, filePath){
        this.name = name;
        this.innerHTML = await fetchElementAsText(filePath);
    }

    async function loadNewInnerHTML(name, filePath){
        this.innerHTML = '';
        this.name = name;
        this.innerHTML = await fetchElementAsText(filePath);
    }

    function attachEventListener(){ // or more like attach script to the htmlDocument  
        return;
    }


    return {
        initializeInnerHTML,
        attachEventListener,
        loadNewInnerHTML,

    }

}



