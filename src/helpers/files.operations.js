import { stemWord } from "./utils.js";
export async function readFile(path, docId) {
	try {
		const response = await fetch(path);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch ${path}: ${response.status} ${response.statusText}`
			);
		}
		const data = await response.text();
		return { docId, content: data };
	} catch (err) {
		throw err;
	}
}

export async function processFiles(filePath, docId, uniqueWords) {
	const { content } = await readFile(filePath, docId);
	const paragraph = content.toLowerCase().split(" ");

	for (const word of paragraph) {
		const stemmedWord = stemWord(word);

		if (!uniqueWords.has(stemmedWord)) {
			uniqueWords.set(stemmedWord, {
				word: stemmedWord,
				frequency: 1,
				docIds: [docId],
			});
		} else {
			const existingEntry = uniqueWords.get(stemmedWord);

			// If the word already exists, update the frequency and docIds
			existingEntry.frequency += 1;
			if (!existingEntry.docIds.includes(docId)) {
				existingEntry.docIds.push(docId);
			}
		}
	}
}
