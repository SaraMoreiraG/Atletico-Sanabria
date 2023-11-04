// Utility function for scrolling to a specific section by its ID
export const scrollToSection = (sectionId) => {
	// Find the target section in the DOM using its ID
	const targetSection = document.getElementById(sectionId);

	// Check if the target section exists
	if (targetSection) {
	  // Scroll smoothly to the target section
	  targetSection.scrollIntoView({ behavior: "smooth" });
	}
  };
