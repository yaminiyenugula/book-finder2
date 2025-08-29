const results = document.getElementById("results");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// Modal
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalYear = document.getElementById("modalYear");
const modalSubjects = document.getElementById("modalSubjects");

// Fetch books
function loadBooks(query = "programming") {
  results.innerHTML = "<p>Loading suggestions...</p>";

  fetch(`https://openlibrary.org/search.json?title=${query}`)
    .then(res => res.json())
    .then(data => {
      results.innerHTML = "";
      const books = data.docs.slice(0, 30); // 30 books
      books.forEach(book => {
        const cover = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://via.placeholder.com/120x180?text=No+Cover";
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
          <img src="${cover}" alt="${book.title}">
          <h4>${book.title}</h4>
          <p>${book.author_name ? book.author_name[0] : "Unknown"}</p>
        `;

        // Click to open modal
        card.addEventListener("click", () => {
          modal.style.display = "block";
          modalTitle.textContent = book.title;
          modalAuthor.textContent = "Author: " + (book.author_name ? book.author_name[0] : "Unknown");
          modalYear.textContent = "First Published: " + (book.first_publish_year || "Unknown");
          modalSubjects.textContent = "Subjects: " + (book.subject ? book.subject.slice(0, 5).join(", ") : "N/A");
        });

        results.appendChild(card);
      });
    })
    .catch(err => {
      results.innerHTML = "<p>Error loading books.</p>";
      console.error(err);
    });
}

// Load default books
window.addEventListener("load", () => loadBooks());

// Search functionality
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) loadBooks(query);
});

// Close modal
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};
