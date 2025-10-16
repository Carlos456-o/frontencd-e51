import React, { useState } from 'react';

const Contador = () => {
  const [contador, setContador] = useState(0);

  return (
    <>
      <h1>Contador: {contador}</h1>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </> 
  );
}

export default Contador;