document.addEventListener("DOMContentLoaded", () => {
    const bookRows = document.querySelectorAll(".book-row");
  
    bookRows.forEach((row) => {
      row.addEventListener("click", () => {
        const index = row.dataset.index;
        const detailsRow = document.getElementById(`details-${index}`);
        if (detailsRow.style.display === "table-row") {
          detailsRow.style.display = "none"; // Hide the details
        } else {
          detailsRow.style.display = "table-row"; // Show the details
        }
      });
    });
  });
  