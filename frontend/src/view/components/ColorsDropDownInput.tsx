import { ChevronDownIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { cn } from '../../app/utils/cn';
import { ColorIcon } from './icons/ColorIcon';
import { DropMenu } from './DropMenu';

interface ColorsDropDownInputProps {
  className?: string
  error?: string
  value?: string
  onChange?(value: string): void
}

type Color = {
  color: string
  bg: string
}

const colors: Color[] = [
  { color: '#FA5252', bg: '#FFF5F5' },
  { color: '#E64980', bg: '#FFF0F6' },
  { color: '#BE4BDB', bg: '#F8F0FC' },
  { color: '#7950F2', bg: '#F3F0FF' },
  { color: '#4C6EF5', bg: '#EDF2FF' },
  { color: '#228BE6', bg: '#E7F5FF' },
  { color: '#15AABF', bg: '#E3FAFC' },
  { color: '#12B886', bg: '#E6FCF5' },
  { color: '#40C057', bg: '#EBFBEE' },
  { color: '#82C91E', bg: '#F4FCE3' },
  { color: '#FAB005', bg: '#FFF9DB' },
  { color: '#FD7E14', bg: '#FFF4E6' },
  { color: '#868E96', bg: '#F8F9FA' },
  { color: '#212529', bg: '#F8F9FA' },
];

export function ColorsDropDownInput({ className, error, value, onChange }: ColorsDropDownInputProps) {

  const [selectedColor, setSelectedColor] = useState<null | Color>(() => {
    if (!value) {
      return null;
    }

    return colors.find(c => c.color === value) ?? null;
  });


  function handleSelectColor(color: Color) {
    setSelectedColor(color);
    onChange?.(color.color)
  }

  return (
    <div>
      <DropMenu.Root>
        <DropMenu.Trigger>
          <button
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative',
              error && '!border-red-900',
              className,
            )}
          >
            Cor

            <div
              className='absolute right-3 top-1/2 -translate-y-1/2'
            >
            {!selectedColor &&(
              <ChevronDownIcon
                className='w-6 h-6 text-gray-800'
              />
            )}
            {selectedColor && (
              <ColorIcon
                color={selectedColor.color}
                bg={selectedColor.bg}
              />
              )}
            </div>
          </button>
        </DropMenu.Trigger>
        <DropMenu.Content
          className='grid grid-cols-4'
        >
          {colors.map(color => (
            <DropMenu.Item
              key={color.color}
              onSelect={() => handleSelectColor(color)}
            >
              <ColorIcon
                color={color.color}
                bg={color.bg}
              />
            </DropMenu.Item>
          ))}
        </DropMenu.Content>
      </DropMenu.Root>

      {error && (
        <div className='flex gap-2 items-center mt-2 text-red-900'>
          <CrossCircledIcon />
          <span className=' text-xs'>{error}</span>
        </div>
      )}
    </div>
  )
}
