const onMenu = () => {
  const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeBtn = document.querySelector('.menu__close'),
    overLay = document.querySelector('.menu__overlay');

  hamburger.addEventListener('click', () => {
    menu.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    menu.classList.remove('active');
  });

  menu.addEventListener('click', (e) => {
    const target = e.target;
    if (target.className === 'menu__overlay') {
      menu.classList.remove('active');
    }
  });

  document.body.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && menu.classList.contains('active')) {
      menu.classList.remove('active');
    }
  });
};

export default onMenu;
