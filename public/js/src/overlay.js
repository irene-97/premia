$(() => {
    var page = location.pathname === '/' ? 'index' : (location.pathname.match(/^\/([^\/]*).php$/) || [])[1];

    if (page) {
        $('<img>')
            .on('load', function () {
                perfectlyAligned.init({
                    backgroundImage: `url(${this.src})`,
                    height: `${this.height}px`,
                    minWidth: $(document.body).css('min-width')
                });
            })
            .attr('src', `images/pages/${page}.png`);
    }
});