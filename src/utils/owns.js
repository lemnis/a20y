import selector from './selector';
import tree from './tree';

export function getAllAllowedChildren(ay, roles) {
    if(!roles) roles = selector.getOwns(ay.role);
    var result = [];

    var children = tree.getChildren(ay);
    children.filter(child => {
        return roles.forEach(allowedRole => {
            if(allowedRole === child.role) {
                result.push(child);
                return;
            } else if (Array.isArray(allowedRole) && allowedRole[0] === child.role) {
                console.log(child._node, result);
                debugger;
                return;
            }
        })
    });

    return result;
}

export function getChild(ay, role) {

}

export function get(ay, selector) {
    var children = tree.getChildren(ay);

    return children.find(child => child._node.matches(selector));
}

export default { getAllAllowedChildren, get};