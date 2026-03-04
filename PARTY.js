(function() {
  // Configuration with your new assets
  var MIN_HEIGHT = 30;
  var MIN_WIDTH = 30;
  var MAX_HEIGHT = 350;
  var MAX_WIDTH = 350;
  
  var AUDIO_URL = "https://thatrealfriendlydev.github.io/tetris/EPIKPARTY.mp3";
  var CSS_URL = "https://thatrealfriendlydev.github.io/tetris/PARTY.css";
  
  var SHAKE_CLASS = "mw-party_me";
  var FIRST_CLASS = "im_first";
  var OTHER_CLASSES = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
  var STROBE_CLASS = "mw-strobe_light";
  var CSS_MARKER = "mw_added_css";

  function addCSS() {
    var link = document.createElement("link");
    link.setAttribute("type", "text/css");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", CSS_URL);
    link.setAttribute("class", CSS_MARKER);
    document.body.appendChild(link);
  }

  function getViewportHeight() {
    var de = document.documentElement;
    if (!!window.innerWidth) return window.innerHeight;
    else if (de && !isNaN(de.clientHeight)) return de.clientHeight;
    return 0;
  }

  function getScrollTop() {
    if (window.pageYOffset) return window.pageYOffset;
    return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  }

  function isVisible(el) {
    var top = (function(node) {
      var offset = 0;
      while (node) {
        offset += node.offsetTop;
        node = node.offsetParent;
      }
      return offset;
    })(el);
    var viewTop = getScrollTop();
    var viewBottom = viewTop + getViewportHeight();
    return (top >= viewTop && top <= viewBottom);
  }

  function isProperSize(el) {
    var h = el.offsetHeight;
    var w = el.offsetWidth;
    return (h > MIN_HEIGHT && h < MAX_HEIGHT && w > MIN_WIDTH && w < MAX_WIDTH);
  }

  // 1. Find the first mover based on original size logic
  var allNodes = document.getElementsByTagName("*");
  var firstMover = null;
  for (var i = 0; i < allNodes.length; i++) {
    if (isProperSize(allNodes[i]) && isVisible(allNodes[i])) {
      firstMover = allNodes[i];
      break;
    }
  }

  if (firstMover === null) {
    console.warn("No suitable element found. Try scrolling to a different part of the page!");
    return;
  }

  // 2. Start the Party
  addCSS();
  var audio = new Audio(AUDIO_URL);
  audio.className = CSS_MARKER;
  
  audio.addEventListener("canplay", function() {
    // Phase 1: Solo dance
    setTimeout(function() {
      firstMover.className += " " + SHAKE_CLASS + " " + FIRST_CLASS;
    }, 500);

    // Phase 2: The Beat Drop
    setTimeout(function() {
      // Add Strobe
      var strobe = document.createElement("div");
      strobe.className = STROBE_CLASS;
      document.body.appendChild(strobe);

      // Everyone joins in
      for (var j = 0; j < allNodes.length; j++) {
        var node = allNodes[j];
        if (isProperSize(node)) {
          var randomEffect = OTHER_CLASSES[Math.floor(Math.random() * OTHER_CLASSES.length)];
          node.className += " " + SHAKE_CLASS + " " + randomEffect;
        }
      }
    }, 15500); // 15.5 seconds for the drop
  }, true);

  document.body.appendChild(audio);
  audio.play().catch(function(e) {
    alert("Please click the page once first, then click the bookmarklet again to allow audio!");
  });
})();