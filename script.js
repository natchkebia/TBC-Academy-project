document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.querySelector('i').classList.toggle('fa-bars');
        burger.querySelector('i').classList.toggle('fa-times');
    });
});
