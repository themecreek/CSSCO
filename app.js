(function(){
  if (!document.documentElement.classList)
    return;

  var options = INSTALL_OPTIONS;
  var prevFilters = [];
  // CSS Gram code can be used for this instance...
  var update = function(){
    for (var i=0; i < prevFilters.length; i++){
      prevFilters[i][0].classList.remove(prevFilters[i][1]);
    }
    prevFilters = [];

    for (var i=0; i < options.locations.length; i++){
      var region = options.locations[i];

      var el = document.querySelector(region.location);
      if (!el)
        continue;

      var imgs = el.querySelectorAll('img');
      if (!imgs)
        continue;

      for (var j=0; j < imgs.length; j++){
        if (imgs[j].parentNode.tagName == 'FIGURE'){
          var figure = imgs[j].parentNode;
        } else {
          var figure = document.createElement('figure');

          var style = getComputedStyle(imgs[j]);
          if (style.display == 'inline')
            figure.style.display = 'inline-block';
          else
            figure.style.display = style.display;

          figure.style.margin = style.margin;
          imgs[j].style.margin = 0;

          imgs[j].parentNode.replaceChild(figure, imgs[j]);
          figure.appendChild(imgs[j]);
        }

        figure.classList.add(region.cssgofilter);

        prevFilters.push([figure, region.cssgofilter]);
      }
    }
  };
  if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', update);
  else
    update();
  INSTALL_SCOPE = {
      setOptions: function(opts) {
      options = opts;
      update();
      }
  };
})();
