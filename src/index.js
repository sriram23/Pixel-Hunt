import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
    const [query, setQuery] = useState('')
    const [data, setData] = useState([])
    const searchImage = async () => {
        const res = await fetch(process.env.URL+'search/photos/'+'?query='+query+'&client_id='+process.env.ACCESS_KEY)
        const data = await res.json()
        console.log('Data: ', data)
        setData(data.results)
    }
    return (<div>
        <h1 className='m-2 text-2xl text-bold'>Pixel Hunt</h1>
        <div>
            <input className='m-2 p-2 border' onChange={(e) => setQuery(e.target.value)} type="text" placeholder='Search for images'/>
            <button className='m-2 p-2 border' onClick={searchImage}>Search</button>
        </div>
        <div className='flex flex-wrap'>
            {data.map((image) => <div className='m-2'><img key={image.id} src={image.urls.small} /></div>)}
        </div>
    </div>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)