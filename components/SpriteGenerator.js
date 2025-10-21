// Sprite Generator - Creates pixel art sprites as base64 data URLs

export function generateMarioSprite(state = 'small') {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  
  if (state === 'small') {
    canvas.width = 16
    canvas.height = 16
    
    // Fill background transparent
    ctx.clearRect(0, 0, 16, 16)
    
    // Mario small sprite (16x16)
    const pixels = [
      [0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
      [0,0,2,2,2,3,3,2,3,0,0,0,0,0,0,0],
      [0,2,3,2,3,3,3,2,3,3,3,0,0,0,0,0],
      [0,2,3,2,2,3,3,3,2,3,3,3,0,0,0,0],
      [0,2,2,3,3,3,3,2,2,2,2,0,0,0,0,0],
      [0,0,0,3,3,3,3,3,3,3,0,0,0,0,0,0],
      [0,0,1,1,4,1,1,1,0,0,0,0,0,0,0,0],
      [0,1,1,1,4,1,1,4,1,1,1,0,0,0,0,0],
      [1,1,1,1,4,4,4,4,1,1,1,1,0,0,0,0],
      [3,3,1,4,5,4,4,5,4,1,3,3,0,0,0,0],
      [3,3,3,4,4,4,4,4,4,3,3,3,0,0,0,0],
      [3,3,4,4,4,4,4,4,4,4,3,3,0,0,0,0],
      [0,0,4,4,4,0,0,4,4,4,0,0,0,0,0,0],
      [0,2,2,2,0,0,0,0,2,2,2,0,0,0,0,0],
      [2,2,2,2,0,0,0,0,2,2,2,2,0,0,0,0],
    ]
    
    const colors = {
      0: null,
      1: '#FF0000',
      2: '#8B4513',
      3: '#FFE4C4',
      4: '#0000FF',
      5: '#FFD700',
    }
    
    pixels.forEach((row, y) => {
      row.forEach((pixel, x) => {
        if (colors[pixel]) {
          ctx.fillStyle = colors[pixel]
          ctx.fillRect(x, y, 1, 1)
        }
      })
    })
  }
  
  return canvas.toDataURL('image/png')
}

export function generateGoombaSprite() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  canvas.width = 16
  canvas.height = 16
  ctx.clearRect(0, 0, 16, 16)
  
  const pixels = [
    [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,2,2,1,1,1,1,1,1,2,2,1,1,0],
    [1,1,1,2,3,2,1,1,1,1,2,3,2,1,1,1],
    [1,1,1,2,2,2,1,1,1,1,2,2,2,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,4,4,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,4,4,4,4,1,1,1,1,1,1],
    [1,1,1,1,1,1,4,4,4,4,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,4,4,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,5,5,1,1,1,1,1,1,1,1,5,5,0,0],
    [0,5,5,5,5,0,0,0,0,0,0,5,5,5,5,0],
    [5,5,5,5,5,5,0,0,0,0,5,5,5,5,5,5],
  ]
  
  const colors = {
    0: null,
    1: '#8B4513',
    2: '#FFFFFF',
    3: '#000000',
    4: '#654321',
    5: '#D2691E',
  }
  
  pixels.forEach((row, y) => {
    row.forEach((pixel, x) => {
      if (colors[pixel]) {
        ctx.fillStyle = colors[pixel]
        ctx.fillRect(x, y, 1, 1)
      }
    })
  })
  
  return canvas.toDataURL('image/png')
}

export function generateKoopaSprite() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  canvas.width = 16
  canvas.height = 24
  ctx.clearRect(0, 0, 16, 24)
  
  // Shell (green)
  ctx.fillStyle = '#00AA00'
  ctx.fillRect(2, 8, 12, 12)
  
  // Shell pattern (yellow)
  ctx.fillStyle = '#FFFF00'
  ctx.fillRect(4, 10, 8, 2)
  ctx.fillRect(4, 14, 8, 2)
  
  // Head (light green)
  ctx.fillStyle = '#90EE90'
  ctx.fillRect(4, 2, 8, 6)
  
  // Eyes
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(5, 3, 2, 2)
  ctx.fillRect(9, 3, 2, 2)
  
  // Pupils
  ctx.fillStyle = '#000000'
  ctx.fillRect(6, 4, 1, 1)
  ctx.fillRect(10, 4, 1, 1)
  
  return canvas.toDataURL('image/png')
}

export function generateCoinSprite() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  canvas.width = 16
  canvas.height = 16
  ctx.clearRect(0, 0, 16, 16)
  
  // Gold outer circle
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(5, 3, 6, 10)
  ctx.fillRect(4, 5, 8, 6)
  ctx.fillRect(3, 6, 10, 4)
  
  // Inner orange
  ctx.fillStyle = '#FFA500'
  ctx.fillRect(6, 5, 4, 6)
  ctx.fillRect(5, 6, 6, 4)
  
  // Highlight
  ctx.fillStyle = '#FFFF00'
  ctx.fillRect(6, 5, 2, 2)
  
  return canvas.toDataURL('image/png')
}

export function generateMushroomSprite() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  canvas.width = 16
  canvas.height = 16
  ctx.clearRect(0, 0, 16, 16)
  
  const pixels = [
    [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,2,2,1,1,1,1,1,1,2,2,1,1,0],
    [1,1,1,2,2,1,1,1,1,1,1,2,2,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
    [0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
    [0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
    [0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
    [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
    [0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ]
  
  const colors = {
    0: null,
    1: '#FF0000',
    2: '#FFFFFF',
    3: '#FFE4C4',
  }
  
  pixels.forEach((row, y) => {
    row.forEach((pixel, x) => {
      if (colors[pixel]) {
        ctx.fillStyle = colors[pixel]
        ctx.fillRect(x, y, 1, 1)
      }
    })
  })
  
  return canvas.toDataURL('image/png')
}

export function generateBrickSprite() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  canvas.width = 16
  canvas.height = 16
  ctx.clearRect(0, 0, 16, 16)
  
  // Base brick color
  ctx.fillStyle = '#CD853F'
  ctx.fillRect(0, 0, 16, 16)
  
  // Darker brick lines
  ctx.fillStyle = '#8B4513'
  ctx.fillRect(0, 5, 16, 1)
  ctx.fillRect(0, 11, 16, 1)
  ctx.fillRect(7, 0, 1, 5)
  ctx.fillRect(3, 6, 1, 5)
  ctx.fillRect(11, 6, 1, 5)
  ctx.fillRect(7, 12, 1, 4)
  
  return canvas.toDataURL('image/png')
}

export function generateQuestionBlockSprite(used = false) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  canvas.width = 16
  canvas.height = 16
  ctx.clearRect(0, 0, 16, 16)
  
  if (used) {
    // Used block (brown)
    ctx.fillStyle = '#8B4513'
    ctx.fillRect(0, 0, 16, 16)
    ctx.fillStyle = '#654321'
    ctx.fillRect(2, 2, 12, 12)
  } else {
    // Question block (gold)
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(0, 0, 16, 16)
    
    // ? mark (white)
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(6, 3, 4, 2)
    ctx.fillRect(8, 5, 2, 2)
    ctx.fillRect(7, 7, 2, 2)
    ctx.fillRect(7, 10, 2, 2)
    
    // Border (darker gold)
    ctx.fillStyle = '#FFA500'
    ctx.fillRect(1, 1, 14, 1)
    ctx.fillRect(1, 1, 1, 14)
  }
  
  return canvas.toDataURL('image/png')
}

export function generatePipeSprite() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  canvas.width = 32
  canvas.height = 32
  ctx.clearRect(0, 0, 32, 32)
  
  // Pipe body (green)
  ctx.fillStyle = '#00AA00'
  ctx.fillRect(0, 8, 32, 24)
  
  // Pipe top (lighter green)
  ctx.fillStyle = '#00DD00'
  ctx.fillRect(0, 0, 32, 10)
  
  // Highlights (even lighter)
  ctx.fillStyle = '#44FF44'
  ctx.fillRect(2, 2, 4, 6)
  ctx.fillRect(2, 10, 4, 20)
  
  // Shadows (darker)
  ctx.fillStyle = '#006600'
  ctx.fillRect(26, 2, 4, 6)
  ctx.fillRect(26, 10, 4, 20)
  
  // Inner pipe opening (black oval)
  ctx.fillStyle = '#000000'
  ctx.fillRect(10, 14, 12, 8)
  ctx.fillRect(12, 12, 8, 12)
  
  return canvas.toDataURL('image/png')
} 10, 4, 20)
  
  // Shadows
  ctx.fillStyle = '#008800'
  ctx.fillRect(26, 2, 4, 6)
  ctx.fillRect(26, 10, 4, 20)
  
  // Inner circle (pipe opening)
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.ellipse(16, 16, 8, 6, 0, 0, Math.PI * 2)
  ctx.fill()
  
  return canvas.toDataURL('image/png')
}