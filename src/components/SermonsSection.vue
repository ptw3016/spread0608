<template>
  <section id="sermons" class="scroll-mt-24 py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">최근 설교</h2>
        <div class="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
        <p class="text-gray-600 max-w-2xl mx-auto">하나님의 말씀을 통해 우리의 삶이 변화되기를 소망합니다.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(sermon, index) in sermons" :key="index" class="sermon-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
          <img :src="sermon.image" :alt="sermon.title" class="w-full h-48 object-cover">
          <div class="p-6">
            <span class="inline-block bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full mb-2">{{ sermon.category }}</span>
            <h3 class="font-bold text-lg mb-2">{{ sermon.title }}</h3>
            <div class="flex items-center text-gray-500 text-sm mb-4">
              <i class="fas fa-user mr-2"></i>
              <span class="mr-4">{{ sermon.preacher }}</span>
              <i class="fas fa-calendar mr-2"></i>
              <span>{{ sermon.date }}</span>
            </div>
            <a href="#" class="text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
              듣기
              <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <a href="#" class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
          모든 설교 보기
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const sermons = [
  {
    title: "은혜로 구원받은 삶",
    preacher: "김목사",
    date: "2023-06-04",
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31ed8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "주일설교"
  },
  {
    title: "믿음의 여정",
    preacher: "이전도사",
    date: "2023-05-28",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "주일설교"
  },
  {
    title: "하나님의 평안",
    preacher: "박장로",
    date: "2023-05-21",
    image: "https://images.unsplash.com/photo-1435527173128-983b87201f4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80",
    category: "수요예배"
  },
  {
    title: "사랑의 실천",
    preacher: "김목사",
    date: "2023-05-14",
    image: "https://images.unsplash.com/photo-1542403760-90b9e5d1a2f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "주일설교"
  }
]
</script>

<style scoped>
.sermon-card:hover {
  transform: translateY(-5px);
  transition: all 0.3s ease;
}
</style>
