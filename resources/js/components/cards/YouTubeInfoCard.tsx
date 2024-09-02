import React, { useEffect, useState } from 'react';
interface IProps {
    thumbnail: string;
    title: string;
    viewCount: string;
    likeCount: string;
    duration: string;
  }
  
  const YouTubeInfoCard = ({
    thumbnail,
    title,
    viewCount,
    likeCount,
    duration,
  }: IProps) => {
  
    return (
        <div className="youtube-info-card">
            <img src={thumbnail} alt={title} className="thumbnail" />
            <h3 className="title text-primary font-bold text-lg">{title}</h3>
            <div className="stats">
                <span className='text-black font-bold text-lg'>Views: {viewCount}</span>
                <span className='text-black font-bold text-lg'>Likes: {likeCount}</span>
                <span className='text-black font-bold text-lg'>Duration: {duration}</span>
            </div>
        </div>
    );
}

export default YouTubeInfoCard;
