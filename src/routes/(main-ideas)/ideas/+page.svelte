<script>
	export let data;
</script>

<section>
	<h1 class="mt-5">Ideas: {data.ideas.length}</h1>

	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
		{#each data.ideas as idea (idea.id)}
			<div class="card bg-base-100 w-96 shadow-lg">
				<div class="card-body">
					<h2 class="font-semibold text-lg">{idea.title}</h2>
					<p class="truncate text-sm line-clamp-6 whitespace-nowrap">
						{idea.description}
					</p>
					<div class="card-actions justify-between mt-5">
						<p>{idea.votes} votes</p>
						<a href="/ideas/{idea.id}" class="btn btn-accent btn-sm">
							view more
						</a>
					</div>
				</div>
			</div>
		{:else}
			<p class="text-gray-800 italic mt-10">
				no ideas has been submitted yet!!
			</p>
		{/each}
	</div>
</section>
