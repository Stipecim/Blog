

function createComponent() {
    return document.createElement('component');
}

/**
 * This functionality attaches component to a html document.
 * Weather it is script element or html to add functionality to a site.
 * @param {Element} Parent - Element the point of attachement.
 * @param {Element} Child - Child Element attachement.
 * @returns {void}
 */
function attachComponentTo (parent, child) {

    const component = createComponent();

    component.innerHTML = child.innerHTML;

    parent.appendChild(component);
}

function prependComponentTo (parent, child) {

    const component = createComponent();

    component.innerHTML = child.innerHTML;

    parent.prepend(component);
}

export {
    attachComponentTo,
    prependComponentTo,
}