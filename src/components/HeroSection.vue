<template>
  <section id="home"
    class="relative overflow-hidden scroll-mt-24 min-h-screen flex items-start justify-start pt-32 md:items-center md:justify-center md:pt-20 text-white">
    <!-- 배경 이미지와 오버레이 -->
    <div class="absolute inset-0 w-full h-full min-w-full min-h-full -z-10 overflow-hidden">
      <picture class="absolute inset-0 w-full h-full">
        <source media="(max-width: 768px)" srcset="@/assets/main_heroimage_mobile.png" />
        <img class="video-bg"
          src="@/assets/main_heroimage.png"
          alt="메인 히어로 배경 이미지" />
      </picture>
      <div class="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-15"></div>
      
      <!-- 애니메이션 요소 -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- 움직이는 원형 요소들 -->
        <div v-for="i in 5" :key="`circle-${i}`" 
             class="absolute rounded-full mix-blend-overlay animate-float"
             :class="[
               i % 2 === 0 ? 'bg-[#843088]' : 'bg-[#e87054]',
               i % 3 === 0 ? 'opacity-20' : 'opacity-15'
             ]"
             :style="{
               width: `${100 + i * 50}px`,
               height: `${100 + i * 50}px`,
               top: `${(i * 15) % 80}%`,
               left: `${(i * 20) % 80}%`,
               animationDelay: `${i * 0.5}s`,
               animationDuration: `${10 + i * 2}s`
             }">
        </div>
      </div>
    </div>

    <!-- Hero 내용 -->
    <div class="container px-4 text-left z-10">
      <!-- <div class="inline-block mb-4 py-1 px-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 animate-item fade-in-down">
        <span class="text-white text-sm md:text-base font-medium flex items-center">
          <i class="fas fa-wind mr-2 text-[#e87054]"></i> 성령의 바람을 타고
        </span>
      </div> -->
      
      <h1 class="text-5xl md:text-6xl font-extrabold mb-0 leading-tight shadow-text text-left animate-item fade-in-down" style="animation-delay: 0.2s;">
        <span class="text-white">흩어지는 예배:</span>
        <br>
      </h1>
      <h2 class="text-6xl md:text-7xl font-extrabold mb-5 leading-[1.1] md:leading-tight shadow-text tracking-tighter">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#843088] to-[#e87054] filter brightness-125">
              <span>Spread out!</span><br class="block md:hidden" /><span>Bloom again!</span>
            </span>
          </h2>
      
      <p class="text-xl md:text-2xl mb-8 text-white font-light max-w-3xl leading-tight shadow-text text-left animate-item fade-in-down" style="animation-delay: 0.4s;">
        예배가 예배당에 머무르지 않고 삶의 현장으로 흩어져, 세상 속에서 다시 피어나는 하나님 나라 운동
      </p>
      
      <div class="flex flex-col sm:flex-row justify-start gap-6 mb-10 animate-item fade-in-up" style="animation-delay: 0.6s;">
        <a href="#about"
          class="bg-gradient-to-r from-[#843088] to-[#bb337f] hover:from-[#6b2670] hover:to-[#a02c6f] text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-xl">
          <i class="fas fa-seedling mr-2"></i>더 알아보기
        </a>
        <a href="#events"
          class="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-8 border-2 border-white/70 rounded-full transition duration-300 transform hover:-translate-y-1 backdrop-blur-sm">
          <i class="fas fa-calendar-alt mr-2"></i>예배 일정
        </a>
      </div>
      
      <!-- 간증 카드 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl">
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 animate-item fade-in-left" style="animation-delay: 0.8s;">
          <div class="text-[#e87054] mb-3"><i class="fas fa-quote-left text-2xl"></i></div>
          <p class="text-white text-base md:text-lg mb-4">성령의 바람을 타고 흩어져 나가는 예배를 통해 일상에서 하나님을 만납니다.</p>
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-[#843088] flex items-center justify-center text-white font-bold mr-3">K</div>
            <span class="text-white/80 text-sm">김성령 (서울 공동체)</span>
          </div>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 animate-item fade-in-left" style="animation-delay: 1s;">
          <div class="text-[#bb337f] mb-3"><i class="fas fa-quote-left text-2xl"></i></div>
          <p class="text-white text-base md:text-lg mb-4">흩어지는 예배를 통해 제 삶의 모든 영역이 예배의 자리로 변화되었습니다.</p>
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-[#e87054] flex items-center justify-center text-white font-bold mr-3">L</div>
            <span class="text-white/80 text-sm">이은혜 (부산 공동체)</span>
          </div>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 animate-item fade-in-left" style="animation-delay: 1.2s;">
          <div class="text-[#843088] mb-3"><i class="fas fa-quote-left text-2xl"></i></div>
          <p class="text-white text-base md:text-lg mb-4">다시 피어나는 예배의 기쁨을 일상 속에서 경험하고 있습니다.</p>
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-[#bb337f] flex items-center justify-center text-white font-bold mr-3">P</div>
            <span class="text-white/80 text-sm">박믿음 (제주 공동체)</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 아래로 이동 화살표 버튼 -->
    <button @click="scrollToNextSection"
      class="absolute bottom-8 inset-x-0 mx-auto w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-[#bb337f] flex items-center justify-center hover:bg-[#bb337f]/20 transition duration-300 animate-bounce z-10">
      <i class="fas fa-chevron-down text-2xl text-[#bb337f]"></i>
    </button>
  </section>
</template>

<script>
export default {
  methods: {
    scrollToNextSection() {
      const nextSection = document.getElementById('about');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
</script>

<style scoped>
.video-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw; /* 화면 너비에 맞춤 */
  height: 100vh; /* 화면 높이로 꽉 차도록 */
  transform: translate(-50%, -50%) scale(1);
  pointer-events: none; /* 비디오 위 상호작용 방지 */
  object-fit: cover; /* 컨테이너를 채우도록 비디오 크기 조절 */
}

.shadow-text {
  -webkit-filter: drop-shadow(0 0px 2px rgba(0, 0, 0, 0.5));
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5));
}

.animate-item {
  opacity: 0;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

.fade-in-down {
  animation-name: fadeInDown;
}

.fade-in-up {
  animation-name: fadeInUp;
}

.fade-in-left {
  animation-name: fadeInLeft;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.text-shadow-glow {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .video-bg {
    width: 100vw;
    height: 100vh;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>