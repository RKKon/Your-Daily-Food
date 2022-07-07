function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    

    const slides = document.body.querySelectorAll(slide);
    const sliderNextArrow = document.body.querySelector(nextArrow);
    const sliderPrevArrow = document.body.querySelector(prevArrow);
    const currentNumberSlide = document.body.querySelector(currentCounter);
    const totalNumberSlide = document.body.querySelector(totalCounter);

    // вариант 2 slider from teacher. так же можно улучшить в будущем (для сенсерного перетаскивания darag and drop мишкой и тп) 
    //! in HTML Все блоки offer__slide обернуть в <div class="offer__slider-inner">
    const slider = document.body.querySelector(container);
    const slidesWrapper = document.body.querySelector(wrapper);
    const slidesField = document.body.querySelector(field);
    const widthSlide = window.getComputedStyle(slidesWrapper).width;
    let slideIndex= 1;
    let offset = 0; // отступ

    if (slides.length > 9) { // for show max amount of slides
        totalNumberSlide.innerHTML = slides.length;
    } else {totalNumberSlide.innerHTML = `0${slides.length}`;}
    

    // можно через классы из CSS делать. тут просто на скорую руку сделано
    slidesField.style.width = 100 * slides.length + "%"; //установим блоку ширину(во всю длину(тут 400%)). все слады * на 100%
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden'; // скрываем все эелементы которые не попадают в область видимости
    slides.forEach(slide => slide.style.width = widthSlide); // все слайды нужного width
    
    slider.style.position = 'relative';
    const dots = document.createElement('ol');
    const indicators = [];
    dots.classList.add('carousel-indicators');
    slider.append(dots);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li'); // cоздавем li
        dot.setAttribute('data-slide-to', i + 1); // уставаливаем для каждой точки аттрибут
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        indicators.push(dot);
    }

    let changeOpacityIndicators = () => {
        indicators.forEach(dot => dot.style.opacity = '.5');
        indicators[slideIndex - 1].style.opacity = 1;
    };
    let changeDotsNumber = () => {
        if (slideIndex > 9) { // for show number current slides
            currentNumberSlide.innerHTML = slideIndex;
        } else {currentNumberSlide.innerHTML = `0${slideIndex}`;}
    };
    const delLettersAndSpaces = (str) => +str.replace(/\D/g, '');// del px and return numbers. тут регулярное выражение
    
    sliderNextArrow.addEventListener('click', () => {
        if (offset == delLettersAndSpaces(widthSlide) * (slides.length - 1)) { //в обычном случае тут '650px'. slice and + превращают в число 650
            offset = 0; // вернуть слайдер в начальное положение
        } else {
            offset += delLettersAndSpaces(widthSlide); // смещает слайд на определеную величину(650)
        }
        slidesField.style.transform = `translateX(-${offset}px)`; //в CSS если сдвинуть влево то отрицательно значение, если вправо то положительное
        
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {slideIndex++;}

        changeDotsNumber();
        changeOpacityIndicators();
    });

    sliderPrevArrow.addEventListener('click', () => {
        if (offset == 0) {          
            offset = delLettersAndSpaces(widthSlide) * (slides.length - 1);
        } else {
            offset -= delLettersAndSpaces(widthSlide); // смещает слайд на определеную величину(500)
        } 
        slidesField.style.transform = `translateX(-${offset}px)`; //в CSS если сдвинуть влево то отрицательно значение, если вправо то положительное
        
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {slideIndex--;}

        changeDotsNumber();
        changeOpacityIndicators();
    });

    indicators.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo; // устанавливает индекс
            offset = delLettersAndSpaces(widthSlide) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`; // смещение

            changeDotsNumber();     
            changeOpacityIndicators();
        });
    });


    /* // вариант 1 слайда от учителя
    let slideIndex= 1;

    function showSlides(n) {
        if(n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(slide => slide.classList.add('hide_display'));
        slides[slideIndex -1].classList.remove('hide_display');

        if (slideIndex > 9) {
            currentNumberSlide.innerHTML = slideIndex;
        } else {currentNumberSlide.innerHTML = `0${slideIndex}`;}
    }
    showSlides(slideIndex);

    if (slides.length > 9) {
        totalNumberSlide.innerHTML = slides.length;
    } else {totalNumberSlide.innerHTML = `0${slides.length}`;}

    function plusSlide(n) {
        showSlides(slideIndex = slideIndex + n);
    }

    sliderNextArrow.addEventListener('click', () => {
        plusSlide(1);
    });
    sliderPrevArrow.addEventListener('click', () => {
        plusSlide(-1);
    }); */

    /* // Моё личное решение слайдов вариант 1
    slides.forEach(slide => slide.classList.add('hide_display'));
    if (slides.length > 9) {
        totalNumberSlide.innerHTML = `${slides.length}`;
    } else {totalNumberSlide.innerHTML = `0${slides.length}`;}

    let counter = 0; // без counter не выводит в глобальную переменную которая сохраняет данные при клике на addEv
    
    const hideCurrentSlideForNext = (counter, i=1) => {
        if (counter < 9) {
            currentNumberSlide.innerHTML = `0${counter + 1}`;
        } else {currentNumberSlide.innerHTML = `${counter + 1}`;}
        slides[counter - i].classList.remove('show_display', 'fade');
        slides[counter - i].classList.add('hide_display');
    };
    const hideCurrentSlideForPrior = (counter, i=1) => {
        if (counter < 9) {
            currentNumberSlide.innerHTML = `0${counter + 1}`;
        } else {currentNumberSlide.innerHTML = `${counter + 1}`;}
        slides[counter + i].classList.remove('show_display', 'fade');
        slides[counter + i].classList.add('hide_display');
    };

    function showSlide(i = 0) { // по default ставит индекс 0 и показывает 1 img
        slides[i].classList.add('show_display', 'fade');
        slides[i].classList.remove('hide_display');
    }
    showSlide();

    sliderNextArrow.addEventListener('click', () => {
        if (counter + 1 < slides.length) {
            counter++;
            showSlide(counter);
            hideCurrentSlideForNext(counter);
        } else if (counter + 1 == slides.length) {
            hideCurrentSlideForNext(counter, 0);
            currentNumberSlide.innerHTML = `0${1}`;
            counter = 0;
            showSlide(counter);
        }
    });
    sliderPrevArrow.addEventListener('click', () => {
        if (counter + slides.length == slides.length) {
            hideCurrentSlideForNext(counter, 0);
            showSlide(counter + slides.length - 1);
            currentNumberSlide.innerHTML = `0${slides.length}`;
            counter = slides.length - 1;
        } else if (counter < slides.length) {
            counter--;
            showSlide(counter);
            hideCurrentSlideForPrior(counter);
        }
    }); */
}

export default slider;