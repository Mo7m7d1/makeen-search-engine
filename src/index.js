import { delay, toggleVisibility, displayResults } from "./helpers/utils.js";
import { initialize, find } from "./main.js";

const form = document.getElementById("search-form");
const resultElement = document.getElementById("result");
const loadingIndicator = document.getElementById("loading-indicator");

initialize().then(() => {
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const query = form.query.value;

		toggleVisibility(resultElement, "none");
		toggleVisibility(loadingIndicator, "block");

		await delay(700);
		const { word, frequency, docIds } = find(query);

		toggleVisibility(loadingIndicator, "none");

		displayResults(resultElement, query, word, frequency, docIds);

		toggleVisibility(resultElement, "block");
	});
});
