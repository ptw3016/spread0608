<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" @click="$emit('close')">
    <div class="absolute right-0 top-0 h-full w-64 bg-white shadow-lg" @click.stop>
      <div class="flex justify-end p-4">
        <button @click="$emit('close')" class="text-gray-700 focus:outline-none">
          <i class="fas fa-times text-2xl"></i>
        </button>
      </div>
      <nav class="flex flex-col space-y-6 p-6">
        <!-- Updated Menu Items with .prevent, text-lg and font-semibold -->
        <a href="#home" @click.prevent="smoothScroll('home')" class="text-gray-700 hover:text-teal-500 text-lg font-semibold">홈</a>
        <a href="#about" @click.prevent="smoothScroll('about')" class="text-gray-700 hover:text-teal-500 text-lg font-semibold">사역소개</a>
        <a href="#ministriesmap" @click.prevent="smoothScroll('ministriesmap')" class="text-gray-700 hover:text-teal-500 text-lg font-semibold">사역지도</a>
        <a href="#expectations" @click.prevent="smoothScroll('expectations')" class="text-gray-700 hover:text-teal-500 text-lg font-semibold">기대글</a>
        <a href="#qna" @click.prevent="smoothScroll('qna')" class="text-gray-700 hover:text-teal-500 text-lg font-semibold">Q&A</a>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isOpen'],
  emits: ['close'],
  methods: {
    // Added smooth scroll logic similar to HeaderComponent, adapted for mobile menu closure
    smoothScroll(id) {
      this.$emit('close'); // Close menu first
      // Use nextTick to ensure the menu is closed before scrolling
      this.$nextTick(() => {
        const el = document.getElementById(id);
        if (el) {
          // Header height might still be relevant for offset calculation
          const headerHeight = document.querySelector('header')?.offsetHeight || 80; // Assuming header is present
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight; 
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      });
    }
  }
}
</script>
