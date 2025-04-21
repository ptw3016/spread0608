<template>
  <section id="ministriesmap" class="scroll-mt-24 py-20 px-4 relative overflow-hidden">
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
      <div>
        <div v-if="selectedRegion">
          <!-- 선택된 지역에 대한 내용 표시 (필요시 구현) -->
        </div>
        <div v-else class="bg-white bg-opacity-25 backdrop-blur-lg p-8 md:p-16 rounded-3xl shadow-2xl border border-white border-opacity-40 transform hover:rotate-x-1 transition-transform duration-700">
          <!-- Header section with floating elements -->
          <div class="text-center mb-14 relative">
            <!-- Floating decorative elements -->
            <div class="absolute -top-10 left-1/4 w-16 h-16 bg-amber-100 rounded-full opacity-60 animate-float" style="animation-delay: 0.5s; animation-duration: 6s;"></div>
            <div class="absolute -top-5 right-1/4 w-10 h-10 bg-teal-100 rounded-full opacity-60 animate-float" style="animation-delay: 1s; animation-duration: 7s;"></div>
            
            <span class="inline-block py-1 px-4 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 text-sm font-medium mb-4 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
              <i class="fas fa-map-marker-alt text-amber-500 mr-2"></i>전국 사역 네트워크
            </span>
            
            <h2 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-amber-600">사역지도</span>
            </h2>
            
            <div class="relative w-32 h-2 mx-auto mb-8">
              <div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-teal-400 rounded-full"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-teal-400 rounded-full animate-pulse"></div>
            </div>
            
            <p class="text-gray-600 max-w-2xl mx-auto text-lg">
              흩어지는교회의 전국 사역 네트워크를 확인하고 지역별 교회 정보를 살펴보세요
            </p>
          </div>

          <!-- 지도 + 네비게이션 바 & 교회 목록 컨테이너 -->
          <div class="mt-1 flex flex-col md:flex-row justify-start">

            <!-- 왼쪽: 지도 + 네비게이션 바 컬럼 -->
            <div class="flex flex-col w-full md:w-1/2 mb-4 md:mb-0 md:mr-2 transition-all duration-300">
              <!-- 도구 모음 - 개선된 컨트롤 패널 -->
              <div class="absolute top-3 left-3 z-20">
                <div class="glass-panel rounded-xl py-2 px-3 flex space-x-2 border border-white border-opacity-40 shadow-lg">
                  <button @click="zoomIn" class="map-control-button p-2 rounded-lg hover:bg-white hover:bg-opacity-30 transition-all duration-300 group">
                    <i class="fas fa-search-plus text-teal-700 group-hover:text-teal-900"></i>
                  </button>
                  <button @click="zoomOut" class="map-control-button p-2 rounded-lg hover:bg-white hover:bg-opacity-30 transition-all duration-300 group">
                    <i class="fas fa-search-minus text-teal-700 group-hover:text-teal-900"></i>
                  </button>
                  <div class="h-8 w-px bg-white bg-opacity-30 mx-1"></div>
                  <button @click="resetMap" class="map-control-button p-2 rounded-lg hover:bg-white hover:bg-opacity-30 transition-all duration-300 group">
                    <i class="fas fa-redo text-teal-700 group-hover:text-teal-900"></i>
                  </button>
                  <button v-if="!showButtons" @click="goBack" class="map-control-button p-2 rounded-lg hover:bg-white hover:bg-opacity-30 transition-all duration-300 group">
                    <i class="fas fa-arrow-left text-teal-700 group-hover:text-teal-900"></i>
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
                        class="map-button absolute text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                        :style="buttonStyle(btn, 'main')"
                        @click="onMapButtonClick(btn)"
                      >
                        <span class="flex items-center justify-center w-full h-full bg-gradient-to-br from-teal-500 to-teal-600 rounded-full p-1 md:p-2">
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
                        class="region-button absolute text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                        :style="buttonStyle(btn, 'detail')"
                        @click="onRegionButtonClick(btn)"
                      >
                        <span class="flex items-center justify-center w-full h-full bg-gradient-to-br from-amber-500 to-amber-600 rounded-full p-1 md:p-2">
                          {{ btn.label }}
                        </span>
                      </button>
                    </transition-group>
                  </div>
                </div>
                <!-- Navigation Bar -->
                <div class="relative mt-4 w-full">
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
                      class="absolute left-0 top-full w-full glass-panel-light py-3 px-5 rounded-b-xl shadow-glass mt-1 z-0" 
                    >
                      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"> 
                        <button
                          v-for="subBtn in regionButtons[selectedButtonId]"
                          :key="subBtn.id + '-sub'" 
                          class="sub-nav-button rounded-lg shadow-sm transition-all duration-300 whitespace-nowrap px-3 py-1.5 text-sm border transform"
                          :class="selectedSubButtonId === subBtn.id ? 'amber-active-button' : 'amber-inactive-button'"
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
              class="w-full md:w-1/2 glass-panel rounded-xl p-5 flex flex-col items-center justify-center md:ml-2 min-h-[300px]"
            >
              <!-- 초기 안내 메시지 -->
              <p v-if="!selectedChurch && !selectedSubRegionId && !isLoadingChurches" class="text-gray-600 text-center">
                <i class="fas fa-church text-4xl mb-3 block text-teal-400"></i>
                지역의 세부 버튼을 클릭하면<br>교회 목록이 표시됩니다.
              </p>
              <!-- 교회 목록 -->
              <div v-else-if="selectedChurches.length > 0" class="w-full p-4 border-b border-teal-200 last:border-b-0 pb-4">
                <h3 class="text-xl font-bold text-teal-900 mb-4">{{ getSelectedRegionName() }} 교회 목록</h3>
                <div v-for="(church, index) in selectedChurches" :key="church.id" class="p-4 border-b border-teal-200 last:border-b-0 pb-4">
                  <h4 class="text-lg font-semibold text-teal-700">{{ church.name }}</h4>
                  <p class="text-gray-700"><span class="font-medium">목사:</span> {{ church.pastor }}</p>
                  <p class="text-gray-700"><span class="font-medium">주소:</span> {{ church.address }}</p>
                  <p class="text-gray-700"><span class="font-medium">전화번호:</span> {{ church.phone }}</p>
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
import defaultMapImage from '../assets/mapsample.png';
import gangwonMapImage from '../assets/gangwon-do_cut.png';
import gyeonggiMapImage from '../assets/gyeonggi-do_cut.png';
import gyeongsangbukMapImage from '../assets/gyeongsangbuk-do_cut.png';
import gyeongsangnamMapImage from '../assets/gyeongsangnam-do_cut.png';
import chungcheongnamMapImage from '../assets/chungcheongnam-do_cut copy.png';
import chungcheongbukMapImage from '../assets/chungcheongbuk-do_cut.png';
import jeollanamMapImage from '../assets/jeollanam-do_cut.png';
import jeonbukMapImage from '../assets/jeollabuk-do_cut.png';
import jejuMapImage from '../assets/jeju-do_cut.png';
import { churchData } from '../data/churchData';

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
        { id: 1, x: 450, y: 280, label: "경기도", map: gyeonggiMapImage },
        { id: 2, x: 645, y: 220, label: "강원도", map: gangwonMapImage },
        { id: 3, x: 700, y: 470, label: "경상북도", map: gyeongsangbukMapImage },
        { id: 4, x: 400, y: 450, label: "충청남도", map: chungcheongnamMapImage },
        { id: 5, x: 550, y: 410, label: "충청북도", map: chungcheongbukMapImage },
        { id: 6, x: 410, y: 730, label: "전라남도", map: jeollanamMapImage },
        { id: 7, x: 450, y: 600, label: "전라북도", map: jeonbukMapImage },
        { id: 8, x: 630, y: 660, label: "경상남도", map: gyeongsangnamMapImage },
        { id: 9, x: 350, y: 1000, label: "제주도", map: jejuMapImage },
      ],
      currentRegionId: null,
      regionButtons: {
        1: [
          { id: 'gg1', x: 120, y: 180, label: '수원시' },
          { id: 'gg2', x: 200, y: 250, label: '성남시' },
          { id: 'gg3', x: 150, y: 300, label: '고양시' }
        ],
        2: [
          { id: 'kw1', x: 120, y: 180, label: '춘천시' },
          { id: 'kw2', x: 200, y: 250, label: '강릉시' }
        ],
        3: [
          { id: 'gb1', x: 150, y: 200, label: '포항시' },
          { id: 'gb2', x: 250, y: 300, label: '경주시' },
          { id: 'gb3', x: 180, y: 350, label: '안동시' }
        ],
        4: [
          { id: 'cn1', x: 100, y: 150, label: '천안시' },
          { id: 'cn2', x: 180, y: 220, label: '아산시' }
        ],
        5: [
          { id: 'cb1', x: 130, y: 170, label: '청주시' },
          { id: 'cb2', x: 210, y: 240, label: '충주시' }
        ],
        6: [
          { id: 'jn1', x: 110, y: 160, label: '목포시' },
          { id: 'jn2', x: 190, y: 230, label: '여수시' },
          { id: 'jn3', x: 140, y: 280, label: '순천시' }
        ],
        7: [
          { id: 'jb1', x: 140, y: 190, label: '전주시' },
          { id: 'jb2', x: 220, y: 260, label: '익산시' }
        ],
        8: [
          { id: 'gn1', x: 160, y: 210, label: '창원시' },
          { id: 'gn2', x: 240, y: 280, label: '김해시' }
        ],
        9: [
          { id: 'jj1', x: 90, y: 140, label: '제주시' },
          { id: 'jj2', x: 170, y: 210, label: '서귀포시' }
        ]
      },
      selectedChurches: [],
      churchData,
      mapWidth: 1200,
      mapHeight: 900,
      resizeObserver: null,
      isMobile: false, // Add mobile state
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
      // Watcher for selectedButtonId
      // When the selected button changes, update padding and potentially recalculate height
      this.$nextTick(() => {
        this.updateFixedListHeight(); // Recalculate height when dropdown appears/disappears
        
        // If a main button was clicked (not going back to '전체')
        if (newVal !== null) {
          const mainNav = this.$refs.mainNavRef;
          if (mainNav) {
            const selectedButtonElement = mainNav.querySelector(`button[data-id='${newVal}']`);
            if (selectedButtonElement) {
              // Scroll the selected button into view within the main navigation bar
              selectedButtonElement.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
              });
            }
          }
        }
      });
    }
  },
  mounted() {
    console.log('Component mounted'); // Add log
    this.checkMobile(); // Check initial screen size
    window.addEventListener('resize', this.checkMobile); // Add resize listener
    this.resetMap();
    this.$nextTick(() => {
      console.log('Mounted - nextTick starts'); // Add log
      this.updateFixedListHeight();
      console.log('Mounted - setting up ResizeObserver'); // Add log
      this.setupResizeObserver(); // Ensure ResizeObserver is set up
      console.log('Mounted - nextTick ends'); // Add log
    });
  },
  beforeUnmount() {
    console.log('Component beforeUnmount'); // Add log
    window.removeEventListener('resize', this.checkMobile); // Remove resize listener
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  },
  methods: {
    checkMobile() {
      const previouslyMobile = this.isMobile;
      this.isMobile = window.innerWidth < 768; // Example breakpoint for mobile
      // Only reset map if the mobile state actually changes to avoid unnecessary resets
      if (previouslyMobile !== this.isMobile) {
          this.resetMap(); // Reset map when screen size changes enough to toggle mobile state
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
          this.zoomLevel = 0.9; this.imageOffset = { x: 150, y: 20 }; // Mobile
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 200, y: 30 }; // Desktop
        }
      } else if (this.currentMap === gyeonggiMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 120, y: 10 }; // Mobile
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 150, y: 20 }; // Desktop
        }
      } else if (this.currentMap === gyeongsangbukMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 180, y: 30 }; // Mobile
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 220, y: 40 }; // Desktop
        }
      } else if (this.currentMap === gyeongsangnamMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 150, y: 60 }; // Mobile
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 180, y: 70 }; // Desktop
        }
      } else if (this.currentMap === chungcheongnamMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 130, y: 40 }; // Mobile
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 160, y: 50 }; // Desktop
        }
      } else if (this.currentMap === chungcheongbukMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 110, y: 50 }; // Mobile
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 140, y: 60 }; // Desktop
        }
      } else if (this.currentMap === jeollanamMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 100, y: 70 }; // Mobile
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 120, y: 80 }; // Desktop
        }
      } else if (this.currentMap === jeonbukMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 110, y: 80 }; // Mobile
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 130, y: 90 }; // Desktop
        }
      } else if (this.currentMap === jejuMapImage) {
        if (this.isMobile) {
          this.zoomLevel = 0.9; this.imageOffset = { x: 170, y: 90 }; // Mobile
        } else {
          this.zoomLevel = 1; this.imageOffset = { x: 200, y:100 }; // Desktop
        }
      } else {
        // Apply different settings based on isMobile for the MAIN map
        if (this.isMobile) {
          this.zoomLevel = 0.4; 
          this.imageOffset = { x: -25, y: -30 }; 
        } else {
          // Desktop settings
          this.zoomLevel = 0.4; 
          this.imageOffset = { x: 130, y: -60 };
        }
      }
      this.lastOffset = { ...this.imageOffset };
    },
    startDrag(e) {
      // Check if it's a touch event or a left mouse button click
      if (e.type === 'mousedown' && e.button !== 0) return;

      this.dragging = true;
      const point = e.touches ? e.touches[0] : e; // Use touches for touch events
      this.dragStart = {
        x: point.clientX,
        y: point.clientY
      };
      this.lastOffset = { ...this.imageOffset };
      // e.preventDefault() is called via .prevent modifier for mousedown/touchstart
    },
    onDrag(e) {
      if (!this.dragging) return;

      // Prevent default scrolling behavior ONLY for touchmove
      if (e.type === 'touchmove') {
        e.preventDefault();
      }

      const point = e.touches ? e.touches[0] : e; // Use touches for touch events
      const dx = point.clientX - this.dragStart.x;
      const dy = point.clientY - this.dragStart.y;
      this.imageOffset = {
        x: this.lastOffset.x + dx,
        y: this.lastOffset.y + dy
      };
    },
    endDrag() {
      if (!this.dragging) return; // Prevent unnecessary state changes
      this.dragging = false;
    },
    buttonStyle(btn, type = 'main') {
      let baseWidth, baseHeight, baseFontSize;

      if (type === 'detail') {
        // 상세 버튼 크기 (기존 메인 버튼의 절반)
        baseWidth = 80; 
        baseHeight = 35; 
        baseFontSize = 14; 
      } else {
        // 메인 버튼 크기 (사용자가 설정한 크기 유지)
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
      this.selectedSubButtonId = null; 
      this.resetMap();
      this.$nextTick(this.updateFixedListHeight);
    },
    onRegionButtonClick(btn) {
      console.log("지역 상세 버튼 클릭:", btn.label);
      // Find the corresponding church data using the button's id
      this.selectedChurches = churchData[btn.id] || [];
      // Note: currentRegionId should already be set from onMapButtonClick
    },
    onSubRegionButtonClick(btn) {
      console.log("서브 네비게이션 버튼 클릭:", btn.label);
      this.selectedSubButtonId = btn.id;
      this.selectedChurches = this.churchData[btn.id] || [];
    },
    getSelectedRegionName() {
      if (this.selectedSubButtonId) {
        for (const regionId in this.regionButtons) {
          const subButtons = this.regionButtons[regionId];
          for (const subBtn of subButtons) {
            if (subBtn.id === this.selectedSubButtonId) {
              return subBtn.label;
            }
          }
        }
      }
      return '';
    },
    goBack() {
      this.currentMap = defaultMapImage;
      this.selectedButtonId = null; 
      this.showButtons = true; 
      this.isMapChanged = false; // 지도 상태 초기화
      this.resetMap(); // 기본 지도 위치/확대 복원

      // 오른쪽 목록 선택 상태 초기화 추가
      this.selectedRegionId = null; 
      this.selectedSubButtonId = null;
      this.selectedChurches = []; 
      this.selectedChurchId = null;
      this.$nextTick(this.updateFixedListHeight); // 목록 높이 재계산
    },
    handleWheelZoom(event) {
      if (event.deltaY < 0) {
        // 휠 위로 스크롤: 확대
        this.zoomIn();
      } else if (event.deltaY > 0) {
        // 휠 아래로 스크롤: 축소
        this.zoomOut();
      }
      // .prevent 수식어가 event.preventDefault()를 처리합니다.
    },
    updateFixedListHeight() {
      console.log('updateFixedListHeight called'); // Add log
      this.$nextTick(() => {
        console.log('updateFixedListHeight - inside nextTick'); // Add log
        const imageContainer = this.$refs.imageContainer;
        const mainNavRef = this.$refs.mainNavRef;
        const dropdownRef = this.$refs.dropdownRef;

        if (imageContainer && mainNavRef) {
          const mapHeight = imageContainer.offsetHeight;
          const navHeight = mainNavRef.offsetHeight;
          const navMarginTop = 16; // Corresponds to mt-4

          const totalHeightForListBox = mapHeight + navMarginTop + navHeight;
          console.log(`Calculating height: Map=${mapHeight}, Nav=${navHeight}, Margin=${navMarginTop}, Total=${totalHeightForListBox}`); // Add log
          this.fixedListHeight = `${totalHeightForListBox}px`;

          let dropdownHeight = 0;
          const dropdownMarginTop = 4; // Corresponds to mt-1 on the dropdown

          // Check if dropdown is visible and exists in the DOM
          if (this.selectedButtonId && dropdownRef && dropdownRef.offsetHeight > 0) {
             dropdownHeight = dropdownRef.offsetHeight + dropdownMarginTop;
          }

          // Update padding for the map container if the dropdown is open
          // Note: This padding seems intended to prevent the map from being obscured by the absolute positioned dropdown.
          // However, the current implementation adds padding *below* the map container, not pushing the nav down.
          // This might need revisiting if the visual goal is different.
          this.dropdownPaddingBottom = dropdownHeight > 0 ? dropdownRef.offsetHeight + dropdownMarginTop : 0; 

        } else {
          console.log('updateFixedListHeight - refs not ready, using fallback'); // Add log
          // Keep previous height or set a default minimum if elements disappear temporarily
          if (!this.fixedListHeight || this.fixedListHeight === 'auto') {
             this.fixedListHeight = '500px'; // Set a reasonable default minimum height
          }
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
              console.log('ResizeObserver triggered'); // Add log
              this.updateFixedListHeight(); // Call the height update method
          });

          this.resizeObserver.observe(imageContainer);
          this.resizeObserver.observe(mainNavRef);
      } else {
          console.warn('ResizeObserver setup failed: Refs not available during setup.'); // Add log
      }
    }
  }
};
</script>

<style scoped>
/* Glassmorphism Base Styles */
.glass-panel {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
}

.glass-panel-light {
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
}

.glass-button {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
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

.glass-inactive-button {
  background-color: rgba(255, 255, 255, 0.1);
  color: #475569; /* slate-600 */
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.glass-inactive-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #334155; /* slate-700 */
}

.amber-active-button {
  background-color: rgba(245, 158, 11, 0.8); /* amber-500 */
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.amber-active-button:hover {
  background-color: rgba(217, 119, 6, 0.9); /* amber-600 */
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(245, 158, 11, 0.4);
}

.amber-inactive-button {
  background-color: rgba(255, 255, 255, 0.1);
  color: #475569; /* slate-600 */
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.amber-inactive-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #334155; /* slate-700 */
}

.shadow-glass {
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
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

/* Dropdown Transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
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
</style>