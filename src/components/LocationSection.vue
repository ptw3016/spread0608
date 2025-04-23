<template>
  <section id="ministriesmap" class="scroll-mt-24 py-20 px-4 relative overflow-hidden">
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
      <div>
        <div v-if="selectedRegion">
          <!-- 선택된 지역에 대한 내용 표시 (필요시 구현) -->
        </div>
        <div v-else class="bg-white bg-opacity-25 backdrop-blur-lg p-8 md:p-16 rounded-3xl shadow-2xl border border-white border-opacity-40 transform hover:rotate-x-1 transition-transform duration-700">
          <!-- Header section with floating elements -->
          <div class="text-center mb-14 relative scroll-reveal fade-up">
            <!-- Floating decorative elements -->
            <div class="absolute -top-10 left-1/4 w-16 h-16 bg-[#f8e8f2] rounded-full opacity-60 animate-float" style="animation-delay: 0.5s; animation-duration: 6s;"></div>
            <div class="absolute -top-5 right-1/4 w-10 h-10 bg-[#f8d8e8] rounded-full opacity-60 animate-float" style="animation-delay: 1s; animation-duration: 7s;"></div>
            
            <span class="inline-block py-1 px-4 rounded-full bg-gradient-to-r from-[#f8d8e8] to-[#f8e8f2] text-[#843088] text-sm font-medium mb-4 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
              <i class="fas fa-wind text-[#bb337f] mr-2"></i>흩어지는 예배 네트워크
            </span>
            
            <h2 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#843088] to-[#e87054]">Spread out!</span>
            </h2>
            
            <div class="relative w-32 h-2 mx-auto mb-8">
              <div class="absolute inset-0 bg-gradient-to-r from-[#e87054] to-[#843088] rounded-full"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-[#e87054] to-[#843088] rounded-full animate-pulse"></div>
            </div>
            
            <p class="text-gray-600 max-w-2xl mx-auto text-lg">
              성령의 바람을 타고 전국 각지로 흩어지는 예배 네트워크를 확인하세요
            </p>
          </div>

          <!-- 지도 + 네비게이션 바 & 교회 목록 컨테이너 -->
          <div class="mt-1 flex flex-col md:flex-row justify-start">

            <!-- 왼쪽: 지도 + 네비게이션 바 컬럼 -->
            <div class="flex flex-col w-full md:w-1/2 mb-4 md:mb-0 md:mr-2 transition-all duration-300 scroll-reveal fade-right" data-delay="0.2">
              <!-- 도구 모음 - 개선된 컨트롤 패널 -->
              <div class="absolute top-3 left-3 z-20">
                <div class="glass-panel rounded-xl py-2 px-3 flex space-x-2 border border-white border-opacity-40 shadow-lg">
                  <button @click="zoomIn" class="map-control-button p-2 rounded-lg hover:bg-white hover:bg-opacity-30 transition-all duration-300 group">
                    <i class="fas fa-search-plus text-[#843088] group-hover:text-[#6b2670]"></i>
                  </button>
                  <button @click="zoomOut" class="map-control-button p-2 rounded-lg hover:bg-white hover:bg-opacity-30 transition-all duration-300 group">
                    <i class="fas fa-search-minus text-[#843088] group-hover:text-[#6b2670]"></i>
                  </button>
                  <div class="h-8 w-px bg-white bg-opacity-30 mx-1"></div>
                  <button @click="resetMap" class="map-control-button p-2 rounded-lg hover:bg-white hover:bg-opacity-30 transition-all duration-300 group">
                    <i class="fas fa-redo text-[#843088] group-hover:text-[#6b2670]"></i>
                  </button>
                  <button v-if="!showButtons" @click="goBack" class="map-control-button p-2 rounded-lg hover:bg-white hover:bg-opacity-30 transition-all duration-300 group">
                    <i class="fas fa-arrow-left text-[#843088] group-hover:text-[#6b2670]"></i>
                  </button>
                </div>
              </div>
              
              <div class="flex flex-col w-full">
                <div
                  class="h-96 overflow-auto rounded-xl border border-white border-opacity-30 bg-white bg-opacity-20 backdrop-blur-md cursor-grab active:cursor-grabbing custom-scrollbar-transparent relative shadow-xl"
                  ref="imageContainer"
                  style="scrollbar-width: thin; scrollbar-color: transparent transparent; position: relative;"
                  @mousedown.prevent="startDrag"
                  @mousemove="onDrag"
                  @mouseup="endDrag"
                  @mouseleave="endDrag"
                  @touchstart.prevent="startDrag"
                  @touchmove="onDrag"
                  @touchend="endDrag"
                  @wheel="handleWheelZoom"
                >
                  <!-- 지도+버튼을 감싸는 래퍼 -->
                  <div
                    class="map-inner"
                    :style="mapInnerStyle"
                    @mousedown.prevent="startDrag"
                    @mousemove="onDrag"
                    @mouseup="endDrag"
                    @mouseleave="endDrag"
                    @touchstart.prevent="startDrag"
                    @touchmove="onDrag"
                    @touchend="endDrag"
                  >
                    <!-- 지도 이미지 -->
                    <img
                      :src="currentMap"
                      alt="Korea Map"
                      class="w-auto h-auto max-w-none transition-opacity duration-500"
                      style="user-select: none; -webkit-user-drag: none;"
                      draggable="false"
                      @load="updateFixedListHeight"
                    />
                    
                    <!-- 메인 버튼 -->
                    <transition-group name="map-buttons" tag="div">
                      <button
                        v-if="showButtons"
                        v-for="btn in buttonPositions"
                        :key="btn.id"
                        :class="[
                          'map-button absolute text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1',
                          selectedButtonId === btn.id ? 'ring-4 ring-white' : ''
                        ]"
                        :style="buttonStyle(btn, 'main')"
                        @mousedown.stop
                        @touchstart.stop
                        @click="onMapButtonClick(btn)"
                      >
                        <span class="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#843088] to-[#6b2670] rounded-full p-1 md:p-2">
                          {{ btn.label }}
                        </span>
                      </button>
                    </transition-group>
                    
                    <!-- 상세 버튼 -->
                    <transition-group name="fade" tag="div">
                      <button
                        v-if="!showButtons"
                        v-for="btn in regionButtons[currentRegionId]"
                        :key="btn.id"
                        :class="[
                          'region-button absolute text-white rounded-full shadow-lg transition-all duration-300 transform hover:shadow-xl hover:scale-110 hover:-translate-y-1',
                          selectedSubButtonId === btn.id ? 'ring-4 ring-white z-20' : 'opacity-60 hover:opacity-100'
                        ]"
                        :style="buttonStyle(btn, 'detail')"
                        @mousedown.stop
                        @touchstart.stop
                        @click="onSubRegionButtonClick(btn)"
                      >
                        <span class="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#e87054] to-[#d04e38] rounded-full p-1 md:p-2">
                          {{ btn.label }}
                        </span>
                      </button>
                    </transition-group>
                  </div>
                </div>
                <!-- Navigation Bar -->
                <div class="relative mt-4 w-full scroll-reveal fade-up" data-delay="0.1">
                  <!-- Navigation Buttons Container - Buttons grow evenly -->
                  <div 
                    ref="mainNavRef" 
                    class="glass-panel py-3 px-3 flex items-center gap-1 w-full z-10 overflow-x-auto custom-scrollbar-thin transition-all duration-300"
                    :class="selectedButtonId && regionButtons[selectedButtonId] ? 'rounded-t-xl' : 'rounded-xl'"
                  >
                    <!-- '전체' Button -->
                    <button
                      class="nav-button rounded-lg shadow-sm transition-all duration-300 whitespace-nowrap px-2 py-1.5 text-sm border border-transparent flex-grow flex-basis-0 text-center"
                      :class="selectedButtonId === null ? 'glass-active-button' : 'glass-inactive-button'"
                      @click="goBack"
                    >
                      전체
                    </button>
                    <!-- Region Buttons -->
                    <button
                      v-for="btn in buttonPositions"
                      :key="btn.id"
                      class="nav-button rounded-lg shadow-sm transition-all duration-300 whitespace-nowrap relative px-2 py-1.5 text-sm flex-grow flex-basis-0 text-center"
                      :class="selectedButtonId === btn.id ? 'glass-active-button' : 'glass-inactive-button'"
                      @click="onMapButtonClick(btn)"
                      :data-id="btn.id"
                    >
                      {{ btn.label }}
                    </button>
                  </div>
                  <!-- Dropdown Sub-buttons -->
                  <transition name="dropdown">
                    <div 
                      v-if="selectedButtonId && regionButtons[selectedButtonId]" 
                      ref="dropdownRef"
                      class="w-full glass-panel-light py-3 px-5 rounded-b-xl shadow-glass mt-1 z-0" 
                    >
                      <div class="flex flex-wrap gap-2 mb-4"> 
                        <button
                          v-for="subBtn in regionButtons[selectedButtonId]"
                          :key="subBtn.id + '-sub'" 
                          :class="[
                            'sub-nav-button rounded-full shadow-lg transition-all duration-300 transform hover:shadow-xl hover:scale-110 hover:-translate-y-1 px-2 py-1 text-sm text-white',
                            selectedSubButtonId === subBtn.id
                              ? 'ring-4 ring-white z-20 bg-gradient-to-br from-[#e87054] to-[#d04e38]'
                              : 'bg-[#f8d8e8] text-gray-700 hover:bg-[#f0c0d0]'
                          ]"
                          @click="onSubRegionButtonClick(subBtn)"
                          :data-id="subBtn.id" 
                        >
                          {{ subBtn.label }}
                        </button>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>

            <!-- 오른쪽: 교회 목록 또는 안내 메시지 -->
            
            <div
               ref="churchListRef"
               :style="{ height: fixedListHeight }"
               class="w-full md:w-1/2 md:ml-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg border border-white border-opacity-30 p-6 transition-all duration-300 scroll-reveal fade-left overflow-y-auto"
               data-delay="0.4"
            >
              <!-- 조건부 렌더링: 하위 지역 선택 시 -->
              <div v-if="selectedSubButtonId" class="h-full flex flex-col">
                <!-- 헤더 (선택된 지역 이름 표시) -->
                <div class="flex items-center mb-4">
                   <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#843088] to-[#6b2670] flex items-center justify-center mr-3">
                      <i class="fas fa-seedling text-white"></i>
                   </div>
                   <h3 class="text-xl font-bold text-[#843088]">{{ getSelectedRegionName() }}</h3>
                </div>

                <!-- 인용구 -->
                <div class="mb-6 bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-4 shadow-sm border-l-4 border-[#e87054]">
                  <p class="text-gray-700 italic">
                    <i class="fas fa-quote-left text-[#e87054] mr-2 opacity-50"></i>
                    성령의 바람을 타고 전국 각지에서 피어나는 예배 공동체들을 만나보세요.
                  </p>
                </div>

                <!-- 교회 목록 스크롤 영역 -->
                <div class="overflow-y-auto flex-grow custom-scrollbar-thin" ref="churchListScroll">
                  <!-- 로딩 중 표시 -->
                  <div v-if="isLoading" class="flex flex-col items-center justify-center h-full">
                      <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#843088]"></div>
                      <p class="text-gray-600 mt-4">교회 목록을 불러오는 중...</p>
                  </div>
                  <!-- 에러 발생 시 표시 -->
                  <div v-else-if="errorLoading" class="flex flex-col items-center justify-center h-full">
                       <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                         <i class="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
                       </div>
                       <p class="text-red-600 text-center">{{ errorLoading }}</p>
                       <p class="text-gray-500 text-center mt-2">문제가 지속되면 관리자에게 문의해주세요.</p>
                  </div>
                  <!-- 교회 목록 표시 (selectedChurches 사용) -->
                  <div v-else-if="!isLoading && selectedChurches.length > 0" class="space-y-4">
                    <div
                      v-for="church in selectedChurches"
                      :key="church.id"  
                      class="bg-white bg-opacity-40 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-white border-opacity-60"
                    >
                      <div class="flex items-start">
                        <div class="w-8 h-8 rounded-full bg-[#f8e8f2] flex items-center justify-center mr-3 mt-1">
                          <i class="fas fa-church text-[#843088]"></i>
                        </div>
                        <div class="flex-grow">
                          <!-- API 필드 이름 사용: church_name, address 등 -->
                          <h4 class="text-lg font-semibold text-[#843088]">{{ church.church_name }}</h4>
                          <p class="text-gray-600 text-sm mb-1"><strong>목사:</strong> {{ church.pastor_name || '정보 없음' }}</p>
                          <p class="text-gray-600 text-sm mb-2"><strong>주소:</strong> {{ church.address || '정보 없음' }}</p>
                          <p class="text-gray-600 text-sm mb-2"><strong>연락처:</strong> {{ church.pastor_contact || '정보 없음' }}</p>
                          <button @click="toggleExpand(church.id)" class="text-sm text-[#843088] font-medium mt-1">
                            {{ expandedChurchId === church.id ? '접기' : '더보기' }}
                          </button>
                          <div v-if="expandedChurchId === church.id" class="mt-2 space-y-2">
                            <p class="text-gray-600 text-sm mb-2"><strong>예배시간:</strong> {{ church.service_time || '정보 없음' }} | <strong>수용인원:</strong> {{ church.capacity || '정보 없음' }}</p>
                            <p class="text-gray-600 text-sm mb-2"><strong>방문확인:</strong> {{ church.visit_confirmed === 'O' ? '확인됨' : '미확인' }} | <strong>섬지역:</strong> {{ church.is_island === 'O' ? '예' : '아니오' }}</p>
                            <p class="text-gray-600 text-sm italic mb-2">"{{ church.description || '교회 소개가 없습니다.' }}"</p>
                            <p class="text-gray-600 text-sm mb-2"><strong>결연/그룹:</strong> {{ church.affiliation_details || '정보 없음' }} / {{ church.group_name || '정보 없음' }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 교회 목록 없음 메시지 -->
                  <div v-else class="flex flex-col items-center justify-center h-full">
                    <div class="w-16 h-16 rounded-full bg-[#f8e8f2] flex items-center justify-center mb-4">
                      <i class="fas fa-seedling text-[#843088] text-2xl"></i>
                    </div>
                    <p class="text-gray-600 text-center">이 지역에는 아직 등록된 교회가 없습니다.</p>
                    <p class="text-[#843088] text-center mt-2 font-medium">곧 새로운 예배 공동체가 피어날 예정입니다!</p>
                  </div>
                </div>
              </div>

              <!-- 조건부 렌더링: 상위 지역만 선택 시 -->
              <div v-else-if="selectedButtonId" class="h-full flex flex-col">
                  <!-- 헤더 (선택된 지역 이름 표시) -->
                  <div class="flex items-center mb-4">
                     <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#843088] to-[#6b2670] flex items-center justify-center mr-3">
                        <i class="fas fa-map-marked-alt text-white"></i>
                     </div>
                     <h3 class="text-xl font-bold text-[#843088]">{{ buttonPositions.find(b => b.id === selectedButtonId)?.label || '지역' }} 안내</h3>
                  </div>
                  
                  <!-- 인용구 -->
                  <div class="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-4 shadow-sm border-l-4 border-[#843088] mb-6">
                    <p class="text-gray-700">
                      원하시는 세부 지역을 선택하시면 해당 지역의 교회 정보를 확인하실 수 있습니다.
                    </p>
                  </div>
                  
                  <!-- 안내 메시지 -->
                  <div class="flex-grow flex flex-col items-center justify-center">
                    <div class="w-20 h-20 rounded-full bg-[#f8e8f2] flex items-center justify-center mb-6 animate-pulse">
                      <i class="fas fa-hand-point-up text-[#843088] text-3xl"></i>
                    </div>
                    <p class="text-[#843088] text-center font-medium">지도에서 지역을 선택해주세요</p>
                    <p class="text-gray-600 text-center mt-2">또는 상단 네비게이션에서 선택할 수 있습니다</p>
                  </div>
              </div>

              <!-- 조건부 렌더링: 아무것도 선택 안했을 시 -->
              <div v-else class="h-full flex flex-col">
                  <!-- 헤더 (흩어지는 예배 네트워크) -->
                  <div class="flex items-center mb-4">
                     <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#843088] to-[#6b2670] flex items-center justify-center mr-3">
                        <i class="fas fa-wind text-white"></i>
                     </div>
                     <h3 class="text-xl font-bold text-[#843088]">흩어지는 예배 네트워크</h3>
                  </div>
                  
                  <!-- 인용구 -->
                  <div class="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-4 shadow-sm border-l-4 border-[#e87054] mb-6">
                    <p class="text-gray-700 italic">
                      <i class="fas fa-quote-left text-[#e87054] mr-2 opacity-50"></i>
                      물리적 확장: 예배가 예배당에 머무르지 않고 삶의 현장, 도시, 이웃의 삶 속으로 흩어짐
                    </p>
                  </div>
                  
                  <!-- 안내 메시지 -->
                  <div class="space-y-4 mb-6">
                    <div class="flex items-start">
                      <div class="w-8 h-8 rounded-full bg-[#f8e8f2] flex items-center justify-center mr-3 mt-1">
                        <i class="fas fa-map-marker-alt text-[#843088]"></i>
                      </div>
                      <div>
                        <h4 class="text-lg font-semibold text-[#843088]">전국 네트워크</h4>
                        <p class="text-gray-600">지도에서 지역을 선택하여 각 지역의 예배 공동체를 확인하세요.</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="w-8 h-8 rounded-full bg-[#fce8e4] flex items-center justify-center mr-3 mt-1">
                        <i class="fas fa-seedling text-[#e87054]"></i>
                      </div>
                      <div>
                        <h4 class="text-lg font-semibold text-[#e87054]">성장하는 공동체</h4>
                        <p class="text-gray-600">성령의 바람을 타고 전국 각지에서 피어나는 예배 공동체들을 만나보세요.</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="w-8 h-8 rounded-full bg-[#f8e0ec] flex items-center justify-center mr-3 mt-1">
                        <i class="fas fa-heart text-[#bb337f]"></i>
                      </div>
                      <div>
                        <h4 class="text-lg font-semibold text-[#bb337f]">함께하는 방법</h4>
                        <p class="text-gray-600">가까운 지역의 예배 공동체에 참여하거나 새로운 공동체를 시작할 수 있습니다.</p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 버튼 -->
                  <div class="mt-auto text-center">
                    <button class="px-6 py-3 bg-gradient-to-r from-[#843088] to-[#6b2670] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:ring-2 focus:ring-offset-2 focus:ring-[#843088] focus:outline-none">
                      <span class="flex items-center justify-center">
                        <i class="fas fa-map-marked-alt mr-2"></i>
                        <span>지역 탐색하기</span>
                      </span>
                    </button>
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
import defaultMapImage from '../assets/clean_full_korea_1.png';
import gangwonMapImage from '../assets/gangwon-do_cut.png';
import gyeonggiMapImage from '../assets/gyeonggi-do_cut.png';
import gyeongsangbukMapImage from '../assets/clean_gyeongbuk_1.png';
import gyeongsangnamMapImage from '../assets/clean_gyeongnam_1.png';
import chungcheongnamMapImage from '../assets/chungcheongnam-do_cut copy.png';
import chungcheongbukMapImage from '../assets/chungcheongbuk-do_cut.png';
import jeollanamMapImage from '../assets/clean_jeonnam_1.png';
import jeonbukMapImage from '../assets/clean_jeonbuk_1.png';
import jejuMapImage from '../assets/jeju-do_cut.png';

export default {
  name: "LocationSection",
  data() {
    return {
      showDiocese: false,
      dioceseItems: [
        { id: 1, name: "서울" },
        { id: 2, name: "부산" },
        { id: 3, name: "대구" },
      ],
      selectedRegion: null,
      zoomLevel: 1,
      defaultMap: defaultMapImage,
      currentMap: defaultMapImage, 
      showButtons: true, 
      isMapChanged: false, 
      dragging: false,
      dragStart: { x: 0, y: 0 },
      imageOffset: { x: 0, y: 0 },
      lastOffset: { x: 0, y: 0 },
      fixedListHeight: 'auto', 
      dropdownPaddingBottom: 0,
      selectedButtonId: null,
      selectedSubButtonId: null, 
      buttonPositions: [
        { id: 'gg', x: 450, y: 280, label: "경기도", map: gyeonggiMapImage },
        { id: 'gw', x: 645, y: 220, label: "강원도", map: gangwonMapImage },
        { id: 'gb', x: 700, y: 470, label: "경상북도", map: gyeongsangbukMapImage },
        { id: 'cn', x: 400, y: 450, label: "충청남도", map: chungcheongnamMapImage },
        { id: 'cb', x: 550, y: 410, label: "충청북도", map: chungcheongbukMapImage },
        { id: 'jn', x: 410, y: 730, label: "전라남도", map: jeollanamMapImage },
        { id: 'jb', x: 450, y: 600, label: "전라북도", map: jeonbukMapImage },
        { id: 'gn', x: 630, y: 660, label: "경상남도", map: gyeongsangnamMapImage }, 
        { id: 'jw', x: 350, y: 1000, label: "제주도", map: jejuMapImage },
        { id: 'bs', x: 720, y: 680, label: "부산", map: gyeongsangnamMapImage }, 
        { id: 'gj', x: 380, y: 650, label: "광주", map: jeollanamMapImage }, 
        { id: 'dg', x: 650, y: 550, label: "대구", map: gyeongsangbukMapImage }, 
        { id: 'su', x: 400, y: 180, label: "서울", map: gyeonggiMapImage }, 
        { id: 'us', x: 780, y: 600, label: "울산", map: gyeongsangnamMapImage } 
      ],
      currentRegionId: null,
      regionButtons: {}, 
      selectedChurches: [], 
      churches: {}, 
      mapWidth: 1200,
      mapHeight: 900,
      resizeObserver: null,
      isMobile: false, 
      dragSpeedFactor: 1.5, 
      firstSlideFade: true,
      isLoading: false,     
      errorLoading: null,   
      expandedChurchId: null,
    };
  },
  computed: {
    mapInnerStyle() {
      return {
        position: "absolute",
        left: 0,
        top: 0,
        width: this.mapWidth + "px",
        height: this.mapHeight + "px",
        transform: `translate(${this.imageOffset.x}px, ${this.imageOffset.y}px) scale(${this.zoomLevel})`,
        transformOrigin: "0 0"
      };
    }
  },
  watch: {
    selectedButtonId(newVal, oldVal) {
      this.$nextTick(() => {
        this.updateFixedListHeight(); 
        const mainNav = this.$refs.mainNavRef;
        if (mainNav) {
          const selectedButtonElement = mainNav.querySelector(`button[data-id='${newVal}']`);
          if (selectedButtonElement) {
            selectedButtonElement.scrollIntoView({
              behavior: 'smooth',
              inline: 'center',
              block: 'nearest'
            });
          }
        }
      });
    }
  },
  mounted() {
    console.log('Component mounted'); 
    this.checkMobile(); 
    window.addEventListener('resize', this.checkMobile); 
    this.resetMap();
    this.$nextTick(() => {
      console.log('Mounted - nextTick starts'); 
      this.updateFixedListHeight();
      console.log('Mounted - setting up ResizeObserver'); 
      this.setupResizeObserver(); 
      console.log('Mounted - nextTick ends'); 
      this.initScrollReveal();
      this.firstSlideFade = false;
      this.fetchRegionButtons(); 
    });
  },
  beforeUnmount() {
    console.log('Component beforeUnmount'); 
    window.removeEventListener('resize', this.checkMobile); 
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  },
  methods: {
    checkMobile() {
      const previouslyMobile = this.isMobile;
      this.isMobile = window.innerWidth < 768; 
      if (previouslyMobile !== this.isMobile) {
          this.resetMap(); 
      }
    },
    selectItem(item, type) {
      this.selectedRegion = item;
      this.showDiocese = false;
    },
    zoomIn() {
      this.zoomLevel = Math.min(this.zoomLevel + 0.1, 3);
    },
    zoomOut() {
      this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.2);
    },
    resetMap() {
      if (this.currentMap === gangwonMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 150, y: 20 }; 
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 200, y: 30 }; 
        }
      } else if (this.currentMap === gyeonggiMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 120, y: 10 }; 
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 150, y: 20 }; 
        }
      } else if (this.currentMap === gyeongsangbukMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 180, y: 30 }; 
        } else {
          this.zoomLevel = 0.3; this.imageOffset = { x: 190, y: 40 }; 
        }
      } else if (this.currentMap === gyeongsangnamMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 150, y: 60 }; 
        } else {
          this.zoomLevel = 0.3; this.imageOffset = { x: 180, y: 40 }; 
        }
      } else if (this.currentMap === chungcheongnamMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 130, y: 40 }; 
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 160, y: 50 }; 
        }
      } else if (this.currentMap === chungcheongbukMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 110, y: 50 }; 
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 140, y: 60 }; 
        }
      } else if (this.currentMap === jeollanamMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 100, y: 70 }; 
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 120, y: 80 }; 
        }
      } else if (this.currentMap === jeonbukMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 110, y: 80 }; 
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 130, y: 90 }; 
        }
      } else if (this.currentMap === jejuMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 170, y: 90 }; 
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 200, y:100 }; 
        }
      } else {
        if (this.isMobile) {
          this.zoomLevel = 0.4; 
          this.imageOffset = { x: -25, y: -30 }; 
        } else {
          this.zoomLevel = 0.4; 
          this.imageOffset = { x: 130, y: -60 };
        }
      }
      this.lastOffset = { ...this.imageOffset };
    },
    startDrag(e) {
      if (e.type === 'mousedown' && e.button !== 0) return;

      this.dragging = true;
      const point = e.touches ? e.touches[0] : e; 
      this.dragStart = {
        x: point.clientX,
        y: point.clientY
      };
      this.lastOffset = { ...this.imageOffset };
      e.preventDefault();
    },
    onDrag(e) {
      if (!this.dragging) return;

      const point = e.touches ? e.touches[0] : e; 
      const dx = (point.clientX - this.dragStart.x) * this.dragSpeedFactor;
      const dy = (point.clientY - this.dragStart.y) * this.dragSpeedFactor;
      this.imageOffset = {
        x: this.lastOffset.x + dx,
        y: this.lastOffset.y + dy
      };
    },
    endDrag() {
      if (!this.dragging) return; 
      this.dragging = false;
    },
    buttonStyle(btn, type = 'main') {
      let baseWidth, baseHeight, baseFontSize;

      if (type === 'detail') {
        baseWidth = 80; 
        baseHeight = 35; 
        baseFontSize = 14; 
      } else {
        baseWidth = 160; 
        baseHeight = 70; 
        baseFontSize = 28; 
      }

      return {
        left: `${btn.x}px`,
        top: `${btn.y}px`,
        transform: `translate(-50%, -50%)`, 
        transformOrigin: "center center",
        zIndex: 10,
        pointerEvents: "auto",
        minWidth: `${baseWidth}px`,
        minHeight: `${baseHeight}px`,
        fontSize: `${baseFontSize}px`,
      };
    },
    onMapButtonClick(btn) {
      this.currentRegionId = btn.id;
      this.selectedButtonId = btn.id; 
      this.currentMap = btn.map;
      this.showButtons = false; 
      this.isMapChanged = true; 
      const subButtons = this.regionButtons[btn.id] || [];
      if (subButtons.length > 0) {
        this.onSubRegionButtonClick(subButtons[0]);
      } else {
        this.selectedSubButtonId = null;
        this.selectedChurches = []; 
      }
      this.resetMap();
      this.$nextTick(this.updateFixedListHeight);
    },
    async onSubRegionButtonClick(btn) {
      console.log('Sub Region Button Clicked:', btn.label, btn.id);
      this.selectedSubButtonId = btn.id; 
      this.isLoading = true;           
      this.selectedChurches = [];      
      this.errorLoading = null;        
      this.showChurchList = true;      

      try {
        const response = await fetch(`/api/get_churches.php?region_id=${btn.id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        if (Array.isArray(data)) {
             this.selectedChurches = data;
             console.log('Churches loaded:', this.selectedChurches);
        } else {
            console.error("API 응답이 배열 형태가 아닙니다:", data);
            this.selectedChurches = []; 
            throw new Error("잘못된 데이터 형식입니다.");
        }


      } catch (error) {
        console.error('Error fetching church data:', error);
        this.errorLoading = '교회 목록을 불러오는 중 오류가 발생했습니다.';
        this.selectedChurches = []; 
      } finally {
        this.isLoading = false; 

        this.$nextTick(() => {
          this.updateFixedListHeight(); 
          const churchListElement = this.$refs.churchListRef;
          if (churchListElement) {
            churchListElement.scrollTop = 0;
            churchListElement.classList.add('revealed');
          }
        });
      }
    },
    getSelectedRegionName() {
      if (this.selectedSubButtonId) {
          const selectedSubButton = this.regionButtons[this.selectedButtonId].find(subBtn => subBtn.id === this.selectedSubButtonId);
          if (selectedSubButton) {
              const parentButton = this.buttonPositions.find(btn => btn.id === this.selectedButtonId);
              return parentButton ? `${parentButton.label} ${selectedSubButton.label}` : selectedSubButton.label;
          }
      } else if (this.selectedButtonId) {
          const parentButton = this.buttonPositions.find(btn => btn.id === this.selectedButtonId);
          return parentButton ? parentButton.label : '지역 선택'; 
      }
      return '지역을 선택해주세요'; 
    },
    goBack() {
      this.currentMap = defaultMapImage;
      this.selectedButtonId = null;
      this.showButtons = true;
      this.isMapChanged = false; 
      this.resetMap(); 

      this.selectedRegionId = null;
      this.selectedSubButtonId = null;
      this.selectedChurches = [];
      this.selectedChurchId = null;
      this.$nextTick(() => {
        this.updateFixedListHeight(); 
        const el = this.$refs.churchListRef;
        if (el) el.classList.add('revealed');
      });
    },
    handleWheelZoom(event) {
      if (event.deltaY < 0) {
        this.zoomIn();
      } else if (event.deltaY > 0) {
        this.zoomOut();
      }
    },
    updateFixedListHeight() {
      this.$nextTick(() => {
        const imageContainer = this.$refs.imageContainer;
        const mainNavRef = this.$refs.mainNavRef;
        const dropdownRef = this.$refs.dropdownRef;

        if (imageContainer && mainNavRef) {
          const mapHeight = imageContainer.offsetHeight;
          const navHeight = mainNavRef.offsetHeight;
          const navMarginTop = 16; 

          const totalHeightForListBox = mapHeight + navMarginTop + navHeight;
          this.fixedListHeight = `${totalHeightForListBox}px`;

          let dropdownHeight = 0;
          const dropdownMarginTop = 4; 

          if (this.selectedButtonId && dropdownRef && dropdownRef.offsetHeight > 0) {
             dropdownHeight = dropdownRef.offsetHeight + dropdownMarginTop;
          }

          this.dropdownPaddingBottom = dropdownHeight > 0 ? dropdownRef.offsetHeight + dropdownMarginTop : 0; 
        } else {
          this.fixedListHeight = '500px'; 
          this.dropdownPaddingBottom = 0;
        }
      });
    },
    setupResizeObserver() {
      if (this.resizeObserver) {
          this.resizeObserver.disconnect();
      }
      const imageContainer = this.$refs.imageContainer;
      const mainNavRef = this.$refs.mainNavRef;

      if (imageContainer && mainNavRef) { 
          this.resizeObserver = new ResizeObserver(entries => {
              this.updateFixedListHeight(); 
          });

          this.resizeObserver.observe(imageContainer);
          this.resizeObserver.observe(mainNavRef);
      } else {
          console.warn('ResizeObserver setup failed: Refs not available during setup.'); 
      }
    },
    initScrollReveal() {
      const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            
            setTimeout(() => {
              el.classList.add('revealed');
            }, delay * 1000);
            
            if (!el.classList.contains('church-list-persistent')) {
              observer.unobserve(el);
            }
          }
        });
      }, observerOptions);

      document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
      });
    },
    toggleExpand(id) {
      this.expandedChurchId = this.expandedChurchId === id ? null : id;
    },
    getSubRegionsForRegion(regionId) {
      return this.regionButtons[regionId] || [];
    },
    async fetchRegionButtons() {
      try {
        const response = await fetch('/api/getRegions.php'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.regionButtons = data;
        console.log('Region buttons loaded:', this.regionButtons);
      } catch (error) {
        console.error('Error fetching region buttons:', error);
      }
    },
  }
};
</script>

<style scoped>
/* Glassmorphism Base Styles */
.glass-panel {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(132, 48, 140, 0.15);
}

.glass-panel-light {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(187, 51, 127, 0.1);
}

.glass-button {
  /* 스타일 정의 */
}

.glass-active-button {
  background-color: rgba(132, 48, 140, 0.8); 
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(132, 48, 140, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.glass-active-button:hover {
  background-color: rgba(107, 38, 112, 0.9); 
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(132, 48, 140, 0.4);
}

.glass-inactive-button {
  background-color: rgba(255, 255, 255, 0.15);
  color: #475569; 
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.glass-inactive-button:hover {
  background-color: rgba(248, 232, 242, 0.2); 
  color: #334155; 
}

/* Custom Scrollbar */
.custom-scrollbar-thin::-webkit-scrollbar {
  width: 5px;
  height: 7px;
}

.custom-scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(132, 48, 140, 0.3); 
  border-radius: 4px;
}

.custom-scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(132, 48, 140, 0.5); 
}

/* Dropdown Transition */
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to, .dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Fade Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-move {
  transition: transform 0.3s ease;
}

.map-inner {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-out;
}

.map-button {
  min-width: 40px;
  min-height: 40px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  z-index: 10;
}

.region-button {
  min-width: 30px;
  min-height: 30px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.animate-float {
  animation: float 6s infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.map-control-button {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.map-control-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
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

/* Slide-Fade Transition */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-fade-enter-to, .slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
