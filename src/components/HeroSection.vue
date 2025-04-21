<template>
  <section id="home"
    class="relative overflow-hidden scroll-mt-24 min-h-screen flex items-start justify-start pt-32 md:items-center md:justify-center md:pt-20 text-white">
    <!-- 유튜브 배경 영상 -->
    <div class="absolute inset-0 w-full h-full min-w-full min-h-full -z-10 overflow-hidden">
      <iframe class="video-bg"
        src="https://www.youtube.com/embed/KL8hFr93sqc?autoplay=1&mute=1&controls=0&loop=1&playlist=KL8hFr93sqc&modestbranding=1&showinfo=0"
        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen title="YouTube video background"></iframe>
      <div class="absolute inset-0 bg-black bg-opacity-60"></div>
    </div>

    <!-- Hero 내용 -->
    <div class="container px-4 text-left z-10">
      <h1 class="text-4xl md:text-7xl font-extrabold mb-6 text-white leading-tight shadow-text text-left animate-item fade-in-down">
        흩어지는교회:
        <br>
        <span class="text-teal-300">일상에서 살아내는 신앙</span>
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-white font-light max-w-3xl leading-relaxed shadow-text text-left animate-item fade-in-down" style="animation-delay: 0.3s;">
        건물을 넘어, 삶의 모든 영역에서 함께하는 하나님 나라 운동.
      </p>
      <div class="flex flex-col sm:flex-row justify-start gap-6 mb-7 animate-item fade-in-up" style="animation-delay: 0.6s;">
        <a href="#about"
          class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
          더 알아보기
        </a>
        <a href="#events"
          class="bg-transparent hover:bg-white hover:text-teal-500 text-white font-bold py-3 px-6 border-2 border-white rounded-full transition duration-300">
          행사 일정
        </a>
      </div>
      <!-- 신앙 간증 정사각형 3개 -->
      <div class="flex flex-row gap-6">
        <div class="w-40 h-40 bg-transparent border border-amber-200 flex flex-col items-center justify-center p-6 md:p-4 hover:border-amber-300 transition-colors duration-300 animate-item fade-in-left" style="animation-delay: 0.9s;">
          <span class="text-white text-sm md:text-base text-center mb-2">"기도할 때마다 평안이 찾아옵니다."</span>
          <span class="text-white text-xs md:text-sm text-center opacity-80">- 홍길동(44교구)</span>
        </div>
        <div class="w-40 h-40 bg-transparent border border-teal-200 flex flex-col items-center justify-center p-6 md:p-4 hover:border-teal-300 transition-colors duration-300 animate-item fade-in-left" style="animation-delay: 1.1s;">
          <span class="text-white text-sm md:text-base text-center mb-2">"하나님의 사랑을 경험하며 새 삶을 살고 있어요."</span>
          <span class="text-white text-xs md:text-sm text-center opacity-80">- 이은혜(23교구)</span>
        </div>
        <div class="w-40 h-40 bg-transparent border border-amber-200 flex flex-col items-center justify-center p-6 md:p-4 hover:border-amber-300 transition-colors duration-300 animate-item fade-in-left" style="animation-delay: 1.3s;">
          <span class="text-white text-sm md:text-base text-center mb-2">"교회 공동체 안에서 큰 위로와 힘을 받았습니다."</span>
          <span class="text-white text-xs md:text-sm text-center opacity-80">- 박성민(12교구)</span>
        </div>
      </div>
    </div>
    <!-- 아래로 이동 화살표 버튼 -->
    <!-- Desktop arrow -->
    <button @click="scrollToNextSection"
      class="hidden md:block absolute bottom-8 inset-x-0 mx-auto w-max rounded-full bg-transparent border border-teal-300 p-3 flex items-center justify-center hover:bg-teal-900/20 transition duration-300 animate-bounce z-10">
      <i class="fas fa-chevron-down text-2xl text-teal-300"></i>
    </button>
    <!-- Mobile arrow -->
    <button @click="scrollToNextSection"
      class="block md:hidden absolute bottom-4 inset-x-0 mx-auto w-max rounded-full bg-transparent border border-teal-300 p-3 flex items-center justify-center hover:bg-teal-900/20 transition duration-300 animate-bounce z-10">
      <i class="fas fa-chevron-down text-2xl text-teal-300"></i>
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
  height: 56.25vw; /* 16:9 비율 유지 (100 / 16 * 9) */
  min-height: 100vh; /* 최소 높이를 화면 높이로 설정 */
  min-width: 177.77vh; /* 16:9 비율 유지 (100 / 9 * 16) */
  transform: translate(-50%, -50%);
  pointer-events: none; /* 비디오 위 상호작용 방지 */
  object-fit: cover; /* 컨테이너를 채우도록 비디오 크기 조절 */
}

.fade-in {
  animation: fadeIn 0.8s ease forwards;
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
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
</style>