jQuery(document).ready(function() {
    header();
    jQuery(window).scroll(function() {
        header();
    });

// Date
    if($('.date').length > 0){
        $('.date').datetimepicker({
            format:'DD/MM/YYYY',
            widgetPositioning: {
                horizontal: 'left',
                vertical: 'bottom'
            },
            icons:{time:"fa fa-clock-o",date:"fa fa-calendar",up:"fa fa-chevron-up",down:"fa fa-chevron-down",previous:'fa fa-chevron-left',next:'fa fa-chevron-right',today:'fa fa-screenshot',clear:'fa fa-trash',close:'fa fa-remove',
            inline:!0},
        });
    }

// Slider
    if (jQuery('.banner .box-slider').length > 0) {
        jQuery('.banner .box-slider').owlCarousel({
            loop: true,
            autoplayTimeout: 5000,
            nav: false,
            autoplay: true,
            dots: true,
            margin: 0,
            fade: true,
            navSpeed: 2200,
            dragEndSpeed: 2200,
            touchDrag: false,
            mouseDrag: false,
            items: 1,
        });
    }
// animate menu
    jQuery('#menu-trigger').on('change', function () {
        if (jQuery(this).is(':checked')) {
            tlMenu.restart();
            jQuery('body').addClass('none-scroll');
        } else {
            tlMenu.reverse();
            jQuery('body').removeClass('none-scroll');
        }
    });
    var tlMenu = new TimelineMax({ paused: true });
    var sidebar = document.querySelector('.sidebar');
    var sidebarOverlay = document.querySelector('.sidebar-overlay');
    var sidebarList = document.querySelectorAll('.sidebar-inner ul li');
    var sidebarLang = document.querySelector('.sidebar_lang');
    var sidebarButton = document.querySelector('.sidebar_button');

    tlMenu.to(sidebarOverlay, 0.3, { opacity: 0.5, ease: Power4.easeOut }, "-=0.2")
      .to(sidebar, 0.3, { y: 0, ease: Power4.easeOut });

    tlMenu.to(sidebarLang, 0.2, { x: 0, opacity: 1, ease: Power4.easeOut });

    sidebarList.forEach(function (item) {
      tlMenu.fromTo(item, 0.2, { x: 10, opacity: 0, ease: Power4.easeOut }, { x: 0, opacity: 1, ease: Power4.easeOut }, "-=0.18")
    });

    tlMenu.to(sidebarButton, 0.2, { x: 0, opacity: 1, ease: Power1.easeOut });
// end mouse anim
    jQuery(document).on('click', '.hambuger', function(){
        jQuery(this).toggleClass('activated');
        jQuery('.user').removeClass('active');
    });

    /*=================================================
                            Custom
    =====================================================*/

    jQuery(document).on('click', '.box-accodition .item--title', function() {
        jQuery(this).toggleClass("close");
        jQuery(this).parent().find('.item--content').slideToggle(300);
    });

// Show / Hide lightbox
    jQuery(document).on('click', '.md-trigger', function() {
        var val = jQuery(this).attr('data-modal');
        var that = jQuery(this);
        jQuery(val).addClass('open');  
    });
    jQuery(document).on('click', '.lightbox .area--close, .lightbox .lightbox-dark', function() {
        jQuery(this).closest('.lightbox').removeClass('open');  
    });


    jQuery(document).on('click', '.user .user-icon', function(){
        jQuery('#menu-trigger').prop('checked', false);
        jQuery('#menu-trigger').change();
        jQuery('.hambuger ').removeClass('activated');
        jQuery(this).parent().toggleClass('active');
        jQuery('.sidebar-overlay').toggleClass('active');
    });


// Dropdown
    var x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("select--area");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[0].innerHTML;
        if(selElmnt.options[selElmnt.selectedIndex].id) {
            a.id = selElmnt.options[selElmnt.selectedIndex].id;
        }
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 0; j < ll; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            if (j == 0){
                c.setAttribute("class", "disabled");
            }
            if (selElmnt.options[j].selected && j != 0){
                c.setAttribute("class", 'same-as-selected');
                a.innerHTML = selElmnt.options[j].innerHTML;
            }
            if(selElmnt.options[j].id) {
                c.id = selElmnt.options[j].id;
            }
            c.addEventListener("click", function(e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML && i != 0) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        h.id = this.id;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        z = this.parentNode.parentNode.getElementsByClassName("choose--valued");
                        zl = z.length;
                        for (m = 0; m < zl; m++) {
                            z[m].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        this.parentNode.parentNode.classList.add("choose--valued");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.parentElement.classList.toggle("select-arrow-active");
        });
    }
    
    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].parentElement.classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
});
function header() {
    // Scroll article
    var scroll = jQuery(window).scrollTop();
    if (scroll > 250) {
        jQuery('.header').addClass('active');
    } else {
        jQuery('.header').removeClass('active');
    }
    jQuery('.user').removeClass('active');
    jQuery(window).scroll(function(event) {
        var scroll = jQuery(window).scrollTop();
        if (scroll > 250) {
            jQuery('.header').addClass('active');
        } else {
            jQuery('.header').removeClass('active');
        }
        jQuery('.user').removeClass('active');
    });
}
