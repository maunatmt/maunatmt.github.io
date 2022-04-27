$(function() {
  var headerHeight = 48;    // 固定ヘッダーの高さ
  $('[href^="#"]').click(function(){
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top-headerHeight; 
    $("html, body").animate({scrollTop:position}, 200, "swing");
    return false;
  });
});
$(document).on('scroll', function(){
  if(80 < $(this).scrollTop()) {
      $('header').addClass('scrolled');
      $('.open').addClass('scrolled');
      $('header nav li a').addClass('scroll');
  } else {
      $('header').removeClass('scrolled');
      $('.open').removeClass('scrolled');
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