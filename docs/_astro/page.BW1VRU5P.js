const Y={},Z=new Set,H=new WeakSet;let R=!0,V,$=!1;function W(o){$||($=!0,R??=!1,V??="hover",G(),J(),Q(),te())}function G(){for(const o of["touchstart","mousedown"])document.addEventListener(o,n=>{C(n.target,"tap")&&P(n.target.href,{ignoreSlowConnection:!0})},{passive:!0})}function J(){let o;document.body.addEventListener("focusin",i=>{C(i.target,"hover")&&n(i)},{passive:!0}),document.body.addEventListener("focusout",s,{passive:!0}),K(()=>{for(const i of document.getElementsByTagName("a"))H.has(i)||C(i,"hover")&&(H.add(i),i.addEventListener("mouseenter",n,{passive:!0}),i.addEventListener("mouseleave",s,{passive:!0}))});function n(i){const f=i.target.href;o&&clearTimeout(o),o=setTimeout(()=>{P(f)},80)}function s(){o&&(clearTimeout(o),o=0)}}function Q(){let o;K(()=>{for(const n of document.getElementsByTagName("a"))H.has(n)||C(n,"viewport")&&(H.add(n),o??=ee(),o.observe(n))})}function ee(){const o=new WeakMap;return new IntersectionObserver((n,s)=>{for(const i of n){const f=i.target,h=o.get(f);i.isIntersecting?(h&&clearTimeout(h),o.set(f,setTimeout(()=>{s.unobserve(f),o.delete(f),P(f.href)},300))):h&&(clearTimeout(h),o.delete(f))}})}function te(){K(()=>{for(const o of document.getElementsByTagName("a"))C(o,"load")&&P(o.href)})}function P(o,n){o=o.replace(/#.*/,"");const s=n?.ignoreSlowConnection??!1;if(oe(o,s))if(Z.add(o),document.createElement("link").relList?.supports?.("prefetch")){const i=document.createElement("link");i.rel="prefetch",i.setAttribute("href",o),document.head.append(i)}else{const i=new Headers;for(const[f,h]of Object.entries(Y))i.set(f,h);fetch(o,{priority:"low",headers:i})}}function oe(o,n){if(!navigator.onLine||!n&&X())return!1;try{const s=new URL(o,location.href);return location.origin===s.origin&&(location.pathname!==s.pathname||location.search!==s.search)&&!Z.has(o)}catch{}return!1}function C(o,n){if(o?.tagName!=="A")return!1;const s=o.dataset.astroPrefetch;return s==="false"?!1:n==="tap"&&(s!=null||R)&&X()?!0:s==null&&R||s===""?n===V:s===n}function X(){if("connection"in navigator){const o=navigator.connection;return o.saveData||/2g/.test(o.effectiveType)}return!1}function K(o){o();let n=!1;document.addEventListener("astro:page-load",()=>{if(!n){n=!0;return}o()})}function ne(o={}){const{position:n="right",smoothScroll:s=!0,threshold:i=30,svgPath:f="M18 15l-6-6-6 6",svgStrokeWidth:h="2",borderRadius:q="15",showTooltip:k=!1,showProgressRing:z=!1,progressRingColor:F="yellow",showOnHomepage:I=!1}=o,A=((r,y)=>{if(typeof r=="string")return r;if(typeof r!="object"||r===null)return"Scroll to top";const u=y&&typeof y=="string"?y.toLowerCase().trim():"";if(!u){const v=r.en;return typeof v=="string"?v:"Scroll to top"}let p=r[u];if(typeof p=="string")return p;if(u.includes("-")){const v=u.split("-")[0];if(p=r[v],typeof p=="string")return p}return p=r.en,typeof p=="string"?p:"Scroll to top"})(o.tooltipText,document.documentElement.lang);let g=null;const T=()=>document.querySelector(".hero")||document.querySelector(".sl-hero")||document.querySelector('[data-page="index"]')||document.querySelector(".landing-page")||document.querySelector(".homepage")||document.querySelector("[data-starlight-homepage]")||document.querySelector(".site-hero")||document.body.classList.contains("homepage")||document.body.classList.contains("homepage")||document.body.classList.contains("landing")||document.querySelector("main.sl-main")&&document.querySelector("main.sl-main .hero, main.sl-main .sl-hero"),U=()=>{if(g&&g(),T()&&!I)return;const r=document.createElement("button");r.id="scroll-to-top-button",r.ariaLabel=A,r.setAttribute("aria-describedby",k?"scroll-to-top-tooltip":""),r.setAttribute("role","button"),r.setAttribute("tabindex","0");let y=!1;r.innerHTML=`
      ${z?`
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
    `;const u=document.createElement("div");u.id="scroll-to-top-tooltip",u.textContent=A;const p=document.createElement("div");p.style.cssText=`
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
      ${n==="left"?"left: 40px;":n==="right"?"right: 35px;":"left: 50%;"}
      border-radius: ${q}%;     
      background-color: var(--sl-color-accent);       
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;      
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transform: ${n==="center"?"translateX(-50%) scale(0)":"scale(0)"};
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
        transform: ${n==="center"?"translateX(-50%) scale(1)":"scale(1)"};        
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
        ${n==="left"?"left: -25px;":"right: -22px;"}
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
    `,document.head.appendChild(v),r.classList.add("scroll-to-top-button"),document.body.appendChild(r),k&&(u.classList.add("scroll-to-top-btn-tooltip"),u.appendChild(p),r.appendChild(u));const S=()=>{u.classList.remove("visible")},x=()=>{k&&u.classList.add("visible")};r.addEventListener("mouseenter",()=>{x()}),r.addEventListener("mouseleave",()=>{S()});const E=()=>{S(),window.scrollTo({top:0,behavior:s?"smooth":"auto"}),r.classList.remove("active")};document.addEventListener("keydown",t=>{t.key==="Tab"&&(y=!0)}),r.addEventListener("mousedown",()=>{y=!1}),r.addEventListener("keydown",t=>{t.key==="Enter"&&(E(),r.classList.remove("keyboard-focus"))}),r.addEventListener("focus",()=>{y&&(x(),r.classList.add("keyboard-focus"))}),r.addEventListener("blur",()=>{S(),r.classList.remove("keyboard-focus")}),r.addEventListener("touchstart",t=>{t.preventDefault(),r.classList.add("active")}),r.addEventListener("touchend",t=>{t.preventDefault(),E(),r.classList.remove("active")}),r.addEventListener("click",t=>{t.preventDefault(),E()});function N(t,a){let l;return function(){const c=arguments,d=this;l||(t.apply(d,c),l=!0,setTimeout(()=>l=!1,a))}}const B=()=>{const t=window.scrollY,a=window.innerHeight,l=document.documentElement.scrollHeight,c=t/(l-a);if(z){const _=r.querySelector(".scroll-progress-circle");if(_){let b=c*100;b>=99.5&&(b=100),b<0&&(b=0);const L=138.23,m=L-b/100*L;_.style.strokeDashoffset=m.toString()}}const d=i>=10&&i<=99?i:30;c>d/100?r.classList.add("visible"):r.classList.remove("visible")},D=N(B,16);window.addEventListener("scroll",D),B();const M=()=>{document.documentElement.classList.contains("theme-dark")?(u.style.backgroundColor="var(--sl-color-gray-7)",u.style.color="var(--sl-color-text)",p.style.borderTopColor="var(--sl-color-gray-7)"):(u.style.backgroundColor="black",u.style.color="white",p.style.borderTopColor="black")};M();const O=new MutationObserver(M);O.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});function e(){Math.round(window.outerWidth/window.innerWidth*100)/100>3?r.style.display="none":r.style.display="flex"}return window.addEventListener("resize",e),e(),g=()=>{window.removeEventListener("scroll",D),window.removeEventListener("resize",e),O.disconnect(),r&&r.parentNode&&r.parentNode.removeChild(r);const t=document.getElementById("scroll-to-top-styles");t&&t.remove()},g},w=()=>{setTimeout(U,10)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",w):w(),document.addEventListener("astro:page-load",w),document.addEventListener("astro:before-preparation",()=>{g&&g()})}ne({position:"right",tooltipText:"Scroll to top",smoothScroll:!0,threshold:30,svgPath:"M7 14l5-5 5 5 M7 19l5-5 5 5",svgStrokeWidth:1.8,borderRadius:"0",showTooltip:!1,showProgressRing:!1,progressRingColor:"yellow",showOnHomepage:!1});(function(){if(document.getElementById("expressive-code-fullscreen-styles"))return;const o=document.createElement("style");o.id="expressive-code-fullscreen-styles",o.textContent=`/* Layer order */
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
`,document.head.appendChild(o)})();function re(o){const n={MIN_FONT_SIZE:60,MAX_FONT_SIZE:500,DEFAULT_FONT_SIZE:100,FONT_ADJUSTMENT:10,DOUBLE_CLICK_THRESHOLD:600,HINT_DISPLAY_TIME:4e3,FADE_TRANSITION_TIME:500,MIN_BLOCK_HEIGHT:95,MIN_ANIMATION_DURATION:150,MAX_ANIMATION_DURATION:700,DEFAULT_ANIMATION_DURATION:200};document.addEventListener("DOMContentLoaded",()=>{if(window.expressiveCodeFullscreenInitialized)return;window.expressiveCodeFullscreenInitialized=!0;const s={isFullscreenActive:!1,scrollPosition:0,originalCodeBlock:null,fontSize:n.DEFAULT_FONT_SIZE,focusTrapHandler:null},i={fullscreenContainer:null,get container(){return this.fullscreenContainer||(this.fullscreenContainer=document.querySelector(".cb-fullscreen__container")),this.fullscreenContainer}};(!Number.isInteger(o.animationDuration)||o.animationDuration<n.MIN_ANIMATION_DURATION||o.animationDuration>n.MAX_ANIMATION_DURATION)&&(o.animationDuration=n.DEFAULT_ANIMATION_DURATION);const f={storageKey:"expressiveCodeFullscreenFontSize",loadFontSize(){try{const e=localStorage.getItem(this.storageKey);if(e){const t=parseInt(e,10);if(t>=n.MIN_FONT_SIZE&&t<=n.MAX_FONT_SIZE)return t}}catch{console.warn("Could not load font size from localStorage")}return n.DEFAULT_FONT_SIZE},saveFontSize(e){try{localStorage.setItem(this.storageKey,e.toString())}catch{console.warn("Could not save font size to localStorage")}},adjustFontSize(e,t){const a=Math.max(n.MIN_FONT_SIZE,Math.min(n.MAX_FONT_SIZE,s.fontSize+e));s.fontSize=a,this.saveFontSize(a),this.applyFontSize(t)},resetFontSize(e){s.fontSize=n.DEFAULT_FONT_SIZE,this.saveFontSize(n.DEFAULT_FONT_SIZE),this.applyFontSize(e)},applyFontSize(e){if(e){const t=s.fontSize/100;e.style.setProperty("--ec-font-scale",t)}}};function h(){if(document.querySelector(".cb-fullscreen__container"))return;const e=document.createElement("div");e.className="cb-fullscreen__container",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-label","Code block in fullscreen view"),e.setAttribute("tabindex","-1"),e.style.setProperty("--ec-fullscreen-animation-duration",`${o.animationDuration}ms`),document.body.appendChild(e)}function q(){const e=document.createElement("div");return e.className="cb-fullscreen__font-controls",e.innerHTML=`
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
		`,e}function k(){const e=document.createElement("div");return e.className="cb-fullscreen__hint",e.innerHTML="Press <kbd>Esc</kbd> to exit full screen",e}function z(){const e=window.getComputedStyle(document.body).backgroundColor;if(e&&e!=="rgba(0, 0, 0, 0)"&&e!=="transparent")return e;const t=window.getComputedStyle(document.documentElement).backgroundColor;return t&&t!=="rgba(0, 0, 0, 0)"&&t!=="transparent"?t:"#ffffff"}function F(e){const t=e.match(/\d+/g);return t&&t.length>=3?(parseInt(t[0])*299+parseInt(t[1])*587+parseInt(t[2])*114)/1e3>128?"#000000":"#ffffff":"#000000"}function I(){const e=document.createElement("button");return e.className="cb-fullscreen__button",e.type="button",e.setAttribute("aria-label",o.fullscreenButtonTooltip),e.setAttribute("aria-expanded","false"),e.setAttribute("data-tooltip",o.fullscreenButtonTooltip),e.innerHTML=`
      <svg class="fullscreen-on" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="${o.svgPathFullscreenOn}" stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg class="fullscreen-off" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="${o.svgPathFullscreenOff}" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,e}function j(e){if(e.querySelector(".cb-fullscreen__button"))return;const t=e.querySelector(".frame");if(!t)return;const a=t.classList.contains("has-title")||t.classList.contains("is-terminal");if(!o.addToUntitledBlocks&&!a)return;const l=e.querySelector("figcaption.header");if(a){if(l){const c=I();getComputedStyle(l).position==="static"&&(l.style.position="relative"),c.style.cssText=`
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
      `,l.appendChild(c)}}else{const c=e.querySelector(".copy");if(c){const d=document.createElement("div");d.style.cssText=`
			  position: absolute;
			  top: 50px;
			  right: 12px;
			  z-index: 15;
			  pointer-events: auto;
			`;const _=I();d.appendChild(_),t.offsetHeight>n.MIN_BLOCK_HEIGHT&&c.parentNode.appendChild(d)}}}function A(){document.querySelectorAll(".expressive-code").forEach(t=>{j(t)}),document.querySelectorAll(".cb-fullscreen__button").forEach(t=>{const a=t.cloneNode(!0);t.parentNode.replaceChild(a,t),a.addEventListener("click",g),a.addEventListener("keydown",function(l){(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),g.call(this,l))})})}function g(e){e.preventDefault(),e.stopPropagation();const t=this.closest(".expressive-code");t&&T(t)}function T(e){const t=i.container;s.isFullscreenActive?w(t):U(e,t)}function U(e,t){s.originalCodeBlock=e,s.fontSize=f.loadFontSize();const a=e.querySelector(".cb-fullscreen__button");a&&a.setAttribute("aria-expanded","true");const l=e.cloneNode(!0);l.classList.add("cb-fullscreen__active");const c=l.querySelector(".cb-fullscreen__button");c&&(c.addEventListener("click",function(m){m.preventDefault(),m.stopPropagation(),T(l)}),c.addEventListener("keydown",function(m){(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),T(l))})),r(),u(!0),o.enableEscapeKey&&v(),o.exitOnBrowserBack&&(history.pushState({fullscreenActive:!0},"",window.location.href),E());const d=z(),_=F(d);t.style.backgroundColor=d,t.style.color=_;const b=document.createElement("div");b.className="cb-fullscreen__content";const L=q();if(b.appendChild(L),b.appendChild(l),t.appendChild(b),M(L,l),f.applyFontSize(l),o.enableEscapeKey){const m=k();t.appendChild(m),setTimeout(()=>{m&&m.parentNode&&(m.style.setProperty("transition","opacity 0.9s ease","important"),m.style.setProperty("opacity","0","important"),setTimeout(()=>{m&&m.parentNode&&m.remove()},n.FADE_TRANSITION_TIME))},n.HINT_DISPLAY_TIME)}t.classList.add("cb-fullscreen__container--open"),s.isFullscreenActive=!0,t.focus(),B(t)}function w(e){if(u(!1),y(),o.enableEscapeKey&&S(),o.exitOnBrowserBack&&(N(),history.state&&history.state.fullscreenActive&&history.back()),D(),e.classList.remove("cb-fullscreen__container--open"),e.style.backgroundColor="",e.style.color="",e.innerHTML="",s.isFullscreenActive=!1,s.originalCodeBlock){const t=s.originalCodeBlock.querySelector(".cb-fullscreen__button");t&&(t.setAttribute("aria-expanded","false"),t.blur())}s.originalCodeBlock=null}function r(){s.scrollPosition=window.scrollY||document.documentElement.scrollTop}function y(){typeof s.scrollPosition=="number"&&!isNaN(s.scrollPosition)&&setTimeout(()=>{window.scrollTo({top:s.scrollPosition,behavior:"smooth"})},0)}function u(e){e?(document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden"):(document.body.style.overflow="",document.documentElement.style.overflow="")}function p(e){if(e.key==="Escape"&&s.isFullscreenActive){const t=i.container;t&&w(t)}}function v(){document.removeEventListener("keyup",p),document.addEventListener("keyup",p)}function S(){document.removeEventListener("keyup",p)}function x(e){if(s.isFullscreenActive&&(!e.state||!e.state.fullscreenActive)){const a=i.container;a&&(N(),w(a))}}function E(){window.removeEventListener("popstate",x),window.addEventListener("popstate",x)}function N(){window.removeEventListener("popstate",x)}function B(e){const t=e.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"], summary, audio[controls], video[controls]');if(t.length===0)return;const a=t[0],l=t[t.length-1];function c(d){d.key==="Tab"&&(d.shiftKey?document.activeElement===a&&(d.preventDefault(),l.focus()):document.activeElement===l&&(d.preventDefault(),a.focus()))}e.addEventListener("keydown",c),s.focusTrapHandler=c}function D(){const e=i.container;e&&s.focusTrapHandler&&(e.removeEventListener("keydown",s.focusTrapHandler),s.focusTrapHandler=null)}function M(e,t){const a=e.querySelector(".cb-fullscreen__font-btn--decrease"),l=e.querySelector(".cb-fullscreen__font-btn--increase");let c={lastClickTime:0,clickCount:0};a.addEventListener("click",d=>{const _=Date.now();_-c.lastClickTime<n.DOUBLE_CLICK_THRESHOLD?(c.clickCount++,c.clickCount===2&&(f.resetFontSize(t),c.clickCount=0)):(c.clickCount=1,f.adjustFontSize(-10,t)),c.lastClickTime=_,d.target.blur()}),l.addEventListener("click",d=>{f.adjustFontSize(n.FONT_ADJUSTMENT,t),d.target.blur()})}function O(){h(),A()}O()})}re({fullscreenButtonTooltip:"Toggle fullscreen view",enableEscapeKey:!0,exitOnBrowserBack:!0,addToUntitledBlocks:!1,animationDuration:200,svgPathFullscreenOn:"M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z",svgPathFullscreenOff:"M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"});W();export{ne as default};
