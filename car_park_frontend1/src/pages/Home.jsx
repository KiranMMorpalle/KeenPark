import React from 'react'
import bg from "../assets/bg.jpeg"
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='h-[92vh] w-[100vw] page relative'>
      <div className='w-[40%] text-white absolute flex flex-col gap-y-6 left-[10%] top-1/2 -translate-y-1/2'>
        <h1 className='leading-[90px] font-bold text-[84px]'>Welcome to Parkit !</h1>
        <p className='text-[22px] font-semibold'>An application designed to simplify finding you the perfect parking spot in not time , saving countless client hours leading to a productive day.</p>

        <button className=' w-fit text-md p-2 px-8 outline-none border-none rounded-md bg-blue-500 hover:bg-blue-600 text-white'>
          <Link to="/detect">
            Find My Spot
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Home