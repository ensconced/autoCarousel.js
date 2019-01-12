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
  
  function attrInt($wrapper, attr) {
    return parseInt($wrapper.attr(attr), 10);
  }
  
  function autoCarousel($wrapper, period, slideDuration, itemsPerView) {
    function removeFirstItems(n) {
      $ul.children().slice(0, n).remove();
      $ul.css({
        transition: `left 0s ease`,
        left: '0'
      });
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
      addChildren(itemsPerView, $ul);
      $ul.css('transition', `left ` + String(slideDuration / 1000) + 's ease');
      setTimeout(function () {
        removeFirstItems(itemsPerView, $ul);
      }, slideDuration);
      $ul.css('left', '-100%');
    }
    function applyStyles() {
      $wrapper.css(WRAPPER_STYLES);    
      $ul.css(Object.assign(UL_STYLES, {
        transition: `left ` + String(slideDuration / 1000) + 's ease'
      }));
      $listItems.each(function () {
        $(this).css('width', liWidth);
      });
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
    setInterval(slide, period);
  }

  $(function () {
    var autoCarousels = $('.autocarousel');

    autoCarousels.each(function () {
      var $wrapper = $(this);    
      var period = attrInt($wrapper, 'data-period');;
      var slideDuration = attrInt($wrapper, 'data-slide-duration');
      var itemsPerView = attrInt($wrapper, 'data-items-per-view');
      autoCarousel($wrapper, period, slideDuration, itemsPerView)
    });
  });
} ());