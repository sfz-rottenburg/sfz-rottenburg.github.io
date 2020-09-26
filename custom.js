$(document).ready(function () {
    if ($('.slider').length > 0) {
      $('.slider').slider({ indicators: false, interval: 8000, transition: 800, height: 400 });
    }
    $('select').material_select();
    if ($('.collapsible').length > 9) {
      $('.collapsible').collapsible({});
    }
    $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    $('#bc_akt_service .collapsible li:first-child').find('.collapsible-header').addClass('active');
  
    if ($('#page-ueber_uns').length > 0 && window.innerWidth >= 600) {
      var cnt = 0;
      $('#page-ueber_uns .bc_elem').each(function () {
        cnt++;
        if (cnt == 2) {
          $(this).addClass('bc_endrow');
          cnt = 0;
        }
      });
    }
  
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
    );
  
    $(window).scroll(function () {
      if (window.pageYOffset > $('#bc_header_wrapper').height() - $('#bc_header_wrapper .menuback').height()) {
        $('#bc_header_wrapper .menuback').addClass('fixed');
      } else {
        $('#bc_header_wrapper .menuback').removeClass('fixed');
      }
    });
  
    setTimeout(function () {
      var max = 0;
      $('.bc_samesize').each(function () {
        if ($(this).height() > max) {
          max = $(this).height();
        }
      });
      $('.bc_samesize').css('height', max + 30 + 'px');
    }, 500);
  
    // ACTIVITY INDICATOR
  
    var activityIndicatorOn = function () {
      $('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
    },
      activityIndicatorOff = function () {
        $('#imagelightbox-loading').remove();
      },
  
  
      // OVERLAY
  
      overlayOn = function () {
        $('<div id="imagelightbox-overlay"></div>').appendTo('body');
      },
      overlayOff = function () {
        $('#imagelightbox-overlay').remove();
      },
  
  
      // CLOSE BUTTON
  
      closeButtonOn = function (instance) {
        $('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function () { $(this).remove(); instance.quitImageLightbox(); return false; });
      },
      closeButtonOff = function () {
        $('#imagelightbox-close').remove();
      },
  
  
      // CAPTION
  
      captionOn = function () {
        var description = $('a[href="' + $('#imagelightbox').attr('src') + '"] img').attr('alt');
        if (description.length > 0)
          $('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
      },
      captionOff = function () {
        $('#imagelightbox-caption').remove();
      },
  
  
      // NAVIGATION
  
      navigationOn = function (instance, selector) {
        var images = $(selector);
        if (images.length) {
          var nav = $('<div id="imagelightbox-nav"></div>');
          for (var i = 0; i < images.length; i++)
            nav.append('<button type="button"></button>');
  
          nav.appendTo('body');
          nav.on('click touchend', function () { return false; });
  
          var navItems = nav.find('button');
          navItems.on('click touchend', function () {
            var $this = $(this);
            if (images.eq($this.index()).attr('href') != $('#imagelightbox').attr('src'))
              instance.switchImageLightbox($this.index());
  
            navItems.removeClass('active');
            navItems.eq($this.index()).addClass('active');
  
            return false;
          })
            .on('touchend', function () { return false; });
        }
      },
      navigationUpdate = function (selector) {
        var items = $('#imagelightbox-nav button');
        items.removeClass('active');
        items.eq($(selector).filter('[href="' + $('#imagelightbox').attr('src') + '"]').index(selector)).addClass('active');
      },
      navigationOff = function () {
        $('#imagelightbox-nav').remove();
      },
  
  
      // ARROWS
  
      arrowsOn = function (instance, selector) {
        var $arrows = $('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>');
  
        $arrows.appendTo('body');
  
        $arrows.on('click touchend', function (e) {
          e.preventDefault();
  
          var $this = $(this),
            $target = $(selector + '[href="' + $('#imagelightbox').attr('src') + '"]'),
            index = $target.index(selector);
  
          if ($this.hasClass('imagelightbox-arrow-left')) {
            index = index - 1;
            if (!$(selector).eq(index).length)
              index = $(selector).length;
          }
          else {
            index = index + 1;
            if (!$(selector).eq(index).length)
              index = 0;
          }
  
          instance.switchImageLightbox(index);
          return false;
        });
      },
      arrowsOff = function () {
        $('.imagelightbox-arrow').remove();
      };
  
  
    //	WITH ACTIVITY INDICATION
  
    $('a[data-imagelightbox="a"]').imageLightbox(
      {
        onLoadStart: function () { activityIndicatorOn(); },
        onLoadEnd: function () { activityIndicatorOff(); },
        onEnd: function () { activityIndicatorOff(); }
      });
  
  
    //	WITH OVERLAY & ACTIVITY INDICATION
  
    $('a[data-imagelightbox="b"]').imageLightbox(
      {
        onStart: function () { overlayOn(); },
        onEnd: function () { overlayOff(); activityIndicatorOff(); },
        onLoadStart: function () { activityIndicatorOn(); },
        onLoadEnd: function () { activityIndicatorOff(); }
      });
  
  
    //	WITH "CLOSE" BUTTON & ACTIVITY INDICATION
  
    var instanceC = $('a[data-imagelightbox="c"]').imageLightbox(
      {
        quitOnDocClick: false,
        onStart: function () { closeButtonOn(instanceC); },
        onEnd: function () { closeButtonOff(); activityIndicatorOff(); },
        onLoadStart: function () { activityIndicatorOn(); },
        onLoadEnd: function () { activityIndicatorOff(); }
      });
  
  
    //	WITH CAPTION & ACTIVITY INDICATION
  
    $('a[data-imagelightbox="d"]').imageLightbox(
      {
        onLoadStart: function () { captionOff(); activityIndicatorOn(); },
        onLoadEnd: function () { captionOn(); activityIndicatorOff(); },
        onEnd: function () { captionOff(); activityIndicatorOff(); }
      });
  
  
    //	WITH ARROWS & ACTIVITY INDICATION
  
    var selectorG = 'a[data-imagelightbox="g"]';
    var instanceG = $(selectorG).imageLightbox(
      {
        onStart: function () { arrowsOn(instanceG, selectorG); },
        onEnd: function () { arrowsOff(); activityIndicatorOff(); },
        onLoadStart: function () { activityIndicatorOn(); },
        onLoadEnd: function () { $('.imagelightbox-arrow').css('display', 'block'); activityIndicatorOff(); }
      });
  
  
    //	WITH NAVIGATION & ACTIVITY INDICATION
  
    var selectorE = 'a[data-imagelightbox="e"]';
    var instanceE = $(selectorE).imageLightbox(
      {
        onStart: function () { navigationOn(instanceE, selectorE); },
        onEnd: function () { navigationOff(); activityIndicatorOff(); },
        onLoadStart: function () { activityIndicatorOn(); },
        onLoadEnd: function () { navigationUpdate(selectorE); activityIndicatorOff(); }
      });
  
  
    //	ALL COMBINED
  
    var selectorF = 'a[data-imagelightbox="f"]';
    var instanceF = $(selectorF).imageLightbox(
      {
        onStart: function () { overlayOn(); closeButtonOn(instanceF); arrowsOn(instanceF, selectorF); },
        onEnd: function () { overlayOff(); captionOff(); closeButtonOff(); arrowsOff(); activityIndicatorOff(); },
        onLoadStart: function () { captionOff(); activityIndicatorOn(); },
        onLoadEnd: function () { captionOn(); activityIndicatorOff(); $('.imagelightbox-arrow').css('display', 'block'); }
      });
  
    $('a.lightboxlink').imageLightbox(
      {
        selector: 'class="lightbox"',   // string;
        allowedTypes: 'png|jpg|jpeg|gif',     // string;
        animationSpeed: 250,                    // integer;
        preloadNext: true,                   // bool;            silently preload the next image
        enableKeyboard: true,                   // bool;            enable keyboard shortcuts (arrows Left/Right and Esc)
        quitOnEnd: false,                  // bool;            quit after viewing the last image
        quitOnImgClick: false,                  // bool;            quit when the viewed image is clicked
        quitOnDocClick: true,                   // bool;            quit when anything but the viewed image is clicked
        onStart: false,                  // function/bool;   calls function when the lightbox starts
        onEnd: false,                  // function/bool;   calls function when the lightbox quits
        onLoadStart: false,                  // function/bool;   calls function when the image load begins
        onLoadEnd: false                   // function/bool;   calls function when the image finishes loading
      });
  
    $('.materialboxed').materialbox();
    $('#bc_send_form').click(function () {
      var formdata = {
        empf: $('#bc_form').attr('data-empf'),
        page: window.location.href,
        data: []
      };
      $('.bc_form_field').each(function () {
        var titel = $(this).attr('data-formfield-titel'),
          option = $(this).attr('data-option'),
          type = $(this).attr('type'),
          data = $(this).val();
        checked = $(this).prop('checked');
        switch (type) {
          case 'text':
            formdata.data.push({
              titel: titel,
              val: data
            });
            break;
          case 'textarea':
            formdata.data.push({
              titel: titel,
              val: data
            });
            break;
          case 'radio':
            if (checked) {
              formdata.data.push({
                titel: titel,
                val: option
              });
            }
            break;
          case 'checkbox':
            if (checked) {
              formdata.data.push({
                titel: titel,
                val: option
              });
            }
            break;
        }
      });
      $.ajax({
        url: "/sendform/a/1",
        type: 'post',
        dataType: 'json',
        data: {
          json: JSON.stringify(formdata)
        }
      });
      $('#bc_form').hide();
      $('#bc_form_versandtext').show();
    });
  });
  (function ($) {
  
    $.fn.materialbox = function () {
  
      return this.each(function () {
  
        if ($(this).hasClass('initialized')) {
          return;
        }
  
        $(this).addClass('initialized');
  
        var overlayActive = false;
        var doneAnimating = true;
        var inDuration = 275;
        var outDuration = 200;
        var origin = $(this);
        var placeholder = $('<div></div>').addClass('material-placeholder');
        var originalWidth = 0;
        var originalHeight = 0;
        origin.wrap(placeholder);
  
  
        origin.on('click', function () {
          var placeholder = origin.parent('.material-placeholder');
          var windowWidth = window.innerWidth;
          var windowHeight = window.innerHeight;
          /*
          var originalWidth = origin.width();
          var originalHeight = origin.height();
          */
          var originalWidth;
          var originalHeight;
          var _orient = origin.attr('data-orig-orientation');
          switch (_orient) {
            case 'hoch':
              originalWidth = 300, originalHeight = 400;
              break;
            case 'quer':
              originalWidth = 400, originalHeight = 300;
              break;
          }
  
  
  
          // If already modal, return to original
          if (doneAnimating === false) {
            returnToOriginal();
            return false;
          }
          else if (overlayActive && doneAnimating === true) {
            returnToOriginal();
            return false;
          }
  
  
          // Set states
          doneAnimating = false;
          origin.addClass('active');
          overlayActive = true;
  
          // Set positioning for placeholder
  
          placeholder.css({
            width: placeholder[0].getBoundingClientRect().width,
            height: placeholder[0].getBoundingClientRect().height,
            position: 'relative',
            top: 0,
            left: 0
          });
  
  
  
          // Set css on origin
          origin.css({ position: 'absolute', 'z-index': 1000 })
            .data('width', originalWidth)
            .data('height', originalHeight);
  
          // Add overlay
          var overlay = $('<div id="materialbox-overlay"></div>')
            .css({
              opacity: 0
            })
            .click(function () {
              if (doneAnimating === true)
                returnToOriginal();
            });
          // Animate Overlay
          $('body').append(overlay);
          overlay.velocity({ opacity: 1 }, { duration: inDuration, queue: false, easing: 'easeOutQuad' }
          );
  
  
          // Add and animate caption if it exists
          if (origin.data('caption') !== "") {
            var $photo_caption = $('<div class="materialbox-caption"></div>');
            $photo_caption.text(origin.data('caption'));
            $('body').append($photo_caption);
            $photo_caption.css({ "display": "inline" });
            $photo_caption.velocity({ opacity: 1 }, { duration: inDuration, queue: false, easing: 'easeOutQuad' });
          }
  
  
  
          // Resize Image
          var ratio = 0;
          var widthPercent = originalWidth / windowWidth;
          var heightPercent = originalHeight / windowHeight;
          var newWidth = 0;
          var newHeight = 0;
  
          if (widthPercent > heightPercent) {
            ratio = originalHeight / originalWidth;
            newWidth = windowWidth * 0.9;
            newHeight = windowWidth * 0.9 * ratio;
          }
          else {
            ratio = originalWidth / originalHeight;
            newWidth = (windowHeight * 0.9) * ratio;
            newHeight = windowHeight * 0.9;
          }
          origin.attr('data-orig_img', origin.attr('src'));
          origin.attr('src', origin.attr('data-bigimg'));
          // Animate image + set z-index
          if (origin.hasClass('responsive-img')) {
            origin.velocity({ 'max-width': newWidth, 'width': originalWidth }, {
              duration: 0, queue: false,
              complete: function () {
                origin.css({ left: 0, top: 0 })
                  .velocity(
                    {
                      height: newHeight,
                      width: newWidth,
                      left: $(document).scrollLeft() + windowWidth / 2 - origin.parent('.material-placeholder').offset().left - newWidth / 2,
                      top: $(document).scrollTop() + windowHeight / 2 - origin.parent('.material-placeholder').offset().top - newHeight / 2
                    },
                    {
                      duration: inDuration,
                      queue: false,
                      easing: 'easeOutQuad',
                      complete: function () { doneAnimating = true; }
                    }
                  );
              } // End Complete
            }); // End Velocity
          }
          else {
            origin.css('left', 0)
              .css('top', 0)
              .velocity(
                {
                  height: newHeight,
                  width: newWidth,
                  left: $(document).scrollLeft() + windowWidth / 2 - origin.parent('.material-placeholder').offset().left - newWidth / 2,
                  top: $(document).scrollTop() + windowHeight / 2 - origin.parent('.material-placeholder').offset().top - newHeight / 2
                },
                {
                  duration: inDuration,
                  queue: false,
                  easing: 'easeOutQuad',
                  complete: function () { doneAnimating = true; }
                }
              ); // End Velocity
          }
  
        }); // End origin on click
  
  
        // Return on scroll
        $(window).scroll(function () {
          if (overlayActive) {
            returnToOriginal();
          }
        });
  
        // Return on ESC
        $(document).keyup(function (e) {
  
          if (e.keyCode === 27 && doneAnimating === true) {   // ESC key
            if (overlayActive) {
              returnToOriginal();
            }
          }
        });
  
  
        // This function returns the modaled image to the original spot
        function returnToOriginal() {
          origin.attr('src', origin.attr('data-orig_img'));
          doneAnimating = false;
  
          var placeholder = origin.parent('.material-placeholder');
          var windowWidth = window.innerWidth;
          var windowHeight = window.innerHeight;
          var originalWidth = origin.data('width');
          var originalHeight = origin.data('height');
  
          origin.velocity("stop", true);
          $('#materialbox-overlay').velocity("stop", true);
          $('.materialbox-caption').velocity("stop", true);
  
  
          $('#materialbox-overlay').velocity({ opacity: 0 }, {
            duration: outDuration, // Delay prevents animation overlapping
            queue: false, easing: 'easeOutQuad',
            complete: function () {
              // Remove Overlay
              overlayActive = false;
              $(this).remove();
            }
          });
  
          // Resize Image
          origin.velocity(
            {
              width: originalWidth,
              height: originalHeight,
              left: 0,
              top: 0
            },
            {
              duration: outDuration,
              queue: false, easing: 'easeOutQuad'
            }
          );
  
          // Remove Caption + reset css settings on image
          $('.materialbox-caption').velocity({ opacity: 0 }, {
            duration: outDuration, // Delay prevents animation overlapping
            queue: false, easing: 'easeOutQuad',
            complete: function () {
              placeholder.css({
                height: '',
                width: '',
                position: '',
                top: '',
                left: ''
              });
  
              origin.css({
                height: '',
                top: '',
                left: '',
                width: '',
                'max-width': '',
                position: '',
                'z-index': ''
              });
  
              // Remove class
              origin.removeClass('active');
              doneAnimating = true;
              $(this).remove();
            }
          });
  
        }
      });
    };
  
    $(document).ready(function () {
      $('.materialboxed').materialbox();
    });
  
  }(jQuery));
  
  /*
   By Osvaldas Valutis, www.osvaldas.info
   Available for use under the MIT License
   */
  
  ; (function (e, t, n, r) { "use strict"; var i = function () { var e = n.body || n.documentElement, e = e.style; if (e.WebkitTransition == "") return "-webkit-"; if (e.MozTransition == "") return "-moz-"; if (e.OTransition == "") return "-o-"; if (e.transition == "") return ""; return false }, s = i() === false ? false : true, o = function (e, t, n) { var r = {}, s = i(); r[s + "transform"] = "translateX(" + t + ")"; r[s + "transition"] = s + "transform " + n + "s linear"; e.css(r) }, u = "ontouchstart" in t, a = t.navigator.pointerEnabled || t.navigator.msPointerEnabled, f = function (e) { if (u) return true; if (!a || typeof e === "undefined" || typeof e.pointerType === "undefined") return false; if (typeof e.MSPOINTER_TYPE_MOUSE !== "undefined") { if (e.MSPOINTER_TYPE_MOUSE != e.pointerType) return true } else if (e.pointerType != "mouse") return true; return false }; e.fn.imageLightbox = function (r) { var r = e.extend({ selector: 'id="imagelightbox"', allowedTypes: "png|jpg|jpeg|gif", animationSpeed: 250, preloadNext: true, enableKeyboard: true, quitOnEnd: false, quitOnImgClick: false, quitOnDocClick: true, onStart: false, onEnd: false, onLoadStart: false, onLoadEnd: false }, r), i = e([]), l = e(), c = e(), h = 0, p = 0, d = 0, v = false, m = function (t) { return e(t).prop("tagName").toLowerCase() == "a" && (new RegExp(".(" + r.allowedTypes + ")$", "i")).test(e(t).attr("href")) }, g = function () { if (!c.length) return true; var n = e(t).width() * .8, r = e(t).height() * .9, i = new Image; i.src = c.attr("src"); i.onload = function () { h = i.width; p = i.height; if (h > n || p > r) { var s = h / p > n / r ? h / n : p / r; h /= s; p /= s } c.css({ width: h + "px", height: p + "px", top: (e(t).height() - p) / 2 + "px", left: (e(t).width() - h) / 2 + "px" }) } }, y = function (t) { if (v) return false; t = typeof t === "undefined" ? false : t == "left" ? 1 : -1; if (c.length) { if (t !== false && (i.length < 2 || r.quitOnEnd === true && (t === -1 && i.index(l) == 0 || t === 1 && i.index(l) == i.length - 1))) { w(); return false } var n = { opacity: 0 }; if (s) o(c, 100 * t - d + "px", r.animationSpeed / 1e3); else n.left = parseInt(c.css("left")) + 100 * t + "px"; c.animate(n, r.animationSpeed, function () { b() }); d = 0 } v = true; if (r.onLoadStart !== false) r.onLoadStart(); setTimeout(function () { c = e("<img " + r.selector + " />").attr("src", l.attr("href")).load(function () { c.appendTo("body"); g(); var n = { opacity: 1 }; c.css("opacity", 0); if (s) { o(c, -100 * t + "px", 0); setTimeout(function () { o(c, 0 + "px", r.animationSpeed / 1e3) }, 50) } else { var u = parseInt(c.css("left")); n.left = u + "px"; c.css("left", u - 100 * t + "px") } c.animate(n, r.animationSpeed, function () { v = false; if (r.onLoadEnd !== false) r.onLoadEnd() }); if (r.preloadNext) { var a = i.eq(i.index(l) + 1); if (!a.length) a = i.eq(0); e("<img />").attr("src", a.attr("href")).load() } }).error(function () { if (r.onLoadEnd !== false) r.onLoadEnd() }); var n = 0, u = 0, p = 0; c.on(a ? "pointerup MSPointerUp" : "click", function (e) { e.preventDefault(); if (r.quitOnImgClick) { w(); return false } if (f(e.originalEvent)) return true; var t = (e.pageX || e.originalEvent.pageX) - e.target.offsetLeft; l = i.eq(i.index(l) - (h / 2 > t ? 1 : -1)); if (!l.length) l = i.eq(h / 2 > t ? i.length : 0); y(h / 2 > t ? "left" : "right") }).on("touchstart pointerdown MSPointerDown", function (e) { if (!f(e.originalEvent) || r.quitOnImgClick) return true; if (s) p = parseInt(c.css("left")); n = e.originalEvent.pageX || e.originalEvent.touches[0].pageX }).on("touchmove pointermove MSPointerMove", function (e) { if (!f(e.originalEvent) || r.quitOnImgClick) return true; e.preventDefault(); u = e.originalEvent.pageX || e.originalEvent.touches[0].pageX; d = n - u; if (s) o(c, -d + "px", 0); else c.css("left", p - d + "px") }).on("touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel", function (e) { if (!f(e.originalEvent) || r.quitOnImgClick) return true; if (Math.abs(d) > 50) { l = i.eq(i.index(l) - (d < 0 ? 1 : -1)); if (!l.length) l = i.eq(d < 0 ? i.length : 0); y(d > 0 ? "right" : "left") } else { if (s) o(c, 0 + "px", r.animationSpeed / 1e3); else c.animate({ left: p + "px" }, r.animationSpeed / 2) } }) }, r.animationSpeed + 100) }, b = function () { if (!c.length) return false; c.remove(); c = e() }, w = function () { if (!c.length) return false; c.animate({ opacity: 0 }, r.animationSpeed, function () { b(); v = false; if (r.onEnd !== false) r.onEnd() }) }; e(t).on("resize", g); if (r.quitOnDocClick) { e(n).on(u ? "touchend" : "click", function (t) { if (c.length && !e(t.target).is(c)) w() }) } if (r.enableKeyboard) { e(n).on("keyup", function (e) { if (!c.length) return true; e.preventDefault(); if (e.keyCode == 27) w(); if (e.keyCode == 37 || e.keyCode == 39) { l = i.eq(i.index(l) - (e.keyCode == 37 ? 1 : -1)); if (!l.length) l = i.eq(e.keyCode == 37 ? i.length : 0); y(e.keyCode == 37 ? "left" : "right") } }) } e(n).on("click", this.selector, function (t) { if (!m(this)) return true; t.preventDefault(); if (v) return false; v = false; if (r.onStart !== false) r.onStart(); l = e(this); y() }); this.each(function () { if (!m(this)) return true; i = i.add(e(this)) }); this.switchImageLightbox = function (e) { var t = i.eq(e); if (t.length) { var n = i.index(l); l = t; y(e < n ? "left" : "right") } return this }; this.quitImageLightbox = function () { w(); return this }; return this } })(jQuery, window, document);
  
  