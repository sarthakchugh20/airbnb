function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to transform .reveal elements to spans
function revealToSpan() {
    document.querySelectorAll(".reveal").forEach(function (elem) {
        var parent = document.createElement("span");
        var child = document.createElement("span");

        parent.classList.add("parent");
        child.classList.add("child");

        child.innerHTML = elem.innerHTML;
        parent.appendChild(child);

        elem.innerHTML = "";
        elem.appendChild(parent);
    });
}

// Function to set initial values for animation
function valueSetters() {
    gsap.set("#nav a", { y: "-100%", opacity: 0 });
    gsap.set("#home span .child", { y: "100%" });
    gsap.set("#home .row-1 .room-card", { opacity: 0 });
    gsap.set("#home .imagery .row-1", { opacity: 0 });
}

// Function to disable scrolling
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

// Function to enable scrolling
function enableScroll() {
    document.body.style.overflow = 'auto';
}

// Function for loader animation
function loaderAnimation() {
    disableScroll(); // Disable scrolling during loader animation

    var tl = gsap.timeline();

    tl
    .from("#loader .child span", {
        x: 100,
        duration: 1.3,
        stagger: 0.2,
        delay: 1,
        ease: Power3.easeInOut
    })
    .to("#loader .parent .child", {
        y: "-100%",
        duration: 1,
        ease: Circ.easeInOut
    })
    .to("#loader", {
        height: 0,
        duration: 0.6,
        ease: Circ.easeInOut
    })
    .to("#green", {
        top: 0,
        height: "100%",
        duration: 0.6,
        ease: Circ.easeInOut
    }, "-=0.8")
    .to("#green", {
        height: "0%",
        duration: 0.6,
        ease: Circ.easeInOut,
        onComplete: function() {
            animateHomepage();
            enableScroll(); // Enable scrolling after loader animation completes
        }
    }, "-=0.3");
}

// Function to animate homepage elements
function animateHomepage() {
    var tl = gsap.timeline();

    tl
    .to("#nav a", {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: Expo.easeInOut
    })
    .to("#home .parent .child", {
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: Expo.easeInOut,
    }, "-=0.5")
    .to("#home .row-1 .room-card", {
        opacity: 1,
        ease: Expo.easeInOut
    }, "-=0.5")
    .to("#home .imagery  .row-1 ", {
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: Expo.easeInOut,
    }, "-=0.5");
}

// Trigger the animations on page load
document.addEventListener('DOMContentLoaded', function() {
    revealToSpan();
    valueSetters();
    loaderAnimation();
    scrollToTop();
});


// Only enable click flip for touch devices (mobile)
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('click', function () {
      const inner = this.querySelector('.card-inner');
      inner.classList.toggle('flipped');
    });
  });
}
