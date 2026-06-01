
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
 if(i !==0){
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
       if(i !==0){
          gsap.to(image, {
            opacity: 0,
            duration: 0.3
          });
       }
    }
  });


   if(i !==2){
    ScrollTrigger.create({
      trigger: item,
      start: 'top top',
      end: 'bottom top',
      pin: image,
      pinSpacing: false
    });
  }else{
    ScrollTrigger.create({
      trigger: item,
      start: 'top top',
      end: 'top top',
      pin: image,
      pinSpacing: false
    });
  }

  
});



    /* ------------------카드 겹치기 (자재유통 부분)-------------------------- */
    const listItems = document.querySelectorAll('.fixContent > p');
    // p가 처음에는 opacity가 0이었다가, 스크롤이 일정 지점에 도달하면 opacity가 1로 바뀌고 위치를 fix하여 화면 상단에 고정시키고 다음 p가 나타나면 앞전 p위에 겹쳐지는 효과

    // function cardOverlap() {
    //   const trigger = window.innerHeight * 0.75;

    //   listItems.forEach((item, index) => {
    //     const rect = item.getBoundingClientRect();

    //     item.style.zIndex = index + 1;

    //     if (rect.top <= trigger) {
    //       item.classList.add('active');
    //     } else {
    //       item.classList.remove('active');
    //     }
    //   });
    // }

    // window.addEventListener('scroll', cardOverlap);
    // cardOverlap();
  })