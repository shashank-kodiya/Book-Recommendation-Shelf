requireLogin();

const shelfElement = document.getElementById('shelf');
const welcomeElement = document.getElementById('shelf-welcome');

function escapeHtml(value) {
	return String(value ?? '').replace(/[&<>"']/g, character => ({
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;'
	})[character]);
}

function renderBook(item) {
	const book = item.book;
	const review = item.myReview;
	const reviewId = `review-${item._id}`;
	const selectedRating = Number(review?.rating || 0);
	const ratingOptions = [5, 4, 3, 2, 1].map(rating =>
		`<input class="star-input" type="radio" name="rating" value="${rating}" id="rating-${reviewId}-${rating}" ${selectedRating === rating ? 'checked' : ''} required>
		<label for="rating-${reviewId}-${rating}"><span class="visually-hidden">${rating} star${rating === 1 ? '' : 's'}</span><span aria-hidden="true">★</span></label>`
	).join('');

	return `<article class="card">
		<h3>${escapeHtml(book.title)}</h3>
		<p>${escapeHtml(item.status)}</p>
		<p>Completed: ${item.pagesCompleted}/20 · Remaining: ${item.pagesRemaining}</p>
		<div class="progress"><div class="bar" style="width:${item.progressPercent}%"></div></div>
		<p>${item.progressPercent}%</p>
		<label for="status-${item._id}">Shelf status</label>
		<select id="status-${item._id}" data-shelf-status="${item._id}">
			<option ${item.status === 'Want to Read' ? 'selected' : ''}>Want to Read</option>
			<option ${item.status === 'Reading' ? 'selected' : ''}>Reading</option>
			<option ${item.status === 'Completed' ? 'selected' : ''}>Completed</option>
		</select>
		<a class="btn" href="/reader.html?id=${encodeURIComponent(book._id)}">Open Reader</a>
		<form class="shelf-review-form" data-book-id="${encodeURIComponent(book._id)}">
			<h4>Your rating and review</h4>
			<fieldset class="star-rating"><legend>Rating</legend>${ratingOptions}</fieldset>
			<label for="text-${reviewId}">Review</label>
			<textarea id="text-${reviewId}" name="review" rows="3" maxlength="2000" placeholder="Write a review (optional)">${escapeHtml(review?.review || '')}</textarea>
			<button type="submit">Save review</button>
			<p class="review-message" role="status" aria-live="polite"></p>
		</form>
	</article>`;
}

async function loadShelf() {
	try {
		const [user, items] = await Promise.all([
			apiFetch('/auth/me'),
			apiFetch('/shelf')
		]);
		welcomeElement.replaceChildren(document.createTextNode('Welcome, '));
		const userName = document.createElement('span');
		userName.className = 'shelf-welcome-name';
		userName.textContent = user.name;
		welcomeElement.append(userName, document.createTextNode('!'));
		const itemsWithReviews = await Promise.all(items.filter(item => item.book).map(async item => ({
			...item,
			myReview: await apiFetch(`/reviews/book/${encodeURIComponent(item.book._id)}/mine`)
		})));

		shelfElement.innerHTML = itemsWithReviews.length
			? itemsWithReviews.map(renderBook).join('')
			: '<p>Your shelf is empty.</p>';
	} catch (error) {
		shelfElement.innerHTML = `<p class="error">${escapeHtml(error.message)}</p>`;
	}
}

shelfElement.addEventListener('change', async event => {
	const select = event.target.closest('[data-shelf-status]');
	if (!select) return;

	try {
		await apiFetch(`/shelf/${select.dataset.shelfStatus}`, {
			method: 'PUT',
			body: JSON.stringify({ status: select.value })
		});
	} catch (error) {
		window.alert(error.message);
		loadShelf();
	}
});

shelfElement.addEventListener('submit', async event => {
	const form = event.target.closest('.shelf-review-form');
	if (!form) return;
	event.preventDefault();

	const message = form.querySelector('.review-message');
	const formData = new FormData(form);
	try {
		await apiFetch(`/reviews/book/${form.dataset.bookId}`, {
			method: 'POST',
			body: JSON.stringify({
				rating: Number(formData.get('rating')),
				review: formData.get('review')
			})
		});
		message.textContent = 'Review saved.';
		message.className = 'review-message success';
	} catch (error) {
		message.textContent = error.message;
		message.className = 'review-message error';
	}
});

loadShelf();
