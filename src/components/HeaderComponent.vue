<template>
  <header 
    :class="{ 'bg-white/90 backdrop-blur-md shadow-lg': isScrolled, 'bg-transparent': !isScrolled }"
    class="fixed w-full z-50 transition-all duration-500">
    <div class="container mx-auto px-4 md:px-8 py-4 md:py-6">
      <div class="flex justify-between items-center">
        <!-- 로고 영역 -->
        <div class="flex items-center cursor-pointer group" @click="smoothScroll('home')"> 
          <div class="relative w-10 h-10 mr-3 flex items-center justify-center">
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-[#843088] to-[#e87054] opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            <i class="fas fa-wind text-white text-xl relative z-10"></i>
          </div>
          <div>
            <h1 :class="['text-xl md:text-2xl font-bold transition-colors duration-300', isScrolled ? 'text-[#843088]' : 'text-white']">
              흩어지는 예배
            </h1>
            <span :class="['text-xs tracking-wider transition-colors duration-300', isScrolled ? 'text-[#e87054]' : 'text-white/80']">
              Spread out! Bloom again!
            </span>
          </div>
        </div>

        <!-- 데스크톱 네비게이션 -->
        <nav class="hidden md:flex space-x-6 lg:space-x-8">
          <a href="#home"
            :class="['nav-link', 'font-medium', 'transition-colors', 'duration-300', isScrolled ? 'text-gray-700' : 'text-white']"
            @click.prevent="smoothScroll('home')">
            <span class="flex items-center">
              <i class="fas fa-home text-sm mr-2" :class="isScrolled ? 'text-[#843088]' : 'text-[#e87054]'"></i>
              <span>홈</span>
            </span>
          </a>
          <a href="#about"
            :class="['nav-link', 'font-medium', 'transition-colors', 'duration-300', isScrolled ? 'text-gray-700' : 'text-white']"
            @click.prevent="smoothScroll('about')">
            <span class="flex items-center">
              <i class="fas fa-info-circle text-sm mr-2" :class="isScrolled ? 'text-[#bb337f]' : 'text-[#bb337f]'"></i>
              <span>사역소개</span>
            </span>
          </a>
          <a href="#location"
            :class="['nav-link', 'font-medium', 'transition-colors', 'duration-300', isScrolled ? 'text-gray-700' : 'text-white']"
            @click.prevent="smoothScroll('location')">
            <span class="flex items-center">
              <i class="fas fa-map-marker-alt text-sm mr-2" :class="isScrolled ? 'text-[#e87054]' : 'text-[#e87054]'"></i>
              <span>사역지도</span>
            </span>
          </a>
          <a href="#expectations" 
            :class="['nav-link', 'font-medium', 'transition-colors', 'duration-300', isScrolled ? 'text-gray-700' : 'text-white']"
            @click.prevent="smoothScroll('expectations')">
            <span class="flex items-center">
              <i class="fas fa-seedling text-sm mr-2" :class="isScrolled ? 'text-[#843088]' : 'text-[#843088]'"></i>
              <span>기대글</span>
            </span>
          </a>
          <a href="#qna"
            :class="['nav-link', 'font-medium', 'transition-colors', 'duration-300', isScrolled ? 'text-gray-700' : 'text-white']"
            @click.prevent="smoothScroll('qna')">
            <span class="flex items-center">
              <i class="fas fa-question-circle text-sm mr-2" :class="isScrolled ? 'text-[#bb337f]' : 'text-[#bb337f]'"></i>
              <span>Q&A</span>
            </span>
          </a>
        </nav>

        <!-- 모바일 메뉴 버튼 -->
        <button 
          @click="$emit('toggle-menu')" 
          class="md:hidden focus:outline-none p-2 rounded-full"
          :class="isScrolled ? 'bg-[#f8d8e8] text-[#843088]' : 'bg-white/20 text-white hover:bg-white/30'"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
    
    <!-- 구분선 -->
    <div class="w-full h-px bg-gradient-to-r from-[#843088]/30 via-[#bb337f]/30 to-[#e87054]/30" v-if="!isScrolled"></div> 
    <div class="w-full h-px bg-gradient-to-r from-[#843088]/10 via-[#bb337f]/10 to-[#e87054]/10" v-else></div> 
  </header>
</template>

<script>
export default {
  props: ['isScrolled'],
  emits: ['toggle-menu'],
  methods: {
    smoothScroll(id) {
      const el = document.getElementById(id);
      if (el) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 80; 
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight; 
 
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  }
}
</script>

<style scoped>
.nav-link {
  position: relative;
  padding-bottom: 4px; 
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0; 
  background-image: linear-gradient(to right, #843088, #e87054);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  transform: translateY(-2px);
}
</style>
