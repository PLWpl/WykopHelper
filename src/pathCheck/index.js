const path = location.href;

export const isPathForMain = () => {
  if (
    path.indexOf('wykop.pl/link/') > -1
    || path.indexOf('wykop.pl/mikroblog/') > -1
    || path.indexOf('wykop.pl/wpis/') > -1
    || path.indexOf('wykop.pl/moj/') > -1
    || path.indexOf('wykop.pl/tag/wpisy') > -1
  ) { 
    return true;
  }
  return false;
}