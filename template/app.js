
import loadHeader from "./components/header/header.js";
import router from "./router/router.js"
import CScript from "./utils/customScript.js";
import getHtmlContent from "./utils/getHtmlContent.js"



const app = async () => {
    // router
    await loadHeader();
    console.log('HeaderLoaded...')
};


customElements.define('custom-script', CScript)

document.addEventListener("DOMContentLoaded", app);

