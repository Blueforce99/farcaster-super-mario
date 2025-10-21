'use client'

import { useEffect, useRef, useState } from 'react'
import { 
  generateMarioSprite, 
  generateGoombaSprite, 
  generateKoopaSprite,
  generateCoinSprite,
  generateMushroomSprite,
  generateBrickSprite,
  generateQuestionBlockSprite,
  generatePipeSprite
} from './SpriteGenerator'

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
  const [coins, setCoins] = useState(0)
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

    // Game state
    let currentScore = 0
    let currentLives = 3
    let currentCoins = 0
    let marioState = 'small' // small, big, fire

    // Phaser game configuration
    const config = {
      type: Phaser.AUTO,
      width: 1024,
      height: 576,
      parent: gameRef.current,
      backgroundColor: '#5c94fc',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 1000 },
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

    const game = new Phaser.Game(config)
    setGameInstance(game)

    let player
    let platforms
    let bricks
    let questionBlocks
    let cursors
    let scoreText
    let livesText
    let coinsText
    let collectedCoins
    let enemies
    let powerUps
    let pipes
    let flagPole

    function preload() {
      // We'll use simple geometric shapes as placeholders
      // In production, you'd load actual sprite sheets here
    }

    function create() {
      // World bounds
      this.physics.world.setBounds(0, 0, 3200, 576)

      // Create clouds (background decoration)
      for (let i = 0; i < 10; i++) {
        const x = Phaser.Math.Between(100, 3000)
        const y = Phaser.Math.Between(50, 150)
        const cloud = this.add.ellipse(x, y, 80, 40, 0xffffff, 0.8)
      }

      // Create bushes (background decoration)
      for (let i = 0; i < 15; i++) {
        const x = i * 200 + 50
        const bush = this.add.ellipse(x, 550, 60, 30, 0x228B22)
      }

      // Ground
      platforms = this.physics.add.staticGroup()
      for (let x = 0; x < 3200; x += 32) {
        const ground = this.add.rectangle(x + 16, 560, 32, 32, 0x8B4513)
        platforms.add(ground)
      }
      platforms.refresh()

      // Bricks (destructible)
      bricks = this.physics.add.staticGroup()
      
      // Brick patterns
      for (let i = 0; i < 5; i++) {
        const x = 400 + (i * 40)
        const brick = this.add.rectangle(x, 300, 32, 32, 0xD2691E)
        bricks.add(brick)
      }
      
      for (let i = 0; i < 3; i++) {
        const x = 800 + (i * 40)
        const brick = this.add.rectangle(x, 250, 32, 32, 0xD2691E)
        bricks.add(brick)
      }
      bricks.refresh()

      // Question blocks (power-ups)
      questionBlocks = this.physics.add.staticGroup()
      
      const qBlock1 = this.add.rectangle(480, 300, 32, 32, 0xFFD700)
      qBlock1.setData('type', 'coin')
      qBlock1.setData('used', false)
      questionBlocks.add(qBlock1)
      
      const qBlock2 = this.add.rectangle(560, 300, 32, 32, 0xFFD700)
      qBlock2.setData('type', 'mushroom')
      qBlock2.setData('used', false)
      questionBlocks.add(qBlock2)
      
      const qBlock3 = this.add.rectangle(920, 250, 32, 32, 0xFFD700)
      qBlock3.setData('type', 'coin')
      qBlock3.setData('used', false)
      questionBlocks.add(qBlock3)
      
      questionBlocks.refresh()

      // Pipes
      pipes = this.physics.add.staticGroup()
      
      createPipe(this, 600, 500, pipes)
      createPipe(this, 1200, 500, pipes)
      createPipe(this, 1800, 450, pipes)
      
      pipes.refresh()

      // Floating platforms
      const platform1 = this.add.rectangle(700, 400, 120, 20, 0x00ff00)
      platforms.add(platform1)
      
      const platform2 = this.add.rectangle(1000, 350, 100, 20, 0x00ff00)
      platforms.add(platform2)
      
      const platform3 = this.add.rectangle(1400, 300, 120, 20, 0x00ff00)
      platforms.add(platform3)
      
      const platform4 = this.add.rectangle(1800, 250, 100, 20, 0x00ff00)
      platforms.add(platform4)
      
      platforms.refresh()

      // Create Mario
      player = this.physics.add.sprite(100, 450, null)
      player.setDisplaySize(32, 32)
      const marioGraphics = this.add.graphics()
      marioGraphics.fillStyle(0xff0000, 1)
      marioGraphics.fillRect(84, 434, 32, 32)
      // Mario's hat
      marioGraphics.fillStyle(0x8B0000, 1)
      marioGraphics.fillRect(84, 434, 32, 10)
      // Mario's face
      marioGraphics.fillStyle(0xFFDBAC, 1)
      marioGraphics.fillCircle(100, 455, 8)
      
      player.setBounce(0.1)
      player.setCollideWorldBounds(true)
      player.body.setSize(28, 32)

      // Coins scattered around
      collectedCoins = this.physics.add.group()
      
      for (let i = 0; i < 30; i++) {
        const x = 200 + (i * 100)
        // Avoid spawning coins inside pipes (x positions around 600, 1200, 1800)
        if ((x > 570 && x < 630) || (x > 1170 && x < 1230) || (x > 1770 && x < 1830)) {
          continue
        }
        const y = Phaser.Math.Between(200, 450)
        const coin = this.add.circle(x, y, 8, 0xffd700)
        const coinInner = this.add.circle(x, y, 4, 0xFFFFFF, 0.5)
        collectedCoins.add(coin)
      }

      // Enemies (Goombas)
      enemies = this.physics.add.group()
      
      createGoomba(this, 500, 520, enemies)
      createGoomba(this, 900, 520, enemies)
      createGoomba(this, 1300, 520, enemies)
      createGoomba(this, 1700, 520, enemies)
      
      // Koopa Troopa
      createKoopa(this, 1100, 520, enemies)
      createKoopa(this, 1600, 520, enemies)

      // Power-ups group
      powerUps = this.physics.add.group()

      // Flag pole at end
      flagPole = this.add.rectangle(3000, 400, 20, 300, 0x000000)
      this.physics.add.existing(flagPole, true)
      const flag = this.add.rectangle(3020, 300, 40, 30, 0xff0000)

      // Collisions
      this.physics.add.collider(player, platforms)
      this.physics.add.collider(player, bricks)
      this.physics.add.collider(player, questionBlocks, hitQuestionBlock, null, this)
      this.physics.add.collider(player, pipes)
      this.physics.add.collider(collectedCoins, platforms)
      this.physics.add.collider(enemies, platforms)
      this.physics.add.collider(enemies, bricks)
      this.physics.add.collider(enemies, pipes)
      this.physics.add.collider(powerUps, platforms)
      this.physics.add.collider(powerUps, bricks)
      this.physics.add.collider(powerUps, pipes)

      // Enemy behavior
      enemies.children.entries.forEach(enemy => {
        enemy.body.setBounce(0)
        enemy.body.setVelocityX(-80)
      })

      // Overlaps
      this.physics.add.overlap(player, collectedCoins, collectCoin, null, this)
      this.physics.add.overlap(player, enemies, hitEnemy, null, this)
      this.physics.add.overlap(player, powerUps, collectPowerUp, null, this)
      this.physics.add.overlap(player, flagPole, reachFlag, null, this)

      // Controls
      cursors = this.input.keyboard.createCursorKeys()

      // UI
      scoreText = this.add.text(16, 16, 'Score: 0', {
        fontSize: '20px',
        fill: '#fff',
        fontFamily: 'Arial',
        stroke: '#000',
        strokeThickness: 4
      }).setScrollFactor(0)

      livesText = this.add.text(16, 45, 'Lives: ♥ ♥ ♥', {
        fontSize: '20px',
        fill: '#ff0000',
        fontFamily: 'Arial',
        stroke: '#000',
        strokeThickness: 4
      }).setScrollFactor(0)

      coinsText = this.add.text(16, 74, 'Coins: 0', {
        fontSize: '20px',
        fill: '#ffd700',
        fontFamily: 'Arial',
        stroke: '#000',
        strokeThickness: 4
      }).setScrollFactor(0)

      // Camera follow
      this.cameras.main.startFollow(player, false, 0.1, 0.1)
      this.cameras.main.setBounds(0, 0, 3200, 576)
    }

    function createPipe(scene, x, y, group) {
      const pipeHeight = 576 - y
      const pipe = scene.add.rectangle(x, y + pipeHeight/2, 64, pipeHeight, 0x00aa00)
      const pipeTop = scene.add.rectangle(x, y - 10, 72, 20, 0x00cc00)
      group.add(pipe)
      group.add(pipeTop)
    }

    function createGoomba(scene, x, y, group) {
      const goomba = scene.add.rectangle(x, y, 32, 32, 0x8B4513)
      goomba.setData('type', 'goomba')
      goomba.setData('alive', true)
      group.add(goomba)
      // Eyes
      scene.add.circle(x - 6, y - 4, 3, 0xffffff)
      scene.add.circle(x + 6, y - 4, 3, 0xffffff)
    }

    function createKoopa(scene, x, y, group) {
      const koopa = scene.add.rectangle(x, y, 32, 40, 0x00aa00)
      koopa.setData('type', 'koopa')
      koopa.setData('alive', true)
      group.add(koopa)
      // Shell pattern
      scene.add.rectangle(x, y, 32, 20, 0xFFFF00)
    }

    function hitQuestionBlock(player, block) {
      if (block.getData('used')) return

      const blockType = block.getData('type')
      block.setData('used', true)
      block.setFillStyle(0x8B4513)

      // Bump animation
      this.tweens.add({
        targets: block,
        y: block.y - 10,
        duration: 100,
        yoyo: true
      })

      if (blockType === 'coin') {
        currentCoins += 1
        currentScore += 100
        coinsText.setText('Coins: ' + currentCoins)
        scoreText.setText('Score: ' + currentScore)
        setCoins(currentCoins)
        setScore(currentScore)
      } else if (blockType === 'mushroom') {
        spawnMushroom(this, block.x, block.y - 40)
      }
    }

    function spawnMushroom(scene, x, y) {
      const mushroom = scene.add.circle(x, y, 12, 0xff0000)
      const mushroomSpots = scene.add.circle(x, y - 3, 4, 0xffffff)
      powerUps.add(mushroom)
      mushroom.body.setVelocityX(100)
      mushroom.body.setBounce(0)
      mushroom.setData('type', 'mushroom')
    }

    function collectCoin(player, coin) {
      coin.destroy()
      currentCoins += 1
      currentScore += 100
      coinsText.setText('Coins: ' + currentCoins)
      scoreText.setText('Score: ' + currentScore)
      setCoins(currentCoins)
      setScore(currentScore)
      
      if (currentCoins >= 100) {
        currentCoins = 0
        currentLives += 1
        livesText.setText('Lives: ' + '♥ '.repeat(currentLives))
        setLives(currentLives)
      }
    }

    function collectPowerUp(player, powerUp) {
      powerUp.destroy()
      const type = powerUp.getData('type')
      
      if (type === 'mushroom' && marioState === 'small') {
        marioState = 'big'
        player.setDisplaySize(32, 48)
        player.body.setSize(28, 48)
        currentScore += 1000
        scoreText.setText('Score: ' + currentScore)
        setScore(currentScore)
      }
    }

    function hitEnemy(player, enemy) {
      if (!enemy.getData('alive')) return

      // Check if jumping on enemy
      if (player.body.velocity.y > 0 && player.y < enemy.y - 10) {
        enemy.setData('alive', false)
        enemy.setAlpha(0.3)
        enemy.body.setVelocity(0, 0)
        enemy.body.enable = false
        
        player.setVelocityY(-300)
        currentScore += 200
        scoreText.setText('Score: ' + currentScore)
        setScore(currentScore)
        
        // Remove enemy after delay
        this.time.delayedCall(500, () => {
          enemy.destroy()
        })
      } else {
        // Take damage
        if (marioState === 'big') {
          marioState = 'small'
          player.setDisplaySize(32, 32)
          player.body.setSize(28, 32)
        } else {
          loseLife(this)
        }
      }
    }

    function loseLife(scene) {
      currentLives -= 1
      livesText.setText('Lives: ' + '♥ '.repeat(Math.max(0, currentLives)))
      setLives(currentLives)
      
      if (currentLives <= 0) {
        gameOver(scene)
      } else {
        player.setPosition(100, 450)
        player.setVelocity(0, 0)
      }
    }

    function gameOver(scene) {
      scene.physics.pause()
      player.setTint(0xff0000)
      
      const gameOverText = scene.add.text(scene.cameras.main.scrollX + 512, 288, 'GAME OVER', {
        fontSize: '64px',
        fill: '#fff',
        fontFamily: 'Arial',
        stroke: '#000',
        strokeThickness: 8
      }).setOrigin(0.5)
    }

    function reachFlag(player, flag) {
      this.physics.pause()
      
      const winText = this.add.text(this.cameras.main.scrollX + 512, 288, 'LEVEL COMPLETE!', {
        fontSize: '48px',
        fill: '#fff',
        fontFamily: 'Arial',
        stroke: '#000',
        strokeThickness: 8
      }).setOrigin(0.5)
      
      currentScore += 5000
      scoreText.setText('Score: ' + currentScore)
      setScore(currentScore)
    }

    function update() {
      if (!cursors || !player.body) return

      // Horizontal movement
      if (cursors.left.isDown) {
        player.setVelocityX(-250)
      } else if (cursors.right.isDown) {
        player.setVelocityX(250)
      } else {
        player.setVelocityX(0)
      }

      // Jump
      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-500)
      }

      // Enemy AI - reverse direction at edges
      enemies.children.entries.forEach(enemy => {
        if (!enemy.getData('alive')) return
        
        if (enemy.body.velocity.x > 0 && enemy.body.blocked.right) {
          enemy.body.setVelocityX(-80)
        } else if (enemy.body.velocity.x < 0 && enemy.body.blocked.left) {
          enemy.body.setVelocityX(80)
        }
      })
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
        marginBottom: '10px',
        color: '#fff',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '5px 0' }}>🍄 SUPER MARIO BROS</h1>
        <div style={{ fontSize: '18px' }}>
          Score: {score} | Coins: {coins} | Lives: {lives}
        </div>
      </div>
      <div ref={gameRef} style={{ 
        maxWidth: '100%',
        maxHeight: 'calc(100vh - 120px)'
      }} />
      <div style={{
        marginTop: '10px',
        color: '#fff',
        textAlign: 'center',
        fontSize: '12px'
      }}>
        <p>← → Move | ↑ Jump | Jump on enemies! | Collect 100 coins for 1UP!</p>
      </div>
    </div>
  )
}