import { prependComponentTo } from "../../utils/attachComponent.js"
import getHtmlContent from "../../utils/getHtmlContent.js"




const loadHeader = async () => {

    
    const header = await getHtmlContent('/template/components/header/header.html', 'dom');
    prependComponentTo(document.body, header);


}

export default loadHeader;