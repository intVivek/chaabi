import { Blocks } from "./Grid";

export default function BlockRender({grids, isHorizontal=false}) {
  return (
    <div style={{display: 'flex', gap:'2px', width: "100%", flexDirection: isHorizontal?'row':'column'}}>
      {grids.map((grid, i) => {
          if (grid.subGrids && grid.subGrids.length>0) {
            return <BlockRender key={i} grids={grid.subGrids} isHorizontal={grid.isHorizontal} />;
          } else {
            return  <div key={i}>{grid?.block?.type && Blocks[grid?.block?.type]({ ...grid?.block, id: grid?.id })}</div>
          }
      })}
    </div>
  );
}
