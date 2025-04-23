<template>
  <section id="about" class="scroll-mt-24 py-20 px-4 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-[#f8e8f2] via-white to-[#f8e8f2]">
      <div class="absolute w-full h-full overflow-hidden opacity-10">
        <div class="absolute top-0 left-0 w-full h-full">
          <!-- Animated circles -->
          <div v-for="i in 3" :key="i" 
               class="absolute rounded-full mix-blend-multiply animate-float"
               :class="[
                 i % 2 === 0 ? 'bg-[#843088]' : 'bg-[#e87054]',
                 `w-${20 + i * 16} h-${20 + i * 16}`,
                 `top-${(i * 15) % 80}`,
                 `left-${(i * 20) % 80}`
               ]"
               :style="{
                 animationDelay: `${i * 0.5}s`,
                 animationDuration: `${8 + i}s`
               }">
          </div>
        </div>
      </div>
    </div>
    
    <div class="container mx-auto px-2 md:p-4 relative z-10">
      <div class="bg-white bg-opacity-25 backdrop-blur-lg p-8 md:p-16 rounded-3xl shadow-2xl border border-white border-opacity-40 transform hover:rotate-x-1 transition-transform duration-700">
        <!-- Header section with floating elements -->
        <div class="text-center mb-16 relative scroll-reveal fade-up">
          <!-- Floating decorative elements -->
          <div class="absolute -top-10 left-1/4 w-16 h-16 bg-[#f8e8f2] rounded-full opacity-60 animate-float" style="animation-delay: 0.5s; animation-duration: 6s;"></div>
          <div class="absolute -top-5 right-1/4 w-10 h-10 bg-[#f8d8e8] rounded-full opacity-60 animate-float" style="animation-delay: 1s; animation-duration: 7s;"></div>
          
          <span class="inline-block py-1 px-4 rounded-full bg-gradient-to-r from-[#f8d8e8] to-[#f8e8f2] text-[#843088] text-sm font-medium mb-4 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
            <i class="fas fa-wind text-[#bb337f] mr-2"></i>흩어지는 예배
          </span>
          
          <h2 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#843088] to-[#e87054]">Spread out! Bloom again!</span>
          </h2>
          
          <div class="relative w-32 h-2 mx-auto mb-8">
            <div class="absolute inset-0 bg-gradient-to-r from-[#e87054] to-[#843088] rounded-full"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-[#e87054] to-[#843088] rounded-full animate-pulse"></div>
          </div>
          
          <p class="text-gray-600 max-w-2xl mx-auto text-lg">
            성령의 바람을 타고, 세상 속에서 다시 피어나는 "흩어지는 예배"
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div class="space-y-8">
            <!-- Spread out 섹션 -->
            <div class="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-6 shadow-sm border-l-4 border-[#843088] transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1 scroll-reveal fade-right" data-delay="0.2">
              <h3 class="text-2xl font-bold text-[#843088] mb-3">"Spread out!" – 널리 퍼져라!</h3>
              <div class="italic text-[#bb337f] text-lg mb-4 pl-4 border-l-2 border-[#f8d8e8]">
                <p>예배는 멈추는 것이 아니라, 세상으로 퍼지는 운동이다!</p>
              </div>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start">
                  <i class="fas fa-church text-[#e87054] mt-1 mr-3"></i>
                  <p><span class="font-semibold">물리적 확장:</span> 예배가 예배당에 머무르지 않고 삶의 현장, 도시, 이웃의 삶 속으로 흩어짐</p>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-globe-asia text-[#e87054] mt-1 mr-3"></i>
                  <p><span class="font-semibold">선교적 파송:</span> 오순절 이후 제자들이 성령의 바람을 타고 각지로 흩어졌듯, 복음을 들고 나아가는 공동체의 정체성</p>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-heart text-[#e87054] mt-1 mr-3"></i>
                  <p><span class="font-semibold">자발적 흩어짐:</span> 강요된 분산이 아닌, 사랑과 기쁨으로 스스로 나아가는 순종의 실천</p>
                </li>
              </ul>
            </div>
            
            <!-- Bloom again 섹션 -->
            <div class="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-6 shadow-sm border-l-4 border-[#e87054] transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1 scroll-reveal fade-right" data-delay="0.4">
              <h3 class="text-2xl font-bold text-[#e87054] mb-3">"Bloom again!" – 다시 피어라!</h3>
              <div class="italic text-[#bb337f] text-lg mb-4 pl-4 border-l-2 border-[#f8d8e8]">
                <p>흩어진 자리마다, 성령께서 생명을 회복시키시고 부흥을 일으키신다!</p>
              </div>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start">
                  <i class="fas fa-wind text-[#843088] mt-1 mr-3"></i>
                  <p><span class="font-semibold">성령의 생기:</span> 마른 뼈와 같던 곳에 성령의 생기가 불어 다시 살아나는 공동체와 예배</p>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-seedling text-[#843088] mt-1 mr-3"></i>
                  <p><span class="font-semibold">새로운 열매:</span> 한 자리에 머물던 예배가 흩어진 자리마다 열매를 맺고, 꽃을 피우는 부흥의 확장</p>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-leaf text-[#843088] mt-1 mr-3"></i>
                  <p><span class="font-semibold">회복과 생명:</span> 겨울 같은 침체를 지나, 성령 안에서의 생명력 있는 회복</p>
                </li>
              </ul>
            </div>
            
            <div class="flex flex-wrap gap-4 mt-10 scroll-reveal fade-up" data-delay="0.6">
              <button class="px-6 py-3 bg-gradient-to-r from-[#843088] to-[#6b2670] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:ring-2 focus:ring-offset-2 focus:ring-[#843088] focus:outline-none">
                <span class="flex items-center justify-center">
                  <i class="fas fa-wind mr-2"></i>
                  <span>더 알아보기</span>
                </span>
              </button>
              <button class="px-6 py-3 bg-white text-[#843088] border border-[#f8d8e8] rounded-lg shadow-sm hover:shadow-md hover:border-[#bb337f] hover:bg-[#f8f0f4] transition-all duration-300 transform hover:-translate-y-1">
                <span class="flex items-center justify-center">
                  <i class="fas fa-seedling mr-2"></i>
                  <span>함께하기</span>
                </span>
              </button>
            </div>
          </div>
          
          <div class="relative group scroll-reveal fade-left" data-delay="0.3">
            <div class="absolute -inset-1 bg-gradient-to-r from-[#e87054] to-[#843088] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl group">
              <div class="absolute inset-0 bg-gradient-to-t from-[#843088]/60 to-transparent z-10"></div>
              <img 
                src="@/assets/main_heroimage.png" 
                alt="성령의 바람을 타고 흩어지는 예배" 
                class="absolute inset-0 w-full h-full object-cover transition duration-700 ease-in-out group-hover:scale-110"/>
              
              <div class="absolute bottom-0 left-0 right-0 p-8 text-white z-20 transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                    <i class="fas fa-wind text-white"></i>
                  </div>
                  <h3 class="text-2xl font-bold">흩어지는 예배의 메시지</h3>
                </div>
                <p class="text-white/90">"성령의 바람을 타고 흩어진 우리가, 그 바람이 머무는 자리마다 다시 꽃을 피운다!"</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Message section -->
        <div class="mt-24">
          <div class="text-center mb-12 scroll-reveal fade-up">
            <h3 class="text-2xl font-bold text-gray-800 mb-3">흩어지는 예배의 메시지</h3>
            <div class="w-16 h-1 bg-[#e87054] mx-auto"></div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 bg-gradient-to-br from-white to-[#f8e8f2] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white border-opacity-60 scroll-reveal fade-up" data-delay="0.1">
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 rounded-full bg-[#f8e8f2] flex items-center justify-center mb-4">
                  <i class="fas fa-wind text-[#843088] text-2xl"></i>
                </div>
                <div class="text-[#843088] text-2xl font-bold mb-2">"Spread out"</div>
                <div class="text-gray-600 text-center">성령에 의한 선교적 확장</div>
              </div>
            </div>
            
            <div class="p-6 bg-gradient-to-br from-white to-[#fce8e4] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white border-opacity-60 scroll-reveal fade-up" data-delay="0.3">
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 rounded-full bg-[#fce8e4] flex items-center justify-center mb-4">
                  <i class="fas fa-seedling text-[#e87054] text-2xl"></i>
                </div>
                <div class="text-[#e87054] text-2xl font-bold mb-2">"Bloom again"</div>
                <div class="text-gray-600 text-center">성령에 의한 거룩한 부흥과 재창조</div>
              </div>
            </div>
          </div>
          
          <div class="mt-12 p-8 bg-gradient-to-br from-[#f8e8f2] to-white rounded-xl shadow-md border border-white border-opacity-60 text-center scroll-reveal fade-up" data-delay="0.5">
            <p class="text-xl text-[#843088] italic font-medium">
              "성령의 바람을 타고 흩어진 우리가, 그 바람이 머무는 자리마다 다시 꽃을 피운다!"
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    this.initScrollReveal();
  },
  methods: {
    initScrollReveal() {
      // 스크롤 시 요소들이 나타나는 애니메이션 효과 초기화
      const observerOptions = {
        root: null, // viewport를 root로 사용
        rootMargin: '0px',
        threshold: 0.1 // 요소의 10%가 보일 때 콜백 실행
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            
            // 애니메이션 적용
            setTimeout(() => {
              el.classList.add('revealed');
            }, delay * 1000);
            
            // 한 번 나타난 요소는 더 이상 관찰하지 않음
            observer.unobserve(el);
          }
        });
      }, observerOptions);

      // 모든 스크롤 애니메이션 요소 관찰 시작
      document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
      });
    }
  }
}
</script>

<style scoped>
/* 애니메이션 효과 */
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

/* 스크롤 애니메이션 클래스 */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.fade-up.revealed {
  opacity: 1;
  transform: translateY(0);
}

.fade-right.revealed {
  opacity: 1;
  transform: translateX(0);
}

.fade-left.revealed {
  opacity: 1;
  transform: translateX(0);
}

.fade-right {
  transform: translateX(-30px);
}

.fade-left {
  transform: translateX(30px);
}

/* 3D 효과 */
.hover\:rotate-x-1:hover {
  transform: rotateX(1deg);
}
</style>
