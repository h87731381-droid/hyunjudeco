
/* 헤더 숨기기 펼치기 */
const header = document.querySelector('header');
let status = {y:0, dy:0, state:true}


window.addEventListener('scroll',function(){
    status.y = window.pageYOffset;
    status.state = (status.dy < status.y) ? true : false;
    status.dy = status.y;


    if(status.state){
        header.classList.add('active');
    }else{
        header.classList.remove('active');
    }
})


/* 이미지가 영역안에서 마우스 따라오기 */
/* const box = document.querySelector(".mainImg");
const shadow = document.querySelector(".shadow");

box.addEventListener("mousemove", (e) => {
  const rect = box.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  shadow.style.left = x - shadow.offsetWidth / 2 + "px";
  shadow.style.top = y - shadow.offsetHeight / 2 + "px";
}); */



/* 스크롤 속도 조절 */
let currentScroll = window.scrollY;
let targetScroll = window.scrollY;
const ease = 0.1; // 🚀 숫자가 작을수록 더 부드럽고 느리게 움직입니다 (0.01 ~ 0.1 추천)

// 1. 휠 이벤트가 발생했을 때 목적지(target) 계산
window.addEventListener('scroll', (e) => {
  e.preventDefault(); // 브라우저의 기본 스크롤 기능 차단
  
  // e.deltaY는 휠을 내릴 때 +, 올릴 때 - 값을 가집니다.
  // 뒤의 숫자(0.5)를 조절하여 한 번에 이동하는 속도/거리를 줄일 수 있습니다.
  targetScroll += 120 * 0.9; 
  
  
  // 스크롤이 화면 범위를 벗어나지 않도록 제한
  //targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
}, { passive: false });

// 2. 부드러운 감속 애니메이션 처리 (Lerp 공식 활용)
function smoothScroll() {
  // 현재 위치를 목적지 위치로 서서히 접근시킴
  currentScroll += (currentScroll) * ease;
  
  // 계산된 위치로 실제 스크롤 이동
  window.scrollTo(0, currentScroll);
  
  // 매 프레임마다 반복 실행
  requestAnimationFrame(smoothScroll);
}

// 애니메이션 시작
// smoothScroll();