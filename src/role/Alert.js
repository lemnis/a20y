import Section from "./abstract/Section";

/**
 * @summary Show a brief, important message to attracts the user's attention without
 * 					interrupting the user's task.
 *
 * @desc
 * * When dynamically added to the DOM it will announce the message to the user
 *   and may trigger a sound.
 * * If already present on a webpage it will **not** inform users.
 * * It will not interfere with the user's tasks,
 *   if necessary the [alert dialog]() should be used.
 * * It should not affect keyboard focus.
 * * It should not disappear automatically,
 * 	 some users could be unable to read the message before it disappears
 * 	 trough a disability or other cause.
 *
 * ##### Example
 *
 * <div role="alert">Hello, again!</div>
 * ```html
 * <div role="alert">
 * 	Hello, again!
 * </div>
 * ```
 */
class Alert extends Section {}

export default Alert;