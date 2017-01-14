(function () {
	'use strict';

	const title = document.getElementById('title');
	const show = document.getElementById('show');

	show.addEventListener('click', () => {
		nodecg.sendMessage('titleChange', title.value);
	});
})();
