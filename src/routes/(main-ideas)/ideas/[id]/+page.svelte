<script>
	import { applyAction, enhance } from "$app/forms";
	import Icon from "@iconify/svelte";
	import { toast } from "svelte-sonner";

	export let data;

	let voting = false;

	const { idea } = data;
</script>

<section class="p-10">
	<h1 class="text-lg font-bold capitalize mb-2">{idea.title}</h1>
	<p class="mb-2 flex items-center gap-1 italic">
		<Icon icon="mdi:person" />
		{idea?.user.name}
	</p>
	<p class="mb-5 flex items-center gap-1 italic">
		<Icon icon="mdi:vote" />
		{idea.votes} votes
	</p>

	<p class="max-w-xl whitespace-pre-wrap">{idea.description}</p>

	{#if data.user}
		{#if !idea.votersId?.includes(data.user?.id)}
			<form
				method="post"
				class="mt-5"
				use:enhance={() => {
					voting = true;

					return async ({ result }) => {
						if (result.type === "failure") {
							toast.error(String(result.data?.message));
						} else if (result.type === "success") {
							toast.success("You vote has been cast!!!!");
							// TODO: reload the page (the correct way) and update vote count
							window.location.reload();
						} else {
							await applyAction(result);
						}

						voting = false;
					};
				}}
			>
				<button class="btn btn-sm btn-accent" disabled={voting}>vote</button>
			</form>
		{:else}
			<p class="text-gray-400 italic mt-10">already voted</p>
		{/if}
	{/if}
</section>
