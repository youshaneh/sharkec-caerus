$(document).ready(function () {
  if (document.querySelector('.lightbox1-container')){
    document.querySelector('.lightbox1-container').innerHTML +=
    '<div class="city-container taipei-city-container page-dummy">' + document.querySelector('.taipei-city-container').innerHTML + '</div>';
  };
  if (document.querySelector('#marquee')) handleMarquee();
  if (document.querySelector('.question-container')) handleFaq();
  if (document.querySelector('#menu')) handleMenu();
  if (document.querySelector('.arrow-icon')) handleAboutArrow();
  if (document.querySelector('#lightbox1')) handleReservationButton()
  if (document.querySelector('.navbar-custom')) handleNavbar();
});

function handleMarquee() {
  var marquee = document.querySelector('#marquee');
  var firstPic = marquee.firstElementChild;
  setInterval(function () {
    var width = Array.prototype.slice.call(marquee.children).reduce(function (a, b) {
      return a + b.offsetWidth
    }, 0);
    var marginLeft = (parseInt(firstPic.style.marginLeft) || 0) - 1;
    if (marginLeft + (width / 2) < 0) marginLeft += (width / 2);
    firstPic.style.marginLeft = marginLeft + 'px';
  }, 30);
}

function handleFaq() {
  document.querySelectorAll('.question-container').forEach(function (e) {
    e.querySelector('.answer-container').style.display = 'none';
    e.onclick = function () {
      if (e.classList.contains('expanded')) {
        e.classList.remove('expanded');
      } else {
        e.classList.add('expanded');
        document.querySelectorAll('.question-container').forEach(function (f) {
          if (f != e) {
            f.classList.remove('expanded');
            $(f.querySelector('.answer-container')).slideUp();
          }
        });
      }
      $(e.querySelector('.answer-container')).slideToggle();
    }
  })
}

function handleMenu() {
  var menu = document.querySelector('#menu');
  var lightbox1 = document.querySelector('#lightbox1');
  var lightbox2 = document.querySelector('#lightbox2');
  document.querySelector('#menu-text').onclick = function (e) {
    e.preventDefault();
    menu.classList.add('expanded');
  }
  document.querySelector('#menu-button').onclick = function (e) {
    e.preventDefault();
    menu.classList.add('expanded');
  }
  document.querySelector('#menu-back').onclick = function (e) {
    menu.classList.remove('expanded');
  }

  document.querySelector('#menu-reservation').onclick = function (e) {
    e.preventDefault();
    lightbox1.classList.add('expanded');
  }
  document.querySelector('#lightbox1-back').onclick = function (e) {
    lightbox1.classList.remove('expanded');
  }

  document.querySelector('#lightbox2-back').onclick = function (e) {
    lightbox2.classList.remove('expanded');
  }

  document.querySelector('#about').onclick = function (e) {
    handleMenuItemClick(e, document.querySelector('#about-title'));
  }

  document.querySelector('#space').onclick = function (e) {
    handleMenuItemClick(e, document.querySelector('#section-space-intro'));
  }

  document.querySelector('#service').onclick = function (e) {
    handleMenuItemClick(e, document.querySelector('#section-service'));
  }

  document.querySelector('#faq').onclick = function (e) {
    handleMenuItemClick(e, document.querySelector('#section-faq'));
  }

  document.querySelector('#reservation').onclick = function (e) {
    e.preventDefault();
    lightbox1.classList.add('expanded');
  }

  document.querySelector('#cooperation').onclick = function (e) {
    e.preventDefault();
    lightbox2.classList.add('expanded');
  }

  handleReservation();
}

function handleMenuItemClick(event, element) {
  if (element != null) {
    event.preventDefault();
    menu.classList.remove('expanded');
    MYAPP.lastYOffset = 0;
    var link = event.target;
    while (!link.getAttribute("href")) {
      link = link.parentElement;
    }
    window.location.href = link.getAttribute("href")
  }
}

function handleReservation() {
  var lightbox1 = document.querySelector('.lightbox1-container');
  var left = document.querySelector('#lightbox1-left');
  var right = document.querySelector('#lightbox1-right');
  var page = 0;
  var taipeiCityContainer = document.querySelector('.taipei-city-container');
  const pageCount = 4;

  document.querySelectorAll('.city-container img').forEach(function (img) {
    var lazySrc = img.dataset.lazy;
    if (lazySrc) {
      img.setAttribute('src', lazySrc)
    }
  })

  function checkReservation() {
    setTimeout(function () {
      var shouldHide = window.getComputedStyle(left).display == 'none';
      if (shouldHide) {
        taipeiCityContainer.style.marginLeft = '';
      } else if (!shouldHide) {
        taipeiCityContainer.style.transition = '';
        taipeiCityContainer.style.marginLeft = (page * -100.5) + '%';
      }
    }, 0);
  }

  checkReservation();
  window.addEventListener("resize", checkReservation);

  function setupNavButtons() {
    left.onclick = function () {
      if (page == 0) {
        page = 4;
        taipeiCityContainer.style.transition = 'none';
        taipeiCityContainer.style.marginLeft = (page * -100.5) + '%';
      }
      page--;
      checkReservation();
      left.onclick = null;
    }

    right.onclick = function () {
      page++;
      checkReservation();
      right.onclick = null;
    }
  }

  setupNavButtons();

  taipeiCityContainer.addEventListener('transitionend', () => {
    if (page == 4) {
      page = 0;
      taipeiCityContainer.style.transition = 'none';
      taipeiCityContainer.style.marginLeft = (page * -100.5) + '%';
    }
    setupNavButtons();
  });

}

function handleAboutArrow() {
  document.querySelector('.arrow-icon').onclick = function () {
    jumpSection('#about-title', 0, 500)
  }
}

function handleReservationButton() {
  var lightbox1 = document.querySelector('#lightbox1');
  document.querySelector('#footer-reservation').onclick = function () {
    lightbox1.classList.add('expanded');
  }
}
MYAPP.lastYOffset = 0;
function handleNavbar() {
  var navbar = document.querySelector('.navbar-custom');
  window.addEventListener("scroll", function () {
    var yOffset = window.pageYOffset || document.documentElement.scrollTop;
    if (yOffset > MYAPP.lastYOffset) {
      if (yOffset < 250) {
        if (navbar.style.position == 'fixed') {
          navbar.style.transition = 'none';
          navbar.style.top = yOffset + 'px';
          setTimeout(function () {
            navbar.style.transition = '';
            navbar.style.top = ''
          }, 0);
        }
        navbar.style.position = 'absolute';
      } else {
        if (navbar.style.position == 'absolute') {
          navbar.style.transition = 'none';
          navbar.style.position = 'fixed';
          setTimeout(function () {
            navbar.style.transition = '';
          }, 0);
        }
        navbar.classList.add('minimize');
      }
    } else if (yOffset < MYAPP.lastYOffset) {
      if (navbar.style.position == 'absolute') {
        navbar.style.transition = 'none';
        navbar.style.top = -yOffset + 'px';
        setTimeout(function () {
          navbar.style.transition = '';
          navbar.style.top = ''
        }, 0);
      }
      navbar.style.position = 'fixed';
      navbar.classList.remove('minimize');
    }
    MYAPP.lastYOffset = (yOffset < 0) ? 0 : yOffset;
  }, false);
}