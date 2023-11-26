import css from './ImageGalleryItem.module.css';
import React from 'react';

export const ImageGalleryItem = ({ images, onClick }) => {
  return (
    <ul className={css.ImagesList}>
      {images.map(({ id, largeImageURL, tags, webformatURL }) => (
        <li key={id} className={css.ImageGalleryItem}>
          <img
            className={css.ImageGalleryItemImage}
            src={webformatURL}
            alt={tags}
            width={200}
            height={200}
            onClick={() => onClick(largeImageURL)}
          />
        </li>
      ))}
    </ul>
  );
};
