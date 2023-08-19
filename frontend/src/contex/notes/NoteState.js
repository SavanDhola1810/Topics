import React, { useState } from 'react'
import NoteContext from './NoteContext'
const host=process.env.REACT_APP_HOST

const NoteState = (props) => {
  const s = []
  const t = []
  const j= []
  const k= []
  const m= []
  const l= []
  const a= []
  

  console.log(process.env.REACT_APP_HOST)
  //get all a topic
  const getTopic = async () => {
    const response = await fetch(`${host}/api/topic/getTopic`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": window.localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setTopic(json)
  }

  //changePosition of topic
  const changePosition=async (topic)=>{
    // console.log(topic,seq)
    const response = await fetch(`${host}/api/topic/changePositionOfTopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ topic}),
    });

    const note = await response.json();
    setTopic(note);
  }

  //add a Topic
  const addTopic = async (topicName, imageUrl) => {
    // console.log(topicName,imageUrl)
    const response = await fetch(`${host}/api/topic/addTopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ topicName, imageUrl }),
    });

    const note = await response.json();

    setTopic(topic.concat(note));

  }


  const deleteTopic = async (id) => {

    const response = await fetch(`${host}/api/topic/deleteTopic/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
        // "auth-token":window.localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)
    // setNotes(json)

    // delete function from client side
    const final = topic.filter((note) => { return note._id !== id })
    setTopic(final)
  }

  const dragTopics = async (startId,endId) => {
    console.log(startId,endId)
    const response = await fetch(`${host}/api/topic/dragTopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ startId,endId}),
    });
    const note = await response.json();
    console.log(note)
    setTopic(topic.concat(note));
  }

  const editTopic = async (id, topicName, imageUrl) => {
    console.log(id, topicName, imageUrl)
    const response = await fetch(`${host}/api/topic/updateTopic/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ topicName, imageUrl }),
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(topic));

    //logic for client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].topic = topicName;
        newNotes[index].imageUrl = imageUrl;
        break;
      }
    }
    setTopic(newNotes)

  }

  //get Content
  const getContent = async () => {
    // console.log("yellow")
    const response = await fetch(`${host}/api/content/getContent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": window.localStorage.getItem('token')
      },
    });
    const json1 = await response.json();  
    setContent1(json1)
  }

  //add a content
  const addContent = async (user,topicC, topicContent,inputType) => {
    // console.log(user,topicC, topicContent,inputType)
    const response = await fetch(`${host}/api/content/addContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ user,topicC ,topicContent,inputType}),
    });

    const note = await response.json();
    setContent1(content1.concat(note));

  }
  const addContentOfText = async (user,topicC, topicContent,inputType,isClickable) => {
    // console.log(user,topicC, topicContent,inputType)
    const response = await fetch(`${host}/api/content/addContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ user,topicC ,topicContent,inputType,isClickable}),
    });

    const note = await response.json();
    setContent1(content1.concat(note));

  }

  const editContent = async (startId,endId) => {
    console.log(startId,endId)
    const response = await fetch(`${host}/api/content/updateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ startId,endId}),
    });
    const note = await response.json();
    console.log(note)
    setContent1(content1.concat(note));
  }

  //subcontent-2
  //get subContent
  const getSubContent = async () => {
    const response = await fetch(`${host}/api/subContent/getContent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": window.localStorage.getItem('token')
      },
    });
    const json1 = await response.json();
    setSubContent1(json1)
  }

  //add a subContent
  const addSubContent = async (user,topicC, topicContent,inputType) => {
    console.log(user,topicC, topicContent,inputType)
    const response = await fetch(`${host}/api/subContent/addContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ user,topicC ,topicContent ,inputType}),
    });

    const note = await response.json();
    setSubContent1(subContent1.concat(note));

  }
  const addContentOfText1 = async (user,topicC, topicContent,inputType,isClickable) => {
    // console.log(user,topicC, topicContent,inputType)
    const response = await fetch(`${host}/api/subContent/addContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ user,topicC ,topicContent,inputType,isClickable}),
    });

    const note = await response.json();
    setSubContent1(subContent1.concat(note))

  }
  const editSubContent = async (startId,endId) => {
    console.log(startId,endId)
    const response = await fetch(`${host}/api/subContent/updateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ startId,endId}),
    });
    const note = await response.json();
    // console.log(note)
    setSubContent1(subContent1.concat(note));
  }


  //subcontent-3

  //get subContent
  const getSubContent1 = async () => {
    const response = await fetch(`${host}/api/subContent1/getContent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": window.localStorage.getItem('token')
      },
    });
    const json1 = await response.json();
    setSubContent2(json1)
    console.log(subContent2)
  }

  //add a subContent
  const addSubContent1= async (user,topicC, topicContent,inputType) => {
    console.log(user,topicC, topicContent,inputType)
    const response = await fetch(`${host}/api/subContent1/addContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ user,topicC ,topicContent ,inputType}),
    });

    const note = await response.json();
    setSubContent2(subContent2.concat(note));

  }

  const addContentOfText2 = async (user,topicC, topicContent,inputType,isClickable) => {
    // console.log(user,topicC, topicContent,inputType)
    const response = await fetch(`${host}/api/subContent1/addContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ user,topicC ,topicContent,inputType,isClickable}),
    });

    const note = await response.json();
    setSubContent2(subContent2.concat(note));
  }
  const editSubContent1 = async (startId,endId) => {
    console.log(startId,endId)
    const response = await fetch(`${host}/api/subContent1/updateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ startId,endId}),
    });
    const note = await response.json();
    // console.log(note)
    setSubContent2(subContent2.concat(note));
  }


  //subcontent-4

  //get subContent
  const getSubContent2 = async () => {
    const response = await fetch(`${host}/api/subContent2/getContent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": window.localStorage.getItem('token')
      },
    });
    const json1 = await response.json();
    setSubContent3(json1)
    // console.log(subContent3)
  }

  //add a subContent
  const addSubContent2= async (user,topicC, topicContent,inputType) => {
    console.log(user,topicC, topicContent,inputType)
    const response = await fetch(`${host}/api/subContent2/addContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ user,topicC ,topicContent ,inputType}),
    });

    const note = await response.json();
    setSubContent3(subContent3.concat(note));

  }
  const addContentOfText3 = async (user,topicC, topicContent,inputType,isClickable) => {
    // console.log(user,topicC, topicContent,inputType)
    const response = await fetch(`${host}/api/subContent2/addContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ user,topicC ,topicContent,inputType,isClickable}),
    });

    const note = await response.json();
    setSubContent3(subContent3.concat(note));
  }
  const editSubContent2 = async (startId,endId) => {
    console.log(startId,endId)
    const response = await fetch(`${host}/api/subContent2/updateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ startId,endId}),
    });
    const note = await response.json();
    // console.log(note)
    setSubContent3(subContent3.concat(note));
  }

  //subcontent-5

  //get subContent
  const getSubContent3 = async () => {
    const response = await fetch(`${host}/api/subContent3/getContent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": window.localStorage.getItem('token')
      },
    });
    const json1 = await response.json();
    setSubContent4(json1)
    // console.log(subContent4)
  }

  //add a subContent
  const addSubContent3= async (user,topicC, topicContent,inputType) => {
    console.log(user,topicC, topicContent,inputType)
    const response = await fetch(`${host}/api/subContent3/addContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ user,topicC ,topicContent ,inputType}),
    });

    const note = await response.json();
    setSubContent4(subContent4.concat(note));

  }
  const addContentOfText4 = async (user,topicC, topicContent,inputType,isClickable) => {
    // console.log(user,topicC, topicContent,inputType)
    const response = await fetch(`${host}/api/subContent3/addContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ user,topicC ,topicContent,inputType,isClickable}),
    });

    const note = await response.json();
    setSubContent4(subContent4.concat(note));
  }
  const editSubContent3 = async (startId,endId) => {
    console.log(startId,endId)
    const response = await fetch(`${host}/api/subContent3/updateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":window.localStorage.getItem('token')
      },
      body: JSON.stringify({ startId,endId}),
    });
    const note = await response.json();
    // console.log(note)
    setSubContent4(subContent4.concat(note));
  }


  const [topic, setTopic] = useState(s)
  const [content1, setContent1] = useState(t)
  const [subContent1, setSubContent1] = useState(j)
  const [subContent2, setSubContent2] = useState(k)
  const [subContent3, setSubContent3] = useState(m)
  const [subContent4, setSubContent4] = useState(l)

  return (
    <div>
      <NoteContext.Provider value={{topic,getTopic,changePosition,dragTopics,addTopic,deleteTopic,editTopic,content1,addContent,addContentOfText,getContent,editContent,subContent1,addSubContent,getSubContent,editSubContent ,subContent2,addSubContent1,getSubContent1,editSubContent1,subContent3,addSubContent2,getSubContent2,editSubContent2,subContent4,addSubContent3,getSubContent3,editSubContent3,addContentOfText1,addContentOfText2,addContentOfText3,addContentOfText4}}>
        {props.children}
      </NoteContext.Provider>
    </div>
  )
}

export default NoteState
