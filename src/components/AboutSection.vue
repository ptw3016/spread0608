<template>
  <section id="about" class="scroll-mt-24 py-20 px-4 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-amber-50 via-white to-teal-50">
      <div class="absolute w-full h-full overflow-hidden opacity-10">
        <div class="absolute top-0 left-0 w-full h-full">
          <!-- Animated circles -->
          <div v-for="i in 3" :key="i" 
               class="absolute rounded-full mix-blend-multiply animate-float"
               :class="[
                 i % 2 === 0 ? 'bg-teal-300' : 'bg-amber-300',
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
          <div class="absolute -top-10 left-1/4 w-16 h-16 bg-amber-100 rounded-full opacity-60 animate-float" style="animation-delay: 0.5s; animation-duration: 6s;"></div>
          <div class="absolute -top-5 right-1/4 w-10 h-10 bg-teal-100 rounded-full opacity-60 animate-float" style="animation-delay: 1s; animation-duration: 7s;"></div>
          
          <span class="inline-block py-1 px-4 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 text-sm font-medium mb-4 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
            <i class="fas fa-church text-amber-500 mr-2"></i>교회 소개
          </span>
          
          <h2 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            우리는 <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-amber-600">흩어지는교회</span>입니다
          </h2>
          
          <div class="relative w-32 h-2 mx-auto mb-8">
            <div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-teal-400 rounded-full"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-teal-400 rounded-full animate-pulse"></div>
          </div>
          
          <p class="text-gray-600 max-w-2xl mx-auto text-lg">
            함께 모이고 흩어지며 세상을 변화시키는 신앙 공동체
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div class="space-y-8">
            <div class="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-6 shadow-sm border-l-4 border-amber-400 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1 scroll-reveal fade-right" data-delay="0.2">
              <p class="text-xl text-gray-700 leading-relaxed">
                <i class="fas fa-quote-left text-amber-400 mr-2 opacity-50"></i>
                흩어지는교회는 특정한 건물이 아닌, 성도들의 삶의 자리에서 시작되는 신앙 공동체입니다. 
                우리는 모이는 예배뿐 아니라, 각자의 일상 속에서 그리스도의 사랑을 실천하며 세상을 섬기는 교회를 꿈꿉니다.
              </p>
            </div>
            
            <div class="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-6 shadow-sm border-l-4 border-teal-400 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1 scroll-reveal fade-right" data-delay="0.4">
              <p class="text-xl text-gray-700 leading-relaxed">
                <i class="fas fa-quote-left text-teal-400 mr-2 opacity-50"></i>
                교회의 본질은 모이는 것만큼이나 흩어지는 것에 있습니다. 
                우리는 성도 한 사람 한 사람이 자신이 속한 가정, 직장, 사회 속에서 작은 교회로 살아가도록 격려하고 지원합니다. 
                함께 세상을 변화시키는 하나님 나라의 여정에 동참해주세요.
              </p>
            </div>
            
            <div class="flex flex-wrap gap-4 mt-10 scroll-reveal fade-up" data-delay="0.6">
              <button class="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:outline-none">
                <span class="flex items-center justify-center">
                  <i class="fas fa-plus-circle mr-2"></i>
                  <span>더 알아보기</span>
                </span>
              </button>
              <button class="px-6 py-3 bg-white text-teal-600 border border-teal-200 rounded-lg shadow-sm hover:shadow-md hover:border-teal-300 hover:bg-teal-50 transition-all duration-300 transform hover:-translate-y-1">
                <span class="flex items-center justify-center">
                  <i class="fas fa-phone-alt mr-2"></i>
                  <span>연락하기</span>
                </span>
              </button>
            </div>
          </div>
          
          <div class="relative group scroll-reveal fade-left" data-delay="0.3">
            <div class="absolute -inset-1 bg-gradient-to-r from-amber-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl group">
              <div class="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1541557435984-1c79685a082b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="일상 속 신앙 공동체" 
                class="absolute inset-0 w-full h-full object-cover transition duration-700 ease-in-out group-hover:scale-110"/>
              
              <div class="absolute bottom-0 left-0 right-0 p-8 text-white z-20 transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                    <i class="fas fa-heart text-white"></i>
                  </div>
                  <h3 class="text-2xl font-bold">일상 속 신앙 공동체</h3>
                </div>
                <p class="text-white/90">우리는 모든 삶의 영역에서 그리스도의 제자로 살아갑니다</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Stats section -->
        <div class="mt-24">
          <div class="text-center mb-12 scroll-reveal fade-up">
            <h3 class="text-2xl font-bold text-gray-800 mb-3">우리 교회 현황</h3>
            <div class="w-16 h-1 bg-amber-400 mx-auto"></div>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="p-6 bg-gradient-to-br from-white to-teal-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white border-opacity-60 scroll-reveal fade-up" data-delay="0.1">
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <i class="fas fa-map-marker-alt text-teal-600"></i>
                </div>
                <div class="text-teal-600 text-4xl font-bold mb-2">5+</div>
                <div class="text-gray-600 text-center">지역 공동체</div>
              </div>
            </div>
            
            <div class="p-6 bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white border-opacity-60 scroll-reveal fade-up" data-delay="0.3">
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <i class="fas fa-users text-amber-600"></i>
                </div>
                <div class="text-amber-600 text-4xl font-bold mb-2">100+</div>
                <div class="text-gray-600 text-center">활동 멤버</div>
              </div>
            </div>
            
            <div class="p-6 bg-gradient-to-br from-white to-teal-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white border-opacity-60 scroll-reveal fade-up" data-delay="0.5">
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <i class="fas fa-hands-helping text-teal-600"></i>
                </div>
                <div class="text-teal-600 text-4xl font-bold mb-2">10+</div>
                <div class="text-gray-600 text-center">사역 프로젝트</div>
              </div>
            </div>
            
            <div class="p-6 bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white border-opacity-60 scroll-reveal fade-up" data-delay="0.7">
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <i class="fas fa-handshake text-amber-600"></i>
                </div>
                <div class="text-amber-600 text-4xl font-bold mb-2">3+</div>
                <div class="text-gray-600 text-center">협력 단체</div>
              </div>
            </div>
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
/* Perspective and 3D effects */
.perspective-1000 {
  perspective: 1000px;
}

.rotate-x-1 {
  transform: rotateX(1deg);
}

/* Animated background elements */
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
  animation: float 8s ease-in-out infinite;
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-pulse {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 스크롤 애니메이션 */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* 다양한 방향의 애니메이션 */
.fade-up {
  transform: translateY(30px);
}

.fade-down {
  transform: translateY(-30px);
}

.fade-left {
  transform: translateX(-30px);
}

.fade-right {
  transform: translateX(30px);
}

.fade-up.revealed,
.fade-down.revealed,
.fade-left.revealed,
.fade-right.revealed {
  transform: translate(0);
}
</style>
