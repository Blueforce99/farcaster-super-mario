// Sprite Generator - Creates pixel art sprites as base64 data URLs

export function generateMarioSprite(state = 'small') {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (state === 'small') {
    canvas.width = 16
    canvas.height = 16
    
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
      0: null,           // transparent
      1: '#FF0000',      // red (hat/shirt)
      2: '#8B4513',      // brown (shoes)
      3: '#FFE4C4',      // skin
      4: '#0000FF',      // blue (overalls)
      5: '#FFD700',      // gold (buttons)
    }
    
    pixels.forEach((row, y) => {
      row.forEach((pixel, x) => {
        if (colors[pixel]) {
          ctx.fillStyle = colors[pixel]
          ctx.fillRect(x, y, 1, 1)
        }
      })
    })
  } else if (state === 'big') {
    canvas.width = 16
    canvas.height = 32
    
    // Big Mario (16x32) - simplified for now
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(2, 2, 12, 8) // Hat
    ctx.fillStyle = '#FFE4C4'
    ctx.fillRect(2, 10, 12, 6) // Face
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(2, 16, 12, 8) // Shirt
    ctx.fillStyle = '#0000FF'
    ctx.fillRect(2, 24, 5, 8) // Left leg
    ctx.fillRect(9, 24, 5, 8) // Right leg
  }
  
  return canvas.toDataURL()
}

export function generateGoombaSprite() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 16
  canvas.height = 16
  
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
    1: '#8B4513',      // brown body
    2: '#FFFFFF',      // white eyes
    3: '#000000',      // black pupils
    4: '#654321',      // dark brown for eyebrows/frown
    5: '#D2691E',      // lighter brown for feet
  }
  
  pixels.forEach((row, y) => {
    row.forEach((pixel, x) => {
      if (colors[pixel]) {
        ctx.fillStyle = colors[pixel]
        ctx.fillRect(x, y, 1, 1)
      }
    })
  })
  
  return canvas.toDataURL()
}

export function generateKoopaSprite() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 16
  canvas.height = 24
  
  // Shell
  ctx.fillStyle = '#00AA00'
  ctx.fillRect(2, 8, 12, 12)
  
  // Shell pattern
  ctx.fillStyle = '#FFFF00'
  ctx.fillRect(4, 10, 8, 2)
  ctx.fillRect(4, 14, 8, 2)
  
  // Head
  ctx.fillStyle = '#90EE90'
  ctx.fillRect(4, 2, 8, 6)
  
  // Eyes
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(5, 3, 2, 2)
  ctx.fillRect(9, 3, 2, 2)
  
  return canvas.toDataURL()
}

export function generateCoinSprite() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 16
  canvas.height = 16
  
  // Gold circle
  ctx.fillStyle = '#FFD700'
  ctx.beginPath()
  ctx.arc(8, 8, 6, 0, Math.PI * 2)
  ctx.fill()
  
  // Inner circle
  ctx.fillStyle = '#FFA500'
  ctx.beginPath()
  ctx.arc(8, 8, 4, 0, Math.PI * 2)
  ctx.fill()
  
  // Highlight
  ctx.fillStyle = '#FFFF00'
  ctx.fillRect(6, 5, 2, 2)
  
  return canvas.toDataURL()
}

export function generateMushroomSprite() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 16
  canvas.height = 16
  
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
    1: '#FF0000',      // red cap
    2: '#FFFFFF',      // white spots
    3: '#FFE4C4',      // tan stem
  }
  
  pixels.forEach((row, y) => {
    row.forEach((pixel, x) => {
      if (colors[pixel]) {
        ctx.fillStyle = colors[pixel]
        ctx.fillRect(x, y, 1, 1)
      }
    })
  })
  
  return canvas.toDataURL()
}

export function generateBrickSprite() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 16
  canvas.height = 16
  
  // Base brick color
  ctx.fillStyle = '#D2691E'
  ctx.fillRect(0, 0, 16, 16)
  
  // Brick pattern
  ctx.fillStyle = '#8B4513'
  // Horizontal lines
  ctx.fillRect(0, 5, 16, 1)
  ctx.fillRect(0, 11, 16, 1)
  // Vertical lines
  ctx.fillRect(7, 0, 1, 5)
  ctx.fillRect(3, 6, 1, 5)
  ctx.fillRect(11, 6, 1, 5)
  ctx.fillRect(7, 12, 1, 4)
  
  // Highlights
  ctx.fillStyle = '#CD853F'
  ctx.fillRect(1, 1, 2, 1)
  ctx.fillRect(1, 7, 2, 1)
  
  return canvas.toDataURL()
}

export function generateQuestionBlockSprite(used = false) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 16
  canvas.height = 16
  
  if (used) {
    // Used block (brown)
    ctx.fillStyle = '#8B4513'
    ctx.fillRect(0, 0, 16, 16)
    ctx.fillStyle = '#654321'
    ctx.fillRect(2, 2, 12, 12)
  } else {
    // Question block (gold with ?)
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(0, 0, 16, 16)
    
    // ? mark
    ctx.fillStyle = '#FFFFFF'
    // Top of ?
    ctx.fillRect(6, 3, 4, 2)
    ctx.fillRect(8, 5, 2, 2)
    // Middle
    ctx.fillRect(7, 7, 2, 2)
    // Dot
    ctx.fillRect(7, 10, 2, 2)
    
    // Border highlights
    ctx.fillStyle = '#FFA500'
    ctx.fillRect(1, 1, 14, 1)
    ctx.fillRect(1, 1, 1, 14)
  }
  
  return canvas.toDataURL()
}

export function generatePipeSprite() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 32
  canvas.height = 32
  
  // Pipe body
  ctx.fillStyle = '#00AA00'
  ctx.fillRect(0, 8, 32, 24)
  
  // Pipe top
  ctx.fillStyle = '#00CC00'
  ctx.fillRect(0, 0, 32, 10)
  
  // Highlights
  ctx.fillStyle = '#00DD00'
  ctx.fillRect(2, 2, 4, 6)
  ctx.fillRect(2, 10, 4, 20)
  
  // Shadows
  ctx.fillStyle = '#008800'
  ctx.fillRect(26, 2, 4, 6)
  ctx.fillRect(26, 10, 4, 20)
  
  // Inner circle (pipe opening)
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.ellipse(16, 16, 8, 6, 0, 0, Math.PI * 2)
  ctx.fill()
  
  return canvas.toDataURL()
}