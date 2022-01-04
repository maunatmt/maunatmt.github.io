$(document).ready(function(){
  if(80 < $(this).scrollTop()) {
    $('header').addClass('change-color');
    $('header nav li a').addClass('scroll');
} else {
    $('header').removeClass('change-color');
    $('header nav li a').removeClass('scroll');
}
});
$(document).on('scroll', function(){
  if(80 < $(this).scrollTop()) {
      $('header').addClass('change-color');
      $('header nav li a').addClass('scroll');
  } else {
      $('header').removeClass('change-color');
      $('header nav li a').removeClass('scroll');
  }
});
$(document).ready(function(){
  $("#company-logo").mouseover(function(){
    $(".fa-cube").addClass("logo-animation-hover");
  });
  $("#company-logo").mouseout(function(){
    $(".fa-cube").removeClass("logo-animation-hover");
  });
});