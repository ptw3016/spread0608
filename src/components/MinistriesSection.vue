<template>
  <section id="ministries" class="scroll-mt-24 py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">사역 소개</h2>
        <div class="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
        <p class="text-gray-600 max-w-2xl mx-auto">각자의 은사대로 섬길 수 있는 다양한 사역들이 있습니다.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(ministry, index) in ministries" :key="index" class="bg-gray-50 rounded-lg p-8 text-center hover:bg-indigo-50 transition duration-300">
          <div class="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <i class="fas text-2xl" :class="ministry.icon"></i>
          </div>
          <h3 class="font-bold text-xl mb-3">{{ ministry.title }}</h3>
          <p class="text-gray-600">{{ ministry.description }}</p>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <a href="#" class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
          사역 참여하기
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const ministries = [
  {
    title: "청년부",
    icon: "fa-users",
    description: "20-30대 청년들을 위한 모임으로 함께 성장하고 교제합니다."
  },
  {
    title: "주일학교",
    icon: "fa-child",
    description: "어린이들을 위한 재미있고 유익한 성경 공부 시간입니다."
  },
  {
    title: "여선교회",
    icon: "fa-hands-praying",
    description: "여성들을 위한 기도와 봉사의 모임입니다."
  },
  {
    title: "찬양팀",
    icon: "fa-music",
    description: "예배를 인도하는 찬양팀으로 함께 섬깁니다."
  },
  {
    title: "구역모임",
    icon: "fa-house-chimney",
    description: "지역별 소그룹 모임으로 서로를 돌보고 기도합니다."
  },
  {
    title: "선교팀",
    icon: "fa-globe",
    description: "해외와 국내 선교를 위해 기도하고 지원합니다."
  }
]
</script>

<style scoped>
/* 호버 효과는 이미 template에 inline으로 정의되어 있음 */
</style>
