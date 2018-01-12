/**
 * Follows https://www.w3.org/TR/2017/WD-html-aria-20171013/#docconformance
 */

/**
 * All aria roles
 * @type {Array}
*/
import roles from "./../data/roles.js";

/**
 * Stores info which is used in functions of rolePerHTMLTag,
 * mostly a key as tagName with an array of allowed roles for that tag
 * @type {Object}
 */
var allowedRoles = {
	"aWithHref": [
		"button", "checkbox", "menuitem", "menuitemcheckbox", "menuitemradio",
		"option", "radio", "switch", "tab", "treeitem", "doc-backlink",
		"doc-biblioref", "doc-glossref", "doc-noteref"
	],
	"article": [
		"feed", "presentation", "none", "document", "application", "main", "region"
	],
	"aside": [
		"feed", "note", "presentation", "none", "region", "search", "doc-example",
		"doc-footnote", "doc-pullquote", "doc-tip"
	],
	"button": [
		"checkbox", "link", "menuitem", "menuitemcheckbox", "menuitemradio",
		"option", "radio", "switch", "tab"
	],
	"dl": ["group", "presentation", "none", "doc-glossary"],
	"embed": [ "application", "document", "presentation", "none", "img" ],
	"figcaption": [ "group", "presentation", "none" ],
	"fieldset": 	[ "group", "presentation", "none" ],
	"footer": [ "group", "none", "presentation", "doc-footnote" ],
	"form": [ "search", "none", "presentation" ],
	"h1Toh6": [ "tab", "none", "presentation", "doc-subtitle" ],
	"header": [ "group", "none", "presentation", "doc-footnote" ],
	"hr": [ "presentation", "doc-pagebreak" ],
	"iframe": [ "application", "document", "img" ],
	"imgWithEmptyAlt": [ "presentation", "none" ],
	"inputTypeButton": [
		"link, menuitem", "menuitemcheckbox", "menuitemradio", "radio", "switch",
		"option", "tab"
	],
	"inputTypeImage": [
		"link", "menuitem", "menuitemcheckbox", "menuitemradio", "radio", "switch"
	],
	"inputTypeCheckbox": [ "button", "menuitemcheckbox", "option", "switch" ],
	"li": [
		"menuitem", "menuitemcheckbox", "menuitemradio", "option", "none",
		"presentation", "radio", "separator", "tab", "treeitem", "doc-biblioentry",
		"doc-endnote"
	],
	"nav": [ "doc-index", "doc-pagelist", "doc-toc" ],
	"object": [ "application", "document", "img" ],
	"ol": [
		"directory", "group", "listbox", "menu", "menubar,none", "presentation ",
		"radiogroup", "tablist", "toolbar", "tree"
	],
	"section": [
		"alert", "alertdialog", "application", "banner", "complementary",
		"contentinfo", "dialog", "document", "feed", "log", "main", "marquee",
		"navigation", "none", "presentation", "search", "status", "tabpanel",
		"doc-abstract", "doc-acknowledgments", "doc-afterword", "doc-appendix",
		"doc-bibliography", "doc-chapter", "doc-colophon", "doc-conclusion",
		"doc-credit", "doc-credits", "doc-dedication", "doc-endnotes", "doc-epilogue",
		"doc-errata", "doc-example", "doc-foreword", "doc-index", "doc-introduction",
		"doc-notice", "doc-pagelist", "doc-part", "doc-preface", "doc-prologue",
		"doc-pullquote", "doc-qna", "doc-toc"
	],
	"svg": [ "application", "document", "img" ],
	"ul": [
		"directory", "group", "listbox", "menu", "menubar", "radiogroup",
		"tablist", "toolbar", "tree", "presentation"
	]
};

/**
 * Contains a function for each htmlTag where not all roles allowed
 * @type {Object}
 */
var rolePerHTMLTag = {
	a: (el, role) => {
		if(el.href) {
			return hasAllowedRole("aWithHref", role) ? role : "link";
		} else {
			return role;
		}
	},
	area: (el, role) => {
		if(el.href) return role ? null : "link";
		return role;
	},
	article: (el, role) => hasAllowedRole("article", role) ? role : "article",
	aside: (el, role) => hasAllowedRole("aside", role) ? role : "complementary",
	audio: (el, role) => role == "application" ? "application" : null,
	base: () => null,
	body: () => "document",
	button: (el, role) => {
		if(el.type == "menu") {
			return role == "menuitem" ? "menuitem" : "button";
		}
		return hasAllowedRole("button", role) ? role : "button";
	},
	caption: () => null,
	col: () => null,
	colgroup: () => null,
	datalist: () => "listbox",
	dd: () => "definition",
	details: () => "group",
	dialog: (el, role) => role == "alertdialog" ? "alertdialog" : "dialog",
	dl: (el, role) => hasAllowedRole("dl", role) ? role : "list",
	dt: () => "listitem",
	embed: (el, role) => hasAllowedRole("embed", role) ? role : null,
	figcaption: (el, role) => hasAllowedRole("figcaption", role) ? role : null,
	fieldset: (el, role) => hasAllowedRole("fieldset", role)? role : null,
	figure: (el, role) => hasAllowedRole("figure", role) ? role : "figure",
	footer: (el, role) => {
		let hasImplicitContentinfoRole = !getParentWithTagName(el, ["ARTICLE", "ASIDE", "MAIN", "NAV", "SECTION"]);
		let hasAllowedRole = hasAllowedRole("footer", role);
		if(hasAllowedRole){
			return role;
		} else if (hasImplicitContentinfoRole) {
			return "contentinfo";
		} else {
			return null;
		}
	},
	form: (el, role) => hasAllowedRole("form", role) ? role : "form",
	h1: (el, role) => hasAllowedRole("h1Toh6", role) ? role : "heading",
	h2: (el, role) => hasAllowedRole("h1Toh6", role) ? role : "heading",
	h3: (el, role) => hasAllowedRole("h1Toh6", role) ? role : "heading",
	h4: (el, role) => hasAllowedRole("h1Toh6", role) ? role : "heading",
	h5: (el, role) => hasAllowedRole("h1Toh6", role) ? role : "heading",
	h6: (el, role) => hasAllowedRole("h1Toh6", role) ? role : "heading",
	head: () => null,
	header: (el, role) => {
		let hasImplicitBannerRole = !getParentWithTagName(el, ["ARTICLE", "ASIDE", "MAIN", "NAV", "SECTION"]);
		let hasAllowedRole = hasAllowedRole("header", role);
		if(hasAllowedRole){
			return role;
		} else if (hasImplicitBannerRole) {
			return "banner";
		} else {
			return null;
		}
	},
	hr: (el, role) => hasAllowedRole("hr", role) ? role : "seperator",
	html: () => null,
	iframe: (el, role) => hasAllowedRole("iframe", role) ? role : null,
	img: (el, role) => {
		var hasAllowedEmptyAltRole = hasAllowedRole("imgWithEmptyAlt", role);

		if(el.alt) {
			// any role exept the roles used by empty alt values
			return hasAllowedEmptyAltRole ? "img" : role;
		} else {
			return hasAllowedEmptyAltRole ? role : null;
		}
	},
	input: (el, role) => {
		switch(el.type) {
			case "button":
				return hasAllowedRole("inputTypeButton", role) ? role : "button";
			case "checkbox":
				return hasAllowedRole("inputTypeCheckbox", role) ? role : "checkbox";
			case "image":
				return hasAllowedRole("inputTypeImage", role) ? role : "button";
			case "number":
				return "spinbutton";
			case "radio":
				return role == "menuitemradio" ? "menuitemradio" : "radio";
			case "range":
				return "slider";
			case "search":
				return el.list ? "combobox" : "searchbox";
			case "reset":
			case "submit":
				return "button";
			case "email":
			case "tel":
			case "text":
			case "url":
				return el.list ? "combobox" : "textbox";
			default:
				return null;
		}
	},
	keygen: () => null,
	label: () => null,
	legend: () => null,
	li: (el, role) => {
		let hasImplicitListitemRole = getParentWithTagName(el, ["OL", "UL"]);

		if(hasImplicitListitemRole) {
			return hasAllowedRole("li", role) ? role : "listitem";
		} else {
			return role;
		}
	},
	link: (el, role) => {
		if(el.href) return role ? null : "link";
		return role;
	},
	main: () => "main",
	map: () => null,
	math: () => "math",
	menu: (el, role) => el.type == "context" ? "menu" : role,
	menuitem: (el, role) => {
		switch (el.type) {
			case "command":
				return "menuitem";
			case "checkbox":
				return "menuitemcheckbox";
			case "radio":
				return "menuitemradio";
			default:
				return role;
		}
	},
	meta: () => null,
	meter: () => null,
	nav: (el, role) => hasAllowedRole("nav", role) ? role : "navigation",
	noscript: () => null,
	object: (el, role) => hasAllowedRole("object", role) ? role : null,
	ol: (el, role) => hasAllowedRole("ol", role) ? role : "list",
	optgroup: () => "group",
	option: (el) => {
		let withinOptionList = ["select", "optgroup", "datalist"].indexOf(el.parentNode) > -1;
		return withinOptionList ? "option" : null;
	},
	output: (el, role) => role ? role : "status",
	param: () => null,
	picture: () => null,
	progress: () => "progressbar",
	script: () => null,
	section: (el, role) => {
		let hasValidRole = hasAllowedRole("section", role);
		if(hasValidRole) return role;

		// only if accessible name
		if(el.title || el.hasAttribute("aria-label") || el.hasAttribute("aria-labelledby")){
			return "section";
		} else {
			return role;
		}
	},
	select: (el, role) => {
		if(el.multiple && el.size > 1){
			return "listbox";
		} else if(!el.multiple && el.size <= 1) {
			return role == "menu" ? role : "combobox";
		}

		return role;
	},
	source: () => null,
	style: () => null,
	svg: (el, role) => hasAllowedRole("svg", role) ? role : null,
	summary: () => "button",
	table: (el, role) => role ? role : "table",
	template: () => null,
	textarea: () => "textbox",
	thead: (el, role) => role ? role : "rowgroup",
	tbody: (el, role) => role ? role : "rowgroup",
	tfoot: (el, role) => role ? role : "rowgroup",
	title: () => null,
	td: (el, role) => getParentWithTagName(el, ["TABLE"]) ? "cell" : role,
	th: (el, role) => {
		if(role) return role;
		return getParentWithTagName(el, ["THEAD"]) ? "columnheader" : "rowheader";
	},
	tr: (el, role) => {
		// role=row, may be explicitly declared when child of a table element with role=grid
		return role ? role : "row";
	},
	track: () => null,
	ul: (el, role) => hasAllowedRole("ul", role) ? role : "list",
	video: (el, role) => role == "application" ? "application" : null
};

/**
 * Finds nearest parent with a specifig tagName
 * @param  {HTMLElement} 		el      		child - starting pointer
 * @param  {Array<String>} 	tagName 		Array containg capatilized tagnames
 * @return {HTMLElement}         				Parent that matches one of the tagnames
 */
function getParentWithTagName(el, tagName) {
	while (el.parentNode){
		if(tagName.indexOf(el.tagName) > -1) return el;
		el = el.parentNode;
	}
}

/**
 * Checks if given role is allowed for given tag
 * @param  {string}  tagName key of allowedRoles
 * @param  {string}  role    current role
 * @return {Boolean}         True if allowed
 */
function hasAllowedRole(tagName, role) {
	return allowedRoles[tagName].indexOf(role) > -1;
}

export default function getComputedRole(el) {
	var role = el.getAttribute("role");
	// check if given role exist
	if(role) role = roles[role] ? role : null;

	var tagName = el.tagName.toLowerCase();
	// call possible custom function if tag has any
	if (rolePerHTMLTag[tagName]) return rolePerHTMLTag[tagName](el, role);

	// default behavior a.k.a. set role
	return role;
}