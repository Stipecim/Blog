export default {
  routes: [
    {urlPath: '/', filePath: 'pages/home.html', name: 'home', routeEntry: undefined},
    {urlPath: '/posts', filePath: 'pages/posts.html', name: 'posts', routeEntry: undefined}, 
    {urlPath: '/about', filePath: 'pages/about.html', name: 'about', routeEntry: undefined}, 
  ],
  
  mainEntryPoint: document.querySelector('main')
}