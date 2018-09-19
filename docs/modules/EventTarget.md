
<base href="//D:/Personal/autotility/docs/">
<link rel="stylesheet" href="./dist/style.css" />
<a name="module_EventTarget"></a>

## EventTarget

* [EventTarget](#module_EventTarget)
    * _instance_
        * [.undefinedaddEventListener(type, listener, [options])](#module_EventTarget+undefinedaddEventListener)
        * [.undefinedremoveEventListener(type, listener, [options])](#module_EventTarget+undefinedremoveEventListener)
        * [.undefineddispatchEvent(event)](#module_EventTarget+undefineddispatchEvent)
    * _inner_
        * [~EventTarget](#module_EventTarget..EventTarget)

<a name="module_EventTarget+undefinedaddEventListener"></a>

### eventTarget.undefinedaddEventListener(type, listener, [options])
Listen for a event within the accessible tree.

**Kind**: instance method of [<code>EventTarget</code>](#module_EventTarget)  
**Params**

- type <code>String</code> - A case-sensitive string representing the event type to listen for.
- listener <code>function</code> - Receives a notification when an event of the specified type occurs.
- [options] <code>Object</code> - An options object that specifies characteristics about the event listener.
    - [.capture] <code>Boolean</code> <code> = false</code> - A Boolean that indicates that events of this type will be dispatched to theregistered listener before being dispatched to any EventTarget beneath it inthe accessibility tree.
    - [.once] <code>Boolean</code> <code> = false</code> - A Boolean indicating that the listener should be invoked at most once after being added.If true, the listener would be automatically removed when invoked.
    - [.passive] <code>Booelan</code> <code> = false</code> - A Boolean indicating that the listener will never call preventDefault().If it does, the user agent should ignore it and generate a console warning.
    - [.key] <code>String</code> | <code>Array</code>

<a name="module_EventTarget+undefinedremoveEventListener"></a>

### eventTarget.undefinedremoveEventListener(type, listener, [options])
Removes previously registered event listeners who have the samecombination of event type, the listener function and options

**Kind**: instance method of [<code>EventTarget</code>](#module_EventTarget)  
**Params**

- type <code>String</code>
- listener <code>function</code>
- [options] <code>Object</code>
    - [.capture] <code>Boolean</code>
    - [.key] <code>String</code> | <code>Array</code>

<a name="module_EventTarget+undefineddispatchEvent"></a>

### eventTarget.undefineddispatchEvent(event)
Dispatches an Event through the accessiblity tree, invoking theevent listeners in the appropriate order.

**Kind**: instance method of [<code>EventTarget</code>](#module_EventTarget)  
**Params**

- event <code>Event</code> - Event object to be dispatched

<a name="module_EventTarget..EventTarget"></a>

### EventTarget~EventTarget
**Kind**: inner mixin of [<code>EventTarget</code>](#module_EventTarget)  

<script src="./dist/bundle.js" /></script>
		