<template>
  <footer class="relative overflow-hidden bg-gradient-to-br from-[#843088] to-[#6b2670] text-white py-16">
    <!-- 배경 애니메이션 요소 -->
    <div class="absolute inset-0 overflow-hidden">
      <div v-for="i in 3" :key="`circle-${i}`" 
           class="absolute rounded-full mix-blend-overlay animate-float opacity-10"
           :class="i % 2 === 0 ? 'bg-[#e87054]' : 'bg-[#bb337f]'"
           :style="{
             width: `${150 + i * 100}px`,
             height: `${150 + i * 100}px`,
             top: `${(i * 25) % 80}%`,
             left: `${(i * 30) % 80}%`,
             animationDelay: `${i * 0.8}s`,
             animationDuration: `${12 + i * 3}s`
           }">
      </div>
    </div>
    
    <div class="container mx-auto px-8 relative z-10">
      <div class="flex flex-col md:flex-row justify-between mb-12">
        <!-- 로고 및 소개 -->
        <div class="mb-10 md:mb-0 md:w-1/3">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-3">
              <i class="fas fa-wind text-3xl text-[#e87054]"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#f8d8e8]">흩어지는 예배</h2>
              <p class="text-sm text-[#f8d8e8]">Spread out! Bloom again!</p>
            </div>
          </div>
          <p class="text-gray-200 max-w-md mb-6">성령의 바람을 타고, 세상 속에서 다시 피어나는 예배 공동체</p>
          
          <div class="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 mt-4">
            <p class="text-sm italic text-gray-200">
              <i class="fas fa-quote-left text-[#e87054] mr-2"></i>
              예배가 예배당에 머무르지 않고 삶의 현장으로 흩어져, 세상 속에서 다시 피어나는 하나님 나라 운동
            </p>
          </div>
        </div>
        
        <!-- 링크 및 정보 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">
          <!-- 빠른 링크 -->
          <div>
            <h3 class="font-bold text-lg mb-4 flex items-center">
              <span class="w-8 h-8 rounded-full bg-[#e87054]/20 flex items-center justify-center mr-2">
                <i class="fas fa-link text-[#e87054]"></i>
              </span>
              <span>빠른 링크</span>
            </h3>
            <ul class="space-y-3">
              <li>
                <a href="#home" class="text-gray-200 hover:text-[#e87054] transition duration-300 flex items-center">
                  <i class="fas fa-chevron-right text-xs mr-2 text-[#e87054]"></i>
                  <span>홈</span>
                </a>
              </li>
              <li>
                <a href="#about" class="text-gray-200 hover:text-[#e87054] transition duration-300 flex items-center">
                  <i class="fas fa-chevron-right text-xs mr-2 text-[#e87054]"></i>
                  <span>사역소개</span>
                </a>
              </li>
              <li>
                <a href="#location" class="text-gray-200 hover:text-[#e87054] transition duration-300 flex items-center">
                  <i class="fas fa-chevron-right text-xs mr-2 text-[#e87054]"></i>
                  <span>사역지도</span>
                </a>
              </li>
              <li>
                <a href="#expectations" class="text-gray-200 hover:text-[#e87054] transition duration-300 flex items-center">
                  <i class="fas fa-chevron-right text-xs mr-2 text-[#e87054]"></i>
                  <span>기대글</span>
                </a>
              </li>
              <li>
                <a href="#qna" class="text-gray-200 hover:text-[#e87054] transition duration-300 flex items-center">
                  <i class="fas fa-chevron-right text-xs mr-2 text-[#e87054]"></i>
                  <span>Q&A</span>
                </a>
              </li>
            </ul>
          </div>
          
          <!-- 사역 영역 -->
          <div>
            <h3 class="font-bold text-lg mb-4 flex items-center">
              <span class="w-8 h-8 rounded-full bg-[#bb337f]/20 flex items-center justify-center mr-2">
                <i class="fas fa-seedling text-[#bb337f]"></i>
              </span>
              <span>사역 영역</span>
            </h3>
            <ul class="space-y-3">
              <li>
                <a href="#" class="text-gray-200 hover:text-[#bb337f] transition duration-300 flex items-center">
                  <i class="fas fa-chevron-right text-xs mr-2 text-[#bb337f]"></i>
                  <span>지역 공동체</span>
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-200 hover:text-[#bb337f] transition duration-300 flex items-center">
                  <i class="fas fa-chevron-right text-xs mr-2 text-[#bb337f]"></i>
                  <span>온라인 예배</span>
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-200 hover:text-[#bb337f] transition duration-300 flex items-center">
                  <i class="fas fa-chevron-right text-xs mr-2 text-[#bb337f]"></i>
                  <span>중보기도</span>
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-200 hover:text-[#bb337f] transition duration-300 flex items-center">
                  <i class="fas fa-chevron-right text-xs mr-2 text-[#bb337f]"></i>
                  <span>선교 활동</span>
                </a>
              </li>
            </ul>
          </div>
          
          <!-- 연락처 -->
          <div>
            <h3 class="font-bold text-lg mb-4 flex items-center">
              <span class="w-8 h-8 rounded-full bg-[#843088]/20 flex items-center justify-center mr-2">
                <i class="fas fa-envelope text-[#843088]"></i>
              </span>
              <span>연락처</span>
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <i class="fas fa-map-marker-alt mt-1 mr-3 text-[#e87054]"></i>
                <span class="text-gray-200">부산광역시 해운대구 우동</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-phone mr-3 text-[#e87054]"></i>
                <span class="text-gray-200">010-1234-5678</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-envelope mr-3 text-[#e87054]"></i>
                <span class="text-gray-200">info@spreadout0608.com</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-globe mr-3 text-[#e87054]"></i>
                <span class="text-gray-200">www.spread0608.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- 뉴스레터 구독 -->
      <!-- <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-12">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="mb-4 md:mb-0 md:mr-8">
            <h3 class="text-lg font-bold mb-2">뉴스레터 구독</h3>
            <p class="text-gray-200 text-sm">흩어지는 예배 소식과 영감을 받아보세요</p>
          </div>
          <div class="w-full md:w-auto flex-1 flex">
            <input type="email" placeholder="이메일 주소" class="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#e87054] text-white placeholder-gray-300">
            <button class="bg-gradient-to-r from-[#e87054] to-[#bb337f] px-6 py-2 rounded-r-lg text-white font-medium hover:from-[#d86a50] hover:to-[#a92d70] transition duration-300">
              구독하기
            </button>
          </div>
        </div>
      </div> -->
      
      <!-- 카피라이트 및 소셜 미디어 -->
      <div class="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-300 mb-4 md:mb-0"> 2025 흩어지는 예배. 모든 권리 보유.</p>
        <div class="flex space-x-4">
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e87054]/20 transition duration-300 group">
            <i class="fab fa-facebook-f text-gray-200 group-hover:text-[#e87054]"></i>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#bb337f]/20 transition duration-300 group">
            <i class="fab fa-youtube text-gray-200 group-hover:text-[#bb337f]"></i>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#843088]/20 transition duration-300 group">
            <i class="fab fa-instagram text-gray-200 group-hover:text-[#843088]"></i>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e87054]/20 transition duration-300 group">
            <i class="fab fa-twitter text-gray-200 group-hover:text-[#e87054]"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 필요한 로직이 있다면 여기에 추가
</script>

<style scoped>
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
