<script>
	import { applyAction, enhance } from "$app/forms";
	import Icon from "@iconify/svelte";
	import { toast } from "svelte-sonner";

	let loading = false;
</script>

<section class="min-h-[65vh] grid place-content-center">
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
		<legend class="font-bold text-xl text-center mb-2">Create Account</legend>

		<fieldset class="grid gap-4">
			<label class="input input-bordered flex items-center gap-2">
				<Icon icon="mdi:person" />
				<input
					type="text"
					class="grow input border-0"
					placeholder="Name"
					name="name"
					required
				/>
			</label>

			<label class="input input-bordered flex items-center gap-2">
				<Icon icon="mdi:email" />
				<input
					type="email"
					class="grow input border-0"
					placeholder="Email"
					name="email"
					required
				/>
			</label>

			<label class="input input-bordered flex items-center gap-2">
				<Icon icon="mdi:key" />
				<input
					type="password"
					class="grow input border-0"
					name="password"
					required
				/>
			</label>

			<button
				type="submit"
				class="btn btn-accent disabled:btn-disabled"
				disabled={loading}
			>
				{#if loading}
					<span class="loading loading-spinner loading-xs"></span>
				{/if}
				Signup
			</button>
		</fieldset>
	</form>
</section>
