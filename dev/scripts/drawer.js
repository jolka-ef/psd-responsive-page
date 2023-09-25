const drawer = (document.getElementById('drawer'));

const drawerOpen = (document.getElementById('drawer-toggleOpen'));

const drawerToggle = (document.getElementById('drawer-toggle'));

const siteContent = (document.getElementById('site-content'));

const site = (document.getElementById('site'));

var TRANSITION_DURATION = 300,
    isOpen = false;

/**
 * Adds a class to an element
 */

function addClass(element, className) {
  const cls = element.className;
  if (!cls) {
     element.className = className;
     return;
  }  else if (cls.indexOf(className) > -1) {
     return;
  }  else {
     element.className = cls + ' ' + className;
  }
}

/**
 * Removes a class from an element
 */

function removeClass(element,className) {
    var cls = element.className;
    if (cls.indexOf(className) < 0) return;
    var existingClasses = cls.split(/\s/),
        newClasses = [];
    for (var index = 0; index < existingClasses.length; index += 1) {
      if (existingClasses[index] != className) newClasses.push(existingClasses[index]);
    }
    if (!newClasses.length) {
       element.removeAttribute('class');
    }
    else {
       element.className = (newClasses.join(' '));
    }
}

/**
 * Pollyfil for browsers that do not support Element.closest()
 */

if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest =
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i,
        el = this;
      do {
        i = matches.length;
        while (--i >= 0 && matches.item(i) !== el) {}
      } while ((i < 0) && (el = el.parentElement));
      return el;
    };
}

/**
 * Adds event handlers to the drawer menu buttons
 */

function init() {
  drawerToggle.addEventListener('click', handledrawerToggleClick);
  drawerToggle.addEventListener('touchend', handledrawerToggleClick);
  drawerOpen.addEventListener('click', handledrawerOpenClick);
  drawerOpen.addEventListener('touchend', handledrawerOpenClick);
  document.addEventListener('click', handleClickOutsideThedrawer);
  document.addEventListener('touchend', handleClickOutsideThedrawer);
}

/**
 * A callback that handles clicks on the drawer menu icon
 */

function handledrawerToggleClick(event) {
  event.preventDefault();
  isOpen ? close(): open();
}

/**
 * A callback that handles click on the drawer menu text
 */

function handledrawerOpenClick(event) {
  event.preventDefault();
  open();
}

/**
 * A callback that closes the drawer if the click originated from outside
 * the drawer element
 */

function handleClickOutsideThedrawer(event) {
  const target = (event.target);
  const boxdrawerToggle = target.closest('#drawer-toggle');
  const boxdrawerOpen = target.closest('#drawer-toggleOpen');
  const boxdrawer = target.closest('#drawer');
  const matchesMql = window.matchMedia('min-width : 61.25em').matches;
  if(isOpen  && !matchesMql && !boxdrawerToggle && !boxdrawer &&!boxdrawerOpen) {
     close();
  };
}

/**
 * Opens a closed drawer
 */

function open() {
  
  isOpen = true;
  setTimeout(function fn() {
    removeClass(drawer,'drawer--opening');
    removeClass(drawer,'drawer--closed');
    }, TRANSITION_DURATION);

  addClass(drawer,'drawer--opening');
  addClass(siteContent,'site-content--shifted');
  addClass(drawerToggle,'header-drawerToggle--shifted');
  addClass(drawerOpen,'header-navigationInfo--shifted');
  addClass(site, 'no-scroll');
}

/**
 * Closes an open drawer
 */

function close() {

  isOpen = false;
  setTimeout(function fn() {
    removeClass(drawer,'drawer--closing');
    addClass(drawer,'drawer--closed');
    }, TRANSITION_DURATION);

  addClass(drawer,'drawer--closing');
  removeClass(siteContent,'site-content--shifted');
  removeClass(drawerToggle,'header-drawerToggle--shifted');
  removeClass(drawerOpen,'header-navigationInfo--shifted');
  removeClass(site, 'no-scroll');
}

init();
