'use client'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface Confession{
    _id : string,
    title : string,
    description : string,
    type : string,
    upvotes : number,
    reports : number,
}

export default function Post(){
    const[name , setName] = useState<string>('')
    const router = useRouter();
    const[confession , setConfession]= useState<Confession>({
        _id : "",
        title : "",
        description : "",
        type : "confession",
        upvotes : 0,
        reports: 0
    });
    const params = useParams();
    const collegeId = params.collegeId;

    useEffect(()=>{
        const getCollegeName = async () => {
            const res = await fetch(`http://localhost:8000/college/getname/${collegeId}`);
            const data = await res.json();
            setName(data);
        }
        getCollegeName();
    },[])

    const handleSubmit = async() =>{
        const res = await fetch(`http://localhost:8000/confession/${collegeId}/post` , {method : "POST" , credentials : "include", 
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(confession)
        })
        if(res.ok){
            router.push(`/college/${collegeId}`);
        }
    } 

    return(
        <div>
            <h1>{name}</h1>
            Post Here
            <div>
                <input type="text" value={confession.title} placeholder="title" onChange={(e)=>{setConfession({...confession , title : e.target.value})}} ></input>
                 <textarea 
                    placeholder="Description"
                    value={confession.description}
                    onChange={(e) => setConfession({...confession, description: e.target.value})}
                />
                <button onClick={handleSubmit}>Post!</button>
            </div>
        </div>

    )

}