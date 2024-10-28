// Set control buttons to OFF by default
let isAutomatedControl = false;
let isHighlightContent = false;

// Toggle Display Content of the HTML file uploaded
let htmlContent = ""; // Store the HTML file content

    // Listen for file selection and load the content
    document.getElementById('protocol1').addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          htmlContent = e.target.result; // Store the loaded content
          document.getElementById('contentContainer').innerHTML = htmlContent;
        };
        reader.readAsText(file); // Read the file as text
      }
    });

    // Function to toggle the display of the content container
    function toggleDisplay() {
        isAutomatedControl = !isAutomatedControl;
        const automatedControlButton = document.getElementById('automatedControl');
        automatedControlButton.textContent = `Display: ${isAutomatedControl ? 'ON' : 'OFF'}`;
        automatedControlButton.classList.toggle('active', isAutomatedControl);

        const contentContainer = document.getElementById('contentContainer');
        if (contentContainer.style.display === "none" || contentContainer.style.display === "") {
            contentContainer.style.display = "block";
        } else {
            contentContainer.style.display = "none";
        }
    }

// // Update the sequence list panel
// function updateSequenceList() {
//     const sequenceLists = document.querySelectorAll("#seqSelect");                
    
//     sequenceLists.forEach(sequenceList => {
//         sequenceList.innerHTML = `<option value="QuickView">${sequenceList.innerHTML}</option>`;
//     }
// }

// Show/hide the highlighted element
function generateHighlightedElement() {
    isHighlightContent = !isHighlightContent;
    const highlightContentButton = document.getElementById('highlightContent');
    highlightContentButton.textContent = `Highlight Content: ${isHighlightContent ? 'ON' : 'OFF'}`;
    highlightContentButton.classList.toggle('active', isHighlightContent);
    const spans = document.querySelectorAll("#spanHighlight");
    
    // If no spanHighlight element
    if (document.getElementById("spanHighlight") === null) {
        // Get elements 1 and 2
        const element1 = document.querySelectorAll('.protocolheader')[0].nextElementSibling;
        const element2 = document.querySelectorAll('.protocolheader')[1].nextElementSibling;

        // Function to compare and highlight differences
        function highlightDifferences(row1, row2) {
            const cells1 = row1.querySelectorAll('td');
            const cells2 = row2.querySelectorAll('td');

            cells1.forEach((cell1, index) => {
                const cell2 = cells2[index];
                if (cell1 && cell2 && cell1.textContent.trim() !== cell2.textContent.trim()) {
                    cell1.innerHTML = `<span id="spanHighlight" style="background-color: lightgreen;">${cell1.innerHTML}</span>`;
                    cell2.innerHTML = `<span id="spanHighlight" style="background-color: lightgreen;">${cell2.innerHTML}</span>`;
                }
            });
        }

        // Get tables and rows from Element 1 and Element 2
        const rows1 = element1.querySelectorAll('table tr');
        const rows2 = element2.querySelectorAll('table tr');

        // Compare each row and highlight differences in Element 3
        rows1.forEach((row1, index) => {
            if (rows2[index]) {
                highlightDifferences(row1, rows2[index]);
            }
        });
    } else {
        // If spanHighlight elements already exist
        spans.forEach(span => {
            span.style.backgroundColor = span.style.backgroundColor === 'lightgreen' ? 'transparent' : 'lightgreen';
        })
    }
}