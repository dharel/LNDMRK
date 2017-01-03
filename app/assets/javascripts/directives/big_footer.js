/*global angular, _, asset_path, window, document, $ */
angular.module('lndmrk').directive('bigFooter', function () {
  'use strict';
  return {
    restrict: 'E',
    scope: {
    },
    template:
    "<footer>" +
    "<div class='container'>" +
      "<div class='left'>" +
        "<div class='links-container'>" +
          "<ul class='column'>" +
            "<li class='link'><a href='#'>aaaaaaaaaaa</a></li>" +
            "<li class='link'><a href='#'>bbbbbbbbbbb</a></li>" +
            "<li class='link'><a href='#'>ddddddddddd</a></li>" +
            "<li class='link'><a href='#'>eeeeeeeeeee</a></li>" +
            "<li class='link'><a href='#'>fffffffffff</a></li>" +
            "<li class='link'><a href='#'>ggggggggggg</a></li>" +
          "</ul>" +
          "<ul class='column'>" +
            "<li class='link'><a href='#'>hhhhhhhhhhh</a></li>" +
            "<li class='link'><a href='#'>iiiiiiiiiii</a></li>" +
            "<li class='link'><a href='#'>jjjjjjjjjjj</a></li>" +
            "<li class='link'><a href='#'>kkkkkkkkkkk</a></li>" +
            "<li class='link'><a href='#'>lllllllllll</a></li>" +
            "<li class='link'><a href='#'>mmmmmmmmmmm</a></li>" +
          "</ul>" +
          "<ul class='column'>" +
            "<li class='link'><a href='#'>ooooooooooo</a></li>" +
            "<li class='link'><a href='#'>ppppppppppp</a></li>" +
            "<li class='link'><a href='#'>qqqqqqqqqqq</a></li>" +
            "<li class='link'><a href='#'>rrrrrrrrrrr</a></li>" +
            "<li class='link'><a href='#'>ssssssssssss</a></li>" +
            "<li class='link'><a href='#'>tttttttttttt</a></li>" +
          "</ul>" +
        "</div>" +
      "</div>" +
      "<div class='right'>" +
        "<div class='contact'>" +
          "<div class='contact-info'>contact@lndmrk.com</div>" +
          "<div class='contact-info'>122 Jmhh St.</div>" +
          "<div class='contact-info'>+972-578687678</div>" +
          "<div class='contact-info'>Ffnsdnn, Israel</div>" +
        "</div>" +
        "<div class='social'>" +
          "<div class='social-item facebook'></div>" +
          "<div class='social-item twitter'></div>" +
          "<div class='social-item linkdin'></div>" +
          "<div class='social-item mail'></div>" +
        "</div>" +
      "</div>" +
      "<div class='buttom'>" +
        "<p class='paragraph' style='direction:ltr; text-align:left;'>" +
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, justo sit amet rutrum vulputate, mi justo scelerisque libero, sit amet venenatis ex diam id risus. Phasellus placerat imperdiet arcu, molestie mollis ante volutpat vel. Donec eu felis augue. Suspendisse dapibus commodo efficitur. Etiam sit amet nisi ac est suscipit semper at ac massa. Donec tempor tempor convallis. Proin eget tortor vitae nulla laoreet cursus eu vel elit." +
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, justo sit amet rutrum vulputate, mi justo scelerisque libero, sit amet venenatis ex diam id risus. Phasellus placerat imperdiet arcu, molestie mollis ante volutpat vel. Donec eu felis augue. Suspendisse dapibus commodo efficitur. Etiam sit amet nisi ac est suscipit semper at ac massa. Donec tempor tempor convallis. Proin eget tortor vitae nulla laoreet cursus eu vel elit." +
          "tiam sit amet nisi ac est suscipit semper at ac massa. Donec tempor tempor convallis. Proin eget tortor vitae nulla laoreet cursus" +
          "tiam sit amet nisi ac est suscipit semper at ac massa. Donec tempor tempor convallis. Proin eget tortor vitae nulla laoreet cursus tiam sit amet nisi ac est suscipit semper at ac massa. Donec tempor tempor convallis. Proin eget tortor vitae nulla laoreet cursustiam sit amet nisi ac est suscipit semper at ac massa. Donec tempor tempor convallis. Proin eget tortor vitae nulla laoreet cursus" +
        "</p>" +
      "</div>" +
    "</div>" +
    "</footer>",
    link: function (scope) {
    }
  };
});