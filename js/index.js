(function () {
  var UL_STYLES = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%',
    display: 'flex',
    height: '100%',
    listStyle: 'none'
  };

  var WRAPPER_STYLES = {
    overflow: 'hidden',
    position: 'relative'
  };

  function Carousel($wrapper, period, slideDuration, itemsPerView) {
    this.$wrapper = $wrapper;
    this.slideDuration = slideDuration;
    this.itemsPerView = itemsPerView;
    this.currentIdx = itemsPerView;
    this.$ul = $wrapper.find('ul');
    this.$listItems = this.$ul.children();
    this.liWidth = (100 / (itemsPerView * 2)).toFixed(3) + '%';
    this.applyStyles();
    this.textContents = $.makeArray(this.$listItems).map(function (li) {
      return li.textContent;
    });
    this.$listItems.slice(this.itemsPerView).remove();
    this.addChildren(this.itemsPerView, this.$ul);
    setInterval(this.slide.bind(this), period);
  }

  Carousel.prototype = {
    removeFirstItems: function(n) {
      this.$ul.children().slice(0, n).remove();
      this.$ul.css({ left: '0' });
    },
    addChild: function() {
      this.$li = $(document.createElement('li'));
      this.$p = $(document.createElement('p'));
      this.$p.text(this.textContents[this.currentIdx++ % this.textContents.length]);
      this.$li.append(this.$p);
      this.$ul.append(this.$li);
      this.$li.css('width', this.liWidth);
    },
    addChildren: function(n) {
      var count = 0;
      while (count++ < n) {
        this.addChild(this.$ul);
      }
    },
    slide: function() {
      var self = this;
      this.$ul.animate({ left: '-100%'}, this.slideDuration, function () {
        self.removeFirstItems(self.itemsPerView, self.$ul);
        self.addChildren(self.itemsPerView, self.$ul);
      });
    },
    applyStyles: function() {
      this.$wrapper.css(WRAPPER_STYLES);
      this.$ul.css(UL_STYLES);
      this.$listItems.css('width', this.liWidth);
    },
  };

  Carousel.prototype.constructor = Carousel;

  function fitItems($wrapper) {
    var wrapperWidth = parseInt($wrapper.css('width'), 10);
    var minItemWidth = parseInt($wrapper.data('min-item-width'), 10);
    var maxItemsPerView = parseInt($wrapper.data('items-per-view'), 10);
    return Math.min(Math.floor(wrapperWidth / minItemWidth), maxItemsPerView);
  }

  $(function () {
    $('.autocarousel').each(function () {
      var $wrapper = $(this);
      var period = parseInt($wrapper.data('period'), 10);
      var slideDuration = parseInt($wrapper.data('slide-duration'), 10);
      new Carousel($wrapper, period, slideDuration, fitItems($wrapper));
    });
  });
}());
