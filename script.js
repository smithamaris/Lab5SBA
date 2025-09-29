// an array of post objects
let posts = [];


// Select all necessary DOM elements
const form = document.querySelector('#post-form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');

const titleError = document.getElementById('title-error');
const contentError = document.getElementById('content-error');
const postsList = document.getElementById('posts-list');
const submitBtn = form.querySelector("button[type='submit']");

let editPostId = null;


// Load Posts from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedPosts = localStorage.getItem('posts'); //check and ensure could be posts-list instead
    if (savedPosts) {
    posts = JSON.parse(savedPosts);
    renderPosts();
  }
});

// Save Posts to localStorage
function savedPosts() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Validation
function validateField(input, errorSpan) {
  let message = "";
  if (!input.value.trim()) {
  message = "This field is required.";
} else if (input.value.length > input.maxLength) {
  message = `Maximum ${input.maxLength} characters allowed.`;

  } errorSpan.textContent = message;
  return message === '';
}

// Render your posts
function renderPosts() {
  postsList.innerHTML = '';

  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.dataset.id = post.id;

    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title;

    const postContent = document.createElement('p');
    postContent.textContent = post.content;

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => startEditPost(post.id));

        //Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click',() => deletePost(post.id));
     
        // appending and when is it needed????
        postDiv.appendChild(postTitle);
        postDiv.appendChild(postContent);
        postDiv.appendChild(editBtn);
        postDiv.appendChild(deleteBtn);

        postsList.appendChild(postDiv);
        


  });
}

//Add an event listener to the form’s submit event.
form.addEventListener('submit', (e) => {
  e.preventDefault();           //Prevent the default form submission using event.preventDefault()


  //Validate the form inputs (title and content are required). 

  const isTitleValid = validateField(titleInput, titleError);
  const isContentValid = validateField(contentInput, contentError);

  if (!isTitleValid || !isContentValid) return;

  if (editPostId) {    
    // Update existing post
    const post = posts.find((p) => p.id === editPostId);
    if (post) {
      post.title = titleInput.value.trim();
      post.content = contentInput.value.trim();
    }
    // editPost = null;
    submitBtn.textContent = 'Add Post';
  } else {

    const newPost = {
        id: Date.now(),
        title: titleInput.value.trim(),
        timestamp: Date.now(),
      };
      posts.unshift(newPost);  //will allow to post the newest post first
    }

    savedPosts();
    renderPosts();

    // Reset the form

    form.reset();
    titleError.textContent = "";
    contentError.textContent = "";
  });

  function startEditPost(id) {
    const post = posts.find((p) => p.id === id);
  if (!post) return;

titleInput.value = post.title;
contentInput.value = post.content;
editPostId = id;
submitBtn.textContent = 'Save Changes';
}

function deletePost(id) {
  posts = posts.filter((p) => p.id !== id);
  savedPosts();
  renderPosts();

}


titleInput.addEventListener('input', () => validateField(titleInput, titleError));
contentInput.addEventListener('input', () => validateField(contentInput, contentError));
  






