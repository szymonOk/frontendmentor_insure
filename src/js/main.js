const btn = document.querySelector('.nav__btn-item');
const nav = document.querySelector('.nav__mobile');
const navList = document.querySelectorAll('.nav__mobile .nav__list a');
const body = document.querySelector('body');

const showNav = () => {
	nav.classList.toggle('show-nav');
	const btnImg = btn.children[0];

	if (nav.classList.contains('show-nav')) {
		btnImg.setAttribute('src', './dist/img/icon-close.svg');
		body.style.overflowY = 'hidden';
	} else {
		btnImg.setAttribute('src', './dist/img/icon-hamburger.svg');
		body.style.overflowY = 'visible';
	}
};

btn.addEventListener('click', showNav);
navList.forEach(el => el.addEventListener('click', showNav));
