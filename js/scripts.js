$(document).ready(function () {
    console.log("jQuery is working!");
    console.log("Event details page is working!");

    // Cache elements
    const $hamburgerMenu = $(".hamburger-menu");
    const $nav = $("nav");
    const $closeBtn = $("#close-tbn");
    const $navLinks = $("#my-list-of-headers li a");
    const $themeButton = $(".btn-reserve");
    const $increaseFontBtn = $("#increase-font");
    const $decreaseFontBtn = $("#decrease-font");
    const $resetFontBtn = $("#reset-font");
    const $eventContainer = $(".eventsContainer");
    const $sortButton = $(".sortContainer");
    const $searchTitle = $("#eventtitle");
    const $searchPlace = $("#place");
    const $preloader = $(".preloader-container");
    const $searchResultsContainer = $(".searchResultsContainer");

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

        $filterContainer.empty();

        // Add "All" button
        $filterContainer.append('<button class="filter-btn cursor-pointer dark-mode-clr activeCategory" data-category="all">All</button>');

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


        // Add event listeners for filters
        $(".filter-btn").on("click", function () {
            $(".filter-btn").removeClass("activeCategory"); // Remove active class
            $(this).addClass("activeCategory"); // Add active class to clicked button
            const selectedCategory = $(this).data("category");
            filterByCategory(selectedCategory); // Filter events
        });

        $(".more-options").on("change", function () {
            const selectedCategory = $(this).val();
            $(".filter-btn").removeClass("activeCategory"); // Remove active class
            $(`.filter-btn[data-category='${selectedCategory}']`).addClass("activeCategory"); // Add active class
            filterByCategory(selectedCategory); // Filter events
        });
    }

    let events = []; // Will hold all event data
    let filteredEvents = []; // Will hold the filtered event list
    let isAscending = true; // For toggling sort order


    // Function to display events
    const displayEvents = (eventsToDisplay) => {
        $eventContainer.empty(); // Clear existing events
        eventsToDisplay.slice(0, 24).forEach((event) => {
            const eventHTML = `
                <a class="event-card" href="./event-details.html?id=${event.id}" target="_blank">
                    <div class="event-image-container">
                        <img src="${event.images[0]?.url || ''}" alt="${event.images[0]?.alt || 'Event Image'}" class="event-image">
                    </div>
                    <div class="event-info">
                        <div class="event-date">
                            <span class="month dark-mode-clr">${event.date.month.slice(0, 3)}</span>
                            <span class="day">${event.date.day}</span>
                            <span class="year dark-mode-clr">${event.date.year}</span>
                        </div>
                        <div class="event-details">
                            <h3 class="event-title dark-mode-clr">${event.name}</h3>
                            <p class="event-description dark-mode-clr"> Organised by ${event.organizer.name}</p>
                        </div>
                    </div>
                </a>
            `;
            $eventContainer.append(eventHTML);
        });

        // Apply saved font sizes on page load
        applySavedFontSizes();

        // Reapply theme after creating buttons
        const currentTheme = localStorage.getItem("theme") || "light";
        applyTheme(currentTheme);

    };

    // Function to filter events by category
    const filterByCategory = (category) => {
        if (category === "all") {
            filteredEvents = events;
        } else {
            filteredEvents = events.filter((event) => event.type === category);
        }
        displayEvents(filteredEvents);
    };

    // Function to sort events by date
    const sortByDate = () => {
        filteredEvents.sort((a, b) => {
            const dateA = new Date(`${a.date.month} ${a.date.day}, ${a.date.year}`);
            const dateB = new Date(`${b.date.month} ${b.date.day}, ${b.date.year}`);
            return isAscending ? dateA - dateB : dateB - dateA;
        });
        isAscending = !isAscending; // Toggle sort order
        displayEvents(filteredEvents);
    };

    // Event listener for sort button
    $sortButton.on("click", function () {
        // Remove activeCategory class from all buttons
        $(".filter-btn, .sortContainer").removeClass("activeCategory");

        // Add activeCategory class to the clicked button
        $(this).addClass("activeCategory");

        // Call the sortByDate function
        sortByDate();
    });


    // display event search results
    let typingTimer; // Timer identifier
    const typingDelay = 300; // 500ms delay after user stops typing

    // Function to show the preloader
    const showPreloader = () => {
        $preloader.show();
        $searchResultsContainer.hide();
        $eventContainer.hide();
    };

    // Function to hide the preloader
    const hidePreloader = () => {
        $preloader.hide();
        $searchResultsContainer.show();
    };

    // Function to reset to initial state (no search results)
    const resetToInitialState = () => {
        $searchResultsContainer.empty();
        $searchResultsContainer.hide();
        $eventContainer.show();
    };

    // Function to display search results
    const displaySearchResults = (results, query) => {
        $searchResultsContainer.empty(); // Clear previous results

        if (results.length === 0) {
            // Display "No results" message
            $searchResultsContainer.append(`
                <div class="no-results">
                    Found 0 results for "${query}"
                </div>
            `);
        } else {
            // Display matched results
            results.forEach((event) => {
                const eventHTML = `
                <a class="event-card dark-mode-clr" href="./event-details.html?id=${event.id}" target="_blank">
                    <img src="${event.images[0]?.url || ''}" alt="${event.images[0]?.alt || 'Event Image'}" class="event-image">
                    <div class="event-info">
                        <div class="event-date">
                            <span class="month dark-mode-clr">${event.date.month.slice(0, 3)}</span>
                            <span class="day">${event.date.day}</span>
                            <span class="year dark-mode-clr">${event.date.year}</span>
                        </div>
                        <div class="event-details">
                            <h3 class="event-title dark-mode-clr">${event.name}</h3>
                            <p class="event-description dark-mode-clr"> Organised by ${event.organizer.name}</p>
                        </div>
                    </div>
                </a>
                `;
                $searchResultsContainer.append(eventHTML);
            });
        }
    };

    // Function to perform search
    const searchEvents = () => {
        showPreloader(); // Show preloader while searching

        // Get search inputs
        const titleQuery = $searchTitle.val().trim().toLowerCase();
        const placeQuery = $searchPlace.val().trim().toLowerCase();

        // Filter events by title and place
        const filteredResults = events.filter((event) => {
            const matchesTitle = event.name.toLowerCase().includes(titleQuery);
            const matchesPlace = event.venue?.address?.toLowerCase().includes(placeQuery) || event.venue?.name?.toLowerCase().includes(placeQuery);
            return matchesTitle || matchesPlace;
        });

        // Simulate a delay to mimic loading
        setTimeout(() => {
            hidePreloader(); // Hide preloader
            if (titleQuery || placeQuery) {
                $eventContainer.hide(); // Hide initial events when searching
                displaySearchResults(filteredResults, `${titleQuery} ${placeQuery}`.trim()); // Display results
            } else {
                resetToInitialState(); // Reset to initial state if search is cleared
            }
        }, typingDelay);
    };

    // Event listener for search inputs
    $searchTitle.add($searchPlace).on("input", function () {
        clearTimeout(typingTimer); // Clear the previous timer
        typingTimer = setTimeout(searchEvents, typingDelay); // Start a new timer
    });


    // retrieving the id results for the event details page
    // Fetch event data and display event details
    const fetchAndDisplayEventDetails = async () => {
        try {
            const response = await fetch("../data.json"); // Adjust the path as needed
            const data = await response.json();
            const events = data.events; // Assuming you have the events data here

            const getQueryParams = () => {
                const params = {};
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                urlParams.forEach((value, key) => {
                    params[key] = value;
                });
                console.log("Query parameters:", params);
                return params;
            };

            // Extract the query parameters
            const queryParams = getQueryParams();
            const eventId = queryParams.id; // Get the event ID
            console.log("Event ID:", eventId);


            if (!eventId) {
                $(".event-details-container").html(`<p>No event details found.</p>`);
                return;
            }

            // Find the event with the matching ID
            const event = events.find((e) => e.id === eventId);

            console.log(`Event URL: ./event-details.html?id=${event.id}`);

            if (!event) {
                $(".event-details-container").html(`<p>No event details found for the given ID.</p>`);
                return;
            }

            // Populate the event details page with data
            $(".event-details-container").html(`
                <div class="event-details-card">
                    <div class="event-image-container">
                        <img src="${event.images[0]?.url || ''}" alt="Event Image" class="event-image">
                    </div>
                    <div class="infoContainer">
                        <div class="event-info">
                            <div class="headerContainer">
                                <h1 class="event-title dark-mode-clr">${event.name}</h1>
                                <p class="about-this-event dark-mode-clr">About this event</p>
                                <p class="event-description">${event.description}</p>
                            </div>
                            <div class="eventOrganizerContainer">
                                <p class="event-organizer">Organised by ${event.organizer.name}</p>
                            </div>
                            <div class="eventDateContainer">
                                <article class="headerText dark-mode-clr">Date and Time</article>
                                <p class="event-date">${event.date.day} ${event.date.month} ${event.date.year}</p>
                                <p class="event-time">${event.time}</p>
                            </div>
                            <div class="event-venueContainer">
                                <article class="headerText dark-mode-clr">Location</article>
                                <p class="event-venue">${event.venue?.name || 'Venue not available'}</p>
                                <p class="event-venue">${event.venue?.address || 'Address not available'}</p>
                            </div>
                        </div>
                        <div class="event-tickets">
                            <article class="headerText">Tickets</article>
                            <p class="ticket-price">
                                ${parseFloat(event.ticket.price) > 0
                                                    ? `${event.ticket.price} ${event.ticket.currency || 'USD'}`
                                                    : 'Free'
                                }
                            </p>

                            <button class="btn buy-tickets"> <a href="${event.event_link}" target="_blank">Reserve a spot</a></button>
                        </div>
                    </div>
                </div>
            `);

            // reapply theme
            const currentTheme = localStorage.getItem("theme") || "light";
            applyTheme(currentTheme);

        } catch (error) {
            console.error("Error fetching event data:", error);
            $(".event-details-container").html(`<p>Error loading event details. Please try again later.</p>`);
        }
    };



    // Fetching data from data.json
    const fetchEvents = async () => {
        try {
            const response = await fetch("../data.json"); // Fetch the data
            const data = await response.json(); // Parse JSON
            console.log("here is the data", data.events);

            events = data.events; // Store events globally
            filteredEvents = events; // Initialize filtered events

            createFilterButtons(events); // Create filters
            filterByCategory("all"); // Display all events initially

            // Apply saved font sizes on dynamically created elements
            $(targetClass).each(function () {
                const currentFontSize = parseFloat($(this).css("font-size")); // Get current font size in px
                $(this).attr("data-default-font-size", currentFontSize); // Store the default font size as a data attribute
            });

            // Apply saved font sizes on page load
            applySavedFontSizes();

            // Reapply theme after creating buttons
            const currentTheme = localStorage.getItem("theme") || "light";
            applyTheme(currentTheme);
        } catch (error) {
            console.error("Error fetching events:", error); // Log error for debugging
        }
    };



    fetchEvents();
    fetchAndDisplayEventDetails();

    // Hide preloader on initial load
    $preloader.hide();
    $searchResultsContainer.hide();



});
