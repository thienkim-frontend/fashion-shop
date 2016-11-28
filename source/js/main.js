jQuery(document).ready(function ($) { 

  $(".product-control #fitColumns").on("click", function(e){
    e.preventDefault();
    $(".product-control a").removeClass('active');
    $(this).addClass('active');
    $('.products-layout').addClass('list');
  });
  $(".product-control #fitRows").on('click', function (e) {
    e.preventDefault();
    $(".product-control a").removeClass('active');
    $(this).addClass('active');
    $('.products-layout').removeClass('list');
  });

  function openTab(){
    // Javascript to enable link to tab
    var hash = document.location.hash;
    if (hash) {
        $('.nav-tabs a[href="'+ hash +'"]').tab('show');
        // $('html,body').animate({scrollTop:$('.nav-tabs a[href="'+ hash +'"]').offset().top}, 600);
        $('.panel-title a[href="'+ hash +'"]').trigger('click');
        var posTop = $('.panel-title a[href="'+ hash +'"]').offset().top;
        $('html,body').animate({scrollTop: 0}, 1000);
        console.log('px'+posTop);
    } 
    // Change hash for page-reload
    $('.nav-tabs a').on('shown.bs.tab', function (e) {
        window.location.hash = e.target.hash;
    });
  }
  openTab();
  $('.dropdown-content a').on('click', function () {
    var hash = this.hash;
    if (hash) {
      $('.nav-tabs a[href="'+ hash +'"]').tab('show');
    } 
  });

  // Mega menu
 $('.has-child').hover(function(){
  $(this).find('.dropdown-content').stop().slideDown('400','easeInQuad');
  },
  function(){
  $(this).find('.dropdown-content').stop().slideUp('slow');
  });
    
    
  // hide #back-top first
  $("#back-top").hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#back-top').fadeIn();
    } else {
      $('#back-top').fadeOut();
    }
  });
  // scroll body to 0px on click
  $('#back-top a').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });


    
  var owl2 = $(".brand-carousel");
    owl2.owlCarousel({
      nav: false, // Show next and prev buttons
      responsive: { 992: {items:6, margin: 20}, 479: {items:6, margin: 10}}
    });
  // http://jsfiddle.net/bimaljr/ZTBuj/7/  
  var owlWrap = $('.has-carousel');
  if (owlWrap.length > 0) {
    // check if plugin is loaded
    if (jQuery().owlCarousel) {

      owlWrap.each(function(){
        var carousel= $(this).find('.owl-carousel'),
            navigation = $(this).find('.customNavigation'),
            nextBtn = navigation.find('.next'),
            prevBtn = navigation.find('.prev');
        carousel.owlCarousel({
          nav : false, // Show next and prev buttons
          responsive: {  0: {items:1}, 650: {items:2, margin: 10}, 992: {items:3, margin: 20}}
        });
       
        nextBtn.click(function(){
          carousel.trigger('next.owl.carousel', [300]);
        });
        prevBtn.click(function(){
          carousel.trigger('prev.owl.carousel', [300]);
        });
      });
    };
  };
  var width;
  $(window).resize(function() {
    width = $(window).width();
    // console.log(width);
    if(width < 767){
      $(".index .owl-item").addClass('products-layout list');
      $(".index .sale-icon").hide();
    }else{
      $(".index .owl-item").removeClass('products-layout list');
      $(".index .sale-icon").show();
    }
  });
  /*___________________main-slider___________________*/
  var $progressBar, $bar, $elem, isPause, tick, percentTime, time = 7; // time in seconds
  // http://www.owlcarousel.owlgraphic.com/docs/api-options.html
  $(".main-slider").owlCarousel({
      nav: true,
      navText: ['<i class="fa fa-angle-left round-icon"></i>', '<i class="fa fa-angle-right round-icon"></i>'],
      dots : true,
      slideSpeed : 500,
      items: 1,
      autoplay: true,
      onInitialized : progressBar,
      onChanged : moved,
      onDragged : pauseOnDragging
  });

  function progressBar (elem) {
      $elem = $(".owl-stage-outer", ".main-slider");
      $progressBar = $("<div>", {id : "progressBar"});
      $bar = $("<div>", {id : "bar"});
      $progressBar.append($bar).prependTo($elem);
      start();
  }
  function start(){
      percentTime = 0;
      isPause = false;
      tick = setInterval(interval, 10);
  }
  function interval(){
      if (isPause === false) {
          percentTime += 1 / time;
          $bar.css({ "width": percentTime + "%"});
          if (percentTime >= 100) {
              $elem.trigger('next.owl.carousel');
          };
          console.log(percentTime);
      };
  }
  function pauseOnDragging () {
      isPause = true;
  }
  function moved () {
      clearTimeout(tick);
      start();
  }
  /*================== noUiSlider ==================*/
  $(".noUiSlider").noUiSlider({
     range: [0, 100]
    ,start: [20, 80]
    ,handles: 2
    ,step: 10
    ,margin: 10
    ,connect: true
    ,behaviour: 'tap-drag'
    ,serialization: {
       mark: ','
      ,resolution: 0.1
      ,to: [ [$('#value-min'), 'html'],
          [$('#value-max'), 'html'] ]
    }
  });
  /*================== Map ==================*/
  function initialize() {
    var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(40.676498, -73.623132),
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions); 
    var marker = new google.maps.Marker({
      position: map.getCenter(),
      map: map,
      icon:"images/map_marker_icon.png"
    });
    marker.setMap(map);     
  }
  google.maps.event.addDomListener(window, 'load', initialize);
  
  // $(".fancybox-ad").fancybox().trigger('click');
  /*================== Slider Product Detail page ==================*/
  $(".zoom").elevateZoom({
    gallery:'gallery_01', 
    cursor: 'pointer', 
    galleryActiveClass: 'active', 
    imageCrossfade: true, 
    loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif'
  }); 
  
  //pass the images to Fancybox
  $(".zoom").bind("click", function(e) {  
    var ez =   $('.zoom').data('elevateZoom');  
    $.fancybox(ez.getGalleryList(),{
      closeBtn  : false,
      helpers : {
        title : {
          type : 'inside'
        },
        buttons : {}
      },

      afterLoad : function() {
        this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
      }
    });
    return false;
  }); 

  $("#gallery_01").owlCarousel({
    nav: true,
    pagination: false,
    items: 4,
    itemsDesktop : [1199,4],
    itemsDesktopSmall : [979,3],
    itemsTablet: [768,3],
    itemsMobile : [479,3],
    scrollPerPage: true,
    navText: ['<i class="fa fa-chevron-left round-icon" title="Previous"></i>', '<i class="fa fa-chevron-right round-icon" title="Next"></i>']
  });

  $( '#dl-menu' ).dlmenu();
});