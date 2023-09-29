export function stemWord(word) {
	if (word.length < 5) return word;

	word = word.replace(/[^\p{L}0-9]+/gu, " "); // replaces symbols

	const lastVowelIndex = word.slice(0, -3).lastIndexOf("a");

	if (word.endsWith("ing")) {
		return word.slice(0, -3);
	} else if (word.endsWith("ly")) {
		return word.slice(0, -2);
	} else if (word.endsWith("s") && !word.endsWith("ss")) {
		return word.slice(0, -1);
	} else if (lastVowelIndex === -1) {
		return word;
	} else {
		return word;
	}
}

export function sortMapByKey(map) {
	const sortedEntries = [...map.entries()].sort((a, b) =>
		a[0].localeCompare(b[0])
	);
	return new Map(sortedEntries);
}

export async function delay(time) {
	await new Promise((res) => setTimeout(res, time));
}

export function toggleVisibility(element, display) {
	element.style.display = display;
}

export function displayResults(element, query, word, frequency, docIds) {
	element.innerHTML = word
		? `
    <p>query Word: <strong>${query}</strong></p>
    <p>Stemmed Word: <strong>${word}</strong></p> 
    <p>Frequency: <strong>${frequency}</strong> </p> 
    <p>Documents Ids: <strong>${docIds.join(", ")}</strong></p> 
  `
		: `'${query}' Not found`;
}
