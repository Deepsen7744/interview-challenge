import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);

  // console.log(posts);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  console.log(posts);

  const { isSmallerDevice } = useWindowWidth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('/api/v1/posts', {
          params: { start: 0, limit: isSmallerDevice ? 100 : 100 },
        });

        setTotalPosts(data.length);
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prevCount => prevCount + 10);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.slice(0, visibleCount).map(post => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>

      {visibleCount < totalPosts && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
