<template>
  <section id="contact" class="scroll-mt-24 py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">연락하기</h2>
        <div class="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
        <p class="text-gray-600 max-w-2xl mx-auto">궁금한 점이 있으시면 언제든지 문의해 주세요.</p>
      </div>
      
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="lg:w-1/2">
          <div class="bg-white rounded-lg shadow-md p-8 h-full">
            <h3 class="text-2xl font-bold text-gray-800 mb-6">문의 양식</h3>
            <form @submit.prevent="submitForm">
              <div class="mb-6">
                <label for="name" class="block text-gray-700 font-medium mb-2">이름</label>
                <input v-model="formData.name" type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
              </div>
              <div class="mb-6">
                <label for="email" class="block text-gray-700 font-medium mb-2">이메일</label>
                <input v-model="formData.email" type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
              </div>
              <div class="mb-6">
                <label for="phone" class="block text-gray-700 font-medium mb-2">전화번호</label>
                <input v-model="formData.phone" type="tel" id="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              </div>
              <div class="mb-6">
                <label for="message" class="block text-gray-700 font-medium mb-2">메시지</label>
                <textarea v-model="formData.message" id="message" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required></textarea>
              </div>
              <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                보내기
              </button>
            </form>
          </div>
        </div>
        
        <div class="lg:w-1/2">
          <div class="bg-white rounded-lg shadow-md p-8 h-full">
            <h3 class="text-2xl font-bold text-gray-800 mb-6">연락처 정보</h3>
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="bg-indigo-100 p-3 rounded-full mr-4">
                  <i class="fas fa-map-marker-alt text-indigo-600"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800 mb-1">주소</h4>
                  <p class="text-gray-600">서울특별시 강남구 테헤란로 123 수영로 빌딩 5층</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-indigo-100 p-3 rounded-full mr-4">
                  <i class="fas fa-phone text-indigo-600"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800 mb-1">전화</h4>
                  <p class="text-gray-600">02-1234-5678</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-indigo-100 p-3 rounded-full mr-4">
                  <i class="fas fa-envelope text-indigo-600"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800 mb-1">이메일</h4>
                  <p class="text-gray-600">info@gracechurch.kr</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-indigo-100 p-3 rounded-full mr-4">
                  <i class="fas fa-clock text-indigo-600"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800 mb-1">예배 시간</h4>
                  <p class="text-gray-600 mb-1">주일 오전 1부: 09:00</p>
                  <p class="text-gray-600 mb-1">주일 오전 2부: 11:00</p>
                  <p class="text-gray-600">수요 저녁 예배: 19:30</p>
                </div>
              </div>
            </div>
            
            <div class="mt-8">
              <h4 class="font-bold text-gray-800 mb-4">지도</h4>
              <div class="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <i class="fas fa-map-marked-alt text-4xl text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const submitForm = () => {
  alert('문의가 접수되었습니다. 감사합니다!')
  formData.value = { name: '', email: '', phone: '', message: '' }
}
</script>

<style scoped>
/* 추가 스타일이 필요한 경우 여기에 작성 */
</style>
