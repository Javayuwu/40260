document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const result = document.getElementById("resultado");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = document.getElementById("user").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!user || !password) {
      result.textContent = "Por favor, llena todos los campos.";
      result.style.color = "red";
      return;
    }

    
    result.textContent = `Bienvenido, ${user}!`;
    result.style.color = "green";
  });
});
