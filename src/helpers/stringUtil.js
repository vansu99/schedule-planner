export default function splitBySeparator(str, separator) {
  return str.split(new RegExp(`(.*?${separator})`, "g")).filter(Boolean);
}

/**
 * splitBySeparator('https://api.tvmaze.com/search/shows?q=Friends', '.com');
 *
 * ['https://api.tvmaze.com', '/search/shows?q=Friends']
 */
