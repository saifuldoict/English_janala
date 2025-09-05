const loadLeassons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
}

const displayLesson = (lessons) => {
  const level_container = document.getElementById("level_container");
    level_container.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson- ${lesson.level_no}
        </button>
        `;
        level_container.appendChild(btnDiv);
  }
        
}


loadLeassons()