import cn from "./cn"
import en from "./en"

const messages = {
  cn: cn,
  en: en,
};

const langSet = ["cn", "en"];

export function have(lang) {
  if (typeof lang == "undefined" || lang == "") {
    return false;
  }
  for (let i = 0; i < langSet.length; i++) {
    if (lang == langSet) {
      return true;
    }
  }
  return false;
};

export default messages;