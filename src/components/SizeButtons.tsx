import { useState } from 'react';

const sizes = [
  { text: 'one', size: 1 },
  { text: 'three', size: 3 },
  { text: 'five', size: 5 },
  { text: 'seven', size: 7 },
  { text: 'nine', size: 9 },
];

interface Props {
  onChange: (selectedSize: number) => void;
}
const SizeButtons: React.FC<Props> = (props) => {
  const { onChange } = props;
  const [lineSize, setSize] = useState(3);

  const handleChange = (selectedSize: number) => {
    onChange(selectedSize);
    setSize(selectedSize);
  };

  return (
    <>
      <div className="buttons centered">
        {sizes.map((obj) => {
          const { size, text } = obj;
          const isSelected = size === lineSize;
          return (
            <div
              className={`button centered ${text} ${
                isSelected ? 'selected' : ''
              }`}
              title={`${size}`}
              key={text}
              onClick={() => handleChange(size)}
            >
              <span className={`size ${text}`}></span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SizeButtons;
