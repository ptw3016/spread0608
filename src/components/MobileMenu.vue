<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 md:hidden">
    <!-- 배경 오버레이 -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')"></div>
    
    <!-- 메뉴 패널 -->
    <div class="absolute right-0 top-0 h-full w-72 bg-gradient-to-br from-[#843088]/80 to-[#6b2670]/80 backdrop-blur-md text-white shadow-2xl transform transition-transform duration-300 border-l border-white/20" @click.stop>
      <!-- 배경 애니메이션 요소 -->
      <div class="absolute inset-0 overflow-hidden">
        <div v-for="i in 3" :key="`circle-${i}`" 
             class="absolute rounded-full mix-blend-overlay animate-float opacity-10"
             :class="i % 2 === 0 ? 'bg-[#e87054]' : 'bg-[#bb337f]'"
             :style="{
               width: `${100 + i * 50}px`,
               height: `${100 + i * 50}px`,
               top: `${(i * 25) % 80}%`,
               left: `${(i * 30) % 80}%`,
               animationDelay: `${i * 0.8}s`,
               animationDuration: `${12 + i * 3}s`
             }">
        </div>
      </div>
      
      <!-- 헤더 영역 -->
      <div class="relative z-10 flex items-center justify-between p-6 border-b border-white/20 bg-white/5 backdrop-blur-sm">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
            <i class="fas fa-wind text-[#e87054] text-xl"></i>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">흩어지는 예배</h2>
            <p class="text-xs text-[#f8d8e8]">Spread out! Bloom again!</p>
          </div>
        </div>
        <button @click="$emit('close')" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors focus:outline-none">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- 네비게이션 메뉴 -->
      <nav class="relative z-10 flex flex-col p-6 space-y-5">
        <a href="#home" @click.prevent="smoothScroll('home')" 
           class="mobile-nav-link flex items-center py-2 px-3 rounded-lg hover:bg-white/10 transition-colors">
          <div class="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-3">
            <i class="fas fa-home text-[#e87054]"></i>
          </div>
          <span class="font-medium">홈</span>
        </a>
        
        <a href="#about" @click.prevent="smoothScroll('about')" 
           class="mobile-nav-link flex items-center py-2 px-3 rounded-lg hover:bg-white/10 transition-colors">
          <div class="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-3">
            <i class="fas fa-info-circle text-[#bb337f]"></i>
          </div>
          <span class="font-medium">사역소개</span>
        </a>
        
        <a href="#location" @click.prevent="smoothScroll('location')" 
           class="mobile-nav-link flex items-center py-2 px-3 rounded-lg hover:bg-white/10 transition-colors">
          <div class="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-3">
            <i class="fas fa-map-marker-alt text-[#e87054]"></i>
          </div>
          <span class="font-medium">사역지도</span>
        </a>
        
        <a href="#expectations" @click.prevent="smoothScroll('expectations')" 
           class="mobile-nav-link flex items-center py-2 px-3 rounded-lg hover:bg-white/10 transition-colors">
          <div class="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-3">
            <i class="fas fa-seedling text-[#843088]"></i>
          </div>
          <span class="font-medium">기대글</span>
        </a>
        
        <a href="#qna" @click.prevent="smoothScroll('qna')" 
           class="mobile-nav-link flex items-center py-2 px-3 rounded-lg hover:bg-white/10 transition-colors">
          <div class="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-3">
            <i class="fas fa-question-circle text-[#bb337f]"></i>
          </div>
          <span class="font-medium">Q&A</span>
        </a>
      </nav>
      
      <!-- 푸터 영역 -->
      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20 bg-white/5 backdrop-blur-sm">
        <div class="flex space-x-4 justify-center">
          <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e87054]/20 transition-colors">
            <i class="fab fa-facebook-f text-white"></i>
          </a>
          <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#bb337f]/20 transition-colors">
            <i class="fab fa-instagram text-white"></i>
          </a>
          <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#843088]/20 transition-colors">
            <i class="fab fa-youtube text-white"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isOpen'],
  emits: ['close'],
  methods: {
    smoothScroll(id) {
      this.$emit('close'); // 먼저 메뉴 닫기
      // 메뉴가 닫힌 후 스크롤 실행
      this.$nextTick(() => {
        const el = document.getElementById(id);
        if (el) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 80;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight; 
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      });
    }
  }
}
</script>

<style scoped>
.mobile-nav-link {
  position: relative;
  overflow: hidden;
}

.mobile-nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background-image: linear-gradient(to right, #e87054, #bb337f);
  transition: width 0.3s ease;
}

.mobile-nav-link:hover::before {
  width: 100%;
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
</style>
