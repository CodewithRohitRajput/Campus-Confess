import express from "express"
import type { Request ,Response } from "express"
import confession from "../models/confession.ts"

export const addConfession = async (req : Request , res : Response) => {
    try{
    const collegeId = req.params.collegeId;
    const { title , description , type , upvotes , reports} = req.body;
    const newConfession =  new confession({collegeId, title , description ,type , upvotes , reports});
    await newConfession.save();
   return res.status(200).json({message : "Confession saved"});
    }catch(err){
        console.error(err);
    }
}


export const seeConfession = async (req : Request , res : Response) => {
    const collegeId = req.params.collegeId
    // const {collegeId} = req.body;
    const allConfessions = await confession.find({collegeId}).populate("collegeId");
    return res.status(200).json({allConfessions});

}

