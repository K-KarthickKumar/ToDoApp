import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { MdInfoOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
// import { ItemTypes } from './ItemTypes';
import './home.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Home() {


    const iniLists = [
        { id: 1, val: "1",desc:"Lorem Ipsum" },
        { id: 2, val: "2" },
        { id: 3, val: "3" },
        { id: 4, val: "4" },
        { id: 5, val: "5" }
    ];
    const [selectedList, setSelectedLists] = useState([]);
    const[description,setDescription] = useState("");

    function isJsonInList(jsonList, jsonObject) {
        // Convert the JSON objects to strings for comparison
        const jsonStringToCheck = JSON.stringify(jsonObject);
        return jsonList.some(item => JSON.stringify(item) === jsonStringToCheck);
    }


    function leftDragStart(item) {
        let rightBox = document.getElementById("right");
        rightBox.addEventListener("dragover", function (e) {
            e.preventDefault();
        });
        rightBox.addEventListener("drop", function (e) {
            e.preventDefault();
            console.log(isJsonInList(iniLists, item));
            !(isJsonInList(selectedList, item)) && setSelectedLists([...selectedList, item]);

        });

    }


    const deleteModule = (item) => {
        const filteredVal = selectedList.filter(val => val.id !== item.id);
        setSelectedLists(filteredVal);
    }

    function rightDragStart(item) {
        let leftBox = document.getElementById("left");
        leftBox.addEventListener("dragover", function (e) {
            e.preventDefault();
        });
        leftBox.addEventListener("drop", function (e) {
            const filteredVal = selectedList.filter(val => val.id !== item.id);
            setSelectedLists(filteredVal);
        });

    }

    const [show, setShow] = useState(false);
    return (
        <div className='container'>
            <div id='left'>
                {iniLists.map((item, index) =>
                    <div style={{ display: "flex", alignItems: "center" }}> 
                    <div className='list' id={index} draggable="true" onDragStart={e => leftDragStart(item)}>{item.val}</div> 
                    <MdInfoOutline style={{ color: "black", width: "10%", cursor: "pointer", fontSize: "30px" }} onClick={e => {setShow(true);setDescription(item?.desc)}}/> 
                    </div>
                )}
            </div>
    
            <div id='right'>
                {selectedList.map((item, index) =>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div className='list' id={index} draggable="true" onDragStart={e => rightDragStart(item)}>{item.val}</div>
                        <div style={{ display: "flex", flexDirection: "column", color: "black", gap: "10px" }}>
                            <MdInfoOutline style={{ cursor: "pointer", fontSize: "20px"  }} onClick={e => {setShow(true);setDescription(item?.desc)}} />
                            <MdDelete style={{ cursor: "pointer", fontSize: "20px" }} onClick={e => {deleteModule(item)}} />
                        </div>
                    </div>
                )}
            </div>
            
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    Description
                </Modal.Header>
                <Modal.Body> 
                        {description}
                     </Modal.Body>

            </Modal>
            
        </div>
    );
}

