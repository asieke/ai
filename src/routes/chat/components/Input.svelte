<script>
	import { onMount } from 'svelte';

	let textarea;
	let padding;
	let lineHeight = 1.8;
	let maxRows = 8;

	const resizeTextarea = () => {
		textarea.style.height = 'auto';
		const rows = Math.min(maxRows, Math.floor(textarea.scrollHeight / lineHeight));
		textarea.style.height = `${rows * lineHeight}px`;
		padding.style.height = `${20 + rows * lineHeight}px`;
	};

	onMount(() => {
		lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
		textarea.addEventListener('input', resizeTextarea);
	});
</script>

<textarea
	bind:this={textarea}
	class="absolute centered bg-gray-700 w-[480px] bottom-[40px] text-sm z-20 text-white font-light"
	placeholder="Type here..."
	rows="1"
/>
<div
	bind:this={padding}
	class="absolute centered bg-gray-700 w-[500px] bottom-[30px] z-10 h-[40px] rounded-md shadow-md"
/>

<!-- <div class="absolute bg-red-600 left-[9%] right-[9%] bottom-7 z-10">asdfasdf</div> -->
<style lang="postcss">
	textarea {
		display: block;
		resize: none;
		overflow-y: scroll;
		padding: 0;
		margin: 0;
		outline: none;
		border: none;
	}

	textarea:focus {
		outline: none;
		box-shadow: none !important;
	}

	.centered {
		left: 50%;
		transform: translateX(-50%);
	}
</style>
