document.addEventListener("DOMContentLoaded", function () {
  // ====== helpers

  function getArrayFromNodeCollection(collection) {
    return Array.prototype.slice.call(collection);
  }

  // ====== slideshows

  var hasTestimonials =
    !!document.getElementsByClassName("testimonials").length;
  var hasSlideshow = !!document.getElementsByClassName("slideshow").length;

  if (hasTestimonials) {
    new Splide(".testimonials", {
      type: "loop",
      perPage: 5,
      pagination: false,
      breakpoints: {
        768: {
          perPage: 1,
        },
        1024: {
          perPage: 4,
        },
      },
    }).mount();
  }

  if (hasSlideshow) {
    new Splide(".slideshow", {
      type: "loop",
      perPage: 1,
      pagination: false,
    }).mount();
  }

  // ====== initialise Image Carousel

  var hasNavigationSlider = !!document.querySelector(
    "[data-js=navigation-slider]"
  );
  var hasMainSlider = !!document.querySelector("[data-js=main-slider]");

  if (hasNavigationSlider && hasMainSlider) {
    var navigationSlider = new Splide("[data-js=navigation-slider]", {
      fixedWidth: "20%",
      height: "20vh",
      cover: true,
      heightRatio: 0.125,
      isNavigation: true,
      pagination: false,
      arrows: false,
      focus: "center",
      lazyLoad: "sequential",
      breakpoints: {
        1920: {
          fixedWidth: "20%",
          height: 0,
          cover: true,
          heightRatio: 0.125,
          isNavigation: true,
          pagination: false,
          arrows: false,
          focus: "center",
          lazyLoad: "sequential",
        },
      },
    }).mount();

    var mainSlider = new Splide("[data-js=main-slider]", {
      type: "fade",
      height: "80vh",
      pagination: false,
      arrows: false,
      cover: true,
      lazyLoad: "nearby",
      rewind: true,
      breakpoints: {
        1024: {
          heightRatio: 0.5,
          height: 0,
          type: "fade",
          pagination: false,
          arrows: false,
          cover: true,
          lazyLoad: "nearby",
          rewind: true,
        },
        1440: {
          heightRatio: 0.5,
          height: 0,
          type: "fade",
          pagination: false,
          arrows: false,
          cover: true,
          lazyLoad: "nearby",
          rewind: true,
        },
      },
    });

    mainSlider.sync(navigationSlider).mount();
  }

  // ====== testimonials tooltips

  tippy("[data-tippy-content]", {
    arrow: false,
    placement: "right",
    popperOptions: {
      strategy: "fixed",
      modifiers: [
        {
          name: "flip",
          options: {
            fallbackPlacements: ["right", "left", "bottom", "top"],
          },
        },
        {
          name: "preventOverflow",
          options: {
            altAxis: true,
            tether: false,
          },
        },
      ],
    },
  });

  // ====== lightbox

  GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: false,
  });

  // ====== set scroll animation when navigation item clicked

  var navItemArray = getArrayFromNodeCollection(
    document.querySelectorAll(".navigation__link")
  );

  navItemArray.forEach(function (item) {
    item.addEventListener("click", function (event) {
      var navItemHash = event.target.href.split("#")[1];
      var sectionEl = document.getElementById(navItemHash);

      if (navItemHash && sectionEl) {
        event.preventDefault();

        window.scrollTo({
          top: sectionEl.offsetTop,
          left: 0,
          behavior: "smooth",
        });
      }
      // close nav
    });
  });
});
