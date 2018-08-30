document.addEventListener('DOMContentLoaded', function () {
    let $menuButtom = document.querySelector('.menu__button .hamburger');
    let $menuList = document.querySelector('.menu__list');
    let $topLine = document.querySelector('.header__top');
    $menuButtom.addEventListener('click', function (e) {
        this.classList.toggle("is-active");
        if(this.classList.contains("is-active")){
            $menuList.classList.add("menu__list--open");
        } else {
            $menuList.classList.remove("menu__list--open");

        }

    });
    var linkNav = document.querySelectorAll('.scroll-nav[href^="#"]'),
        V = 0.25;  // скорость, может иметь дробное значение через точку
        console.log(linkNav)
    for (var i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function (e) {
            e.preventDefault();
            console.log('object');
            var w = window.pageYOffset,  // прокрутка
                hash = this.href.replace(/[^#]*(.*)/, '$1');  // id элемента, к которому нужно перейти
            var t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
                start = null;
            requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
            function step(time) {
                if (start === null) start = time;
                var progress = time - start,
                    r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
                window.scrollTo(0, r);
                if (r != w + t) {
                    requestAnimationFrame(step)
                } else {
                    location.hash = hash  // URL с хэшем
                }
            }
        }, false);
    }
    document.addEventListener("scroll", function(ev){
        let scrollTop = self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
        if(scrollTop >= 720 ){
            $topLine.classList.add('header__top--fixed');
        } else {
            $topLine.classList.remove('header__top--fixed');
        }
    })
});