import { Transform } from "class-transformer";


export function ToNumber() {
  return Transform((v) => {
    return +v;
  });
}

export function isTrue(value) {
  if (typeof value === "string") {
    value = value.trim().toLowerCase();
  }
  switch (value) {
    case true:
    case "true":
    case 1:
    case "1":
    case "on":
    case "yes":
      return true;
    default:
      return false;
  }
}
