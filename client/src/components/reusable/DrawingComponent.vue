<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, type Ref } from 'vue'
import { useWebSocketStore } from '@/stores/useWebSocketStore'
import { useIsIngameStore } from '@/stores/useIsIngameStore'
import router from '@/router'

// Import
import NButton from '@/components/reusable/N-UILibrary/N-Button.vue'

// Drawing Data
interface DrawingData {
  userId: string
  x: number
  y: number
  color: string
  brushSize: number
}

// Props
const props = defineProps({
  multiplayer: {
    type: Boolean,
    default: true
  },
  showControls: {
    type: Boolean,
    default: true
  },
  drawable: {
    type: Boolean,
    default: true // Set drawable to true by default
  }
})

// Variables
const canvas: Ref<HTMLCanvasElement | null> = ref(null)
let ctx: CanvasRenderingContext2D | null = null
let drawing = false
let color: Ref<string> = ref('#000000')
let brushSize: Ref<number> = ref(10)

const webSocket = useWebSocketStore()
const isIngame = useIsIngameStore()

onMounted(() => {
  if (!isIngame.isIngame) {
    router.push('/connect-room')
    return
  }

  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    canvas.value.addEventListener('mousedown', startDrawing)
    canvas.value.addEventListener('mousemove', draw)
    window.addEventListener('mouseup', stopDrawing)
    adjustCanvasSize()
    window.addEventListener('resize', adjustCanvasSize)
  }

  if (props.multiplayer) {
    webSocket.socket?.on('drawingData', (data: DrawingData) => {
      drawOnCanvas(data)
    })
  }

  webSocket.socket?.on('drawingData', (data) => {
    console.log('drawingData', data)
    drawOnCanvas(data)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', adjustCanvasSize)
})

/**
 * Function for starting the drawing process
 * @param e - MouseEvent
 * @returns void
 */
function startDrawing(e: MouseEvent) {
  e.preventDefault()
  if (props.drawable) {
    drawing = true
    draw(e)
  }
}

/**
 * Draw on the canvas
 * @param e - MouseEvent
 * @returns void
 */
function draw(e: MouseEvent) {
  if (!drawing || !ctx || !canvas.value) return

  const rect = canvas.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  ctx.lineWidth = brushSize.value
  ctx.lineCap = 'round'
  ctx.strokeStyle = color.value

  ctx.lineTo(x, y)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x, y)

  const data: DrawingData = {
    userId: webSocket.username,
    x,
    y,
    color: color.value,
    brushSize: brushSize.value
  }
  if (props.multiplayer) {
    sendDrawingData(data)
  }
}

/**
 * Send drawing data to the server
 * @param data - DrawingData
 * @returns void
 */
function sendDrawingData(data: DrawingData) {
  webSocket.socket?.emit('drawingData', data, isIngame.roomId)
}

/**
 * Stop drawing
 * @returns void
 */
function stopDrawing() {
  if (!drawing || !ctx) return
  drawing = false
  ctx.beginPath()

  if (props.multiplayer) {
    webSocket.socket?.emit('drawingData', false, isIngame.roomId)
  }
}

let lastUserId: string | null = null

/**
 * Draw on the canvas
 * @param data - DrawingData
 * @returns void
 */
function drawOnCanvas(data: DrawingData) {
  if (!ctx) return

  console.log(data.userId, 'vs', lastUserId)
  // If the drawing data is from a different user, start a new path
  if (data.userId !== lastUserId) {
    console.log('New path')
    ctx.beginPath()
    ctx.moveTo(data.x, data.y)
  }

  ctx.lineTo(data.x, data.y)
  ctx.strokeStyle = data.color
  ctx.lineWidth = data.brushSize
  ctx.stroke()

  lastUserId = data.userId
}

/**
 * Adjust the canvas size
 * @returns void
 */
function adjustCanvasSize() {
  if (canvas.value) {
    const rect = canvas.value.parentElement?.getBoundingClientRect()
    if (rect) {
      const scale = window.devicePixelRatio

      canvas.value.style.width = rect.width + 'px'
      canvas.value.style.height = rect.height + 'px'

      canvas.value.width = rect.width * scale
      canvas.value.height = rect.height * scale

      ctx?.scale(scale, scale)
    }
  }
}

webSocket.socket?.on('clearCanvas', () => {
  clearCanvas(true)
})

/**
 * Clear the canvas
 * @param fromSocket - boolean
 * @returns void
 */
function clearCanvas(fromSocket = false) {
  if (ctx && canvas.value) {
    if (!fromSocket) {
      webSocket.socket?.emit('clearCanvas', isIngame.roomId)
    }
    const scale = window.devicePixelRatio

    // Temporarily reset the scale to 1
    ctx.setTransform(1, 0, 0, 1, 0, 0)

    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    // Restore the original scale
    ctx.setTransform(scale, 0, 0, scale, 0, 0)
  }
}
</script>

<template>
  <div class="paint-container">
    <canvas ref="canvas" id="canvas"></canvas>
    <div class="controls" v-if="showControls">
      <input type="color" v-model="color" />
      <N-Button
        :backgroundColor="'#197278'"
        :color="'#EDDDD4'"
        :size="'small'"
        :rounded="true"
        @click.prevent="clearCanvas"
        >Ryd canvas</N-Button
      >
      <input type="range" v-model="brushSize" min="1" max="15" />
    </div>
  </div>
</template>

<style scoped>
.paint-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

#canvas {
  border: 4px solid #61dafb; /* Bright border color for contrast */
  background-color: white; /* Ensure canvas background is white */
  width: 100%;
  height: 90%; /* Adjust height to leave space for controls */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for the canvas */
  cursor: crosshair;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px; /* Padding inside the controls area */
  background: #20232a; /* Dark background for controls area */
  border-radius: 8px; /* Rounded corners for controls area */
  width: 100%; /* Full width for alignment */
  box-sizing: border-box; /* Ensure padding doesn't increase width */
}

input[type='color'] {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%; /* Make color picker circular */
  cursor: pointer;
}

input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type='color']::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
}

button {
  background-color: #61dafb; /* Button background */
  color: #282c34; /* Button text color */
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 8px; /* Rounded button */
}

button:hover {
  background-color: #282c34;
  color: white;
}
</style>
