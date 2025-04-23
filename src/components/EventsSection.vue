<template>
  <section id="events" class="scroll-mt-24 py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">다가오는 행사</h2>
        <div class="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
        <p class="text-gray-600 max-w-2xl mx-auto">함께 모여 예배하고 교제하는 특별한 시간들</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div v-for="(event, index) in events" :key="index" class="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row">
          <div class="sm:w-1/4 text-center sm:text-left mb-4 sm:mb-0">
            <div class="bg-indigo-100 text-indigo-600 rounded-lg py-3 px-4 inline-block sm:block">
              <div class="text-2xl font-bold">{{ new Date(event.date).getDate() }}</div>
              <div class="text-sm">{{ new Date(event.date).toLocaleString('ko-KR', { month: 'long' }) }}</div>
            </div>
          </div>
          <div class="sm:w-3/4">
            <h3 class="font-bold text-xl mb-2">{{ event.title }}</h3>
            <div class="flex flex-wrap items-center text-gray-500 text-sm mb-3">
              <div class="flex items-center mr-4 mb-2 sm:mb-0">
                <i class="far fa-clock mr-2"></i>
                <span>{{ event.time }}</span>
              </div>
              <div class="flex items-center mb-2 sm:mb-0">
                <i class="fas fa-map-marker-alt mr-2"></i>
                <span>{{ event.location }}</span>
              </div>
            </div>
            <p class="text-gray-600 mb-4">{{ event.description }}</p>
            <a href="#" class="text-indigo-600 font-medium hover:text-indigo-800">자세히 보기</a>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <a href="#" class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
          모든 행사 보기
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'EventsSection',
  data() {
    return {
      events: [
        {
          title: "청년부 수련회",
          date: "2023-06-10",
          time: "09:00 AM",
          location: "산음수련원",
          description: "청년들을 위한 특별한 영적 체험의 시간"
        },
        {
          title: "가족 캠프",
          date: "2023-06-17",
          time: "10:00 AM",
          location: "수영로 교회",
          description: "가족과 함께하는 즐거운 캠프"
        },
        {
          title: "선교 보고회",
          date: "2023-06-24",
          time: "02:00 PM",
          location: "교회 본당",
          description: "해외 선교사들의 소식과 보고"
        },
        {
          title: "여름 성경학교",
          date: "2023-07-01",
          time: "09:00 AM",
          location: "교회 교육관",
          description: "어린이들을 위한 재미있는 성경 공부"
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
