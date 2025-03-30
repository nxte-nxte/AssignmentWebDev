/*
 
 NAME: Nathan C. Betton
 DATE: 2025-03-30
 DESCRIPTION: Complete the image gallery example by adding the JavaScript code to make the images in the thumbnail bar clickable. 
              When clicked, the image should display in the full-image area. 
              The darken button should darken the full-image area when clicked.



*/




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
btn.addEventListener('click', () => {

    const currentClass = btn.getAttribute('class');
    // Toggle the overlay class
    if (currentClass === 'dark') {
        overlay.classList.remove('dark');
        btn.setAttribute('class', 'light');
        btn.textContent = 'Darken';
        /* Darken the background */
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
        overlay.classList.add('dark');
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Lighten';
        /* Lighten the background */
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
    }
});