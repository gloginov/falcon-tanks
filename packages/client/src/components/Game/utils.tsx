import enemiesSpritePath from '@/assets/images/sprites/enemy.svg'
import tankSpritePath from '@/assets/images/sprites/tank.svg'
import wallSpritePath from '@/assets/images/sprites/wall.svg'
import { Enemy, Obstacle, Player } from '@/components/Game/gameTypes'

export const getRandomEdgePosition = (
  canvasWidth: number,
  canvasHeight: number
): { x: number; y: number } => {
  const edge: 0 | 1 | 2 | 3 = Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3

  switch (edge) {
    case 0: // Верхний край
      return { x: Math.random() * canvasWidth, y: 0 }
    case 1: // Правый край
      return { x: canvasWidth, y: Math.random() * canvasHeight }
    case 2: // Нижний край
      return { x: Math.random() * canvasWidth, y: canvasHeight }
    case 3: // Левый край
      return { x: 0, y: Math.random() * canvasHeight }
  }
}

export const clearCanvas = (context: CanvasRenderingContext2D) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

const tankSprite = new Image()
tankSprite.src = tankSpritePath

export const drawPlayer = (
  context: CanvasRenderingContext2D,
  player: Player
) => {
  context.save() // сохраняем текущую матрицу трансформации

  // Перемещаем контекст на позицию танка
  context.translate(player.x + player.width / 2, player.y + player.height / 2)

  const angle = Math.atan2(player.direction.x, player.direction.y)
  context.rotate(angle)

  context.drawImage(
    tankSprite,
    -player.width / 2,
    -player.height / 2,
    player.width,
    player.height
  )

  context.restore() // восстанавливаем матрицу трансформации
}

const enemiesSprite = new Image()
enemiesSprite.src = enemiesSpritePath

export const drawEnemies = (
  context: CanvasRenderingContext2D,
  enemies: Enemy[]
) => {
  enemies.forEach(enemy => {
    context.drawImage(enemiesSprite, enemy.x, enemy.y)
  })
}

const wallSprite = new Image()
wallSprite.src = wallSpritePath

export const drawObstacles = (
  context: CanvasRenderingContext2D,
  obstacles: Obstacle[]
) => {
  const SPRITE_SIZE = 50

  obstacles.forEach(obstacle => {
    const horizontalCount = Math.ceil(obstacle.width / SPRITE_SIZE)
    const verticalCount = Math.ceil(obstacle.height / SPRITE_SIZE)

    Array.from({ length: horizontalCount }).forEach((_, i) => {
      Array.from({ length: verticalCount }).forEach((_, j) => {
        const x = obstacle.x + i * SPRITE_SIZE
        const y = obstacle.y + j * SPRITE_SIZE

        const width = Math.min(SPRITE_SIZE, obstacle.width - i * SPRITE_SIZE)
        const height = Math.min(SPRITE_SIZE, obstacle.height - j * SPRITE_SIZE)

        context.drawImage(wallSprite, 0, 0, width, height, x, y, width, height)
      })
    })
  })
}
