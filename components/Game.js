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

export default function MarioGame() {
  const gameRef = useRef(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [coins, setCoins] = useState(0)
  const [Phaser, setPhaser] = useState(null)

  useEffect(() => {
    import('phaser').then(mod => setPhaser(mod.default))
  }, [])

  useEffect(() => {
    if (!Phaser || !gameRef.current) return

    let gameState = {
      score: 0,
      coins: 0,
      lives: 3,
      marioState: 'small'
    }

    const config = {
      type: Phaser.AUTO,
      width: 1024,
      height: 576,
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

    const game = new Phaser.Game(config)

    let player, platforms, enemies, coins_group, powerUps, scoreText, livesText, coinsText, cursors

    function preload() {
      this.load.image('mario', generateMarioSprite('small'))
      this.load.image('mario-big', generateMarioSprite('big'))
      this.load.image('goomba', generateGoombaSprite())
      this.load.image('koopa', generateKoopaSprite())
      this.load.image('coin', generateCoinSprite())
      this.load.image('mushroom', generateMushroomSprite())
      this.load.image('brick', generateBrickSprite())
      this.load.image('block', generateQuestionBlockSprite(false))
      this.load.image('block-used', generateQuestionBlockSprite(true))
    }

    function create() {
      // World bounds
      this.physics.world.setBounds(0, 0, 2048, 576)

      // Background
      for (let i = 0; i < 8; i++) {
        this.add.ellipse(150 + i * 250, 100, 80, 40, 0xffffff, 0.8)
      }

      // Ground
      platforms = this.physics.add.staticGroup()
      for (let i = 0; i < 65; i++) {
        platforms.add(this.add.rectangle(i * 32 + 16, 560, 32, 32, 0x8B4513))
      }

      // Floating platforms
      platforms.add(this.add.rectangle(300, 450, 100, 20, 0x228B22))
      platforms.add(this.add.rectangle(600, 400, 100, 20, 0x228B22))
      platforms.add(this.add.rectangle(900, 350, 100, 20, 0x228B22))
      platforms.add(this.add.rectangle(1200, 300, 100, 20, 0x228B22))
      platforms.add(this.add.rectangle(1600, 350, 100, 20, 0x228B22))

      // Bricks
      this.add.image(400, 350, 'brick').setDisplaySize(32, 32)
      this.add.image(432, 350, 'brick').setDisplaySize(32, 32)
      this.add.image(464, 350, 'brick').setDisplaySize(32, 32)
      this.add.image(800, 300, 'brick').setDisplaySize(32, 32)
      this.add.image(832, 300, 'brick').setDisplaySize(32, 32)

      // Question blocks
      this.add.image(368, 350, 'block').setDisplaySize(32, 32)
      this.add.image(1100, 300, 'block').setDisplaySize(32, 32)

      // Mario
      player = this.physics.add.sprite(50, 450, 'mario')
      player.setDisplaySize(32, 32)
      player.setBounce(0)
      player.setCollideWorldBounds(true)

      // Coins - use physics group so overlaps work
      coins_group = this.physics.add.group()
      const coinPositions = [
        150, 200, 250, 300, 350, 450, 500, 550, 600, 700, 750, 800, 850, 900, 950, 1000,
        1100, 1150, 1200, 1250, 1300, 1400, 1450, 1500, 1600, 1650, 1700, 1750, 1800, 1900
      ]
      coinPositions.forEach(x => {
        const coin = this.physics.add.sprite(x, 280, 'coin')
        coin.setDisplaySize(16, 16)
        coin.setGravityY(-1) // Coins float
        coins_group.add(coin)
      })

      // Enemies
      enemies = this.physics.add.group()
      createEnemy(this, 250, 500, 'goomba', enemies)
      createEnemy(this, 700, 500, 'goomba', enemies)
      createEnemy(this, 1050, 500, 'koopa', enemies)
      createEnemy(this, 1400, 500, 'goomba', enemies)
      createEnemy(this, 1750, 500, 'koopa', enemies)

      // Power ups
      powerUps = this.physics.add.group()

      // Collisions
      this.physics.add.collider(player, platforms)
      this.physics.add.collider(enemies, platforms)
      this.physics.add.collider(powerUps, platforms)

      // Overlaps
      this.physics.add.overlap(player, coins_group, collectCoin, null, this)
      this.physics.add.overlap(player, enemies, hitEnemy, null, this)
      this.physics.add.overlap(player, powerUps, getPowerUp, null, this)

      // Controls
      cursors = this.input.keyboard.createCursorKeys()

      // UI
      scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '16px', fill: '#fff', fontFamily: 'Arial', stroke: '#000', strokeThickness: 3 }).setScrollFactor(0)
      coinsText = this.add.text(10, 30, 'Coins: 0', { fontSize: '16px', fill: '#ffd700', fontFamily: 'Arial', stroke: '#000', strokeThickness: 3 }).setScrollFactor(0)
      livesText = this.add.text(10, 50, 'Lives: 3', { fontSize: '16px', fill: '#ff0000', fontFamily: 'Arial', stroke: '#000', strokeThickness: 3 }).setScrollFactor(0)

      this.cameras.main.startFollow(player)
      this.cameras.main.setBounds(0, 0, 2048, 576)
    }

    function createEnemy(scene, x, y, type, group) {
      const enemy = scene.physics.add.sprite(x, y, type)
      enemy.setDisplaySize(32, type === 'koopa' ? 40 : 32)
      enemy.setVelocityX(-100)
      enemy.setCollideWorldBounds(true)
      enemy.setBounce(1)
      enemy.setData('type', type)
      enemy.setData('alive', true)
      group.add(enemy)
    }

    function collectCoin(player, coin) {
      coin.destroy()
      gameState.coins++
      gameState.score += 10
      coinsText.setText('Coins: ' + gameState.coins)
      scoreText.setText('Score: ' + gameState.score)
      setCoins(gameState.coins)
      setScore(gameState.score)
    }

    function hitEnemy(player, enemy) {
      if (!enemy.getData('alive')) return

      if (player.body.velocity.y > 0 && player.y < enemy.y) {
        enemy.setData('alive', false)
        enemy.setAlpha(0.3)
        enemy.setVelocity(0, 0)
        player.setVelocityY(-300)
        gameState.score += 100
        scoreText.setText('Score: ' + gameState.score)
        setScore(gameState.score)
        this.time.delayedCall(300, () => enemy.destroy())
      } else {
        if (gameState.marioState === 'big') {
          gameState.marioState = 'small'
          player.setTexture('mario').setDisplaySize(32, 32)
        } else {
          gameState.lives--
          livesText.setText('Lives: ' + gameState.lives)
          setLives(gameState.lives)
          if (gameState.lives <= 0) {
            this.physics.pause()
            player.setTint(0xff0000)
          } else {
            player.setPosition(50, 450)
            player.setVelocity(0, 0)
          }
        }
      }
    }

    function getPowerUp(player, powerUp) {
      powerUp.destroy()
      gameState.marioState = 'big'
      player.setTexture('mario-big').setDisplaySize(32, 48)
      gameState.score += 50
      scoreText.setText('Score: ' + gameState.score)
      setScore(gameState.score)
    }

    function update() {
      if (!cursors || !player.body) return

      if (cursors.left.isDown) {
        player.setVelocityX(-200)
      } else if (cursors.right.isDown) {
        player.setVelocityX(200)
      } else {
        player.setVelocityX(0)
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-400)
      }

      // Enemy AI
      enemies.children.entries.forEach(enemy => {
        if (!enemy.getData('alive')) return
        if (enemy.body.blocked.left || enemy.body.blocked.right) {
          enemy.setVelocityX(enemy.body.velocity.x > 0 ? -100 : 100)
        }
      })
    }

    return () => {
      game.destroy(true)
    }
  }, [Phaser])

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <h1 style={{ color: '#fff', marginBottom: '10px' }}>🍄 SUPER MARIO</h1>
      <div ref={gameRef} style={{ border: '2px solid #fff' }} />
      <p style={{ color: '#fff', marginTop: '10px', fontSize: '12px' }}>← → Move | ↑ Jump</p>
    </div>
  )
}