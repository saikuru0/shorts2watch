// ==UserScript==
// @name shorts2watch
// @namespace https://saikuru.xyz/
// @version 0.9.4
// @description Adds a button to go from a /shorts/ video to its /watch?v= equivalent
// @author saikuru0
// @match *://www.youtube.com/shorts/*
// @grant none
// ==/UserScript==

(function () {
	'use strict';

	function replaceUrl() {
		window.location.href = `https://www.youtube.com/watch?v=${window.location.href.split('/').pop()}`;
	}

	function s2wButton(node) {
		const actionsDiv = node.querySelector('div#actions.style-scope.ytd-reel-player-overlay-renderer');

		if (!actionsDiv || actionsDiv.querySelector('.s2w-button')) { return; }

		const button = document.createElement('button');
		button.className = 's2w-button';
		button.innerText = 'Watch';
		button.onclick = replaceUrl;
		button.setAttribute(
			'style',
			`
				background-color: #272727;
				color: #f1f1f1;
				border: none;
				padding: 0;
				width: 48px;
				height: 48px;
				border-radius: 50%;
				font-weight: bold;
				font-size: 14px;
				line-height: 48px;
				text-align: center;
				cursor: pointer;
				position: relative;
				z-index: 9999;
			`
		);

		actionsDiv.insertBefore(button, actionsDiv.firstChild);
	}

	function mutHandler(mutlist) {
		for (const mut of mutlist) {
			s2wButton(mut.target);
		}
	}

	const observer = new MutationObserver(mutHandler);
	const observerConfig = { childList: true, subtree: true };
	observer.observe(document.body, observerConfig);
})();