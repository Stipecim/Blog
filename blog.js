
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

    attachEventForHistoryPushState(contentNodes){
        
        contentNodes.forEach(node => {
            node.addEventListener('click', e => {
                e.preventDefault();
                window.history.pushState(node.pathname, node.pathname, this.origin + node.pathname)
            });
        })
        
    }
}

// content inside main node 
class ContentNode {
    node;
    pathname;
    innerHTML;                  /* idea: node reference should be loaded in this class for further manipulation. 
                                         Manipulation through methods of this class or MainNode method to load css ??
                                         possible css load for applying settings ?? each ContentNode should have unique css or similar.
                                         Global Event listener !? configuration for manipulation ??? loaded to Global event listener? ??
                                         
                                */
    loaded;                     

    constructor(node, innerHTML, pathname) {
        this.node = node;
        this.innerHTML = innerHTML;
        this.pathname = pathname;
        this.loaded = false;
    }

}

// <main> element dynamically updated
class MainNode {

    mainNode;

    contentNodes;

    constructor() {
        this.mainNode = document.querySelector('main');
        this.contentNodes = [];
    }

    async initializeContentNodes() {
        
        let html = '';

        document.querySelectorAll('a').forEach(async (node, i) => { 
            
            html = await fetch(pages[i]).then(data => data.text());
            const contentNode =  
            (
                new ContentNode    
                (
                        node, 
                        html, 
                        pages[i].replace(/\/pages|\.html/g, "")
                )
            );

            this.contentNodes.push(contentNode);
           
        });

    }

    router() {

    }

    // append content node to main Node
}



const main = new MainNode();

main.initializeContentNodes();

const router = new Router();

console.log(router)
console.log(main.contentNodes)

router.attachEventForHistoryPushState(main.contentNodes);

window.onload = () => {
    if (window.location.pathname !== "/blog.html")
        window.location.pathname = '/blog.html';
}

const route = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};





const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path];
    const html = await fetch(route).then((data) => data.text());
    document.getElementsByName('main').innerHTML = html;
};


// window.onpopstate = handleLocation;


// handleLocation();
