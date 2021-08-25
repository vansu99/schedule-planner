export default function checkEmpty(arg) {
  if (!Array.isArray(arg) || arg.length === 0) {
    return undefined;
  }
}
