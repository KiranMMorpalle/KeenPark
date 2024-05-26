import { Loader2 } from 'lucide-react';
import React, { useRef, useState } from 'react'
import LiveModel from '../components/LiveModel';
import { json } from 'react-router-dom';

const Detect = () => {

    const host = 'http://127.0.0.1:8000/video_prediction/';

    const videoRef = useRef(null)
    const coordinatesRef = useRef(null)

    const [uploadedVideo,setUploadedVideo] = useState(null);
    const [show,setShow] = useState(false);
    const [loading,setLoading] = useState(false);
    const [prediction,setPrediction] = useState(false);
    
    function convertLocalPathToURL(localPath) {
        // Replace backslashes with forward slashes (for cross-platform compatibility)
        const normalizedPath = localPath.replace(/\\/g, '/');
    
        // Split the path into parts
        const pathParts = normalizedPath.split('/');
    
        // Find the index where the "results" directory starts
        const resultsIndex = pathParts.findIndex(part => part === 'results');
    
        // If "results" directory is found
        if (resultsIndex !== -1) {
            // Extract the path after the "results" directory
            const relativePath = pathParts.slice(resultsIndex + 1).join('/');
    
            // Construct the full URL based on your FastAPI server setup
            const baseURL = 'http://127.0.0.1:8000/static/';
            const fullURL = baseURL + relativePath;
    
            return fullURL;
        }
    
        // If "results" directory is not found, return null or handle the case accordingly
        return null;
    }
    const getRoutePath = (url)=>{
        const staticIndex = url.indexOf('static');

        const pathAfterStatic = url.substring(staticIndex + 'static'.length);
        return pathAfterStatic;
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        try{
            setLoading(true)
            const video = videoRef.current.files[0];
            const coordinates = coordinatesRef.current.files[0];

            setUploadedVideo(video);

            const formData = new FormData();
            formData.append('video',video);
            formData.append('coordinates',coordinates);

            const res = await fetch(host,{
                method:'POST',
                body:formData
            });

            const data = await res.json();
            console.log("Data received : ",data);

            const path1 = data.pred_file_path;
            const path2 = data.pred_vid_path;
            
            const jsonurl = convertLocalPathToURL(path1)
            const fileData = await fetch(jsonurl);
            const jsonObject = await fileData.json();


            const apiUrl = "http://127.0.0.1:8000/get_video";
            const videoUrl = getRoutePath(convertLocalPathToURL(path2));  

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ video_path: videoUrl }),
            });

            // console.log(response)
            const videoBlob = await response.blob();
            // console.log(videoBlob)
            const videoPath = URL.createObjectURL(videoBlob);
            // console.log(videoPath);
            setUploadedVideo(videoPath)
            // 
            // console.log(videoUrl)
           
            setPrediction(jsonObject);
            setShow(true);
           
        }
        catch(error){
            console.log("POST ERROR",error)
        }
        finally{
            setLoading(false)
        }
        
    }

    
  return (
    <div className='detect-bg h-[92vh] w-full flex justify-center items-center'>

    
        {!show? 
        <form onSubmit={handleSubmit} className='bg-white rounded-md p-10 flex flex-col gap-y-8'>
            <h1 className='text-2xl font-bold text-blue-500'>Enter Required Files</h1>

            <div className='flex flex-col gap-y-2'>
                <label htmlFor="" className='font-semibold text-lg '>Submit Video File</label>
                <input required ref={videoRef} type="file" accept='.mp4'/>
            </div>

            <div className='flex flex-col gap-y-2'> 
                <label htmlFor="" className='font-semibold text-lg '>Submit Coordinates File</label>
                <input required ref={coordinatesRef} type="file" accept='.txt' />
            </div>
            {loading && (
                <div className='flex items-center justify-center gap-3 m-auto'>
                    <Loader2 className='h-7 w-7 text-zinc-500 animate-spin'/>
                    Please wait ...
                </div>
            )}
            <button type='submit' className='w-full bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold py-2'>Submit</button>
        </form>:

        <LiveModel video={uploadedVideo} prediction={prediction}/>
        
        }

    </div>
  )
}

export default Detect