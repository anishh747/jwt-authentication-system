import { pool } from "../db.js"; 
import expressAsyncHandler from "express-async-handler";

const createRoom = expressAsyncHandler(async(req,res) =>{
    let {room_id, host} = req.body;
    let changed_room_id =  room_id.replace(/-/g, '_');
    const room = await pool.query("INSERT INTO room (room_id, host_email) VALUES($1,$2)",[changed_room_id,host])
    if (room.rowCount === 1) {
        // const createTableQuery = `CREATE TABLE ${changed_room_id} (
        //     table_id SERIAL PRIMARY KEY,
        //     user_email VARCHAR(30),
        //     hasJoined BOOLEAN NOT NULL
        //   )`;
        // const newTableRoom = await pool.query(createTableQuery);
        const selectRoom = await pool.query("SELECT * FROM room WHERE room_id = ($1)",[changed_room_id])

        res.status(200);
        res.json(selectRoom);
    }else{
        res.status(400);
        res.json("Error")
    }
});


//public route
const joinRoom = expressAsyncHandler(async(req,res) =>{
    console.log("HERE")
    const {room_id,email} = req.body;
    let changed_room_id =  room_id.replace(/-/g, '_');
    const checkRoomExists = await pool.query("SELECT * FROM room WHERE room_id = ($1)",[changed_room_id])
    
    if (checkRoomExists.rowCount !== 0) {
        // const roomTableQuery = `SELECT * FROM ${changed_room_id}`;
        // const tableData = await pool.query(roomTableQuery);
        res.json(checkRoomExists)    
    }else{
        res.status(401)
        throw new Error("Room Doesn't Exists")
    }
});


const endRoom = expressAsyncHandler(async(req,res) =>{
    const {room_id, email} = req.body;
    let changed_room_id =  room_id.replace(/-/g, '_');

    // const endRoomQuery = `DROP TABLE ${changed_room_id}`;
    // const endRoom = await pool.query(endRoomQuery);

    const deleteRoomFromRoomTable  = await pool.query("DELETE FROM room WHERE room_id = ($1)",[changed_room_id])
    
    res.status(200).json({message: "Room Ended Successfully"})
});

const inviteRoom = expressAsyncHandler(async(req,res) =>{
    const {email,room_id} = req.body;
    let changed_room_id =  room_id.replace(/-/g, '_');    
    
    const endRoomQuery = `DROP TABLE${changed_room_id}`;

});

export  {createRoom, endRoom, joinRoom, inviteRoom};