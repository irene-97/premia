$(() => {
    $('.section-partners .slider').slick({
        arrows: true,
        dots: false,
        variableWidth: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        speed: 1000,
        responsive: [
            {
                breakpoint: 1050,
                settings: {
                    variableWidth: false,
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 840,
                settings: {
                    variableWidth: false,
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 670,
                settings: {
                    variableWidth: false,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
});