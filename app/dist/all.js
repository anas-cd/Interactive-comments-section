console.log("Load script.js");var app={};const el=document.querySelector("#commentor"),observer=new IntersectionObserver((([e])=>e.target.classList.toggle("stuck",e.intersectionRatio<1)),{threshold:[1]});observer.observe(el),app.global={init:function(){console.log("load global functions"),app.global.loadHeader()},loadHeader:function(){console.log("loadHeader()")},fetcher:function(e){}},app.global.init();const VueApp=Vue.createApp({data:function(){return{test:"heeeee"}}});
//# sourceMappingURL=all.js.map