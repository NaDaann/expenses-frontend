<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title> Onfly Expenses Manager </q-toolbar-title>

				<div>Quasar v{{ $q.version }}</div>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
defineOptions({
	name: 'MainLayout',
});
</script>
