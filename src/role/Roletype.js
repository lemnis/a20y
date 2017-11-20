import mix from "@vestergaard-company/js-mixin";
import Base from "./Base.js";

// Based on vanilla attributes
import AriaDisabled 				from "./../attributes/aria-disabled";
import AriaHidden						from "./../attributes/aria-hidden";

// Validation API based on
// https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation
import AriaErrormessage			from "./../attributes/aria-errormessage";
import AriaInvalid					from "./../attributes/aria-invalid";
import Validation	 					from "./../utils/Validation";

// nothing special
import AriaAtomic 					from "./../attributes/aria-atomic";
import AriaBusy 						from "./../attributes/aria-busy";
import AriaCurrent 					from "./../attributes/aria-current";
import AriaControls 				from "./../attributes/aria-controls";
import AriaDescribedby 			from "./../attributes/aria-describedby";
import AriaDetails 					from "./../attributes/aria-details";
import AriaFlowto						from "./../attributes/aria-flowto";
import AriaHaspopup					from "./../attributes/aria-haspopup";
import AriaOwns							from "./../attributes/aria-owns";
import AriaLabel						from "./../attributes/aria-label";
import AriaLabelledby				from "./../attributes/aria-labelledby";
import AriaLive							from "./../attributes/aria-live";

// import AriaKeyshortcuts			from "./../attributes/aria-keyshortcuts";
// import AriaRelevant					from "./../attributes/aria-relevant";
// import AriaRoledescription 	from "./../attributes/aria-roledescription";

export default class Roletype extends mix(Base).with(
	AriaDisabled,
	AriaControls
) {}
