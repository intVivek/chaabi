import { useDrag } from 'react-dnd'
import { ItemTypes } from './Grid'
import { useContext } from 'react';
import { GridContext } from '../App';

const addBlockToGrid = (grids, id, block) => {
  return grids.map((grid) => {
    if (grid.id === id) {
      return { ...grid, block };
    }

    if (grid.subGrids) {
      return { ...grid, subGrids: addBlockToGrid(grid.subGrids, id, block) };
    }
    return grid;
  });
};

export const Block = function Block(block) {

  const { setGrids } = useContext(GridContext);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const {id} = monitor.getDropResult()
      setGrids((grids) => {
        return addBlockToGrid(grids, id, block);
      });
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? 0.4 : 1
  return (
    <div ref={drag} style={{ opacity }} data-testid={`box`}>
      {block.label}
    </div>
  )
}
