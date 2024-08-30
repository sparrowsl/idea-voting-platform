<script>
	import { applyAction, enhance } from "$app/forms";
	import Icon from "@iconify/svelte";
	import { toast } from "svelte-sonner";

	let loading = false;
</script>

<section class="min-h-[50vh] mt-10 max-w-xl mx-auto">
	<form
		method="post"
		class="shadow-xl p-14 rounded"
		use:enhance={() => {
			loading = true;

			return async ({ result }) => {
				if (result.type === "failure") {
					toast.error(String(result.data?.message));
				} else {
					await applyAction(result);
				}

				loading = false;
			};
		}}
	>
		<fieldset class="grid gap-5">
			<div class="form-control w-full">
				<span class="label label-text">Title</span>
				<label class="input input-bordered flex items-center gap-2">
					<Icon icon="mdi:lead-pencil" />
					<input
						type="text"
						class="grow input border-0"
						placeholder="Christex foundation just dropped a bounty"
						name="title"
						required
					/>
				</label>
			</div>

			<div class="form-control w-full">
				<label class="label label-text !justify-start" for="description">
					<Icon icon="mdi:text" class="mr-2" />Description
				</label>
				<textarea
					id="description"
					class="textarea textarea-bordered w-full min-h-52"
					placeholder="learn, earn and enjoy your craft..."
					name="description"
				></textarea>
			</div>

			<button
				type="submit"
				class="btn btn-success text-white disabled:btn-disabled"
				disabled={loading}
			>
				{#if loading}
					<span class="loading loading-spinner loading-xs"></span>
					Sharing...
				{:else}
					Share Idea
				{/if}
			</button>
		</fieldset>
	</form>
</section>
