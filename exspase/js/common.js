$(document).ready(function() {
  var 
    $prev, 
    $next,
    $navWrap = $(".nav__wrap");
    $header = $(".header");

  $(".tr-slide").click(function(ev){
    if($(this).hasClass("tr-slide--center")) return true;
    ev.preventDefault();
    if ($(this).hasClass("tr-slide--left")){
      $next = $(".tr-slide--center").removeClass("tr-slide--center").addClass("tr-slide--right").next();
      $(this).removeClass("tr-slide--left").addClass("tr-slide--center");
      $prev = $(this).prev();
      if ($prev) $prev.removeClass('tr-slide--none');
      if ($next) $next.addClass('tr-slide--none');
    } else if ($(this).hasClass("tr-slide--right")) {
      $prev = $(".tr-slide--center").removeClass("tr-slide--center").addClass("tr-slide--left").prev();
      $(this).removeClass("tr-slide--right").addClass("tr-slide--center");
      $next = $(this).next();
      if ($next) $next.removeClass('tr-slide--none');
      if ($prev) $prev.addClass('tr-slide--none');
    }
  });

  $(".nav__navbar-toggler").click(function(ev){
    if ($navWrap.hasClass("nav__wrap--show")){
      $navWrap.removeClass("nav__wrap--show");
      $header.removeClass("header--bg");
    }else{
      $navWrap.addClass("nav__wrap--show");
      $header.addClass("header--bg");
    }
  });

  var percent = +$("#marketsCalc").attr("data-percent");

  drawProgressCircle(152, 152, 130, percent);

  function drawProgressCircle(x, y, r, percent){
    var 
      del,
      coordMark,
      l = 360 * percent / 100 - 90,
      canvas = document.querySelector(".markets__canvas"),
      ctx = canvas.getContext('2d'),
      grd = ctx.createLinearGradient(0, 0, 300, 300);

    canvas.width = 304;
    canvas.height = 304;
    
    grd.addColorStop(0, "#ff26d9");
    grd.addColorStop(1, "#ff4646");

    ctx.strokeStyle = "#cccaf9";
    ctx.lineWidth = "3";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.stroke();

    ctx.strokeStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, r, (Math.PI / 180) * -90, (Math.PI / 180) * l, false);
    ctx.stroke();

    if (l < 90) {
      del = delXY(l, r);
      coordMark = coord(x, y, del.x, del.y, 1, 1);
    } else if (l < 180) {
      del = delXY(l - 90, r);
      coordMark = coord(x, y, del.y, del.x, -1, 1);
    } else if (l < 270) {
      del = delXY(l - 180, r);
      coordMark = coord(x, y, del.x, del.y, -1, -1);
    } else if (l === 270) {
      del = delXY(l - 270, r);
      coordMark = coord(x, y, del.y, del.x, 1, -1);
    } else {
      del = delXY(l - 270, r);
      coordMark = coord(x, y, del.x, del.y, 1, -1);
    }

    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(coordMark.x, coordMark.y, 5, 0, Math.PI * 2, false);
    ctx.fill();

    function delXY(alfa, r) {
      delX = Math.cos((Math.PI / 180) * alfa) * r;
      delY = Math.sin((Math.PI / 180) * alfa) * r;
      return {
        x: delX,
        y: delY
      }
    }

    function coord(x, y, dx, dy, zx, zy) {
      return {
        x: zx * dx + x,
        y: zy * dy + y,
      }
    }
  }
  
});


