/*MENU HAMBURGUESA*/
const button = document.querySelector('.btn-menu');
const nav = document.querySelector('.ul-nav-menu');

button.addEventListener('click',(e)=>{
    e.preventDefault()
    nav.classList.toggle('active');
});