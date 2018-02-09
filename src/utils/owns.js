import selector from './selector';
import create from './create';
import elements from './elements';

export function getAllChildren(ay) {
    if (
        ay._node.childElementCount > 0 
        && ay.owns !== null
        && ay.owns.lengh > 0
    ) {
        return Array.from(ay._node.children).concat(ay.owns);
    } else if (ay._node.childElementCount > 0) {
        return Array.from(ay._node.children)
    } else if (ay.owns !== null && ay.owns.length > 0) {
        return Array.from(ay.owns);
    } else {
        return [];
    }
}

export function getAllAllowedChildren(ay) {
    // flatten version of all roles allowed
    var allowedRoles = [].concat(...Object.values(selector.getOwns(ay.role)));
    var children = getAllChildren(ay);

    // get all objects of 20y per element
    var ayChildren = children.map(child => {
        if (!elements.has(child)) create.one(child);
        
        return elements.get(child);
    });

    return ayChildren.filter(child => allowedRoles.indexOf(child.role) > -1);
}

export default {getAllChildren, getAllAllowedChildren};