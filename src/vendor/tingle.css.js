export const tingleCss = `.tingle-modal *{box-sizing:border-box}.tingle-modal{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1000;display:flex;visibility:hidden;flex-direction:column;align-items:center;overflow:hidden;-webkit-overflow-scrolling:touch;background:rgba(0,0,0,.9);opacity:0;cursor:url("data:image/svg+xml,%3Csvg width='19' height='19' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.514.535l-6.42 6.42L2.677.536a1.517 1.517 0 00-2.14 0 1.517 1.517 0 000 2.14l6.42 6.419-6.42 6.419a1.517 1.517 0 000 2.14 1.517 1.517 0 002.14 0l6.419-6.42 6.419 6.42a1.517 1.517 0 002.14 0 1.517 1.517 0 000-2.14l-6.42-6.42 6.42-6.418a1.517 1.517 0 000-2.14 1.516 1.516 0 00-2.14 0z' fill='%23FFF' fill-rule='nonzero'/%3E%3C/svg%3E"),auto}@supports ((-webkit-backdrop-filter:blur(12px)) or (backdrop-filter:blur(12px))){.tingle-modal{-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}}.tingle-modal--confirm .tingle-modal-box{text-align:center}.tingle-modal--noOverlayClose{cursor:default}.tingle-modal--noClose .tingle-modal__close{display:none}.tingle-modal__close{position:fixed;top:2.5rem;right:2.5rem;z-index:1000;padding:0;width:2rem;height:2rem;border:none;background-color:transparent;color:#fff;cursor:pointer}.tingle-modal__close svg *{fill:currentColor}.tingle-modal__closeLabel{display:none}.tingle-modal__close:hover{color:#fff}.tingle-modal-box{position:relative;flex-shrink:0;margin-top:auto;margin-bottom:auto;width:60%;border-radius:4px;background:#fff;opacity:1;cursor:auto;will-change:transform,opacity}.tingle-modal-box__content{padding:3rem 3rem}.tingle-modal-box__footer{padding:1.5rem 2rem;width:auto;border-bottom-right-radius:4px;border-bottom-left-radius:4px;background-color:#f5f5f5;cursor:auto}.tingle-modal-box__footer::after{display:table;clear:both;content:""}.tingle-modal-box__footer--sticky{position:fixed;bottom:-200px;z-index:10001;opacity:1;transition:bottom .3s ease-in-out .3s}.tingle-enabled{position:fixed;right:0;left:0;overflow:hidden}.tingle-modal--visible .tingle-modal-box__footer{bottom:0}.tingle-modal--visible{visibility:visible;opacity:1}.tingle-modal--visible .tingle-modal-box{animation:scale .2s cubic-bezier(.68,-.55,.265,1.55) forwards}.tingle-modal--overflow{overflow-y:scroll;padding-top:8vh}.tingle-btn{display:inline-block;margin:0 .5rem;padding:1rem 2rem;border:none;background-color:grey;box-shadow:none;color:#fff;vertical-align:middle;text-decoration:none;font-size:inherit;font-family:inherit;line-height:normal;cursor:pointer;transition:background-color .4s ease}.tingle-btn--primary{background-color:#3498db}.tingle-btn--danger{background-color:#e74c3c}.tingle-btn--default{background-color:#34495e}.tingle-btn--pull-left{float:left}.tingle-btn--pull-right{float:right}@media (max-width :540px){.tingle-modal{top:0;display:block;padding-top:60px;width:100%}.tingle-modal-box{width:auto;border-radius:0}.tingle-modal-box__content{overflow-y:scroll}.tingle-modal--noClose{top:0}.tingle-modal--noOverlayClose{padding-top:0}.tingle-modal-box__footer .tingle-btn{display:block;float:none;margin-bottom:1rem;width:100%}.tingle-modal__close{top:0;right:0;left:0;display:block;width:100%;height:60px;border:none;background-color:#2c3e50;box-shadow:none;color:#fff}.tingle-modal__closeLabel{display:inline-block;vertical-align:middle;font-size:1.6rem;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif}.tingle-modal__closeIcon{display:inline-block;margin-right:.8rem;width:1.6rem;vertical-align:middle;font-size:0}}@keyframes scale{0%{opacity:0;transform:scale(.9)}100%{opacity:1;transform:scale(1)}}`;