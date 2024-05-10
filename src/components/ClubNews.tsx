import React from 'react';
import clubNewsImage from '../assets/ClubNews.png';

interface NewsItem {
    id: number;
    title: string;
    content: string;
}

const newsData: NewsItem[] = [
    { id: 1, title: "Annual Golf Tournament", content: "Join us for our annual golf tournament this summer! Great prizes to win!" },
    { id: 2, title: "Course Maintenance", content: "Course maintenance scheduled for next week. Some holes may be temporarily closed." }
];

const ClubNews: React.FC = () => {
    return (
        <div className="club-news">
            <h3>Club News:</h3>
            
            {newsData.map((item) => (
                <div key={item.id} className="news-item">
                    <h4>{item.title}</h4>
                    <p>{item.content}</p>
                </div>
            ))}
            <img src={clubNewsImage} alt="Club News" style={{ width: '100%' }} />
        </div>
    );
};

export default ClubNews;
