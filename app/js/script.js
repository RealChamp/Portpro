$(() => {
    lightbox.option({
        'fixedNavigation': true,
        'disableScrolling': true,
        'showImageNumberLabel': false,
    });


    $('.burger-menu').on('click', () => {
        $('span').toggleClass('burger-active');
    });


});