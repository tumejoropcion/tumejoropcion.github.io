jQuery.fn.setAllToMaxHeight = function(){
   return this.height( Math.max.apply(this, jQuery.map( this , function(e){ return jQuery(e).height() }) ) );
}

const selectors = {
  disclosureLocale: '[data-disclosure-locale]',
  disclosureCurrency: '[data-disclosure-currency]'
};

const unitPriceSeparator = '/';

Sunrise.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

Sunrise.Sections.prototype = _.assignIn({}, Sunrise.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = _.filter(this.instances, function(instance) {
      var isEventInstance = (instance.id === evt.detail.sectionId);

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function(evt) {
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

Sunrise.customerTemplates = (function() {
   function initEventListeners() {
      // Show reset password form
      $('#recover-password').on('click', function(evt) {
         evt.preventDefault();
         toggleRecoverPasswordForm();
      });

      // Hide reset password form
      $('#hide-password-form').on('click', function(evt) {
         evt.preventDefault();
         toggleRecoverPasswordForm();
      });
   }

   //Show/Hide recover password form 
   function toggleRecoverPasswordForm() {
      $('#recover-password-form').toggleClass('hide');
      $('#customer-login-form').toggleClass('hide');
   }

   //Show reset password success message
   function resetPasswordSuccess() {
      var $formState = $('.reset-password-success');
      // check if reset password form was successfully submited.
      if (!$formState.length) {
         return;
      }
      // show success message
      $('#reset-success').removeClass('hide');
   }

   // Show/hide customer address forms
   function customerAddressForm() {
      var $newAddressForm = $('#AddressNewForm');

      if (!$newAddressForm.length) {
         return;
      }

      // Initialize observers on address selectors, defined in shopify_common.js
      if (Shopify) {
         new Shopify.CountryProvinceSelector('address_country_new', 'address_province_new', { 
            hideElement: 'address_province_container_new'
         });
      }

      // Initialize each edit form's country/province selector
      $('.address-country-option').each(function() {
         var formId = $(this).data('form-id');
         var countrySelector = 'address_country_' + formId;
         var provinceSelector = 'address_province_' + formId;
         var containerSelector = 'address_province_container_' + formId;

         new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
            hideElement: containerSelector
         });
      });

      // Toggle new/edit address forms
      $('.address-new-toggle').on('click', function(e) {
         e.preventDefault();
         $newAddressForm.toggleClass('hide');
      });

      $('.address-edit-toggle').on('click', function(e) {
         e.preventDefault();
         var formId = $(this).data('form-id');
         $('#edit_address_' + formId).toggleClass('hide');
      });

      $('.address-delete').on('click', function(e) {
         e.preventDefault();
         var $el = $(this);
         var formId = $el.data('form-id');
         var confirmMessage = $el.data('confirm-message');
         if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
            Shopify.postLink('/account/addresses/' + formId, {parameters: {_method: 'delete'}});
         }
      });
   }

   // Check URL for reset password hash
   function checkUrlHash() {
      var hash = window.location.hash;
      // Allow deep linking to recover password form
      if (hash === '#recover') {
         toggleRecoverPasswordForm();
      }
   }

   return {
      init: function() {
      checkUrlHash();
      initEventListeners();
      resetPasswordSuccess();
      customerAddressForm();
   }
   };
})();

//Image Helper Functions
Sunrise.Images = (function() {
   /* Preloads an image in memory and uses the browsers cache to store it until needed.
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute */
  function preload(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }
    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      this.loadImage(this.getSizedImageUrl(image, size));
    }
  }

   /* Loads and caches an image in the browsers cache.
   * @param {string} path - An image url */
  function loadImage(path) {
    new Image().src = path;
  }

   /* Swaps the src of an image for another OR returns the imageURL to the callback function
   * @param image
   * @param element
   * @param callback */
  function switchImage(image, element, callback) {
    var size = this.imageSize(element.src);
    var imageUrl = this.getSizedImageUrl(image.src, size);

    if (callback) {
      callback(imageUrl, image, element); 
    } else {
      element.src = imageUrl;
    }
  }

   /* Find the Shopify image attribute size
   * @param {string} src
   * @returns {null} */
  function imageSize(src) {
    var match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);

    if (match !== null) {
      return match[1];
    } else {
      return null;
    }
  }

   /* Adds a Shopify size attribute to a URL
   * @param src
   * @param size
   * @returns {*} */
  function getSizedImageUrl(src, size) {
    if (size == null) {
      return src;
    }

    if (size === 'master') {
      return this.removeProtocol(src);
    }

    var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

    if (match != null) {
      var prefix = src.split(match[0]);
      var suffix = match[0];

      return this.removeProtocol(prefix[0] + '_' + size + suffix);
    }

    return null;
  }

  function removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
  }

  return {
    preload: preload,
    loadImage: loadImage,
    switchImage: switchImage,
    imageSize: imageSize,
    getSizedImageUrl: getSizedImageUrl,
    removeProtocol: removeProtocol
  };
})();


Sunrise.rte = {
  /**
   * Wrap tables in a container div to make them scrollable when needed
   *
   * @param {object} options - Options to be used
   * @param {jquery} options.$tables - jquery object(s) of the table(s) to wrap
   * @param {string} options.tableWrapperClass - table wrapper class name
   */
  wrapTable: function(options) {
    options.$tables.wrap(
      '<div class="' + options.tableWrapperClass + '"></div>'
    );
  },

  /**
   * Wrap iframes in a container div to make them responsive
   *
   * @param {object} options - Options to be used
   * @param {jquery} options.$iframes - jquery object(s) of the iframe(s) to wrap
   * @param {string} options.iframeWrapperClass - class name used on the wrapping div
   */
  wrapIframe: function(options) {
    options.$iframes.each(function() {
      // Add wrapper to make video responsive
      $(this).wrap('<div class="' + options.iframeWrapperClass + '"></div>');

      // Re-set the src attribute on each iframe after page load
      // for Chrome's "incorrect iFrame content on 'back'" bug.
      // https://code.google.com/p/chromium/issues/detail?id=395791
      // Need to specifically target video and admin bar
      this.src = this.src;
    });
  }
};


Sunrise.Helpers = (function() {
  var touchDevice = false;

  function setTouch() {
    touchDevice = true;
  }

  function isTouch() {
    return touchDevice;
  }
  return {
    setTouch: setTouch,
    isTouch: isTouch
  };
})();

Sunrise.LibraryLoader = (function() {
  var types = {
    link: 'link',
    script: 'script'
  };

  var status = {
    requested: 'requested',
    loaded: 'loaded'
  };

  var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';

  var libraries = {
    youtubeSdk: {
      tagId: 'youtube-sdk',
      src: 'https://www.youtube.com/iframe_api',
      type: types.script
    },
    plyrShopifyStyles: {
      tagId: 'plyr-shopify-styles',
      src: cloudCdn + 'shopify-plyr/v1.0/shopify-plyr.css',
      type: types.link
    },
    modelViewerUiStyles: {
      tagId: 'shopify-model-viewer-ui-styles',
      src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
      type: types.link
    }
  };

  function load(libraryName, callback) {
    var library = libraries[libraryName];

    if (!library) return;
    if (library.status === status.requested) return;

    callback = callback || function() {};
    if (library.status === status.loaded) {
      callback();
      return;
    }

    library.status = status.requested;

    var tag;

    switch (library.type) {
      case types.script:
        tag = createScriptTag(library, callback);
        break;
      case types.link:
        tag = createLinkTag(library, callback);
        break;
    }

    tag.id = library.tagId;
    library.element = tag;

    var firstScriptTag = document.getElementsByTagName(library.type)[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  function createScriptTag(library, callback) {
    var tag = document.createElement('script');
    tag.src = library.src;
    tag.addEventListener('load', function() {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  function createLinkTag(library, callback) {
    var tag = document.createElement('link');
    tag.href = library.src;
    tag.rel = 'stylesheet';
    tag.type = 'text/css';
    tag.addEventListener('load', function() {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  return {
    load: load
  };
})();


// Youtube API callback
function onYouTubeIframeAPIReady() {
  Sunrise.Video.loadVideos();
}


Sunrise.Video = (function() {
  var autoplayCheckComplete = false;
  var playOnClickChecked = false;
  var playOnClick = false;
  var youtubeLoaded = false;
  var videos = {};
  var videoPlayers = [];
  var videoOptions = {
    ratio: 16 / 9,
    scrollAnimationDuration: 400,
    playerVars: {
      iv_load_policy: 3,
      modestbranding: 1,
      autoplay: 0,
      controls: 0,
      wmode: 'opaque',
      branding: 0,
      autohide: 0,
      rel: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerChange
    }
  };
  var classes = {
    playing: 'video-is-playing',
    paused: 'video-is-paused',
    loading: 'video-is-loading',
    loaded: 'video-is-loaded',
    backgroundVideoWrapper: 'video-background-wrapper',
    videoWithImage: 'video--image_with_play',
    backgroundVideo: 'video--background',
    userPaused: 'is-paused',
    supportsAutoplay: 'autoplay',
    supportsNoAutoplay: 'no-autoplay',
    wrapperMinHeight: 'video-section-wrapper--min-height'
  };

  var selectors = {
    section: '.video-section',
    videoWrapper: '.video-section-wrapper',
    playVideoBtn: '.video-control__play',
    closeVideoBtn: '.video-control__close-wrapper',
    pauseVideoBtn: '.video__pause',
    pauseVideoStop: '.video__pause-stop',
    pauseVideoResume: '.video__pause-resume',
    fallbackText: '.icon__fallback-text'
  };

  /**
   * Public functions
   */
  function init($video) {
    if (!$video.length) {
      return;
    }

    videos[$video.attr('id')] = {
      id: $video.attr('id'),
      videoId: $video.data('id'),
      type: $video.data('type'),
      status:
        $video.data('type') === 'image_with_play' ? 'closed' : 'background', // closed, open, background
      $video: $video,
      $videoWrapper: $video.closest(selectors.videoWrapper),
      $section: $video.closest(selectors.section),
      controls: $video.data('type') === 'background' ? 0 : 1
    };

    if (!youtubeLoaded) {
      // This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    playOnClickCheck();
  }

  function customPlayVideo(playerId) {
    // Make sure we have carried out the playOnClick check first
    if (!playOnClickChecked && !playOnClick) {
      return;
    }

    if (playerId && typeof videoPlayers[playerId].playVideo === 'function') {
      privatePlayVideo(playerId);
    }
  }

  function pauseVideo(playerId) {
    if (
      videoPlayers[playerId] &&
      typeof videoPlayers[playerId].pauseVideo === 'function'
    ) {
      videoPlayers[playerId].pauseVideo();
    }
  }

  function loadVideos() {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        createPlayer(key);
      }
    }

    initEvents();
    youtubeLoaded = true;
  }

  function editorLoadVideo(key) {
    if (!youtubeLoaded) {
      return;
    }
    createPlayer(key);

    initEvents();
  }

  /**
   * Private functions
   */

  function privatePlayVideo(id, clicked) {
    var videoData = videos[id];
    var player = videoPlayers[id];
    var $videoWrapper = videoData.$videoWrapper;

    if (playOnClick) {
      // playOnClick means we are probably on mobile (no autoplay).
      // setAsPlaying will show the iframe, requiring another click
      // to play the video.
      setAsPlaying(videoData);
    } else if (clicked || autoplayCheckComplete) {
      // Play if autoplay is available or clicked to play
      $videoWrapper.removeClass(classes.loading);
      setAsPlaying(videoData);
      player.playVideo();
      return;
    } else {
      player.playVideo();
    }
  }

  function setAutoplaySupport(supported) {
    var supportClass = supported
      ? classes.supportsAutoplay
      : classes.supportsNoAutoplay;
    $(document.documentElement)
      .removeClass(classes.supportsAutoplay)
      .removeClass(classes.supportsNoAutoplay)
      .addClass(supportClass);

    if (!supported) {
      playOnClick = true;
    }

    autoplayCheckComplete = true;
  }

  function playOnClickCheck() {
    // Bail early for a few instances:
    // - small screen
    // - device sniff mobile browser

    if (playOnClickChecked) {
      return;
    }

    if (isMobile()) {
      playOnClick = true;
    }

    if (playOnClick) {
      // No need to also do the autoplay check
      setAutoplaySupport(false);
    }

    playOnClickChecked = true;
  }

  // The API will call this function when each video player is ready
  function onPlayerReady(evt) {
    evt.target.setPlaybackQuality('hd1080');
    var videoData = getVideoOptions(evt);
    var videoTitle = evt.target.getVideoData().title;
    playOnClickCheck();

    // Prevent tabbing through YouTube player controls until visible
    $('#' + videoData.id).attr('tabindex', '-1');

    sizeBackgroundVideos();
    setButtonLabels(videoData.$videoWrapper, videoTitle);

    // Customize based on options from the video ID
    if (videoData.type === 'background') {
      evt.target.mute();
      privatePlayVideo(videoData.id);
    }

    videoData.$videoWrapper.addClass(classes.loaded);
  }

  function onPlayerChange(evt) {
    var videoData = getVideoOptions(evt);
    if (
      videoData.status === 'background' &&
      !isMobile() &&
      !autoplayCheckComplete &&
      (evt.data === YT.PlayerState.PLAYING ||
        evt.data === YT.PlayerState.BUFFERING)
    ) {
      setAutoplaySupport(true);
      autoplayCheckComplete = true;
      videoData.$videoWrapper.removeClass(classes.loading);
    }
    switch (evt.data) {
      case YT.PlayerState.ENDED:
        setAsFinished(videoData);
        break;
      case YT.PlayerState.PAUSED:
        // Seeking on a YouTube video also fires a PAUSED state change,
        // checking the state after a delay prevents us pausing the video when
        // the user is seeking instead of pausing
        setTimeout(function() {
          if (evt.target.getPlayerState() === YT.PlayerState.PAUSED) {
            setAsPaused(videoData);
          }
        }, 200);
        break;
    }
  }

  function setAsFinished(videoData) {
    switch (videoData.type) {
      case 'background':
        videoPlayers[videoData.id].seekTo(0);
        break;
      case 'image_with_play':
        closeVideo(videoData.id);
        toggleExpandVideo(videoData.id, false);
        break;
    }
  }

  function setAsPlaying(videoData) {
    var $videoWrapper = videoData.$videoWrapper;
    var $pauseButton = $videoWrapper.find(selectors.pauseVideoBtn);

    $videoWrapper.removeClass(classes.loading);

    if ($pauseButton.hasClass(classes.userPaused)) {
      $pauseButton.removeClass(classes.userPaused);
    }

    // Do not change element visibility if it is a background video
    if (videoData.status === 'background') {
      return;
    }

    $('#' + videoData.id).attr('tabindex', '0');

    if (videoData.type === 'image_with_play') {
      $videoWrapper.removeClass(classes.paused).addClass(classes.playing);
    }

    // Update focus to the close button so we stay within the video wrapper,
    // allowing time for the scroll animation
    setTimeout(function() {
      $videoWrapper.find(selectors.closeVideoBtn).focus();
    }, videoOptions.scrollAnimationDuration);
  }

  function setAsPaused(videoData) {
    var $videoWrapper = videoData.$videoWrapper;

    // YT's events fire after our click event. This status flag ensures
    // we don't interact with a closed or background video.
    if (videoData.type === 'image_with_play') {
      if (videoData.status === 'closed') {
        $videoWrapper.removeClass(classes.paused);
      } else {
        $videoWrapper.addClass(classes.paused);
      }
    }

    $videoWrapper.removeClass(classes.playing);
  }

  function closeVideo(playerId) {
    var videoData = videos[playerId];
    var $videoWrapper = videoData.$videoWrapper;
    var classesToRemove = [classes.paused, classes.playing].join(' ');

    if (isMobile()) {
      $videoWrapper.removeAttr('style');
    }

    $('#' + videoData.id).attr('tabindex', '-1');

    videoData.status = 'closed';

    switch (videoData.type) {
      case 'image_with_play':
        videoPlayers[playerId].stopVideo();
        setAsPaused(videoData); // in case the video is already paused
        break;
      case 'background':
        videoPlayers[playerId].mute();
        setBackgroundVideo(playerId);
        break;
    }

    $videoWrapper.removeClass(classesToRemove);
  }

  function getVideoOptions(evt) {
    return videos[evt.target.getIframe()];
  }

  function toggleExpandVideo(playerId, expand) {
    var video = videos[playerId];
    var elementTop = video.$videoWrapper.offset().top;
    var $playButton = video.$videoWrapper.find(selectors.playVideoBtn);
    var offset = 0;
    var newHeight = 0;

    if (isMobile()) {
      video.$videoWrapper.parent().toggleClass('page-width', !expand);
    }

    if (expand) {
      if (isMobile()) {
        newHeight = $(window).width() / videoOptions.ratio;
      } else {
        newHeight = video.$videoWrapper.width() / videoOptions.ratio;
      }
      offset = ($(window).height() - newHeight) / 2;

      video.$videoWrapper
        .removeClass(classes.wrapperMinHeight)
        .animate({ height: newHeight }, 600);

      // Animate doesn't work in mobile editor, so we don't use it
      if (!(isMobile() && Shopify.designMode)) {
        $('html, body').animate(
          {
            scrollTop: elementTop - offset
          },
          videoOptions.scrollAnimationDuration
        );
      }
    } else {
      if (isMobile()) {
        newHeight = video.$videoWrapper.data('mobile-height');
      } else {
        newHeight = video.$videoWrapper.data('desktop-height');
      }

      video.$videoWrapper
        .height(video.$videoWrapper.width() / videoOptions.ratio)
        .animate({ height: newHeight }, 600);
      setTimeout(function() {
        video.$videoWrapper.addClass(classes.wrapperMinHeight);
      }, 600);
      $playButton.focus();
    }
  }

  function togglePause(playerId) {
    var $pauseButton = videos[playerId].$videoWrapper.find(
      selectors.pauseVideoBtn
    );
    var paused = $pauseButton.hasClass(classes.userPaused);
    if (paused) {
      $pauseButton.removeClass(classes.userPaused);
      customPlayVideo(playerId);
    } else {
      $pauseButton.addClass(classes.userPaused);
      pauseVideo(playerId);
    }
    $pauseButton.attr('aria-pressed', !paused);
  }

  function startVideoOnClick(playerId) {
    var video = videos[playerId];

    // add loading class to wrapper
    video.$videoWrapper.addClass(classes.loading);

    // Explicity set the video wrapper height (needed for height transition)
    video.$videoWrapper.attr(
      'style',
      'height: ' + video.$videoWrapper.height() + 'px'
    );

    video.status = 'open';

    switch (video.type) {
      case 'image_with_play':
        privatePlayVideo(playerId, true);
        break;
      case 'background':
        unsetBackgroundVideo(playerId, video);
        videoPlayers[playerId].unMute();
        privatePlayVideo(playerId, true);
        break;
    }

    toggleExpandVideo(playerId, true);

    // esc to close video player
    $(document).on('keydown.videoPlayer', function(evt) {
      var playerId = $(document.activeElement).data('controls');
      if (evt.keyCode !== slate.utils.keyboardKeys.ESCAPE || !playerId) {
        return;
      }

      closeVideo(playerId);
      toggleExpandVideo(playerId, false);
    });
  }

  function sizeBackgroundVideos() {
    $('.' + classes.backgroundVideo).each(function(index, el) {
      sizeBackgroundVideo($(el));
    });
  }

  function sizeBackgroundVideo($videoPlayer) {
    if (!youtubeLoaded) {
      return;
    }

    if (isMobile()) {
      $videoPlayer.removeAttr('style');
    } else {
      var $videoWrapper = $videoPlayer.closest(selectors.videoWrapper);
      var videoWidth = $videoWrapper.width();
      var playerWidth = $videoPlayer.width();
      var desktopHeight = $videoWrapper.data('desktop-height');

      // when screen aspect ratio differs from video, video must center and underlay one dimension
      if (videoWidth / videoOptions.ratio < desktopHeight) {
        playerWidth = Math.ceil(desktopHeight * videoOptions.ratio); // get new player width
        $videoPlayer
          .width(playerWidth)
          .height(desktopHeight)
          .css({
            left: (videoWidth - playerWidth) / 2,
            top: 0
          }); // player width is greater, offset left; reset top
      } else {
        // new video width < window width (gap to right)
        desktopHeight = Math.ceil(videoWidth / videoOptions.ratio); // get new player height
        $videoPlayer
          .width(videoWidth)
          .height(desktopHeight)
          .css({
            left: 0,
            top: (desktopHeight - desktopHeight) / 2
          }); // player height is greater, offset top; reset left
      }

      $videoPlayer.prepareTransition();
      $videoWrapper.addClass(classes.loaded);
    }
  }

  function unsetBackgroundVideo(playerId) {
    // Switch the background video to a chrome-only player once played
    $('#' + playerId)
      .removeClass(classes.backgroundVideo)
      .addClass(classes.videoWithImage);

    setTimeout(function() {
      $('#' + playerId).removeAttr('style');
    }, 600);

    videos[playerId].$videoWrapper
      .removeClass(classes.backgroundVideoWrapper)
      .addClass(classes.playing);

    videos[playerId].status = 'open';
  }

  function setBackgroundVideo(playerId) {
    $('#' + playerId)
      .removeClass(classes.videoWithImage)
      .addClass(classes.backgroundVideo);

    videos[playerId].$videoWrapper.addClass(classes.backgroundVideoWrapper);

    videos[playerId].status = 'background';
    sizeBackgroundVideo($('#' + playerId));
  }

  function isMobile() {
    return $(window).width() < 750 || window.mobileCheck();
  }

  function initEvents() {
    $(document).on('click.videoPlayer', selectors.playVideoBtn, function(evt) {
      var playerId = $(evt.currentTarget).data('controls');

      startVideoOnClick(playerId);
    });

    $(document).on('click.videoPlayer', selectors.closeVideoBtn, function(evt) {
      var playerId = $(evt.currentTarget).data('controls');

      $(evt.currentTarget).blur();
      closeVideo(playerId);
      toggleExpandVideo(playerId, false);
    });

    $(document).on('click.videoPlayer', selectors.pauseVideoBtn, function(evt) {
      var playerId = $(evt.currentTarget).data('controls');
      togglePause(playerId);
    });

    // Listen to resize to keep a background-size:cover-like layout
    $(window).on(
      'resize.videoPlayer',
      $.debounce(200, function() {
        if (!youtubeLoaded) return;
        var key;
        var fullscreen = window.innerHeight === screen.height;

        sizeBackgroundVideos();

        if (isMobile()) {
          for (key in videos) {
            if (videos.hasOwnProperty(key)) {
              if (videos[key].$videoWrapper.hasClass(classes.playing)) {
                if (!fullscreen) {
                  pauseVideo(key);
                  setAsPaused(videos[key]);
                }
              }
              videos[key].$videoWrapper.height(
                $(document).width() / videoOptions.ratio
              );
            }
          }
          setAutoplaySupport(false);
        } else {
          setAutoplaySupport(true);
          for (key in videos) {
            if (
              videos[key].$videoWrapper.find('.' + classes.videoWithImage)
                .length
            ) {
              continue;
            }
            videoPlayers[key].playVideo();
            setAsPlaying(videos[key]);
          }
        }
      })
    );

    $(window).on(
      'scroll.videoPlayer',
      $.debounce(50, function() {
        if (!youtubeLoaded) return;

        for (var key in videos) {
          if (videos.hasOwnProperty(key)) {
            var $videoWrapper = videos[key].$videoWrapper;

            // Close the video if more than 75% of it is scrolled out of view
            if (
              $videoWrapper.hasClass(classes.playing) &&
              ($videoWrapper.offset().top + $videoWrapper.height() * 0.75 <
                $(window).scrollTop() ||
                $videoWrapper.offset().top + $videoWrapper.height() * 0.25 >
                  $(window).scrollTop() + $(window).height())
            ) {
              closeVideo(key);
              toggleExpandVideo(key, false);
            }
          }
        }
      })
    );
  }

  function createPlayer(key) {
    var args = $.extend({}, videoOptions, videos[key]);
    args.playerVars.controls = args.controls;
    videoPlayers[key] = new YT.Player(key, args);
  }

  function removeEvents() {
    $(document).off('.videoPlayer');
    $(window).off('.videoPlayer');
  }

  function setButtonLabels($videoWrapper, title) {
    var $playButtons = $videoWrapper.find(selectors.playVideoBtn);
    var $closeButton = $videoWrapper.find(selectors.closeVideoBtn);
    var $pauseButton = $videoWrapper.find(selectors.pauseVideoBtn);
    var $closeButtonText = $closeButton.find(selectors.fallbackText);
    var $pauseButtonStopText = $pauseButton
      .find(selectors.pauseVideoStop)
      .find(selectors.fallbackText);
    var $pauseButtonResumeText = $pauseButton
      .find(selectors.pauseVideoResume)
      .find(selectors.fallbackText);

    // Insert the video title retrieved from YouTube into the instructional text
    // for each button
    $playButtons.each(function() {
      var $playButton = $(this);
      var $playButtonText = $playButton.find(selectors.fallbackText);

      $playButtonText.text(
        $playButtonText.text().replace('[video_title]', title)
      );
    });
    $closeButtonText.text(
      $closeButtonText.text().replace('[video_title]', title)
    );
    $pauseButtonStopText.text(
      $pauseButtonStopText.text().replace('[video_title]', title)
    );
    $pauseButtonResumeText.text(
      $pauseButtonResumeText.text().replace('[video_title]', title)
    );
  }

  return {
    init: init,
    editorLoadVideo: editorLoadVideo,
    loadVideos: loadVideos,
    playVideo: customPlayVideo,
    pauseVideo: pauseVideo,
    removeEvents: removeEvents
  };
})();

// Youtube API callback
function onYouTubeIframeAPIReady() {
  Sunrise.ProductVideo.loadVideos(Sunrise.ProductVideo.hosts.youtube);
}

Sunrise.ProductVideo = (function() {
  var videos = {};

  var hosts = {
    html5: 'html5',
    youtube: 'youtube'
  };

  var selectors = {
    productMediaWrapper: '[data-product-single-media-wrapper]'
  };

  var attributes = {
    enableVideoLooping: 'enable-video-looping',
    videoId: 'video-id'
  };

  function init(videoContainer, sectionId) {
    if (!videoContainer.length) {
      return;
    }

    var videoElement = videoContainer.find('iframe, video')[0];
    var mediaId = videoContainer.data('mediaId');

    if (!videoElement) {
      return;
    }

    videos[mediaId] = {
      mediaId: mediaId,
      sectionId: sectionId,
      host: hostFromVideoElement(videoElement),
      container: videoContainer,
      element: videoElement,
      ready: function() {
        createPlayer(this);
      }
    };

    var video = videos[mediaId];

    switch (video.host) {
      case hosts.html5:
        window.Shopify.loadFeatures([
          {
            name: 'video-ui',
            version: '1.0',
            onLoad: setupPlyrVideos
          }
        ]);
        Sunrise.LibraryLoader.load('plyrShopifyStyles');
        break;
      case hosts.youtube:
        Sunrise.LibraryLoader.load('youtubeSdk');
        break;
    }
  }

  function setupPlyrVideos(errors) {
    if (errors) {
      fallbackToNativeVideo();
      return;
    }

    loadVideos(hosts.html5);
  }

  function createPlayer(video) {
    if (video.player) {
      return;
    }

    var productMediaWrapper = video.container.closest(
      selectors.productMediaWrapper
    );
    var enableLooping = productMediaWrapper.data(attributes.enableVideoLooping);

    switch (video.host) {
      case hosts.html5:
        video.player = new Shopify.Plyr(video.element, {
          loop: { active: enableLooping }
        });
        break;
      case hosts.youtube:
        var videoId = productMediaWrapper.data(attributes.videoId);

        video.player = new YT.Player(video.element, {
          videoId: videoId,
          events: {
            onStateChange: function(event) {
              if (event.data === 0 && enableLooping) event.target.seekTo(0);
            }
          }
        });
        break;
    }

    productMediaWrapper.on('mediaHidden xrLaunch', function() {
      if (!video.player) return;

      if (video.host === hosts.html5) {
        video.player.pause();
      }

      if (video.host === hosts.youtube && video.player.pauseVideo) {
        video.player.pauseVideo();
      }
    });

    productMediaWrapper.on('mediaVisible', function() {
      if (Sunrise.Helpers.isTouch()) return;
      if (!video.player) return;

      if (video.host === hosts.html5) {
        video.player.play();
      }

      if (video.host === hosts.youtube && video.player.playVideo) {
        video.player.playVideo();
      }
    });
  }

  function hostFromVideoElement(video) {
    if (video.tagName === 'VIDEO') {
      return hosts.html5;
    }

    if (video.tagName === 'IFRAME') {
      if (
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
          video.src
        )
      ) {
        return hosts.youtube;
      }
    }
    return null;
  }

  function loadVideos(host) {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];
        if (video.host === host) {
          video.ready();
        }
      }
    }
  }

  function fallbackToNativeVideo() {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];

        if (video.nativeVideo) continue;

        if (video.host === hosts.html5) {
          video.element.setAttribute('controls', 'controls');
          video.nativeVideo = true;
        }
      }
    }
  }

  function removeSectionVideos(sectionId) {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];

        if (video.sectionId === sectionId) {
          if (video.player) video.player.destroy();
          delete videos[key];
        }
      }
    }
  }

  return {
    init: init,
    hosts: hosts,
    loadVideos: loadVideos,
    removeSectionVideos: removeSectionVideos
  };
})();


Sunrise.ProductModel = (function() {
  var modelJsonSections = {};
  var models = {};
  var xrButtons = {};

  var selectors = {
    mediaGroup: '[data-product-single-media-group]',
    xrButton: '[data-shopify-xr]'
  };

  function init(modelViewerContainers, sectionId) {
    modelJsonSections[sectionId] = {
      loaded: false
    };

    modelViewerContainers.each(function(index) {
      var $modelViewerContainer = $(this);
      var mediaId = $modelViewerContainer.data('media-id');
      var $modelViewerElement = $(
        $modelViewerContainer.find('model-viewer')[0]
      );
      var modelId = $modelViewerElement.data('model-id');

      if (index === 0) {
        var $xrButton = $modelViewerContainer
          .closest(selectors.mediaGroup)
          .find(selectors.xrButton);
        xrButtons[sectionId] = {
          $element: $xrButton,
          defaultId: modelId
        };
      }

      models[mediaId] = {
        modelId: modelId,
        sectionId: sectionId,
        $container: $modelViewerContainer,
        $element: $modelViewerElement
      };
    });

    window.Shopify.loadFeatures([
      {
        name: 'shopify-xr',
        version: '1.0',
        onLoad: setupShopifyXr
      },
      {
        name: 'model-viewer-ui',
        version: '1.0',
        onLoad: setupModelViewerUi
      }
    ]);
    Sunrise.LibraryLoader.load('modelViewerUiStyles');
  }

  function setupShopifyXr(errors) {
    if (errors) return;

    if (!window.ShopifyXR) {
      document.addEventListener('shopify_xr_initialized', function() {
        setupShopifyXr();
      });
      return;
    }

    for (var sectionId in modelJsonSections) {
      if (modelJsonSections.hasOwnProperty(sectionId)) {
        var modelSection = modelJsonSections[sectionId];

        if (modelSection.loaded) continue;
        var $modelJson = $('#ModelJson-' + sectionId);

        window.ShopifyXR.addModels(JSON.parse($modelJson.html()));
        modelSection.loaded = true;
      }
    }
    window.ShopifyXR.setupXRElements();
  }

  function setupModelViewerUi(errors) {
    if (errors) return;

    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key];
        if (!model.modelViewerUi) {
          model.modelViewerUi = new Shopify.ModelViewerUI(model.$element);
        }
        setupModelViewerListeners(model);
      }
    }
  }

  function setupModelViewerListeners(model) {
    var xrButton = xrButtons[model.sectionId];

    model.$container.on('mediaVisible', function() {
      xrButton.$element.attr('data-shopify-model3d-id', model.modelId);
      if (Sunrise.Helpers.isTouch()) return;
      model.modelViewerUi.play();
    });

    model.$container
      .on('mediaHidden', function() {
        xrButton.$element.attr('data-shopify-model3d-id', xrButton.defaultId);
        model.modelViewerUi.pause();
      })
      .on('xrLaunch', function() {
        model.modelViewerUi.pause();
      });
  }

  function removeSectionModels(sectionId) {
    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key];
        if (model.sectionId === sectionId) {
          models[key].modelViewerUi.destroy();
          delete models[key];
        }
      }
    }
    delete modelJsonSections[sectionId];
  }

  return {
    init: init,
    removeSectionModels: removeSectionModels
  };
})();


Sunrise.Disclosure = (function() {
  var selectors = {
    disclosureList: '[data-disclosure-list]',
    disclosureToggle: '[data-disclosure-toggle]',
    disclosureInput: '[data-disclosure-input]',
    disclosureOptions: '[data-disclosure-option]'
  };

  var classes = {
    listVisible: 'disclosure-list--visible'
  };

  function Disclosure($disclosure) {
    this.$container = $disclosure;
    this.cache = {};
    this._cacheSelectors();
    this._connectOptions();
    this._connectToggle();
    this._onFocusOut();
  }

  Disclosure.prototype = _.assignIn({}, Disclosure.prototype, {
    _cacheSelectors: function() {
      this.cache = {
        $disclosureList: this.$container.find(selectors.disclosureList),
        $disclosureToggle: this.$container.find(selectors.disclosureToggle),
        $disclosureInput: this.$container.find(selectors.disclosureInput),
        $disclosureOptions: this.$container.find(selectors.disclosureOptions)
      };
    },

    _connectToggle: function() {
      this.cache.$disclosureToggle.on(
        'click',
        function(evt) {
          var ariaExpanded =
            $(evt.currentTarget).attr('aria-expanded') === 'true';
          $(evt.currentTarget).attr('aria-expanded', !ariaExpanded);

          this.cache.$disclosureList.toggleClass(classes.listVisible);
        }.bind(this)
      );
    },

    _connectOptions: function() {
      this.cache.$disclosureOptions.on(
        'click',
        function(evt) {
          this._submitForm($(evt.currentTarget).data('value'));
        }.bind(this)
      );
    },

    _onFocusOut: function() {
      this.cache.$disclosureToggle.on(
        'focusout',
        function(evt) {
          var disclosureLostFocus =
            this.$container.has(evt.relatedTarget).length === 0;

          if (disclosureLostFocus) {
            this._hideList();
          }
        }.bind(this)
      );

      this.cache.$disclosureList.on(
        'focusout',
        function(evt) {
          var childInFocus =
            $(evt.currentTarget).has(evt.relatedTarget).length > 0;
          var isVisible = this.cache.$disclosureList.hasClass(
            classes.listVisible
          );

          if (isVisible && !childInFocus) {
            this._hideList();
          }
        }.bind(this)
      );

      this.$container.on(
        'keyup',
        function(evt) {
          if (evt.which !== slate.utils.keyboardKeys.ESCAPE) return;
          this._hideList();
          this.cache.$disclosureToggle.focus();
        }.bind(this)
      );

      $('body').on(
        'click',
        function(evt) {
          var isOption = this.$container.has(evt.target).length > 0;
          var isVisible = this.cache.$disclosureList.hasClass(
            classes.listVisible
          );

          if (isVisible && !isOption) {
            this._hideList();
          }
        }.bind(this)
      );
    },

    _submitForm: function(value) {
      this.cache.$disclosureInput.val(value);
      this.$container.parents('form').submit();
    },

    _hideList: function() {
      this.cache.$disclosureList.removeClass(classes.listVisible);
      this.cache.$disclosureToggle.attr('aria-expanded', false);
    },

    unload: function() {
      this.cache.$disclosureOptions.off();
      this.cache.$disclosureToggle.off();
      this.cache.$disclosureList.off();
      this.$container.off();
    }
  });

  return Disclosure;
})();



//Currency Helpers
Sunrise.Currency = (function() {
  var moneyFormat = Sunrise.strings.money_format;

  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);
    function defaultOption(opt, def) {
     return (typeof opt == 'undefined' ? def : opt);
    }
    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultOption(precision, 2);
      thousands = defaultOption(thousands, ',');
      decimal   = defaultOption(decimal, '.');

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
    }
    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  }
})();


Sunrise.Variants = (function() {
  function Variants(options) {
    this.$container = options.$container;
    this.product = options.product;
    this.enableHistoryState = options.enableHistoryState;
    this.singleOptionSelector = options.singleOptionSelector;
    this.originalSelectorId = options.originalSelectorId;
    this.currentVariant = this._getVariantFromOptions();

    $(this.singleOptionSelector,this.$container).on('change', this._onSelectChange.bind(this));
  }

  Variants.prototype = _.assignIn({}, Variants.prototype, {
    _getCurrentOptions: function() {
      var currentOptions = _.map($(this.singleOptionSelector, this.$container), function(element) {
        var $element = $(element);
        var currentOption = {};
          currentOption.value = $element.val();
          currentOption.index = $element.data('index');
          return currentOption;
      });

      return currentOptions;
    },

    _getVariantFromOptions: function() {
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;

      var found = _.find(variants, function(variant) {
        return selectedValues.every(function(values) {
          return _.isEqual(variant[values.index], values.value);
        });
      });

      return found;
    },

    _onSelectChange: function() {
      var options = this._getCurrentOptions();
      var variant = this._getVariantFromOptions(options);

      this.$container.trigger({
        type: 'variantChange',
        variant: variant
      });

      if (!variant) {
        return;
      }

      this._updateMasterSelect(variant);
      this._updateImages(variant);
      this._updatePrice(variant);
      this._updateSKU(variant);
      this.currentVariant = variant;

      if (this.enableHistoryState) {
        this._updateHistoryState(variant);
      }
    },

    _updateImages: function(variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};

      if (!variant.featured_image || variantImage.src === currentVariantImage.src) {
        return;
      }

      this.$container.trigger({
        type: 'variantImageChange',
        variant: variant
      });
    },

    _updateSKU: function(variant) {
      this.$container.trigger({
        type: 'variantSKUChange',
        variant: variant
      });
    },    
    
    _updatePrice: function(variant) {
      if (variant.price === this.currentVariant.price && variant.compare_at_price === this.currentVariant.compare_at_price) {
        return;
      }

      this.$container.trigger({
        type: 'variantPriceChange',
        variant: variant
      });
    },

    _updateHistoryState: function(variant) {
      if (!history.pushState || !variant) {
        return;
      }

      var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
      window.history.replaceState({path: newurl}, '', newurl);
    },

    _updateMasterSelect: function(variant) {
      var $originalSelector = $(this.originalSelectorId);

      if (!variant) {
        return;
      }

      $originalSelector.find('[selected]').removeAttr('selected');
      $originalSelector.find('[value=' + variant.id + ']').prop('selected', 'selected');
    }
  });

  return Variants;
})();

Sunrise.Product = (function() {
  function Product(container) {
    var $container = this.$container = $(container),
        sectionId = $container.attr('data-section-id'),
        self = this;

    this.$item = $('.item', $container);
    this.$info = $('.info', $container);
    this.$images = $('.images', $container);
    this.$image = $('.images .image', $container);
    this.$window = $(window);
    this.$footer = $('.footer');
    this.index = 0;

    this.selectors = {
      originalSelectorId: '#productSelect-' + sectionId,
      addToCart: '#addToCart-' + sectionId,
      addToCartText: '#addToCartText-' + sectionId,
      productPrice: '#productPrice-' + sectionId,
      comparePrice: '#comparePrice-' + sectionId,
      productSKU: '#productSKU-' + sectionId,
      productStockMsg: '#stockMsg-' + sectionId,
      singleOptionSelector: '.single-option-selector-' + sectionId,
      productThumbImages: '.product-single__thumbnail--' + sectionId,
      productFeaturedMedia: '.product-shot-' + sectionId,
      productThumbsWrapper: '.more-images-' + sectionId,
      productMediaWrapper: '[data-product-single-media-wrapper]',
      productMediaTypeVideo: '[data-product-media-type-video]',
      productMediaTypeModel: '[data-product-media-type-model]',
      imageZoomWrapper: '[data-image-zoom-wrapper]',
      smartPayWrap: '.extra-button-wrap-' + sectionId,
      unitPriceWrap: '.unit-price-wrap'
    };
    
    
    this.classes = {
      hidden: 'hide',
      visibilityHidden: 'visibility-hidden',
      jsZoomEnabled: 'js-zoom-enabled',
      activeClass: 'active-thumb'
    };    
    

    this.settings = {
      sectionId: sectionId,
      enableHistoryState: $container.data('enable-history-state') || true,
      namespace: '.product-' + sectionId,
      showPreOrder: $container.data("show-preorder"),
      showInventory: $container.data("show-inventory"),
      zoomEnabled: false,
      imageSize: null,
      imageZoomSize: null
    };

    // Stop parsing if we don't have the product json script tag
    if (!$('#ProductJson-' + sectionId).html()) {
      return;
    }

    this.productSingleObject = JSON.parse($('#ProductJson-' + sectionId).html());
    this.settings.imageSize = '1024x1024';
  
    this.settings.zoomEnabled = $(this.selectors.imageZoomWrapper).hasClass(
      this.classes.jsZoomEnabled
    );

    this.init();
  }

  Product.prototype = _.assignIn({}, Product.prototype, {
    init: function() {
      this.initVariants();
      this.initMoreImages();
      this.initImageSwitch();
      this.initProductZoom();
      this.initProductVideo();
      this.initModelViewerLibraries();
      this.initShopifyXrLaunch();
    },
    initVariants: function() {
      var options = {
        $container: this.$container,
        enableHistoryState: this.settings.enableHistoryState,
        product: this.productSingleObject,
        singleOptionSelector: this.selectors.singleOptionSelector,
        originalSelectorId: this.selectors.originalSelectorId
      };

      this.variants = new Sunrise.Variants(options);
      this.$container.on('variantChange' + this.settings.namespace, this.updateAddToCartButton.bind(this));
      this.$container.on('variantPriceChange' + this.settings.namespace, this.updatePrices.bind(this));
      this.$container.on('variantImageChange' + this.settings.namespace, this.updateMedia.bind(this));
      this.$container.on('variantSKUChange' + this.settings.namespace, this.updateSKU.bind(this));
    },
   initImageSwitch: function(event) {

      if (!$(this.selectors.productThumbImages).length) {
        return;
      }

      var self = this;
      //scroll to active thumb if set
      var $thumb = $(this.selectors.productThumbsWrapper + ' .active-thumb');
      if($(this.selectors.productThumbsWrapper).hasClass('flickity-enabled')){
        scrolltoActiveImage($(this.selectors.productThumbsWrapper),$thumb.data("image-index")); 
      }
     
      var $mainImg = $(this.selectors.productFeaturedMedia);
    
      $(this.selectors.productThumbImages).on('click', function(evt) {
        evt.preventDefault();
        var $el = $(this);
        var mediaId = $el.data('thumbnail-id');
        self.switchMedia(mediaId);
        self.setActiveThumbnail(mediaId);
      });
    },    
    
    switchMedia: function(mediaId) {
      var $currentMedia = $(
        this.selectors.productMediaWrapper +
          ':not(.' +
          this.classes.hidden +
          ')',
        this.$container
      );

      var $newMedia = $(
        this.selectors.productMediaWrapper +
          "[data-media-id='" +
          mediaId +
          "']",
        this.$container
      );

      var $otherMedia = $(
        this.selectors.productMediaWrapper +
          ":not([data-media-id='" +
          mediaId +
          "'])",
        this.$container
      );

      $currentMedia.trigger('mediaHidden');
      $otherMedia.addClass(this.classes.hidden).attr('tabindex', '-1');
      $newMedia.removeClass(this.classes.hidden).trigger('mediaVisible').attr('tabindex', '0').focus();
    },    

    setActiveThumbnail: function(mediaId) {
      // If there is no element passed, find it by the current product image
      if (typeof mediaId === 'undefined') {
        mediaId = $(
          this.selectors.productMediaWrapper + ':not(.hide)',
          this.$container
        ).data('media-id');
      }

      var $thumbnailWrappers = $(
        this.selectors.productThumbsWrapper,
        this.$container
      );

      var $activeThumbnail = $thumbnailWrappers.find(
        this.selectors.productThumbImages +
          "[data-thumbnail-id='" +
          mediaId +
          "']"
      );

      $(this.selectors.productThumbImages)
      .removeClass(this.classes.activeClass)
      .removeAttr('aria-current');
      
      ;

      $activeThumbnail.addClass(this.classes.activeClass);
      $activeThumbnail.attr('aria-current', true);
      if($(this.selectors.productThumbsWrapper).hasClass('flickity-enabled')){
        scrolltoActiveImage($(this.selectors.productThumbsWrapper),$activeThumbnail.data("image-index")); 
      }
    },    
    
    updateMedia: function(evt) {
      var variant = evt.variant;
      var mediaId = variant.featured_media.id;
      var sectionMediaId = this.settings.sectionId + '-' + mediaId;

      this.switchMedia(sectionMediaId);
      this.setActiveThumbnail(sectionMediaId);
    },    
 
    updateSKU: function(event){
      var variant = event.variant;
      var variantSKU = variant.sku || "";
      $(this.selectors.productSKU).html('').hide();
        if(variantSKU.trim()){
          $(this.selectors.productSKU).html("SKU: " + variantSKU).fadeIn(200);
        }
      },
      updateAddToCartButton: function(event){
        var variant = event.variant;
        var $originalSelector = $(this.selectors.originalSelectorId);
        $(this.selectors.smartPayWrap).hide();
        $(this.selectors.productStockMsg).html('').hide();
        if (variant) {
          if (variant.available) {
            var invQty = $originalSelector.find('[value=' + variant.id + ']').data("stk");
            var invPolicy = $originalSelector.find('[value=' + variant.id + ']').data("policy");
            // We have a valid product variant, so enable the submit button
            $(this.selectors.smartPayWrap).show();
            $(this.selectors.addToCart).prop('disabled', false);
            $(this.selectors.addToCartText).text(Sunrise.strings.add_to_cart);
            // Show pre-order message
            if (this.settings.showPreOrder == "yes" && variant.inventory_management == 'shopify' && invQty <= 0 && invPolicy == 'continue') {
                $(this.selectors.productStockMsg).html("<div class='var-msg'>"+"Disponible para pre-pedido"+"</div>").fadeIn(200);
            } else if(this.settings.showInventory == "yes" && variant.inventory_management == 'shopify'){
                $(this.selectors.productStockMsg).html("<div class='var-msg'>"+"Disponibilidad: "+" "+invQty+" "+"en stock"+"</div>").fadeIn(200);
            }
          } else {
            // The variant doesn't exist, disable submit button and change the text
            $(this.selectors.addToCart).prop('disabled', true);
            $(this.selectors.addToCartText).text(Sunrise.strings.sold_out);
          }
        } else {
          $(this.selectors.addToCart).prop('disabled', true);
          $(this.selectors.addToCartText).text(Sunrise.strings.unavailable);
        }  
      },
    
      updatePrices: function(event){
        var variant = event.variant;
        $(this.selectors.comparePrice).hide();
        $(this.selectors.unitPriceWrap).hide();
        if (variant) {
          $(this.selectors.productPrice).html('<span class=price-money>'+Sunrise.Currency.formatMoney(variant.price, Sunrise.strings.money_format)+'</span>');

          // Update and show the product compare price if necessary
          if (variant.compare_at_price > variant.price) {
            $(this.selectors.comparePrice)
            .html('<span class=price-money>'+Sunrise.Currency.formatMoney(variant.compare_at_price, Sunrise.strings.money_format)+'</span>')
            .show();
          } else {
            $(this.selectors.comparePrice).hide();
          }

          if (variant.unit_price) {
            var unitPrice =
            Sunrise.Currency.formatMoney(variant.unit_price, Sunrise.strings.money_format)
            + unitPriceSeparator
            + this.getBaseUnit(variant);
            $(this.selectors.unitPriceWrap).html(unitPrice).fadeIn();
          }
        }
      },
    
      getBaseUnit: function(variant) {
        return variant.unit_price_measurement.reference_value === 1
          ? variant.unit_price_measurement.reference_unit
          : variant.unit_price_measurement.reference_value +
              variant.unit_price_measurement.reference_unit;
      },
    
      initProductVideo: function() {
        var sectionId = this.settings.sectionId;

        $(this.selectors.productMediaTypeVideo, this.$container).each(function() {
          var $el = $(this);
          Sunrise.ProductVideo.init($el, sectionId);
        });
      },

      initModelViewerLibraries: function() {
        var $modelViewerElements = $(
          this.selectors.productMediaTypeModel,
          this.$container
        );
        if ($modelViewerElements.length < 1) return;
        Sunrise.ProductModel.init($modelViewerElements, this.settings.sectionId);
      },    
    
      initShopifyXrLaunch: function() {
        var self = this;
        $(document).on('shopify_xr_launch', function() {
          var $currentMedia = $(
            self.selectors.productMediaWrapper +
              ':not(.' +
              self.classes.hidden +
              ')',
            self.$container
          );
          $currentMedia.trigger('xrLaunch');
        });
      },    
    
      initMoreImages: function(){
        initMoreImages($(this.selectors.productThumbsWrapper));
      },    

      initProductZoom: function(){
        var self = this;
        
        $(self.selectors.imageZoomWrapper).each(function() {
          destroyZoom(this);
        });
        
        if (self.settings.zoomEnabled) {
           // to avoid difficult scrolling only enable zoom on larger devices
           enquire.register("screen and (min-width: 760px)", {
              match : function() {
                $(self.selectors.imageZoomWrapper).each(function() {
                  enableZoom(this);
                });
              },  
              unmatch : function() {
                $(self.selectors.imageZoomWrapper).each(function() {
                  destroyZoom(this);
                });
              }
           });
        } else {
          $(self.selectors.imageZoomWrapper).each(function() {
             destroyZoom(this);
          });
        }    
      },     
    });
  
  function enableZoom(el) {
    var zoomUrl = $(el).data('zoom');
    $(el).zoom({
      url: zoomUrl
    });
  }

  function destroyZoom(el) {
    $(el).trigger('zoom.destroy');
  }
  
   function initMoreImages($el) {
     var $scrollerItems = $el;
     $scrollerItems.flickity({
        selector: '.product-image-small',
        prevNextButtons: true,
        pageDots: false,
        freeScroll: true,
        wrapAround: true,
        autoPlay: false,
        cellAlign: 'left',
        contain: true,
        watchCSS: true,
        //groupCells: true,
        imagesLoaded: true
    });
   }

   function scrolltoActiveImage($el,imageIndex) {
     if($el === undefined){
       return;
     }
     var $carousel = $el.flickity();
     $carousel.flickity( 'select', imageIndex );
   }

   function enableLightbox($el) {
     $el.on('click', function (event) {
       event.preventDefault();
       $('.lightbox-images').find('a[data-image-id="'+$el.data('image-id')+'"]').trigger('click');
     }); 
   }

   function disableLightbox($el) {
      $el.off();
   }
  
   return Product;
})();

Sunrise.doResize = function() {
  if (Modernizr.flexbox && Modernizr.flexwrap) {
    // no need to resize thumbs with javascript
    return;
  }
  $('ul.collection-th a,ul.collection-list a').imagesLoaded( function() {
    $("ul.collection-th").each(function() {
       $(this).find("a.prod-th").removeAttr("style").setAllToMaxHeight();
    });
    $("ul.collection-list").each(function() {
       $(this).find("a.prod-th").removeAttr("style").setAllToMaxHeight();
    });    
  });
};

Sunrise.sortHandler = function(e) {
  var $sortBy = $('#sort-by');
  var sortOrder = $sortBy.data('default-sort');
  
  Shopify.queryParams = {};

  if (location.search.length) {
    for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
      aKeyValue = aCouples[i].split('=');
      if (aKeyValue.length > 1) {
        Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
      }  
    }
  }

  $sortBy.val(sortOrder);

  $(document).on('change', $sortBy, function (event) {
    Shopify.queryParams.sort_by = $sortBy.val();
    if (Shopify.queryParams.sort_by != sortOrder){
      location.search = jQuery.param(Shopify.queryParams);
    }
  });
};

Sunrise.initAccordions = function(){
  $('.gt-accordion h4').each(function() {
    var tis = $(this), state = false, answer = tis.next('div');
    tis.click(function() {
      state = !state;
      answer.slideToggle(state);
      tis.toggleClass('active',state);
    });
  });  
};

Sunrise.Sidebar = function() {
  var $sideMenu = $("#sidebar");
  var $topMenu = $("nav.top-menu");
  var sideMenuHandle = $sideMenu.data("menuchosen");
  var topMenuHandle = $topMenu.data("menuchosen");
  var keepMenuOpen = $sideMenu.data("keep-open");
  
  $topMenu.find('li.level-2 .dropdown-toggle').off();
  
  $topMenu.find('li.level-2 .dropdown-toggle').each(function(){
    var tis = $(this);
    var state = false;

    var subMenu = tis.parent().next('ul');
    tis.on('click', function(e) {
      e.preventDefault();
      state = tis.closest('li').hasClass('active');
      state = !state;
      subMenu.slideToggle(100);
      tis.closest('li').toggleClass('active',state);
      tis.attr('aria-expanded',state);
    });    
  });

  // append top nav to side menu for mobile view (if it's different)
  $sideMenu.find('li.from-top-menu').remove();
  if (sideMenuHandle == topMenuHandle){
    // nothing to do
  }else{
    var children = $topMenu.find("ul:first").children().clone();
    $sideMenu.find(".side-menu-mobile").html(children);
  }

  $('#side-menu').find('.dropdown-toggle').off();
 
  $('#side-menu').find('.dropdown-toggle').each(function() {
    var tis = $(this);
    var state = false;

    var subMenu = tis.parent().next('ul');
    tis.on('click', function(e) {
      e.preventDefault();
      state = tis.closest('li').hasClass('active');
      state = !state;
      subMenu.slideToggle(100);
      tis.closest('li').toggleClass('active',state);
      tis.attr('aria-expanded',state);
    });
  });   
  
  $('#side-menu .shop-by-tag .top-link span').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).next('.dropdown-toggle').trigger("click");
  });
  

  if (keepMenuOpen){
     // get current path and see if it matches the link href. If it does,
     // open that section of the menu
     var CurrentUrl = window.location.pathname;

     if(CurrentUrl !="/"){
       $item = $('#side-menu li.level-1 a').filter(function(){
         var xpathname = location.pathname + "zzz";
         var xhref = $(this).prop('href') + "zzz";
         if (xhref.indexOf(xpathname) != -1){
           $(this).parentsUntil('#side-menu', '.has-sub').addClass('active');
         }
       });

       $('#side-menu li.active').each(function() {
         var tis = $(this);
         tis.find('ul').eq(0).slideDown();
       });
       $('#side-menu li.active > a').find('.dropdown-toggle').attr('aria-expanded',true)
     }
  }    
};

Sunrise.Slideshow = (function() {
  var $slideshow, 
      $slides,
      autoPlay;

   function Slideshow(container) {
      $slideshow = $(container);
      $slides = $('.slides', $slideshow);

      var slideCount = $slides.find(".slide").length;
      var slideTrans = $slideshow.data("transition");
      var slideTime = $slideshow.data("speed");
      var slideDuration = false;
      var showSlideNav = false;

      autoPlay = $slideshow.data("autoplay");
      if (autoPlay === true) {
         slideDuration = slideTime;
      }
     
      if(slideCount > 1){
        showSlideNav = true;
      }
     
      $slides.flickity({
      selector: '.slide',
      prevNextButtons: showSlideNav,
      pageDots: showSlideNav,
      freeScroll: true,
      wrapAround: true,
      autoPlay: slideDuration,
      cellAlign: 'left',
      contain: true,
      imagesLoaded: true
      });

   }

   Slideshow.prototype = _.assignIn({}, Slideshow.prototype, {
      onDeselect: function(event) {
         var $carousel = $slides.flickity();
         if (autoPlay === true) {
            $carousel.flickity('playPlayer');
         }
      },
      onBlockSelect: function(event) {
         var $target = $(event.target);
         var $carousel = $slides.flickity();
         $carousel.flickity('stopPlayer');
         $carousel.flickity( 'select', $target.data('index') );
      },
      onBlockDeselect: function(event) {
         this.onDeselect(event);
      }
   });

   return Slideshow;
})();

Sunrise.LogoList = (function() {
   var $scroller, 
   $scrollerItems,
   autoPlay,
   logoCount;

   function LogoList(container) {
      $scroller = $(container);
      $scrollerItems = $('.logo-list', $scroller);

      autoPlay = $scrollerItems.data("autoplay");
      logoCount = $scrollerItems.find('.logo-list-item').length;
     
      if (logoCount > 5) {
        $scrollerItems.flickity({
        selector: '.logo-list-item',
        prevNextButtons: true,
        pageDots: false,
        freeScroll: true,
        wrapAround: true,
        autoPlay: autoPlay,
        cellAlign: 'left',
        contain: true,
        imagesLoaded: true
      });
     }

   }

   LogoList.prototype = _.assignIn({}, LogoList.prototype, {
      onDeselect: function(event) {
        if (logoCount > 5) {
         var $carousel = $scrollerItems.flickity();
         if (autoPlay === true) {
            $carousel.flickity('playPlayer');
         }
        }
      },
      onBlockSelect: function(event) {
         var $target = $(event.target);
         if (logoCount > 5) {
           var $carousel = $scrollerItems.flickity();
           $carousel.flickity('stopPlayer');
           $carousel.flickity( 'select', $target.data('index') );
         }  
      },
      onBlockDeselect: function(event) {
         this.onDeselect(event);
      }
   });

   return LogoList;
})();

Sunrise.FeaturedVideo = (function() {
})();


Sunrise.initLayout = function() {
   var $window = $(window);

   Sunrise.doResize(); 

   var showSidebar = function(){
      $('body').toggleClass("active-nav");
      $('.menu-button').removeClass("active-button");             
   }

   $(document).on('click', '.menu-button', function(e){
      e.preventDefault();
      showSidebar();
   });
  
   $window.on('resize', _.debounce(function() {
      var off_canvas_nav_display = $('.off-canvas-navigation').css('display');
      var menu_button_display = $('.menu-button').css('display');
      if (off_canvas_nav_display === 'flex') {       
         $("body").removeClass("two-column").addClass("small-screen");           
      } 
      if (off_canvas_nav_display === 'none') {
         $("body").removeClass("active-sidebar active-nav small-screen")
         .addClass("two-column");         
      }  
      Sunrise.doResize(); 
   }, 200));

   $window.on('scroll', _.debounce(function() {
      if ($(this).scrollTop() > 200) {
         $('#xx-scroll-to-top').fadeIn().css("display","inline-block");
      } else {
         $('#xx-scroll-to-top').fadeOut();
      }
   }, 200));
  
   $window.trigger('resize');
   $window.trigger('scroll');

   $(".coll-tags").removeClass('show-tags');
};


Sunrise.Cart = (function() {
  function Cart(container) {
    var $container = container;
    var $cartform = $('#cartform',$container);
    var $qtyFields = $('#cartform input.quantity',$container);
    var reset_cart = false;

    $qtyFields.each(function(){
      var $this = $(this);
      if ($this.data("managed") == "shopify" && $this.data("policy") == "deny" ){
        var gt_stock = parseInt($this.data('stk'), 10);
        var gt_qty = parseInt($this.val(), 10);
        if (gt_qty > gt_stock) { 
          $this.val(gt_stock); 
          reset_cart = true; 
        } 
      }
    });

    if (reset_cart){
      alert("Algunas cantidades han alcanzado para que coincida con el stock disponible");
      $cartform.submit();
    }

    $qtyFields.on('blur',function(){
      var $this = $(this);
      if ($this.data("managed") == "shopify" && $this.data("policy") == "deny"){
        var gt_stock = parseInt($this.data('stk'), 10);
        var gt_qty = parseInt($this.val(), 10);
        if (gt_qty > gt_stock) { 
          alert("Lo sentimos, el stock disponible es" + " " + gt_stock);
          $this.val(gt_stock);
        }  
      }
    });

    if (window.Shopify.Cart){
      Shopify.Cart.ShippingCalculator.show({
        submitButton: "Calcular envío",
        submitButtonDisabled: "Calculando...",
        customerIsLoggedIn: Sunrise.strings.customer_logged_in,
        moneyFormat: '<span class=price-money>'+Sunrise.strings.money_format_json+'</span>',
        currentLanguage: Sunrise.strings.locale_json
      });
    }
  }

  Cart.prototype = _.assignIn({}, Cart.prototype, {
    onUnload: function() {
      // nothing to do on unload
    }
  });

  return Cart;
})();

Sunrise.Collection = (function() {
   function Collection(container) {
      var $container = container;
      Sunrise.sortHandler();
      Sunrise.doResize();
   }

   Collection.prototype = _.assignIn({}, Collection.prototype, {
      onUnload: function() {
      //
      }
   });

   return Collection;
})();

Sunrise.FeaturedCollection = (function() {
   function FeaturedCollection(container) {
     var $container = container;
      Sunrise.doResize();
   }

   FeaturedCollection.prototype = _.assignIn({}, FeaturedCollection.prototype, {
      onUnload: function() {
      //
      }
   });

   return FeaturedCollection;
})();





Sunrise.Footer = (function() {
  function Footer(container) {
    this.$container = $(container);
    this.cache = {};
    this.cacheSelectors();

    if (this.cache.$localeDisclosure.length) {
      this.localeDisclosure = new Sunrise.Disclosure(
        this.cache.$localeDisclosure
      );
    }

    if (this.cache.$currencyDisclosure.length) {
      this.currencyDisclosure = new Sunrise.Disclosure(
        this.cache.$currencyDisclosure
      );
    }
  }

   Footer.prototype = _.assignIn({}, Footer.prototype, {
    cacheSelectors: function() {
      this.cache = {
        $localeDisclosure: this.$container.find(selectors.disclosureLocale),
        $currencyDisclosure: this.$container.find(selectors.disclosureCurrency)
      };
    },
     
      onUnload: function() {
        // make sure back to top icon appears
        $(window).trigger('scroll');
        
        if (this.cache.$localeDisclosure.length) {
           this.localeDisclosure.unload();
        }

        if (this.cache.$currencyDisclosure.length) {
           this.currencyDisclosure.unload();
        }
      }
   });

   return Footer;
})();

Sunrise.lazyLoad = function(){
  $(document).on('lazyloaded', function(e){
    $(e.target).closest('.thumbnail').find('.card-preloader').hide();
  });
};

Sunrise.doCurrency = function(){
  if(window.Currency){
    var shopCurrency = Sunrise.strings.shop_currency;
    var $currencySelector = $('#currencies');
    var $mobileCurrency = $('a.menu-currency span');
    
    Currency.format = 'money_with_currency_format';

    /* Sometimes merchants change their shop currency, let's tell our JavaScript file */
    Currency.moneyFormats[shopCurrency].money_with_currency_format =  Sunrise.strings.money_with_currency_format_json;
    Currency.moneyFormats[shopCurrency].money_format = Sunrise.strings.money_format_json;

    /* Default currency */
    var defaultCurrency = "" || shopCurrency;

    /* Cookie currency */
    var cookieCurrency = Currency.cookie.read();
    
    /* Saving the current price */
    $('span.price-money').each(function() {
      $(this).attr('data-currency-'+shopCurrency, $(this).html());
    });

    // If there's no cookie.
    if (cookieCurrency == null) {
      if (shopCurrency !== defaultCurrency) {
        Currency.convertAll(shopCurrency, defaultCurrency);
      } else {
        Currency.currentCurrency = defaultCurrency;
      }
    } else if ($currencySelector.length && $currencySelector.find('option[value=' + cookieCurrency + ']').length === 0) {
      // If the cookie value does not correspond to any value in the currency dropdown.
      Currency.currentCurrency = shopCurrency;
      Currency.cookie.write(shopCurrency);
    } else if (cookieCurrency === shopCurrency) {
      Currency.currentCurrency = shopCurrency;
    } else {
      Currency.convertAll(shopCurrency, cookieCurrency);
    }

    $currencySelector.val(Currency.currentCurrency);
    $mobileCurrency.html(Currency.currentCurrency);

    $currencySelector.on('change',function() {
      var newCurrency = $(this).val();
      Currency.convertAll(Currency.currentCurrency, newCurrency);
      $mobileCurrency.html(newCurrency);
    });
  } 
};

Sunrise.Maps = (function() {
  var config = {
    zoom: 14
  };
  var apiStatus = null;
  var mapsToLoad = [];

  function Map(container) {
    Sunrise.$currentMapContainer = this.$container = $(container);
    var key = this.$container.data('api-key');


    if (typeof key !== 'string' || key === '') {
      return;
    }

    if (apiStatus === 'loaded') {
      var self = this;

      // Check if the script has previously been loaded with this key
      var $script = $('script[src*="' + key + '&"]');
      if ($script.length === 0) {
        $.getScript(
          'https://maps.googleapis.com/maps/api/js?key=' + key
        ).then(function() {
          apiStatus = 'loaded';
          self.createMap();
        });
      } else {
        this.createMap();
      }
    } else {
      mapsToLoad.push(this);

      if (apiStatus !== 'loading') {
        apiStatus = 'loading';
        if (typeof window.google === 'undefined') {
          $.getScript(
            'https://maps.googleapis.com/maps/api/js?key=' + key
          ).then(function() {
            apiStatus = 'loaded';
            initAllMaps();
          });
        }
      }
    }
  }

  function initAllMaps() {
    // API has loaded, load all Map instances in queue
    $.each(mapsToLoad, function(index, instance) {
      instance.createMap();
    });
  }

  function geolocate($map) {
    var deferred = $.Deferred();
    var geocoder = new google.maps.Geocoder();
    var address = $map.data('address-setting');

    geocoder.geocode({ address: address }, function(results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        deferred.reject(status);
      }

      deferred.resolve(results);
    });

    return deferred;
  }

  Map.prototype = _.assignIn({}, Map.prototype, {
    createMap: function() {
      var $map = this.$container.find('.map-section-container');
      var mapImage = this.$container.find('.map-section-image');
      mapImage.hide();
      return geolocate($map)
        .then(
          function(results) {
            var mapOptions = {
              zoom: config.zoom,
              styles: config.styles,
              center: results[0].geometry.location,
              draggable: false,
              clickableIcons: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              disableDefaultUI: true
            };

            var map = (this.map = new google.maps.Map($map[0], mapOptions));
            var center = (this.center = map.getCenter());
            var marker = new google.maps.Marker({
              map: map,
              position: center
            });

            google.maps.event.addDomListener(window, 'resize', function() {
              google.maps.event.trigger(map, 'resize');
              map.setCenter(center);
            });
          }.bind(this)
        )
        .fail(function() {
          var errorMessage;

          switch (status) {
            case 'ZERO_RESULTS':
              errorMessage = Sunrise.strings.addressNoResults;
              break;
            case 'OVER_QUERY_LIMIT':
              errorMessage = Sunrise.strings.addressQueryLimit;
              break;
            default:
              errorMessage = Sunrise.strings.addressError;
              break;
          }

          // Only show error in the theme editor
          if (Shopify.designMode) {
            var $mapContainer = $map.parents('.map-section');

            $mapContainer.addClass('page-width map-section--load-error');
            $mapContainer
              .find('.map-section__wrapper')
              .html(
                '<div class="errors text-center">' + errorMessage + '</div>'
              );
          }
        });
    },

    onUnload: function() {
      if (typeof window.google !== 'undefined') {
        google.maps.event.clearListeners(this.map, 'resize');
      }
    }
  });

  return Map;
})();

// Global function called by Google on auth errors.
// Show an auto error message on all map instances.
function gm_authFailure() {
  if (!Shopify.designMode) return;

  Sunrise.$currentMapContainer.addClass('page-width map-section--load-error');
  Sunrise.$currentMapContainer
    .find('.map-section__wrapper')
    .html(
      '<div class="errors text-center">' + Sunrise.strings.authError + '</div>'
    );
}



Sunrise.predictiveSearch = function() {
    var predictiveSearchEnabled = window.theme.settings.predictiveSearchEnabled;
  
    var selectors = {
        topSearchForm: '#search-form-top',
        mainSearchForm: '#search-form-main',
        searchFormWrap: '.search-form-wrap',
        searchForm: '.search-form',
        buttonSubmit: '.search-submit',
        buttonReset: '.search-form-clear',
        buttonClose: '.search-bar-close',
        buttonSearchFor: '.do-search',
        searchField: 'input[name="q"]',
        resultsContainer: '.predictive-search-wrapper',
        results: 'ul.predictive-results',
        resultsLi: 'li.search-result-single'
    };
  
    var classes = {
      hasFocus: 'has-focus',
      searchPopulated: 'input-has-text',
      isFixed: 'is-fixed',
      resultSelected: 'result-selected',
      hideResults: 'hide-results',
      topSearchWrapper: 'predictive-search-wrapper-top'
    }
    
    var translations = $(selectors.topSearchForm).data('translations');
    var selectedResult = 0;
    var keys = {enter:13, esc:27, space:32, up:38, down:40, tab:9, left:37, right:39, shift:16 };

    function trapFocus(selector) {
        var el = document.querySelector(selector);
        var focusableEls = el.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'),
        firstFocusableEl = focusableEls[0], 
        lastFocusableEl = focusableEls[focusableEls.length - 1],
        KEYCODE_TAB = 9;

        el.addEventListener('keydown', function(e) {
            var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
            if (!isTabPressed) {return;}
            if ( e.shiftKey ) {
                //shift + tab 
                if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
                }else{
                    //tab
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus();
                    e.preventDefault();
                }
            }
        });
    }
  
    function showTopSearch(event){
    var $wrapper = $(selectors.topSearchForm);
        var $searchField = $wrapper.find(selectors.searchField);

        event.preventDefault();
        $('html, body').addClass(classes.isFixed);
        trapFocus(selectors.topSearchForm);
        $wrapper.fadeIn(200);
        $searchField.focus(); 
        if($searchField.val().trim().length){
            $wrapper.addClass(classes.searchPopulated);
            doSearch($searchField);
        }else{
            $wrapper.removeClass(classes.searchPopulated);
        }
    }

    function showMainSearch(event, $searchField){
      if($searchField.val().trim().length){
        $searchField.closest(selectors.searchFormWrap).removeClass(classes.hideResults);
        doSearch($searchField);
      }
    }

    function closeTopSearch(event){
      event.preventDefault();
      $('html, body').removeClass(classes.isFixed);
      $(selectors.topSearchForm).fadeOut(200); 
    }

    function resetSearch(event, $resetButton){
        event.preventDefault();
        var $wrapper = $resetButton.closest(selectors.searchFormWrap);
        $wrapper.removeClass(classes.searchPopulated);
        $wrapper.find(selectors.searchField).val('').focus();
        $wrapper.find(selectors.resultsContainer).html('');
    }

    function toggleSearch(event,$searchField){
        var $wrapper = $searchField.closest(selectors.searchFormWrap);
        if($searchField.val().trim().length){
            $wrapper.addClass(classes.searchPopulated);
            $searchField.attr('aria-expanded', 'true');
        }else{
            $wrapper.removeClass(classes.searchPopulated);
            $searchField.attr('aria-expanded', 'false');
        }  
    }

    function focusFirstResult(event, $searchField){
        switch (event.keyCode) {
            case keys.down:
                var $wrapper = $searchField.closest(selectors.searchFormWrap);
                var $results = $wrapper.find(selectors.results);
                var $singleResult = $results.find(selectors.resultsLi).eq(0);
                $singleResult.addClass(classes.resultSelected).find('a').addClass(classes.resultSelected).focus();
                break;
            case keys.esc:
                closeTopSearch(event);
                break;
            default:
                return;
        }
    }

    function navigateResults(event, $result){
        var $wrapper = $result.closest(selectors.searchFormWrap);
        var currentIndex = $result.data('index');
        var indexLimit = $wrapper.data('resultcount');

        switch (event.keyCode) {
            case keys.down:
                if(currentIndex == indexLimit){
                    //at last item;
                    return;
                }
                $result.removeClass(classes.resultSelected).find('a').removeClass(classes.resultSelected);
                currentIndex ++;
                var $singleResult = $wrapper.find(selectors.resultsLi).eq(currentIndex);
                $singleResult.addClass(classes.resultSelected).find('a').addClass(classes.resultSelected).focus();
                return false;
                break;
            case keys.up:
                if(currentIndex == 0){
                    $result.removeClass(classes.resultSelected).find('a').removeClass(classes.resultSelected);
                    $wrapper.find(selectors.searchField).focus();
                    return;
                }
                $result.removeClass(classes.resultSelected).find('a').removeClass(classes.resultSelected);
                currentIndex --;
                var $singleResult = $wrapper.find(selectors.resultsLi).eq(currentIndex);
                $singleResult.addClass(classes.resultSelected).find('a').addClass(classes.resultSelected).focus();
                break;
            case keys.esc:
                closeTopSearch(event);
                break;
            default:
                return;
        }
    }


    function doSearch($searchField){
        if(!predictiveSearchEnabled){
            return;
        }

        var $wrapper = $searchField.closest(selectors.searchFormWrap);
        var searchString = $searchField.val().trim();
        var submitButtonIcon = $wrapper.find(selectors.buttonSubmit).find('path');
        var targetDiv = $wrapper.find(selectors.resultsContainer);
        var searchLimit = 5;
        var containerId = $wrapper.attr('id') + "-";
        var counter = 0;
        var searchType = 'product';
        var searchUrl = window.routes.searchUrl + '/suggest.json'; 

        if (searchString === ''){
            $wrapper.removeClass(classes.searchPopulated);
            $(targetDiv).html('');
            return;
        }

        submitButtonIcon.addClass('animated-looped-fast pulse');
  
        var predictiveResults = targetDiv.find(selectors.results);
        if(predictiveResults.length === 0){
            targetDiv.append("<ul id='"+containerId+"results' role='list' class='predictive-results'></ul>");
        }
  
        if (window.theme.settings.predictiveSearchType != 'products'){
            var searchType = "product,page,article,collection";
        }
  
        jQuery.getJSON(searchUrl, {
            "q": searchString,
            "resources": {
                "type": searchType,
                "limit": searchLimit,
                "options": {
                    "unavailable_products": "last",
                    "fields": "title,product_type,variants.title,vendor"
                }
            }
        }) 
        .fail(function(e) {
            console.log( "error calling API:",e);
        })
        .done(function(response) {
            var suggestions = '';
            $.each(response.resources.results, function(index, item) {
                if(this.length > 0){
                    suggestions += `<li class="search-category"><h4>${translations[index]}</h4></li>`;

                    $.each(item, function(index2, item2) {
                        var thumbnail = '';
                        if(item2.hasOwnProperty('featured_image')){
                            if(item2.featured_image.url != null) {
                                var smallImage = Sunrise.Images.getSizedImageUrl(item2.featured_image.url, '120x120');
                                thumbnail =`<div class="thumbnail"><img class="lazyload fade-in" src="${smallImage}" /></div>`;
                            }
                        }                       
                        var price="", comparePrice="", itemPrice="", vendor="", itemTitle="";

                        if(window.theme.settings.predictiveSearchShowPrice){
                            if(item2.price != undefined){
                                price = Sunrise.Currency.formatMoney(item2.price, Sunrise.strings.money_format);
                                if(item2.compare_at_price_min != "0.00"){
                                    var oldPrice = Sunrise.Currency.formatMoney(item2.compare_at_price_min, Sunrise.strings.money_format);
                                    comparePrice = `<del><span class="price-money">${oldPrice}</span></del>`;
                                }      
                                itemPrice = `<span class="search-price"><span class="price-money">${price}</span>${comparePrice}</span>`;
                            }
                        }
                              
                        if(window.theme.settings.predictiveSearchShowVendor){
                            if(item2.vendor != undefined){
                                vendor = `<span class="search-vendor">${item2.vendor}</span>`;
                            }
                        }
                      
                        itemTitle = `<div class="search-result-column"><div class="search-item-title">${item2.title+vendor}</div>${itemPrice}</div>`;

                        suggestions += `<li class="search-result-single" role="listitem" data-index="${counter}"><a id="${containerId+counter}" 
                        class="predictive-result" 
                        href="${item2.url}">
                        ${thumbnail+itemTitle}
                        </a></li>`;

                        counter++;
                    });
                }
            });
      
            var resultsDoSearch = `<li class="search-action search-result-single" role="listitem" data-index="${counter}"><a class="button do-search" href="/search">${translations.searchfor}<span class="predictive-search-view-all__query"> ${searchString}</span></a></li>`;
            suggestions += resultsDoSearch;
          
            if(counter == 1) {
              var resultsCount = Sunrise.strings.one_result_found;
            }else{
              var resultsCount = Sunrise.strings.number_of_results_found.replace('[results_count]',counter);
            }
          
            var resultsA11y = `<li aria-live='polite' role='status' class='visually-hidden search-results-count'>${resultsCount}</li>`;
            suggestions = resultsA11y +suggestions;
          
            targetDiv.find(selectors.results).html(suggestions);
            submitButtonIcon.removeClass('animated-looped-fast pulse');
            $wrapper.addClass(classes.searchPopulated).data('resultcount', counter);
        });
    }


    // event listeners
    $(document)
        .on('click', '.menu-search', function(e){
            showTopSearch(e);
        })

        .on('click',function(e) { 
            $target = $(e.target);
            if(!$target.closest(selectors.searchForm).length) {
                $(selectors.searchFormWrap).addClass(classes.hideResults);
                return;
            }   
            if($target.hasClass(classes.topSearchWrapper)){
                closeTopSearch(e);
            } 
        });  


    $(selectors.searchFormWrap)  
        .on('input', selectors.searchField, _.debounce(function(e) {
            doSearch($(this));
        }, 250))  

        .on('click', selectors.buttonClose, function(e){
            closeTopSearch(e);
        })  

        .on('click', selectors.buttonReset, function(e){
            resetSearch(e,$(this));
        })

        .on('click', selectors.buttonSearchFor, function(e){
            e.preventDefault();
            $(this).closest('form').submit();
        })

        .on('change paste keyup', selectors.searchField, function(e){
            toggleSearch(e,$(this));
        })

        .on('keydown', selectors.searchField, function(e){
            focusFirstResult(e, $(this));
        })

        .on('keydown', selectors.resultsLi, function(e){
            navigateResults(e, $(this));
        })
    
        .on('submit', selectors.searchForm, function(e){
            var $searchField = $(this).find(selectors.searchField);
            if($searchField.val().trim().length === 0){
                e.preventDefault();
                $searchField.focus();
            }
        });



    $(selectors.mainSearchForm+" "+selectors.searchField).on("focusin", function(e){
        showMainSearch(e, $(this));
    });
  

    $(selectors.topSearchForm).on('keydown', function(e){
        if(e.keyCode == keys.esc){
            closeTopSearch(e);
        }
    });
 
} //end predictive search function




Sunrise.initSections = function(){
   var sections = new Sunrise.Sections();
   sections.register('slideshow', Sunrise.Slideshow);
   sections.register('product', Sunrise.Product);
   sections.register('sidebar', Sunrise.Sidebar);
   sections.register('logo-list', Sunrise.LogoList);
   sections.register('featured-video', Sunrise.FeaturedVideo);
   sections.register('cart-template', Sunrise.Cart);
   sections.register('collection-template', Sunrise.Collection);
   sections.register('featured-collection', Sunrise.FeaturedCollection);
   sections.register('footer', Sunrise.Footer);  
   sections.register('map-section', Sunrise.Maps);
};

Sunrise.initListeners = function(){
   $(document)
      .on('click', 'input[name="checkout"], input[name="goto_pp"], input[name="goto_gc"]', function(e){
         var $agreeTerms = $("#agree-terms");
         if ($agreeTerms.length){
            // agree terms is active so make sure it's checked
            if($('#agree',$agreeTerms).prop('checked') == false) {
               e.preventDefault();
               alert("Debe estar de acuerdo con los términos y condiciones de la venta para pagar");
               $('#agree-terms').addClass('highlight').focus();           
            }
         }
      })

      .on('click', '.coll-tags .button', function(e){
         e.preventDefault();
         $(".tags").slideToggle(300);
      })

      .on('click', 'a.go-back', function(e){
         e.preventDefault();
         window.location.href = document.referrer;
      })

      .on('change', '#BlogTagFilter', function(e){
         e.preventDefault();
         window.location.href  = $(this).val();
      })

      .on('click', '#xx-scroll-to-top', function(e){
         // Animate the scroll to top
         e.preventDefault();
         $('html, body').animate({scrollTop: 0}, 300);
      })
};


$(document).ready(function() {
  Sunrise.init();
});

Sunrise.init = function(){
   Sunrise.initLayout();
   Sunrise.initAccordions();
   Sunrise.initListeners();
   Sunrise.initSections();
   Sunrise.customerTemplates.init();
   Sunrise.doCurrency();
   Sunrise.lazyLoad();
   Sunrise.predictiveSearch();
  
  // Theme-specific selectors to make iframes responsive
  var iframeSelectors =
    '.rte iframe[src*="youtube.com/embed"],' +
    '.rte iframe[src*="player.vimeo"],' +
    '.custom__item-inner--html iframe[src*="youtube.com/embed"],' +
    '.custom__item-inner--html iframe[src*="player.vimeo"]';

  Sunrise.rte.wrapIframe({
    $iframes: $(iframeSelectors),
    iframeWrapperClass: 'video-wrapper'
  });
  
  $(document).one('touchstart', function() {
    Sunrise.Helpers.setTouch();
  });
  
};




