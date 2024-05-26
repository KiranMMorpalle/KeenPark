import React, { useEffect, useRef, useState } from 'react';
import success from "../assets/success.png";
import { X } from 'lucide-react';

const LiveModel = ({ video, prediction }) => {
  const [parkingState, setParkingState] = useState({});
  const [currentState, setCurrentState] = useState([]);
  const [timestamp, setTimestamp] = useState(0);

  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState(-1);
  const [videoLoaded, setVideoLoaded] = useState(false); // Track whether the video source is loaded

  const videoRef = useRef();

  useEffect(() => {
    const convertObject = () => {
      const convertedObject = {};
      for (const timestamp in prediction) {
        const spotStates = prediction[timestamp];
        const spotArray = Object.values(spotStates);
        convertedObject[timestamp - 1] = spotArray;
      }

      console.log(convertedObject);
      return convertedObject;
    };

    setParkingState(convertObject());
  }, [prediction]);

  useEffect(() => {
    if (!videoLoaded) {
      // Set video source only if it hasn't been loaded yet
      videoRef.current.src = video;
      setVideoLoaded(true);
    }

    const interval = setInterval(() => {
      if (timestamp < Object.keys(parkingState).length) {
        setCurrentState(parkingState[timestamp]);
        setTimestamp((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp, parkingState, video, videoLoaded]);

  const reserveSpot = (occupied, index) => {
    if (!occupied) {
      alert("Cannot Book an Occupied Slot!!");
      return;
    }
    if(index===0 || index===1){
      alert("CANNOT Book a Reserved Slot!!");
      return;
    }

    setSlot(index);
    setOpen(true);
  };

  return (
    <div className='w-full h-full p-10 relative'>
      {open && (
        <div className='fixed bg-[rgba(0,0,0,0.6)] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center'>
          <div className='z-40 relative bg-white rounded-md p-12 text-2xl flex flex-col items-center gap-y-6'>
            <img src={success} alt="" className='h-20 w-20'/>
            <p className='font-bold'>
              Successfully reserved Slot {slot + 1}!!
            </p>
            <X className='absolute right-2 top-2 h-8 w-8 cursor-pointer' onClick={() => setOpen(false)} />
          </div>
        </div>
      )}

      <h1 className='text-white text-3xl font-semibold'>Live Prediction :</h1>

      <div className='flex items-center gap-10 justify-between mt-12'>
        <div className='w-[40%]'>
          <video ref={videoRef} autoPlay muted /> {/* Muted to avoid autoplay issues */}
        </div>

        <div className='w-[60%]'>
          <h3 className='text-xl p-2 text-white font-semibold'>Select Empty Parking slot to Book it</h3>
          <div className='flex gap-x-4 gap-y-4 p-2 flex-wrap '>
            {currentState?.map((occupied, index) => (
              <div
                onClick={() => reserveSpot(occupied, index)}
                key={index}
                className={`h-18 w-14 flex items-center justify-center rounded-md cursor-pointer px-3 py-6 ${occupied === 1 ? 'bg-green-500' : 'bg-red-500'} ${slot === index ? 'bg-purple-500' : ''}`}
                style={(index===0 || index===1)?{backgroundColor:"blue"}:{}}
              >
                <p className='text-white text-2xl font-bold'>{index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='absolute text-white text-lg font-semibold bottom-10 right-10 flex flex-col items-start gap-y-4'>
            <div className='flex gap-4'>
              <div className='p-3 bg-blue-700'>

              </div>
              <p>Reserved Slots</p>
            </div>
            <div className='flex gap-4'>
              <div className='p-3 bg-purple-500'>

              </div>
              <p>Booked Slot</p>
            </div>
            <div className='flex gap-4'>
              <div className='p-3 bg-red-500'>

              </div>
              <p>Occupied Slots</p>
            </div>
            <div className='flex gap-4'>
              <div className='p-3 bg-green-500'>

              </div>
              <p>Empty Slots</p>
            </div>
      </div>
    </div>
  );
};

export default LiveModel;
