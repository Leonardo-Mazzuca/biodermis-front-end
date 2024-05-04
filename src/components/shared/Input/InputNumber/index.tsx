
import { InputHTMLAttributes, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';


interface InputMoneyProps extends InputHTMLAttributes<HTMLInputElement> {

  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

const DECIMAL_SIZE = 2;

const InputMoney = ({ value, onChange, className }: InputMoneyProps) => {
    
  const [currentValue, setCurrentValue] = useState<string>(`${value}`);

  useEffect(() => {

    let valueString = `${value}`;
    
    if (!/\D/.test(valueString.replace('.', ''))) {
      setCurrentValue(value.toFixed(DECIMAL_SIZE).toString().replace('.', ','));
    }

    if(isNaN(value)) {
      setCurrentValue('00,00');
    }

  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const valueRemoved = event.target.value.replace(',', '');

    const sizeSlice = valueRemoved.length - DECIMAL_SIZE;
    const newValue = [valueRemoved.slice(0, sizeSlice), '.', valueRemoved.slice(sizeSlice)].join(
      '',
    );

    onChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };

  return (

    <input

      type='text'
      className={twMerge('bg-transparent placeholder-gray-neutral-600 p-0 border-b-2 border-gray-neutral-200 text-gray-neutral-600 border-l-0 border-r-0 border-t-0 w-full',className)}
      value={currentValue}
      onChange={handleOnChange}

    />

  );

};

export default InputMoney;