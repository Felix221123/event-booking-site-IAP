$(document).ready(function () {
    console.log("jQuery is working!");

    // Cache elements
    const $hamburgerMenu = $(".hamburger-menu");
    const $nav = $("nav");
    const $closeBtn = $("#close-tbn");
    const $navLinks = $("#my-list-of-headers li a");

    // Animation class or properties
    const animationSettings = {
        duration: 500, // Animation duration (ms)
        easing: "swing", // Easing effect
    };

    // Open menu when hamburger is clicked
    $hamburgerMenu.on("click", function () {
        $nav.slideDown(animationSettings); // Animates the appearance of the nav
    });

    // Close menu when close button is clicked
    $closeBtn.on("click", function () {
        $nav.slideUp(animationSettings); // Animates the disappearance of the nav
    });

    // Close menu when any nav link is clicked
    $navLinks.on("click", function (event) {
        if (window.innerWidth < 768) {
            event.preventDefault(); // Prevent default link behavior
            const targetHref = $(this).attr("href"); // Get the link's href

            // Slide up the menu
            $nav.slideUp(animationSettings.duration, animationSettings.easing, function () {
                // Navigate to the link after the animation completes
                window.location.href = targetHref;
            });
        }
    });

    // Close menu when clicking outside the nav
    $(document).on("click", function (event) {
        if (
            window.innerWidth < 768 &&
            !$nav.is(event.target) && // If the click is NOT on the nav itself
            $nav.has(event.target).length === 0 && // If the click is NOT inside the nav
            !$hamburgerMenu.is(event.target) // If the click is NOT on the hamburger menu
        ) {
            $nav.slideUp(animationSettings);
        }
    });


});
