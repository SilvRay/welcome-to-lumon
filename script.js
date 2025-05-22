window.addEventListener("DOMContentLoaded", (event) => {
  /***
   *       _____ _____ _____   _____ _      ______   _________     _______  ______
   *      / ____|_   _|  __ \ / ____| |    |  ____| |__   __\ \   / /  __ \|  ____|
   *     | |      | | | |__) | |    | |    | |__       | |   \ \_/ /| |__) | |__
   *     | |      | | |  _  /| |    | |    |  __|      | |    \   / |  ___/|  __|
   *     | |____ _| |_| | \ \| |____| |____| |____     | |     | |  | |    | |____
   *      \_____|_____|_|  \_\\_____|______|______|    |_|     |_|  |_|    |______|
   *
   *
   */
  new CircleType(document.querySelector(".text-lumon-drop"));

  /***
   *       _____  _____         _____
   *      / ____|/ ____|  /\   |  __ \
   *     | |  __| (___   /  \  | |__) |
   *     | | |_ |\___ \ / /\ \ |  ___/
   *     | |__| |____) / ____ \| |
   *      \_____|_____/_/    \_\_|
   *
   *
   */

  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll("[js-chars-animation]").forEach((element) => {
    new SplitType(element, { types: "chars", tagname: "span" });
  });

  //
  // HERO ANIMATION
  //
  const heroSection = document.querySelector(".section_hero");
  const chipImage = document.querySelector(".hero_chip-image");
  const heroHeading = document.querySelector(".hero_heading-image");
  const lumonDropLink = document.querySelector(".wrapper-lumon-drop");

  const heroTl = gsap.timeline();

  heroTl
    .from(heroHeading, {
      scale: 0,
      opacity: 0,
      duration: 1,
    })
    .from(lumonDropLink, {
      opacity: 0,
      duration: 0.5,
    });

  heroSection.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = heroSection.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 2;
    const y = ((e.clientY - top) / height - 0.5) * 2;

    gsap.to(chipImage, {
      rotateY: x * 40, // Inclinaison horizontale
      rotateX: -y * 40, // Inclinaison verticale
      duration: 0.3,
      ease: "power2.out",
    });
  });

  heroSection.addEventListener("mouseleave", () => {
    gsap.to(chipImage, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  //
  // WELCOME SECTION ANIMATION
  //
  const welcomeSection = document.querySelector(".section_welcome");
  const unitedTextChars = document.querySelectorAll(
    ".welcome_united-text .char"
  );
  const welcomeTl = gsap.timeline({
    scrollTrigger: {
      trigger: welcomeSection,
      start: "top 90%",
    },
  });

  welcomeTl
    .from(".welcome_heading-char", {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
    })
    .fromTo(
      unitedTextChars,
      {
        opacity: 0,
      },
      {
        duration: 0.25,
        opacity: 1,
        stagger: 0.125,
        ease: "power1.In",
      }
    );

  //
  // MACRODATA REFINEMENT
  //

  const mdrLinks = document.querySelectorAll(".mdr_link");
  const mdrTitleChars = document.querySelectorAll(".mdr_title .char");
  const mdrImages = document.querySelectorAll(".mdr_img");
  const mdrSection = document.querySelector(".section_mdr");
  let mm = gsap.matchMedia();

  mm.add("(min-width: 1025px)", () => {
    // 🎯 Mode Desktop : Effet au survol
    mdrLinks.forEach((link, i) => {
      const textLinkChars = link.querySelectorAll(".mdr_link-text .char");
      const correspondingImg = mdrImages[i];

      link.addEventListener("mouseenter", function () {
        animateText(textLinkChars, mdrTitleChars, correspondingImg, true);
      });

      link.addEventListener("mouseleave", function () {
        animateText(textLinkChars, mdrTitleChars, correspondingImg, false);
      });
    });
  });

  mm.add("(max-width: 1024px)", () => {
    // 🎯 Mode Mobile/Tablette : Défilement automatique + Animation des noms
    let currentIndex = 0;
    let interval;

    function showNextImage() {
      // 🔥 Reset toutes les images et textes
      gsap.to(mdrImages, { opacity: 0, duration: 0.8, ease: "power1.inOut" });
      gsap.to(".mdr_link-text .char", {
        yPercent: 0,
        duration: 0.6,
        ease: "power3.inOut",
        stagger: 0.05,
      });

      // 🔥 Affichage de la nouvelle image (ajout d'un léger délai)
      gsap.to(mdrImages[currentIndex], {
        opacity: 1,
        duration: 0.8,
        ease: "power1.inOut",
        delay: 0.2,
      });

      // 🔥 Animation du texte avec décalage pour plus de fluidité
      const textLinkChars = mdrLinks[currentIndex].querySelectorAll(
        ".mdr_link-text .char"
      );
      gsap.to(textLinkChars, {
        yPercent: -100,
        duration: 0.8, // Allongement de la durée
        ease: "power3.inOut",
        stagger: 0.06, // Plus de fluidité entre les lettres
        delay: 0.3, // Décalage pour correspondre au changement d'image
      });

      currentIndex = (currentIndex + 1) % mdrImages.length;
    }

    ScrollTrigger.create({
      trigger: mdrSection,
      start: "top bottom", // Déclenchement quand 80% de la section est visible
      onEnter: () => {
        if (!interval) {
          showNextImage(); // Affiche immédiatement la première image
          interval = setInterval(showNextImage, 2500); // Temps ajusté pour éviter un rythme trop rapide
        }
      },
      onEnterBack: () => {
        if (!interval) {
          showNextImage();
          interval = setInterval(showNextImage, 2500);
        }
      },
    });
  });

  // Fonction pour animer le texte et l'image
  function animateText(textLinkChars, titleChars, image, isActive) {
    gsap.to(textLinkChars, {
      yPercent: isActive ? -100 : 0,
      duration: 0.5,
      ease: "power3.inOut",
      stagger: 0.03,
    });

    gsap.to(titleChars, {
      yPercent: isActive ? 200 : 0,
      duration: 0.5,
      ease: "power3.inOut",
      stagger: 0.03,
    });

    gsap.to(image, {
      opacity: isActive ? 1 : 0,
      duration: 0.5,
      ease: "power1.inOut",
    });
  }

  //
  // A SEVERED STORY
  //
  let sections = gsap.utils.toArray("[section]");

  let panels = gsap.utils.toArray(".severed-story_wrapper .panel");

  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".severed-story_wrapper",
      start: "top top",
      end: "+=" + innerWidth * (panels.length - 1),
      pin: true,
      scrub: 1,
    },
  });

  //
  // TESTING FLOOR ANIMATION
  //
  let testingFloorTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".container-bar",
      start: "top 136px",
      end: "+=400",
      scrub: true,
      pin: true,
    },
  });

  testingFloorTL.from(".testing-floor_bar-box", {
    visibility: "hidden",
    duration: 0.01, // juste une petite durée pour un effet de bascule vu que visibility n'est pas vraiment animable
    stagger: 0.5,
  });

  // Créer un objet proxy pour tweener la valeur numérique et l'insérer dans l'innerText de l'élément de pourcentage en utilisant onUpdate()
  let percentageProxy = { value: 0 };
  let percentageEl = document.querySelector(".testing-floor_percentage");
  testingFloorTL.to(
    percentageProxy,
    {
      value: 100,
      onUpdate: () => {
        percentageEl.innerText = Math.round(percentageProxy.value) + "%";
      },
      duration: testingFloorTL.duration(), // pour matcher l'avancée du chargement au scroll
    },
    0
    // <- pour que ça puisse commencer en même temps que le chargement
  );

  //
  // 9 PRINCIPLES ANIMATION
  //
  const principlesSection = document.querySelector(".section_principles");
  gsap.from(".principles_image-wrapper", {
    width: "0vw",
    height: "0vh",

    scrollTrigger: {
      trigger: principlesSection,
      start: "top center",
      end: "bottom 80%",
      scrub: true,
    },
  });

  gsap.from(".principles_name", {
    opacity: 0,

    scrollTrigger: {
      trigger: ".principles_wrapper-names",
      start: "top center",
      end: "bottom 75%",
      scrub: true,
      toggleActions: "play pause resume reverse",
    },
  });

  //
  // KIER ANTHEM ANIMATION
  //
  setTimeout(() => {
    document.querySelectorAll(".anthem_lyrics").forEach((element) => {
      animateTextLines(element);
    });
  }, 700);

  function animateTextLines(textElement) {
    gsap.set(textElement, { autoAlpha: 1 });
    let originalText = textElement.textContent;
    let anthemTl;

    function splitText() {
      new SplitType(textElement, { types: "lines", tagname: "span" });
      textElement.querySelectorAll(".line").forEach((line) => {
        let lineContent = line.innerHTML;
        line.innerHTML = `<span class="line-inner" style="display: block;">${lineContent}</span>`;
      });
      anthemTl = gsap.timeline({
        scrollTrigger: {
          trigger: textElement,
          start: "top bottom",
          end: "bottom bottom",
          toggleActions: "none play none reset",
        },
      });
      anthemTl.fromTo(
        textElement.querySelectorAll(".line-inner"),
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.6,
          stagger: { amount: 0.4, ease: "power1.out" },
        }
      );
    }
    splitText();

    let windowWidth = window.innerWidth;
    window.addEventListener("resize", (event) => {
      if (windowWidth !== window.innerWidth) {
        windowWidth = window.innerWidth;
        tl.kill();
        textElement.textContent = originalText;
        splitText();
      }
    });
  }

  //
  // LUMON CARDS ANIMATION
  //
  let lumonCardsTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_anthem-cards",
      start: "top 10%",
      end: "bottom 50%",
      toggleActions: "play pause resume reverse",
    },
  });
  lumonCardsTl.from(".lumon-card", {
    opacity: 0,
    scale: 0.8,
    duration: 0.15,
    stagger: { each: 0.4 },
  });

  //
  // BREAKROOM ANIMATION
  //
  // const breakroomSection = document.querySelector(".section_breakroom");
  // const breakroomContentWrapper = document.querySelector(
  //   ".breakroom_content-wrapper"
  // );

  // gsap.to(breakroomContentWrapper, {
  //   y: () => window.innerHeight - breakroomContentWrapper.clientHeight - 64,
  //   ease: "none",
  //   scrollTrigger: {
  //     trigger: breakroomSection,
  //     pin: true,
  //     start: "top top",
  //     end: () => "+=1000",
  //     scrub: 0.5,
  //     invalidateOnRefresh: true,
  //   },
  // });

  // let tl2 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".breakroom_heading",
  //     // onEnter, onLeave, onEnterBack, onLeaveBack
  //     toggleActions: "restart resume complete reset",
  //   },
  // });
  // tl2
  //   .from(".breakroom_heading", {
  //     xPercent: -100,
  //     opacity: 0,
  //     duration: 1,
  //     ease: "power1.inOut",
  //   })
  //   .from(
  //     ".breakroom_image",
  //     {
  //       xPercent: -100,
  //       opacity: 0,
  //       duration: 1,
  //       ease: "power1.inOut",
  //     },
  //     "<0.3"
  //   );

  //
  // 4 TEMPERS ANIMATION
  //
  gsap.utils.toArray(".tempers_wrapper-content").forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "top top",
      pin: true,
      pinSpacing: false,
    });
  });
});
