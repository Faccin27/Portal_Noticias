const nav = document.querySelector(".nav"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");
  profileDetails = document.querySelector(".profile-details");

searchIcon.addEventListener("click", () => {
  nav.classList.toggle("openSearch");
  nav.classList.remove("openNav");
  if (nav.classList.contains("openSearch")) {
    return searchIcon.classList.replace("uil-search", "uil-times");
  }
  searchIcon.classList.replace("uil-times", "uil-search");
});

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  nav.classList.remove("openSearch");
  searchIcon.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});



function toggleCombobox() {
    var combobox = document.getElementById("profileCombobox");
    var icon = document.querySelector(".bx-chevron-down, .bx-chevron-up");
  
    if (combobox.classList.contains("show")) {
      combobox.classList.remove("show");
      icon.classList.remove("bx-chevron-up");
      icon.classList.add("bx-chevron-down");
  
      // Aguarda o fim da animação antes de esconder completamente
      setTimeout(() => {
        combobox.style.display = "none";
      }, 300); // 300ms é a duração da animação no CSS
    } else {
      combobox.style.display = "block";
  
      // Força um reflow para que a transição funcione
      combobox.offsetHeight;
  
      combobox.classList.add("show");
      icon.classList.remove("bx-chevron-down");
      icon.classList.add("bx-chevron-up");
    }
  }