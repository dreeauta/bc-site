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


  var RoadMap = $(".roadmap-wrapper").offset().top;
  // 
  // $(document).scroll(function() {
  //     if($(this).scrollTop() > 770 ) {
  //
  //       $(".line").delay(500).fadeIn(500);
  //       $(".line").delay(1000).fadeIn(500);
  //     }
  // });

});
