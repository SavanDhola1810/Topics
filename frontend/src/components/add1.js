import React, { useState, useRef, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import noteContext from '../contex/notes/NoteContext'
import AddIcon from '@mui/icons-material/Add'
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

const Add1 = () => {

    const c = useContext(noteContext);
    const { subContent1, addSubContent, getSubContent, editSubContent, subContent2, getSubContent1, addContentOfText1 } = c;

    const { id1, subTopic1 } = useParams();

    const dragItem = useRef('')
    const dragOveritem = useRef('')
    const scrollRef = useRef('')

    const [text, setText] = useState('');
    const [link, setLink] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [currentURL, setCurrentURL] = useState('');
    const [textError, setTextError] = useState()
    const [linkError, setLinkError] = useState()
    const [paragraphError, setParagraphError] = useState()

    useEffect(() => {
        getSubContent();
        // console.log(subContent1)
    }, [text, link, paragraph]);

    useEffect(() => {
        getSubContent1()
        setCurrentURL(window.location.href);
    }, [])

    const modalRef = useRef('')
    const textRef = useRef('')
    const linkRef = useRef('')
    const paragraphRef = useRef('')
    const submit1Ref = useRef('')
    const submit2Ref = useRef('')
    const submit3Ref = useRef('')
    const blurRef = useRef('')
    const hoverRef = useRef('')

    const handleText = () => {
        setLinkError('')
        setParagraphError('')
        textRef.current.style.display = "flex"
        submit1Ref.current.style.display = "flex"
        submit2Ref.current.style.display = "none"
        submit3Ref.current.style.display = "none"
        linkRef.current.style.display = "none"
        paragraphRef.current.style.display = "none"
    }
    const handleLink = () => {
        setTextError('')
        setParagraphError('')
        linkRef.current.style.display = "flex"
        submit2Ref.current.style.display = "flex"
        submit1Ref.current.style.display = "none"
        submit3Ref.current.style.display = "none"
        textRef.current.style.display = "none"
        paragraphRef.current.style.display = "none"
    }

    const handleParagraph = () => {
        setTextError('')
        setLinkError('')
        paragraphRef.current.style.display = "flex"
        submit3Ref.current.style.display = "flex"
        submit1Ref.current.style.display = "none"
        submit2Ref.current.style.display = "none"
        textRef.current.style.display = "none"
        linkRef.current.style.display = "none"
    }


    const handleSubmit1 = (e) => {
        e.preventDefault()
        if (text.length > 3) {
            addContentOfText1(id1.slice(1), subTopic1.slice(1), text, 'text', false)
            setText('')
            getSubContent()
            modalRef.current.style.display = "none"
            blurRef.current.style.filter="blur(0px)"
            setTextError('')
        }
        else if (text.length === 0) {
            setTextError("Text is required!")
        }
        else {
            setTextError("Text must be more than 3 characters")
        }

    }
    const handleSubmit2 = (e) => {
        e.preventDefault()
        if ((link.slice(0, 5)) === 'https') {
            addSubContent(id1.slice(1), subTopic1.slice(1), link, 'link')
            setLink('')
            getSubContent()
            modalRef.current.style.display = "none"
            blurRef.current.style.filter="blur(0px)"
            setLinkError('')
        }
        else if (link.length === 0) {
            setLinkError("Link is required!")
        }
        else {
            setLinkError("This is not a valid link format!")
        }

    }
    const handleSubmit3 = (e) => {
        e.preventDefault();
        if (paragraph.length > 10) {
            addSubContent(id1.slice(1), subTopic1.slice(1), paragraph, 'paragraph')
            setParagraph('')
            getSubContent()
            modalRef.current.style.display = "none"
            blurRef.current.style.filter="blur(0px)"
            setParagraphError('')
        }
        else if (paragraph.length === 0) {
            setParagraphError("Paragraph is required!")
        }
        else {
            setParagraphError("Paragraph must be more than 10 characters")
        }
    }

    const buttonClick = () => {
        modalRef.current.style.display = "flex"
        submit3Ref.current.style.display = "none"
        submit2Ref.current.style.display = "none"
        submit1Ref.current.style.display = "none"
        linkRef.current.style.display = "none"
        paragraphRef.current.style.display = "none"
        textRef.current.style.display = "none"
        blurRef.current.style.filter="blur(2px)"
        setTextError('')
        setLinkError('')
        setParagraphError('')
    }

    const handleSort = async () => {
        // console.log(dragItem.current, dragOveritem.current)
        // getContent()
        await editSubContent(dragItem.current, dragOveritem.current)
        dragItem.current = null
        dragOveritem.current = null
        getSubContent()
    }

    const countFun = (item) => {
        // console.log("h")
        let count = 0
        subContent2.map((ele, ind) => {
            if (ele.topicID == item) {
                count = count + 1
            }
            else {
                count = count
            }
        })
        return count;
    }

    const host = "http://localhost:4000"

    const editC = async (id) => {
        let isClickable = true
        const response = await fetch(`${host}/api/subContent/editClickable`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "auth-token":window.localStorage.getItem('token')
            },
            body: JSON.stringify({ isClickable, id }),
        });
        const note = await response.json();
    }

    const goToTop = () => {
        scrollRef.current.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
    
      const [isVisible,setIsVisible]=useState(false)
      const handleScroll = () => {
        if (scrollRef.current) {
          let scrollPosition = scrollRef.current.scrollTop;
        //   console.log(scrollPosition)
          if(scrollPosition>200){
            setIsVisible(true)
          }
          else{
            setIsVisible(false)
          }
        }
      };

      const [over,setOver]=useState(false)
      const [position,setPosition]=useState('')
    
      const handleMouseOver=(index)=>{
        setPosition(index)
        setOver(true)
      }
      const handleMouseOut=(index)=>{
        setPosition('')
        setOver(false)
      }
    


    return (
        <div className='w-full images hello' style={{
            backgroundColor: "rgb(0,0,33)", height: "100vh", color: "rgb(148,163,184)", fontFamily: "'Poppins', sans-serif",
            overflowY: "scroll"
          }} ref={scrollRef} onScroll={handleScroll}>
            <div className=' text-4xl p-4 text-center border-gray-600 ' style={{ boxShadow: "0px 6px 8px black",backgroundColor:"rgba(20,20,78,0.3)",fontWeight: "500",zIndex:"1", bottomBorderColorOpacity:"0.5",color: "whitesmoke" ,borderBottomWidth:"3px",borderBottomColor:""}}>{subTopic1.slice(1)}</div>
            <div className='w-full mx-auto' ref={blurRef} onClick={()=>{modalRef.current.style.display = 'none'
            blurRef.current.style.filter="blur(0px)"}}>
              <div className=" w-4/5 mx-auto" style={{
                color: "rgb(148,163,184)", height: "100vh"
              }} 
              
               >
              {/* <hr style={{background:"rgb(56 189 248)",height:"1.5px",border:"0",margin:"0px 36px"}} className=''/> */}
              <p className="m-10 text-lg  text-justify flex flex-col "  >
                    {subContent1 && subContent1.filter((ele, ind) => {
                        if (ele) {
                            return ele?.topicID == (id1.slice(1))
                        }
                    }).map((item, index) => {
                        return (
                            <p key={index} >
                 
                 {countFun(item.id) != 0 ? editC(item.id) ? <><p style={{ whiteSpace: "pre-line" }} draggable key={index}
                   onDragStart={(e) => dragItem.current = item._id}
                   onDragEnter={(e) => dragOveritem.current = item._id}
                   onDragEnd={(e) => handleSort()}
                   onDragOver={(e) => e.preventDefault()}>{item.content.length === 0 ? console.log("hello") : item.type === "link" ? <><p style={{ display: "block", lineHeight: "80%" }}>&nbsp;</p><a href={item.content} target='_blank' style={{ color: 'rgb(56 189 248)' }} >{item.content}</a></> : <><p style={{ display: "block", lineHeight: "90%" }}>&nbsp;</p>{item.type === "text" ? <Fade bottom duration={1000}><p className=" rounded-xl cursor-pointer  " style={{color:"#ffffff", backgroundColor:"",borderBottomWidth:"2px",padding:"12px 12px 12px 12px "}} id="item1" onMouseOut={()=>handleMouseOut(index)} onMouseOver={()=>handleMouseOver(index)}><div className='text-xl   font-medium border-box  flex justify-between items-center text-gray-200 ' style={{ fontSize: "1.5rem" }}><span >{item.content}</span><Link  className="cursor-pointer" to={`${currentURL}/:${item.id}/:${item.content}`}><span className=" font-medium  item3 " style={{fontSize: "1.1rem", display:over?position===index? "flex":"none":"none"  }} ref={hoverRef} >View more<span className='ml-4'>&gt;</span></span></Link>
                   </div></p> </Fade> : <p >{item.content}</p>}</>}</p></> : console.log("hello") : <p style={{ whiteSpace: "pre-line" }} draggable key={index}
                     onDragStart={(e) => dragItem.current = item._id}
                     onDragEnter={(e) => dragOveritem.current = item._id}
                     onDragEnd={(e) => handleSort()}
                     onDragOver={(e) => e.preventDefault()}>{item.content.length === 0 ? console.log("hello") : item.type === "link" ? <><p style={{ display: "block", lineHeight: "90%" }}>&nbsp;</p><Fade bottom duration={1000}><a className="link_color text-xl text-blue-400 underline" href={item.content} target='_blank' style={{color:"# ",padding:"6px"}}>{item.content}</a></Fade></> : <><p style={{ display: "block", lineHeight: "90%" }}>&nbsp;</p>{item.type === "text" ? <Fade bottom duration={1000}><div id="unClick" className='text-xl text-gray-400  font-medium border-box  flex justify-between items-center rounded-xl 'style={{backgroundColor:"",padding:"12px 12px 12px 12px " ,fontSize: "1.5rem"}} ><Link className="cursor-pointer " to={`${currentURL}/:${item.id}/:${item.content}`}><span >{item.content}</span></Link>
                     </div></Fade> : <Fade bottom duration={1000}><div
                       className='text-gray-400 rounded-xl font-medium '
                       style={{
                         color: "",
                         backgroundColor: "", padding: "6px", boxSizing: "border-box", 
                       }}>{item.content}</div></Fade>}</>}</p>}
               </p>

                        )
                    })
                    }
                </p><br />
            </div>
            </div>
            <p className=' border-3 cursor-pointer fixed font-semibold flex p-4 rounded-full animate-bounce  align-middle' style={{ top: "90%", right: "3%" ,borderColor:"blueviolet"}} onClick={buttonClick}><AddIcon style={{ transform: "scale(2.5)", color: "", fontSize: "large" }} className='justify-center items-center' /></p>

        {/* //GoToTop button */}
        {isVisible && <p className="cursor-pointer fixed" style={{ top: "80%", right: "3.5%" }}>
          <span onClick={goToTop} className='p-3 border-3  ' style={{ borderColor: "#3399ff", color: "", borderRadius: "50%" }}>
            <FontAwesomeIcon icon={faArrowUp} size="2xl" bounce />
          </span>
        </p>}

            <div className="z-2  grid  h-full w-full place-items-center " style={{ overflowX: "hidden", color: "rgb(226,232,240)" }} >
                <div className='hidden fixed top-1/4  flex-col  p-4 h-auto border-2 gray-400 w-1/4  rounded-2xl ' style={{ backgroundColor: "rgb(63,63,73)" }} ref={modalRef}>
                    <p className='text-xl font-semibold text-gray-200'>Please select what do you want to insert</p>
                    <div>
                        <input type="radio" id="text" name="fav_language" value="Text" className='inline text-gray-300 mt-4 scale-150' onClick={handleText} />
                        <label htmlFor="text" className='inline ml-4 mt-4 text-lg text-gray-300'>Text</label><br />
                    </div>
                    <div>
                        <input type="radio" id="link" name="fav_language" value="Link" className='inline scale-150' onClick={handleLink} />
                        <label htmlFor="link" className='inline ml-4 text-lg text-gray-300'>Link</label> <br />
                    </div>
                    <div>
                        <input type="radio" id="paragraph" name="fav_language" value="Paragraph" className='scale-150 text-white' onClick={handleParagraph} />
                        <label htmlFor="paragraph" className='ml-4 text-lg text-gray-300'>Paragraph</label>
                    </div>
                    <div className='hidden mt-3  flex-col ' ref={textRef}>
                        <p><label htmlFor="c" >Add text</label></p>
                        <input type="text" placeholder="Lorem ipsum" id="c" className='text-gray-700 outline-none border-2 border-gray-200 mt-2 p-2 text-lg rounded-lg bg-slate-400' value={text} onChange={(e) => setText(e.target.value)} />
                    </div>
                    <div className='text-red-300 mt-1'>{textError}</div>
                    <input type="submit" value="Submit" ref={submit1Ref} className=" -mb-4 hidden justify-center mt-4 text-white bg-sky-400  p-2 w-full rounded-xl text-xl cursor-pointer hover:bg-sky-500" onClick={handleSubmit1} style={{ textAlign: "center" }} />
                    <div className='hidden mt-3 flex-col' ref={linkRef}>
                        <p><label htmlFor="b">Add Link</label></p>
                        <input type="url" placeholder='https://www.w3schools.com/' id="b" value={link} className='text-gray-700 border-2 decoration-solid bg-slate-400  outline-none border-gray-200 mt-2 p-2 text-lg rounded-lg' onChange={(e) => setLink(e.target.value)} />
                    </div>
                    <div className='text-red-300 mt-1'>{linkError}</div>
                    <input type="submit" value="Submit" ref={submit2Ref} className=" hidden justify-center mt-4 -mb-4 text-white bg-sky-400  p-2 w-full rounded-xl text-xl cursor-pointer hover:bg-sky-500" onClick={handleSubmit2} style={{ textAlign: "center" }} />
                    <div className='hidden mt-3 flex-col' ref={paragraphRef}>
                        <p><label htmlFor="a">Add paragraph</label></p>
                        <textarea id="a" name="a" placeholder='Enter content here...' rows="5" cols="50" value={paragraph} onChange={(e) => setParagraph(e.target.value)} className="overflow-scroll text-gray-700  outline-none border-2 border-gray-200 mt-2 rounded-2xl  p-2 text-lg bg-slate-400 resize-none "></textarea>
                    </div>
                    <div className='text-red-300 mt-1'>{paragraphError}</div>
                    <input type="submit" value="Submit" ref={submit3Ref} className=" hidden justify-center text-white bg-sky-400 mt-4 p-2 w-full rounded-xl text-xl cursor-pointer hover:bg-sky-500" onClick={handleSubmit3} style={{ textAlign: "center" }} />
                </div>
            
            </div>
        </div>
    )
}

export default Add1
