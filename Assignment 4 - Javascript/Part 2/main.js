const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const image = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];
/* Declaring the alternative text for each image file */
const altText = 
{
'pic1.jpg': 'Eyes',
'pic2.jpg': 'Rock',
'pic3.jpg': 'Flower',
'pic4.jpg': 'Tomb', 
'pic5.jpg': 'Moth'  
};

/* Looping through images */
for (const img of image){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', img);
    newImage.setAttribute('alt', altText[img]);
    thumbBar.appendChild(newImage);

    /* Adding an onclick event to each thumbnail */
    newImage.addEventListener('click', () => {
        displayedImage.setAttribute('src', img);
        displayedImage.setAttribute('alt', altText[img]);
    });

    thumbBar.appendChild(newImage);
}

/* Wiring up the Darken/Lighten button */
