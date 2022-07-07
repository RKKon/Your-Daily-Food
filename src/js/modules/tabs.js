function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const foodItemInMenu = document.body.querySelectorAll(tabsSelector);
    const tabsFoodContent = document.body.querySelectorAll(tabsContentSelector);
    const typeFoodInMenuFood = document.body.querySelector(tabsParentSelector);

    const hideTabsFoodContent = function () { // прячет табы     
        tabsFoodContent.forEach(item => {
            item.classList.add('hide_display');
            item.classList.remove('show_display', 'fade');
            // tabsFoodContent[i].getElementsByClassName.display = 'none';//вместо 2 выше(не рекомендуется)
        });   

        foodItemInMenu.forEach(item => {
            item.classList.remove(activeClass); // убирает класс активности
        });
    };

    // !Крутая функция которая 1) показывает нужный таб и 2) даваляет нужный класс активности у меню.
    function showTabContent(i = 0) { // по default ставит индекс 0 и показывает 1 таб и меню активность
        tabsFoodContent[i].classList.add('show_display', 'fade');
        tabsFoodContent[i].classList.remove('hide_display');
        // tabsFoodContent[i].getElementsByClassName.display = 'block';//вместо 2 выше(не рекомендуется)
        foodItemInMenu[i].classList.add(activeClass);  
    }
    hideTabsFoodContent();
    showTabContent(); // показывае 1  пункт меню и 1 таб (active и show)

    typeFoodInMenuFood.addEventListener('click', (event) => {
        const target = event.target;
        //event.preventDefault();
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            foodItemInMenu.forEach ((item, i) => {
                if (target == item) {
                    hideTabsFoodContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;