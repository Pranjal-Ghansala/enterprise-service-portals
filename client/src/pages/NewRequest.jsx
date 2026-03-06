import {useState} from "react"
import API from "../api/axios"
import Navbar from "../components/Navbar"

export default function NewRequest(){

const [form,setForm] = useState({
title:"",
description:"",
category:"IT",
priority:"Low"
})

const submit = async(e)=>{

e.preventDefault()

await API.post("/requests",form)

alert("Request Created")

}

return(

<div className="bg-gray-100 min-h-screen">

<Navbar/>

<div className="max-w-xl mx-auto bg-white p-8 mt-10 rounded shadow">

<h2 className="text-xl font-bold mb-6">
Create Service Request
</h2>

<form onSubmit={submit} className="space-y-4">

<input
className="border w-full p-2 rounded"
placeholder="Title"
onChange={e=>setForm({...form,title:e.target.value})}
/>

<textarea
className="border w-full p-2 rounded"
placeholder="Description"
onChange={e=>setForm({...form,description:e.target.value})}
/>

<select
className="border w-full p-2 rounded"
onChange={e=>setForm({...form,category:e.target.value})}
>

<option>IT</option>
<option>HR</option>
<option>Finance</option>
<option>Infrastructure</option>

</select>

<select
className="border w-full p-2 rounded"
onChange={e=>setForm({...form,priority:e.target.value})}
>

<option>Low</option>
<option>Medium</option>
<option>High</option>
<option>Critical</option>

</select>

<button className="bg-blue-600 text-white px-4 py-2 rounded w-full">

Submit Request

</button>

</form>

</div>

</div>

)
}