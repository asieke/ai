<script lang="ts">
	import { Input } from './components/';
</script>

<div class="grid grid-cols-[250px_1fr_250px] w-full h-screen">
	<div class="bg-gray-950 h-full">Left Sidebar</div>
	<div class="flex flex-col h-full">
		<div class="bg-gray-800 flex-grow">
			<slot />
		</div>
		<div class="h-24 bg-gray-900"><Input /></div>
	</div>
	<div class="bg-gray-950 h-full">Right Sidebar</div>
</div>
