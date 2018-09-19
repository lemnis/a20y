import create from "./utils/create";
import elements from "./utils/elements";

window.addEventListener("DOMContentLoaded", (ev) => {
    
    window.elements = elements;
    
    console.log(ev);

    setTimeout(() => {
        create.all();
        console.log("created");
    }, 5000);
    // create.all();
});
