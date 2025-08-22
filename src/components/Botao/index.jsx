import { useState } from 'react';

export function Botao({ icon, text, handleClick }) {
  return (
    <button className="bg-stone-100 p-2 border-2 rounded-md hover:bg-stone-200 active:bg-stone-300 cursor-pointer ">
      <p>{ text }</p>
    </button>
  )
}

