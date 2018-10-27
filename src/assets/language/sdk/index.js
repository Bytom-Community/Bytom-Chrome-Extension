import cn from './cn'

const sdkLang = {
    cn: cn
};

function getLang(str) {
    if (sdkLang[localStorage.lang] && sdkLang[localStorage.lang][str]) {
        return sdkLang[localStorage.lang][str];
    }
    return str;
}

export default getLang;