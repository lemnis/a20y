import elements from './elements';
import create from './create';

export function getChildren(ay) {
    let ownsChildren = ay.owns || [];
    let domChildren = Array.from(ay._node.children).map(child => {
        if (!elements.has(child)) create.one(child);
        return elements.get(child)
    });

    // all dom children
    let children = [...ownsChildren, ...domChildren];

    // strip out ignored dom and replace them with there children
    children.forEach((child, i) => {
        if (child.role == "presentation" || child.role == "none") {
            children = children.slice(0, i).concat(getChildren(child), children.slice(i + 1));
        }
    });

    return children;
}

export function getParent(ay) {
    let parent;
    if(ay._node.id){
        let ownedBy = document.querySelector("[aria-owns*='" + ay._node.id + "']");
        if (ownedBy) {
            parent = ownedBy;
            debugger;
        }
    }

    parent = parent || ay._node.parentNode;

    // create a20y instance if not existing
    if (!elements.has(parent)) create.one(parent);

    let parentA20Y = elements.get(parent);
    if(parentA20Y.role === "none" || parentA20Y.role === "presentation") {
        return getParent(parentA20Y);
    }

    return parentA20Y;
}

export default { getChildren, getParent };