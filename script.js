const toggleButton = document.getElementById("mode-btn");
const body = document.body;

function toggleTheme() {
    // Check if the body has the 'dark-mode' class
    if (body.classList.contains("dark-mode")) {
        // If it does, remove it (switch to light mode)
        body.classList.remove("dark-mode");
        toggleButton.innerText = "Dark Mode";
    } else {
        // If it doesn't, add it (switch to dark mode)
        body.classList.add("dark-mode");
        toggleButton.innerText = "Light Mode";
       
    }
}

toggleButton.addEventListener("click", toggleTheme);