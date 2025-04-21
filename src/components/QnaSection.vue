<template>
  <section id="qna" class="scroll-mt-24 bg-gradient-to-br from-amber-50 via-white to-teal-50 py-20 px-4 relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
      <div class="absolute top-20 left-20 w-72 h-72 rounded-full bg-amber-300 blur-3xl"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-teal-300 blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-amber-200 blur-3xl opacity-20"></div>
    </div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div>
        <div class="bg-white bg-opacity-25 backdrop-blur-lg p-8 md:p-12 rounded-3xl shadow-2xl border border-white border-opacity-40">
          <div class="text-center mb-14">
            <span class="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4 transform hover:scale-105 transition-transform duration-300">자주 묻는 질문</span>
            <h2 class="text-3xl md:text-5xl font-bold text-gray-800 mb-5 leading-tight">궁금한 점이 <span class="text-teal-600">있으신가요?</span></h2>
            <div class="w-28 h-1.5 bg-teal-500 mx-auto mb-8 transform transition-all duration-500 hover:w-40"></div>
            <p class="text-gray-600 max-w-2xl mx-auto text-lg">흩어지는교회에 대한 자주 묻는 질문들과 답변을 확인하세요</p>
          </div>

          <!-- Main Content Area: Q&A Left, Inquiry Right -->
          <div class="flex flex-col lg:flex-row gap-12">

            <!-- Left Column: Q&A Accordion -->
            <div class="lg:w-1/2 space-y-6 max-w-4xl mx-auto">
              <div 
                v-for="(item, index) in qnaItems" 
                :key="index" 
                class="glass-panel-light rounded-xl overflow-hidden shadow-md border border-white border-opacity-30 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                <button
                  @click="toggleItem(index)"
                  class="w-full flex justify-between items-center p-6 text-left text-lg font-medium text-teal-800 hover:bg-white hover:bg-opacity-30 transition duration-300 focus:outline-none"
                >
                  <div class="flex items-center">
                    <span class="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-600 mr-3 font-semibold">Q</span>
                    <span>{{ item.question }}</span>
                  </div>
                  <i
                    class="fas transition-transform duration-300 text-amber-500"
                    :class="activeIndex === index ? 'fa-chevron-up' : 'fa-chevron-down'"
                  ></i>
                </button>
                <transition
                  name="fade-slide"
                  @enter="startTransition"
                  @leave="endTransition"
                >
                  <div v-show="activeIndex === index" class="px-6 pb-6 pt-2">
                    <div class="pl-11">
                      <div class="flex items-start mb-2">
                        <span class="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 mr-3 font-semibold shrink-0 mt-0.5">A</span>
                        <p class="text-gray-700">{{ item.answer }}</p>
                      </div>
                      <div v-if="item.additionalInfo" class="mt-4 pl-11 text-sm text-gray-600 bg-white bg-opacity-40 p-3 rounded-lg border-l-2 border-amber-300">
                        <i class="fas fa-info-circle text-amber-500 mr-2"></i>
                        {{ item.additionalInfo }}
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>

            <!-- Right Column: Contact Form -->
            <div class="lg:w-1/2">
              <!-- 추가 문의 섹션 -->
              <div class="flex flex-col md:flex-row gap-8">
                <div class="md:w-1/2 glass-panel rounded-xl p-6 shadow-glass relative overflow-hidden group">
                  <div class="absolute top-0 right-0 w-24 h-24 bg-teal-100 rounded-bl-full opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <h3 class="text-xl font-bold text-teal-900 mb-4 flex items-center">
                    <i class="fas fa-paper-plane text-amber-500 mr-2"></i>
                    추가 문의하기
                  </h3>
                  <form @submit.prevent="submitQuestion">
                    <div class="mb-4">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-700">이름</label>
                      <input
                        type="text"
                        id="name"
                        v-model="newQuestion.name"
                        required
                        class="w-full px-4 py-3 border-2 border-teal-100 bg-white bg-opacity-70 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        placeholder="이름을 입력해주세요"
                      />
                    </div>
                    <div class="mb-4">
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-700">이메일</label>
                      <input
                        type="email"
                        id="email"
                        v-model="newQuestion.email"
                        required
                        class="w-full px-4 py-3 border-2 border-teal-100 bg-white bg-opacity-70 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        placeholder="이메일을 입력해주세요"
                      />
                    </div>
                    <div class="mb-4">
                      <label for="question" class="block mb-2 text-sm font-medium text-gray-700">질문 내용</label>
                      <textarea
                        id="question"
                        v-model="newQuestion.question"
                        required
                        rows="4"
                        class="w-full px-4 py-3 border-2 border-teal-100 bg-white bg-opacity-70 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        placeholder="질문 내용을 입력해주세요"
                      ></textarea>
                    </div>
                    <div class="flex justify-end">
                      <button type="submit" class="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1">
                        <i class="fas fa-paper-plane"></i>
                        문의하기
                      </button>
                    </div>
                  </form>
                </div>

                <div class="md:w-1/2 glass-panel-light rounded-xl p-6 shadow-glass flex flex-col justify-center relative overflow-hidden group">
                  <div class="absolute bottom-0 left-0 w-32 h-32 bg-amber-100 rounded-tr-full opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div class="text-center relative z-10">
                    <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 text-amber-500 mb-4">
                      <i class="fas fa-question-circle text-4xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-teal-900 mb-2">도움이 필요하신가요?</h3>
                    <p class="text-gray-700 mb-6">위에서 찾지 못한 질문이 있으시면 문의해 주세요. 빠른 시일 내에 답변 드리겠습니다.</p>
                    <div class="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
                      <a href="tel:02-1234-5678" class="flex items-center justify-center text-teal-600 hover:text-teal-800 transition duration-300 bg-white bg-opacity-50 rounded-lg px-4 py-2 hover:bg-opacity-70">
                        <i class="fas fa-phone mr-2"></i>
                        <span>02-1234-5678</span>
                      </a>
                      <a href="mailto:info@church.org" class="flex items-center justify-center text-amber-600 hover:text-amber-800 transition duration-300 bg-white bg-opacity-50 rounded-lg px-4 py-2 hover:bg-opacity-70">
                        <i class="fas fa-envelope mr-2"></i>
                        <span>info@church.org</span>
                      </a>
                    </div>
                  </div>
                </div>
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
          question: "예배 시간은 언제인가요?",
          answer: "주일 예배는 매주 일요일 오전 11시에 드려집니다. 수요 예배는 수요일 저녁 7시, 금요 기도회는 금요일 저녁 8시에 진행됩니다.",
          additionalInfo: "모든 예배는 온라인으로도 동시에 진행됩니다."
        },
        {
          question: "교회 위치와 주차 시설이 있나요?",
          answer: "저희 교회는 서울 강남구 테헤란로 123에 위치해 있으며, 건물 지하에 무료 주차장이 마련되어 있습니다. 주차 공간이 제한되어 있으니 가급적 대중교통 이용을 권장합니다.",
          additionalInfo: "지하철 2호선 강남역 3번 출구에서 도보 5분 거리에 있습니다."
        },
        {
          question: "새 신자로 처음 방문하려면 어떻게 해야 하나요?",
          answer: "처음 방문하시는 분들을 위해 안내 데스크가 마련되어 있습니다. 예배 시작 20분 전에 오시면 안내 봉사자가 교회 소개와 함께 자리 안내를 도와드립니다.",
          additionalInfo: null
        },
        {
          question: "어린이를 위한 프로그램이 있나요?",
          answer: "네, 주일학교가 운영되고 있으며 영아부(0-3세), 유치부(4-7세), 초등부(8-13세)로 나뉘어 연령에 맞는 프로그램을 제공하고 있습니다.",
          additionalInfo: "모든 교사는 아동 안전 교육을 이수하였습니다."
        },
        {
          question: "세례나 결혼식을 교회에서 할 수 있나요?",
          answer: "네, 가능합니다. 세례는 분기별로 진행되며, 세례 교육을 이수하셔야 합니다. 결혼식은 최소 3개월 전에 미리 예약하시기 바랍니다.",
          additionalInfo: "자세한 일정과 준비사항은 교회 사무실로 문의해 주세요."
        },
        {
          question: "교회에서 제공하는 봉사 기회는 어떤 것이 있나요?",
          answer: "예배팀, 찬양팀, 주일학교 교사, 안내팀, 미디어팀, 청소년 사역, 선교 사역 등 다양한 봉사 기회가 있습니다. 자신의 은사와 관심사에 맞는 사역에 참여하실 수 있습니다.",
          additionalInfo: "매월 첫째 주 일요일에 봉사자 오리엔테이션이 진행됩니다."
        }
      ],
      newQuestion: {
        name: "",
        email: "",
        question: ""
      }
    };
  },
  methods: {
    toggleItem(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index;
      }
    },
    startTransition(el) {
      el.style.height = 'auto';
      const height = el.scrollHeight;
      el.style.height = '0px';
      // Force repaint
      el.offsetHeight;
      el.style.height = height + 'px';
    },
    endTransition(el) {
      el.style.height = '0px';
    },
    submitQuestion() {
      // 여기에 폼 제출 로직 추가
      alert(`${this.newQuestion.name}님의 질문이 제출되었습니다. 이메일(${this.newQuestion.email})로 답변 드리겠습니다.`);
      // 폼 초기화
      this.newQuestion = {
        name: "",
        email: "",
        question: ""
      };
    }
  }
};
</script>

<style scoped>
/* Glass Panel Styles */
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
}

.glass-panel-light {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.05);
}

.glass-active-button {
  background-color: rgba(20, 184, 166, 0.8); /* teal-500 */
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.glass-active-button:hover {
  background-color: rgba(13, 148, 136, 0.9); /* teal-600 */
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(20, 184, 166, 0.4);
}

.shadow-glass {
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
}

/* Custom Scrollbar */
.custom-scrollbar-thin::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(20, 184, 166, 0.3); /* teal-500 with opacity */
  border-radius: 10px;
}

.custom-scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(20, 184, 166, 0.5); /* teal-500 with higher opacity */
}

/* Fade-Slide Transition */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  height: 0;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>