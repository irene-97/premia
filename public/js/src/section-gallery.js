$(() => {
    function initMainGallery($mainGallery) {
        $mainGallery.find('.slider').slick({
            arrows: true,
            dots: false,
            slidesToShow: 1,
            speed: 1000
        });

        $mainGallery.find('.slide').fancybox({
            padding: 15
        });
    }

    var $section = $('.section-gallery');
    var $mainGalleryList = $section.find('.main-gallery-list');
    var $galleryList = $section.find('.gallery-list');

    $mainGalleryList.find('.main-gallery').each(function () {
        initMainGallery($(this));
    });

    $galleryList.find('.gallery').on('click', function () {
        var $this = $(this);
        var id = $this.data('id');
        var $mainGallery = $(`#gallery-${id}`);

        if ($mainGallery.length) {
            if (!$mainGallery.hasClass('active')) {
                $mainGallery.addClass('active').siblings().removeClass('active');
            }
        } else {
            $.ajax({
                type: 'get',
                url: '/actions/get-gallery.php',
                data: {
                    id: id
                },
                success: function (html) {
                    var $mainGallery = $(html);

                    $mainGalleryList.append($mainGallery);
                    $mainGallery.addClass('active').siblings().removeClass('active');
                    initMainGallery($mainGallery);
                }
            });
        }
    });
});