jQuery(function($) {

	/* -- WINDOW WIDTH CHECK --*/

		/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (coffee) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
		window.matchMedia||(window.matchMedia=function(){var b=(window.styleMedia||window.media);if(!b){var c=document.createElement("style"),a=document.getElementsByTagName("script")[0],d=null;c.type="text/css";c.id="matchmediajs-test";a.parentNode.insertBefore(c,a);d=("getComputedStyle" in window)&&window.getComputedStyle(c,null)||c.currentStyle;b={matchMedium:function(e){var f="@media "+e+"{ #matchmediajs-test { width: 1px; } }";if(c.styleSheet){c.styleSheet.cssText=f}else{c.textContent=f}return d.width==="1px"}}}return function(e){return{matches:b.matchMedium(e||"all"),media:e||"all"}}}());
		
		var media_queries = {
			tablet: window.matchMedia('(min-width:768px) and (max-width: 991px)'),
			mobile: window.matchMedia('(max-width:767px)')
		}

		function refreshMediaQueries() {
			media_queries.tablet = window.matchMedia('(min-width:768px) and (max-width: 991px)');
			media_queries.mobile = window.matchMedia('(max-width:767px)');
		}

		function isSmall() { return media_queries.mobile.matches; }
		function isMedium() { return media_queries.tablet.matches; }
		function isXLarge() { return (!media_queries.tablet.matches && !media_queries.mobile.matches); }

		jQuery(function($) {
			$(window).on('resize', refreshMediaQueries());
		});

	
	
	"use strict";
	
	var instinct_theme = {};
	
	
	// Mobile nav menu
	instinct_theme.mobile_nav_menu = function(){
	
		/* -- nav menu button click -- */
		$( '#mobile-nav-button' ).click(function(e) {
			e.preventDefault();
			
			$('#mobile-nav-button').toggleClass('active');
			
			$('#header-nav,#main-content,.medium-header-container,footer').toggleClass('menu-active');

		});
		
		
		/* -- mobile drop down menu(s) -- */
		$('.sub-drop-icon').on('click', function(e) {
		
			e.preventDefault();
		
			if(!isXLarge()) {
				if (!$(this).hasClass('sub-second-drop')){
					// first level drop down
					$(this).parents('.menu-item').find('> .sub-menu-first').slideToggle(250).toggleClass('opened');
				} else { 
					// second level drop down
					$(this).parents('.menu-item').find('> .sub-second-tier').slideToggle(250).toggleClass('opened');
				}
				
				$(this).toggleClass('fa fa-angle-down fa fa-angle-up');
			
			}

		});
		
		
		// close the mobile push menu when click on content
		$('#main-content,footer').on('click', function() {
			
			// check if push menu is open
			if($('#mobile-nav-button').hasClass('active')){
				// hide the push menu
				$('#header-nav,#main-content,.medium-header-container,footer').removeClass('menu-active');
				$('#mobile-nav-button').removeClass('active');
			}
			
		});
		
	}
	
	
	// Theme slideshows
	instinct_theme.slideshows = function(){
		
		if ($.fn.owlCarousel) {
		
			if($('.carousel .featured-slide,.carousel .about-slide,.carousel .testimonial-slide,.carousel .post-slide').length > 1) {
			
				$('.carousel').each(function() {
					
					var slideshow_id = this.id;
					var slideshow_autoplay = $(this).attr('data-autoplay');
					
					if(slideshow_autoplay == "true"){
						var carousel_auto = true;
						var carousel_speed = $(this).attr('data-autoplay-speed');
					}
					
					if($(this).attr('data-animation-in')){
						var animation_in = $(this).attr('data-animation-in');
					}
					
					if($(this).attr('data-animation-out')){
						var animation_out = $(this).attr('data-animation-out');
					}
					
										
					$('#'+slideshow_id).owlCarousel({
						autoplay:carousel_auto,
						autoplayTimeout:carousel_speed,
						autoplayHoverPause:true,
						animateIn: animation_in,
						animateOut: animation_out,
						items: 1,
						margin: 0,
						navigation: true,
						loop: true,
					});

				});

			}

			$('.previous-slide-btn').on('click', function() {
				$(this).closest('.carousel-outer').find('.owl-carousel').trigger('prev.owl.carousel');
			});

			$('.next-slide-btn').on('click', function() {
				$(this).closest('.carousel-outer').find('.owl-carousel').trigger('next.owl.carousel');
			});
		
		}
		
	}
	
	
	// Contact map
	instinct_theme.contact_map = function(){
	
		if($('#contact-map-container').length) {
	
			var map_coord = $('#contact-map-container').data('coord');
			
			var lat_lng = map_coord.split(',');
		
			// Create an array of styles.
			var styles=[{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}];
		
			var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
		
			var mapOptions = {
				center: new google.maps.LatLng(lat_lng[0], lat_lng[1]),
				/* Level of zoom */
				zoom: 12,
				disableDefaultUI: true,
				scrollwheel: false,
				zoomControl: true,
				mapTypeControlOptions: {
				  mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
				}
			};
			
			var map = new google.maps.Map(document.getElementById('contact-map'), mapOptions);
			
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat_lng[0], lat_lng[1]),
				clickable: false,
				map: map, 
				title: 'Lucid Themes',
				icon: {
					url: 'assets/img/map_pin.png',
					size: new google.maps.Size(27, 37)
				}
			});
			
			map.mapTypes.set('map_style', styledMap);
			map.setMapTypeId('map_style');
		
		}
		
	}
	
	
	// Sharrre social icons
	instinct_theme.sharrre_plugin = function(){
	
		if ($.fn.sharrre) {
	
			var share_template = $('#post-share').html();
					
			$('#post-share').sharrre({
				share: {
					facebook: true,
					twitter: true,
					linkedin: true,
					pinterest: true,
					googlePlus: true
				},
				urlCurl: '',
				template: share_template,
				enableHover: false,
				enableTracking: false,
				render: function(api){

					$(api.element).on('click', 'a', function(e) {
						e.preventDefault();

							api.openPopup($(this).data('popup'));

					});
				}
			});
		
		}
		
	}
	
	
	// Scroll top
	instinct_theme.scroll_top = function(){

		$(window).scroll(function(){
			if($(document).scrollTop() > 50){
				$('#scroll-top').fadeIn(500);
			} else {
				$('#scroll-top').fadeOut(500);
			}
		});
		
		$('#scroll-top').on('click', function(e) {
			$('html,body').animate({ scrollTop: 0 }, 500);
			e.preventDefault();
		});
		
	}
	
	
	// Isotope filter
	instinct_theme.isotope = function(){
	
		if ($.fn.isotope) {
	
			$(window).load(function() {

				$('#portfolio-items').isotope({
					itemSelector: '[class^=col-]',
					layoutMode: 'packery',
					resizable: false,
				});
				
				$(function() {
				
					var $container = $('#portfolio-items').isotope({
						itemSelector: '.portfolio-item'
					});
					
					// hash of functions that match data-filter values
					var filterFns = {
						// show if number is greater than 50
						numberGreaterThan50: function() {
						var number = $(this).find('.number').text();
						return parseInt( number, 10 ) > 50;
						},
						// show if name ends with -ium
						ium: function() {
						var name = $(this).find('.name').text();
						return name.match( /ium$/ );
						}
					};

					// filter items on button click
					$('#portfolio-item-filter').on( 'click', 'a', function(e) {
						 e.preventDefault();
						var filterValue = $(this).attr('data-filter');
						// use filter function if value matches
						filterValue = filterFns[ filterValue ] || filterValue;
						$container.isotope({ filter: filterValue });
					});
					
					// change active class on buttons
					$('#portfolio-item-filter').each(function(i, filterbutton) {
						var $filterbutton = $(filterbutton);
						$filterbutton.on('click', 'a', function() {
							$filterbutton.find('.active').removeClass('active');
							$(this).addClass('active');
						});
					});
				
				});
				
			});
		
		}
	
	}	
	
	instinct_theme.mobile_nav_menu(); // Mobile nav menu
	instinct_theme.slideshows(); // Slideshows
	instinct_theme.contact_map(); // Contact map
	instinct_theme.scroll_top(); // Scroll top
	instinct_theme.sharrre_plugin(); // Sharrre plugin
	instinct_theme.isotope(); // Isotope filter
	
	
	
	
	
	/* -- This function is used for the theme feature page ONLY and can be removed if wanted. This is used to showcase the slideshows animation effects and autoplay options. -- */
	
	instinct_theme.feature_slideshow = function(){
		
		function feature_slideshow(autoplay){
		
			if ($.fn.owlCarousel) {
				
				var owl = $('#feature-slideshow');
				
				owl.trigger('destroy.owl.carousel');
				
				owl.html(owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
				
				var animIn = $( "#slideshow-animation-in" ).val();
				var animOut = $( "#slideshow-animation-out" ).val();
				
				var slideshow_options = {
					autoplay:autoplay,
					autoplayTimeout:2000,
					autoplayHoverPause:true,
					animateIn: animIn,
					animateOut: animOut,
					items: 1,
					margin: 0,
					navigation: true,
					loop: true,
				};
				
				owl.owlCarousel(slideshow_options);
			
			}
		
		}
		
		feature_slideshow(false);
		
		$('.slideshow-animation-select').on('change', function() {
			var autoplay = false;
		
			if($('#feature-autoplay').hasClass('active')){
				autoplay = true;
			}
			feature_slideshow(autoplay);
		});
		
		$('#feature-autoplay').on('click', function() {
		
			$(this).toggleClass('active');
		
			if($(this).hasClass('active')){
				$(this).text("Autoplay: on");
				feature_slideshow(true);
			} else {
				$(this).text("Autoplay: off");
				feature_slideshow(false);
			}
			
		});
		
	}
	
	instinct_theme.feature_slideshow();
	
		
});