const btn = document.querySelector('.nav__btn-item');
const nav = document.querySelector('.nav__mobile');
const navList = document.querySelectorAll('.nav__mobile .nav__list a');

const showNav = () => {
	nav.classList.toggle('show-nav');
	const btnImg = btn.children[0];

	if (nav.classList.contains('show-nav')) {
		btnImg.setAttribute('src', './dist/img/icon-close.svg');
	} else {
		btnImg.setAttribute('src', './dist/img/icon-hamburger.svg');
	}
};

btn.addEventListener('click', showNav);
navList.forEach(el => el.addEventListener('click', showNav));
