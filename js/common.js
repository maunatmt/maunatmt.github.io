$(function() {
  var headerHeight = 48;//固定ヘッダーの高さを入れる
  $('[href^="#"]').click(function(){
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top-headerHeight; 
    $("html, body").animate({scrollTop:position}, 200, "swing");//200はスクロールの移動スピードです
    return false;
  });
});
$(document).on('scroll', function(){
  if(80 < $(this).scrollTop()) {
      $('header').addClass('change-color');
      $('.open').addClass('change-color');
      $('header nav li a').addClass('scroll');
  } else {
      $('header').removeClass('change-color');
      $('.open').removeClass('change-color');
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