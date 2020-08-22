export function setCookie(param) {
  const {key, value, domain=location.hostname, maxAge} = param;
  document.cookie = `${ key }=${ value }; domain=${ domain }; max-age=${ maxAge }; path=/`;
}