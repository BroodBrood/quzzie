function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

document.getElementById('mainContainer').addEventListener('click', function(event) {
    if (event.target.id === 'logoImg') {
        event.preventDefault(); // Prevent the default link behavior

        var logoImg = document.getElementById('logoImg');
        logoImg.style.transform = 'translateY(-100%)'; // Slide up animation
        
        setTimeout(function() {
            window.location.href = event.currentTarget.querySelector('#logoLink').href; // Redirect after animation
        }, 1000); // Adjust this value to set the cooldown period
    }
});
