var Shopify = Shopify || {};
// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------
Shopify.money_format = "${{amount}}";
Shopify.formatMoney = function(cents, format) {
  if (typeof cents == 'string') { cents = cents.replace('.',''); }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = (format || this.money_format);

  function defaultOption(opt, def) {
     return (typeof opt == 'undefined' ? def : opt);
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal   = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) { return 0; }

    number = (number/100.0).toFixed(precision);

    var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';

    return dollars + cents;
  }

  switch(formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
};


if($('#preloader').length > 0) {  
$(window).on('load', function() {
$( "#preloader" ).delay(350).fadeOut( "slow", function() {
if($('.preloader-overflow').length > 0) {
$('body').removeClass('preloader-overflow');   
}
});
});
}
if($('.media-slick-slider  .thumbnail-list').length > 0) {  
$('.thumbnail-list').not('.slick-initialized').slick({
  vertical: true,
  verticalSwiping: true,
  slidesToShow: 4,
  slidesToScroll: 1
});
}

if($('.toggleFilter').length > 0) {  
const filter = document.querySelector(".toggleFilter");
const sidebar = document.querySelector(".facets-vertical");
const closeDiv = document.querySelector(".close-sidebar")  

filter.addEventListener("click", () => {
  filter.classList.toggle("active");
  sidebar.classList.toggle("open");
});

closeDiv.addEventListener("click", () => {
  filter.classList.remove("active");
  sidebar.classList.remove("open");
});
}



$(window).scroll(function() {    
  if($(window).width() > "1024"){
  if ( $(window).scrollTop() >= 500 ) {
    $('.sticky-bar').css('display', 'flex');
    } else {
    $('.sticky-bar').css('display', 'none');
    }
}});


$(window).scroll(function(){
if($(window).width() < "1024"){
  if ($(window).scrollTop() >= 900) {
        $('.sticky-bar').css('display', 'flex');
    } else {
    $('.sticky-bar').css('display', 'none');        
    }
}
});

if ($('.pagination-method-loadmore_btn').length > 0) {
        var AjaxMethod = 'click';
    } else {
        var AjaxMethod = 'scroll';
    }

if ($('.collection #AjaxinatePagination').length > 0) {
var endlessScroll = new Ajaxinate({
    container: '.AjaxinateContainer',
    pagination: '#AjaxinatePagination',
    method: AjaxMethod,
    offset: 0,
  callback: null
});
}

//product page color variant to select thumbnail img change color_variants
$('input:radio[name="Color"]').click(function() {
  const cvariant = $(this).val();  
  $('input:radio[name="Color"]').next('.swatch-element').removeClass('clicked');
  $(this).next('.swatch-element').addClass('clicked');
  $('.slick-list').addClass('height_fix');
  $('.thumbnail-list__item').each(function() {
      const variant_val = $(this).find('img').attr("alt");
      if (cvariant == variant_val) {
          $(this).addClass('show');
          $(this).removeClass('hidden');
      } else {
          $(this).addClass('hidden');
          $(this).removeClass('show');
      }
  });
});

$('.tablinks').click(function() {
  const getid = $(this).data('id');
  //console.log(getid);
  $('.dt-sc-tabs-content').removeClass('active');
  $('#'+getid).addClass('active');
});


$(document).ready(function(){
  $("#recently").click(function(){
    $("#recently-viewed-products").slideToggle(750);
  });
});

//     Item swatch trigger start
$(document).on('click', '.color-values a', function() {
    if ($(this).hasClass("active")) {
        $(".color-values a").removeClass("active");
    } else {
        $(".color-values a").removeClass("active");
        $(this).addClass("active");
    }
});

$(document).on('click', '.size-values a', function() {
    if ($(this).hasClass("active")) {
        $(".size-values a").removeClass("active");
        $(this).parents('.card__content').find('.variant-option-size .size-values').removeClass('active');
    } else {
        $(".size-values a").removeClass("active");
        $(this).addClass("active");
        $(this).parents('.card__content').find('.variant-option-size .size-values').removeClass('active');
    }
});
$('body').on('click', '.swatch span', function(event) {
    if ($(this).data("image").indexOf("no-image") == -1) {
        $(this).parents('.card__content').find('.image_group .featured-image').attr('srcset', $(this).data("image"));
    }
    var PickedColor = $(this).data("variant-item");
  if($('.choosen-swatch').length > 0 ) {
    $(this).parents('.card__content').find('.card__information .full-unstyled-link span').text(' - '+PickedColor);
  }
    if ($(this).parents('.swatch').hasClass('color')) {
        var variant = $(this).data('id');
        $(this).parents('.card__content').find('.variant-push').val(variant);
        var swatch_item = $(this).data('variant-item');
        $(this).parents('.card__content').find('.variant-option-size .size-values').removeClass('active');
        $(this).parents('.card__content').find('.variant-option-size .swatch').each(function() {
            var swatch_size_vars = $(this).find('span').data('variant-title');
            swatch_size_vars = swatch_size_vars.split('/');
            swatch_size_vars = $.map(swatch_size_vars, $.trim);
            swatch_size_vars = $.map(swatch_size_vars, function(n) {
                return n.toLowerCase();
            });
            swatch_size_vars = $.map(swatch_size_vars, function(n) {
                return n.replace(/ /g, '-');
            });
            if ($.inArray(swatch_item, swatch_size_vars) >= 0) {
                if ($(this).parent().hasClass('.active')) {
                    $(this).parent().removeClass('active');
                } else {
                    $(this).parent().addClass('active');
                }
            }
        });
    }
    if ($(this).parents('.swatch').hasClass('size')) {
        var variant = $(this).data('id');
        $(this).parents('.card__content').find('.variant-push').val(variant);
    }
});

$('body').on('click', '.color-values-plus a', function(e) {
    $(this).parents('.variant-option-color').find('.show-on-click').css('display', 'flex');
    $(this).parents('.color-values-plus').css('display', 'none');
    e.preventDefault();
});
//     Item swatch trigger end

