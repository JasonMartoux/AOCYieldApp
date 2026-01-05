import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTermDefinition } from '../../utils/glossary';

interface TooltipTermProps {
  term: string;
  children?: React.ReactNode;
  showLink?: boolean;
}

export function TooltipTerm({ term, children, showLink = true }: TooltipTermProps) {
  const [isHovered, setIsHovered] = useState(false);
  const definition = getTermDefinition(term);

  if (!definition) {
    console.warn(`Tooltip term "${term}" not found in glossary`);
    return <span>{children || term}</span>;
  }

  return (
    <span className="relative inline-block">
      <span
        className="border-b border-dotted border-gray-400 cursor-help"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children || definition.term}
      </span>

      {isHovered && (
        <div className="absolute z-50 w-64 p-3 bg-gray-900 text-white text-xs rounded shadow-lg bottom-full left-1/2 transform -translate-x-1/2 mb-2">
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
            <div className="border-8 border-transparent border-t-gray-900" />
          </div>

          {/* Content */}
          <div className="mb-2">
            <div className="font-semibold mb-1">
              {definition.term}
              {definition.full && (
                <span className="font-normal text-gray-400"> ({definition.full})</span>
              )}
            </div>
            <div className="text-gray-200">{definition.short}</div>
          </div>

          {showLink && (
            <Link
              to="/glossary"
              className="text-blue-300 hover:text-blue-200 text-xs underline"
              onClick={(e) => e.stopPropagation()}
            >
              Learn more →
            </Link>
          )}
        </div>
      )}
    </span>
  );
}
