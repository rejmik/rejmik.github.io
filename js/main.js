jQuery(document).ready(function ($) {
  $('.group__form-filter').on('click', function () {
    $(this).toggleClass('group__form-filter--closed');
    $(this).next().slideToggle();
  });
  $('.shops__item  .btn-arrow').click(function () {
    $(this).parents('.shops__item').addClass('actives'); //добавляем класс текущей (нажатой)
  });

  $('.shops__item  .shop-close').click(function () {
    $(this).parents('.shops__item').removeClass('actives'); //добавляем класс текущей (нажатой)
  });
  $('.best__item-content .best__btn .btn-arrow').click(function () {
    $(this).parents('.best__item-content').addClass('active'); //добавляем класс текущей (нажатой)
  });

  $('.best__item-content .best__btn .shop-close').click(function () {
    $(this).parents('.best__item-content').removeClass('active'); //добавляем класс текущей (нажатой)
  });
  //youtube script
var tag = document.createElement('script');
tag.src = '//www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

onYouTubeIframeAPIReady = function () {
  player = new YT.Player('player', {
    videoId: 'IOJTwO5Fbxo', // youtube video id
    playerVars: {
      autoplay: 0,
      rel: 0,
      showinfo: 0,
      controls: 0,
    },
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
};

var p = document.getElementById('player');
$(p).hide();

var t = document.getElementById('thumbnail');
t.src = 'images/content/bg-3divky.png';

onPlayerStateChange = function (event) {
  if (event.data == YT.PlayerState.ENDED) {
    $('.start-video').fadeIn('normal');
  }
};

$(document).on('click', '.start-video', function () {
  $(this).hide();
  $('#player').show();
  $('#thumbnail_container').hide();
  player.playVideo();
});

  //video terasy
  // $('.btn__video').on('click', function () {
  //   $(this).closest('top__inner').removeClass('top-play');
  //   $(this).parent().addClass('top-play');
  // });

  //
  $('.grid').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: {
      enabled: true,
    },
  });
  $('.shops__btn').on('click', function () {
    $(this).closest('shops__item').removeClass('active');
    $(this).parent().addClass('active');

    return false;
  });
});
var elem = document.querySelector('.grid');
imagesLoaded(elem, () => {
  var msnry = new Masonry(elem, {
    // options
    itemSelector: '.grid-item',
    gutter: 15,
    columnWidth: '.grid-sizer',
  });
});

//// scroll
window.addEventListener('scroll', function () {
  var header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

// navbar
const menuIcon = document.querySelector('.navbar__btn');
const navbar = document.querySelector('.navbar');
menuIcon.addEventListener('click', () => {
  navbar.classList.toggle('change');
});

// filter checkboxes
document
  .querySelectorAll('.filter__form input[type=checkbox]')
  .forEach((input) => input.addEventListener('change', () => input.form.submit()));

/// text more
const btnMore = document.querySelector('.more');
const shopDetailBox = document.querySelector('.shop-detail__box');
btnMore.addEventListener('click', () => {
  shopDetailBox.classList.toggle('vision');
});

