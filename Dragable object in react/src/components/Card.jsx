import React from 'react'
import { motion } from "framer-motion"
import { FaRegFileAlt } from "react-icons/fa";
import { MdDownloadForOffline } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";

function Card({ data, reference }) {
    return (
        <motion.div drag dragConstraints={reference} whileTap={{ scale: 1.1 }} dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }} className='relative w-60 h-72 bg-zinc-700 text-white rounded-[40px] px-7 py-8 overflow-hidden'>
            <FaRegFileAlt />
            <p className='text-sm mt-5 font-semibold leading-4'>{data.desc}</p>
            <div className='card-footer w-full absolute bottom-0 left-0'>
                <div className='flex items-center justify-between px-7 mb-5'>
                    <h4>{data.filesize}</h4>
                    {data.bottom.isDownloadCompleted ? <IoCloseCircle size={"1.5em"} color='red' /> : <MdDownloadForOffline size={"1.5em"} color="green" cursor={"pointer"} />}
                </div>
                {data.bottom.isDownloadCompleted && (
                    <div className={`rangeen-strip bg-sky-400 w-full py-3 flex justify-center items-center cursor-pointer`}>
                        <h3 className='text-sm font-semibold'>{data.bottom.tagTitle}</h3>
                    </div>
                )}

            </div>
        </motion.div>
    )
}

export default Card

