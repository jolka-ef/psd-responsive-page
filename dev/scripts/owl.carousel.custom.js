$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
      navText:[
        '<svg class="icon slider-icon" viewBox="0 0 60 110"><use xlink:href="#icon-arrow-left-sqr-crners"></use></svg>',
        '<svg class="icon slider-icon" viewBox="0 0 60 110"><use xlink:href="#icon-arrow-right-sqr-crners"></use></svg>'
      ],
      loop: true,
      nav: true,
      responsive: {
        0: {
          items: 1,
        },
        980: {
          items: 3,
        },
      }
    });
});

