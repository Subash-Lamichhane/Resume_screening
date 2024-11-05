import React from 'react'
import tensorflowImage from '../../images/tensorflow.png'
import mernImage from '../../images/mern.png'
import kerasImage from '../../images/keras.png'
import fastImage from '../../images/fastapi.png'

const Technology = () => {
    const technologyList = [
        {
            img: fastImage,
            description: "FastAPI: Backend framework"
        },
        {
            img: tensorflowImage,
            description: "TensorFlow:  Machine Learning"
        },
        {
            img: kerasImage,
            description: "Keras: ANN interface"
        },
        {
            img: mernImage,
            description: "MERN: Web Application"
        },
    ];
    return (
        <div className='mx-10 my-20 md:m-20 flex justify-center flex-col items-center'>
            <h1 className='text-5xl font-bold text-center'>Technology</h1>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-10 md:w-[60%] mt-14'>
                {technologyList.map((technology, index) => (
                    <div key={index} className="flex items-center justify-center flex-col">
                        <img src={technology.img} alt="" className='w-24 h-24' />
                        <div className="text-center mt-2 text-slate-600 px-2">{technology.description}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Technology