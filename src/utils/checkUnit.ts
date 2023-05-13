export function checkUnit(str: string): number {
  let res: number = 0;
  if (str.includes("K")) {
    res = parseFloat(str);
  }
  if (str.includes("M")) {
    res = parseFloat(str) * 1024;
  }
  if (str.includes("G")) {
    res = parseFloat(str) * 1024 * 1024;
  }
  if (str.includes("T")) {
    res = parseFloat(str) * 1024 * 1024 * 1024;
  }

  return res;
}
