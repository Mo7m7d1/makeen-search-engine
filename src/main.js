import { processFiles } from "./helpers/files.operations.js";
import { sortMapByKey, stemWord } from "./helpers/utils.js";
import { intersect } from "./helpers/logical-operations.js";

let uniqueWords = null;

export async function initialize() {
	if (uniqueWords) return;

	const filePaths = [
		{ path: "data/english/1.txt", docId: 1 },
		{ path: "data/english/2.txt", docId: 2 },
		{ path: "data/english/3.txt", docId: 3 },
		{ path: "data/english/4.txt", docId: 4 },
		{ path: "data/arabic/1.txt", docId: 5, ar: true },
		{ path: "data/arabic/2.txt", docId: 6, ar: true },
		{ path: "data/arabic/3.txt", docId: 7, ar: true },
	];

	uniqueWords = new Map();
	for (const { path, docId } of filePaths) {
		await processFiles(path, docId, uniqueWords);
	}
	uniqueWords = sortMapByKey(uniqueWords);
}

export function find(query) {
	if (!uniqueWords) {
		throw new Error("Data not initialized. Call initialize() first.");
	}

	if (!query) return "Please enter a query to search for";

	query = stemWord(String(query));
	const queryTerms = query.trim().toLowerCase().split(" ");

	if (queryTerms.length === 1) {
		const foundWord = uniqueWords.get(queryTerms[0]);
		return foundWord ? foundWord : "Word not found";
	}

	const resultSet = queryTerms
		.map((term) => uniqueWords.get(term))
		.filter(Boolean);
	// .filter((foundWord) => foundWord !== undefined);

	if (resultSet.length === 0) {
		return "Words not found";
	}

	const combinedResult = resultSet.reduce((result, current) => ({
		word: `${result.word} ${current.word}`,
		frequency: result.frequency + current.frequency,
		docIds: intersect(result.docIds, current.docIds),
	}));

	return combinedResult;
}
