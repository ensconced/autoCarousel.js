(function(){var t={position:"absolute",top:0,left:0,width:"200%",display:"flex",height:"100%",listStyle:"none"};var i={overflow:"hidden",position:"relative"};function s(t,i,e,s){this.$wrapper=t;this.slideDuration=e;this.itemsPerView=s;this.currentIdx=s;this.$ul=t.find("ul");this.$listItems=this.$ul.children();this.liWidth=(100/(s*2)).toFixed(3)+"%";this.applyStyles();this.textContents=$.makeArray(this.$listItems).map(function(t){return t.textContent});this.$listItems.slice(this.itemsPerView).remove();this.addChildren(this.itemsPerView,this.$ul);setInterval(this.slide.bind(this),i)}s.prototype={removeFirstItems:function(t){this.$ul.children().slice(0,t).remove();this.$ul.css({left:"0"})},addChild:function(){this.$li=$(document.createElement("li"));this.$p=$(document.createElement("p"));this.$p.text(this.textContents[this.currentIdx++%this.textContents.length]);this.$li.append(this.$p);this.$ul.append(this.$li);this.$li.css("width",this.liWidth)},addChildren:function(t){var i=0;while(i++<t){this.addChild(this.$ul)}},slide:function(){var t=this;this.$ul.animate({left:"-100%"},this.slideDuration,function(){t.removeFirstItems(t.itemsPerView,t.$ul);t.addChildren(t.itemsPerView,t.$ul)})},applyStyles:function(){this.$wrapper.css(i);this.$ul.css(t);this.$listItems.css("width",this.liWidth)}};s.prototype.constructor=s;function n(t){var i=parseInt(t.css("width"),10);var e=parseInt(t.data("min-item-width"),10);var s=parseInt(t.data("items-per-view"),10);return Math.min(Math.floor(i/e),s)}$(function(){$(".autocarousel").each(function(){var t=$(this);var i=parseInt(t.data("period"),10);var e=parseInt(t.data("slide-duration"),10);new s(t,i,e,n(t))})})})();