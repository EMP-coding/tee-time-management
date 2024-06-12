import React, { useEffect, useState } from 'react';
import { endpoints } from '../API/apiendpoints';


interface NewsItem {
    id: number;
    title: string;
    content: string;
    image?: string;
}

const ClubNews: React.FC = () => {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);

    useEffect(() => {
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

        fetchNews();
    }, []);

    return (
        <div className="club-news">
            <h3>Club News:</h3>
            {newsData.map((item) => (
                <div key={item.id} className="news-item">
                    <h4>{item.title}</h4>
                    <p>{item.content}</p>
                    {item.image && <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title} style={{ width: '75%' }} />}

                </div>
            ))}
        </div>
    );
};

export default ClubNews;