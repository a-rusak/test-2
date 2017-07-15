/**
 * querySelector wrapper
 *
 * @param {string} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */

export const $$ = (selector: string, scope = document) =>
  scope.querySelector(selector);

/**
 * addEventListener wrapper
 *
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
export const $on = (
  target: Element,
  type: string,
  callback: () => void,
  capture?: boolean
) => {
  target.addEventListener(type, callback, capture);
};
