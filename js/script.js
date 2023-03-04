// Lets load data form api
const loadData = () => {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools.slice(0, 6)));
};
loadSpinner(true);
const displayData = (data) => {
  // Get the container
  const container = document.getElementById("card-container");
  container.innerHTML = ``;

  // For each element from array
  data.forEach((card) => {
    // Destructing properties form object
    const { name, description, image, published_in, features, id } = card;

    // Lets add data into card and append to main container

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
  let featuresArray = [];
  const FeaturesData = Object.values(features).forEach((element) => {
    featuresArray.push(element.feature_name);
  });
  // Integration data loop out
  let integrationArray = [];
  const integrationsData = Object.values(integrations).forEach((element) => {
    integrationArray.push(element);
  });
  console.log(integrationArray);

  const modalContainer = document.getElementById("modal");
  modalContainer.innerHTML = `
  <div
  class=" relative flex gap-3 modal-box w-11/12 max-w-5xl overflow-y-scroll justify-center flex-col lg:flex-row h-fit"
  >
  <label for="my-modal-5" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
  <div
class="bg-red-50 lg:p-5 w-fit lg:w-[440px] rounded-lg border-2 border-red-400 p-5  "
>
<h1 id="modal-title" class="text-lg font-semibold lg:pt-0 mt-28 pt-96">${
    description ? description : "Not Found"
  }</h1>

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
      <li>${featuresArray[0]}</li>
      <li>${featuresArray[1]}</li>
      <li>${featuresArray[2]}</li>
    </ul>
  </div>
  <div>
    <h1 class=" font-bold text-lg">Integration</h1>
    <ul class="text-slate-500 list-disc p-4">
    <li>${integrationArray[0]}</li>
    <li>${integrationArray[1] ? integrationArray[1] : "Not Found"}</li>
    <li>${integrationArray[2] ? integrationArray[2] : "Not found"}</li>
    <li>${integrationArray[3] ? integrationArray[3] : "Not found"}</li>
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
};

const showAll = () => {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools));
  const showAllButton = document.getElementById("show-all");
  showAllButton.classList.add("hidden");
};


