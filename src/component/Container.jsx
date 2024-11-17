import "./Container.css";

import { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Blocks, Grid } from "./Grid";
import { Block } from "./Block";
import { FrameContext, GridContext } from "../App";
import { Button, Modal, Radio } from "antd";
import BlockRender from "./BlockRender";
import GridRender from "./GridRender";

export const Container = memo(function Container() {
  const { grids } = useContext(GridContext);
  const { frames, setCurrentFrame } = useContext(FrameContext);
  const [state, setState] = useState({});

  const blocks = [
      {
        type: "progress",
        label: "Progress",
        value: 50,
      },
      {
        type: "text",
        label: "Question",
        value: "What is the capital of India ?",
      },
      {
        type: "timer",
        label: "Timer",
        value: 50,
      },
      {
        type: "image",
        label: "Image",
        value:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        type: "options",
        label: "Options",
        options: [
          {
            value: "delhi",
            label: "Delhi",
          },
          {
            value: "mumbai",
            label: "Mumbai",
          },
          {
            value: "kolkata",
            label: "Kolkata",
          },
          {
            value: "chennai",
            label: "Chennai",
          },
        ],
        onChange: (e, id, component) => {
          console.log(e.target.value, id);
          setState((p) => {
            return {
              ...p,
              [id]: {
                value: e.target.value,
                component: component,
              },
            };
          });
        },
      },
    ]

  useEffect(() => {
    setState({});
  }, [frames]);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="container">
      <div className="blocks">
        {blocks.map((block, i) => (
          <Block key={i} {...block} />
        ))}
      </div>
      <div className="">
        <div className="frames">
          <Radio.Group
            defaultValue={0}
            onChange={(e) => setCurrentFrame(e.target.value)}
            buttonStyle="solid"
          >
            {frames?.map((_, i) => (
              <Radio.Button value={i}>{`Frame ${i + 1}`}</Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div className="grid-container">
          <GridRender grids={grids} />
        </div>
      </div>
      <div className="right">
        <Button primary onClick={() => setOpenModal(true)}>
          Run Demo
        </Button>
        {openModal && (
          <Modal
            title="App"
            open={openModal}
            onOk={() => {
              const message = Object.entries(state)
              .map(([id, { value, component }]) => {
                return `${value} is selected from grid Id: "${id}" and component "${component}"`;
              })
              .join("\n");

            alert(message);
            }}
            onCancel={() => {
              setOpenModal(false);
            }}
            on
            okText="Submit"
            cancelText="Close"
            width={400}
            centered
          >
            <BlockRender grids={grids} />
          </Modal>
        )}
      </div>
    </div>
  );
});
