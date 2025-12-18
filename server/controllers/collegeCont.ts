import type { Response , Request } from "express"
import express from "express"
import college from "../models/college.ts"
import dotenv from "dotenv"


export const getColleges = async (req : Request , res : Response ) => {
    try{
    const allColleges = await college.find();
    res.status(200).json(allColleges);
    }catch(err){
        res.status(500).json({message : err})
    }

}

export const getCollegeName = async(req : Request , res : Response) => {
    const collegeId = req.params.id;
    const clgName = await college.findById(collegeId);
    return res.status(200).json(clgName?.collegeName);


}

// admin only
export const addCollege = async (req : Request , res : Response) => {

    try{
        const {collegeName} =  req.body;
        const newCollege = await new college({collegeName});
        await newCollege.save();
        return res.status(200).json({message : "added successfully"});
    }catch(err){
        console.error(err);
    }

 }