export function checkIsEmailPaylivre(email) {
  var re = new RegExp(/(\W|^)[\w.+\-]*@paylivre\.com(\W|$)/gi);
  if (re.test(email)) {
    return true;
  } else {
    return false;
  }
}
