<template>
  <section id="expectations" class="scroll-mt-24 py-20 px-4 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-amber-50 via-white to-teal-50">
      <div class="absolute w-full h-full overflow-hidden opacity-10">
        <div class="absolute top-0 left-0 w-full h-full">
          <!-- Animated circles -->
          <div v-for="i in 5" :key="i" 
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
    
    <div class="container mx-auto px-4 relative z-10">
      <!-- Main content container with 3D-like effect -->
      <div class="transform perspective-1000">
        <div class="bg-white bg-opacity-25 backdrop-blur-lg p-10 md:p-16 rounded-3xl shadow-2xl border border-white border-opacity-40 transform hover:rotate-x-1 transition-transform duration-700">
          <!-- Header section with floating elements -->
          <div class="text-center mb-16 relative">
            <!-- Floating decorative elements -->
            <div class="absolute -top-10 left-1/4 w-16 h-16 bg-amber-100 rounded-full opacity-60 animate-float" style="animation-delay: 0.5s; animation-duration: 6s;"></div>
            <div class="absolute -top-5 right-1/4 w-10 h-10 bg-teal-100 rounded-full opacity-60 animate-float" style="animation-delay: 1s; animation-duration: 7s;"></div>
            
            <span class="inline-block py-1 px-4 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 text-sm font-medium mb-4 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
              <i class="fas fa-heart text-amber-500 mr-2"></i>함께 나누는 소망
            </span>
            
            <h2 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-amber-600">기대 한마디</span>
            </h2>
            
            <div class="relative w-32 h-2 mx-auto mb-8">
              <div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-teal-400 rounded-full"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-teal-400 rounded-full animate-pulse"></div>
            </div>
            
            <p class="text-gray-600 max-w-2xl mx-auto text-lg">
              흩어지는교회를 향한 여러분의 기대와 소망을 나눠주세요. 
              <span class="text-teal-600 font-medium">여러분의 한마디가 교회의 미래를 만듭니다.</span>
            </p>
          </div>

          <!-- Interactive content area -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <!-- Left Column: Expectation Cards -->
            <div class="order-2 lg:order-1">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-gray-800 flex items-center">
                  <span class="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-600 mr-3">
                    <i class="fas fa-comments text-sm"></i>
                  </span>
                  남겨진 기대의 말들
                </h3>
                <div class="flex space-x-2">
                  <button class="p-2 rounded-full bg-white bg-opacity-70 text-teal-600 hover:bg-teal-50 transition-colors">
                    <i class="fas fa-sort-amount-down text-sm"></i>
                  </button>
                  <button class="p-2 rounded-full bg-white bg-opacity-70 text-amber-600 hover:bg-amber-50 transition-colors">
                    <i class="fas fa-filter text-sm"></i>
                  </button>
                </div>
              </div>
              
              <!-- Empty state with illustration -->
              <div v-if="expectations.length === 0" class="flex flex-col items-center justify-center py-16 px-6 bg-white bg-opacity-40 rounded-2xl border border-white border-opacity-60">
                <div class="w-24 h-24 mb-6 relative">
                  <div class="absolute inset-0 bg-amber-100 rounded-full animate-ping opacity-30"></div>
                  <div class="absolute inset-2 bg-amber-200 rounded-full flex items-center justify-center">
                    <i class="fas fa-comment-dots text-3xl text-amber-500"></i>
                  </div>
                </div>
                <h4 class="text-xl font-medium text-gray-700 mb-2">아직 남겨진 기대글이 없어요</h4>
                <p class="text-gray-500 text-center mb-4">여러분의 소중한 한마디가 첫 번째 메시지가 될 수 있어요</p>
                <button class="py-2 px-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  첫 메시지 남기기
                </button>
              </div>
              
              <!-- Expectation cards with staggered animation -->
              <div v-else class="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                <div 
                  v-for="(expectation, index) in expectations"
                  :key="index"
                  class="bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 hover:rotate-1"
                  :style="{ transitionDelay: `${index * 0.05}s` }"
                >
                  <div class="p-5">
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-amber-100 flex items-center justify-center mr-4 shadow-sm">
                        <span class="text-teal-600 font-bold">{{ expectation.name.charAt(0) }}</span>
                      </div>
                      <div class="flex-1">
                        <div class="flex justify-between items-start mb-2">
                          <h4 class="font-medium text-gray-900">{{ expectation.name }}</h4>
                          <span class="text-xs text-gray-500">{{ formatDate(expectation.date || new Date()) }}</span>
                        </div>
                        <p class="text-gray-700 leading-relaxed">
                          <i class="fas fa-quote-left text-xs text-teal-400 mr-1 opacity-50"></i>
                          {{ expectation.message }}
                          <i class="fas fa-quote-right text-xs text-teal-400 ml-1 opacity-50"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="h-1 bg-gradient-to-r from-amber-300 to-teal-300"></div>
                </div>
              </div>
              
              <!-- Load more button with gradient -->
              <div v-if="expectations.length > 5" class="mt-6 text-center">
                <button class="py-2 px-6 bg-gradient-to-r from-teal-50 to-amber-50 text-gray-700 rounded-lg border border-white border-opacity-60 hover:shadow-md transition-all duration-300 group">
                  <span class="group-hover:mr-2 transition-all duration-300">더 보기</span>
                  <i class="fas fa-chevron-down text-xs opacity-70 group-hover:opacity-100 transition-all duration-300"></i>
                </button>
              </div>
            </div>
            
            <!-- Right Column: Interactive Form -->
            <div class="order-1 lg:order-2">
              <div class="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-xl overflow-hidden transform hover:rotate-1 transition-all duration-500">
                <div class="p-6 md:p-8">
                  <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <span class="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 mr-3">
                      <i class="fas fa-pencil-alt text-sm"></i>
                    </span>
                    나의 기대 남기기
                  </h3>
                  
                  <form @submit.prevent="submitExpectation" class="space-y-5">
                    <!-- Name input with floating label -->
                    <div class="relative">
                      <input
                        type="text"
                        id="name"
                        v-model="newExpectation.name"
                        required
                        class="peer w-full px-4 py-3 border-2 border-teal-100 bg-white bg-opacity-70 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 placeholder-transparent"
                        placeholder="이름을 입력해주세요"
                      />
                      <label 
                        for="name" 
                        class="absolute left-4 -top-2.5 text-sm font-medium text-gray-600 bg-white px-1 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-teal-600 peer-focus:text-sm"
                      >
                        이름
                      </label>
                    </div>
                    
                    <!-- Message textarea with character count -->
                    <div class="relative">
                      <textarea
                        id="message"
                        v-model="newExpectation.message"
                        required
                        rows="4"
                        class="peer w-full px-4 py-3 border-2 border-teal-100 bg-white bg-opacity-70 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 placeholder-transparent resize-none"
                        placeholder="교회와 사역에 대한 기대나 응원의 메시지를 남겨주세요!"
                        maxlength="200"
                      ></textarea>
                      <label 
                        for="message" 
                        class="absolute left-4 -top-2.5 text-sm font-medium text-gray-600 bg-white px-1 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-teal-600 peer-focus:text-sm"
                      >
                        메시지
                      </label>
                      <div class="absolute bottom-2 right-3 text-xs text-gray-400">
                        {{ newExpectation.message.length }}/200
                      </div>
                    </div>
                    
                    <!-- Submit button with gradient and animation -->
                    <div class="pt-2">
                      <button 
                        type="submit" 
                        class="w-full py-3 px-6 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:outline-none"
                      >
                        <span class="flex items-center justify-center">
                          <i class="fas fa-paper-plane mr-2"></i>
                          <span>기대의 말 전하기</span>
                        </span>
                      </button>
                    </div>
                  </form>
                  
                  <!-- Decorative elements -->
                  <div class="mt-6 flex justify-center">
                    <div class="flex space-x-1">
                      <div v-for="i in 3" :key="`dot-${i}`" class="w-2 h-2 rounded-full bg-amber-300 animate-pulse" :style="{ animationDelay: `${i * 0.2}s` }"></div>
                    </div>
                  </div>
                </div>
                
                <!-- Decorative wave pattern at bottom -->
                <div class="h-6 bg-gradient-to-r from-amber-300 to-teal-300 relative overflow-hidden">
                  <div class="absolute inset-0 wave-pattern opacity-30"></div>
                </div>
              </div>
              
              <!-- Testimonial quote -->
              <div class="mt-6 bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-xl border-l-4 border-amber-400 shadow-sm">
                <p class="text-gray-600 italic text-sm">
                  "흩어지는교회를 통해 제 삶의 모든 영역에서 하나님의 사랑을 실천할 수 있게 되었습니다. 이 공동체는 단순한 모임이 아닌, 세상을 변화시키는 움직임입니다."
                </p>
                <p class="text-right text-gray-700 font-medium text-sm mt-2">- 김믿음, 성도</p>
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
  data() {
    return {
      newExpectation: {
        name: '',
        message: ''
      },
      expectations: [
        {
          name: '김신앙',
          message: '흩어지는교회를 통해 일상에서 하나님을 더 깊이 만나길 기대합니다. 모든 성도가 삶의 자리에서 빛과 소금이 되길 소망합니다.',
          date: new Date('2023-03-15')
        },
        {
          name: '이소망',
          message: '다양한 사역을 통해 지역사회에 선한 영향력을 끼치는 교회가 되길 바랍니다. 특히 청년들이 믿음 안에서 자라나는 공동체가 되길 기도합니다.',
          date: new Date('2023-03-10')
        },
        {
          name: '박사랑',
          message: '모든 성도가 각자의 삶의 자리에서 빛과 소금의 역할을 감당하는 공동체가 되길 소망합니다. 함께 기도하고 서로를 격려하는 교회가 되길 바랍니다.',
          date: new Date('2023-03-05')
        },
        {
          name: '최은혜',
          message: '말씀을 통해 변화되고 성장하는 교회, 서로 사랑하고 섬기는 공동체가 되길 소망합니다. 모든 세대가 함께 어우러져 하나님을 예배하는 교회가 되길 기도합니다.',
          date: new Date('2023-02-28')
        }
      ]
    };
  },
  mounted() {
    // 텍스트 영역 자동 높이 조정
    this.adjustTextareaHeight();
    
    // 텍스트 영역에 이벤트 리스너 추가
    const textarea = document.getElementById('message');
    if (textarea) {
      textarea.addEventListener('input', this.adjustTextareaHeight);
    }
  },
  beforeUnmount() {
    // 컴포넌트 해제 시 이벤트 리스너 제거
    const textarea = document.getElementById('message');
    if (textarea) {
      textarea.removeEventListener('input', this.adjustTextareaHeight);
    }
  },
  methods: {
    adjustTextareaHeight() {
      const textarea = document.getElementById('message');
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
      }
    },
    submitExpectation() {
      if (this.newExpectation.name && this.newExpectation.message) {
        // 새 기대글 추가
        this.expectations.unshift({
          name: this.newExpectation.name,
          message: this.newExpectation.message,
          date: new Date()
        });
        
        // 폼 초기화
        this.newExpectation.name = '';
        this.newExpectation.message = '';
        
        // 텍스트 영역 높이 재설정
        this.$nextTick(() => {
          this.adjustTextareaHeight();
        });
      }
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    }
  }
};
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

/* Wave pattern for decorative elements */
.wave-pattern {
  background: linear-gradient(45deg, transparent 25%, white 25%, white 50%, transparent 50%, transparent 75%, white 75%, white);
  background-size: 10px 10px;
  animation: wave 10s linear infinite;
}

@keyframes wave {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, rgba(245, 158, 11, 0.5), rgba(20, 184, 166, 0.5));
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, rgba(245, 158, 11, 0.7), rgba(20, 184, 166, 0.7));
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

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Gradient text */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>