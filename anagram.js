
function anagram(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }

    for (let i = 0; i < str1.length; i++) {
        let milGya = false;
        for (let j = 0; j < str2.length; j++) {
            if (str1[i] == str2[j]) {
                milGya = true;
                break
            }
        }
        if (!milGya) {
            return false;
        }
    }
    return true;
}

let str1 = "raa";
let str2 = "yar";


console.log(anagram(str1, str2));