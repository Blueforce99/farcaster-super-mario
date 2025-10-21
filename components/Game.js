import React, { useEffect, useRef, useState } from 'react'

export default function SuperMario() {
  const canvasRef = useRef(null)
  const [gameStarted, setGameStarted] = useState(false)
  const gameStateRef = useRef({
    score: 0,
    coins: 0,
    lives: 3,
    level: 1
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const GRAVITY = 0.6
    const JUMP_STRENGTH = 12
    const TILE_SIZE = 32

    // Game objects
    let player = {
      x: 50,
      y: canvas.height - 100,
      width: 32,
      height: 32,
      velocityY: 0,
      velocityX: 0,
      jumping: false,
      color: '#ff0000'
    }

    let platforms = [
      { x: 0, y: canvas.height - 32, width: canvas.width, height: 32 }, // Ground
      { x: 200, y: 400, width: 200, height: 20 },
      { x: 550, y: 350, width: 150, height: 20 },
      { x: 850, y: 300, width: 200, height: 20 }
    ]

    let coins = [
      { x: 100, y: 300, collected: false, size: 8 },
      { x: 180, y: 280, collected: false, size: 8 },
      { x: 280, y: 320, collected: false, size: 8 },
      { x: 380, y: 250, collected: false, size: 8 },
      { x: 480, y: 280, collected: false, size: 8 },
      { x: 600, y: 250, collected: false, size: 8 },
      { x: 700, y: 280, collected: false, size: 8 },
      { x: 800, y: 240, collected: false, size: 8 },
      { x: 900, y: 200, collected: false, size: 8 },
      { x: 1000, y: 220, collected: false, size: 8 }
    ]

    let enemies = [
      { x: 400, y: 380, width: 30, height: 20, velocityX: -2, color: '#8B4513' },
      { x: 700, y: 330, width: 30, height: 20, velocityX: 2, color: '#8B4513' },
      { x: 1000, y: 280, width: 30, height: 20, velocityX: -2, color: '#00AA00' }
    ]

    let keys = {}

    // Event listeners
    const handleKeyDown = (e) => { keys[e.key] = true }
    const handleKeyUp = (e) => { keys[e.key] = false }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Collision detection
    const isColliding = (rect1, rect2) => {
      return rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.y + rect1.height > rect2.y
    }

    // Game loop
    const gameLoop = () => {
      // Input
      if (keys['ArrowLeft'] || keys['a']) player.velocityX = -5
      else if (keys['ArrowRight'] || keys['d']) player.velocityX = 5
      else player.velocityX = 0

      if ((keys['ArrowUp'] || keys['w'] || keys[' ']) && !player.jumping) {
        player.velocityY = -JUMP_STRENGTH
        player.jumping = true
      }

      // Apply gravity
      player.velocityY += GRAVITY
      player.y += player.velocityY
      player.x += player.velocityX

      // Bounds
      if (player.x < 0) player.x = 0
      if (player.x + player.width > canvas.width) player.x = canvas.width - player.width

      // Platform collisions
      let onGround = false
      platforms.forEach(plat => {
        if (isColliding(player, plat) && player.velocityY >= 0) {
          player.y = plat.y - player.height
          player.velocityY = 0
          player.jumping = false
          onGround = true
        }
      })

      // Coin collection
      coins.forEach(coin => {
        if (!coin.collected && Math.hypot(player.x - coin.x, player.y - coin.y) < 30) {
          coin.collected = true
          gameStateRef.current.coins++
          gameStateRef.current.score += 10
        }
      })

      // Enemy movement & collision
      enemies.forEach(enemy => {
        enemy.x += enemy.velocityX
        if (enemy.x < 0 || enemy.x > canvas.width) enemy.velocityX *= -1

        if (isColliding(player, enemy)) {
          if (player.velocityY > 0 && player.y < enemy.y) {
            enemies.splice(enemies.indexOf(enemy), 1)
            gameStateRef.current.score += 100
            player.velocityY = -8
          } else {
            gameStateRef.current.lives--
            if (gameStateRef.current.lives > 0) {
              player.x = 50
              player.y = canvas.height - 100
            }
          }
        }
      })

      // Fall off map
      if (player.y > canvas.height) {
        gameStateRef.current.lives--
        player.x = 50
        player.y = canvas.height - 100
      }

      // Render
      ctx.fillStyle = '#87CEEB'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw clouds
      ctx.fillStyle = '#fff'
      ctx.fillRect(100, 50, 60, 30)
      ctx.fillRect(150, 60, 80, 25)
      ctx.fillRect(350, 80, 100, 30)
      ctx.fillRect(700, 40, 80, 35)

      // Draw platforms
      ctx.fillStyle = '#8B4513'
      platforms.forEach(plat => {
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height)
      })

      // Draw coins
      ctx.fillStyle = '#FFD700'
      coins.forEach(coin => {
        if (!coin.collected) {
          ctx.beginPath()
          ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Draw enemies
      enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
        // Eyes
        ctx.fillStyle = '#fff'
        ctx.fillRect(enemy.x + 5, enemy.y + 2, 6, 6)
        ctx.fillRect(enemy.x + 19, enemy.y + 2, 6, 6)
      })

      // Draw player
      ctx.fillStyle = player.color
      ctx.fillRect(player.x, player.y, player.width, player.height)
      // Head
      ctx.fillStyle = '#FFE4C4'
      ctx.fillRect(player.x + 2, player.y - 5, 10, 10)
      // Eyes
      ctx.fillStyle = '#000'
      ctx.fillRect(player.x + 4, player.y - 2, 2, 2)
      ctx.fillRect(player.x + 10, player.y - 2, 2, 2)

      requestAnimationFrame(gameLoop)
    }

    gameLoop()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <h1 style={{ color: '#fff', marginBottom: '10px' }}>🍄 SUPER MARIO BROS</h1>
      <div style={{ display: 'flex', gap: '40px', marginBottom: '20px', color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
        <div>Score: {gameStateRef.current.score}</div>
        <div>Coins: {gameStateRef.current.coins}</div>
        <div>Lives: {gameStateRef.current.lives}</div>
      </div>
      <canvas 
        ref={canvasRef} 
        width={1024} 
        height={576}
        style={{ border: '3px solid #fff', backgroundColor: '#87CEEB' }}
      />
      <p style={{ color: '#fff', marginTop: '20px', textAlign: 'center' }}>
        ← → or A/D to Move | ↑ or W or SPACE to Jump | Jump on enemies to defeat them!
      </p>
    </div>
  )
}