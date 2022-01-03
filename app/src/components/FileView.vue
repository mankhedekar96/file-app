<template>
  <div class="file-view-container">
    <div class="file-path">File / File1 /</div>
    <label class="file-upload" @click="showModal = true">Upload</label>
    <ul class="file-list" v-if="!loading && files && files.length">
      <li v-for="file in files" :key="file.id" @click="viewFile(file.name)">
        <label>{{ file.name }}</label>
        <div>
          <button @click.prevent="downloadFile(file.name)" class="file-download">
            Download
          </button>
          <button @click.stop="deleteFile(file.id)" class="file-download bg-red">
            Delete
          </button>
        </div>
      </li>
    </ul>
    <div class="no-files" v-if="!loading && files && files.length === 0">
      No files. Please upload files.
    </div>
    <p v-if="loading">Still loading..</p>
    <p v-if="error"></p>
    <UploadModal v-if="showModal" @close="closeModal"/>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import UploadModal from './UploadModal.vue'

export default {
  name: "FileView",
  components: {
    UploadModal
  },
  setup() {
    const files = ref(null);
    const loading = ref(true);
    const error = ref(null);

    function fetchData() {
      // Will be implemented next
      loading.value = true;
      // I prefer to use fetch
      // you can use use axios as an alternative
      return axios({
        method: "get",
        url: "http://localhost:9000/files",
        responseType: "json",
      })
        .then((response) => {
          // set the response data
          files.value = response.data;
        })
        .catch((err) => {
          error.value = err;
          // In case a custom JSON error response was provided
          if (err.json) {
            return err.json.then((json) => {
              // set the JSON response message
              error.value.message = json.message;
            });
          }
        })
        .then(() => {
          loading.value = false;
        });
    }

    onMounted(() => {
      fetchData();
    });

    return {
      files,
      loading,
      error
    };
  },
  data(){
    return {
      showModal: false
    }
  },
  methods: {
    viewFile(name) {
      axios({
        method: "get",
        url: "http://localhost:9000/download/" + name,
        responseType: "arraybuffer",
      }).then((response) => {
        let blob = new Blob([response.data], {
            type: response.headers["content-type"],
          }),
          url = window.URL.createObjectURL(blob);

        window.open(url);
      });
    },
    downloadFile(name) {
      window.open("http://localhost:9000/download/" + name);
    },
    deleteFile(id) {
      axios({
        method: "delete",
        url: "http://localhost:9000/files/" + id,
      }).then((response) => {
        alert("File Deleted!");
        console.log(response);
      });

      setTimeout(() => window.location.reload(), 2000);
    },
    closeModal() {
      this.showModal = false;
      setTimeout(() => window.location.reload(), 2000);  
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.file-view-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: auto;
}

.file-upload {
  position: absolute;
  top: 5px;
  right: 20px;
  color: white;
  background-color: green;
  border-radius: 20px;
  height: 40px;
  width: 100px;
  text-align: center;
  padding-top: 8px;
  font-size: 18px;
  vertical-align: center;
  box-sizing: border-box;
}

.file-path {
  color: darkgray;
  width: 100%;
  height: 50px;
  margin-left: 2.5%;
  padding: 12px 0 12px;
}

.file-list {
  list-style-type: none;
  width: 100%;
  margin: 0 auto;
  padding: 0;
}

.file-list li {
  width: 95%;
  margin: 5px auto;
  padding: 5px;
  font-weight: bold;
  border: 1px solid cornflowerblue;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}

.file-download {
  border: none;
  height: 25px;
  color: white;
  background-color: cornflowerblue;
  border-radius: 5px;
  padding: 5px 15px;
}

.bg-red {
  background-color: red;
}

.no-files {
  width: 100%;
  margin: 0 auto;
  padding-left: 2.5%;
}
</style>
