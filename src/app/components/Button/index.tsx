"use client"

import { ShapeType } from "../DrawingBoard"


const Button = ({selectedTool, onClick, text, value}: {selectedTool: ShapeType , onClick: ()  => any, text: string, value: string}) => {
    return <button
    className={`px-4 py-2 mr-2 rounded-md ${selectedTool === value ? "bg-blue-500 text-white" : "bg-gray-300"}`}
    onClick={() => onClick()}
  >
    {text}
  </button>
}


export default Button