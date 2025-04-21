<template>
  <header :class="{ 'bg-white shadow-md': isScrolled, 'bg-transparent': !isScrolled }"
    class="fixed w-full z-50 transition-all duration-300">
    <div class="container mx-auto px-8 py-8">
      <div class="flex justify-between items-center">
        <div class="flex items-center cursor-pointer" @click="smoothScroll('home')"> 
          <img class="h-8 w-auto mr-4" src="@/assets/Logosample.png" alt="흩어지는 교회">
          <h1 :class="['text-2xl', 'font-bold', isScrolled ? 'text-black' : 'text-white']">흩어지는 교회</h1>
        </div>

        <nav class="hidden md:flex space-x-8">
          <a href="#home"
            :class="['nav-link', 'hover:text-teal-400', 'font-bold', 'text-lg', isScrolled ? 'text-black' : 'text-white']"
            @click.prevent="smoothScroll('home')">홈</a>
          <a href="#about"
            :class="['nav-link', 'hover:text-teal-400', 'font-bold', 'text-lg', isScrolled ? 'text-black' : 'text-white']"
            @click.prevent="smoothScroll('about')">사역소개</a>
          <a href="#ministriesmap"
            :class="['nav-link', 'hover:text-teal-400', 'font-bold', 'text-lg', isScrolled ? 'text-black' : 'text-white']"
            @click.prevent="smoothScroll('ministriesmap')">사역지도</a>
          <a href="#expectations" 
            :class="['nav-link', 'hover:text-teal-400', 'font-bold', 'text-lg', isScrolled ? 'text-black' : 'text-white']"
            @click.prevent="smoothScroll('expectations')">기대글</a>
          <a href="#qna"
            :class="['nav-link', 'hover:text-teal-400', 'font-bold', 'text-lg', isScrolled ? 'text-black' : 'text-white']"
            @click.prevent="smoothScroll('qna')">Q&A</a>
          
        </nav>

        <button @click="$emit('toggle-menu')" class="md:hidden focus:outline-none" :class="isScrolled ? 'text-black' : 'text-white'">
          <i class="fas fa-bars text-2xl"></i>
        </button>
      </div>
    </div>
    <div class="w-full h-px bg-white opacity-30" v-if="!isScrolled"></div> 
    <div class="w-full h-px bg-gray-200" v-else></div> 
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
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0; 
  background-color: #14b8a6; /* teal-500 color */
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
</style>
