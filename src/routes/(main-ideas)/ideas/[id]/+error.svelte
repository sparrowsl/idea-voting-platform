<script>
	import { page } from "$app/stores";
</script>

<section class="min-h-[50vh] grid place-content-center">
	<h1 class="text-xl font-bold">The page you requested is not available</h1>
	<p class="text-center mb-5">{$page.error?.message}</p>

	<a href="/ideas" class="btn-link w-fit mx-auto">back to ideas</a>
</section>
