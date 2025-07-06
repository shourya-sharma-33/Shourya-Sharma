'use strict';

const  addEventOnElement = function(elements, eventType, callback){
    for(let i=0; i<elements.length;i++){
        elements[i].addEventListener(eventType,callback);
    }
}
// 20 09

const loadingElement = document.querySelector("[data-loading]");
window.addEventListener("load", function(){
    loadingElement.classList.add("loaded");
    this.document.body.classList.remove("active");});
// });21 09

const [navTogglers, navLinks, navbar, overlay] = [
    document.querySelectorAll("[data-nav-toggler]"),
    document.querySelectorAll("[data-nav-link]"),
    document.querySelector("[data-navbar]"),
    document.querySelector("[data-overlay]")
];
const toggleNav = function() {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
}
addEventOnElement(navTogglers, "click", toggleNav);
const closeNav = function(){
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("active");
}
addEventOnElement(navLinks, "click", closeNav);
const header = document.querySelector("[data-header]");
const activeElementOnScroll = function(){
    if (window.scrollY > 50) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
}
window.addEventListener("scroll", activeElementOnScroll);


const letterBoxes = document.querySelectorAll("[data-letter-effect]");
let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex =0;
let totalLetterBoxDelay =0;
const setLetterEffect = function(){
    for (let i = 0; i < letterBoxes.length; i++) { 
        let letterAnimationDelay = 0;
        const letters = letterBoxes[i].textContent.trim();
        letterBoxes[i].textContent = "";
        for (let j = 0; j < letters.length; j++) {
            const span = document.createElement("span");
            span.style.animationDelay = `${letterAnimationDelay}s`;
            if (i === activeLetterBoxIndex) {
                span.classList.add("in");
            } else {
                span.classList.add("out");
            }
            span.textContent = letters[j];
            if (letters[j] === " ") span.classList.add("space");
            letterBoxes[i].appendChild(span);
            if (j >= letters.length - 1) break;
            letterAnimationDelay += 0.05;
        }
        if (i === activeLetterBoxIndex) {
            totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
        }
        if (i === lastActiveLetterBoxIndex) {
            letterBoxes[i].classList.add("active");
        } else {
            letterBoxes[i].classList.remove("active");
        }
    }
    setTimeout(function () {
        lastActiveLetterBoxIndex = activeLetterBoxIndex;
        activeLetterBoxIndex = (activeLetterBoxIndex + 1) % letterBoxes.length;
        setLetterEffect();
    }, (totalLetterBoxDelay * 1000) + 3000);
}

window.addEventListener("load",setLetterEffect);


const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function(){
    for (let i =0; i <revealElements.length;i++){
        const elementIsInScreen = revealElements[i].getBoundingClientRect().top <window.innerHeight/1.15;
        if (elementIsInScreen){
            revealElements[i].classList.add("revealed");
        } else {
            revealElements[i].classList.remove("revealed");
        }
    }
}

window.addEventListener("scroll", scrollReveal);
scrollReveal();