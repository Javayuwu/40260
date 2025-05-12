document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  const createPicture = (id, name) => {
    const url = `https://picsum.photos/id/${id}/200/200`;
    return `
      <figure>
        <img src="${url}" alt="${name}" data-name="${name}" class="redonda">
        <figcaption>${name}</figcaption>
      </figure>
    `;
  };

  app.innerHTML = createPicture(1, "John") + createPicture(2, "Jane");

  const images = app.querySelectorAll("img");

  images.forEach(img => {
    img.addEventListener("click", () => {
      img.classList.toggle("redonda");
      saludar(img.dataset.name);
    });
  });

  function saludar(nombre) {
    alert(`¡HOLAAAAAAA, ${nombre}!`);
  }
});
