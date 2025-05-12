document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loadButton").addEventListener("click", loadXMLDoc);
});

const loadXMLDoc = async () => {
  try {
    createBubbles();
    animateAK47();

    const response = await fetch('cd_catalog.xml');
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");
    const cds = xmlDoc.getElementsByTagName("CD");

    displayCDs(cds);
    document.getElementById("error").textContent = "";
  } catch (error) {
    console.error('Error loading XML:', error);
    document.getElementById("error").textContent = "⚠️ No se pudo cargar el archivo XML.";
  }
};

const displayCDs = (cds) => {
  let table = "<tr><th>Artista</th><th>Título</th></tr>";
  Array.from(cds).forEach(cd => {
    const artist = cd.getElementsByTagName("ARTIST")[0]?.textContent || "Desconocido";
    const title = cd.getElementsByTagName("TITLE")[0]?.textContent || "Sin título";
    table += `<tr><td>${artist}</td><td>${title}</td></tr>`;
  });
  document.getElementById("demo").innerHTML = table;
};

function createBubbles() {
  const buttonRect = document.getElementById('loadButton').getBoundingClientRect();
  const centerX = buttonRect.left + buttonRect.width / 2;
  const bottomY = buttonRect.bottom;

  const numberOfBubbles = Math.floor(Math.random() * 11) + 15;

  for (let i = 0; i < numberOfBubbles; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    const size = Math.floor(Math.random() * 41) + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    const xOffset = Math.random() * buttonRect.width - buttonRect.width / 2;
    bubble.style.left = `${centerX + xOffset}px`;
    bubble.style.top = `${bottomY}px`;

    const duration = Math.random() * 4 + 2;
    bubble.style.animationDuration = `${duration}s`;

    const delay = Math.random() * 0.5;
    bubble.style.animationDelay = `${delay}s`;

    document.body.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, (duration + delay) * 1000);
  }
}

function animateAK47() {
  const ak47Container = document.getElementById('ak47-container');
  ak47Container.classList.add('show');

  const muzzleX = 290;
  const muzzleY = 45;

  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      createMuzzleFlash(muzzleX, muzzleY);
      createBullet(muzzleX, muzzleY);
      simulateRecoil(i);
    }, i * 100);
  }

  setTimeout(() => {
    ak47Container.classList.remove('show');
  }, 2000);
}

function createMuzzleFlash(x, y) {
  const flash = document.createElement('div');
  flash.className = 'muzzle-flash';
  flash.style.left = `${x}px`;
  flash.style.top = `${y - 15}px`;

  document.getElementById('ak47-container').appendChild(flash);

  setTimeout(() => {
    flash.remove();
  }, 100);
}

function createBullet(startX, startY) {
  const bullet = document.createElement('div');
  bullet.className = 'bullet';
  bullet.style.left = `${startX + 10}px`;
  bullet.style.top = `${startY - 2}px`;

  document.getElementById('ak47-container').appendChild(bullet);

  let position = startX + 10;
  const maxDistance = window.innerWidth;
  const speed = 20;

  const bulletAnimation = setInterval(() => {
    position += speed;
    bullet.style.left = `${position}px`;

    const rotation = Math.random() * 10 - 5;
    bullet.style.transform = `rotate(${rotation}deg)`;

    if (position > maxDistance) {
      clearInterval(bulletAnimation);
      bullet.remove();
    }
  }, 16);
}

function simulateRecoil(intensity) {
  const ak47 = document.getElementById('ak47');
  const angle = (intensity % 3) * 1;

  ak47.style.transform = `rotate(${-angle}deg)`;

  setTimeout(() => {
    ak47.style.transform = 'rotate(0deg)';
  }, 50);
}
