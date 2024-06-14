import React, { useState, useEffect } from 'react';
import './staffclubnews.css';
import { endpoints } from '../../API/apiendpoints';

interface NewsItem {
    id: number;
    title: string;
    content: string;
    image?: string;
}

const StaffClubNews: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [editMode, setEditMode] = useState<number | null>(null);

    const baseURL = 'http://localhost:5000/uploads'; 

    const fetchNews = async () => {
        try {
            const response = await fetch(endpoints.VIEW_NEWS);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNewsData(data);
        } catch (error) {
            console.error('There was an error fetching the news!', error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        const endpoint = editMode !== null ? `${endpoints.UPDATE_NEWS_ENDPOINT}/${editMode}` : endpoints.ADD_NEWS_ENDPOINT;
        const method = editMode !== null ? 'PUT' : 'POST';

        const response = await fetch(endpoint, {
            method,
            body: formData,
        });

        if (response.ok) {
            alert(`News item ${editMode !== null ? 'updated' : 'added'} successfully`);
            setTitle('');
            setContent('');
            setImage(null);
            setEditMode(null);
            fetchNews();
        } else {
            alert(`Error ${editMode !== null ? 'updating' : 'adding'} news item`);
        }
    };

    const handleDelete = async (id: number) => {
        const response = await fetch(`${endpoints.DELETE_NEWS_ENDPOINT}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('News item deleted successfully');
            fetchNews();
        } else {
            alert('Error deleting news item');
        }
    };

    const handleEdit = (news: NewsItem) => {
        setTitle(news.title);
        setContent(news.content);
        setEditMode(news.id);
    };

    return (
        <div className='main-contain'>
            <form className='main-form' onSubmit={handleSubmit}>
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
                <button className='addNews' type="submit">{editMode !== null ? 'Update News' : 'Add News'}</button>
            </form>
            <div>
                <h2>Existing News</h2>
                {newsData.length > 0 ? (
                    newsData.map(news => (
                        <div key={news.id} className="news-item">
                            <h3>{news.title}</h3>
                            <p>{news.content}</p>
                            {news.image && <img src={`${baseURL}/${news.image}`} alt={news.title} />}
                            <button onClick={() => handleEdit(news)}>Edit</button>
                            <button onClick={() => handleDelete(news.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No news available</p>
                )}
            </div>
        </div>
    );
};

export default StaffClubNews;