import React,{useState,useEffect,useRef} from 'react';
import './Chatbot.css';
import { FaArrowCircleUp } from "react-icons/fa";
import StuLogo from './stu.png';
import axios from 'axios';

function Chatbot() {

    const [chatMessages,setChatMessages] = useState([{user:"Hi",response : "Hi.. How can I help you"}]);
    const textareaRefs = useRef([]);
    const[query,setQuery] = useState('');

    const handleTextareaResize = () => {
      // Loop through each ref and resize the corresponding textarea
      textareaRefs.current.forEach(textarea => {
        if (textarea) {
          textarea.style.height = "auto";  // Reset height
          textarea.style.height = `${textarea.scrollHeight}px`;  // Set height based on content
        }
      });
    };

    const[response,setResponse] = useState('')
    useEffect(() => {
      handleTextareaResize();
    }, [chatMessages]);

    const[isInitialResponse,setIsInitialResponse] = useState(true);

    const generateResponse = async () => {
        setResponse(''); // Clear response initially

        setChatMessages((prevMessages) => [
            ...prevMessages,
            { user: query,response : ''}, // Append the new query and response
          ]);
          const user_query = query;
        
        const jsonData = JSON.stringify({
          "input": query,
          "user_id": "Greekfan",
          "language": "Tamil",
          "bot_details":{
              "discovery_project_id": "902d8b72-bbba-4ebd-aff5-d57e510ba2b4",
              "discovery_collection_id": "9304a6de-75dc-bc3f-0000-0191e5af4ded",
              "discovery_resultnum": 5,
              "client_id": "",
              "system_prompt": "You are Persephone, wife of Hades and daughter of Demeter and Zeus.",
              "langmodel": "meta-llama/llama-3-1-70b-instruct"
          },
          "convo_id":"",
          "stream":true
      });
      let fullResponse = '';
      // const ws = new WebSocket('ws://stu.globalknowledgetech.com:8000/generate/response/stream');
      const ws = new WebSocket('ws://localhost:8080/gkt/ws');
      setQuery("");
      
      // Define WebSocket event handlers
    
      // When WebSocket connection is opened, send the initial data
      ws.onopen = () => {
        console.log("Web Socket Connection established");
        axios.post(`http://localhost:8080/stu/tokStream`,jsonData,{headers:{
          "Content-Type":"application/json"
        }})
        // ws.send(JSON.stringify(jsonData));  // Send the initial request data when the connection opens
      };
    
      // When messages are received from the WebSocket server, stream and update the state
      ws.onmessage = (event) => {
        const data = event.data;
        // scrollRef.current?.scrollIntoView();
        fullResponse += data;
        setResponse((prev) => prev + data); // Update response in real-time
          
        // Update the last message's response without creating a new entry
        setChatMessages((prevMessages) => {
          const updatedMessages = [...prevMessages]; // Create a shallow copy of previous messages
          const lastMessage = updatedMessages[updatedMessages.length - 1]; // Access the last message
          updatedMessages[updatedMessages.length - 1] = {
            ...lastMessage,
            response: fullResponse, // Update the response of the last message
          };
          return updatedMessages;
        });


        if (event.data === 'END_STREAM') {
          ws.close();            // Close the WebSocket
          debugger;
          console.log("Connection Closed successfully");
        }


      };


    


      // Handle WebSocket close event
      ws.onclose = () => {
        debugger;
        ws.close();
        // if(isInitialResponse){
        //     const data = {
        //       user: user_query,
        //       stu : fullResponse
        //     }
        //     console.log("WebSocket connection closed");
        //     axios.post(`http://stu.globalknowledgetech.com:8000/generate/title`,data,{headers:{
        //           'Content-Type': 'application/json',
        //         }}).then((res)=>{
        //           console.log(res.data);
        //           setIsInitialResponse(false);
        //         })
        //         .catch(err => {
        //           console.log(err);
        //         })

        //         console.log(chatMessages);
        //   };
    }


    
      // Handle WebSocket errors
      ws.onerror = (error) => {
        ws.close();
        setChatMessages((prevMessages) => {
          const updatedMessages = [...prevMessages]; // Create a shallow copy of previous messages
          const lastMessage = updatedMessages[updatedMessages.length - 1]; // Access the last message
          updatedMessages[updatedMessages.length - 1] = {
            ...lastMessage,
            response: "Stu is busy right now. Please try again Later!", // Update the response of the last message
          };
          return updatedMessages;
        });
      };

  
    
      
    
        // const responseStream = new WebSocket('http://stu.globalknowledgetech.com:8000/generate/response/stream', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(jsonData),
        // });
    
        // const reader = responseStream.body.getReader();
        // let decoder = new TextDecoder();
        // let fullResponse = '';
    
        // // Stream responses
        // while (true) {
        //     const { done, value } = await reader.read();
        //     if (done) break;
          
        //     const data = decoder.decode(value);
        //     fullResponse += data;
            
        //     setResponse((prev) => prev + data); // Update response in real-time
          
        //     // Update the last message's response without creating a new entry
        //     setChatMessages((prevMessages) => {
        //       const updatedMessages = [...prevMessages]; // Create a shallow copy of previous messages
        //       const lastMessage = updatedMessages[updatedMessages.length - 1]; // Access the last message
        //       updatedMessages[updatedMessages.length - 1] = {
        //         ...lastMessage,
        //         response: fullResponse, // Update the response of the last message
        //       };
        //       return updatedMessages;
        //     });
        //   }
    
        // After receiving the full response, update the chatMessages

          


      };




  return (
    <div className='container'>
        <div className='text-container mb-5 mt-5' style={{minHeight:"90vh"}}>
            <div className='text-messages'>
                {chatMessages.map((chat,index) => 
                <div className='p-2' key={index}>
                    <article className='mb-3 py-2\.5 px-3' style={{display:"flex",justifyContent:"end",background:"#e3e3e3",borderRadius:"25px",maxWidth:"70%",width:"fit-content",marginLeft:"auto",position:"relative"}}>
                        <div style={{whiteSpace:"pre-wrap"}}>
                            {chat.user}
                        </div>
                    </article>

                    <article className='mb-3'>
                    <div style={{display:"flex",justifyContent:"center"}}>
                      <div><img className='mt-3' src={StuLogo} loading='lazy' style={{width:"2rem"}}></img></div>
                      <div>
                    <textarea 
                    ref={(el) => (textareaRefs.current[index] = el)} // Store each textarea ref
                     value={chat.response} readOnly cols={100} style={{
                            // Full width of container
                        overflow: "hidden",  // Hide the scrollbar
                        resize: "none",  // Prevent manual resizing
                        // border: "1px solid #ccc",  // Optional: Add border styling
                        padding: "10px",  // Optional: Add padding for better appearance
                        fontSize: "16px",  // Optional: Font styling
                        lineHeight: "1.5",  // Optional: Line height for readability
                        color:"black",
                        width:"100%"
                    }}
                    ></textarea>
                    </div>
                    </div>
                    </article>
                </div>
                )}
                
            </div>
        </div>
        <div className='input-query-container'>
            <input type='text' placeholder='Message Stu' value={query} onChange={e => setQuery(e.target.value)}></input>
            <FaArrowCircleUp onClick={()=> generateResponse()} style={{cursor:"pointer",fontSize:"2rem",color:query.length>0 ? "black" : "white"}} />
        </div>
        
    </div>
  )
}

export default Chatbot



    //   const generateResponse = async () => {
    //     setResponse("");
    //     let jsonData = {
    //         "input": query,
    //         "langmodel": "meta-llama/llama-3-8b-instruct",
    //         "project_id": "03a069ee-5f0e-478e-a217-2d874bbfb7d7",
    //         "llm_params": {
    //           "decoding_method": "greedy",
    //           "max_new_tokens": 500,
    //           "repetition_penalty": 1,
    //           "temperature": 0.5,
    //           "stop_sequences": [
    //             "<|start_header_id|>user<|end_header_id|>",
    //             "user:"
    //           ],
    //           "top_p": 0.95,
    //           "top_k": 50
    //         }
    //       }
    //     const response = await fetch('http://stu.globalknowledgetech.com:8001/generate/stream', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(jsonData),
    //     });
    
    //     const reader = response.body.getReader();
    //     let decoder = new TextDecoder();
    
    //     // Stream responses
    //     while (true) {
    //       const { done, value } = await reader.read();
    //       if (done) break;
    
    //       const data = decoder.decode(value);
    //       setResponse((prev) => prev + data);
    //     };
    //     }
