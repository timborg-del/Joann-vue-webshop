import React, { useState, useEffect } from 'react';
import './CommentsComponent.css';

interface Comment {
  text: string;
  stars: number;
}

const comments: Comment[] = [
  { text: 'Great product, highly recommend!', stars: 5 },
  { text: 'Good quality, fast shipping.', stars: 4 },
  { text: 'Excellent customer service.', stars: 5 },
  { text: 'Item as described, very satisfied.', stars: 4 },
  { text: 'Very nice thank you for your service. My home is now complited, but okay.', stars: 5 },
];

const getRandomComments = (): Comment[] => {
  const indices = new Set<number>();
  while (indices.size < 2) {
    indices.add(Math.floor(Math.random() * comments.length));
  }
  return Array.from(indices).map(index => comments[index]);
};

const CommentsComponent: React.FC = () => {
  const [currentComments, setCurrentComments] = useState<Comment[]>(getRandomComments());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentComments(getRandomComments());
    }, 12000); // 6 seconds for transition, 6 seconds for display
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="comments-container">
      {currentComments.map((comment, index) => (
        <div key={index} className={`comment comment-${index + 1}`}>
          <p>{comment.text}</p>
          <div className="stars">
            {'★'.repeat(comment.stars)}
            {'☆'.repeat(5 - comment.stars)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsComponent;



