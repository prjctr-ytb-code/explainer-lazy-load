export class ImagesGallery {
    #imagesContainer;
    #currentPage;
    #pagesLimitForOneFetch;
    #images;

    constructor(imagesContainer) {
        this.#imagesContainer = imagesContainer instanceof Element ? imagesContainer : null;
        this.#currentPage = 1;
        this.#pagesLimitForOneFetch = 13;
        this.#images = [];
        this.isFetching = false;
    }

    #renderImageCard = (image) => {
        const {author, download_url, id} = image;

        return `<figure class="image-card" id=${id}>
                  <img  class="image-card__image" src=${download_url} loading="lazy">
                  <figcaption  class="image-card__caption">Author: ${author}</figcaption>
                </figure>`;
    };

    #addImageCardsToDOM = (images) => {
        images.forEach((img) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('image-wrapper');
            imageWrapper.innerHTML = this.#renderImageCard(img);
            this.#imagesContainer.appendChild(imageWrapper);
        });
    };

    fetchImages = async () => {
        if(!this.#imagesContainer) {
            throw new Error('Images container is not type of DOM Element.')
        }

        const API_URL = `https://picsum.photos/v2/list?page=${this.#currentPage}&limit=${this.#pagesLimitForOneFetch}`;
        this.isFetching = true;

        try {
            const response = await fetch(API_URL);
            this.images = await response.json();
            this.#addImageCardsToDOM(this.images);
            this.#currentPage++;
        } catch (error) {
            throw new Error(error);
        } finally {
            this.isFetching = false;
        }
    };
}
