$.fancybox.defaults.padding = 35;

$(() => {
    $('a.js-fancybox').fancybox({
        padding: 15
    });

    $(document).on('click', 'button.js-fancybox', function () {
        $.fancybox($(this).data('href'));
    });
});