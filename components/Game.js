'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import SDK to avoid SSR issues
let sdk = null
if (typeof window !== 'undefined') {
  import('@farcaster/miniapp-sdk').then(module => {
    sdk = module.sdk
  })
}

export default function MarioGame() {
  const gameRef = useRef(null)
  const [gameInstance, setGameInstance] = useState(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [Phaser, setPhaser] = useState(null)

  useEffect(() => {
    // Dynamically import Phaser only on client side
    import('phaser').then((PhaserModule) => {
      setPhaser(PhaserModule.default)
    })
  }, [])

  useEffect(() => {
    if (!Phaser || !gameRef.current) return

    // Initialize Farcaster SDK
    const initSDK = async () => {
      try {
        if (sdk && sdk.actions) {
          await sdk.actions.ready()
          console.log('Farcaster SDK ready')
        }
      } catch (error) {
        console.error('SDK error:', error)
      }
    }
    initSDK()

    // Phaser game configuration
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      backgroundColor: '#5c94fc',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 800 },
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    }

    // Create game instance
    const game = new Phaser.Game(config)
    setGameInstance(game)

    let player
    let platforms
    let cursors
    let scoreText
    let livesText
    let coins
    let enemies
    let currentScore = 0
    let currentLives = 3

    function preload() {
      // Load assets (we'll use simple shapes for now, replace with sprites later)
      this.load.image('sky', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzVjOTRmYyIvPjwvc3ZnPg==')
    }

    function create() {
      // Add background
      this.add.image(400, 300, 'sky')

      // Create platforms group
      platforms = this.physics.add.staticGroup()

      // Ground
      for (let x = 0; x < 800; x += 80) {
        const ground = this.add.rectangle(x + 40, 580, 80, 40, 0x8B4513)
        platforms.add(ground)
      }

      // Floating platforms
      const platform1 = this.add.rectangle(400, 400, 200, 32, 0x00ff00)
      platforms.add(platform1)
      
      const platform2 = this.add.rectangle(600, 300, 150, 32, 0x00ff00)
      platforms.add(platform2)
      
      const platform3 = this.add.rectangle(200, 250, 150, 32, 0x00ff00)
      platforms.add(platform3)

      platforms.refresh()

      // Create Mario (red square for now)
      player = this.physics.add.sprite(100, 450, null)
      player.setDisplaySize(32, 32)
      const graphics = this.add.graphics()
      graphics.fillStyle(0xff0000, 1)
      graphics.fillRect(84, 434, 32, 32)
      
      player.setBounce(0.1)
      player.setCollideWorldBounds(true)

      // Create coins
      coins = this.physics.add.group()
      
      for (let i = 0; i < 8; i++) {
        const x = 150 + (i * 80)
        const y = Phaser.Math.Between(100, 400)
        const coin = this.add.circle(x, y, 10, 0xffd700)
        coins.add(coin)
      }

      // Create enemies (simple for now)
      enemies = this.physics.add.group()
      
      const enemy1 = this.add.rectangle(400, 360, 30, 30, 0x8B4513)
      enemies.add(enemy1)
      enemy1.body.setVelocityX(-50)
      
      const enemy2 = this.add.rectangle(650, 260, 30, 30, 0x8B4513)
      enemies.add(enemy2)
      enemy2.body.setVelocityX(-50)

      // Collisions
      this.physics.add.collider(player, platforms)
      this.physics.add.collider(coins, platforms)
      this.physics.add.collider(enemies, platforms)
      
      // Enemy boundary bounce
      enemies.children.entries.forEach(enemy => {
        enemy.body.setBounce(1)
        enemy.body.setCollideWorldBounds(true)
      })

      // Collect coins
      this.physics.add.overlap(player, coins, collectCoin, null, this)
      
      // Hit enemy
      this.physics.add.overlap(player, enemies, hitEnemy, null, this)

      // Controls
      cursors = this.input.keyboard.createCursorKeys()

      // Score text
      scoreText = this.add.text(16, 16, 'Score: 0', {
        fontSize: '24px',
        fill: '#fff'
      })

      // Lives text
      livesText = this.add.text(16, 50, 'Lives: 3', {
        fontSize: '24px',
        fill: '#fff'
      })

      // Add camera follow
      this.cameras.main.startFollow(player)
      this.cameras.main.setBounds(0, 0, 800, 600)
    }

    function collectCoin(player, coin) {
      coin.destroy()
      currentScore += 100
      scoreText.setText('Score: ' + currentScore)
      setScore(currentScore)
    }

    function hitEnemy(player, enemy) {
      // Check if jumping on enemy
      if (player.body.velocity.y > 0 && player.y < enemy.y) {
        enemy.destroy()
        player.setVelocityY(-300)
        currentScore += 200
        scoreText.setText('Score: ' + currentScore)
        setScore(currentScore)
      } else {
        // Take damage
        currentLives -= 1
        livesText.setText('Lives: ' + currentLives)
        setLives(currentLives)
        
        if (currentLives <= 0) {
          this.physics.pause()
          player.setTint(0xff0000)
          const gameOverText = this.add.text(400, 300, 'GAME OVER', {
            fontSize: '64px',
            fill: '#fff'
          })
          gameOverText.setOrigin(0.5)
        } else {
          // Respawn
          player.setPosition(100, 450)
          player.setVelocity(0, 0)
        }
      }
    }

    function update() {
      if (!cursors || !player.body) return

      // Horizontal movement
      if (cursors.left.isDown) {
        player.setVelocityX(-200)
      } else if (cursors.right.isDown) {
        player.setVelocityX(200)
      } else {
        player.setVelocityX(0)
      }

      // Jump
      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-400)
      }
    }

    // Cleanup
    return () => {
      if (game) {
        game.destroy(true)
      }
    }
  }, [Phaser])

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#000',
      overflow: 'hidden'
    }}>
      <div style={{ 
        marginBottom: '20px',
        color: '#fff',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '10px 0' }}>🍄 Super Mario</h1>
        <div>Score: {score} | Lives: {lives}</div>
      </div>
      <div ref={gameRef} style={{ 
        maxWidth: '100%',
        maxHeight: 'calc(100vh - 150px)'
      }} />
      <div style={{
        marginTop: '20px',
        color: '#fff',
        textAlign: 'center',
        fontSize: '14px'
      }}>
        <p>Arrow Keys: Move | Up: Jump | Jump on enemies to defeat them!</p>
      </div>
    </div>
  )
}