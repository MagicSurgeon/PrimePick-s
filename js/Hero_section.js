// Built by @traf
// https://tr.af

$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    $(".hero").css({
      transform: 'translate3d(0, +'+(scroll/100)+'%, 0) scale('+(100 - scroll/100)/100+')'
    });
  });