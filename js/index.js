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

  function autoCarousel($wrapper, period, slideDuration, itemsPerView) {
    function removeFirstItems(n) {
      $ul.children().slice(0, n).remove();
      $ul.css({ left: '0' });
    }
    function addChild() {
      var $li = $(document.createElement('li'));
      var $p = $(document.createElement('p'));
      $p.text(textContents[currentIdx++ % textContents.length]);
      $li.append($p);
      $ul.append($li);
      $li.css('width', liWidth);
    }
    function addChildren(n) {
      var count = 0;
      while (count++ < n) {
        addChild($ul);
      }
    }
    function slide() {
      $ul.animate({ left: '-100%'}, slideDuration, function () {
        removeFirstItems(itemsPerView, $ul);
        addChildren(itemsPerView, $ul);
      });
    }
    function applyStyles() {
      $wrapper.css(WRAPPER_STYLES);
      $ul.css(UL_STYLES);
      $listItems.css('width', liWidth);
    }

    var currentIdx = itemsPerView;
    var $ul = $wrapper.find('ul');
    var $listItems = $ul.children();
    var liWidth = (100 / (itemsPerView * 2)).toFixed(3) + '%';
    applyStyles();
    var textContents = $.makeArray($listItems).map(function (li) {
      return li.textContent;
    });
    $listItems.slice(itemsPerView).remove();
    addChildren(itemsPerView, $ul);
    setInterval(slide, period);
  }
  function fitItems($wrapper) {
    var wrapperWidth = parseInt($wrapper.css('width'), 10);
    var minItemWidth = parseInt($wrapper.data('min-item-width'), 10);
    var maxItemsPerView = parseInt($wrapper.data('items-per-view'), 10);
    return Math.min(Math.floor(wrapperWidth / minItemWidth), maxItemsPerView);
  }

  $(function () {
    var autoCarousels = $('.autocarousel');

    autoCarousels.each(function () {
      var $wrapper = $(this);
      var period = parseInt($wrapper.data('period'), 10);
      var slideDuration = parseInt($wrapper.data('slide-duration'), 10);
      autoCarousel($wrapper, period, slideDuration, fitItems($wrapper));
    });
  });
}());
