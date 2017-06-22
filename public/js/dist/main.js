(function () {
  'use strict';

  $(function () {
      var page = location.pathname === '/' ? 'index' : (location.pathname.match(/^\/([^\/]*).php$/) || [])[1];

      if (page) {
          $('<img>').on('load', function () {
              perfectlyAligned.init({
                  backgroundImage: 'url(' + this.src + ')',
                  height: this.height + 'px',
                  minWidth: $(document.body).css('min-width')
              });
          }).attr('src', 'images/pages/' + page + '.png');
      }
  });

  $.fancybox.defaults.padding = 35;

  $(function () {
      $('a.js-fancybox').fancybox({
          padding: 15
      });

      $(document).on('click', 'button.js-fancybox', function () {
          $.fancybox($(this).data('href'));
      });
  });

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Filebox = function () {
      function Filebox(element) {
          classCallCheck(this, Filebox);

          this.$element = $(element);
          this.$list = this.$element.children('.files');
          this.$input = this.$element.find(':file');
      }

      //noinspection JSUnusedGlobalSymbols


      createClass(Filebox, [{
          key: 'exists',
          value: function exists() {
              return !!this.$element.length;
          }

          //noinspection JSUnusedGlobalSymbols

      }, {
          key: 'count',
          value: function count() {
              return this.$list.children('.file').length;
          }
      }, {
          key: 'files',
          value: function files() {
              return (this.$input.get(0) || {}).files || [];
          }
      }, {
          key: 'item',
          value: function item() {
              var indexOrFilter = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

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
      }, {
          key: 'items',
          value: function items() {
              var filter = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

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
      }, {
          key: 'add',
          value: function add(files) {
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
      }, {
          key: 'forEachItem',
          value: function forEachItem(callback) {
              var filter = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

              FileboxItem.forEach(this.items(filter), callback);

              return this;
          }
      }]);
      return Filebox;
  }();

  var FileboxItem = function () {
      createClass(FileboxItem, null, [{
          key: 'createElement',
          value: function createElement(name) {
              var href = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

              var $item = $('<div class="file"></div>');

              if (href) {
                  $item.addClass('uploaded').append($('<a>').attr('href', href).text(name)).append($('<button class="button remove size_25 color_transparent-black" type="button"></button>'));
              } else {
                  $item.addClass('new').text(name);
              }

              return $item;
          }
      }, {
          key: 'createElementFromFile',
          value: function createElementFromFile(file) {
              return FileboxItem.createElement(file.name);
          }
      }, {
          key: 'forEach',
          value: function forEach(items, callback) {
              $.each($.isArray(items) ? items : [items], function (index, item) {
                  return $.proxy(callback, item)(index, item);
              });
          }
      }]);

      function FileboxItem(element, parent) {
          classCallCheck(this, FileboxItem);

          this.$element = $(element);
          this.parent = parent || new Filebox(this.$element.closest('.filebox'));
      }

      createClass(FileboxItem, [{
          key: 'exists',
          value: function exists() {
              return !!this.$element.length;
          }
      }, {
          key: 'isNew',
          value: function isNew() {
              return this.$element.hasClass('new');
          }

          //noinspection JSUnusedGlobalSymbols

      }, {
          key: 'isUploaded',
          value: function isUploaded() {
              return this.$element.hasClass('uploaded');
          }
      }, {
          key: 'index',
          value: function index() {
              return this.$element.index();
          }
      }, {
          key: 'prev',
          value: function prev() {
              var filter = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

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
      }, {
          key: 'next',
          value: function next() {
              var filter = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

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
      }, {
          key: 'siblings',
          value: function siblings(filter) {
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
      }, {
          key: 'remove',
          value: function remove() {
              this.$element.remove();

              if (this.parent.count() === 0) {
                  this.parent.$element.addClass('empty');
              }

              return this;
          }
      }]);
      return FileboxItem;
  }();

  $(function () {
      $(document).on('change', '.filebox', function () {
          var filebox = new Filebox(this);

          filebox.forEachItem(function (index, item) {
              return item.remove();
          }, function (item) {
              return item.isNew();
          });

          filebox.add(filebox.files());
      }).on('click', '.filebox > .files > .file > .remove', function () {
          var item = new FileboxItem($(this).parent());

          item.remove();
      });
  });

  $(function () {
      $('.mask-phone').inputmask({
          mask: '+7 (999) 999 99 99',
          showMaskOnHover: false,
          showMaskOnFocus: true
      }).attr('placeholder', '+7 (___) ___ __ __');
  });

  $(function () {
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

  $(function () {
      $('.block-tabs .tab-toggle').on('click', function () {
          $(this).parent().toggleClass('open');
      });
  });

  $(function () {
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

  $(function () {
      $('.section-banner-slider').slick({
          arrows: false,
          dots: true,
          fade: true
      });
  });

  $(function () {
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
          var $mainGallery = $('#gallery-' + id);

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
                  success: function success(html) {
                      var $mainGallery = $(html);

                      $mainGalleryList.append($mainGallery);
                      $mainGallery.addClass('active').siblings().removeClass('active');
                      initMainGallery($mainGallery);
                  }
              });
          }
      });
  });

  $(function () {
      $('.section-partners .slider').slick({
          arrows: true,
          dots: false,
          variableWidth: true,
          slidesToShow: 5,
          slidesToScroll: 5,
          speed: 1000,
          responsive: [{
              breakpoint: 1050,
              settings: {
                  variableWidth: false,
                  slidesToShow: 4,
                  slidesToScroll: 4
              }
          }, {
              breakpoint: 840,
              settings: {
                  variableWidth: false,
                  slidesToShow: 3,
                  slidesToScroll: 3
              }
          }, {
              breakpoint: 670,
              settings: {
                  variableWidth: false,
                  slidesToShow: 2,
                  slidesToScroll: 2
              }
          }]
      });
  });

  $(function () {
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

}());
//# sourceMappingURL=main.js.map
