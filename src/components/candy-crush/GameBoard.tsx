'use client'

import './style.scss'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const width = 8

const candies = ['circle', 'star', 'triangle', 'square']

export default function GameBoard() {
  const [currentCandyArrangement, setCurrentCandyArrangement] = useState<string[]>([])
  const [candyBeingDragged, setCandyBeingDragged] = useState<any>(null)
  const [candyBeingReplaced, setCandyBeingReplaced] = useState<any>(null)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  function createBoard() {
    const randomCandyArrangement: string[] = []
    for (let i = 0; i < width * width; i++) {
      let randomCandy = candies[Math.floor(Math.random() * candies.length)]
      randomCandyArrangement.push(randomCandy)
    }
    setCurrentCandyArrangement(randomCandyArrangement)
  }

  function checkForRowOfThree(candyArrangement: string[]): number {
    let candiesRemoved = 0

    for (let i = 0; i <= 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedCandy = candyArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const isBlank = candyArrangement[i] === 'blank'

      if (notValid.includes(i)) continue

      if (rowOfThree.every(candy => candyArrangement[candy] === decidedCandy && !isBlank)) {
        rowOfThree.forEach(candy => candyArrangement[candy] = 'blank')
        candiesRemoved += 3
      }
    }
    return candiesRemoved
  }

  function checkForRowOfFour(candyArrangement: string[]): number {
    let candiesRemoved = 0

    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedCandy = candyArrangement[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      const isBlank = candyArrangement[i] === 'blank'

      if (notValid.includes(i)) continue

      if (rowOfFour.every(candy => candyArrangement[candy] === decidedCandy && !isBlank)) {
        rowOfFour.forEach(candy => candyArrangement[candy] = 'blank')
        candiesRemoved += 4
      }
    }
    return candiesRemoved
  }

  function checkForColumnOfThree(candyArrangement: string[]): number {
    let candiesRemoved = 0

    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedCandy = candyArrangement[i]
      const isBlank = candyArrangement[i] === 'blank'

      if (columnOfThree.every(candy => candyArrangement[candy] === decidedCandy && !isBlank)) {
        columnOfThree.forEach(candy => candyArrangement[candy] = 'blank')
        candiesRemoved += 3
      }
    }
    return candiesRemoved
  }

  function checkForColumnOfFour(candyArrangement: string[]): number {
    let candiesRemoved = 0

    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedCandy = candyArrangement[i]
      const isBlank = candyArrangement[i] === 'blank'

      if (columnOfFour.every(candy => candyArrangement[candy] === decidedCandy && !isBlank)) {
        columnOfFour.forEach(candy => candyArrangement[candy] = 'blank')
        candiesRemoved += 4
      }
    }
    return candiesRemoved
  }

  function moveIntoSquareBelow() {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentCandyArrangement[i] === 'blank') {
        let randomNumber = Math.floor(Math.random() * candies.length)
        currentCandyArrangement[i] = candies[randomNumber]
      }

      if ((currentCandyArrangement[i + width]) === 'blank') {
        currentCandyArrangement[i + width] = currentCandyArrangement[i]
        currentCandyArrangement[i] = 'blank'
      }
    }
  }

  function dragStart(e: any) {
    setCandyBeingDragged(e.target)
  }

  function dragDrop(e: any) {
    setCandyBeingReplaced(e.target)
  }

  function dragEnd() {
    const candyBeingDraggedId = parseInt(candyBeingDragged.getAttribute('data-id'))
    const candyBeingReplacedId = parseInt(candyBeingReplaced.getAttribute('data-id'))

    const newCandyArrangement = [...currentCandyArrangement]

    newCandyArrangement[candyBeingReplacedId] = candyBeingDragged.getAttribute('alt')
    newCandyArrangement[candyBeingDraggedId] = candyBeingReplaced.getAttribute('alt')

    const validMoves = [
      candyBeingDraggedId - 1,
      candyBeingDraggedId - width,
      candyBeingDraggedId + 1,
      candyBeingDraggedId + width
    ]

    const validMove = validMoves.includes(candyBeingReplacedId)

    const isAColumnOfFour = checkForColumnOfFour([...newCandyArrangement]) > 0
    const isARowOfFour = checkForRowOfFour([...newCandyArrangement]) > 0
    const isAColumnOfThree = checkForColumnOfThree([...newCandyArrangement]) > 0
    const isARowOfThree = checkForRowOfThree([...newCandyArrangement]) > 0

    if (candyBeingReplacedId && validMove && (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
      setCurrentCandyArrangement(newCandyArrangement)
      setGameStarted(true)
    }

    setCandyBeingDragged(null)
    setCandyBeingReplaced(null)
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      let candiesRemoved = 0

      candiesRemoved += checkForColumnOfFour(currentCandyArrangement)
      candiesRemoved += checkForRowOfFour(currentCandyArrangement)
      candiesRemoved += checkForColumnOfThree(currentCandyArrangement)
      candiesRemoved += checkForRowOfThree(currentCandyArrangement)

      if (gameStarted && candiesRemoved > 0) {
        setScore((prevScore) => prevScore + candiesRemoved * 10)
      }

      moveIntoSquareBelow()
      setCurrentCandyArrangement([...currentCandyArrangement])
    }, 100)

    return () => clearInterval(timer)
  }, [currentCandyArrangement, gameStarted])

  return (
    <main>
      {/* <h1>Score: {score}</h1> */}

      <section className='game_board'>
        {currentCandyArrangement.map((candyColor, index) => (
          <div className="candy-wrapper" key={index}>
            <Image
              key={index}
              className='candy'
              data-id={index}
              src={`/formats/${candyColor}-candy.png`}
              alt={candyColor}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
              width={50}
              height={50}
            />
          </div>
        ))}
      </section>
    </main>
  )
}
