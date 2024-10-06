import React from 'react'
import Card from './Card'
import { useRef } from 'react'

function Foreground() {

    const cardContainerRef = useRef(null)

    const data = [
        {desc: "Lorem, ipsum dolor sit amet consectetur adipisicing", filesize: "0.9mb", bottom: {isDownloadCompleted: true, tagTitle: "Downloading. . .", tagColor: "green"}},
        {desc: "Lorem, ipsum dolor sit amet consectetur adipisicing", filesize: "2.4mb", bottom: {isDownloadCompleted: false, tagTitle: "View", tagColor: "sky"}},
        {desc: "Lorem, ipsum dolor sit amet consectetur adipisicing", filesize: "1.2mb", bottom: {isDownloadCompleted: true, tagTitle: "View", tagColor: "yellow"}},
    ]

    return (
        <div ref = {cardContainerRef} className='card-container w-full h-screen px-5 py-4 fixed top-0 left-0 z-[3] flex gap-10 flex-wrap'>
            {data.map((dataItem, index)=>{
                return <Card data={dataItem} reference={cardContainerRef}/>
            })}
        </div>
    )
}

export default Foreground
