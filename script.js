const header = document.getElementById("header");
const searchBar = document.getElementById("search-bar");
const topicsList = document.getElementById("topics-list");
let data = [];
let topics = [];

// search function
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredtopics = topics.filter((topic) =>
    topic.programs.some((program) =>
      program.title.toLowerCase().includes(searchString)
    )
  );
  displayTopics(filteredtopics);
});

// loading all the data from json and functions to display data
const loadData = async () => {
  try {
    const res = await fetch("OpenDay.json");
    data = await res.json();
    topics = data.topics;
    topics.sort(compareTopics);
    topics.forEach((topic) => {
      topic.programs.sort(comparePrograms);
    });
    displayHeader(data);
    displayTopics(topics);
  } catch (err) {
    console.error(err);
  }
};

// display header with title and date
const displayHeader = (data) => {
  const headerHtml = `
  <h1 class="header-title">${data.description}</h1>
  <div class="openday-date">
  <p>${data.start_time.slice(0, -3)} - ${data.end_time.slice(0, -3)}</p>
  </div>
  `;
  header.innerHTML = headerHtml;
};

// display topics html
const displayTopics = (topics) => {
  const htmlString = topics
    .map((topic) => {
      return (
        `<li>
        <h2 class="topic-title" onclick="displayMore(this)">${topic.name}</h2>
        <ul class="programs-container" style="display: none;">` +
        topic.programs
          .map((program) => `<li class="program-title">${program.title}</li>`)
          .join("") +
        `</ul>
        </li>`
      );
    })
    .join("");
  topicsList.innerHTML = htmlString;
};

// comparing for sorting
function compareTopics(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function comparePrograms(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

// to display all programs container on click of the topic
function displayMore(el) {
  var x = el.nextElementSibling;
  if (x.style.display == "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

loadData();
