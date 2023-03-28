const menuToggle = document.querySelector(".menu-toggle");
const menuList = document.querySelector(".menu-list");
const menuItems = document.querySelectorAll(".menu-list li a");
const content = document.querySelector(".content");
const links = document.querySelectorAll(".link");

gsap.fromTo(
  ".box",
  {
    y: -100,
  },
  {
    y: 100,
    scrollTrigger: {
      trigger: ".box",
      scrub: true,
    },
  }
);

const handleMenuOpen = () => {
  menuList.classList.add("open");
  gsap.set(document.body, { overflow: "hidden" });
  gsap.set(content, { willChange: "transform, clip-path" });
  gsap.set(menuToggle, {
    top: window.scrollY,
  });

  requestIdleCallback(
    () => {
      gsap.fromTo(
        menuList,
        { height: 0 },
        { height: "auto", duration: 1, ease: "power3.inOut" }
      );

      gsap.set(content, {
        transformOrigin: `left ${window.scrollY + window.innerHeight / 2}px`,
      });

      gsap.to(content, {
        x: "40vw",
        scale: 0.9,
        duration: 1,
        ease: "power3.inOut",
      });

      gsap.fromTo(
        content,
        {
          clipPath: `inset(${window.scrollY}px 0 ${
            content.scrollHeight - (window.scrollY + window.innerHeight)
          }px round 0px)`,
        },
        {
          duration: 1,
          ease: "power3.inOut",
          clipPath: `inset(${window.scrollY}px 0 ${
            content.scrollHeight - (window.scrollY + window.innerHeight)
          }px round 30px)`,
          onStart: () => {
            menuToggle.classList.add("do-not-handle-events");
          },
          onComplete: () => {
            menuToggle.classList.remove("do-not-handle-events");
          },
        }
      );
    },
    { timeout: 100 }
  );
};

const handleMenuClose = () => {
  gsap.set(content, { willChange: "auto" });

  gsap.to(menuList, {
    height: 0,
    duration: 1,
    ease: "power3.inOut",
    onComplete: function () {
      menuList.classList.remove("open");
      content.style.transform = "none";
    },
  });

  gsap.to(content, {
    x: 0,
    y: 0,
    scale: 1,
    duration: 1,
    ease: "power3.inOut",
    onComplete: () => {
      content.style.transform = "none";
      gsap.set(document.body, { overflow: "visible" });
      gsap.set(menuToggle, {
        top: "auto",
      });
    },
  });

  gsap.fromTo(
    content,
    {
      clipPath: `inset(${window.scrollY}px 0 ${
        content.scrollHeight - (window.scrollY + window.innerHeight)
      }px round 30px)`,
    },
    {
      duration: 1,
      ease: "power3.inOut",
      clipPath: `inset(${window.scrollY}px 0 ${
        content.scrollHeight - (window.scrollY + window.innerHeight)
      }px round 0px)`,
      onStart: () => {
        menuToggle.classList.add("do-not-handle-events");
      },
      onComplete: () => {
        gsap.set(content, { clipPath: "none" });
        menuToggle.classList.remove("do-not-handle-events");
      },
    }
  );
};

menuToggle.addEventListener("click", function () {
  if (menuList.classList.contains("open")) {
    handleMenuClose();
  } else {
    handleMenuOpen();
  }
});

menuItems.forEach(function (item) {
  item.addEventListener("click", function () {
    gsap.to(menuList, {
      height: 0,
      duration: 1,
      ease: "power3.inOut",
      onComplete: function () {
        menuList.classList.remove("open");
      },
    });
    gsap.to(content, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.inOut",
    });
  });
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    handleMenuClose();
  });
});
