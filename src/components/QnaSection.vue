<template>
  <section id="qna" class="scroll-mt-24 py-20 px-4 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-[#f8e8f2] via-white to-[#f8e8f2]">
      <div class="absolute w-full h-full overflow-hidden opacity-10">
        <div class="absolute top-0 left-0 w-full h-full">
          <!-- Animated circles -->
          <div v-for="i in 5" :key="i" 
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
      <div>
        <div class="bg-white bg-opacity-25 backdrop-blur-lg p-8 md:p-16 rounded-3xl shadow-2xl border border-white border-opacity-40 transform hover:rotate-x-1 transition-transform duration-700">
          <div class="text-center mb-16 relative scroll-reveal fade-up">
            <!-- Floating decorative elements -->
            <div class="absolute -top-10 left-1/4 w-16 h-16 bg-[#f8e8f2] rounded-full opacity-60 animate-float" style="animation-delay: 0.5s; animation-duration: 6s;"></div>
            <div class="absolute -top-5 right-1/4 w-10 h-10 bg-[#f8d8e8] rounded-full opacity-60 animate-float" style="animation-delay: 1s; animation-duration: 7s;"></div>
            
            <span class="inline-block py-1 px-4 rounded-full bg-gradient-to-r from-[#f8d8e8] to-[#f8e8f2] text-[#843088] text-sm font-medium mb-4 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
              <i class="fas fa-question-circle text-[#bb337f] mr-2"></i>흩어지는 예배에 대한 질문
            </span>
            
            <h2 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#843088] to-[#e87054]">자주 묻는 질문</span>
            </h2>
            
            <div class="relative w-32 h-2 mx-auto mb-8">
              <div class="absolute inset-0 bg-gradient-to-r from-[#e87054] to-[#843088] rounded-full"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-[#e87054] to-[#843088] rounded-full animate-pulse"></div>
            </div>
            
            <p class="text-gray-600 max-w-2xl mx-auto text-lg">
              성령의 바람을 타고 흩어지는 예배에 대한 궁금증을 해결해 드립니다
            </p>
          </div>

          <!-- Main Content Area: Q&A Left, Inquiry Right -->
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Left Column: Q&A Accordion -->
            <div class="lg:w-full scroll-reveal fade-right" data-delay="0.2">
              <div 
                v-for="(item, index) in qnaItems" 
                :key="index" 
                class="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-white border-opacity-30 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 scroll-reveal fade-up"
                :data-delay="`${0.3 + index * 0.1}`"
              >
                <button
                  @click="toggleAccordion(index)"
                  class="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                  :class="{ 'bg-gradient-to-r from-[#843088] to-[#bb337f] text-white': activeIndex === index }"
                >
                  <span class="font-medium text-lg flex items-center">
                    <i class="fas fa-seedling mr-3 text-[#e87054]" v-if="activeIndex !== index"></i>
                    <i class="fas fa-wind mr-3" v-else></i>
                    {{ item.question }}
                  </span>
                  <i 
                    class="fas transition-transform duration-300" 
                    :class="[
                      activeIndex === index ? 'fa-minus transform rotate-90' : 'fa-plus', 
                      activeIndex === index ? 'text-white' : 'text-[#843088]'
                    ]"
                  ></i>
                </button>
                <transition name="fade-slide">
                  <div v-if="activeIndex === index" class="p-5 bg-white bg-opacity-80">
                    <p class="text-gray-700 mb-4">{{ item.answer }}</p>
                    <p v-if="item.additionalInfo" class="text-sm text-[#bb337f] italic">
                      <i class="fas fa-info-circle mr-2"></i>
                      {{ item.additionalInfo }}
                    </p>
                  </div>
                </transition>
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
      activeIndex: null,
      qnaItems: [
        {
          question: "흩어지는 예배란 무엇인가요?",
          answer: "흩어지는 예배는 예배가 특정 장소나 시간에 국한되지 않고, 성도들의 일상과 삶의 모든 영역으로 확장되는 개념입니다. 성령의 바람을 타고 세상 속으로 흩어져 각자의 자리에서 예배하며 하나님의 임재를 드러내는 것을 의미합니다.",
          additionalInfo: "물리적 확장, 선교적 파송, 자발적 흩어짐의 세 가지 핵심 가치를 추구합니다."
        },
        {
          question: "Spread out과 Bloom again의 의미는 무엇인가요?",
          answer: "Spread out(널리 퍼져라)은 예배가 예배당에 머무르지 않고 삶의 현장, 도시, 이웃의 삶 속으로 흩어지는 물리적 확장을 의미합니다. Bloom again(다시 피어라)은 흩어진 자리마다 성령께서 생명을 회복시키고 부흥을 일으키시는 것을 의미합니다.",
          additionalInfo: "\"성령의 바람을 타고 흩어진 우리가, 그 바람이 머무는 자리마다 다시 꽃을 피운다!\""
        },
        {
          question: "예배 모임은 어떻게 진행되나요?",
          answer: "주일 예배는 매주 일요일 오전 11시에 드려지며, 중앙 예배당과 각 지역 공동체에서 동시에 진행됩니다. 또한 수요일 저녁 7시에는 온라인으로 연결되는 중보기도 모임이 있습니다.",
          additionalInfo: "모든 예배는 온라인으로도 참여 가능합니다."
        },
        {
          question: "어떻게 흩어지는 예배에 동참할 수 있나요?",
          answer: "흩어지는 예배에 동참하는 방법은 다양합니다. 주일 예배에 참석하거나, 지역 공동체에 연결되거나, 온라인 예배에 참여할 수 있습니다. 또한 자신의 일상에서 예배의 정신을 실천하며 주변 사람들에게 사랑을 나누는 것도 중요한 참여 방법입니다.",
          additionalInfo: "웹사이트의 '함께하기' 메뉴에서 더 자세한 참여 방법을 확인하실 수 있습니다."
        },
        {
          question: "지역별 모임은 어디에서 확인할 수 있나요?",
          answer: "웹사이트의 '사역지도' 메뉴에서 전국 각지의 지역 모임 정보를 확인하실 수 있습니다. 지도에서 해당 지역을 클릭하면 모임 시간, 장소, 연락처 등 자세한 정보를 볼 수 있습니다.",
          additionalInfo: "아직 해당 지역에 모임이 없다면, 새로운 모임을 시작하는 데 도움을 드릴 수 있습니다."
        },
        {
          question: "어린이와 청소년을 위한 프로그램이 있나요?",
          answer: "네, 어린이와 청소년을 위한 특별 프로그램이 운영되고 있습니다. 연령대별로 나뉘어 진행되며, 흩어지는 예배의 가치를 어린 세대들이 이해하고 실천할 수 있도록 돕는 교육 프로그램을 제공합니다.",
          additionalInfo: "모든 교사는 아동 안전 교육을 이수하였습니다."
        }
      ],
      newQuestion: {
        name: '',
        email: '',
        question: ''
      }
    };
  },
  mounted() {
    // 스크롤 애니메이션 초기화
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
    },
    toggleAccordion(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index;
      }
    },
    submitQuestion() {
      // 여기에 질문 제출 로직을 구현합니다
      alert('질문이 성공적으로 제출되었습니다. 감사합니다!');
      this.newQuestion = {
        name: '',
        email: '',
        question: ''
      };
    },
  }
};
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

/* 아코디언 애니메이션 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  height: 0;
  opacity: 0;
}

/* 3D 효과 */
.hover\:rotate-x-1:hover {
  transform: rotateX(1deg);
}

.perspective-1000 {
  perspective: 1000px;
}
</style>