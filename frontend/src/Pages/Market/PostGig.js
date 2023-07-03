import React, { useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function CreateGig() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [selectedOption, setSelectedOption] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    async function createNewGig(ev){

        const data =  new FormData();
        data.set('title',title);
        data.set('tag',selectedOption);
        data.set('price',price);
        data.set('description',description);
        data.set('file',files[0]);

        ev.preventDefault();

        const response = await fetch('http://localhost:4000/market/market/postgig',{
            method:'POST',
            body:data,
            credentials:'include', // have to send cookie
        });

        if (response.status === 200){
            setRedirect(true);
        }

        if (redirect) {
            navigate('/');
        }
    }


  return (
    
    <form onSubmit={createNewGig}>
        <br/>
        <label>Enter Title</label>
        <input type='title' placeholder={'Title'} value={title} onChange={ev => setTitle(ev.target.value)}/>
        <br/>
        <label>Select Tag:</label>
        <select id="tags" value={selectedOption} onChange={handleOptionChange}>
            <option value="">Select an option</option>
            <option value="1">web devalopment</option>
            <option value="2">mobile app development</option>
            <option value="3">AI development</option>
        </select>
        <br/>
        <label>Upload Cover</label>
        <input name="file" id="file" type='file' onChange={ev => setFiles(ev.target.files)}/>
        <br/>
        <label>Enter Price($USD)</label>
        <input name="price" id="price" type='number' value={price} onChange={ev => setPrice(ev.target.value)}/>
        <br/>
        <label></label>
        <textarea name="description" id="description" cols="30" rows="10" value={description}  onChange={ev => setDescription(ev.target.value)}></textarea>
        <button>Post</button>
    </form>
  )
}
