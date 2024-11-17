import { Grid } from "./Grid";

export default function GridRender({grids, isHorizontal=false}) {
  return (
    <div style={{display: 'flex', gap:'2px', width: "100%", flexDirection: isHorizontal?'row':'column'}}>
      {grids.map((grid, i) => {
        if (grid.subGrids && grid.subGrids.length>0) {
          return <GridRender key={i} grids={grid.subGrids} isHorizontal={grid.isHorizontal} />;
        } else {
          return <Grid key={grid.id} id={grid.id} block={grid.block} />;
        }
      })}
    </div>
  );
}
