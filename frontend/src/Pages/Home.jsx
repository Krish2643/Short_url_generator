import React, { useState } from 'react'
import './Home.css'
import {useNavigate} from 'react-router-dom'

const Home = () => {

   const navigate = useNavigate();
   const [short_url, setShort_url] =useState(null);
   const [Org_url, setOrg_url] = useState("");
   const [IPv6, setIPv6] = useState("");
   const [redir_url, setRedir_url] = useState("");

   const handleGenerateUrl = (e)=>{
       e.preventDefault();
        if(!Org_url) return alert("URL is require");
      
        let match1 = "https://";
        if(!Org_url.includes(match1)){
         return alert('To generate Short URL, URL Should be in "https://example.com" format ');
        }

       fetch(`http://localhost:8000/`, {
        method: "POST",
        body: JSON.stringify({
            url: Org_url,
        }),
        headers: {
           "Content-type": "application/json; charset=UTF-8"
        }
       }).then(res => res.json()).then(data=> setShort_url(`${data.id}`));

   }

   const handleCopyUrl = ()=>{
        alert("URL has been Copied");
        navigator.clipboard.writeText(`https://srt-url.onrender.com/${short_url}`);
   }

   const handleFindIP = (e)=>{
     e.preventDefault();
     if(!Org_url) return alert("URL is require to find IP Address");
    
     let match2 = "www.";
     if(!Org_url.includes(match2)){
      return alert('To find IP address, URL should be in "www.example.com" format ');
     }

     fetch(`http://localhost:8000/url/${Org_url}`).then(res => res.json()).then(data=> setIPv6(data.ipAddress)).catch(err=> console.log("this is error",err));
   }

  return (
    <div className="cards">
    <div id="card">
    <h2>Generate Short URL</h2>
    <input type="text" value={Org_url} onChange={e => setOrg_url(e.target.value)} className='url_input' placeholder='https://example.com' />
    <h3 className='url_output' onClick={handleCopyUrl} >Short URL: {short_url}</h3>
    <h3 className='url_output'>IPv6: {IPv6}</h3>
    <button id="addfrn" onClick={handleFindIP} >Find IP</button>
    <button id="addfrn" onClick={handleGenerateUrl} >Generate URL</button>
    </div>
    </div>

  )
}

export default Home