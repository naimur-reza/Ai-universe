const sortButton = () => {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displaySort(data.data.tools));
};
customSort = (a, b) => {
  const dateA = new Date(a.published_in);
  const dateB = new Date(b.published_in);

  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }
  // a must be equal to b
  return 0;
};
const displaySort = (data) => {
    const showAll = document.getElementById('show-all')
    showAll.classList.add('hidden')
  const sortedData = data.sort(customSort);
  const container = document.getElementById("card-container");
  container.innerHTML = ``;
  console.log(sortedData);
  sortedData.forEach((singleData) => {
    const { name, description, image, published_in, features, id } = singleData;

    container.innerHTML += `
  <div class=" lg:w-[320px] w-[290px] p-5 rounded-lg shadow-lg">
  <img class="rounded-lg w-96" src="${image}" alt="">
  <h1 class="text-xl font-semibold mt-3">Features</h1>
  <div class="py-3">
      <ol class="text-base text-slate-500 list-decimal ml-4">
          <li>${features[0]}</li>
          <li>${features[1]}</li>
          <li>${features[2] ? features[2] : "Not Found"}</li>
      </ol>
  </div>
  <hr>
  <div>
  <h1 class="text-xl font-semibold mt-3">${name}</h1>
      <div class="flex gap-2 items-center ">
          <i class="fa-regular fa-calendar-days" ></i>
          <p>${published_in}</p>
          <div class="ml-auto"><label onclick="showModal('${id}')" for="my-modal-5"><i class="fa-solid bg-pink-300 p-4 rounded-full fa-arrow-right"></i></label></div>
          
      </div>
  </div>
</div>
  
      `;
  });
};
