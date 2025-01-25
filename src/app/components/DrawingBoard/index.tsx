"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Stage, Layer, Rect, Circle, Line, Text as KonvaText } from "react-konva"
import Button from "../Button"

export type ShapeType = "rectangle" | "circle" | "line" | "free" | "text" | "eraser"

interface Shape {
  type: ShapeType
  points?: number[]
  x?: number
  y?: number
  width?: number
  height?: number
  radius?: number
  text?: string
  fill?: string
}

const DrawingBoard: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [currentShape, setCurrentShape] = useState<Shape | null>(null)
  const [selectedTool, setSelectedTool] = useState<ShapeType>("rectangle")
  const [isDrawing, setIsDrawing] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [textInput, setTextInput] = useState("")
  const stageRef = useRef<any>(null)

  const handleMouseDown = (e: any) => {
    const pos = e.target.getStage().getPointerPosition()
    setIsDrawing(true)

    if (selectedTool === "text") {
      setShapes([...shapes, { type: "text", x: pos.x, y: pos.y, text: textInput }])
      return
    }

    if (selectedTool === "free" || selectedTool === "eraser") {
      setCurrentShape({ type: selectedTool, points: [pos.x, pos.y] })
    } else if (selectedTool === "line") {
      setCurrentShape({ type: "line", points: [pos.x, pos.y, pos.x, pos.y] })
    } else {
      setCurrentShape({
        type: selectedTool,
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        fill: isFilled ? "#6a7282" : undefined,
      })
    }
  }

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return

    const pos = e.target.getStage().getPointerPosition()

    if (selectedTool === "free" || selectedTool === "eraser") {
      setCurrentShape((prevShape) => ({
        ...prevShape!,
        points: [...(prevShape?.points || []), pos.x, pos.y],
      }))
    } else if (selectedTool === "line") {
      setCurrentShape((prevShape) => ({
        ...prevShape!,
        points: [prevShape?.points?.[0] || 0, prevShape?.points?.[1] || 0, pos.x, pos.y],
      }))
    } else if (currentShape) {
      const newWidth = pos.x - (currentShape.x || 0)
      const newHeight = pos.y - (currentShape.y || 0)
      setCurrentShape({
        ...currentShape,
        width: newWidth,
        height: newHeight,
        x: newWidth < 0 ? pos.x : currentShape.x,
        y: newHeight < 0 ? pos.y : currentShape.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    if (currentShape) {
      if (selectedTool === "circle" && currentShape.width && currentShape.height) {
        const radius = Math.sqrt(Math.pow(currentShape.width, 2) + Math.pow(currentShape.height, 2)) / 2
        setShapes([...shapes, { ...currentShape, radius, type: "circle" }])
      } else if (currentShape.width !== 0 && currentShape.height !== 0) {
        setShapes([...shapes, normalizeShape(currentShape)])
      }
      setCurrentShape(null)
    }
  }

  const normalizeShape = (shape: Shape): Shape => {
    if (shape.type === "rectangle" || shape.type === "circle") {
      const width = Math.abs(shape.width || 0)
      const height = Math.abs(shape.height || 0)
      const x = shape.width && shape.width < 0 ? (shape.x || 0) + shape.width : shape.x
      const y = shape.height && shape.height < 0 ? (shape.y || 0) + shape.height : shape.y
      return { ...shape, x, y, width, height }
    }
    return shape
  }

  const renderShape = (shape: Shape, key: number) => {
    const normalizedShape = normalizeShape(shape)
    switch (normalizedShape.type) {
      case "rectangle":
        if (normalizedShape.width && normalizedShape.height) {
          const cornerRadius = Math.min(5, normalizedShape.width / 10, normalizedShape.height / 10)
          return (
            <Rect
              key={key}
              x={normalizedShape.x}
              y={normalizedShape.y}
              width={normalizedShape.width}
              height={normalizedShape.height}
              cornerRadius={cornerRadius}
              stroke="#6a7282"
              fill={normalizedShape.fill}
            />
          )
        }
        return null
      case "circle":
        if (normalizedShape.x !== undefined && normalizedShape.y !== undefined && normalizedShape.radius) {
          return (
            <Circle
              key={key}
              x={normalizedShape.x + normalizedShape.radius}
              y={normalizedShape.y + normalizedShape.radius}
              radius={normalizedShape.radius}
              stroke="#6a7282"
              fill={normalizedShape.fill}
            />
          )
        }
        return null
      case "line":
      case "free":
        if (normalizedShape.points && normalizedShape.points.length >= 4) {
          return (
            <Line
              key={key}
              points={normalizedShape.points}
              stroke="#6a7282"
              tension={normalizedShape.type === "free" ? 0.5 : 0}
            />
          )
        }
        return null
      case "text":
        if (normalizedShape.x !== undefined && normalizedShape.y !== undefined && normalizedShape.text) {
          return (
            <KonvaText
              key={key}
              x={normalizedShape.x}
              y={normalizedShape.y}
              text={normalizedShape.text}
              fontSize={16}
              fill="#6a7282"
            />
          )
        }
        return null
      case "eraser":
        if (normalizedShape.points && normalizedShape.points.length >= 4) {
          return (
            <Line
              key={key}
              points={normalizedShape.points}
              stroke="white"
              strokeWidth={20}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
            />
          )
        }
        return null
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        <Button
         value="rectangle"
         text="Rectangle"
          onClick={() => setSelectedTool("rectangle")}
          selectedTool={selectedTool}
      />
        <Button text="Circle" value="circle" selectedTool={selectedTool} onClick={() => setSelectedTool("circle")} />
        <Button text="Line" value="line" selectedTool={selectedTool} onClick={() => setSelectedTool("line")} />
        <Button text=" Free Draw" value="free" selectedTool={selectedTool} onClick={() => setSelectedTool("free")} />
        <Button text="Text" value="text" selectedTool={selectedTool} onClick={() => setSelectedTool("text")} />
        <Button text="Eraser" value="eraser" selectedTool={selectedTool} onClick={() => setSelectedTool("eraser")} />
        <Button text={isFilled ? "Filled" : "Outline"} value={isFilled ? "filled" : "outline"} selectedTool={selectedTool} onClick={() => setIsFilled(!isFilled)} />

      </div>
      {selectedTool === "text" && (
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="text-input">Text:</label>
          <input
            id="text-input"
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter text"
          />
        </div>
      )}
      <Stage
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
        className="border border-gray-300"
      >
        <Layer>
          {shapes.map((shape, i) => renderShape(shape, i))}
          {currentShape && renderShape(currentShape, shapes.length)}
        </Layer>
      </Stage>
    </div>
  )
}

export default DrawingBoard

