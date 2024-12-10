import React from 'react'
import "../styles/ImagesContainer.css"
const ImagesContainer = ({data}) => {
  return (
    <div className='images-container'>
        {data.map((e, i) => {
          return <div key={i}><img src={e}/></div>
        })}
    </div>
  )
}

export default ImagesContainer