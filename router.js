/*
  I got inspired by the idea of this guy, for the simple router component.
  Reference: https://github.com/jameesjohn/vanilla-router/tree/main
*/


class RouterException extends Error {
  constructor(message){
      super();
      this.message = message;
      this.name = 'htmlDocument Exception';
  }
}

function getRouterNavigationLinks(){
  return document.querySelectorAll(`a[NAVIGATE_TO]`);
}


/**
* history router  
* @param {routes: {urlPath: string, routeEntry: htmlDocument|undefined, name: string, filePath: string}[], mainEntryPoint: htmlDocument}
*/
function Router ({routes, mainEntryPoint}){
   
   let currentUrl = undefined;
 
   const ROUTER_ATTRIBUTE_NAME = 'NAVIGATE_TO';
   const EVENT_URL_CHANGE = 'urlChange';
   const ORIGIN_PATHNAME = location.pathname;
   console.log( location.origin)

   async function handleinitialLoad(){
      
      const initialRoute = routes.find(route => route.urlPath === '/' );

      if(!initialRoute) throw new RouterException(`Make sure your homepage path is set as '/'`);

      const newRouteEntry = new htmlDocument();

      await newRouteEntry.initializeInnerHTML(initialRoute.name, initialRoute.filePath);

      initialRoute.routeEntry = newRouteEntry
      
      renderDocumentTomainEntryPoint(initialRoute.routeEntry.innerHTML);

      mapClickEventToLinks();

      currentUrl = initialRoute.urlPath;

      mainEntryPoint.addEventListener(EVENT_URL_CHANGE, handleUrlChangeEvent);

      addEventListener('popstate', handlePopStateEvent);

      history.replaceState({path: initialRoute.urlPath}, '');
      
   }

   function mapClickEventToLinks(){
      const navLinks = getRouterNavigationLinks();

      navLinks.forEach(link => {
        const linkAttributeValue = link.getAttribute(ROUTER_ATTRIBUTE_NAME);
        const route = routes.find(route => route.name === linkAttributeValue);
        if(!route) throw new RouterException(`No route found with name: ${linkAttributeValue}`);

        link.addEventListener('click', e=>{
          e.preventDefault();                 
          handleClickEvent(route)
        })
      })
   }

   function handleClickEvent(route) {
      pushState(route)
   }

   function pushState(route) {
      
      if(currentUrl === route.urlPath) return;
      
     

      mainEntryPoint.dispatchEvent(
        new CustomEvent(EVENT_URL_CHANGE, {
          detail: {
            current: route,  // new url
            previous: getRoute(currentUrl)   // actually previous
          }
        })
      )

      currentUrl = route.urlPath;

      history.pushState({path: route.urlPath}, '', ORIGIN_PATHNAME + route.urlPath);
      
   }
   
 
   async function handleUrlChangeEvent(event) {
      console.log('From handleUrlChangeEvent', currentUrl);
      console.log('Event url change', event.detail);
      getAndRenderNewDocument(event.detail.current);
      
   } // current 

   async function getAndRenderNewDocument(route){
    console.log('route passed to render', route);
    if(route.routeEntry !== undefined) {
      renderDocumentTomainEntryPoint(route.routeEntry.innerHTML)
      console.log('Current routes state', routes);
    } else {

      const newRouteEntry = new htmlDocument();
      
      await newRouteEntry.loadNewInnerHTML(route.name, route.filePath);
      console.log('ddd', newRouteEntry);

      renderDocumentTomainEntryPoint(newRouteEntry.innerHTML);

      route.routeEntry = newRouteEntry;

      console.log('Current routes state from else', routes)
    }
   }

   function renderDocumentTomainEntryPoint(innerHTML){
      mainEntryPoint.innerHTML = innerHTML;
      console.log('renderDocumentTomainEntryPoint', innerHTML);
   }

   function handlePopStateEvent(event) {
      event.preventDefault();
      const previouslyVisitedPath = event.state.path;
      mainEntryPoint.dispatchEvent(
        new CustomEvent(EVENT_URL_CHANGE, {
          detail: {
            current: getRoute(previouslyVisitedPath),  // new url
            previous: getRoute(currentUrl), // actually previous
          }
        })
      )
      
      currentUrl = '/';
      console.log(event)
      console.log(currentUrl)
   }
   
   function getRoute(path) {
     return routes.find(route => route.urlPath === path);
   }

   handleinitialLoad();
   
}   


// main node what should main node contain
async function main(){
  const router = new Router({
    routes: [
      {urlPath: '/', filePath: 'pages/home.html', name: 'home', routeEntry: undefined},
      {urlPath: '/posts', filePath: 'pages/posts.html', name: 'posts', routeEntry: undefined}, 
      {urlPath: '/about', filePath: 'pages/about.html', name: 'about', routeEntry: undefined}, 
    ],
    
    mainEntryPoint: document.querySelector('main')
  })
}

main();
console.log(location.origin);

