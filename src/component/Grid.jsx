import "./Grid.css";
import { Button, Image, Progress } from "antd";
import { Typography } from "antd";

import { useDrop } from "react-dnd";
import Options from "./Options";

export const ItemTypes = {
  BOX: "box",
};

const { Text } = Typography;

export const Blocks = {
  progress: ({ value }) => {
    return <Progress percent={value} />;
  },
  text: ({ value }) => {
    return <Text>{value}</Text>;
  },
  timer: ({ value }) => {
    return <Progress type="circle" size={20} percent={value} />;
  },
  image: ({ value }) => {
    return (
      <Image
        width={200}
        src={value}
      />
    );
  },
  options: Options,
};

export const Grid = ({ block, id }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  if (isActive) {
    backgroundColor = "#eaf5ff";
  } else if (canDrop) {
    // backgroundColor = "#f3f3f3";
  }

  return (
    <div
      ref={drop}
      style={{ backgroundColor }}
      className="grid"
      data-testid="grid"
    >
      {block?.type && Blocks[block?.type]({ ...block, id })}
    </div>
  );
};
