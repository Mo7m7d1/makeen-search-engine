//t1 and t2
export function intersect(postings1, postings2) {
	const result = [];

	let i = 0;
	let j = 0;

	while (i < postings1.length && j < postings2.length) {
		if (postings1[i] === postings2[j]) {
			result.push(postings1[i]);
			i++;
			j++;
		} else if (postings1[i] < postings2[j]) {
			i++;
		} else {
			j++;
		}
	}

	return result;
}

// t1 or t2
export function union(postings1, postings2) {
	const result = [];
	let i = 0,
		j = 0;

	while (i < postings1.length || j < postings2.length) {
		const docId1 = postings1[i];
		const docId2 = postings2[j];

		if (docId1 === docId2) {
			result.push(docId1);
			i++;
			j++;
		} else if (docId1 < docId2 || j >= postings2.length) {
			result.push(docId1);
			i++;
		} else {
			result.push(docId2);
			j++;
		}
	}

	return result;
}

export function andNotQuery(postings1, postings2) {
	const result = [];
	let i = 0,
		j = 0;

	while (i < postings1.length && j < postings2.length) {
		const docId1 = postings1[i];
		const docId2 = postings2[j];

		if (docId1 === docId2) {
			i++;
			j++;
		} else if (docId1 < docId2) {
			result.push(docId1);
			i++;
		} else {
			j++;
		}
	}

	while (i < postings1.length) {
		result.push(postings1[i]);
		i++;
	}

	return result;
}

export function orNotQuery(postings1, postings2, totalDocIds) {
	const result = [];
	let i = 0,
		j = 0;

	while (i < postings1.length && j < postings2.length) {
		const docId1 = postings1[i];
		const docId2 = postings2[j];

		if (docId1 === docId2) {
			i++;
			j++;
		} else if (docId1 < docId2) {
			result.push(docId1);
			i++;
		} else {
			j++;
		}
	}

	while (i < postings1.length) {
		result.push(postings1[i]);
		i++;
	}

	while (j < postings2.length) {
		result.push(postings2[j]);
		j++;
	}

	// Handle the "NOT" part by including missing document IDs
	for (let docId = 1; docId <= totalDocIds; docId++) {
		if (!result.includes(docId)) {
			result.push(docId);
		}
	}

	return result;
}
