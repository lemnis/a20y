
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="ValidityState"></a>

## ValidityState
**Kind**: global class  

* [ValidityState](#ValidityState)
    * [.badInput](#ValidityState+badInput) : <code>Boolean</code>
    * [.customError](#ValidityState+customError) : <code>Boolean</code>
    * [.patternMismatch](#ValidityState+patternMismatch) : <code>Boolean</code>
    * [.rangeOverflow](#ValidityState+rangeOverflow) : <code>Boolean</code>
    * [.rangeUnderflow](#ValidityState+rangeUnderflow) : <code>Boolean</code>
    * [.stepMismatch](#ValidityState+stepMismatch) : <code>Boolean</code>
    * [.tooLong](#ValidityState+tooLong) : <code>Boolean</code>
    * [.tooShort](#ValidityState+tooShort) : <code>Boolean</code>
    * [.typeMismatch](#ValidityState+typeMismatch) : <code>Boolean</code>
    * [.valueMissing](#ValidityState+valueMissing) : <code>Boolean</code>
    * [.valid](#ValidityState+valid) : <code>Boolean</code>

<a name="ValidityState+badInput"></a>

### validityState.badInput : <code>Boolean</code>
Returns true if the user has provided input in the user interface that the 
user agent is unable to convert to a value; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+customError"></a>

### validityState.customError : <code>Boolean</code>
Returns true if the element has a custom error; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+patternMismatch"></a>

### validityState.patternMismatch : <code>Boolean</code>
Returns true if the element’s value doesn’t match the provided pattern; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+rangeOverflow"></a>

### validityState.rangeOverflow : <code>Boolean</code>
Returns true if the element’s value is higher than the provided maximum; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+rangeUnderflow"></a>

### validityState.rangeUnderflow : <code>Boolean</code>
Returns true if the element’s value is lower than the provided minimum; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+stepMismatch"></a>

### validityState.stepMismatch : <code>Boolean</code>
Returns true if the element’s value doesn’t fit the rules given by the step attribute; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+tooLong"></a>

### validityState.tooLong : <code>Boolean</code>
Returns true if the element’s value is longer than the provided maximum length; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+tooShort"></a>

### validityState.tooShort : <code>Boolean</code>
Returns true if the element’s value, if it is not the empty string, is shorter than the provided minimum length; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+typeMismatch"></a>

### validityState.typeMismatch : <code>Boolean</code>
Returns true if the element’s value is not in the correct syntax; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+valueMissing"></a>

### validityState.valueMissing : <code>Boolean</code>
Returns true if the element has no value but is a required field; false otherwise.

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  
<a name="ValidityState+valid"></a>

### validityState.valid : <code>Boolean</code>
Returns true if the element’s value has no validity problems; false otherwise

**Kind**: instance property of [<code>ValidityState</code>](#ValidityState)  

<script src="./dist/bundle.js" /></script>
		