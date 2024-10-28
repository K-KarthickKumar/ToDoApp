import React, { useState,useRef,useEffect } from 'react';
import axios from 'axios';


function TestCss() {

    const[query,setQuery] = useState();
    const[response,setResponse] = useState('');

    const textareaRef = useRef(null);
    // const generateResponse = async () => {
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

    // async function generateResponse(){
    //     setResponse("");
    //     let jsonData = {
    //         "input": query,
    //         "langmodel": "meta-llama/llama-3-8b-instruct",
    //         "project_id": "03a069ee-5f0e-478e-a217-2d874bbfb7d7",
    //         "llm_params": {
    //           "decoding_method": "greedy",
    //           "max_new_tokens": 1000,
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

    //       const ws = new WebSocket('http://localhost:8000/generate/stream');

    //         ws.onopen = () => {
    //         ws.send(jsonData);
    //         };

    //         ws.onmessage = (event) => {
    //         // setConversations((prev) => [...prev, { query, response: event.data }]);
    //         setResponse((prev) => {
    //             debugger;
    //             prev += event.data + ' '
    //             // Find the latest conversation and append the streaming response
    //             // const updatedConvo = [...prev];
    //             // const latestIndex = updatedConvo.length - 1;
    //             // updatedConvo[latestIndex].response += event.data + ' ';
    //             // return updatedConvo;
    //           });
    //         };
            
    //         ws.onerror = () => ws.close();

    //       const eventSource = new EventSource('http://localhost:8000/generate/stream',jsonData,config); // Assuming server endpoint

    // eventSource.onmessage = (event) => {
    //   setResponse((prev) => {

    //     prev += event.data + ' '
    //     // Find the latest conversation and append the streaming response
    //     // const updatedConvo = [...prev];
    //     // const latestIndex = updatedConvo.length - 1;
    //     // updatedConvo[latestIndex].response += event.data + ' ';
    //     // return updatedConvo;
    //   });
    // };

        //   await axios.post('http://localhost:8000/generate/stream',jsonData,config).then((res) => {setResponse(res.data)}).catch((err) => console.error(err));
    // }
    
    const generateResponse = () => {
      setResponse("");  // Clear previous response
    
      // Create a WebSocket connection to your server (replace the URL with your actual WebSocket server)
      const ws = new WebSocket('ws://localhost:5000/stream');
    
      // Define WebSocket event handlers
    
      // When WebSocket connection is opened, send the initial data
      ws.onopen = () => {
        let jsonData = {
          "prompt": query,
        };
        ws.send(JSON.stringify(jsonData));  // Send the initial request data when the connection opens
      };
    
      // When messages are received from the WebSocket server, stream and update the state
      ws.onmessage = (event) => {
        const data = event.data;
        // scrollRef.current?.scrollIntoView();
        setResponse((prev) => prev + data);  // Accumulate the streaming text data
        
        // textareaRef.current.scrollTo(0,textareaRef.current.scrollHeight);
      };
    
      // Handle WebSocket errors
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    
      // Handle WebSocket close event
      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };
    };

    const scrollRef = useRef(null);

    
    

    // useEffect(() => {
    //   if (textareaRef.current) {
    //     textareaRef.current.style.height = "auto";  // Reset height
    //     textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;  // Set height based on content
    //   }
    // }, [response]);
  return (
    <div className='bg-gray-700  dark:bg-black dark:text-white w-[100vw] min-h-[100vh] flex flex-col text-white justify-center items-center' >
        {/* <div className=' w-96 h-[400px] flex flex-col justify-center items-center bg-red-500 m-1 rounded-full border-2 '>
            <h1 className='text-[100px] max-lg:text-[70px] max-md:text-[50px] font-black  bg-repeat bg-clip-text text-transparent bg-cover bg-[url("https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1713225600&semt=sph")]'>WELCOME</h1>
            <div >
            <form>
                <div className='border-2 p-3 rounded-3xl w-auto'>
                    <label className='text-white font-bold underline'>Username:</label>
                    <input type='text' className='text-white bg-transparent border-2 p-1 ml-2 outline-none' required></input>
                </div>
                <div className='border-2 p-3 rounded-3xl mt-3'>
                <label className='text-white font-bold underline'>Password:</label>
                    <input type='text' className='text-white bg-transparent border-2 p-1 ml-2 outline-none' required></input>
                </div>
            </form>
            </div>
        
        </div> */}

        <div>
            <label>User Query:</label>
            <input type='text' className='bg-black text-white' value={query} onChange={e => setQuery(e.target.value)}></input>

        </div>
        <div>
            <button className='bg-white text-black' onClick={()=>generateResponse()}>Submit</button>
        </div>

        <div className='p-3'>
          <textarea id="text-area" ref={textareaRef} rows={10}  value={response} cols={100} style={{
            // Full width of container
        overflow: "hidden",  // Hide the scrollbar
        resize: "none",  // Prevent manual resizing
        border: "1px solid #ccc",  // Optional: Add border styling
        padding: "10px",  // Optional: Add padding for better appearance
        fontSize: "16px",  // Optional: Font styling
        lineHeight: "1.5",  // Optional: Line height for readability
        color:"black"
      }}></textarea>
      </div>

      <div ref={scrollRef}></div>
        
    </div>
  )
}

export default TestCss