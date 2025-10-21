// Sprite Generator - Creates pixel art sprites as SVG data URLs

function svgToBase64(svg) {
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)))
}

function createPixelRect(x, y, size, color) {
  return `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" />`
}

export function generateMarioSprite(state = 'small') {
  if (state === 'small') {
    const svg = `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="16" fill="transparent"/>
      ${createPixelRect(3, 0, 1, '#FF0000')}
      ${createPixelRect(4, 0, 1, '#FF0000')}
      ${createPixelRect(5, 0, 1, '#FF0000')}
      ${createPixelRect(6, 0, 1, '#FF0000')}
      ${createPixelRect(7, 0, 1, '#FF0000')}
      ${createPixelRect(2, 1, 1, '#FF0000')}
      ${createPixelRect(3, 1, 1, '#FF0000')}
      ${createPixelRect(4, 1, 1, '#FF0000')}
      ${createPixelRect(5, 1, 1, '#FF0000')}
      ${createPixelRect(6, 1, 1, '#FF0000')}
      ${createPixelRect(7, 1, 1, '#FF0000')}
      ${createPixelRect(8, 1, 1, '#FF0000')}
      ${createPixelRect(9, 1, 1, '#FF0000')}
      ${createPixelRect(10, 1, 1, '#FF0000')}
      ${createPixelRect(2, 2, 1, '#FFE4C4')}
      ${createPixelRect(3, 2, 1, '#FFE4C4')}
      ${createPixelRect(4, 2, 1, '#FFE4C4')}
      ${createPixelRect(5, 2, 1, '#0000FF')}
      ${createPixelRect(6, 2, 1, '#0000FF')}
      ${createPixelRect(7, 2, 1, '#FFE4C4')}
      ${createPixelRect(8, 2, 1, '#0000FF')}
      ${createPixelRect(1, 3, 1, '#FFE4C4')}
      ${createPixelRect(2, 3, 1, '#0000FF')}
      ${createPixelRect(3, 3, 1, '#FFE4C4')}
      ${createPixelRect(4, 3, 1, '#0000FF')}
      ${createPixelRect(5, 3, 1, '#0000FF')}
      ${createPixelRect(6, 3, 1, '#0000FF')}
      ${createPixelRect(7, 3, 1, '#FFE4C4')}
      ${createPixelRect(8, 3, 1, '#0000FF')}
      ${createPixelRect(9, 3, 1, '#0000FF')}
      ${createPixelRect(10, 3, 1, '#0000FF')}
      ${createPixelRect(1, 4, 1, '#FFE4C4')}
      ${createPixelRect(2, 4, 1, '#0000FF')}
      ${createPixelRect(3, 4, 1, '#FFE4C4')}
      ${createPixelRect(4, 4, 1, '#FFE4C4')}
      ${createPixelRect(5, 4, 1, '#0000FF')}
      ${createPixelRect(6, 4, 1, '#0000FF')}
      ${createPixelRect(7, 4, 1, '#0000FF')}
      ${createPixelRect(8, 4, 1, '#FFE4C4')}
      ${createPixelRect(9, 4, 1, '#0000FF')}
      ${createPixelRect(10, 4, 1, '#0000FF')}
      ${createPixelRect(11, 4, 1, '#0000FF')}
      ${createPixelRect(1, 5, 1, '#FFE4C4')}
      ${createPixelRect(2, 5, 1, '#FFE4C4')}
      ${createPixelRect(3, 5, 1, '#0000FF')}
      ${createPixelRect(4, 5, 1, '#0000FF')}
      ${createPixelRect(5, 5, 1, '#0000FF')}
      ${createPixelRect(6, 5, 1, '#0000FF')}
      ${createPixelRect(7, 5, 1, '#FFE4C4')}
      ${createPixelRect(8, 5, 1, '#FFE4C4')}
      ${createPixelRect(9, 5, 1, '#FFE4C4')}
      ${createPixelRect(10, 5, 1, '#FFE4C4')}
      ${createPixelRect(2, 6, 1, '#0000FF')}
      ${createPixelRect(3, 6, 1, '#0000FF')}
      ${createPixelRect(4, 6, 1, '#0000FF')}
      ${createPixelRect(5, 6, 1, '#0000FF')}
      ${createPixelRect(6, 6, 1, '#0000FF')}
      ${createPixelRect(7, 6, 1, '#0000FF')}
      ${createPixelRect(8, 6, 1, '#0000FF')}
      ${createPixelRect(9, 6, 1, '#0000FF')}
      ${createPixelRect(2, 7, 1, '#FF0000')}
      ${createPixelRect(3, 7, 1, '#FF0000')}
      ${createPixelRect(4, 7, 1, '#0000FF')}
      ${createPixelRect(5, 7, 1, '#FF0000')}
      ${createPixelRect(6, 7, 1, '#FF0000')}
      ${createPixelRect(7, 7, 1, '#FF0000')}
      ${createPixelRect(1, 8, 1, '#FF0000')}
      ${createPixelRect(2, 8, 1, '#FF0000')}
      ${createPixelRect(3, 8, 1, '#FF0000')}
      ${createPixelRect(4, 8, 1, '#0000FF')}
      ${createPixelRect(5, 8, 1, '#FF0000')}
      ${createPixelRect(6, 8, 1, '#FF0000')}
      ${createPixelRect(7, 8, 1, '#0000FF')}
      ${createPixelRect(8, 8, 1, '#FF0000')}
      ${createPixelRect(9, 8, 1, '#FF0000')}
      ${createPixelRect(10, 8, 1, '#FF0000')}
      ${createPixelRect(0, 9, 1, '#FF0000')}
      ${createPixelRect(1, 9, 1, '#FF0000')}
      ${createPixelRect(2, 9, 1, '#FF0000')}
      ${createPixelRect(3, 9, 1, '#FF0000')}
      ${createPixelRect(4, 9, 1, '#0000FF')}
      ${createPixelRect(5, 9, 1, '#0000FF')}
      ${createPixelRect(6, 9, 1, '#0000FF')}
      ${createPixelRect(7, 9, 1, '#0000FF')}
      ${createPixelRect(8, 9, 1, '#FF0000')}
      ${createPixelRect(9, 9, 1, '#FF0000')}
      ${createPixelRect(10, 9, 1, '#FF0000')}
      ${createPixelRect(11, 9, 1, '#FF0000')}
      ${createPixelRect(0, 10, 1, '#FFE4C4')}
      ${createPixelRect(1, 10, 1, '#FFE4C4')}
      ${createPixelRect(2, 10, 1, '#FF0000')}
      ${createPixelRect(3, 10, 1, '#0000FF')}
      ${createPixelRect(4, 10, 1, '#FFD700')}
      ${createPixelRect(5, 10, 1, '#0000FF')}
      ${createPixelRect(6, 10, 1, '#0000FF')}
      ${createPixelRect(7, 10, 1, '#FFD700')}
      ${createPixelRect(8, 10, 1, '#0000FF')}
      ${createPixelRect(9, 10, 1, '#FF0000')}
      ${createPixelRect(10, 10, 1, '#FFE4C4')}
      ${createPixelRect(11, 10, 1, '#FFE4C4')}
      ${createPixelRect(0, 11, 1, '#FFE4C4')}
      ${createPixelRect(1, 11, 1, '#FFE4C4')}
      ${createPixelRect(2, 11, 1, '#FFE4C4')}
      ${createPixelRect(3, 11, 1, '#0000FF')}
      ${createPixelRect(4, 11, 1, '#0000FF')}
      ${createPixelRect(5, 11, 1, '#0000FF')}
      ${createPixelRect(6, 11, 1, '#0000FF')}
      ${createPixelRect(7, 11, 1, '#0000FF')}
      ${createPixelRect(8, 11, 1, '#0000FF')}
      ${createPixelRect(9, 11, 1, '#FFE4C4')}
      ${createPixelRect(10, 11, 1, '#FFE4C4')}
      ${createPixelRect(11, 11, 1, '#FFE4C4')}
      ${createPixelRect(0, 12, 1, '#FFE4C4')}
      ${createPixelRect(1, 12, 1, '#FFE4C4')}
      ${createPixelRect(2, 12, 1, '#0000FF')}
      ${createPixelRect(3, 12, 1, '#0000FF')}
      ${createPixelRect(4, 12, 1, '#0000FF')}
      ${createPixelRect(5, 12, 1, '#0000FF')}
      ${createPixelRect(6, 12, 1, '#0000FF')}
      ${createPixelRect(7, 12, 1, '#0000FF')}
      ${createPixelRect(8, 12, 1, '#0000FF')}
      ${createPixelRect(9, 12, 1, '#0000FF')}
      ${createPixelRect(10, 12, 1, '#FFE4C4')}
      ${createPixelRect(11, 12, 1, '#FFE4C4')}
      ${createPixelRect(2, 13, 1, '#0000FF')}
      ${createPixelRect(3, 13, 1, '#0000FF')}
      ${createPixelRect(4, 13, 1, '#0000FF')}
      ${createPixelRect(8, 13, 1, '#0000FF')}
      ${createPixelRect(9, 13, 1, '#0000FF')}
      ${createPixelRect(10, 13, 1, '#0000FF')}
      ${createPixelRect(1, 14, 1, '#8B4513')}
      ${createPixelRect(2, 14, 1, '#8B4513')}
      ${createPixelRect(3, 14, 1, '#8B4513')}
      ${createPixelRect(8, 14, 1, '#8B4513')}
      ${createPixelRect(9, 14, 1, '#8B4513')}
      ${createPixelRect(10, 14, 1, '#8B4513')}
      ${createPixelRect(0, 15, 1, '#8B4513')}
      ${createPixelRect(1, 15, 1, '#8B4513')}
      ${createPixelRect(2, 15, 1, '#8B4513')}
      ${createPixelRect(3, 15, 1, '#8B4513')}
      ${createPixelRect(8, 15, 1, '#8B4513')}
      ${createPixelRect(9, 15, 1, '#8B4513')}
      ${createPixelRect(10, 15, 1, '#8B4513')}
      ${createPixelRect(11, 15, 1, '#8B4513')}
    </svg>`
    return svgToBase64(svg)
  } else if (state === 'big') {
    const svg = `<svg width="16" height="32" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="32" fill="transparent"/>
      ${createPixelRect(2, 2, 1, '#FF0000')}
      ${createPixelRect(3, 2, 1, '#FF0000')}
      ${createPixelRect(4, 2, 1, '#FF0000')}
      ${createPixelRect(5, 2, 1, '#FF0000')}
      ${createPixelRect(6, 2, 1, '#FF0000')}
      ${createPixelRect(7, 2, 1, '#FF0000')}
      ${createPixelRect(8, 2, 1, '#FF0000')}
      ${createPixelRect(9, 2, 1, '#FF0000')}
      ${createPixelRect(10, 2, 1, '#FF0000')}
      ${createPixelRect(11, 2, 1, '#FF0000')}
      ${createPixelRect(12, 2, 1, '#FF0000')}
      ${createPixelRect(13, 2, 1, '#FF0000')}
      ${[...Array(12)].map((_, i) => createPixelRect(2 + i, 3, 1, '#FF0000')).join('')}
      ${[...Array(12)].map((_, i) => createPixelRect(2 + i, 9, 1, '#0000FF')).join('')}
      ${[...Array(12)].map((_, i) => createPixelRect(2 + i, 15, 1, '#0000FF')).join('')}
      ${createPixelRect(2, 23, 1, '#0000FF')}
      ${createPixelRect(3, 23, 1, '#0000FF')}
      ${createPixelRect(4, 23, 1, '#0000FF')}
      ${createPixelRect(5, 23, 1, '#0000FF')}
      ${createPixelRect(9, 23, 1, '#0000FF')}
      ${createPixelRect(10, 23, 1, '#0000FF')}
      ${createPixelRect(11, 23, 1, '#0000FF')}
      ${createPixelRect(12, 23, 1, '#0000FF')}
    </svg>`
    return svgToBase64(svg)
  }
}

export function generateGoombaSprite() {
  const svg = `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" fill="transparent"/>
    ${[...Array(6)].map((_, i) => createPixelRect(4 + i, 0, 1, '#8B4513')).join('')}
    ${[...Array(8)].map((_, i) => createPixelRect(3 + i, 1, 1, '#8B4513')).join('')}
    ${[...Array(10)].map((_, i) => createPixelRect(2 + i, 2, 1, '#8B4513')).join('')}
    ${createPixelRect(1, 3, 1, '#8B4513')}
    ${[...Array(12)].map((_, i) => createPixelRect(1 + i, 3, 1, '#8B4513')).join('')}
    ${createPixelRect(1, 4, 1, '#8B4513')}
    ${createPixelRect(3, 4, 1, '#FFFFFF')}
    ${createPixelRect(4, 4, 1, '#FFFFFF')}
    ${createPixelRect(11, 4, 1, '#FFFFFF')}
    ${createPixelRect(12, 4, 1, '#FFFFFF')}
    ${createPixelRect(13, 4, 1, '#8B4513')}
    ${createPixelRect(1, 5, 1, '#654321')}
    ${createPixelRect(2, 5, 1, '#8B4513')}
    ${createPixelRect(3, 5, 1, '#FFFFFF')}
    ${createPixelRect(4, 5, 1, '#000000')}
    ${createPixelRect(11, 5, 1, '#FFFFFF')}
    ${createPixelRect(12, 5, 1, '#000000')}
    ${createPixelRect(13, 5, 1, '#8B4513')}
    ${createPixelRect(14, 5, 1, '#654321')}
  </svg>`
  return svgToBase64(svg)
}

export function generateKoopaSprite() {
  const svg = `<svg width="16" height="24" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="24" fill="transparent"/>
    ${[...Array(8)].map((_, i) => createPixelRect(4 + i, 2, 1, '#90EE90')).join('')}
    ${[...Array(2)].map((_, i) => createPixelRect(5 + i, 3, 1, '#FFFFFF')).join('')}
    ${[...Array(2)].map((_, i) => createPixelRect(9 + i, 3, 1, '#FFFFFF')).join('')}
    ${[...Array(2)].map((_, i) => createPixelRect(6 + i, 4, 1, '#000000')).join('')}
    ${[...Array(2)].map((_, i) => createPixelRect(10 + i, 4, 1, '#000000')).join('')}
    ${[...Array(12)].map((_, i) => createPixelRect(2 + i, 8, 1, '#00AA00')).join('')}
    ${[...Array(8)].map((_, i) => createPixelRect(4 + i, 10, 1, '#FFFF00')).join('')}
    ${[...Array(8)].map((_, i) => createPixelRect(4 + i, 14, 1, '#FFFF00')).join('')}
  </svg>`
  return svgToBase64(svg)
}

export function generateCoinSprite() {
  const svg = `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" fill="transparent"/>
    ${[...Array(6)].map((_, i) => createPixelRect(5 + i, 3, 1, '#FFD700')).join('')}
    ${[...Array(8)].map((_, i) => createPixelRect(4 + i, 5, 1, '#FFD700')).join('')}
    ${[...Array(10)].map((_, i) => createPixelRect(3 + i, 6, 1, '#FFD700')).join('')}
    ${[...Array(8)].map((_, i) => createPixelRect(4 + i, 7, 1, '#FFD700')).join('')}
    ${[...Array(6)].map((_, i) => createPixelRect(5 + i, 8, 1, '#FFD700')).join('')}
    ${createPixelRect(6, 5, 1, '#FFA500')}
    ${createPixelRect(7, 5, 1, '#FFA500')}
    ${createPixelRect(8, 5, 1, '#FFA500')}
    ${createPixelRect(9, 5, 1, '#FFA500')}
  </svg>`
  return svgToBase64(svg)
}

export function generateMushroomSprite() {
  const svg = `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" fill="transparent"/>
    ${[...Array(6)].map((_, i) => createPixelRect(4 + i, 0, 1, '#FF0000')).join('')}
    ${[...Array(8)].map((_, i) => createPixelRect(3 + i, 1, 1, '#FF0000')).join('')}
    ${[...Array(10)].map((_, i) => createPixelRect(2 + i, 2, 1, '#FF0000')).join('')}
    ${createPixelRect(2, 3, 1, '#FF0000')}
    ${[...Array(12)].map((_, i) => createPixelRect(1 + i, 3, 1, '#FF0000')).join('')}
    ${[...Array(12)].map((_, i) => createPixelRect(2 + i, 4, 1, '#FFE4C4')).join('')}
    ${[...Array(10)].map((_, i) => createPixelRect(3 + i, 14, 1, '#FFE4C4')).join('')}
  </svg>`
  return svgToBase64(svg)
}

export function generateBrickSprite() {
  const svg = `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" fill="#CD853F"/>
    <line x1="0" y1="5" x2="16" y2="5" stroke="#8B4513" stroke-width="1"/>
    <line x1="0" y1="11" x2="16" y2="11" stroke="#8B4513" stroke-width="1"/>
    <line x1="7" y1="0" x2="7" y2="5" stroke="#8B4513" stroke-width="1"/>
    <line x1="3" y1="6" x2="3" y2="11" stroke="#8B4513" stroke-width="1"/>
    <line x1="11" y1="6" x2="11" y2="11" stroke="#8B4513" stroke-width="1"/>
  </svg>`
  return svgToBase64(svg)
}

export function generateQuestionBlockSprite(used = false) {
  const svg = used ? 
    `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="16" fill="#8B4513"/>
      <rect x="2" y="2" width="12" height="12" fill="#654321"/>
    </svg>` :
    `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="16" fill="#FFD700"/>
      <rect x="6" y="3" width="4" height="2" fill="#FFFFFF"/>
      <rect x="8" y="5" width="2" height="2" fill="#FFFFFF"/>
      <rect x="7" y="7" width="2" height="2" fill="#FFFFFF"/>
      <rect x="7" y="10" width="2" height="2" fill="#FFFFFF"/>
      <line x1="1" y1="1" x2="15" y2="1" stroke="#FFA500" stroke-width="1"/>
      <line x1="1" y1="1" x2="1" y2="15" stroke="#FFA500" stroke-width="1"/>
    </svg>`
  return svgToBase64(svg)
}

export function generatePipeSprite() {
  const svg = `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="transparent"/>
    <rect x="0" y="8" width="32" height="24" fill="#00AA00"/>
    <rect x="0" y="0" width="32" height="10" fill="#00DD00"/>
    <rect x="2" y="2" width="4" height="6" fill="#44FF44"/>
    <rect x="2" y="10" width="4" height="20" fill="#44FF44"/>
    <rect x="26" y="2" width="4" height="6" fill="#44FF44"/>
    <rect x="26" y="10" width="4" height="20" fill="#44FF44"/>
    <rect x="10" y="14" width="12" height="8" fill="#000000"/>
    <rect x="12" y="12" width="8" height="12" fill="#000000"/>
  </svg>`
  return svgToBase64(svg)
}