$(() => {
    $('.block-tabs .tab-toggle').on('click', function () {
        $(this).parent().toggleClass('open');
    })
});