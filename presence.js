function formatToYYYYMMDD_HH24MM(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

setInterval( () =>  {
    const searchText = 'XXXXXX';
	const allImages = document.querySelectorAll('img'); // Get all <img> tags
	const matchingImages = [];

	allImages.forEach(img => {
		const src = img.getAttribute('src'); // Get the value of the src attribute
		if (src && src.includes(searchText)) { // Check if src exists and contains the text
		
			let nextSibling = img.nextElementSibling; // Start with the immediate next sibling

			// Loop through siblings until you find the target or run out of siblings
			while (nextSibling) {
				// Check if it's a <div> AND has role="img"
				if (nextSibling.tagName === 'DIV' && nextSibling.getAttribute('role') === 'img') {
					let now = formatToYYYYMMDD_HH24MM(new Date);
					let status = nextSibling.getAttribute('aria-label');
					console.log(`${now} [STATUS] ${status} ${src}`);
					break; // Stop after finding the first one
				}
				nextSibling = nextSibling.nextElementSibling; // Move to the next sibling
			}
		}
	});
}, 60000);

