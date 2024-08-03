document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector(".nav"),
    searchIcon = document.querySelector("#searchIcon"),
    navOpenBtn = document.querySelector(".navOpenBtn"),
    navCloseBtn = document.querySelector(".navCloseBtn"),
    profileDetails = document.querySelector(".profile-details"),
    searchPages = ['/noticias', '/parceiros', '/empregos', '/eventos', '/contato'];

  function shouldShowSearch() {
    const currentPath = window.location.pathname;
    return searchPages.includes(currentPath);
  }

  function updateSearchVisibility() {
    if (searchIcon) {
      if (shouldShowSearch()) {
        searchIcon.style.display = 'block';
        document.querySelector('.search-box').style.display = 'block';
      } else {
        searchIcon.style.display = 'none';
        document.querySelector('.search-box').style.display = 'none';
      }
    }
  }

  updateSearchVisibility();

  if (searchIcon) {
    searchIcon.addEventListener("click", () => {
      nav.classList.toggle("openSearch");
      nav.classList.remove("openNav");
      if (nav.classList.contains("openSearch")) {
        searchIcon.classList.replace("uil-search", "uil-times");
      } else {
        searchIcon.classList.replace("uil-times", "uil-search");
      }
    });
  }

  if (navOpenBtn) {
    navOpenBtn.addEventListener("click", () => {
      nav.classList.add("openNav");
      nav.classList.remove("openSearch");
      if (searchIcon) {
        searchIcon.classList.replace("uil-times", "uil-search");
      }
    });
  }

  if (navCloseBtn) {
    navCloseBtn.addEventListener("click", () => {
      nav.classList.remove("openNav");
    });
  }

  if (profileDetails) {
    profileDetails.addEventListener('click', toggleCombobox);
  }

  function toggleCombobox() {
    const combobox = document.getElementById("profileCombobox");
    const icon = profileDetails.querySelector(".bx-chevron-down, .bx-chevron-up");

    if (combobox && icon) {
      if (combobox.classList.contains("show")) {
        combobox.classList.remove("show");
        icon.classList.remove("bx-chevron-up");
        icon.classList.add("bx-chevron-down");

        setTimeout(() => {
          combobox.style.display = "none";
        }, 300); 
      } else {
        combobox.style.display = "block";

        combobox.offsetHeight;

        combobox.classList.add("show");
        icon.classList.remove("bx-chevron-down");
        icon.classList.add("bx-chevron-up");
      }
    }
  }
});
