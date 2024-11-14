const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })  
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })  
}

//swiper

var swiper = new Swiper(".swiper", {
    slidesPerView:4,
    spaceBetween :20,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints:{
       280:{
        slidesPerView:1,
        spaceBetween: 10,
       }, 
       320:{
        slidesPerView:2,
        spaceBetween: 10,
       },
       510:{
        slidesPerView:2,
        spaceBetween: 10,
       }, 
       758:{
        slidesPerView:3,
        spaceBetween: 15,
       },
       900:{
        slidesPerView:4,
        spaceBetween: 20,
       }  
    }
});

