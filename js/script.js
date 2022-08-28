// Add shadow to header when scrolling
const header = document.getElementById("header");
const SECTION_CHECK_OFFSET = window.innerHeight / 2;

// Change active nav-link when scrolling
const sections = document.querySelectorAll("section");
const homeSection = document.getElementById("home");
const navLinks = document.querySelectorAll("header .nav-links .nav-link");

const openMenu = document.getElementById("menu-btn");
const closeMenu = document.getElementById("close-btn");
const navMenu = document.getElementById("nav-menu");

const updateHeaderLinkState = (current) => {
  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.classList.contains(current)) {
      link.classList.add("active");
    }
  });
};

const checkHeaderLink = () => {
  let current = "";

  if (window.scrollY === 0) {
    current = "home";
  } else {
    sections.forEach((section) => {
      const bbox = section.getBoundingClientRect();
      const isSectionAboveViewport = bbox.top < SECTION_CHECK_OFFSET;

      if (isSectionAboveViewport) {
        current = section.id;
      }
    });
  }

  updateHeaderLinkState(current);
};

const handleScroll = () => {
  checkHeaderLink();

  const method = window.scrollY > 0 ? "add" : "remove";
  header.classList[method]("active");
};

window.addEventListener("scroll", handleScroll);

const openSidebarMenu = () => {
  navMenu.classList.add("active");
};

const closeSidebarMenu = () => {
  navMenu.classList.remove("active");
};

openMenu.addEventListener("click", openSidebarMenu);
closeMenu.addEventListener("click", closeSidebarMenu);

const handleMenuClose = (event) => {
  const { target } = event;

  if (!target.parentNode) return;

  if (target.parentNode.classList.contains("nav-link")) {
    closeSidebarMenu();
  }
};
navMenu.addEventListener("click", handleMenuClose);
