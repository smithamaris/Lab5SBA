// an array of post objects
let posts = [];


// Select all necessary DOM elements
const form = document.querySelector('post-form');
const postTitle = document.getElementById('title');
const postContent = document.getElementById('text');

const titleError = document.getElementById('title-error');
const contentError = document.getElementById('content-error');
const postList = document.getElementById('post-list');

// Load Posts from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
    posts = JSON.parse(savedPosts);
    renderPosts();
  }
});

//Create a function that takes the array of posts and dynamically creates the HTML to display them.
function savedPosts() {
  localStorage.setItem('posts', JSON.stringify(posts));
}




