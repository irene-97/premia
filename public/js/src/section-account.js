$(() => {
    var $section = $('.section-account');

    $section.find('.voting .marks').on('click', '.circle', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    $section.find('.button.save-mark').on('click', function () {
        // TODO: save mark
        $.fancybox('#mark-saved');
    });

    $section.find('.button.continue').on('click', function () {
        $.fancybox('#continue');
    });

    $section.find('.button.delete').on('click', function () {
        $.fancybox('#delete');
    });
});