import createException from "./createException.js";

const exception = createException('cscript');

export default class CScript extends HTMLElement {
    constructor() {
      super(); // Always call the parent constructor
      
    }
  
    connectedCallback() {
      const src = this.getAttribute('src');
      const type = this.getAttribute('type');
      
      if (!src || !type) throw exception.message('Make sure you specify source and type in tag')
  
      const script = document.createElement('script');
      script.src = src;
      script.type = type;
      document.body.appendChild(script);
    }
  }

