import React from 'react'

export default function Detail(props) {
  return (
    <div>
       <p> Giá trị tham số : {props.match.params.id}</p>
       <p> Giá trị tham số : {props.match.path}</p>
       <p> Giá trị tham số : {props.match.url}</p>
      
    </div>
  )
}
