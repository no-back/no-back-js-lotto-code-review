export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const clearInputValue = ($target) => {
  $target.value = "";
};

export const disable = ($target) => ($target.disabled = true);
export const enable = ($target) => ($target.disabled = false);
