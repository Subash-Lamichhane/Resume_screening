import React from 'react'
import GreenTick from '../../images/green_tick.png';

const infoItems = ["Drag and Drop Pdf file to begin",
    "Classify Resumes based on Job Requirements",
    "Easy to Use"
]

function SideInfo() {
    return (
        <div>
            {infoItems.map((item, index) => {
                return (
                    <div className='flex space-x-2 items-center pb-4' key={index}>
                        <img src={GreenTick} alt="greenTick" className='w-4 h-4 md:w-8 md:h-8 ' />
                    <div key={item.id}>{item}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default SideInfo