const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    const postsWithImages = await Promise.all(
      posts.map(async post => {
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`,
          );
          const images = response.data.map(photo => ({ url: photo.url }));
          return {
            ...post,
            images: images,
          };
        } catch (error) {
          console.error(`Error fetching images for post ${post.id}:`, error);
          return {
            ...post,
            images: [], // Default to empty array if there's an error
          };
        }
      }),
    );

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

module.exports = router;
