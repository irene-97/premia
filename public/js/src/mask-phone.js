$(() => {
    $('.mask-phone')
        .inputmask({
            mask: '+7 (999) 999 99 99',
            showMaskOnHover: false,
            showMaskOnFocus: true
        })
        .attr('placeholder', '+7 (___) ___ __ __');
});