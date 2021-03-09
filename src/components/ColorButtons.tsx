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
  const [color, setColor] = useState('black');

  const handleChange = (selectedColor: string) => {
    setColor(selectedColor);
    onChange(selectedColor);
  };

  return (
    <>
      <div className="buttons">
        {colors.map((color) => {
          return (
            <div
              className={`button ${color}`}
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
