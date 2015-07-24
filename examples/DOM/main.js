var AutoLayout = window.AutoLayout;

/**
 * Set the absolute size and position for a DOM element.
 *
 * The DOM element must have the following CSS styles applied to it:
 * - position: absolute;
 * - padding: 0;
 * - margin: 0;
 *
 * @param {Element} elm DOM element.
 * @param {Number} left left position.
 * @param {Number} top top position.
 * @param {Number} width width.
 * @param {Number} height height.
 */
var transformAttr = ('transform' in document.documentElement.style) ? 'transform' : undefined;
transformAttr = transformAttr || (('-webkit-transform' in document.documentElement.style) ? '-webkit-transform' : 'undefined');
transformAttr = transformAttr || (('-moz-transform' in document.documentElement.style) ? '-moz-transform' : 'undefined');
transformAttr = transformAttr || (('-ms-transform' in document.documentElement.style) ? '-ms-transform' : 'undefined');
transformAttr = transformAttr || (('-o-transform' in document.documentElement.style) ? '-o-transform' : 'undefined');
function setAbsoluteSizeAndPosition(elm, left, top, width, height) {
    elm.setAttribute('style', 'width: ' + width + 'px; height: ' + height + 'px; ' + transformAttr + ': translate3d(' + left + 'px, ' + top + 'px, 0px);');
}

/**
 * Lays out the child elements of a parent element absolutely
 * using the visual format language.
 *
 * When the window is resized, the AutoLayout view is re-evaluated
 * and the child elements are resized and repositioned.
 *
 * @param {Element} parentElm Parent DOM element
 * @param {String|Array} visualFormat One or more visual format strings
 */
function autoLayout(parentElm, visualFormat) {
    var view = new AutoLayout.View();
    view.addConstraints(AutoLayout.VisualFormat.parse(visualFormat, {extended: true}));
    var elements = {};
    for (var key in view.subViews) {
        var elm = document.getElementById(key);
        if (elm) {
            elm.className += elm.className ? ' abs' : 'abs';
            elements[key] = elm;
        }
    }
    var updateLayout = function() {
        view.setSize(parentElm ? parentElm.clientWidth : window.innerWidth, parentElm ? parentElm.clientHeight : window.innerHeight);
        for (key in view.subViews) {
            var subView = view.subViews[key];
            if (elements[key]) {
                setAbsoluteSizeAndPosition(elements[key], subView.left, subView.top, subView.width, subView.height);
            }
        }
    };
    window.addEventListener('resize', updateLayout);
    updateLayout();
    return updateLayout;
}

// main layout
autoLayout(undefined, [
    '|-[left(right)]-[right]-|',
    'V:|-[left]-|\nV:|-[right]-|'
]);

// left layout (EVFL)
autoLayout(document.getElementById('left'), [
    'V:|-[col:[text(20)]-[vfl(evfl)]-[text2(text)]-[evfl]]-|',
    '|-[col]-|'
]);

// right example layout
var exampleVFL = [
    '|-[child1(child3)]-[child3]-|',
    '|-[child2(child4)]-[child4]-|',
    '[child5(child4)]-|',
    'V:|-[child1(child2)]-[child2]-|',
    'V:|-[child3(child4,child5)]-[child4]-[child5]-|'
];
autoLayout(document.getElementById('right'), exampleVFL);
document.getElementById('vfl').innerHTML = exampleVFL.join('\n');

var exampleEVFL = [
    'V:|-[col1:[child1(child2)]-[child2]]-|',
    'V:|-[col2:[child3(child4,child5)]-[child4]-[child5]]-|',
    'H:|-[col1]-[col2]-|'
];
document.getElementById('evfl').innerHTML = exampleEVFL.join('\n');
