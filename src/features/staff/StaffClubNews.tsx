import React, { useState } from 'react';
import './staffclubnews.css'
import { endpoints } from '../../API/apiendpoints';

const StaffClubNews: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        const response = await fetch(endpoints.ADD_NEWS_ENDPOINT, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('News item added successfully');
            setTitle('');
            setContent('');
            setImage(null);
        } else {
            alert('Error adding news item');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Image:</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setImage(e.target.files?.[0] || null)} 
                />
            </div>
            <button className='addNews' type="submit">Add News</button>
        </form>
    );
};

export default StaffClubNews;
