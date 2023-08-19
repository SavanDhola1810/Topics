import React, { useRef, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './display.css'
import axios from 'axios'
import noteContext from '../contex/notes/NoteContext'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Link } from 'react-router-dom'

const Display = () => {

    const navigate = useNavigate();

    const [topics, setTopics] = useState('')
    const [id, setId] = useState('')

    const [image, setImage] = useState('')
    const [updateTopics, setUpdateTopics] = useState('')
    const [updateImage, setUpdateImage] = useState('')
    const [updateUploadedFileURL, setUpdateUploadedFileURL] = useState('')
    const [uploadedFileURL, setUploadedFileURL] = useState('')
    const [titleError, setTitleError] = useState('')
    const [imageError, setImageError] = useState('')
    const [alert, setAlert] = useState('')
    const [UpdateImageError, setUpdateImageError] = useState('')
    const [UpdateTitleError, setUpdateTitleError] = useState('')

    const c = useContext(noteContext);
    const { addTopic, getTopic, topic, deleteTopic, editTopic, changePosition, dragTopics } = c;

    useEffect(() => {
        getTopic();
    }, [])


    const inputRef = useRef('')
    const colorRef = useRef('')
    const updateRef = useRef('')
    const imageRef = useRef('')
    const dragItem = useRef('')
    const dragOveritem = useRef('')
    const alertRef = useRef('')
    const blurRef = useRef('')
    const blurRef1 = useRef('')

    const buttonClick = (e) => {
        setImageError('')
        setTitleError('')
        setImage('')
        setTopics('')
        setUploadedFileURL('')
        inputRef.current.style.display = "flex";
        blurRef.current.style.filter="blur(2px)"

    }
    const handleFileChange = (event) => {
        // console.log("hello")
        setImage(event.target.files[0])
        // console.log(event.target.files[0].name)
        setUploadedFileURL(event.target.files[0].name)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (topics.length === 0 && uploadedFileURL.length === 0) {
            setTitleError('Title is required!')
            setImageError('Image is required!')
        }
        else if (topics.length === 0 && uploadedFileURL.length != 0) {
            setTitleError('Title is required!')
            setImageError('')
        }
        else if (uploadedFileURL.length === 0 && topics.length != 0) {
            setImageError('Image is required!')
            setTitleError('')
        }
        else {
            const formData = new FormData();
            formData.append('image', image);
            axios.post('http://localhost:4000/api/topic/addImage', formData)
                .then((response) => {
                    console.log(response)
                    // setUploadedFileURL(response.data);
                    // console.log(uploadedFileURL)
                })
                .catch((error) => {
                    console.error(error);
                });
            inputRef.current.style.display = "none";
            blurRef.current.style.filter="blur(0px)"
            // colorRef.current.style.backgroundColor="lightgray"
            console.log(topics, uploadedFileURL)

            addTopic(topics, uploadedFileURL)
            alertRef.current.style.display = "flex"
            setAlert("Topic added successfully!")
            let time = setTimeout(() => {
                setAlert('')
                alertRef.current.style.display = "none"
            }, 1500)

            setTopics('')
            setUploadedFileURL('')
            setImageError('')
            setTitleError('')
        }



    }
    const handleUpdateFileUpload = (event) => {
        setUpdateImage(event.target.files[0])
        console.log(image)
        setUpdateUploadedFileURL(event.target.files[0].name)
    }
    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        if (updateTopics.length === 0 && updateUploadedFileURL.length === 0) {
            setUpdateTitleError('Title is required!')
            setUpdateImageError('Image is required!')
        }
        else if (updateTopics.length === 0 && updateUploadedFileURL.length != 0) {
            setUpdateTitleError('Title is required!')
            setUpdateImageError('')
        }
        else if (updateUploadedFileURL.length === 0 && updateTopics.length != 0) {
            setUpdateImageError('Image is required!')
            setUpdateTitleError('')
        }
        else {
            const formData = new FormData();
            formData.append('image', updateImage);
            axios.post('http://localhost:4000/api/topic/addImage', formData)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.error(error);
                });
            updateRef.current.style.display = "none";
            blurRef1.current.style.filter="blur(0px)"
            // console.log(id, updateTopics, updateUploadedFileURL)
            editTopic(id, updateTopics, updateUploadedFileURL)
            alertRef.current.style.display = "flex"
            setAlert("Topic updated successfully!")
            let time = setTimeout(() => {
                setAlert('')
                alertRef.current.style.display = "none"
            }, 1500)
            setUpdateTopics('')
            setUpdateUploadedFileURL('')
            setUpdateImageError('')
            setUpdateTitleError('')
        }
    }

    const handleEdit = (items) => {
        console.log("dhfhh")
        updateRef.current.style.display = "flex";
        blurRef1.current.style.filter="blur(2px)"
        setUpdateTopics(items.topic)
        setUpdateUploadedFileURL(items.imageUrl)
        setId(items._id)
    }

    const handleSorting = async (topic) => {
        // console.log(topic)
        await changePosition(topic)
        getTopic()
    }


    const handleSort = async () => {
        console.log(dragItem.current, dragOveritem.current)
        // getContent()
        await dragTopics(dragItem.current, dragOveritem.current)
        // setA('hello')
        getTopic()
        dragItem.current = null
        dragOveritem.current = null
        getTopic()
        // setA('')
        // getContent()
    }

    const handleDeleteTopic=async (item_id)=>{
        await deleteTopic(item_id)
        await getTopic()
    }

    return (
        <div className='w-full' style={{
            backgroundColor: "rgb(0,0,33)", height: "100vh",
            overflowY: "scroll",
            overflowX: "hidden"
        }} >
            <div className='w-full mt-20 text-white' style={{
                backgroundColor: "rgb(0,0,33)", height: "100vh",
            }} ref={blurRef}  onClick={()=>{inputRef.current.style.display = "none" 
            blurRef.current.style.filter="blur(0px)"}}    >
                <div ref={blurRef1}>
                <div className='text-4xl   p-10 text-center w-full font-semibold text-white'>Topics</div>
                <div className='flex flex-wrap justify-evenly w-4/5 mx-auto -mt-8 '>
                    {topic.length != 0 && topic.map((items, index) => {
                        return (
                            <>
                                <div className="hover:scale-105  card text-gray-100 rounded-xl border-gray-500 mt-8" style={{ width: "21rem", backgroundColor: "rgb(63,63,73)" }} draggable key={index}
                                    onDragStart={(e) => dragItem.current = items._id}
                                    onDragEnter={(e) => dragOveritem.current = items._id}
                                    onDragEnd={(e) => handleSort()}
                                    onDragOver={(e) => e.preventDefault()}>
                                    <Link to={`add/:${items.id}/:${items.topic}/:false `} ><img src={`http://localhost:4000/` + items.imageUrl} className="rounded-t-xl card-img-top h-48 object-cover" alt="..." onClick={() =>handleSorting(items.topic)} /></Link>
                                    <div className="card-body flex justify-between items-center ">
                                        <Link to={`/add/:${items.id}/:${items.topic}/:false`} ><h5 className="card-title mt-2 align-middle text-2xl ">{items.topic}</h5></Link>
                                        <div>
                                            <button className="btn p-0 bg-sky-300 mr-1 text-white hover:bg-sky-400" onClick={() => navigate(`/add/:${items.id}/:${items.topic} /:true`)}><AddIcon /></button>
                                            <button className="btn p-0 bg-sky-300 mr-1 text-white hover:bg-sky-400" onClick={() =>{blurRef1.current.style.filter="blur(2px)" 
                                            handleEdit(items)
                                                }}><EditIcon /></button>
                                            <button className="btn p-0 bg-sky-300 mr-1 text-white hover:bg-sky-400" onClick={() => {handleDeleteTopic(items._id) 
                                            }}><DeleteOutlineIcon /></button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                </div>
            </div>
            <div className='fixed top-1 w-full flex justify-center'>
                <div className=" alert alert-success hidden alert-dismissible fade show  " ref={alertRef} role="alert">
                    {alert}
                </div>
            </div>
            <div className='fixed right-10 top-6 '>
                <button className="p-2 text-xl  bg-sky-400 w-40 text-white   hover:bg-sky-500 rounded-xl " onClick={buttonClick}>Add Topic</button>
            </div>
                    
            <div className="hidden  fixed z-2  -mt-14 h-full  justify-center w-full mx-auto " style={{ overflowX: "hidden" }} ref={inputRef}>
                <div id="hidd" className=' fixed top-1/3   flex flex-col h-auto border-2 border-gray-500     w-1/4  rounded-2xl ' style={{ backgroundColor: "rgb(18,18,42)" }}>
                    <input type="text" value={topics}   onChange={(e) => setTopics(e.target.value)} className='cursor-pointer w-96 px-3 py-2  mt-10 mx-auto bg-transparent border-2 border-gray-500 rounded-xl  outline-none text-gray-400 text-xl' placeholder='title' />
                    <div className='text-red-300 ml-10 mt-1' style={{ textAlign: "left" }}>{titleError}</div>
                    <div className='flex items-center  mt-4 mx-auto w-full' >
                        <div className='flex   w-96 px-3 py-2 bg-transparent border-2 border-gray-500 rounded-xl outline-none mx-auto'  >

                            <label htmlFor='img1'>
                                <InsertPhotoIcon className='scale-150 text-white cursor-pointer ' />
                                <label className=' ml-8 text-gray-400 text-lg cursor-pointer ' >{!uploadedFileURL ? "No Image Choosen" : uploadedFileURL}</label>
                            </label>
                        </div>
                        <input type="file" id="img1" onChange={handleFileChange} ref={imageRef} className='hidden' />
                    </div>
                    <div className='text-red-300 ml-10 mt-1 ' style={{ textAlign: "left" }}>{imageError}</div>
                    <input type="submit" value="Submit" className=" mt-4 bg-sky-400 mx-auto mb-10 p-2 w-96 rounded-xl text-xl cursor-pointer hover:bg-sky-500 text-white" onClick={handleSubmit} />
                </div>
            </div>
            <div className="hidden fixed z-2  -mt-14 h-full  justify-center w-full mx-auto " style={{ overflowX: "hidden" }} ref={updateRef}>
                    <div id="hidd" className=' fixed top-1/3   flex flex-col h-auto border-2 border-gray-500  w-1/4  rounded-2xl  ' style={{ backgroundColor: "rgb(18,18,42)" }}>
                        <input type="text" value={updateTopics} onChange={(e) => setUpdateTopics(e.target.value)} className='cursor-pointer w-96 px-2 py-2 mx-auto mt-10 bg-transparent border-2 border-gray-500 rounded-xl  outline-none text-gray-400 text-xl' placeholder='title' />
                        <div className='text-red-300 ml-10  ' style={{ textAlign: "left" }}>{UpdateTitleError}</div>
                        {/* <input type="file" onChange={handleUpdateFileUpload} className='cursor-pointer text-gray-400 -ml-9' /> */}
                        <div className='flex items-center mt-4 mx-auto w-full' >
                            <div className='flex  w-96 px-3 py-2 bg-transparent border-2 border-gray-500 rounded-xl outline-none mx-auto ' style={{ marginLeft: "75px" }}>
                                <label htmlFor='img2'>
                                    <InsertPhotoIcon className='scale-150  cursor-pointer text-white' />
                                    <label className=' ml-8 text-gray-300 text-lg '>{updateUploadedFileURL}</label>
                                </label>
                            </div>
                            <input type="file" id='img2' onChange={handleUpdateFileUpload} ref={imageRef} className='cursor-pointer hidden text-gray-400 ' />
                        </div>
                        <div className='text-red-300 ml-10  ' style={{ textAlign: "left" }}>{UpdateImageError}</div>

                        <div className='flex justify-center'>
                            <input type="submit" value="Cancel" className="my-5 bg-sky-200 mb-10 p-2 w-28 mx-2 rounded-xl text-xl cursor-pointer hover:bg-sky-500  border-2 text-black border-sky-500" onClick={(e) => { updateRef.current.style.display = "none" 
                            blurRef1.current.style.filter="blur(0px)"  }} />
                            <input type="submit" value="Submit" className="my-5 bg-sky-400 mb-10 p-2 w-28 mx-2 rounded-xl text-xl cursor-pointer hover:bg-sky-500" onClick={handleUpdateSubmit} />
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Display
