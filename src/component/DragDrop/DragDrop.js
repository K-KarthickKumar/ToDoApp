import React, { useState } from "react";
import Text from './Text';
import { useDrop } from "react-dnd";

const textList = [
    {id :1, src : "https://thumbs.dreamstime.com/z/random-click-squirrel-wire-random-picture-cute-squirrel-219506797.jpg"},
    {id :2, src : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRyPsC-WOTRffoXvCe-VYnG_97c8b7qavsTA&usqp=CAU"},
    {id :3, src : "https://media.istockphoto.com/id/1659043943/photo/random.jpg?b=1&s=170667a&w=0&k=20&c=sHxac3c49wSatJgnMK4-ZRWaW80YuJ15eCa49K2SHIM="},
    {id :4, src : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVJU7KGu2hCo3ZufuBXyYZubDzw8rapaTPIg&usqp=CAU"},
    {id :5, src : "https://imgv3.fotor.com/images/side/3D-pink-hair-girl-image-with-generate-box.jpg"}

]

function DragDrop(){

    const [board,setBoard] = useState([]);

    const[{isOver},drop] = useDrop(() => ({
        accept : "image",
        drop : (item) => addTextToBoard(item.id),
        collect : (monitor) => ({
            isOver : !!monitor.isOver()
        })
    }));


    const addTextToBoard = (id) => {
        const pictureList = textList.filter((picture) => id === picture.id);
        setBoard((board) => [...board,pictureList[0]])
    }

    return(
    <>
        <div className="text" style={{display:"flex",gap:"15px",margin:10,justifyContent:"center" }}>
            {textList.map((text) => 
                <Text src={text.src} id={text.id}/>
            )}
        </div>
        <div ref={drop} className="board" style={{width:300,height:"500px",border:"2px solid black",margin:"10px"}}>
            {board.map((text) => 
                <div width={100} >{text.src}</div>
            )}
        </div>
    </>
    )
}

export default DragDrop;