const Y={},Z=new Set,H=new WeakSet;let K=!0,V,$=!1;function W(o){$||($=!0,K??=!1,V??="hover",G(),J(),Q(),te())}function G(){for(const o of["touchstart","mousedown"])document.addEventListener(o,r=>{L(r.target,"tap")&&P(r.target.href,{ignoreSlowConnection:!0})},{passive:!0})}function J(){let o;document.body.addEventListener("focusin",i=>{L(i.target,"hover")&&r(i)},{passive:!0}),document.body.addEventListener("focusout",s,{passive:!0}),q(()=>{for(const i of document.getElementsByTagName("a"))H.has(i)||L(i,"hover")&&(H.add(i),i.addEventListener("mouseenter",r,{passive:!0}),i.addEventListener("mouseleave",s,{passive:!0}))});function r(i){const f=i.target.href;o&&clearTimeout(o),o=setTimeout(()=>{P(f)},80)}function s(){o&&(clearTimeout(o),o=0)}}function Q(){let o;q(()=>{for(const r of document.getElementsByTagName("a"))H.has(r)||L(r,"viewport")&&(H.add(r),o??=ee(),o.observe(r))})}function ee(){const o=new WeakMap;return new IntersectionObserver((r,s)=>{for(const i of r){const f=i.target,h=o.get(f);i.isIntersecting?(h&&clearTimeout(h),o.set(f,setTimeout(()=>{s.unobserve(f),o.delete(f),P(f.href)},300))):h&&(clearTimeout(h),o.delete(f))}})}function te(){q(()=>{for(const o of document.getElementsByTagName("a"))L(o,"load")&&P(o.href)})}function P(o,r){o=o.replace(/#.*/,"");const s=r?.ignoreSlowConnection??!1;if(oe(o,s))if(Z.add(o),document.createElement("link").relList?.supports?.("prefetch")){const i=document.createElement("link");i.rel="prefetch",i.setAttribute("href",o),document.head.append(i)}else{const i=new Headers;for(const[f,h]of Object.entries(Y))i.set(f,h);fetch(o,{priority:"low",headers:i})}}function oe(o,r){if(!navigator.onLine||!r&&X())return!1;try{const s=new URL(o,location.href);return location.origin===s.origin&&(location.pathname!==s.pathname||location.search!==s.search)&&!Z.has(o)}catch{}return!1}function L(o,r){if(o?.tagName!=="A")return!1;const s=o.dataset.astroPrefetch;return s==="false"?!1:r==="tap"&&(s!=null||K)&&X()?!0:s==null&&K||s===""?r===V:s===r}function X(){if("connection"in navigator){const o=navigator.connection;return o.saveData||/2g/.test(o.effectiveType)}return!1}function q(o){o();let r=!1;document.addEventListener("astro:page-load",()=>{if(!r){r=!0;return}o()})}function re(o={}){const{position:r="right",smoothScroll:s=!0,threshold:i=30,svgPath:f="M18 15l-6-6-6 6",svgStrokeWidth:h="2",borderRadius:U="15",showTooltip:k=!1,showProgressRing:C=!1,progressRingColor:F="yellow",showOnHomepage:I=!1}=o,z=((n,y)=>{if(typeof n=="string")return n;if(typeof n!="object"||n===null)return"Scroll to top";const d=y&&typeof y=="string"?y.toLowerCase().trim():"";if(!d){const v=n.en;return typeof v=="string"?v:"Scroll to top"}let p=n[d];if(typeof p=="string")return p;if(d.includes("-")){const v=d.split("-")[0];if(p=n[v],typeof p=="string")return p}return p=n.en,typeof p=="string"?p:"Scroll to top"})(o.tooltipText,document.documentElement.lang);let g=null;const T=()=>{const n=window.location.pathname.replace(/\/+$/,"")||"/";return n==="/docs"||n==="/docs/index.html"||n==="/"},R=()=>{if(g&&g(),T()&&!I)return;const n=document.createElement("button");n.id="scroll-to-top-button",n.ariaLabel=z,n.setAttribute("aria-describedby",k?"scroll-to-top-tooltip":""),n.setAttribute("role","button"),n.setAttribute("tabindex","0");let y=!1;n.innerHTML=`
      ${C?`
      <svg class="scroll-progress-ring" 
           width="47"   
           height="47" 
           viewBox="0 0 47 47"
           style="position: absolute; top: 0; left: 0;">
        <!-- Background circle -->
        <circle cx="23.5" cy="23.5" r="22" 
                fill="none" 
                stroke="${F}" 
                stroke-width="3" 
                opacity="0.2" />
        <!-- Progress circle -->
        <circle cx="23.5" cy="23.5" r="22" 
                fill="none" 
                stroke="${F}" 
                stroke-width="3" 
                stroke-linecap="round"
                class="scroll-progress-circle"
                style="transform: rotate(-90deg); transform-origin: center;" />
      </svg>
      `:""}
      <svg xmlns="http://www.w3.org/2000/svg" 
           width="35" 
           height="35" 
           viewBox="0 0 24 24"            
           fill="none" 
           stroke="currentColor" 
           stroke-width="${h}" 
           stroke-linecap="round" 
           stroke-linejoin="round"
           style="position: relative; z-index: 1;">
        <path d="${f}"/>
      </svg>
    `;const d=document.createElement("div");d.id="scroll-to-top-tooltip",d.textContent=z;const p=document.createElement("div");p.style.cssText=`
    position: absolute;
    top: 100%; /* Position below the tooltip */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--sl-color-gray-7);
  `;const v=document.createElement("style");v.id="scroll-to-top-styles",v.textContent=`
    .scroll-to-top-button {
      position: fixed;
      bottom: 40px;
      width: 47px;
      height: 47px;
      ${r==="left"?"left: 40px;":r==="right"?"right: 35px;":"left: 50%;"}
      border-radius: ${U}%;     
      background-color: var(--sl-color-accent);       
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;      
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transform: ${r==="center"?"translateX(-50%) scale(0)":"scale(0)"};
      transition: opacity 0.3s ease, visibility 0.3s ease, background-color 0.3s ease, transform 0.3s ease;      
      z-index: 100;            
      border: 1px solid var(--sl-color-accent);
      transform-origin: center;
      -webkit-tap-highlight-color: transparent; /* Disable mobile tap highlight */
      touch-action: manipulation; /* Prevent double-tap zoom */
      box-shadow: 0 0 0 1px rgba(0,0,0,0.04),0 4px 8px 0 rgba(0,0,0,0.2);
    }
      .scroll-to-top-button:active {
        background-color: var(--sl-color-accent-dark); 
        color: var(--sl-text-white);        
        transition: background-color 0.1s ease, transform 0.1s ease; 
     }
      .scroll-to-top-button.visible {
        opacity: 1;
        visibility: visible;
        transform: ${r==="center"?"translateX(-50%) scale(1)":"scale(1)"};        
      }

      .scroll-to-top-button:hover {
        background-color: var(--sl-color-accent-low); 
        box-shadow: 0 0 0 1px rgba(0,0,0,0.04),0 4px 8px 0 rgba(0,0,0,0.2);
        color: var(--sl-color-accent);
        border-color: var(--sl-color-accent);     
      }
      
      .scroll-to-top-button.keyboard-focus {
        outline: 2px solid var(--sl-color-text);
        outline-offset: 2px;
      }

      .scroll-to-top-btn-tooltip {
        position: absolute;
        ${r==="left"?"left: -25px;":"right: -22px;"}
        top: -47px;
        background-color: var(--sl-color-gray-7);
        color: var(--sl-color-text);
        padding: 5px 10px;
        border-radius: 4px;
        font-weight: 400;
        font-size: 14px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s, visibility 0.3s;
        pointer-events: none;
     }
      .scroll-to-top-btn-tooltip.visible {
        opacity: 1;
        visibility: visible;        
      }

      /* Progress ring styles */
      .scroll-progress-ring {
        pointer-events: none;
      }
      
      .scroll-progress-circle {
        stroke-dasharray: 138.23; /* 2 * π * r = 2 * π * 22 ≈ 138.23 */
        stroke-dashoffset: 138.23;
        transition: stroke-dashoffset 0.1s ease;
      }
    `,document.head.appendChild(v),n.classList.add("scroll-to-top-button"),document.body.appendChild(n),k&&(d.classList.add("scroll-to-top-btn-tooltip"),d.appendChild(p),n.appendChild(d));const S=()=>{d.classList.remove("visible")},x=()=>{k&&d.classList.add("visible")};n.addEventListener("mouseenter",()=>{x()}),n.addEventListener("mouseleave",()=>{S()});const E=()=>{S(),window.scrollTo({top:0,behavior:s?"smooth":"auto"}),n.classList.remove("active")};document.addEventListener("keydown",e=>{e.key==="Tab"&&(y=!0)}),n.addEventListener("mousedown",()=>{y=!1}),n.addEventListener("keydown",e=>{e.key==="Enter"&&(E(),n.classList.remove("keyboard-focus"))}),n.addEventListener("focus",()=>{y&&(x(),n.classList.add("keyboard-focus"))}),n.addEventListener("blur",()=>{S(),n.classList.remove("keyboard-focus")}),n.addEventListener("touchstart",e=>{e.preventDefault(),n.classList.add("active")}),n.addEventListener("touchend",e=>{e.preventDefault(),E(),n.classList.remove("active")}),n.addEventListener("click",e=>{e.preventDefault(),E()});function A(e,t){let l;return function(){const a=arguments,c=this;l||(e.apply(c,a),l=!0,setTimeout(()=>l=!1,t))}}const N=()=>{const e=window.scrollY,t=window.innerHeight,l=document.documentElement.scrollHeight,a=e/(l-t);if(C){const u=n.querySelector(".scroll-progress-circle");if(u){let m=a*100;m>=99.5&&(m=100),m<0&&(m=0);const _=138.23,M=_-m/100*_;u.style.strokeDashoffset=M.toString()}}const c=i>=10&&i<=99?i:30;a>c/100?n.classList.add("visible"):n.classList.remove("visible")},B=A(N,16);window.addEventListener("scroll",B),N();const D=()=>{document.documentElement.classList.contains("theme-dark")?(d.style.backgroundColor="var(--sl-color-gray-7)",d.style.color="var(--sl-color-text)",p.style.borderTopColor="var(--sl-color-gray-7)"):(d.style.backgroundColor="black",d.style.color="white",p.style.borderTopColor="black")};D();const O=new MutationObserver(D);return O.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),g=()=>{window.removeEventListener("scroll",B),O.disconnect(),n&&n.parentNode&&n.parentNode.removeChild(n);const e=document.getElementById("scroll-to-top-styles");e&&e.remove()},g},w=()=>{setTimeout(R,10)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",w):w(),document.addEventListener("astro:page-load",w),document.addEventListener("astro:before-preparation",()=>{g&&g()})}re({position:"right",tooltipText:"Scroll to top",smoothScroll:!0,threshold:30,svgPath:"M7 14l5-5 5 5 M7 19l5-5 5 5",svgStrokeWidth:1.8,borderRadius:"0",showTooltip:!1,showProgressRing:!1,progressRingColor:"yellow",showOnHomepage:!1});(function(){if(document.getElementById("expressive-code-fullscreen-styles"))return;const o=document.createElement("style");o.id="expressive-code-fullscreen-styles",o.textContent=`/* Layer order */
@layer starlight, ecFullscreen;

@layer ecFullscreen {

  .cb-fullscreen__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(76, 75, 75, 0.8);
    color: #ffffff;
    z-index: 9999;
    overflow: auto;
    padding: 1.25rem;
    box-sizing: border-box;
    visibility: hidden;
    transform: scale(0.01);
    transition: transform cubic-bezier(0.17, 0.67, 0.5, 0.71) var(--ec-fullscreen-animation-duration, 150ms);
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .cb-fullscreen__content {
    width: 100%;
    max-width: 95%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .cb-fullscreen__container--open {
    visibility: visible;
    transform: scale(1);
  }

  .expressive-code.cb-fullscreen__active {
    width: 100% !important;
    max-width: none !important;
    height: auto !important;
    margin: 0 !important;
    margin-bottom: 4rem !important;
    background-color: #1e1e1e;
    border-radius: 0.625rem;
    box-shadow: 0 1.25rem 3.75rem rgba(0, 0, 0, 0.5);
  }

  .expressive-code.cb-fullscreen__active pre,
  .expressive-code.cb-fullscreen__active code {
    font-size: calc(1em * var(--ec-font-scale, 1)) !important;
  }

  .expressive-code.cb-fullscreen__active .frame {
    font-size: calc(1em * var(--ec-font-scale, 1)) !important;
  }

  .cb-fullscreen__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    padding: 0.25rem;
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0.7;
    transition:
      opacity 0.2s,
      background-color 0.2s,
      border-color 0.2s,
      transform 0.2s ease;
    border-radius: 0.25rem;
    color: inherit;
    position: relative;
  }

  .cb-fullscreen__button:hover {
    opacity: 1;
    background-color: var(--sl-color-gray-5, rgba(255, 255, 255, 0.1));
    /* border-color: var(--sl-color-gray-7, rgba(255, 255, 255, 0.5)); */
    border: 1px solid var(--sl-color-gray-7, rgba(255, 255, 255, 0.5));
    transform: scale(1.1);
  }

  .cb-fullscreen__button:focus {
    outline: 2px solid var(--sl-color-white, rgba(255, 255, 255, 0.5));
    outline-offset: 0.125rem;
  }

  .cb-fullscreen__button .fullscreen-on {
    display: inline;
  }

  .cb-fullscreen__button .fullscreen-off {
    display: none;
  }

  .expressive-code.cb-fullscreen__active .cb-fullscreen__button .fullscreen-on {
    display: none;
  }

  .expressive-code.cb-fullscreen__active .cb-fullscreen__button .fullscreen-off {
    display: inline;
  }

  /* Ensure fullscreen container has proper text color */
  .cb-fullscreen__container {
    color: var(--ec-txt-clr, var(--sl-color-white, #ffffff));
  }



  /* Custom tooltip for fullscreen button */
  .cb-fullscreen__button[data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 0.5rem;
    background-color: var(--sl-color-gray-5, #000000);
    color: var(--sl-color-text, #ffffff);
    padding: 0.375rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    white-space: nowrap;
    z-index: 1900;
    opacity: 0;
    animation: tooltipFadeIn 0.2s ease 0.5s forwards;
    pointer-events: none;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3);
    border: 1px solid var(--sl-color-gray-4, rgba(255, 255, 255, 0.1));
  }

  /* Tooltip arrow */
  .cb-fullscreen__button[data-tooltip]:hover::before {
    content: "";
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%) translateX(1px);
    margin-right: 0.25rem;
    width: 0;
    height: 0;
    border-top: 0.25rem solid transparent;
    border-bottom: 0.25rem solid transparent;
    font-size: 1rem;
    border-left: 0.25rem solid var(--sl-color-gray-5, #000000);
    z-index: 1901;
    opacity: 0;
    animation: tooltipFadeIn 0.2s ease 0.5s forwards;
    pointer-events: none;
  }

  @keyframes tooltipFadeIn {
    to {
      opacity: 1;
    }
  }

  /* Ensure tooltip positioning works correctly for header buttons */
  .cb-fullscreen__button {
    position: relative;
  }

  /* Hint message below code block in fullscreen */
  .cb-fullscreen__hint {
    position: absolute;
    bottom: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: #ffffff;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    opacity: 0;
    animation: simpleShow 0.3s ease 1s forwards;
    pointer-events: none;
    z-index: 10110;
    backdrop-filter: blur(0.25rem);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.3);
  }

  @keyframes simpleShow {
    to {
      opacity: 0.85;
    }
  }

  .cb-fullscreen__hint kbd {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: bold;
    margin: 0 0.125rem;
  }


  /* Mobile-specific optimizations */
  @media (max-width: 768px) {
    .cb-fullscreen__container {
      padding: 0.75rem;
    }

    .expressive-code.cb-fullscreen__active {
      margin-bottom: 2rem !important;
      border-radius: 0.375rem;
    }

    .cb-fullscreen__button {
      width: 2rem;
      height: 2rem;
      padding: 0.375rem;
    }

    .cb-fullscreen__hint {
      bottom: 0.75rem;
      font-size: 1.125rem;
      padding: 0.5rem 1rem;
    }

    /* Disable tooltips on mobile to prevent issues with touch */
    .cb-fullscreen__button[data-tooltip]:hover::after,
    .cb-fullscreen__button[data-tooltip]:hover::before {
      display: none;
    }
  }

  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    .cb-fullscreen__button:hover {
      transform: none;
      background-color: transparent;
      border: none;
    }

    .cb-fullscreen__button[data-tooltip]:hover::after,
    .cb-fullscreen__button[data-tooltip]:hover::before {
      display: none;
    }
  }

  /* Font size controls */
  .cb-fullscreen__font-controls {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: var(--sl-color-bg-nav , var(--sl-color-gray-6, rgba(0, 0, 0, 0.1)));
    border-radius: 8px;
    padding: 0.25rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    justify-content: center;
  }

  .cb-fullscreen__font-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
    margin-left: 0.5rem;
    background: var(--sl-color-gray-5);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: var(--sl-color-white, #ffffff);
    transition: all 0.2s ease;
    position: relative;
    min-width: 36px;
    min-height: 36px;
  }

  .cb-fullscreen__font-btn:hover {
    background: var(--sl-color-gray-4, rgba(255, 255, 255, 0.15));
    transform: scale(1.05);
  }


  .cb-fullscreen__font-btn:focus {
    outline: 2px solid var(--sl-color-white, rgba(255, 255, 255, 0.5));
    outline-offset: 0.125rem;
  }

  .cb-fullscreen__font-btn:active {
    transform: scale(0.95);
  }

  .cb-fullscreen__font-btn svg {
    width: 1rem;
    height: 1rem;
    stroke-width: 2.5;
  }

  /* Mobile optimizations for font controls */
  @media (max-width: 768px) {
    .cb-fullscreen__content {
      max-width: 95%;
      gap: 0.75rem;
    }

    .cb-fullscreen__font-btn {
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.5rem;
    }

    .cb-fullscreen__font-btn svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  /* Tooltip styles for font buttons */
  .cb-fullscreen__font-btn--decrease::after {
    content: attr(title);
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    /* background-color: var(--sl-color-gray-2); */
    background-color: var(--sl-color-gray-5, #000000);
    /* color: var(--sl-text-reverse, #ffffff); */
    padding: 0.375rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
    pointer-events: none;
    z-index: 10001;
    margin-right: 0.5rem;
    border: 1px solid var(--sl-color-gray-4, rgba(255, 255, 255, 0.3));
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3);
  }

  .cb-fullscreen__font-btn--decrease:hover::after {
    opacity: 1;
    visibility: visible;
  }

  .cb-fullscreen__font-btn--increase::after {
    content: attr(title);
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--sl-color-gray-5, #000000);
    /* color: var(--sl-text-, #ffffff); */
    padding: 0.375rem 0.5rem;
    border-radius: 0.25rem;
    font-weight: 400;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
    pointer-events: none;
    z-index: 10001;
    margin-left: 0.5rem;
    border: 1px solid var(--sl-color-gray-4, rgba(255, 255, 255, 0.3));
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3);
  }

  .cb-fullscreen__font-btn--increase:hover::after {
    opacity: 1;
    visibility: visible;
  }

  /* Respect user preference for reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .cb-fullscreen__container {
      transition: none;
      transform: none;
    }

    .cb-fullscreen__container--open {
      transform: none;
    }

    .cb-fullscreen__font-btn {
      transition: none;
    }

    .cb-fullscreen__font-btn:hover {
      transform: none;
    }

    .cb-fullscreen__font-btn--decrease::after,
    .cb-fullscreen__font-btn--increase::after {
      transition: none;
    }
  }
}
`,document.head.appendChild(o)})();function ne(o){const r={MIN_FONT_SIZE:60,MAX_FONT_SIZE:500,DEFAULT_FONT_SIZE:100,FONT_ADJUSTMENT:10,DOUBLE_CLICK_THRESHOLD:600,HINT_DISPLAY_TIME:4e3,FADE_TRANSITION_TIME:500,MIN_BLOCK_HEIGHT:95,MIN_ANIMATION_DURATION:150,MAX_ANIMATION_DURATION:700,DEFAULT_ANIMATION_DURATION:200};document.addEventListener("DOMContentLoaded",()=>{if(window.expressiveCodeFullscreenInitialized)return;window.expressiveCodeFullscreenInitialized=!0;const s={isFullscreenActive:!1,scrollPosition:0,originalCodeBlock:null,fontSize:r.DEFAULT_FONT_SIZE,focusTrapHandler:null},i={fullscreenContainer:null,get container(){return this.fullscreenContainer||(this.fullscreenContainer=document.querySelector(".cb-fullscreen__container")),this.fullscreenContainer}};(!Number.isInteger(o.animationDuration)||o.animationDuration<r.MIN_ANIMATION_DURATION||o.animationDuration>r.MAX_ANIMATION_DURATION)&&(o.animationDuration=r.DEFAULT_ANIMATION_DURATION);const f={storageKey:"expressiveCodeFullscreenFontSize",loadFontSize(){try{const e=localStorage.getItem(this.storageKey);if(e){const t=parseInt(e,10);if(t>=r.MIN_FONT_SIZE&&t<=r.MAX_FONT_SIZE)return t}}catch{console.warn("Could not load font size from localStorage")}return r.DEFAULT_FONT_SIZE},saveFontSize(e){try{localStorage.setItem(this.storageKey,e.toString())}catch{console.warn("Could not save font size to localStorage")}},adjustFontSize(e,t){const l=Math.max(r.MIN_FONT_SIZE,Math.min(r.MAX_FONT_SIZE,s.fontSize+e));s.fontSize=l,this.saveFontSize(l),this.applyFontSize(t)},resetFontSize(e){s.fontSize=r.DEFAULT_FONT_SIZE,this.saveFontSize(r.DEFAULT_FONT_SIZE),this.applyFontSize(e)},applyFontSize(e){if(e){const t=s.fontSize/100;e.style.setProperty("--ec-font-scale",t)}}};function h(){if(document.querySelector(".cb-fullscreen__container"))return;const e=document.createElement("div");e.className="cb-fullscreen__container",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-label","Code block in fullscreen view"),e.setAttribute("tabindex","-1"),e.style.setProperty("--ec-fullscreen-animation-duration",`${o.animationDuration}ms`),document.body.appendChild(e)}function U(){const e=document.createElement("div");return e.className="cb-fullscreen__font-controls",e.innerHTML=`
			<button class="cb-fullscreen__font-btn cb-fullscreen__font-btn--decrease" aria-label="Decrease font size" title="Decrease font size (Double-click to reset)">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14"/>
				</svg>
			</button>
			<button class="cb-fullscreen__font-btn cb-fullscreen__font-btn--increase" aria-label="Increase font size" title="Increase font size">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 5v14m-7-7h14"/>
				</svg>
			</button>
		`,e}function k(){const e=document.createElement("div");return e.className="cb-fullscreen__hint",e.innerHTML="Press <kbd>Esc</kbd> to exit full screen",e}function C(){const e=window.getComputedStyle(document.body).backgroundColor;if(e&&e!=="rgba(0, 0, 0, 0)"&&e!=="transparent")return e;const t=window.getComputedStyle(document.documentElement).backgroundColor;return t&&t!=="rgba(0, 0, 0, 0)"&&t!=="transparent"?t:"#ffffff"}function F(e){const t=e.match(/\d+/g);return t&&t.length>=3?(parseInt(t[0])*299+parseInt(t[1])*587+parseInt(t[2])*114)/1e3>128?"#000000":"#ffffff":"#000000"}function I(){const e=document.createElement("button");return e.className="cb-fullscreen__button",e.type="button",e.setAttribute("aria-label",o.fullscreenButtonTooltip),e.setAttribute("aria-expanded","false"),e.setAttribute("data-tooltip",o.fullscreenButtonTooltip),e.innerHTML=`
      <svg class="fullscreen-on" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="${o.svgPathFullscreenOn}" stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg class="fullscreen-off" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="${o.svgPathFullscreenOff}" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,e}function j(e){if(e.querySelector(".cb-fullscreen__button"))return;const t=e.querySelector(".frame");if(!t)return;const l=t.classList.contains("has-title")||t.classList.contains("is-terminal");if(!o.addToUntitledBlocks&&!l)return;const a=e.querySelector("figcaption.header");if(l){if(a){const c=I();getComputedStyle(a).position==="static"&&(a.style.position="relative"),c.style.cssText=`
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
      `,a.appendChild(c)}}else{const c=e.querySelector(".copy");if(c){const u=document.createElement("div");u.style.cssText=`
			  position: absolute;
			  top: 50px;
			  right: 12px;
			  z-index: 15;
			  pointer-events: auto;
			`;const m=I();u.appendChild(m),t.offsetHeight>r.MIN_BLOCK_HEIGHT&&c.parentNode.appendChild(u)}}}function z(){document.querySelectorAll(".expressive-code").forEach(t=>{j(t)}),document.querySelectorAll(".cb-fullscreen__button").forEach(t=>{const l=t.cloneNode(!0);t.parentNode.replaceChild(l,t),l.addEventListener("click",g),l.addEventListener("keydown",function(a){(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),g.call(this,a))})})}function g(e){e.preventDefault(),e.stopPropagation();const t=this.closest(".expressive-code");t&&T(t)}function T(e){const t=i.container;s.isFullscreenActive?w(t):R(e,t)}function R(e,t){s.originalCodeBlock=e,s.fontSize=f.loadFontSize();const l=e.querySelector(".cb-fullscreen__button");l&&l.setAttribute("aria-expanded","true");const a=e.cloneNode(!0);a.classList.add("cb-fullscreen__active");const c=a.querySelector(".cb-fullscreen__button");c&&(c.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),T(a)}),c.addEventListener("keydown",function(b){(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),T(a))})),n(),d(!0),o.enableEscapeKey&&v(),o.exitOnBrowserBack&&(history.pushState({fullscreenActive:!0},"",window.location.href),E());const u=C(),m=F(u);t.style.backgroundColor=u,t.style.color=m;const _=document.createElement("div");_.className="cb-fullscreen__content";const M=U();if(_.appendChild(M),_.appendChild(a),t.appendChild(_),D(M,a),f.applyFontSize(a),o.enableEscapeKey){const b=k();t.appendChild(b),setTimeout(()=>{b&&b.parentNode&&(b.style.setProperty("transition","opacity 0.9s ease","important"),b.style.setProperty("opacity","0","important"),setTimeout(()=>{b&&b.parentNode&&b.remove()},r.FADE_TRANSITION_TIME))},r.HINT_DISPLAY_TIME)}t.classList.add("cb-fullscreen__container--open"),s.isFullscreenActive=!0,t.focus(),N(t)}function w(e){if(d(!1),y(),o.enableEscapeKey&&S(),o.exitOnBrowserBack&&(A(),history.state&&history.state.fullscreenActive&&history.back()),B(),e.classList.remove("cb-fullscreen__container--open"),e.style.backgroundColor="",e.style.color="",e.innerHTML="",s.isFullscreenActive=!1,s.originalCodeBlock){const t=s.originalCodeBlock.querySelector(".cb-fullscreen__button");t&&(t.setAttribute("aria-expanded","false"),t.blur())}s.originalCodeBlock=null}function n(){s.scrollPosition=window.scrollY||document.documentElement.scrollTop}function y(){typeof s.scrollPosition=="number"&&!isNaN(s.scrollPosition)&&setTimeout(()=>{window.scrollTo({top:s.scrollPosition,behavior:"smooth"})},0)}function d(e){e?(document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden"):(document.body.style.overflow="",document.documentElement.style.overflow="")}function p(e){if(e.key==="Escape"&&s.isFullscreenActive){const t=i.container;t&&w(t)}}function v(){document.removeEventListener("keyup",p),document.addEventListener("keyup",p)}function S(){document.removeEventListener("keyup",p)}function x(e){if(s.isFullscreenActive&&(!e.state||!e.state.fullscreenActive)){const l=i.container;l&&(A(),w(l))}}function E(){window.removeEventListener("popstate",x),window.addEventListener("popstate",x)}function A(){window.removeEventListener("popstate",x)}function N(e){const t=e.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"], summary, audio[controls], video[controls]');if(t.length===0)return;const l=t[0],a=t[t.length-1];function c(u){u.key==="Tab"&&(u.shiftKey?document.activeElement===l&&(u.preventDefault(),a.focus()):document.activeElement===a&&(u.preventDefault(),l.focus()))}e.addEventListener("keydown",c),s.focusTrapHandler=c}function B(){const e=i.container;e&&s.focusTrapHandler&&(e.removeEventListener("keydown",s.focusTrapHandler),s.focusTrapHandler=null)}function D(e,t){const l=e.querySelector(".cb-fullscreen__font-btn--decrease"),a=e.querySelector(".cb-fullscreen__font-btn--increase");let c={lastClickTime:0,clickCount:0};l.addEventListener("click",u=>{const m=Date.now();m-c.lastClickTime<r.DOUBLE_CLICK_THRESHOLD?(c.clickCount++,c.clickCount===2&&(f.resetFontSize(t),c.clickCount=0)):(c.clickCount=1,f.adjustFontSize(-10,t)),c.lastClickTime=m,u.target.blur()}),a.addEventListener("click",u=>{f.adjustFontSize(r.FONT_ADJUSTMENT,t),u.target.blur()})}function O(){h(),z()}O()})}ne({fullscreenButtonTooltip:"Toggle fullscreen view",enableEscapeKey:!0,exitOnBrowserBack:!0,addToUntitledBlocks:!1,animationDuration:200,svgPathFullscreenOn:"M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z",svgPathFullscreenOff:"M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"});W();export{re as default};
