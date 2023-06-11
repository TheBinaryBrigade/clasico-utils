"use strict";
// Porter stemmer in Javascript. Few comments, but it's easy to follow against the rules in the original
// paper, in
//
//  Porter, 1980, An algorithm for suffix stripping, Program, Vol. 14,
//  no. 3, pp 130-137,
//
// see also http://www.tartarus.org/~martin/PorterStemmer
Object.defineProperty(exports, "__esModule", { value: true });
// Release 1 be 'andargor', Jul 2004
// Release 2 (substantially revised) by Christopher McKenzie, Aug 2009
function stemmerOuter() {
    const step2list = {
        "ational": "ate",
        "tional": "tion",
        "enci": "ence",
        "anci": "ance",
        "izer": "ize",
        "bli": "ble",
        "alli": "al",
        "entli": "ent",
        "eli": "e",
        "ousli": "ous",
        "ization": "ize",
        "ation": "ate",
        "ator": "ate",
        "alism": "al",
        "iveness": "ive",
        "fulness": "ful",
        "ousness": "ous",
        "aliti": "al",
        "iviti": "ive",
        "biliti": "ble",
        "logi": "log"
    };
    const step3list = {
        "icate": "ic",
        "ative": "",
        "alize": "al",
        "iciti": "ic",
        "ical": "ic",
        "ful": "",
        "ness": ""
    };
    const consonant = "[^aeiou]";
    const vowel = "[aeiouy]";
    const consonantSeq = consonant + "[^aeiouy]*";
    const vowelSeq = vowel + "[aeiou]*";
    const mgr0 = "^(" + consonantSeq + ")?" + vowelSeq + consonantSeq; // [C]VC... is m>0
    const meq1 = "^(" + consonantSeq + ")?" + vowelSeq + consonantSeq + "(" + vowelSeq + ")?$"; // [C]VC[V] is m=1
    const mgr1 = "^(" + consonantSeq + ")?" + vowelSeq + consonantSeq + vowelSeq + consonantSeq; // [C]VCVC... is m>1
    const sV = "^(" + consonantSeq + ")?" + vowel; // vowel in stem
    function execIt(prog, word) {
        return prog.exec(word);
    }
    function testIt(prog, word) {
        return prog.test(word);
    }
    function innerStemmer(word) {
        let stem;
        let suffix;
        let re;
        let re2;
        let re3;
        let re4;
        if (word.length < 3) {
            return word;
        }
        const wordRef = word.slice();
        const firstChar = word.substring(0, 1);
        if (firstChar === "y") {
            word = firstChar.toUpperCase() + word.substring(1);
        }
        // Step 1a
        re = /^(.+?)(ss|i)es?$/;
        re2 = /^(.+?)([^s])s$/;
        if (testIt(re, word)) {
            re3 = /ies$/;
            if (testIt(re3, word)) {
                word = word.replace(re, "$1y");
            }
            else {
                word = word.replace(re, "$1$2");
            }
        }
        else if (testIt(re2, word)) {
            word = word.replace(re2, "$1$2");
        }
        // Step 1b
        re = /^(.+?)eed$/;
        re2 = /^(.+?)(ed|ing)$/;
        re3 = /^(.+?)(ly)$/;
        re4 = /^(.+?)([^s]*s)$/;
        if (testIt(re, word)) {
            const fp = execIt(re, word);
            if (fp) {
                re = new RegExp(mgr0);
                if (testIt(re, fp[1])) {
                    re = /.$/;
                    word = word.replace(re, "");
                }
            }
        }
        else if (testIt(re2, word)) {
            const fp = execIt(re2, word);
            if (fp) {
                stem = fp[1];
                re2 = new RegExp(sV);
                if (testIt(re2, stem)) {
                    word = stem;
                    re2 = /(at|bl|iz)$/;
                    re3 = new RegExp("([^aeiouylsz])\\1$");
                    re4 = new RegExp("^" + consonantSeq + vowel + "[^aeiouwxy]$");
                    if (testIt(re2, word)) {
                        word = word + "e";
                    }
                    else if (testIt(re3, word)) {
                        re = /.$/;
                        word = word.replace(re, "");
                    }
                    else if (testIt(re4, word)) {
                        word = word + "e";
                    }
                }
            }
        }
        else if (testIt(re3, word)) {
            const fp = execIt(re3, word);
            if (fp) {
                stem = fp[1];
                re = new RegExp(sV);
                if (testIt(re, stem)) {
                    word = stem;
                }
            }
        }
        // Step 1c
        re = /^(.+?)y$/;
        re2 = /(yed|ies)$/;
        if (testIt(re, word) && !testIt(re2, wordRef)) {
            const fp = execIt(re, word);
            if (fp) {
                stem = fp[1];
                re = new RegExp(sV);
                if (testIt(re, stem)) {
                    word = stem + "i";
                }
            }
        }
        // Step 2
        re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
        if (testIt(re, word)) {
            const fp = execIt(re, word);
            if (fp) {
                stem = fp[1];
                suffix = fp[2];
                re = new RegExp(mgr0);
                if (testIt(re, stem)) {
                    word = stem + step2list[suffix];
                }
            }
        }
        // Step 3
        re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
        if (testIt(re, word)) {
            const fp = execIt(re, word);
            if (fp) {
                stem = fp[1];
                suffix = fp[2];
                re = new RegExp(mgr0);
                if (testIt(re, stem)) {
                    word = stem + step3list[suffix];
                }
            }
        }
        // Step 4
        re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
        re2 = /^(.+?)([st])(ion)$/;
        if (testIt(re, word)) {
            const fp = execIt(re, word);
            if (fp) {
                stem = fp[1];
                re = new RegExp(mgr1);
                if (testIt(re, stem)) {
                    word = stem;
                }
            }
        }
        else if (testIt(re2, word)) {
            const fp = execIt(re2, word);
            if (fp) {
                stem = fp[1] + fp[2];
                re2 = new RegExp(mgr1);
                if (testIt(re2, stem)) {
                    word = stem;
                }
            }
        }
        // Step 5
        re = /^(.+?)e$/;
        if (testIt(re, word)) {
            const fp = execIt(re, word);
            if (fp) {
                stem = fp[1];
                re = new RegExp(mgr1);
                re2 = new RegExp(meq1);
                re3 = new RegExp("^" + consonantSeq + vowel + "[^aeiouwxy]$");
                if (testIt(re, stem) || (testIt(re2, stem) && !testIt(re3, stem))) {
                    word = stem;
                }
            }
        }
        re = /ll$/;
        re2 = new RegExp(mgr1);
        if (testIt(re, word) && testIt(re2, word)) {
            re = /.$/;
            word = word.replace(re, "");
        }
        // Turn initial Y back to y
        if (firstChar === "y") {
            word = "y" + word.substring(1);
        }
        return word;
    }
    return innerStemmer;
}
exports.default = stemmerOuter();
