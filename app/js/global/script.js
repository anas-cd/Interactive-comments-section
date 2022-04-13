console.log("Load script.js");

// Instantiating the global app object
var app = {};

// stylors 

const el = document.querySelector("#commentor")
const observer = new IntersectionObserver( 
  ([e]) => e.target.classList.toggle("stuck", e.intersectionRatio < 1),
  { threshold: [1] }
);

observer.observe(el);