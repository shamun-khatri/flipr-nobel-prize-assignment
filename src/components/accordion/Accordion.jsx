import { useEffect, useState } from "react";

const Accordion = ({ prizes }) => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleClick = (idx) => {
    setOpenIndexes((prevIndexes) => {
      if (prevIndexes.includes(idx)) {
        return prevIndexes.filter((index) => index !== idx);
      } else {
        return [...prevIndexes, idx];
      }
    });
  };

  return (
    <>
      {Array.isArray(prizes) &&
        prizes.map((prize, idx) => (
          <div key={idx}>
            <div
              id={`accordion-flush-${idx}`}
              onClick={() => handleClick(idx)}
              data-accordion="collapse"
              data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              data-inactive-classes="text-gray-500 dark:text-gray-400"
            >
              <h2 id={`accordion-flush-heading-${idx}`}>
                <button
                  type="button"
                  className={`flex items-center justify-between w-full py-3 ${
                    openIndexes.includes(idx) ? "font-semibold text-gray-700" : "font-medium"
                  } rtl:text-right text-gray-600 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3 hover:text-gray-800`}
                  data-accordion-target={`#accordion-flush-body-${idx}`}
                  aria-expanded={openIndexes.includes(idx)}
                  aria-controls={`accordion-flush-body-${idx}`}
                >
                  <span>{`${prize.year}, ${prize.category}`}</span>
                  <svg
                    data-accordion-icon
                    className={`w-3 h-3 ${
                      openIndexes.includes(idx) ? "rotate-180 font-bold" : ""
                    } shrink-0`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={openIndexes.includes(idx) ? "3" : "2"}
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id={`accordion-flush-body-${idx}`}
                className={`${openIndexes.includes(idx) ? "" : "hidden"} text-left`}
                aria-labelledby={`accordion-flush-heading-${idx}`}
              >
                <div className="text-gray-600 py-5 border-b border-gray-200 dark:border-gray-700">
                  {prize.motivation.slice(1, -1)}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Accordion;
