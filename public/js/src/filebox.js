export class Filebox {
    constructor(element) {
        this.$element = $(element);
        this.$list = this.$element.children('.files');
        this.$input = this.$element.find(':file');
    }

    //noinspection JSUnusedGlobalSymbols
    exists() {
        return !!this.$element.length;
    }

    //noinspection JSUnusedGlobalSymbols
    count() {
        return this.$list.children('.file').length;
    }

    files() {
        return (this.$input.get(0) || {}).files || [];
    }

    item(indexOrFilter = null) {
        if ($.isFunction(indexOrFilter)) {
            var item = this.item(0);

            if ($.proxy(indexOrFilter, item)(item)) {
                return item;
            } else {
                return item.next(indexOrFilter);
            }
        } else {
            if (indexOrFilter >= 0) {
                return new FileboxItem(this.$list.children('.file').eq(indexOrFilter), this);
            } else {
                return new FileboxItem($(), this);
            }
        }
    }

    items(filter = null) {
        var filebox = this;
        var items = [];

        this.$list.children('.file').each(function () {
            var item = new FileboxItem(this, filebox);

            if ($.isFunction(filter)) {
                if ($.proxy(filter, item)(item)) {
                    items.push(item);
                }
            } else {
                items.push(item);
            }
        });

        return items;
    }

    add(files) {
        if (files) {
            var $items = $();

            this.$element.toggleClass('empty', files.length === 0);

            for (var i = 0; i < files.length; i++) {
                $items = $items.add(FileboxItem.createElementFromFile(files[i]));
            }

            this.$list.append($items);
        }

        return this;
    }

    forEachItem(callback, filter = null) {
        FileboxItem.forEach(this.items(filter), callback);

        return this;
    }
}

export class FileboxItem {
    static createElement(name, href = null) {
        var $item = $('<div class="file"></div>');

        if (href) {
            $item.addClass('uploaded')
                .append($('<a>').attr('href', href).text(name))
                .append($('<button class="button remove size_25 color_transparent-black" type="button"></button>'));
        } else {
            $item.addClass('new').text(name);
        }

        return $item;
    }

    static createElementFromFile(file) {
        return FileboxItem.createElement(file.name);
    }

    static forEach(items, callback) {
        $.each($.isArray(items) ? items : [items], function (index, item) {
            return $.proxy(callback, item)(index, item);
        });
    }

    constructor(element, parent) {
        this.$element = $(element);
        this.parent = parent || new Filebox(this.$element.closest('.filebox'));
    }

    exists() {
        return !!this.$element.length;
    }

    isNew() {
        return this.$element.hasClass('new');
    }

    //noinspection JSUnusedGlobalSymbols
    isUploaded() {
        return this.$element.hasClass('uploaded');
    }

    index() {
        return this.$element.index();
    }

    prev(filter = null) {
        var item = new FileboxItem(this.$element.prev(), this.parent);

        if ($.isFunction(filter)) {
            if ($.proxy(filter, item)(item) || !item.exists()) {
                return item;
            } else {
                return item.prev(filter);
            }
        } else {
            return item;
        }
    }

    next(filter = null) {
        var item = new FileboxItem(this.$element.next(), this.parent);

        if ($.isFunction(filter)) {
            if ($.proxy(filter, item)(item) || !item.exists()) {
                return item;
            } else {
                return item.next(filter);
            }
        } else {
            return item;
        }
    }

    siblings(filter) {
        var thisItem = this;

        return this.parent.items(function (item) {
            if (item.index() !== thisItem.index()) {
                if ($.isFunction(filter)) {
                    return $.proxy(filter, item)(item);
                }

                return true;
            }

            return false;
        });
    }

    remove() {
        this.$element.remove();

        if (this.parent.count() === 0) {
            this.parent.$element.addClass('empty');
        }

        return this;
    }
}

$(() => {
    $(document)
        .on('change', '.filebox', function () {
            var filebox = new Filebox(this);

            filebox.forEachItem(
                (index, item) => item.remove(),
                (item) => item.isNew()
            );

            filebox.add(filebox.files());
        })
        .on('click', '.filebox > .files > .file > .remove', function () {
            var item = new FileboxItem($(this).parent());

            item.remove();
        });
});