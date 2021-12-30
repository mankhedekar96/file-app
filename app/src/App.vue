<template>
  <div>
    <Header />
    <div class="dashboard-container">
      <FileExplorer />
      <FileView />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import FileExplorer from './components/FileExplorer.vue'
import FileView from './components/FileView.vue'

export default {
  name: 'App',
  components: {
    Header,
    FileExplorer,
    FileView
  }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}
.dashboard-container{
    display: flex;
}
</style>
