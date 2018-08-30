document.addEventListener('DOMContentLoaded', init);

function init (){
    const canvas = document.getElementById('videoPlay');
    const video = document.getElementById('video');
    const videoTime = document.querySelector('.video__time');
    const videoCont = document.querySelector('.video');
    const btnNav = document.querySelector('.header__btn-nav');
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    let loaded = 0, timerId;

    ;(function(doc, win){
        
        class Slider{
            constructor(el, options){
                this.options = {
                    classNameList: '.slider__list',
                    classNameSlide: '.slider__item',
                    classNameSlideActive: '.slider__item--active',
                    classNamePrev: '.slider__left-arrow',
                    classNameNext: '.slider__right-arrow',
                    classNameNav: '.slider__nav',
                    classNameNavItem: '.slider__nav-item',
                    classNameNavLink: '.slider__nav-link',
                    classNameNavItemActive: '.slider__nav-item--actived',
                }
                
                this.el = el;
                this.currentSlide = 0;

                this._init();

            }

            _init(){
                this.elList = this.el.querySelector(this.options.classNameList);
                this.arrSlide = this.el.querySelectorAll(this.options.classNameSlide);
                this.elNavPrev = this.el.querySelector(this.options.classNamePrev);
                this.elNavNext = this.el.querySelector(this.options.classNameNext);
                this.elNavPrev.addEventListener('click',() => {
                    this.prev();
                });

                this.elNavNext.addEventListener('click',() => {
                    this.next();
                });

                win.addEventListener('resize', this._debounce(() => {
                    this.elList.style.width = this.arrSlide[0].offsetWidth * this.arrSlide.length + 'px';
                    this.showSilde(this.currentSlide);
                }), false);
                win.addEventListener('orientationchange', () => {
                    this.elList.style.width = this.arrSlide[0].offsetWidth * this.arrSlide.length + 'px';
                    this.showSilde(this.currentSlide);
                }, false);

                this.elList.style.width = this.arrSlide[0].offsetWidth * this.arrSlide.length + 'px';
                this._makeNavList();
            }

            prev(){
                let width = this.arrSlide[0].offsetWidth;
                
                if(this.currentSlide > 0){
                    this.showSilde(this.currentSlide - 1);
                }else{
                    this.showSilde(this.arrSlide.length - 1);
                }


                this.showSilde(this.currentSlide);
            }

            next(){
                let width = this.arrSlide[0].offsetWidth;

                if (this.currentSlide < this.arrSlide.length - 1) {
                    this.showSilde(this.currentSlide + 1);
                } else {
                    this.showSilde(0);
                }

            }

            showSilde(num){
                this.currentSlide = num;
                let len = this.arrSlide[0].offsetWidth * num;
                this.elList.style.transform = 'translateX(-' + len + 'px)';
                this._changeActeveEl();
            }

            _makeNavList(){
                const sliderNav = document.createElement('ul');
                const arrNav = [];
                sliderNav.className = this.options.classNameNav.substr(1);
                for(let item = 0; item < this.arrSlide.length; item++){
                    let elItem = document.createElement('li');
                    let elLink = document.createElement('a');

                    elItem.className = this.options.classNameNavItem.substr(1);
                    elLink.className = this.options.classNameNavLink.substr(1);

                    if(this.currentSlide === item){
                        elItem.classList.add(this.options.classNameNavItemActive.substr(1));
                    }

                    elItem.appendChild(elLink);

                    elLink.addEventListener('click', () => {
                        this.showSilde(item);
                    });

                    sliderNav.appendChild(elItem);
                }

                this.sliderNav = sliderNav;
                this.el.appendChild(sliderNav);
            }

            _changeActeveEl(){
                let i = 0;
                for(let item of this.sliderNav.children){
                    if(i === this.currentSlide){
                        item.classList.add(this.options.classNameNavItemActive.substr(1));
                        this.arrSlide[i].classList.add(this.options.classNameSlideActive.substr(1));
                    }else{
                        item.classList.remove(this.options.classNameNavItemActive.substr(1));
                        this.arrSlide[i].classList.remove(this.options.classNameSlideActive.substr(1));
                    }
                    i++;
                }
            }

            _debounce(func){
                let timeout;
                return () => {
                    clearTimeout(timeout);
                    timeout = setTimeout(func, 200);
                };
            }
        }

        

        win.AVSlider = Slider;
    })(document,window);

/********************************************* */
    
    ;(function(doc, win){
        
        class Slider{
            constructor(el, options){
                let optDefault = {
                    classNameList: '.slider__list',
                    classNameSlide: '.slider__item',
                    classNameSlideActive: '.slider__item--active',
                    classNamePrev: '.slider__left-arrow',
                    classNameNext: '.slider__right-arrow',
                    margin: 15,
                    minView: 510,
                };

                
                this.options = Object.assign({},optDefault,options);
                this.marginDefault = this.options.margin;
                
                this.el = el;
                this.currentSlide = 0;

                this._init();

            }

            _init(){
                this.elList = this.el.querySelector(this.options.classNameList);
                this.arrSlide = this.el.querySelectorAll(this.options.classNameSlide);
                this.elNavPrev = this.el.querySelector(this.options.classNamePrev);
                this.elNavNext = this.el.querySelector(this.options.classNameNext);
                this.elNavPrev.addEventListener('click',(ev) => {
                    ev.preventDefault();
                    this.prev();
                });

                this.elNavNext.addEventListener('click',(ev) => {
                    ev.preventDefault();
                    this.next();
                });

                win.addEventListener('resize', this._debounce(() => {
                    this.calcView();
                    this.showSilde(this.currentSlide);
                }), false);
                win.addEventListener('orientationchange', () => {
                    this.calcView();
                    this.showSilde(this.currentSlide);
                }, false);

                this._addEventSwipe();

                this.calcView();
            }

            calcView(){
                if (this.el.offsetWidth <= this.options.minView) {
                    this.marginDefault = this.options.margin;
                    this.opacityView = 1;
                    this.options.margin = (this.el.offsetWidth - this.arrSlide[0].offsetWidth) / 2;
                    this.listWidth = (this.options.margin * 2 + this.arrSlide[0].offsetWidth) * this.arrSlide.length;
                    this.maxTranslateX = this.listWidth - this.el.offsetWidth;
                    this.elList.style.width = this.listWidth + 'px';
                    for(let item of this.arrSlide){
                        item.style.margin = `0 ${this.options.margin}px`;
                    }
                }else{
                    this.listWidth = (this.options.margin * 2 + this.arrSlide[0].offsetWidth) * this.arrSlide.length;
                    this.maxTranslateX = this.listWidth - this.el.offsetWidth;
                    this.elList.style.width = this.listWidth + 'px';
                    if (this.options.margin !== this.marginDefault){
                        this.options.margin = this.marginDefault;
                        for (let item of this.arrSlide) {
                            item.style.margin = `0 ${this.options.margin}px`;
                        } 
                    }
                    
                    this.opacityView = Math.floor(this.el.offsetWidth / (this.arrSlide[0].offsetWidth + this.options.margin * 2));
                }

            }

            prev(){
                if(this.currentSlide > 0){
                    this.showSilde(this.currentSlide - 1);
                }else{
                    this.showSilde(this.arrSlide.length - this.opacityView);
                }
            }

            next(){
                if (this.currentSlide < this.arrSlide.length - this.opacityView) {
                    this.showSilde(this.currentSlide + 1);
                } else {
                    this.showSilde(0);
                }
            }

            showSilde(num){
                this.currentSlide = num;
                let len = ( this.arrSlide[0].offsetWidth + (num ? this.options.margin * 2 : 0) ) * num;
                this._swipe.translateX = len;
                this.elList.style.transform = 'translateX(-' + len + 'px)';
            }

            _debounce(func){
                let timeout;
                return () => {
                    clearTimeout(timeout);
                    timeout = setTimeout(func, 200);
                };
            }

            _addEventSwipe(){
                this._swipe = {
                    started: false,
                    detecting: false,
                    touch: null,
                    x: 0,
                    y: 0,
                    delta: 0,
                    prevDelta: 0,
                    newX: 0,
                    newY: 0,
                    translateX: 0
                }

                this.elList.addEventListener('touchstart', (ev) => {
                    this._swipeStart(ev);
                });
                this.elList.addEventListener('touchmove', (ev) => {
                    this._swipeMove(ev);
                });
                this.elList.addEventListener('touchend', (ev) => {
                    this._swipeEnd(ev);
                });
                this.elList.addEventListener('touchcancel', (ev) => {
                    this._swipeEnd(ev);
                });
            }

            _swipeStart(ev){
                this.elList.classList.remove('posts__list--animation');
                if (ev.touches.length != 1 || this._swipe.started) {
                    this.elList.classList.add('posts__list--animation');
                    return;
                }

                this._swipe.detecting = true;
                this._swipe.touch = ev.changedTouches[0];
                this._swipe.x = this._swipe.touch.pageX;
                this._swipe.y = this._swipe.touch.pageY;
            }

            _swipeMove(ev){
                if (!this._swipe.started && !this._swipe.detecting) {
                    return;
                }
                this._swipe.newX = ev.changedTouches[0].pageX;
                this._swipe.newY = ev.changedTouches[0].pageY;

                if (this._swipe.detecting) {
                    this._swipeDetect(ev);
                }

                if (this._swipe.started) {
                    this._swipeDraw(ev);
                }
            }

            _swipeEnd(ev){
                let swipeTo;
                
                this.elList.classList.add('posts__list--animation');

                if (this._isItTouch(ev) || !this._swipe.started) {
                    return;
                }

                ev.preventDefault();
                this._swipe.started = false;

                swipeTo = this._swipe.delta < 0 ? 'left' : 'right';

                this._swipeTo();
                this._swipe.prevDelta = 0;
            }

            _swipeDetect(ev){
                if (this._isItTouch(ev)) {
                    return;
                }

                if (Math.abs(this._swipe.x - this._swipe.newX) >= Math.abs(this._swipe.y - this._swipe.newY)) {  
                    ev.preventDefault();
                    this._swipe.started = true;
                }

                this._swipe.detecting = false;
            }

            _swipeDraw(ev){
                let dX;
                
                ev.preventDefault();
                
                if (this._isItTouch(ev)) {
                    return;
                }

                this._swipe.delta = this._swipe.x - this._swipe.newX;
                dX = this._swipe.delta - this._swipe.prevDelta;
                this._swipe.prevDelta = this._swipe.delta;

                if (this._swipe.delta < 0 && (this._swipe.translateX <= 0) || this._swipe.delta > 0 && (this.maxTranslateX <= this._swipe.translateX)) {
                    dX = dX / 5;
                }

                this._moveTo(dX);
            }

            _isItTouch(ev){
                for (let touch of ev.changedTouches){
                    if(touch === this._swipe.touch) return true;
                }
                return false;
            }

            _moveTo(dX){
                let len;
                //this._swipe.translateX = this._swipe.currentSwipe + this._swipe.delta;
                this._swipe.translateX += dX;
                len = this._swipe.translateX * -1;
                this.elList.style.transform = 'translateX(' + len + 'px)';
            }

            _swipeTo(){
                let count;
                if(this._swipe.translateX < 0){
                    this._swipe.translateX = 0;
                    this.showSilde(0);
                } else if (this._swipe.translateX > this.maxTranslateX){
                    this._swipe.translateX = this.maxTranslateX;
                    this.showSilde(this.arrSlide.length - this.opacityView);
                } else{
                    if (this._swipe.delta < 0){
                        count = Math.floor(this._swipe.translateX / (this.arrSlide[0].offsetWidth + this.options.margin * 2));
                    }else{
                        count = Math.ceil(this._swipe.translateX / (this.arrSlide[0].offsetWidth + this.options.margin * 2));
                    }
                    
                    this.showSilde(count);
                }
            }
        }



        win.AVASlider = Slider;
    })(document,window);
    
    let elSlider = document.querySelector('.slider');
    const slider = new AVSlider(elSlider);
    let elSlider2 = document.querySelector('.posts__content');
    const slider2 = new AVASlider(elSlider2, {
        classNameList: '.posts__list',
        classNameSlide: '.posts__item',
        classNameSlideActive: '.posts__item--active',
        classNamePrev: '.posts__nav-link--left',
        classNameNext: '.posts__nav-link--right',
        sliderNav: false,
        minView: 510,
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    btnNav.addEventListener('click', function(ev){
        btnNav.classList.toggle('is-active');

        if ( btnNav.classList.contains('is-active') ){
            nav.classList.add('nav--open');
            header.classList.add('header--dark');
        }else{
            nav.classList.remove('nav--open');
            header.classList.remove('header--dark');
        }
    });


    document.addEventListener("scroll", function(ev){
        let scrollTop = self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
       
        if (scrollTop >= Math.max(window.innerHeight, 530)){
            if (!header.classList.contains('header--fixed')) header.classList.add('header--fixed');
        } else {
            header.classList.remove('header--fixed');
        }
    })

    if (canvas.getContext) {
        drawPlay(canvas, 0.95);
        canvas.addEventListener('click', play);
        canvas.addEventListener('mousemove', function(ev){
            ev.stopPropagation();
        });
    }
    videoCont.addEventListener('mousemove',function (ev) {

        if ( videoCont.classList.contains('video--open') ){
            videoCont.classList.remove('video--clear');

            if (!ev.target.classList.contains('video__desc') || !ev.target.classList.contains('video__canvas')){
                clearTimeout(timerId)
                timerId = setTimeout(() => {
                    videoCont.classList.add('video--clear');
                }, 1500);
            }
        }
    })
    video.load();
    video.addEventListener('loadedmetadata', function () {
        let min = Math.round(video.duration / 60);
        let sec = Math.round(video.duration % 60);
        if(min < 10) min = '0' + min;
        if(sec < 10) sec = '0' + sec;
        videoTime.innerText = `${min}:${sec}`;
    });
    video.addEventListener('timeupdate', function () {
        let min = Math.floor( (video.duration - video.currentTime) / 60);
        let sec = Math.round( (video.duration - video.currentTime) % 60);
        if(min < 10) min = '0' + min;
        if(sec < 10) sec = '0' + sec;
        videoTime.innerText = `${min}:${sec}`;
    });

    function play(){
        if(video.paused){
            videoCont.classList.add('video--open');
            setTimeout(() => {
                videoCont.classList.add('video--clear');
            }, 1500);
            drawPause(canvas);
            video.play();
        }else{
            videoCont.classList.remove('video--clear');
            video.pause();
            drawPlay(canvas, 0.95);
        }
    }

    function drawPlay(canvas, x) {
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, 100, 100)

        ctx.beginPath();
        ctx.fillStyle = "rgba(17,17,17,0.5)";
        ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
        ctx.fill();


        ctx.strokeStyle = "#fff";
        ctx.lineWidth = "5";
        ctx.lineCap = "round";

        if(x > 0){
            ctx.beginPath();
            ctx.arc(50, 50, 40, (Math.PI / 180) * 135, (Math.PI / 180) * (135 + 360 * x), false);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.lineJoin = "round"
        ctx.moveTo(44, 35);
        ctx.lineTo(60, 50);
        ctx.lineTo(44, 65);
        ctx.closePath();
        ctx.stroke();
    }

    function drawPause(canvas) {
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, 100, 100)

        ctx.beginPath();
        ctx.fillStyle = "rgba(17,17,17,0.5)";
        ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
        ctx.fill();


        ctx.strokeStyle = "#fff";
        ctx.lineWidth = "5";
        ctx.lineCap = "round";
/*
        ctx.beginPath();
        ctx.arc(50, 50, 40, (Math.PI / 180) * 135, (Math.PI / 180) * (135 + 360 * 0.95), false);
        ctx.stroke();
*/
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.lineJoin = "round"
        ctx.moveTo(42, 35);
        ctx.lineTo(42, 65);
        ctx.moveTo(58, 35);
        ctx.lineTo(58, 65);
        ctx.stroke();
    }
};