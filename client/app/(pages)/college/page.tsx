'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"


interface College{
    _id : string,
    collegeName : string;
}

export default function College() {
    const[name , setName] = useState<College[]>([]);
    const router = useRouter();


      useEffect(()=>{
  const getCollege = async () => {
    const res = await fetch('http://localhost:8000/college/get' , {method : "GET" , credentials : "include"});
    const data = await res.json();
    setName(data)
  }

     getCollege();
  }, [])

    const handleClick  = (id : string)=>{
      router.push(`/college/${id}`);
   }

  return(

    <div>
        <div>College names</div>
        {name.map((n)=>(
            <div  key={n._id} onClick={()=> handleClick(n._id)} >{n.collegeName}</div>
        ))}
    </div>

  )
}