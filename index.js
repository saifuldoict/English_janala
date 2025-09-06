const loadLeassons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
}
const removeActive = () => {
  const lessonBtns = document.querySelectorAll(".lesson_btn");
 
  lessonBtns.forEach((btn) => btn.classList.remove("active"));
};
  
  


const loadLevelWord = (id) => {
 const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`level-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    }); 
}

const displayLevelWord = (words) => {
  const word_container = document.getElementById("word_container");
    word_container.innerHTML = "";

    if(words.length === 0){
      word_container.innerHTML = `
      <div class=" rounded-lg text-center col-span-full py-5 px-5 space-y-3 font_bangla">
      <img class="mx-auto" src="/assets/alert-error.png" alt="">
          <p class="text-xl font-medium text-gray-500">এই Lesson এ কোন Vocabulary যুক্ত করা হয়নি</p>
          <h2 class="font-bold text-2xl">অনুগ্রহ করে অন্য Lesson Select করুন।</h2>
      </div>
      `;
      return;
    }
    words.forEach(word => {
      const card = document.createElement("div");
      card.innerHTML = `
     
        <div class="bg-white rounded-lg shadow-lg text-center py-10 px-5 space-y-3">
                <h2 class="font-bold text-2xl">${word.word ? word.word: "শব্দ পাওয়া যায়নি"} </h2>
              <p class="font-semibold">Meaning/Prononuncation</p>

              <div class="text-2xl font-semibold font_bangla">${word.meaning ? word.meaning : "মানে পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : " Pronuncation পাওয়া যায়নি" }</div>
              <!-- btn  -->
              <div class="flex justify-between mt-5 items-center">
                <button onclick="my_modal_5.showModal()" class="btn btn-outline btn-primary ">
                  <i class="fa-solid fa-circle-info"></i></button>
                
                  <button class="btn btn-outline btn-primary">
                    <i class="fa-solid fa-volume-high"></i>
                  </button>
              </div>
          </div>
       
      `
      word_container.appendChild(card);
    })

}

const loadWorldDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetail(details.data);
  
}
const displayWordDetail = (word) => {
  
  const detailsContainer = document.getElementById("details_container");
  detailsContainer.innerHTML = `
    <h3 class="text-lg font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h3>
    <p class="py-4">Meaning: ${word.meaning ? word.meaning : "মানে পাওয়া যায়নি"}</p>
    <p class="py-4">Pronunciation: ${word.pronunciation ? word.pronunciation : "Pronuncation পাওয়া যায়নি"}</p>
    <p class="py-4">Example: ${word.example ? word.example : "Example পাওয়া যায়নি"}</p>
  `;
}
const displayLesson = (lessons) => {
  const level_container = document.getElementById("level_container");
    level_container.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id ="level-${lesson.level_no}"
         onClick="loadLevelWord(${lesson.level_no})"
         class="btn btn-outline btn-primary lesson_btn">
        <i class="fa-solid fa-book-open"></i>Lesson- ${lesson.level_no}
        </button>
        `;
        level_container.appendChild(btnDiv);
  }
        
}


loadLeassons()