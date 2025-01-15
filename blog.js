
const pages = [             // paths have to be in same order as <a> tags in index.html, for them to be correctly loaded
    "/pages/home.html",
    "/pages/posts.html",
    "/pages/about.html" 
]                           

class Router {
    origin;
    pathname;

    constructor() {
        this.origin = window.location.origin;
        this.pathname = window.location.pathname;
    }

    attachEventToContentNodeForHistoryPushState(contentNodes){
        
        contentNodes.forEach(contentNode => {
           
            contentNode.node.addEventListener('click', e => {
                e.preventDefault();
                window.history.pushState({}, '', this.origin + this.pathname + contentNode.pathname);

                this.#handleLocation(contentNode);
                
                console.log(contentNode.pathname);
            });
        });
    }

    #handleLocation(contentNode) {
        const mainNode = contentNode.mainNode;
        console.log(mainNode)
        
        mainNode.innerHTML = contentNode.innerHTML;

        contentNode.loaded = true;
    }
}

// content inside main node 
class ContentNode {
    node;
    pathname;
    innerHTML;                  /* idea: mainNode and node reference should be loaded in this class for further manipulation. 
                                         Manipulation through methods of this class or MainNode method to load css ??
                                         possible css load for applying settings ?? each ContentNode should have unique css or similar.
                                         Global Event listener !? configuration for manipulation ??? loaded to Global event listener? ??
                                         
                                */ 
    loaded;
    mainNode;                     

    constructor(node, innerHTML, pathname, mainNode) {
        this.node = node;
        this.innerHTML = innerHTML;
        this.pathname = pathname;
        this.loaded = false;
        this.mainNode = mainNode;
    }

}

// <main> element dynamically updated
class MainNode {

    mainNode;

    contentNodes;

    constructor() {
        this.mainNode = document.querySelector('main');
        this.contentNodes = new Array();

        
    }

    async #fetchHTMLs(numPages) {
        const htmlPromises = [];

        try {

            if(numPages !== pages.length) throw new Error('Make sure nav has same amount of elements as page routes');

            for (let i = 0; i < numPages; i++) {
                const promise = fetch(pages[i]).then(response => response.text());
                htmlPromises.push(promise);
            }
        }catch(err){
            console.error(err);
        }
        

        return await Promise.all(htmlPromises);
    }

    #getDOMNodes(){
        return document.querySelectorAll('div.a');
    }

    #createContentNodes(nodes, htmls) {
        nodes.forEach((node, i) => {
            const contentNode = new ContentNode(
                node,
                htmls[i],  
                pages[i].replace(/\/pages|\.html|\/home/g, ""),
                this.mainNode
            );

            Object.setPrototypeOf(contentNode, MainNode.prototype);
            this.contentNodes.push(contentNode);

            if(contentNode.pathname === '') this.#initializeHomePage(contentNode.innerHTML);
        });
    }

    #initializeHomePage(contentNodeInnerHtml){
        this.mainNode.innerHTML = contentNodeInnerHtml;
    }


    async initializeContentNodes() {
        try{
            if(this instanceof ContentNode) throw new Error('Cannot initialize Main Node trough instance of child');

            const nodes = this.#getDOMNodes();
            const htmls = await this.#fetchHTMLs(nodes.length)

            this.#createContentNodes(nodes, htmls);
        } catch(err) {
            console.error(err);
        }
    }



}



const router = new Router();

const main = new MainNode();



main.initializeContentNodes().then(() => {
    
    router.attachEventToContentNodeForHistoryPushState(main.contentNodes);

    console.log(router)
    console.log(main.contentNodes)
});







window.onload = () => {
    if (window.location.pathname !== "/blog.html")
        window.location.pathname = '/blog.html';
}


// window.onpopstate = handleLocation;


// handleLocation();
