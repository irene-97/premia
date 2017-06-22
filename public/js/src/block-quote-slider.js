$(() => {
    $('.block-quote-slider').each(function () {
        var $this = $(this);

        var options = {
            arrows: true,
            dots: true,
            slidesToShow: 1,
            adaptiveHeight: true,
            speed: 1000
        };

        if ($this.hasClass('small')) {
            options.speed = 1000;
            options.autoplay = true;
            options.autoplaySpeed = 8000;
            options.touchMove = false;
            options.draggable = false;
        }

        $this.slick(options);
    });
});