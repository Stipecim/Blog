
import routes from './routes.js'; 
const router = routes;

const ROUTER_ATTRIBUTE      = 'ROUTER_LINK';
const URL_CHANGE_EVENT      = 'urlChange';
const ORIGIN_PATHNAME       = location.pathname;

const CUSTOM_EVENTS = {
    URL_CHANGE: new CustomEvent(URL_CHANGE_EVENT, {
        detail: {
            current: 'current route',
            previous: 'route'
        }
    }),
    // can add more 
}

async function handleinitialLoad() {

}



/**
* history router  
* @param {routes: {urlPath: string, routeEntry: htmlDocument|undefined, name: string, filePath: string}[], mainEntry: htmlDocument}
*/
const Router = async () => {
    // load initial page

   
    
}


export default Router;