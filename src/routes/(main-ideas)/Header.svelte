<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
</script>

<header class="sticky top-0 bg-white shadow py-3 z-30">
	<div class="navbar bg-base-100 container mx-auto">
		<div class="navbar-start">
			<a href="/" class="btn btn-ghost text-xl">IVP</a>
		</div>
		{#if $page.data.user}
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal px-1">
					<h3 class="capitalize">Welcome {$page.data.user?.name}</h3>
				</ul>
			</div>
		{/if}
		<div class="navbar-end gap-5">
			<a href="/ideas">Ideas</a>

			{#if $page.data.user}
				<a href="/ideas/new" class="btn btn-sm">Share Idea</a>

				<form
					action="/?/logout"
					method="post"
					class="btn btn-sm btn-error"
					use:enhance
				>
					<button type="submit">logout</button>
				</form>
			{:else}
				<a href="/login" class="btn btn-sm">Login</a>
				<a href="/signup" class="btn btn-sm">Signup</a>
			{/if}
		</div>
	</div>
</header>
