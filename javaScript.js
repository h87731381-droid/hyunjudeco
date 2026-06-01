
/* ------------------스크롤 스무스------------------ */
const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);



/* ------------------헤더 숨기기 펼치기-------------------------- */
const header = document.querySelector('header');

let lastDirection = 0;
lenis.on('scroll', ({ direction }) => {
  if (direction !== lastDirection) {
    lastDirection = direction;

    // 아래로 스크롤 → 헤더 숨김
    if (direction === 1) {
      header.classList.add('active');
    }

    // 위로 스크롤 → 헤더 나타남
    if (direction === -1) {
      header.classList.remove('active');
    }
  }
});


/* ------------------헤더 버거메뉴 펼치기-------------------------- */
/* $(".menu").click(function(){
  $(this).toggleClass("open");
}); */




/* ------------------카드 시차 스크롤 (회사소개영역)-------------------------- */
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


gsap.utils.toArray(".parallax").forEach((item, idx) => {

  let speed;

  if (idx % 2 == 0) {
    speed = -30;
  } else {
    speed = 30;
  }

  gsap.to(item, {
    yPercent: speed,
    ease: "none",

    scrollTrigger: {
      trigger: item,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }

  });
});








/* ----------------배경 span 커지기 (사업영역 소개부분)-------------------------- */
const span = document.querySelector('.bizTitle > span');
lenis.on('scroll', ({ scroll }) => {
  const scale = 1 + Math.pow(scroll / 2500, 2.5);
  span.style.transform = `scale(${scale})`;
});




/* ---------------json 반복문하기 (자재유통 부분)-------------------------------- */
fetch('./infoList.json')
  .then(res => res.json())
  .then(data => {
    const infoList = document.querySelector('.infoInner');

    data.forEach(item => {
      infoList.innerHTML += `
      <div class="fixContent">
        <div class="infoText">
          <div class="infoDetail">
            <b>${item.title}</b>
      
            <figure>
              <img src="${item.stepImage}" alt="${item.title}">
              <figcaption>${item.description}</figcaption>
            </figure>
          </div>

          <button>
            <span>자세히보기</span>
          </button>
        </div>
              
        <p>
          <img src="${item.mainImage}" alt="${item.title}">
        </p>
      </div>`;
    });





    const items = gsap.utils.toArray('.fixContent');

    items.forEach((item, i) => {
      const image = item.querySelector('p');
      if (i !== 0) {
        gsap.set(image, {
          opacity: 0
        });
      }

      ScrollTrigger.create({
        trigger: item,
        start: 'top top',

        onEnter: () => {
          gsap.to(image, {
            opacity: 1,
            duration: 0.3
          });
        },

        onLeaveBack: () => {
          if (i !== 0) {
            gsap.to(image, {
              opacity: 0,
              duration: 0.3
            });
          }
        }
      });


      if (i !== 2) {
        ScrollTrigger.create({
          trigger: item,
          start: 'top top',
          end: 'bottom top',
          pin: image,
          pinSpacing: false
        });
      } else {
        ScrollTrigger.create({
          trigger: item,
          start: 'top top',
          end: 'top top',
          pin: image,
          pinSpacing: false
        });
      }
    });
  })






/* ------------------이미지가 마우스 따라오기 (메인 이미지 그림자 부분)-------------------------- */

/* const area = document.querySelector('.mainAbsolute');
const shadow = document.querySelector('.shadow');

area.addEventListener('mousemove', e => {
  const rect = area.getBoundingClientRect();

  gsap.to(shadow, {
    x: (e.clientX - rect.left - rect.width / 2) * 0.03,
    y: (e.clientY - rect.top - rect.height / 2) * 0.03,
    duration: 0.6,
    ease: 'power3.out'
  });
});

area.addEventListener('mouseleave', () => {
  gsap.to(shadow, {
    x: 0,
    y: 0,
    duration: 0.6,
    ease: 'power3.out'
  });
}); */


const box = document.querySelector(".shadow");
const intro = document.querySelector(".intro");

intro.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 50;
  const y = (e.clientY / window.innerHeight - 0.5) * 50;

  gsap.to(box, {
    x,
    y,
    duration: 0.6,
    ease: "power3.out"
  });
});

intro.addEventListener("mouseleave", () => {
  gsap.to(box, {
    x: 0,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
  });
});