//Button
function thxAlert() {
    alert("Thank you for subscribing to AF Gruppen!");
  }

//Scroll smooth after clicking jumpto link
(function($) {
    $(document).on('click', 'a[href^="#"]', function(e) {
     var id = $(this).attr('href');
     var $id = $(id);
     if ($id.length === 0) {
     return;
     }
     e.preventDefault();
     var pos = $id.offset().top;
     $('body, html').animate({scrollTop: pos},800);
     $( "body.open-menu #overlay-menu .menu-icon" ).trigger( "click" );
    });
    })(jQuery);
    
// sticky header on scroll up 
 /* 
   (function($) {
        var prev = 0;
        var $window = $(window);
        var nav = $('.semplice-navbar');
      
        $window.on('scroll', function(){
          var scrollTop = $window.scrollTop();
          nav.toggleClass('hide-navbar', scrollTop > prev);
          prev = scrollTop;
        });
      
        $(window).scroll(function() {
            if ($(this).scrollTop() <= 300) {
                $('.semplice-navbar').removeClass('hide-navbar');
            }
        });
        
      })(jQuery);  
*/

// Sticky subheader    
    jQuery(document).ready(function() {
        //Enter Your Class or ID
        var $stickyMenu = jQuery('#sub-navigation');
        var stickyNavTop = jQuery($stickyMenu).offset().top;
        //Get Height of Navbar Div
        var navHeight = jQuery($stickyMenu).height();
        var stickyNav = function(){
            var scrollTop = jQuery(window).scrollTop();
            if (scrollTop > stickyNavTop) { 
                jQuery($stickyMenu).addClass('sticky');
                jQuery('html').css('padding-top', navHeight + 'px')
            } else {
                jQuery($stickyMenu).removeClass('sticky');
                jQuery('html').css('padding-top', '0')
            }
        };
        stickyNav();
        jQuery(window).scroll(function() {
            stickyNav();
        });
    });

// cache the navigation links 
var $navigationLinks = $('#sub-navigation .contain > ul > li > a');
// cache (in reversed order) the sections
var $sections = $($(".section").get().reverse());

// map each section id to their corresponding navigation link
var sectionIdTonavigationLink = {};
$sections.each(function() {
    var id = $(this).attr('id');
    sectionIdTonavigationLink[id] = $('#sub-navigation .contain > ul > li > a[href=\\#' + id + ']');
});

// throttle function, enforces a minimum time interval
function throttle(fn, interval) {
    var lastCall, timeoutId;
    return function () {
        var now = new Date().getTime();
        if (lastCall && now < (lastCall + interval) ) {
            // if we are inside the interval we wait
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                lastCall = now;
                fn.call();
            }, interval - (now - lastCall) );
        } else {
            // otherwise, we directly call the function 
            lastCall = now;
            fn.call();
        }
    };
}

function highlightNavigation() {
    // get the current vertical position of the scroll bar
    var scrollPosition = $(window).scrollTop();
    //const effect = document.querySelector('.effect')

    // iterate the sections
    $sections.each(function() {
        var currentSection = $(this);
        // get the position of the section
        var sectionTop = currentSection.offset().top;
        // if the user has scrolled over the top of the section  
        if (scrollPosition >= sectionTop) {
            // get the section id
            var id = currentSection.attr('id');
            // get the corresponding navigation link
            var $navigationLink = sectionIdTonavigationLink[id];
            // if the link is not active
            if (!$navigationLink.hasClass('active')) {
                // remove .active class from all the links
                $navigationLinks.removeClass('active');
                // add .active class to the current link
                $navigationLink.addClass('active');
                var x = $navigationLink.offset().left;
                anime({
                    targets: '.effect',
                    left: `${x-28}px`,
                    duration: 600,
                    endDelay: 1000,
                });
            }
            // we have found our section, so we return false to exit the each loop
            return false;
        }
    });
}

 $(window).scroll( throttle(highlightNavigation,100) );

// if you don't want to throttle the function use this instead:
// $(window).scroll( highlightNavigation );

    