import React from 'react'

function Autocomplete({ children, options, onClick }) {
  return (
    <div className="Autocomplete">
      {children}
      <ul className="Autocomplete-list">
        {options.map(option => (
          <li className="Autocomplete-option" onClick={() => onClick(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
}
