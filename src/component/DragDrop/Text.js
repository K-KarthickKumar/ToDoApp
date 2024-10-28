import React from "react";
import { useDrag } from "react-dnd";

function Text({id,src}){
    const[{isDragging},drag] = useDrag(() => ({
        type:"image",
        item : {id : id},
        collect : (monitor) => ({
            isDragging : !!monitor.isDragging(),
        })

    }))
    return(
        <div ref={drag} width={100}>{src}</div>
    )
}

export default Text;