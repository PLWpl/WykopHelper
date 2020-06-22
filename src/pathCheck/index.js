const path = location.href;

const isPath = {
  main: () => {
    if (
      path.indexOf("wykop.pl/link/") > -1 ||
      path.indexOf("wykop.pl/mikroblog/") > -1 ||
      path.indexOf("wykop.pl/wpis/") > -1 ||
      path.indexOf("wykop.pl/moj/") > -1 ||
      path.indexOf("wykop.pl/tag/wpisy") > -1
    ) {
      return true;
    }
    return false;
  },

  settings: () => !!(path.indexOf("wykop.pl/ustawienia/") > -1),
  
  whSettings: () => !!(path.indexOf("wykop.pl/ustawienia/wykophelper") > -1),
};

export default isPath;
