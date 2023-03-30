var scrollTop = 0;

$(function () {
    $(document).on('mousemove mouseenter mouseleave', function (e) {
        calcMouseVars(e.clientX, e.clientY);
    });

    $(window).on('scroll', function () {

        scrollTop = $(window).scrollTop();

        calcRootScrollVars(scrollTop);

        $('div[data-showcase]').each(function () {
            var showcaseElem = $(this);
            var showcaseData = getShowcaseData(showcaseElem);

            var scrollStatus = isInScrollArea(showcaseData);
            
            if (scrollStatus >= 1) {
                setSceneCSS(showcaseData);
            } else {
                
            }
        });

        $('div[data-scene]').each(function () {

            var elemData = {
                scrollStart: $(this).data('scroll-start'),
                scrollEnd: $(this).data('scroll-end'),
                scene: $(this).data('scene'),
                element: $(this)
            };


            var scrollStatus = isInScrollArea(elemData);
     
            switch (scrollStatus) {
                case 1:
                    

                    setSceneCSS(elemData);
                    
                    break;

                case 2:
                    setSceneCSS(elemData, true);
                    break;

                    case 3:
                        break;
            }
        });
    });
});



function calcScrollRelativePx(val) {
    return (scrollTop - val);
}

function calcScrollRelativeInt(start, end) {
    return (scrollTop - start) / (end - start);
}

function calcScrollRelativePct(start, end) {
    return calcScrollRelativeInt(start, end) * 100;
}

function setSceneCSS(elem, reset = false) {
    if (!reset) {
        elem.element.css({ 
            "--scroll-px": calcScrollRelativePx(elem.scrollStart) + "px",
            "--scroll-pct": calcScrollRelativePct(elem.scrollStart, elem.scrollEnd) + "%",
            "--scroll-digit": calcScrollRelativeInt(elem.scrollStart, elem.scrollEnd),
            "--scroll-rel-digit": (scrollTop - elem.element.offset().top) / elem.scrollEnd
        });
    }
    else {
        elem.element.css({ 
            "--scroll-px": "0px",
            "--scroll-digit": "0",
            "--scroll-pct": "0%"
        });
    }
}

function getShowcaseData(elem) {
    var showcaseData = {
        showcase: $(elem).data('showcase'),
        scrollStart: $(elem).offset().top,
        scrollEnd: $(elem).position().top + $(elem).outerHeight(),
        element: $(elem)
    };

    return showcaseData;
}

function isInScrollArea(elemData) {
    var inScrollArea = ((scrollTop >= elemData.scrollStart) && (scrollTop <= elemData.scrollEnd)) == true ? 1 :
        ((scrollTop < elemData.scrollStart) == true ? 2 : ((scrollTop > elemData.scrollEnd) == true ? 3 : 4));

    return inScrollArea;
}

function calcRootScrollVars(sTop) {
    $(":root").css({
        "--window-scroll-px": sTop + "px"
    });
}

function calcMouseVars(x, y) {
    $(":root").css({
        "--mouse-x": x + "px",
        "--mouse-y": y + "px",
        "--mouse-x-pct": x / $(window).width() * 100 + "%",
        "--mouse-y-pct": y / $(window).height() * 100 + "%",
        "--mouse-xmid": x - $(window).width() / 2 + "px",
        "--mouse-ymid": y - $(window).height() / 2 + "px",
        "--mouse-xdeg": x + "deg",
        "--mouse-ydeg": y + "deg",
        "--mouse-xmiddeg": x - $(window).width() / 2 + "deg",
        "--mouse-ymiddeg": y - $(window).height() / 2 + "deg"
    });

    //console.log(y - $(window).height() / 2);
}