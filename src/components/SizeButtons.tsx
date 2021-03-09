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
  const handleChange = (selectedSize: number) => {
    onChange(selectedSize);
  };
  return (
    <>
      <div className="buttons">
        {sizes.map((obj) => {
          const { size, text } = obj;
          return (
            <div
              className={`button size-btn ${text}`}
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
