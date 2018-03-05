$(document).ready(function() {


  var delay = 500;
  $('.line:lt(5)').each(function(){
                 //^^ do for every instance less than the 16th (starting at 0)
      $(this).delay(delay).animate({
          opacity:1
      },500);
      delay += 500;
  });


  $(document).on("click", ".flip-container", function () {
      $(this).toggleClass('hover');
  });



  $(document).ready(function() {
    setTimeout(function() {
      $(".header-container").show();
      $(".header-bg-container").show();

      $(".navbar").show();

    }, 3000);
  });

  var RoadMap = $(".roadmap-wrapper").offset().top;
  //
  // $(document).scroll(function() {
  //     if($(this).scrollTop() > 770 ) {
  //
  //       $(".line").delay(500).fadeIn(500);
  //       $(".line").delay(1000).fadeIn(500);
  //     }
  // });

  var wallet = $(".wallet-wrapper").offset().top;
  $( ".wallet-dl" ).hide();

  $(document).scroll(function() {
    if($(this).scrollTop() > wallet - 300) {
      $(".wallet-dl").each(function(index) {
          $(this).delay(400*index).fadeIn(300);
    });
    }
  })


  var roadmap = $(".roadmap-wrapper").offset().top;
  $( ".roadmap-left" ).hide();
  $( ".roadmap-right" ).hide();
  $( ".line" ).hide();


  $(document).scroll(function() {
    if($(this).scrollTop() > roadmap - 300) {
        $(".line").each(function(index) {
          $(this).delay(400*index).fadeIn(300);
      });
        $(".roadmap-left").each(function(index) {
          $(this).delay(400*index).fadeIn(300);
      });
        $(".roadmap-right").each(function(index) {
          $(this).delay(400*index).fadeIn(300);
      });
    }
  })

});
