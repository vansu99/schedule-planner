export default function splitBySeparator(str, separator) {
  return str.split(new RegExp(`(.*?${separator})`, 'g')).filter(Boolean);
}
