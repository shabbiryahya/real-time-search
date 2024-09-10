function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

function fetchSearchResults(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = ["apple", "apricot", "banana", "grape", "application"];
      const filteredResults = results.filter((result) =>
        result.includes(query.toLowerCase())
      );
      resolve(filteredResults);
    }, 1000);
  });
}

async function handleSearch(event) {
  const query = event.target.value;
  if (query.length === 0) {
    document.getElementById("results").innerHTML = "";
    return;
  }

  const results = await fetchSearchResults(query);
  displayResults(results);
}

function displayResults(results) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML =
    results.length > 0
      ? results.map((result) => `<p>${result}</p>`).join("")
      : "<p>No results found</p>";
}

const searchInput = document.getElementById("search-input");
const debouncedSearch = debounce(handleSearch, 500);
searchInput.addEventListener("input", debouncedSearch);
