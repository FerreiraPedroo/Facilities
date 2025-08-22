import { useState } from 'react';

export function PageTitle({ title }) {
  return (
    <div className="w-full p-2">
      <h1>{ title }</h1>
    </div>
  )
}

