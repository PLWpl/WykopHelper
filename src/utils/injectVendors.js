export const injectScripts = () => {
  // const URLS = [
  //   'https://cdn.jsdelivr.net/npm/sweetalert2@9',
  //   'https://unpkg.com/@popperjs/core@2',
  //   'https://unpkg.com/tippy.js@6'
  // ]
  
  // const appendScript = src => {
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.src = src;
  //   script.async = false;
  //   script.defer = false;
  //   document.head.insertBefore(script, document.head.childNodes[0]);
  // };
  
  // URLS.forEach(src => appendScript(src));

  const markup = `
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <script type="text/javascript" src="https://unpkg.com/@popperjs/core@2"></script>
    <script type="text/javascript" src="https://unpkg.com/tippy.js@6"></script>
  `;
  document.body.insertAdjacentHTML('beforeend', markup);
}

