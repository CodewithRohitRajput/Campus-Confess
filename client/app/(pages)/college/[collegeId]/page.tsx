'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
interface Confession{
    _id : string,
    collegeId : string,
    title : string,
    description : string,
    type : string,
    upvotes : number,
    reports : number,
}
export default function collegeId () {
    const[confession , setConfession] = useState<Confession[]>([]);
    const[collegeName , setCollegeName] = useState<string>("")
    const params = useParams();
    const collegeId = params.collegeId as string;
    const router = useRouter();


    useEffect(()=>{
        const getConfessions = async() => {
            const res = await fetch(`http://localhost:8000/confession/${collegeId}/get` , {method : "GET" , credentials : "include"});
            const data = await res.json();
            setConfession(data.allConfessions);
        }

        const getCollegeName = async () => {
            const res = await fetch(`http://localhost:8000/college/getname/${collegeId}` , {method : "GET"})
            const data = await res.json();
            setCollegeName(data);
        }
        getCollegeName();
        getConfessions();

    } , []);

    const handleClick = async () =>{
        router.push(`/college/${collegeId}/post`)
    }

    return(
        <div>
            {collegeName}
            <div onClick={()=>handleClick()} >Post</div>

            <div>
                {confession.map((c,i)=>(
                    <div key={i} >
                        <h3>{c.title}</h3>
                        <p>{c.description}</p>
                          <span>Type: {c.type} | Upvotes: {c.upvotes} | Reports: {c.reports}</span>

                    </div>
                ))}
            </div>


        </div>
    )


}