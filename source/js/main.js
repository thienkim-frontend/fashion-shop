jQuery(document).ready(function ($) { 
  $(function () {
    $("[rel='tooltip']").tooltip();
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

  // Custom Navigation Events
  $(".featured-product .next").click(function(){
  owl.trigger('next.owl.carousel');
  })
  $(".featured-product .prev").click(function(){
  owl.trigger('prev.owl.carousel');
  })
    
  var owl2 = $(".brand-carousel");
    owl2.owlCarousel({
      nav: false, // Show next and prev buttons
      items : 6,
      margin: 20,
      itemsDesktop: [1199,6],
      itemsTablet:  [768,3],
      itemsMobile:  [479,3]
    });
   // Custom Navigation Events
    $(".brands .next").click(function(){
      owl2.trigger('next.owl.carousel', [300]);
    })
    $(".brands .prev").click(function(){
      owl2.trigger('prev.owl.carousel', [300]);
    })

  var owl = $(".product-carousel");
  owl.owlCarousel({
    nav : false, // Show next and prev buttons
    margin: 20,
    items : 3,
    itemsDesktop: [1199,3],
    itemsTablet:  [768,2],
    itemsMobile:  [479,1]
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

   
    
    $( '#dl-menu' ).dlmenu();
    
    // $(".fancybox-ad").fancybox().trigger('click');

  
});