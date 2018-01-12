// const mocha = require("mocha/mocha.js");
// const assert = require('assert');
// const utils = require('./utils.js');

// element blocks
const detailsSummary = require('./default/Details.js');
const button        = require('./default/Button.js');
const toggleButton  = require('./default/ToggleButton.js');

mocha.setup('bdd');
mocha.reporter('html');


// function elTypeCheck(tagName, type){
//     var el = document.createElement(tagName);
//     el.setAttribute("type", type);
//     if(el.type == type){
//         return true;
//     } else {
//         throw new Error("Type doesn't exist");
//     }
// }
//
// function getTreeOfHtml(html, callback){
//     return true;
//     // chrome.tabs.create({ active: false, url: 'data:text/html;utf8,' + html},
//     //     (tab) => {
//     //         function finished(){
//     //                 // chrome.tabs.remove(tab.id);
//     //         };
//     //         chrome.automation.getTree(tab.id, (tree) => {
//     //             console.log(tree, chrome.lastError);
//     //             callback(tree.children[0], finished);
//     //         });
//     //     }
//     // )
// }
//
// // var button = document.createElement("button");
//
// // describe('Button', function() {
// //     describe('button element', function() {
// //         it('Basic support', function() {
// //             assert.ok(utils.isInstanceOf(button, HTMLButtonElement));
// //         });
// //         // it("Button without specified type has correct role", function(done) {
// //         //     it("Type 'reset' has correct role", function(done) {
// //         //         getTreeOfHtml('<button></button>', (tree, finished) => {
// //         //             var el = tree.children[0];
// //         //             console.log(el);
// //         //             done(el.role == "button" ? null : "Role hasn't have correct ");
// //         //             finished();
// //         //         });
// //         //     });
// //         // });
// //         it("Type 'button' supported", function() {
// //             return elTypeCheck("button", "button");
// //         });
// //         // it("Type 'button' has correct role", function(done) {
// //         //     it("Type 'reset' has correct role", function(done) {
// //         //         getTreeOfHtml('<button type="button"></button>', (tree, finished) => {
// //         //             var el = tree.children[0];
// //         //             console.log(el);
// //         //             done(el.role == "button" ? null : "Role hasn't have correct ");
// //         //             finished();
// //         //         });
// //         //     });
// //         // });
// //         it("Type 'submit' supported", function() {
// //             return elTypeCheck("button", "submit");
// //         });
// //         // it("Type 'reset' has correct role", function(done) {
// //         //     getTreeOfHtml('<button type="submit"></button>', (tree, finished) => {
// //         //         var el = tree.children[0];
// //         //         done(el.role == "button" ? null : "Role hasn't have correct ");
// //         //         finished();
// //         //     });
// //         // });
// //         it("Type 'reset' supported", function() {
// //             return elTypeCheck("button", "reset");
// //         });
// //         // it("Type 'reset' has correct role", function(done) {
// //         //     getTreeOfHtml('<button type="reset"></button>', (tree, finished) => {
// //         //         var el = tree.children[0];
// //         //         done(el.role == "button" ? null : "Role hasn't have correct ");
// //         //         finished();
// //         //     });
// //         // });
// //     });
// //
// //     describe('input element', function() {
// //         it('Basic support', function() {
// //             assert.ok(utils.isInstanceOf("input", "HTMLInputElement"));
// //         });
// //         it("Type 'button' supported", function() {
// //             return elTypeCheck("input", "button");
// //         });
// //         // it("Type 'button' has correct role", function(done) {
// //         //     getTreeOfHtml('<input type="button"></button>', (tree, finished) => {
// //         //         var el = tree.children[0];
// //         //         console.log(el);
// //         //         done(el.role == "button" ? null : "Role hasn't have correct ");
// //         //         finished();
// //         //     });
// //         // });
// //         it("Type 'submit' supported", function() {
// //             return elTypeCheck("input", "submit");
// //         });
// //         // it("Type 'submit' has correct role", function(done) {
// //         //     getTreeOfHtml('<input type="submit"></button>', (tree, finished) => {
// //         //         var el = tree.children[0];
// //         //         console.log(el);
// //         //         done(el.role == "button" ? null : "Role hasn't have correct ");
// //         //         finished();
// //         //     });
// //         // });
// //         it("Type 'reset' supported", function() {
// //             return elTypeCheck("input", "reset");
// //         });
// //         // it("Type 'reset' has correct role", function(done) {
// //         //     getTreeOfHtml('<input type="reset"></button>', (tree, finished) => {
// //         //         var el = tree.children[0];
// //         //         console.log(el);
// //         //         done(el.role == "button" ? null : "Role hasn't have correct ");
// //         //         finished();
// //         //     });
// //         // });
// //     });
// //
// //     // describe('div[role=button]', function() {
// //     //     it('should have correct role', function(done) {
// //     //         getTreeOfHtml('<div role="button"></div>', (tree, finished) => {
// //     //             var el = tree.children[0];
// //     //             console.log(el);
// //     //             done(el.role == "button" ? null : "Role hasn't have correct ");
// //     //             finished();
// //     //         });
// //     //     });
// //     // });
// // });
// //
// // describe('Navigation', function() {
// //     describe('nav element', function() {
// //         it('Basic support', function() {
// //             assert.ok(utils.isInstanceOf("nav", "HTMLNavigationElement"));
// //         });
// //         // it("Nav has navigation role", function(done) {
// //         //     chrome.automation.getTree(null, (tree) => {
// //         //         var el = tree.children[7];
// //         //         console.log(el, el.role);
// //         //         if(
// //         //             el.role == "navigation"
// //         //         ){
// //         //             done();
// //         //         } else {
// //         //             done("Huh!?");
// //         //         }
// //         //     });
// //         // });
// //     });
// //
// //     // describe('div[role=navigation]', function() {
// //     //     it('should have correct role', function(done) {
// //     //         chrome.automation.getTree(null, (tree) => {
// //     //             var el = tree.children[8];
// //     //             console.log(el);
// //     //             if(
// //     //                 el.role == "navigation"
// //     //             ){
// //     //                 done();
// //     //             } else {
// //     //                 done("Huh!?");
// //     //             }
// //     //         });
// //     //     });
// //     // });
// // });

var details = document.createElement("details");
details.innerHTML = "<summary>hoi</summary>...";

new detailsSummary(details, {
    native: true
});

// var Disclosure = function(){
//     var details = document.createElement("div");
//
//     var summary = document.createElement("button");
//     summary.setAttribute("aria-expanded", "false");
//     summary.setAttribute("aria-controls", "some-unique-id");
//     summary.innerHTML = "Details";
//
//     var content = document.createElement("div");
//     content.id = "some-unique-id";
//     content.style.display = "none";
//
//     details.appendChild(summary);
//     details.appendChild(content);
//
//     details.open = false;
//
//     var observer = new MutationObserver((mutations) => {
//         mutations.forEach((mutation) => {
//             details.hasAttribute("open");
//             updateExpension(details.hasAttribute("open"));
//         });
//     });
//     observer.observe(details, {attributeFilter: ["open"]});
//
//     summary.addEventListener("click", (ev) => {
//         updateExpension(!details.open);
//     });
//     summary.addEventListener("keypress", (ev) => {
//         console.log(ev);
//         if(ev.code == "Enter" || ev.code == "Space" || ev.keyCode == 13 || ev.keyCode == 32){
//             console.log(ev.code);
//             updateExpension(!details.open);
//         }
//     });
//
//     function updateExpension(state, mutateEvent){
//         details.open = state;
//
//         if(state === true && mutateEvent === false){
//             details.setAttribute("open", "");
//             content.style.display = "none";
//         } else if(mutateEvent === false) {
//             details.removeAttribute("open");
//         }
//
//         var event = new Event('toggle', {
//             'view': window,
//             'bubbles': true,
//             'cancelable': true
//         });
//         details.dispatchEvent(event);
//     }
//
//     return details;
// };
// var details2 = new Disclosure();
//
// new detailsSummary(details2, {
//     native: false
// });
//
//
var buttonElement = document.createElement("button");
buttonElement.setAttribute("button", "button");
buttonElement.innerHTML = "Click here to continue";

new button(buttonElement, {native: true});

var inputEl = document.createElement("input");
inputEl.type = "button";
inputEl.value = "as it is een test";
inputEl.setAttribute("aria-expanded", true);
new toggleButton(inputEl, {native: false});

mocha.run()
