<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useWebSocketStore } from '@/stores/useWebSocketStore'

const canvas = ref(null)
let ctx = null
let drawing = false
let x = 0
let y = 0
let color = ref('#000000')
let brushSize = ref(10)

const webSocket = useWebSocketStore()

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  canvas.value.addEventListener('mousedown', startDrawing)
  canvas.value.addEventListener('mousemove', draw)
  window.addEventListener('mouseup', stopDrawing)

  webSocket.initializeSocket()
  webSocket.socket.on('drawingData', (data) => {
    drawOnCanvas(data)
  })
})

onUnmounted(() => {
  webSocket.disconnectSocket()
})

function startDrawing(e) {
  drawing = true
  draw(e)
}

function draw(e) {
  if (!drawing) return
  ctx.lineWidth = brushSize.value
  ctx.lineCap = 'round'
  ctx.strokeStyle = color.value

  ctx.lineTo(e.clientX, e.clientY)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(e.clientX, e.clientY)
  console.log(e.clientX, e.clientY)

  const data = {
    x: e.clientX,
    y: e.clientY,
    color: color.value,
    brushSize: brushSize.value
  }
  webSocket.socket.emit('drawingData', data)
}

function stopDrawing() {
  if (!drawing) return
  drawing = false
  ctx.beginPath()
}

function drawOnCanvas(data) {
  ctx.lineWidth = data.brushSize
  ctx.lineCap = 'round'
  ctx.strokeStyle = data.color

  ctx.lineTo(data.x, data.y)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(data.x, data.y)
}
</script>

<template>
  <div>
    <canvas ref="canvas" id="canvas" width="800" height="600"></canvas>
    <div class="controls">
      <input type="color" v-model="color" />
      <input type="range" v-model="brushSize" min="1" max="50" />
    </div>
  </div>
</template>

<style scoped>
#canvas {
  border: 1px solid black;
}
.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}
</style>
