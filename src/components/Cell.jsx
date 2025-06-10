import React from 'react'

export default function Cell({handleClick , rowIndex , colIndex , setPosition , border ,col , playerColor }) {
  return <div
              onClick={handleClick}
              key={crypto.randomUUID()}
              data-row={rowIndex}
              data-col={colIndex}
              data-position={`${setPosition(rowIndex, colIndex)}`}
              className={`bg-black flex items-center justify-center cursor-pointer `}
              style={{
                border: `1px solid ${border}50`, // 80 is ~50% opacity in hex
                color: `${playerColor[col.player]}`,
              }}
              >
              {col.count === 0 ? "" : <div className="pointer-events-none flex justify-center items center">
                {[...Array(col.count)].map((_, i) =>{
                  return <div
                  key={i}
                  style={{
                    backgroundColor: `${playerColor[col.player]}`,
                  }}
                  className="
      shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.2),5px_5px_15px_rgba(0,0,0,0.3)] w-[16px] h-[16px] border rounded-full pointer-events-none"
                  ></div>
                })}
                </div>}
              </div>
}
