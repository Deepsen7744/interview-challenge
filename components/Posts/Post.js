import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useUserData from '../UserList/useUserData';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollSnapType: 'x mandatory',
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'center',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  zIndex: 1,
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const UserInfo = styled.div(() => ({
  padding: '10px',
  backgroundColor: '#f9f9f9',
  borderBottom: '1px solid #ccc',
  gap: '15px',
  display: 'flex',
  alignItems: 'center',
  '& > p': {
    margin: '0 0 0 10px',
  },
}));
const Userin = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const InitialsImage = styled.img(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#ccc',
}));

const Post = ({ post }) => {
  const { users } = useUserData();
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0].offsetWidth;
      carouselRef.current.scrollBy({
        left: itemWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0].offsetWidth;
      carouselRef.current.scrollBy({
        left: -itemWidth,
        behavior: 'smooth',
      });
    }
  };

  const user = users.find(user => user.id === post.userId);

  const getInitials = name => {
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0][0];
    const lastNameInitial = nameParts[nameParts.length - 1][0];
    return `${firstNameInitial}${lastNameInitial}`;
  };

  const generateInitialsImage = initials => {
    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 40;
    const context = canvas.getContext('2d');
    context.fillStyle = '#ccc';
    context.fillRect(0, 0, 40, 40);
    context.fillStyle = '#000';
    context.font = '20px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(initials, 20, 20);
    return canvas.toDataURL();
  };

  const [initialsImage, setInitialsImage] = useState('');

  useEffect(() => {
    if (user) {
      const initials = getInitials(user.name);
      const imageUrl = generateInitialsImage(initials);
      setInitialsImage(imageUrl);
    }
  }, [user]);

  return (
    <>
      <PostContainer>
        {user && (
          <UserInfo>
            <InitialsImage src={initialsImage} alt="User Initials" />
            <Userin>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </Userin>
          </UserInfo>
        )}
        <CarouselContainer>
          <Carousel ref={carouselRef}>
            {post.images.map((image, index) => (
              <CarouselItem key={index}>
                <Image src={image.url} alt={post.title} />
              </CarouselItem>
            ))}
          </Carousel>
          <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
          <NextButton onClick={handleNextClick}>&#10095;</NextButton>
        </CarouselContainer>
        <Content>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </Content>
      </PostContainer>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
