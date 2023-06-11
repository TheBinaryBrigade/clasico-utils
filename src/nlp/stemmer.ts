// Porter stemmer in Javascript. Few comments, but it's easy to follow against the rules in the original
// paper, in
//
//  Porter, 1980, An algorithm for suffix stripping, Program, Vol. 14,
//  no. 3, pp 130-137,
//
// see also http://www.tartarus.org/~martin/PorterStemmer

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

  type Step2List = typeof step2list;
  type Step3List = typeof step3list;

  const consonant = "[^aeiou]";
  const vowel = "[aeiouy]";
  const consonantSeq = consonant + "[^aeiouy]*";
  const vowelSeq = vowel + "[aeiou]*";

  const mgr0 = "^(" + consonantSeq + ")?" + vowelSeq + consonantSeq; // [C]VC... is m>0
  const meq1 = "^(" + consonantSeq + ")?" + vowelSeq + consonantSeq + "(" + vowelSeq + ")?$"; // [C]VC[V] is m=1
  const mgr1 = "^(" + consonantSeq + ")?" + vowelSeq + consonantSeq + vowelSeq + consonantSeq; // [C]VCVC... is m>1
  const sV = "^(" + consonantSeq + ")?" + vowel; // vowel in stem

  const DEBUG_MODE = false;

  function execIt(re: RegExp, word: string): RegExpExecArray | null {
    // TODO: check behavior of exec in web and other envs
    const result = re.exec(word);

    if (DEBUG_MODE && result === null) {
      // tslint:disable-next-line:no-console
      console.warn("[STEMMER] failed to exec string", {string: word, re});
    }

    return result;
  }

  function innerStemmer(word: string): string {
    let stem;
    let suffix;
    let re;
    let re2;
    let re3;
    let re4;

    if (word.length < 3) {
      return word;
    }

    const firstChar = word.substring(0, 1);
    if (firstChar === "y") {
      word = firstChar.toUpperCase() + word.substring(1);
    }

    // Step 1a
    re = /^(.+?)(ss|i)es$/;
    re2 = /^(.+?)([^s])s$/;

    if (re.test(word)) {
      word = word.replace(re, "$1$2");
    } else if (re2.test(word)) {
      word = word.replace(re2, "$1$2");
    }

    // Step 1b
    re = /^(.+?)eed$/;
    re2 = /^(.+?)(ed|ing)$/;
    re3 = /^(.+?)(ly)$/;
    re4 = /^(.+?)(s)$/;
    if (re.test(word)) {
      const fp = execIt(re, word);
      if (fp) {
        re = new RegExp(mgr0);
        if (re.test(fp[1])) {
          re = /.$/;
          word = word.replace(re, "");
        }
      }
    } else if (re2.test(word)) {
      const fp = execIt(re2, word);
      if (fp) {
        stem = fp[1];
        re2 = new RegExp(sV);
        if (re2.test(stem)) {
          word = stem;
          re2 = /(at|bl|iz)$/;
          re3 = new RegExp("([^aeiouylsz])\\1$");
          re4 = new RegExp("^" + consonantSeq + vowel + "[^aeiouwxy]$");
          if (re2.test(word)) {
            word = word + "e";
          } else if (re3.test(word)) {
            re = /.$/;
            word = word.replace(re, "");
          } else if (re4.test(word)) {
            word = word + "e";
          }
        }
      }
    } else if (re3.test(word)) {
      const fp = execIt(re3, word);
      if (fp) {
        stem = fp[1];
        re = new RegExp(sV);
        if (re.test(stem)) {
          word = stem;
        }
      }
    } else if (re4.test(word)) {
      const fp = execIt(re4, word);
      if (fp) {
        stem = fp[1];
        re = new RegExp(sV);
        if (re.test(stem)) {
          word = stem;
        }
      }
    }

    // Step 1c
    re = /^(.+?)y$/;
    if (re.test(word)) {
      const fp = execIt(re, word);
      if (fp) {
        stem = fp[1];
        re = new RegExp(sV);
        if (re.test(stem)) {
          word = stem + "i";
        }
      }
    }

    // Step 2
    re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (re.test(word)) {
      const fp = execIt(re, word);
      if (fp) {
        stem = fp[1];
        suffix = fp[2] as keyof Step2List; // SAFETY: suffix will be checked to be in obj
        re = new RegExp(mgr0);
        if (re.test(stem) && suffix in step2list) {
          word = stem + step2list[suffix];
        }
      }
    }

    // Step 3
    re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (re.test(word)) {
      const fp = execIt(re, word);
      if (fp) {
        stem = fp[1];
        suffix = fp[2] as keyof Step3List; // SAFETY: suffix will be checked to be in obj
        re = new RegExp(mgr0);
        if (re.test(stem) && suffix in step3list) {
          word = stem + step3list[suffix];
        }
      }
    }

    // Step 4
    re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    re2 = /^(.+?)([st])(ion)$/;
    if (re.test(word)) {
      const fp = execIt(re, word);
      if (fp) {
        stem = fp[1];
        re = new RegExp(mgr1);
        if (re.test(stem)) {
          word = stem;
        }
      }
    } else if (re2.test(word)) {
      const fp = execIt(re2, word);
      if (fp) {
        stem = fp[1] + fp[2];
        re2 = new RegExp(mgr1);
        if (re2.test(stem)) {
          word = stem;
        }
      }
    }

    // Step 5
    re = /^(.+?)e$/;
    if (re.test(word)) {
      const fp = execIt(re, word);
      if (fp) {
        stem = fp[1];
        re = new RegExp(mgr1);
        re2 = new RegExp(meq1);
        re3 = new RegExp("^" + consonantSeq + vowel + "[^aeiouwxy]$");
        if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
          word = stem;
        }
      }
    }

    re = /ll$/;
    re2 = new RegExp(mgr1);
    if (re.test(word) && re2.test(word)) {
      re = /.$/;
      word = word.replace(re, "");
    }

    // and turn initial Y back to y

    if (firstChar === "y") {
      word = firstChar.toLowerCase() + word.substring(1);
    }

    return word;
  }

  return innerStemmer;
}

export default stemmerOuter();
