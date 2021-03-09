import { useState } from 'react';

const colors = [
  'white',
  'black',
  'gray',
  'brown',
  'red',
  'orange',
  'blue',
  'blueviolet',
  'yellow',
  'green',
];

interface Props {
  onChange: (selectedColor: string) => void;
}
const ColorButtons: React.FC<Props> = (props) => {
  const { onChange } = props;
  const [lineColor, setColor] = useState('black');

  const handleChange = (selectedColor: string) => {
    onChange(selectedColor);
    setColor(selectedColor);
  };

  return (
    <>
      <div className="buttons centered">
        {colors.map((color) => {
          const isSelected = color === lineColor;
          return (
            <div
              className={`button ${color} ${isSelected ? 'selected' : ''}`}
              title={color}
              key={color}
              onClick={() => handleChange(color)}
            ></div>
          );
        })}
      </div>
    </>
  );
};

export default ColorButtons;
