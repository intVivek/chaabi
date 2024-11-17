import "./App.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./component/Container";
import { createContext, useEffect, useState } from "react";
import Header from "./component/Header";

export const GridContext = createContext();

export const FrameContext = createContext();

function App() {
  const frame1 = [
    { id: 1, block: null },
    { id: 2, block: null },
    { id: 3, block: null },
    { id: 4, block: null },
    { id: 5, block: null },
  ];

  const frame2 = [
    {
      id: 6,
      isHorizontal: true,
      subGrids: [
        { id: "6-1", block: null },
        { id: "6-2", block: null },
      ],
    },
    { id: 7, block: null },
    {
      id: 8,
      isHorizontal: true,
      subGrids: [
        { id: "8-1", block: null },
        { id: "8-2", block: null },
      ],
    },
    { id: 9, block: null },
  ];

  const frame3 = [
    {
      id: 10,
      isHorizontal: true,
      subGrids: [
        { id: "10-1", block: null },
        {
          id: "10-2",
          subGrids: [
            { id: "10-2-1", block: null },
            { id: "10-2-2", block: null },
          ],
        },
      ],
    },
    { id: 11, block: null },
  ];

  const frames = [frame1, frame2, frame3];

  const [currentFrame, setCurrentFrame] = useState(0);

  const [grids, setGrids] = useState(frames[0]);

  useEffect(() => {
    setGrids(frames[currentFrame]);
  }, [currentFrame]);

  return (
    <div className="App">
      <FrameContext.Provider value={{ frames, currentFrame, setCurrentFrame }}>
        <GridContext.Provider value={{ grids, setGrids }}>
          <Header />
          <DndProvider backend={HTML5Backend}>
            <Container />
          </DndProvider>
        </GridContext.Provider>
      </FrameContext.Provider>
    </div>
  );
}

export default App;
