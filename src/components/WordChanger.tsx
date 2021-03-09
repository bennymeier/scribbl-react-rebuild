import { useEffect, useState } from 'react';

const words = [
  'Elephant',
  'Tiger',
  'Monkey',
  'House',
  'Flower',
  'Ship',
  'Airport',
  'Shark',
  'Flashlight',
  'Telephone',
  'Razor',
  'Remote Control',
  'Pizza',
  'Hamburger',
  'Cheese',
  'Noodles',
  'Camera',
  'Tea',
  'America',
  'Germany',
];

const WordChanger = () => {
  const [currentWord, setWord] = useState('');
  const [currentCuttedWord, setCuttedWord] = useState('');

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    const randomNr = Math.floor(Math.random() * words.length);
    const word = words[randomNr];
    setWord(word);
    replaceChars(word);
  };

  const replaceChars = (word: string) => {
    const randomPos = Math.floor(Math.random() * word.length);
    let newWord = word;
    for (let i = 0; i < word.length; i++) {
      if (i !== randomPos) {
        const newWordAsArray = newWord.split('');
        newWordAsArray[i] = '_';
        newWord = newWordAsArray.join('');
      }
    }
    setCuttedWord(newWord);
  };

  const EveryChar = () => {
    return (
      <div>
        Cutted:{' '}
        {[...currentCuttedWord].map((char, index) => {
          if (char === '_') {
            return (
              <span key={index} className="space">
                {char}{' '}
              </span>
            );
          } else {
            return (
              <span key={index} className="no-space">
                {char}
              </span>
            );
          }
        })}
      </div>
    );
  };

  return (
    <>
      <div className="word">
        Full: {currentWord}
        <EveryChar />
      </div>
    </>
  );
};

export default WordChanger;
