document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const pictureIds = [1, 2, 3]; // puedes cambiar estos números por otros

  const createPicture = (id, caption = "John") => {
    return `
      <figure>
        <img src="https://picsum.photos/id/${id}/200/200" alt="Random image ${id}">
        <figcaption>${caption}</figcaption>
      </figure>
    `;
  };

  gallery.innerHTML = pictureIds.map(id => createPicture(id)).join('');
});
