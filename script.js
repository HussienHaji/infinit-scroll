const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let rady = false;
let imagesLoaded = 0;
let totalImages = 0;

// API URL
const count = 10;
const apiKey = "get api key from unsplash website";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// check image loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    rady = true;
    loader.hidden = true;
  }
}

// helper function for set attributs
function setAttributs(element, attributs) {
  for (const key in attributs) {
    element.setAttribute(key, attributs[key]);
  }
}

//Create elemnts for links and photos add to DOM
function displayPhotos() {
  totalImages = photosArray.length;
  imagesLoaded = 0;

  photosArray.forEach((photo) => {
    // Create <a> to lonk unsdplash
    const item = document.createElement("a");
    setAttributs(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //Create <img> for photo
    const img = document.createElement("img");
    setAttributs(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);

    //Put img inside a
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from unsplash api
async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // Catch Errors
  }
}

// check for is scroll is in bottom
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    rady
  ) {
    rady = false;
    getPhotos();
  }
});

// on loade
getPhotos();
