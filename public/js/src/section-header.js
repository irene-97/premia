$(() => {
    var $section = $('.section-header');
    var $menuWrapper = $section.find('.menu-wrapper');

    $menuWrapper.children('.toggle').on('click', function () {
        $menuWrapper.toggleClass('open');
    });

    $menuWrapper.on('click', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', function () {
        $menuWrapper.removeClass('open');
    });
});