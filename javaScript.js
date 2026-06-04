
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

    // 위로 스크롤 → 헤더 나타남, 스크롤 상단에 도달 배경 none
    if (direction === -1) {
      header.classList.remove('active');
      if(window.scrollY<50){
        header.style.background = 'none';
      }
      else{
        header.style.background = 'white';
      }
    }
  }
});


/* -------------헤더 버거메뉴 펼치기 토글 (클래스 활성화) jQuery-------------------------- */
$(".menu").click(function () {
  $(".pcMenu").toggleClass("open");
  $(this).toggleClass("open");
  $("body").toggleClass("scrollLock");
});






/* ------------------카드 스크롤 애니 (회사소개영역)-------------------------- */
const mm = gsap.matchMedia(); // 전역 mm 변수

//991px 이상
mm.add("(min-width: 992px)", () => {
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
})

//991px 이하
if (window.innerWidth < 991) {
  const elObserve = document.querySelectorAll('.card');

  let callback = function (entries, observe) {
    entries.forEach(function (item) {
      if (item.isIntersecting) {
        item.target.classList.add('active');
        //observe.unobserve(item.target); //한번만 실행
      } else {
        item.target.classList.remove('active');
      }
    })
  }
  let ob = new IntersectionObserver(callback);
  elObserve.forEach(function (item) {
    ob.observe(item);
  })
}





/* ----------------배경 span 커지기 (사업영역 소개부분)-------------------------- */
const span = document.querySelector('.bizTitle > span');
let scale;

//1200px 이상
mm.add("(min-width: 1200px)", () => {
  lenis.on('scroll', ({ scroll }) => {
    scale = 1 + Math.pow(scroll / 2500, 2.5);
    span.style.transform = `scale(${scale})`;
  });
});

//1199px 이하
mm.add("(max-width: 1199px)", () => {
  lenis.on('scroll', ({ scroll }) => {
    scale = 1 + Math.pow(scroll / 3000, 3);
    span.style.transform = `scale(${scale})`;
  });
});








/* ---------------json 반복문하기 (사업소개 부분)-------------------------------- */
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
      
            <picture>
              <source media="(max-width: 1199px)" srcset="${item.stepImage_m}">
              <img src="${item.stepImage}" alt="${item.title}">
              <div>${item.description}</div>
            </picture>
          </div>

          <button>
            <span>자세히보기</span>
            <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.157 12.711L4.5 18.368L3.086 16.954L8.036 12.004L3.086 7.05401L4.5 5.64001L10.157 11.297C10.3445 11.4845 10.4498 11.7389 10.4498 12.004C10.4498 12.2692 10.3445 12.5235 10.157 12.711Z" fill="currentColor"/>
            </svg>

          </button>
        </div>
              
        <p>
          <img src="${item.mainImage}" alt="${item.title}">
        </p>
      </div>`;
    });



    /* ----------------카드 밑에서 위로 올라오기 (사업소개 부분)----------------------- */
    //1200px 이상
    mm.add("(min-width: 1200px)", () => {
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
          start: 'top center',

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


 

    //1199px 이하
    mm.add("(max-width: 1199px)", () => {

      const items = gsap.utils.toArray('.fixContent .infoText, .fixContent p ');

      items.forEach((item) => {

        gsap.fromTo(item,
          {
            opacity: 0,
            y: 80
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play reverse play reverse"
            }
          }
        );

      });

    });
  })






/* ------------------이미지가 마우스 따라오기 (메인 이미지 그림자 부분)-------------------------- */
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