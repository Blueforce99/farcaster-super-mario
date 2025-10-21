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

let sdk = null
if (typeof window !== 'undefined') {
  import('@farcaster/miniapp-sdk').then(module => {
    sdk = module.sdk
  }).catch(err => console.log('SDK not available'))
}

export default function MarioGame() {
  const gameRef = useRef(null)
  const [gameInstance, setGameInstance] = useState(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [coins, setCoins] = useState(0)
  const [Phaser, setPhaser] = useState(null)

  useEffect(() => {
    import('phaser').then((PhaserModule) => {
      setPhaser(PhaserModule.default)
    })
  }, [])

  useEffect(() => {
    if (!Phaser || !gameRef.current) return

    const initSDK = async () => {
      try {
        if (sdk && sdk.actions) {
          await sdk.actions.ready()
        }
      } catch (error) {
        console.error('SDK error:', error)
      }
    }
    initSDK()

    let currentScore = 0
    let currentLives = 3
    let currentCoins = 0
    let marioState = 'small'

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

    let player, platforms, bricks, questionBlocks, cursors, scoreText, livesText, coinsText
    let collectedCoins, enemies, powerUps, pipes, flagPole

    function preload() {
      // Load SVG sprites
      this.load.image('mario-small', generateMarioSprite('small'))
      this.load.image('mario-big', generateMarioSprite('big'))
      this.load.image('goomba', generateGoombaSprite())
      this.load.image('koopa', generateKoopaSprite())
      this.load.image('coin', generateCoinSprite())
      this.load.image('mushroom', generateMushroomSprite())
      this.load.image('brick', generateBrickSprite())
      this.load.image('question', generateQuestionBlockSprite(false))
      this.load.image('question-used', generateQuestionBlockSprite(true))
      this.load.image('pipe', generatePipeSprite())
    }

    function create() {
      this.physics.world.setBounds(0, 0, 3200, 576)

      // Clouds
      for (let i = 0; i < 10; i++) {
        const x = Phaser.Math.Between(100, 3000)
        const y = Phaser.Math.Between(50, 150)
        this.add.ellipse(x, y, 80, 40, 0xffffff, 0.8)
      }

      // Bushes
      for (let i = 0; i < 15; i++) {
        const x = i * 200 + 50
        this.add.ellipse(x, 550, 60, 30, 0x228B22)
      }

      // Ground
      platforms = this.physics.add.staticGroup()
      for (let x = 0; x < 3200; x += 32) {
        platforms.add(this.add.rectangle(x + 16, 560, 32, 32, 0x8B4513))
      }
      platforms.refresh()

      // Bricks
      bricks = this.physics.add.staticGroup()
      for (let i = 0; i < 5; i++) {
        const brick = this.add.image(400 + i * 40, 300, 'brick').setDisplaySize(32, 32)
        bricks.add(brick)
      }
      for (let i = 0; i < 3; i++) {
        const brick = this.add.image(800 + i * 40, 250, 'brick').setDisplaySize(32, 32)
        bricks.add(brick)
      }
      bricks.refresh()

      // Question blocks
      questionBlocks = this.physics.add.staticGroup()
      const qBlock1 = this.add.image(480, 300, 'question').setDisplaySize(32, 32)
      qBlock1.setData('type', 'coin').setData('used', false)
      questionBlocks.add(qBlock1)
      
      const qBlock2 = this.add.image(560, 300, 'question').setDisplaySize(32, 32)
      qBlock2.setData('type', 'mushroom').setData('used', false)
      questionBlocks.add(qBlock2)
      
      const qBlock3 = this.add.image(920, 250, 'question').setDisplaySize(32, 32)
      qBlock3.setData('type', 'coin').setData('used', false)
      questionBlocks.add(qBlock3)
      questionBlocks.refresh()

      // Pipes
      pipes = this.physics.add.staticGroup()
      const pipe1 = this.add.image(600, 530, 'pipe').setDisplaySize(64, 46)
      pipes.add(pipe1)
      const pipe2 = this.add.image(1200, 530, 'pipe').setDisplaySize(64, 46)
      pipes.add(pipe2)
      const pipe3 = this.add.image(1800, 480, 'pipe').setDisplaySize(64, 96)
      pipes.add(pipe3)
      pipes.refresh()

      // Floating platforms
      platforms.add(this.add.rectangle(700, 400, 120, 20, 0x00ff00))
      platforms.add(this.add.rectangle(1000, 350, 100, 20, 0x00ff00))
      platforms.add(this.add.rectangle(1400, 300, 120, 20, 0x00ff00))
      platforms.add(this.add.rectangle(1800, 250, 100, 20, 0x00ff00))
      platforms.refresh()

      // Mario
      player = this.physics.add.sprite(100, 450, 'mario-small')
      player.setDisplaySize(32, 32).setBounce(0.1).setCollideWorldBounds(true)
      player.body.setSize(28, 32)

      // Coins
      collectedCoins = this.physics.add.group()
      for (let i = 0; i < 30; i++) {
        const x = 200 + i * 100
        if ((x > 570 && x < 630) || (x > 1170 && x < 1230) || (x > 1770 && x < 1830)) continue
        const coin = this.add.image(x, Phaser.Math.Between(200, 450), 'coin').setDisplaySize(16, 16)
        collectedCoins.add(coin)
      }

      // Enemies
      enemies = this.physics.add.group()
      createGoomba(this, 500, 520, enemies)
      createGoomba(this, 900, 520, enemies)
      createGoomba(this, 1300, 520, enemies)
      createGoomba(this, 1700, 520, enemies)
      createKoopa(this, 1100, 520, enemies)
      createKoopa(this, 1600, 520, enemies)

      // Power-ups
      powerUps = this.physics.add.group()

      // Flag pole
      flagPole = this.add.rectangle(3000, 400, 20, 300, 0x000000)
      this.physics.add.existing(flagPole, true)
      this.add.rectangle(3020, 300, 40, 30, 0xff0000)

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

      enemies.children.entries.forEach(enemy => {
        enemy.body.setVelocityX(-80)
      })

      // Overlaps
      this.physics.add.overlap(player, collectedCoins, collectCoin, null, this)
      this.physics.add.overlap(player, enemies, hitEnemy, null, this)
      this.physics.add.overlap(player, powerUps, collectPowerUp, null, this)
      this.physics.add.overlap(player, flagPole, reachFlag, null, this)

      cursors = this.input.keyboard.createCursorKeys()

      // UI
      scoreText = this.add.text(16, 16, 'Score: 0', {
        fontSize: '20px', fill: '#fff', fontFamily: 'Arial', stroke: '#000', strokeThickness: 4
      }).setScrollFactor(0)

      livesText = this.add.text(16, 45, 'Lives: ♥ ♥ ♥', {
        fontSize: '20px', fill: '#ff0000', fontFamily: 'Arial', stroke: '#000', strokeThickness: 4
      }).setScrollFactor(0)

      coinsText = this.add.text(16, 74, 'Coins: 0', {
        fontSize: '20px', fill: '#ffd700', fontFamily: 'Arial', stroke: '#000', strokeThickness: 4
      }).setScrollFactor(0)

      this.cameras.main.startFollow(player, false, 0.1, 0.1)
      this.cameras.main.setBounds(0, 0, 3200, 576)
    }

    function createGoomba(scene, x, y, group) {
      const goomba = scene.add.image(x, y, 'goomba').setDisplaySize(32, 32)
      goomba.setData('type', 'goomba').setData('alive', true)
      group.add(goomba)
    }

    function createKoopa(scene, x, y, group) {
      const koopa = scene.add.image(x, y, 'koopa').setDisplaySize(32, 40)
      koopa.setData('type', 'koopa').setData('alive', true)
      group.add(koopa)
    }

    function hitQuestionBlock(player, block) {
      if (block.getData('used')) return
      const blockType = block.getData('type')
      block.setData('used', true).setTexture('question-used')

      this.tweens.add({
        targets: block, y: block.y - 10, duration: 100, yoyo: true
      })

      if (blockType === 'coin') {
        currentCoins++
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
      const mushroom = scene.add.image(x, y, 'mushroom').setDisplaySize(24, 24)
      powerUps.add(mushroom)
      mushroom.body.setVelocityX(100).setBounce(0)
      mushroom.setData('type', 'mushroom')
    }

    function collectCoin(player, coin) {
      coin.destroy()
      currentCoins++
      currentScore += 100
      coinsText.setText('Coins: ' + currentCoins)
      scoreText.setText('Score: ' + currentScore)
      setCoins(currentCoins)
      setScore(currentScore)
      
      if (currentCoins >= 100) {
        currentCoins = 0
        currentLives++
        livesText.setText('Lives: ' + '♥ '.repeat(currentLives))
        setLives(currentLives)
      }
    }

    function collectPowerUp(player, powerUp) {
      powerUp.destroy()
      if (powerUp.getData('type') === 'mushroom' && marioState === 'small') {
        marioState = 'big'
        player.setTexture('mario-big').setDisplaySize(32, 48)
        player.body.setSize(28, 48)
        currentScore += 1000
        scoreText.setText('Score: ' + currentScore)
        setScore(currentScore)
      }
    }

    function hitEnemy(player, enemy) {
      if (!enemy.getData('alive')) return

      if (player.body.velocity.y > 0 && player.y < enemy.y - 10) {
        enemy.setData('alive', false).setAlpha(0.5).setTint(0x888888)
        enemy.body.setVelocity(0, 0).enable = false
        player.setVelocityY(-300)
        currentScore += 200
        scoreText.setText('Score: ' + currentScore)
        setScore(currentScore)
        
        this.time.delayedCall(500, () => enemy.destroy())
      } else {
        if (marioState === 'big') {
          marioState = 'small'
          player.setTexture('mario-small').setDisplaySize(32, 32)
          player.body.setSize(28, 32)
        } else {
          loseLife(this)
        }
      }
    }

    function loseLife(scene) {
      currentLives--
      livesText.setText('Lives: ' + '♥ '.repeat(Math.max(0, currentLives)))
      setLives(currentLives)
      
      if (currentLives <= 0) {
        gameOver(scene)
      } else {
        player.setPosition(100, 450).setVelocity(0, 0)
      }
    }

    function gameOver(scene) {
      scene.physics.pause()
      player.setTint(0xff0000)
      scene.add.text(scene.cameras.main.scrollX + 512, 288, 'GAME OVER', {
        fontSize: '64px', fill: '#fff', fontFamily: 'Arial', stroke: '#000', strokeThickness: 8
      }).setOrigin(0.5)
    }

    function reachFlag(player, flag) {
      this.physics.pause()
      this.add.text(this.cameras.main.scrollX + 512, 288, 'LEVEL COMPLETE!', {
        fontSize: '48px', fill: '#fff', fontFamily: 'Arial', stroke: '#000', strokeThickness: 8
      }).setOrigin(0.5)
      
      currentScore += 5000
      scoreText.setText('Score: ' + currentScore)
      setScore(currentScore)
    }

    function update() {
      if (!cursors || !player.body) return

      if (cursors.left.isDown) {
        player.setVelocityX(-250)
      } else if (cursors.right.isDown) {
        player.setVelocityX(250)
      } else {
        player.setVelocityX(0)
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-500)
      }

      enemies.children.entries.forEach(enemy => {
        if (!enemy.getData('alive')) return
        
        if (enemy.body.velocity.x > 0 && enemy.body.blocked.right) {
          enemy.body.setVelocityX(-80)
        } else if (enemy.body.velocity.x < 0 && enemy.body.blocked.left) {
          enemy.body.setVelocityX(80)
        }
      })
    }

    return () => {
      if (game) game.destroy(true)
    }
  }, [Phaser])

  return (
    <div style={{ 
      width: '100%', height: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', overflow: 'hidden'
    }}>
      <div style={{ 
        marginBottom: '10px', color: '#fff', fontSize: '24px',
        fontFamily: 'Arial, sans-serif', textAlign: 'center'
      }}>
        <h1 style={{ margin: '5px 0' }}>🍄 SUPER MARIO BROS</h1>
        <div style={{ fontSize: '18px' }}>
          Score: {score} | Coins: {coins} | Lives: {lives}
        </div>
      </div>
      <div ref={gameRef} style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 120px)' }} />
      <div style={{
        marginTop: '10px', color: '#fff', textAlign: 'center', fontSize: '12px'
      }}>
        <p>← → Move | ↑ Jump | Jump on enemies! | Collect 100 coins for 1UP!</p>
      </div>
    </div>
  )
}