if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>a(e,n),d={module:{uri:n},exports:t,require:r};s[n]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/1.webp",revision:"dd5b4fb02732ad0a357857e3b5b8e8d4"},{url:"/105.png",revision:"3b939a3bb809da35e7c70dd5c54785bb"},{url:"/12.jpg",revision:"be4615df247a5aa7be7f99c31e746bc4"},{url:"/14jpg.jpg",revision:"2b3ff29656d04c375dd2e7c5e056d277"},{url:"/2.webp",revision:"4d2897b7c08b1a16a8c39389e81d2a19"},{url:"/3.webp",revision:"40e5a520440e87058d8d565f4837f03a"},{url:"/304.jpg",revision:"b724a0a1be3c39310c53aff7b3325853"},{url:"/48h2.png",revision:"4e79c1a41c161ecb1bf4720976481707"},{url:"/AllianceLogo.png",revision:"a5bb0e8dc5c2a1fed78902f36cb93b11"},{url:"/Playground - http:localhost:3000:api:graphql.html",revision:"c7320e7687acbd04e9c92d1b6586df92"},{url:"/Rectangle 1.png",revision:"b3a90a387aeca65b45b26fc91e2c92b9"},{url:"/_next/static/IDm-Be3nk67GI1vRGJUtR/_buildManifest.js",revision:"ee54a0101f0551e25d8d1113edff156b"},{url:"/_next/static/IDm-Be3nk67GI1vRGJUtR/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0b7b90cd.e2b4071b529df4f7.js",revision:"e2b4071b529df4f7"},{url:"/_next/static/chunks/1181-4aff722f7bbca854.js",revision:"4aff722f7bbca854"},{url:"/_next/static/chunks/1524-54c50ff84aff1d8f.js",revision:"54c50ff84aff1d8f"},{url:"/_next/static/chunks/1737-abd37f94fe892cc0.js",revision:"abd37f94fe892cc0"},{url:"/_next/static/chunks/1a48c3c1-21fb3acdbe72342d.js",revision:"21fb3acdbe72342d"},{url:"/_next/static/chunks/1bfc9850-47a6df15faab3e7c.js",revision:"47a6df15faab3e7c"},{url:"/_next/static/chunks/252f366e-4710a0b202b73ace.js",revision:"4710a0b202b73ace"},{url:"/_next/static/chunks/3047-2aeb867446625e68.js",revision:"2aeb867446625e68"},{url:"/_next/static/chunks/31664189-04bda1422d9b3d8d.js",revision:"04bda1422d9b3d8d"},{url:"/_next/static/chunks/3412-da28ed001ef5c90b.js",revision:"da28ed001ef5c90b"},{url:"/_next/static/chunks/3637-a11374ddafe94db4.js",revision:"a11374ddafe94db4"},{url:"/_next/static/chunks/3686-87a98e46d5c5b892.js",revision:"87a98e46d5c5b892"},{url:"/_next/static/chunks/3e678b25.fe22469bf4c2e0b8.js",revision:"fe22469bf4c2e0b8"},{url:"/_next/static/chunks/4286-63d0c235af8479a3.js",revision:"63d0c235af8479a3"},{url:"/_next/static/chunks/4814-d31246b97645b94e.js",revision:"d31246b97645b94e"},{url:"/_next/static/chunks/4949-1d5742eb785314c2.js",revision:"1d5742eb785314c2"},{url:"/_next/static/chunks/545f34e4-564a640c81f0f046.js",revision:"564a640c81f0f046"},{url:"/_next/static/chunks/551-2baf225b19ee4108.js",revision:"2baf225b19ee4108"},{url:"/_next/static/chunks/576-eae18f4f8e389fe9.js",revision:"eae18f4f8e389fe9"},{url:"/_next/static/chunks/6728d85a-b0efd5a7209deda2.js",revision:"b0efd5a7209deda2"},{url:"/_next/static/chunks/6880-0e0a00acc50001e0.js",revision:"0e0a00acc50001e0"},{url:"/_next/static/chunks/6893-856a55f7573d8173.js",revision:"856a55f7573d8173"},{url:"/_next/static/chunks/6997.2ce35d812cf6d645.js",revision:"2ce35d812cf6d645"},{url:"/_next/static/chunks/7068-f508635bc8c13fce.js",revision:"f508635bc8c13fce"},{url:"/_next/static/chunks/72a30a16.cbbe9425d085d7ae.js",revision:"cbbe9425d085d7ae"},{url:"/_next/static/chunks/7307-489e88d11d03d8e7.js",revision:"489e88d11d03d8e7"},{url:"/_next/static/chunks/7856.21068cadaca50958.js",revision:"21068cadaca50958"},{url:"/_next/static/chunks/78e521c3-843b6f88e3903778.js",revision:"843b6f88e3903778"},{url:"/_next/static/chunks/7f0c75c1-aab0a42b875173d5.js",revision:"aab0a42b875173d5"},{url:"/_next/static/chunks/8483.71579c3635a684bc.js",revision:"71579c3635a684bc"},{url:"/_next/static/chunks/9101-4c95094269eaeb3d.js",revision:"4c95094269eaeb3d"},{url:"/_next/static/chunks/9249-41530aaaea4628ed.js",revision:"41530aaaea4628ed"},{url:"/_next/static/chunks/95b64a6e-d0b588e5b1a8ec6c.js",revision:"d0b588e5b1a8ec6c"},{url:"/_next/static/chunks/9669-77963f888473f1ec.js",revision:"77963f888473f1ec"},{url:"/_next/static/chunks/ad7f724d.8aaacf4430f8899f.js",revision:"8aaacf4430f8899f"},{url:"/_next/static/chunks/ae51ba48-e093b6768d0ed73f.js",revision:"e093b6768d0ed73f"},{url:"/_next/static/chunks/b98bc7c3-a6a78fd6c8dfac06.js",revision:"a6a78fd6c8dfac06"},{url:"/_next/static/chunks/d7eeaac4-9c361a0cb318a1ec.js",revision:"9c361a0cb318a1ec"},{url:"/_next/static/chunks/e78312c5-d28554348dc37f18.js",revision:"d28554348dc37f18"},{url:"/_next/static/chunks/framework-816dd18524263184.js",revision:"816dd18524263184"},{url:"/_next/static/chunks/main-ca36b8bc8f45f111.js",revision:"ca36b8bc8f45f111"},{url:"/_next/static/chunks/pages/404-e0e411517d96b2ee.js",revision:"e0e411517d96b2ee"},{url:"/_next/static/chunks/pages/_app-6756f6682d76c33f.js",revision:"6756f6682d76c33f"},{url:"/_next/static/chunks/pages/_error-e18771d792fd8fe7.js",revision:"e18771d792fd8fe7"},{url:"/_next/static/chunks/pages/about-0a136775d7728033.js",revision:"0a136775d7728033"},{url:"/_next/static/chunks/pages/admin-dc23586272f3595a.js",revision:"dc23586272f3595a"},{url:"/_next/static/chunks/pages/admin/%5Brestaurant%5D-3abb0df16679b6d6.js",revision:"3abb0df16679b6d6"},{url:"/_next/static/chunks/pages/admin/%5Brestaurant%5D/dashboard-fd24647c23f72e89.js",revision:"fd24647c23f72e89"},{url:"/_next/static/chunks/pages/admin/%5Brestaurant%5D/menu-4017b8cb94849869.js",revision:"4017b8cb94849869"},{url:"/_next/static/chunks/pages/admin/%5Brestaurant%5D/menu/%5B...category%5D-c36bc609481c8947.js",revision:"c36bc609481c8947"},{url:"/_next/static/chunks/pages/admin/%5Brestaurant%5D/orders-3cd826999febb404.js",revision:"3cd826999febb404"},{url:"/_next/static/chunks/pages/admin/%5Brestaurant%5D/rapport-12d0371a8a58c4de.js",revision:"12d0371a8a58c4de"},{url:"/_next/static/chunks/pages/admin/%5Brestaurant%5D/reservations-805190e3b657c6ba.js",revision:"805190e3b657c6ba"},{url:"/_next/static/chunks/pages/admin/%5Brestaurant%5D/setting-9152021829516629.js",revision:"9152021829516629"},{url:"/_next/static/chunks/pages/auth/deleteUser-d41437ce745fae0d.js",revision:"d41437ce745fae0d"},{url:"/_next/static/chunks/pages/auth/login-6ed4f3138e290c20.js",revision:"6ed4f3138e290c20"},{url:"/_next/static/chunks/pages/auth/resetPass-91b3a065f8145e80.js",revision:"91b3a065f8145e80"},{url:"/_next/static/chunks/pages/auth/signup-67a8cc7b5c616252.js",revision:"67a8cc7b5c616252"},{url:"/_next/static/chunks/pages/chat-801d9481df247fe2.js",revision:"801d9481df247fe2"},{url:"/_next/static/chunks/pages/map-3e2281bf4a1fccc5.js",revision:"3e2281bf4a1fccc5"},{url:"/_next/static/chunks/pages/profile-ea8ef2a219b710ea.js",revision:"ea8ef2a219b710ea"},{url:"/_next/static/chunks/pages/restaurant-377ee9b804682564.js",revision:"377ee9b804682564"},{url:"/_next/static/chunks/pages/restaurant/%5Bname%5D-ae27e7317308d61d.js",revision:"ae27e7317308d61d"},{url:"/_next/static/chunks/pages/restaurant/%5Bname%5D/checkout/%5BcostumerId%5D-83059322d5eb92f6.js",revision:"83059322d5eb92f6"},{url:"/_next/static/chunks/pages/restaurant/%5Bname%5D/menu-830c755bd5c7423f.js",revision:"830c755bd5c7423f"},{url:"/_next/static/chunks/pages/restaurant/%5Bname%5D/menu/%5B...category%5D-eea7c8a2f75c2d77.js",revision:"eea7c8a2f75c2d77"},{url:"/_next/static/chunks/pages/restaurant/%5Bname%5D/orderHistory/%5BcustomerId%5D-196296eec697c8f5.js",revision:"196296eec697c8f5"},{url:"/_next/static/chunks/pages/restaurant/%5Bname%5D/reservation-64f2a70cb0283c32.js",revision:"64f2a70cb0283c32"},{url:"/_next/static/chunks/pages/terms/terms-202e2790c204ffc1.js",revision:"202e2790c204ffc1"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-a4eeeaf7fba3ebe5.js",revision:"a4eeeaf7fba3ebe5"},{url:"/_next/static/css/06333d76dc15e015.css",revision:"06333d76dc15e015"},{url:"/_next/static/css/30b54debf52d9495.css",revision:"30b54debf52d9495"},{url:"/_next/static/css/334fc2f646c427aa.css",revision:"334fc2f646c427aa"},{url:"/_next/static/css/3be5a867f295bf49.css",revision:"3be5a867f295bf49"},{url:"/_next/static/css/3ec27d631c886670.css",revision:"3ec27d631c886670"},{url:"/_next/static/css/449b8bbf74931f57.css",revision:"449b8bbf74931f57"},{url:"/_next/static/css/44f43e9a49b1ac14.css",revision:"44f43e9a49b1ac14"},{url:"/_next/static/css/62b78a37e3d3d98a.css",revision:"62b78a37e3d3d98a"},{url:"/_next/static/css/67e20743ebb4cfc8.css",revision:"67e20743ebb4cfc8"},{url:"/_next/static/css/6aa6f20d188ffec7.css",revision:"6aa6f20d188ffec7"},{url:"/_next/static/css/740dce3f4040bd25.css",revision:"740dce3f4040bd25"},{url:"/_next/static/css/7549e545e004d94a.css",revision:"7549e545e004d94a"},{url:"/_next/static/css/851301631f8f142d.css",revision:"851301631f8f142d"},{url:"/_next/static/css/899f445138d4c642.css",revision:"899f445138d4c642"},{url:"/_next/static/css/a09cfac192e45352.css",revision:"a09cfac192e45352"},{url:"/_next/static/css/a1293e22b2ef0623.css",revision:"a1293e22b2ef0623"},{url:"/_next/static/css/af1bd5c2a574fb09.css",revision:"af1bd5c2a574fb09"},{url:"/_next/static/css/b313e47ee7bc1847.css",revision:"b313e47ee7bc1847"},{url:"/_next/static/css/b87bdf8d86b3c1ab.css",revision:"b87bdf8d86b3c1ab"},{url:"/_next/static/css/bc16e6e930ea407d.css",revision:"bc16e6e930ea407d"},{url:"/_next/static/css/bd08ba732b8c3984.css",revision:"bd08ba732b8c3984"},{url:"/_next/static/css/c3560d78936d6de3.css",revision:"c3560d78936d6de3"},{url:"/_next/static/css/c5ab88758a44855b.css",revision:"c5ab88758a44855b"},{url:"/_next/static/css/dad6c3b7c0cef8f3.css",revision:"dad6c3b7c0cef8f3"},{url:"/_next/static/css/e70bb452ba665887.css",revision:"e70bb452ba665887"},{url:"/_next/static/css/fc6a78d089d370fe.css",revision:"fc6a78d089d370fe"},{url:"/_next/static/media/layers-2x.9859cd12.png",revision:"9859cd12"},{url:"/_next/static/media/layers.ef6db872.png",revision:"ef6db872"},{url:"/_next/static/media/leaflet.routing.icons.338a6622.png",revision:"338a6622"},{url:"/_next/static/media/marker-icon-2x.93fdb12c.png",revision:"93fdb12c"},{url:"/_next/static/media/marker-icon.d577052a.png",revision:"d577052a"},{url:"/_next/static/media/marker-shadow.612e3b52.png",revision:"612e3b52"},{url:"/_next/static/media/routing-icon.c747cfa9.png",revision:"c747cfa9"},{url:"/alert.mp3",revision:"1e8064baf5bba4beca38552075308796"},{url:"/alert2.mp3",revision:"78dccfdb37e2486661a3126b424a40c5"},{url:"/back.jpg",revision:"6dc341ddcf1941be24662a7fc48fb0c0"},{url:"/blur.webp",revision:"436ad026516b24bf35801b58265a020b"},{url:"/blur_image.webp",revision:"b18a197132f9d063a31d6dbf3b1e0002"},{url:"/calc.gif",revision:"1164913b4932faae0fe871859b01684b"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/first_Back.jpg",revision:"804f0130b5140bc48936815fac8f7090"},{url:"/firstpage1.png",revision:"5aac1d3efcc1e8a03184c1ec9c73995e"},{url:"/foot2.svg",revision:"93174b23c8cbd0621926906983e123d4"},{url:"/foot3.svg",revision:"b4e6affaf992327a3fd17550b316d2dd"},{url:"/footer.jpg",revision:"f3a5223633a7428e86e7958299b9553e"},{url:"/footerback.svg",revision:"5b0b83a7d82008edcc823098eb60dd22"},{url:"/hhsvg.svg",revision:"d7ab89f39400de4f697e4df3cde2d3b1"},{url:"/icon-192x192.png",revision:"d2421b77e96d30dd3226882ffa926efa"},{url:"/icon-256x256.png",revision:"c23a83cdba617bbc46b6883fb7876b4e"},{url:"/icon-384x384.png",revision:"fd5408d8952e74c614092e4ec3e17e6f"},{url:"/icon-512x512.png",revision:"3684f6600a78ad3e79689bdd5f8464c2"},{url:"/instagram-logo.svg",revision:"204ff617dbd6428a30cba09c86a3b924"},{url:"/logo.png",revision:"a9fa4b16c2dd0055ee7f097f4aa9be94"},{url:"/logo10.png",revision:"04878c1031dfd83b799bb365d8441a4b"},{url:"/lottie.json",revision:"d480e4dfda8cbda78c980deca9a6f3e1"},{url:"/lottie2.json",revision:"68c96e0fd98fdd05e4ac1f0ef416c567"},{url:"/lottie3.json",revision:"2daba4fa67a6d6009ce221b15f66e630"},{url:"/lottie4.json",revision:"703789c2ffaecdc18953f4a5880fd425"},{url:"/lottie5.json",revision:"59f10e2c38b74f9cea1187de455ef9c8"},{url:"/manifest.json",revision:"1fac7a75aabf736bae26584bdd3f4a89"},{url:"/n.png",revision:"d125d084ef4c25914298f338d7e41128"},{url:"/n.webp",revision:"ee2ecaf77af18444264760894b70f7a0"},{url:"/n2.jpeg",revision:"c323245e0e2ac59b6108ad74618d98fa"},{url:"/pages3.png",revision:"da3c8947bd3d70e2bdfa6b953c463151"},{url:"/rapport.png",revision:"d5521437e2c39bb3537f3040daed10e4"},{url:"/sell.json",revision:"78ed264f89d4f664df849a574761c004"},{url:"/shop.json",revision:"b37540e61a20836b56d01c6c1d537e3e"},{url:"/shutter.svg",revision:"1ab3cf0df91b5baee34803ee918b1fe0"},{url:"/spiner_lottie.json",revision:"742b020485a344420649a733d0015a17"},{url:"/spinner.json",revision:"58b48132a46799386c667df7130974de"},{url:"/spinner2.json",revision:"632e8de66109681ed4b228c50a683d6d"},{url:"/sslottie.json",revision:"f49bac8e1506c89805e7d6c8c50b2904"},{url:"/svgup",revision:"f36bfef00e0556df1983befea599ddaf"},{url:"/vawedown",revision:"657d6e5ae263829c54c3e61885af6475"},{url:"/vaweup",revision:"37fac0a3bce51c53a8d151b4188eeb27"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
