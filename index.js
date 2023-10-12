import {ImagesGallery} from './ImagesGallery.js';

(async () => {
    const imagesGalleryContainer = document.querySelector('.images-gallery');
    const imagesGallery = new ImagesGallery(imagesGalleryContainer);
    const readyState = document.readyState;

    if (readyState === 'interactive' || readyState === "complete") {
        await imagesGallery.fetchImages();
    } else {
        window.addEventListener('load', async () => {
            await imagesGallery.fetchImages();
        });
    }

    const intersectionObserver = new IntersectionObserver(async (entries) => {
        if (entries[0].intersectionRatio <= 0 || imagesGallery.isFetching) {
            return;
        }
        await imagesGallery.fetchImages();
    });

    const loaderElement = document.querySelector('.loader');
    if (!loaderElement) {
        throw new Error('Can\'t find loader element in DOM');
    }

    intersectionObserver.observe(loaderElement);
})();
