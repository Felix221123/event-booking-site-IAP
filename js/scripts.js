$(document).ready(function () {
    console.log("jQuery is working!");

    // Cache elements
    const $hamburgerMenu = $(".hamburger-menu");
    const $nav = $("nav");
    const $closeBtn = $("#close-tbn");
    const $navLinks = $("#my-list-of-headers li a");
    const $themeButton = $(".btn-reserve");
    const $increaseFontBtn = $("#increase-font");
    const $decreaseFontBtn = $("#decrease-font");
    const $resetFontBtn = $("#reset-font");

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

    // Function to apply the theme based on mode
    const applyTheme = (mode) => {
        if (mode === "dark") {
            $("body").css({
                "background-color": "#141D2F",
            });
            $(".dark-mode-clr").css("color", "#FFFFFF");
            $(".darkmode-bg-clr").css("background-color", "transparent");

            $themeButton.text("Light ").append('<img src="../assets/svg/sun.svg" alt="sun icon" id="light-icon">');
            localStorage.setItem("theme", "dark");

        } else {
            $("body").css({
                "background-color": "white",
            });
            $(".dark-mode-clr").css("color", "");
            $themeButton.text("Dark ").append('<img src="../assets/svg/moon.svg" alt="moon icon" id="dark-icon">');
            localStorage.setItem("theme", "light");
        }

        // Reapply theme styles to dynamically created buttons
        $(".filter-btn.dark-mode-clr, .more-options.dark-mode-clr option").each(function () {
            if (mode === "dark") {
                $(this).css("color", "#FFFFFF");
                localStorage.setItem("theme", "dark");
            } else {
                $(this).css("color", "");
                localStorage.setItem("theme", "light");
            }
        });
    };

    // Load theme from localStorage on page load
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    // Theme toggle event
    $themeButton.on("click", function () {
        const currentTheme = localStorage.getItem("theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
    });


    // Classes to target for font size adjustments
    const targetClass = ".dark-mode-clr";
    const fontIncrement = 0.025; // 0.3rem increment
    // let defaultFontSize;

    // Function to save current font sizes to localStorage
    const saveFontSizesToLocalStorage = () => {
        const fontSizes = {};
        $(targetClass).each(function (index) {
            const currentFontSize = parseFloat($(this).css("font-size"));
            fontSizes[index] = currentFontSize;
        });
        localStorage.setItem("fontSizes", JSON.stringify(fontSizes));
    };

    // Function to apply saved font sizes from localStorage
    const applySavedFontSizes = () => {
        const savedFontSizes = JSON.parse(localStorage.getItem("fontSizes"));
        if (savedFontSizes) {
            $(targetClass).each(function (index) {
                if (savedFontSizes[index]) {
                    $(this).css("font-size", savedFontSizes[index] + "px");
                }
            });
        }
    };    

    // Initialize default font sizes for each element
    $(targetClass).each(function () {
        const currentFontSize = parseFloat($(this).css("font-size")); // Get current font size in px
        $(this).attr("data-default-font-size", currentFontSize); // Store the default font size as a data attribute
    });

    // Apply saved font sizes on page load
    applySavedFontSizes();

    // Increase font size
    $increaseFontBtn.on("click", function () {
        $(targetClass).each(function () {
            const currentFontSize = parseFloat($(this).css("font-size")); // Get current font size
            const newFontSize = currentFontSize + fontIncrement * 16; // Increase by 0.025rem (converted to px)
            $(this).css("font-size", newFontSize + "px");
        });
        saveFontSizesToLocalStorage(); // Save the updated font sizes
    });

    // Decrease font size
    $decreaseFontBtn.on("click", function () {
        $(targetClass).each(function () {
            const currentFontSize = parseFloat($(this).css("font-size")); // Get current font size
            const newFontSize = currentFontSize - fontIncrement * 16; // Decrease by 0.025rem (converted to px)
            if (newFontSize > 0) { // Prevent font size from going negative
                $(this).css("font-size", newFontSize + "px");
            }
        });
        saveFontSizesToLocalStorage(); // Save the updated font sizes
    });

    // Reset font size
    $resetFontBtn.on("click", function () {
        $(targetClass).each(function () {
            const defaultFontSize = $(this).data("default-font-size"); // Retrieve the default font size from the data attribute
            $(this).css("font-size", defaultFontSize + "px"); // Reset to original font size
        });
        localStorage.removeItem("fontSizes"); // Clear saved font sizes from localStorage
    });

    // Validate Full Name
    $("#fullName").on("input", function () {
        const fullName = $(this).val().trim();
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (fullName === "" | !nameRegex.test(fullName)) {
            $(this).css({ "border-bottom": "2px solid red", "transition": "border-bottom 0.3s ease" });
        } else {
            $(this).css({ "border-bottom": "2px solid green", "transition": "border-bottom 0.3s ease" });
        }
    });

    // Validate Email Address
    $("#email").on("input", function () {
        const email = $(this).val().trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email === "" || !emailRegex.test(email)) {
            $(this).css({ "border-bottom": "2px solid red", "transition": "border-bottom 0.3s ease" });
        } else {
            $(this).css({ "border-bottom": "2px solid green", "transition": "border-bottom 0.3s ease" });
        }
    });

    // Phone Number (Optional)
    $("#phoneNumber").on("input", function () {
        const phoneNumber = $(this).val().trim();
        if (phoneNumber && isNaN(phoneNumber)) {
            $(this).css({ "border-bottom": "2px solid red", "transition": "border-bottom 0.3s ease" });
        } else {
            $(this).css({ "border-bottom": "2px solid green", "transition": "border-bottom 0.3s ease" });
        }
    });

    // Message (Optional)
    $("#message").on("input", function () {
        const message = $(this).val().trim();
        if (message === "") {
            $(this).css({ "border-bottom": "2px solid red", "transition": "border-bottom 0.3s ease" });
        } else {
            $(this).css({ "border-bottom": "2px solid green", "transition": "border-bottom 0.3s ease" });
        }
    });

    // On Submit, Validate All Fields
    $("form").on("submit", function (e) {
        e.preventDefault(); // Prevent form submission

        let isValid = true;

        // Validate Full Name
        const fullName = $("#fullName").val().trim();
        if (fullName === "") {
            isValid = false;
            $("#fullName").css({ "border-bottom": "2px solid red", "transition": "border-bottom 0.3s ease" });
        }

        // Validate Email Address
        const email = $("#email").val().trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email === "" || !emailRegex.test(email)) {
            isValid = false;
            $("#email").css({ "border-bottom": "2px solid red", "transition": "border-bottom 0.3s ease" });
        }

        // Optional fields already handled during input events

        if (isValid) {
            alert("Form submitted successfully!");
            // Uncomment the line below to allow actual form submission
            // this.submit();
        } else {
            alert("Please fill out the required fields before submitting.");
        }
    });


    // Function to create filter buttons
    function createFilterButtons(events) {
        const categories = [...new Set(events.map(event => event.type))]; // Unique categories
        const $filterContainer = $(".filterContainer");

        // Add "All" button
        $filterContainer.append('<button class="filter-btn cursor-pointer dark-mode-clr" data-category="all">All</button>');

        // Add first 3 categories
        categories.slice(0, 5).forEach(category => {
            $filterContainer.append(`<button class="filter-btn cursor-pointer dark-mode-clr" data-category="${category}">${category}</button>`);
        });

        // Add "More" dropdown button
        if (categories.length > 5) {
            const dropdown = `
                <div class="more-categories">
                    <select class="more-options cursor-pointer">
                        <option value="more" disabled selected class="dark-mode-clr">More...</option>
                        ${categories.slice(5).map(cat => `<option value="${cat}" class="dark-mode-clr options-value">${cat}</option>`).join("")}
                    </select>
                </div>
            `;
            $filterContainer.append(dropdown);
        };
    }






    // Fetching data from data.json
    const eventsData = fetch("../data.json");
    eventsData.then((response) => response.json()).then((data) => {
        console.log("here is the data", data.events,);
        // applySavedFontSizes();
        createFilterButtons(data.events);
        applySavedFontSizes();
    });


});
