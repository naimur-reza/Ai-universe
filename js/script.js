// Lets load data form api
const loadData = () => {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools));
};
loadSpinner(true);
const displayData = (data, dataLimit) => {
  // Get the container
  const container = document.getElementById("card-container");

  const showAll = document.getElementById("show-all");
  if (dataLimit && data.length > 6) {
    data = data.slice(0, 6);
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }

  // For each element from array
  data.forEach((card) => {
    // Destructing properties form object
    const { name, description, image, published_in, features, id } = card;

    // Lets add data into card and append to main container
    container.innerHTML += `
        <div class=" w-fit p-5 rounded-lg shadow-2xl">
        <img class="rounded-lg w-96" src="${image}" alt="">
        <h1 class="text-xl font-semibold mt-3">Features</h1>
        <div class="py-3">
            <ol class="text-base text-slate-500 list-decimal ml-4">
                <li>${features[0]}</li>
                <li>${features[1]}</li>
                <li>${features[2]}</li>
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
    loadSpinner(false);
  });
};

// show modal data from api
const showModal = (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displayModalData(data.data));
};
// Display modal data into modal--------------------

const displayModalData = (data) => {
  // A function that returns a string

  const templateFunction = () => {
    if (accuracy.score) {
      template = `<p id="accuracy" class="absolute top-6 right-7 bg-red-600 font-semibold text-white py-2 px-3 rounded-lg">${
        accuracy.score * 100 + " " + "Accuracy"
      }</p>`;
    } else {
      template = "";
    }
    return template;
  };
  // Destructing from object------------------------
  const {
    description,
    pricing,
    image_link,
    features,
    integrations,
    input_output_examples,
    accuracy,
  } = data;

  // Add info into the modal -----------------------

  // Feature section data Loop out
  const FeaturesData = Object.values(features).forEach((element) => {
    console.log(element);
    let featuresNew = "";
    for (const feature_1 of element.feature_name) {
      featuresNew += `<li> ${feature_1} </li>`;
      return featuresNew;
    }
  });

  
  const modalContainer = document.getElementById("modal");
  modalContainer.innerHTML = `
  <div
  class=" relative flex gap-3 modal-box w-11/12 max-w-5xl overflow-y-scroll justify-center flex-col lg:flex-row h-fit"
  >
  <label for="my-modal-5" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
  <div
class="bg-red-50 lg:p-5 w-fit lg:w-[440px] rounded-lg border-2 border-red-400 p-5  "
>
<h1 id="modal-title" class="text-lg font-semibold lg:pt-0 pt-96">${description}</h1>

<div
  class="flex font-semibold gap-2 py-4  text-center justify-center text-base lg:flex-row flex-col"
>
  <div class="lg:w-32 bg-white p-5 rounded-lg ">
    <h1 class="text-green-500">${pricing[0].price} <br>${pricing[0].plan}</h1>
  </div>
  <div class="lg:w-32 bg-white p-5 rounded-lg">
    <h1 class="text-orange-500">${pricing[1].price} <br>${pricing[1].plan}</h1>
  </div>
  <div class="lg:w-32 bg-white p-5 rounded-lg">
    <h1 class="text-red-500">${pricing[2].price} <br>${pricing[2].plan}</h1>
  </div>
</div>

<!-- --- -->
<div class="flex justify-evenly lg:flex-row flex-col">
  <div>
    <h1 class=" font-bold text-lg">Features</h1>
    <ul class="text-slate-500 list-disc p-2">
      <li>${features}</li>
      <li>some text</li>
      <li>some text</li>
    </ul>
  </div>
  <div>
    <h1 class=" font-bold text-lg">Integration</h1>
    <ul class="text-slate-500 list-disc p-4">
    ${FeaturesData}
    </ul>
  </div>
</div>
</div>
<!--  ------------- -->
<div class="lg:w-[440px] w-fit border-2 rounded-lg text-center p-5 space-y-2 relative">
<img
  class="mx-auto  rounded-lg w-fit"
  src="${image_link[0]}"
  alt=""
/>
<h1 class="font-bold">${input_output_examples[0].input}</h1>
<p>${input_output_examples[1].output}</p>
<div>
${templateFunction()}
</div>
</div>
</div>
  `;
  document.getElementById("show-all").addEventListener("click", function () {
    processData(6);
  });
};
