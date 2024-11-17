import React from "react";
import { Radio } from "antd";

const Options = ({options, label, onChange, type, ...props }) => {

  return (
    <Radio.Group style={{display: 'flex', flexDirection: 'column'}} onChange={(e)=>onChange(e, props?.id, label, type)}>
      {options.map((option, i) => (
        <Radio key={i} value={option.value}>{option.label}</Radio>
      ))}
    </Radio.Group>
  );
};

export default Options;
