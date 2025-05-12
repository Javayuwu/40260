document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("loadBtn");
  button.addEventListener("click", loadAndDisplayXML);
});

async function loadAndDisplayXML() {
  try {
    const response = await fetch('cd_catalog.xml');
    const text = await response.text();
    const xmlDoc = new DOMParser().parseFromString(text, "application/xml");
    const cds = xmlDoc.getElementsByTagName("CD");

    displayCDTable(cds);
  } catch (error) {
    console.error('Error loading XML:', error);
  }
}

function displayCDTable(cds) {
  let html = "<table border='1'><tr><th>Artist</th><th>Title</th></tr>";

  Array.from(cds).forEach(cd => {
    const artist = cd.getElementsByTagName("ARTIST")[0]?.textContent || "N/A";
    const title = cd.getElementsByTagName("TITLE")[0]?.textContent || "N/A";
    html += `<tr><td>${artist}</td><td>${title}</td></tr>`;
  });

  html += "</table>";
  document.getElementById("demo").innerHTML = html;
}
