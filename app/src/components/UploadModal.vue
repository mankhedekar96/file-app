<template>
  <section class="upload-modal">
    <div class="files-container">
      <div class="files-input">
        <label for="files"> Choose files </label>
        <input
          type="file"
          id="files"
          name="files"
          multiple
          @change="onSelectFile"
        />
      </div>
      <ul
        class="file-list scroll-view"
        v-if="!loading && files && files.length"
      >
        <li v-for="file in files" :key="file.name">
          <label>{{ file.name }}</label>
          <button @click="onCancel(file.name)" class="file-cancel">X</button>
        </li>
      </ul>
      <p v-if="loading">Still loading..</p>
      <p v-if="error"></p>
      <button @click="$emit('close')" class="file-close">X</button>
      <button @click="uploadFiles" class="file-upload-modal">Upload</button>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "UploadModal",
  data() {
    return {
      files: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    onSelectFile(e) {
      this.files = [...e.target.files];
    },

    onCancel(fileName) {
      this.files = this.files.filter((file) => file.name !== fileName);
    },

    uploadFiles() {
      // Will be implemented next
      this.loading = true;
      var formData = new FormData();
      this.files.forEach(file => {
        formData.append("files", file);
      });

      return axios
        .post("http://localhost:9000/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // set the response data
          console.log(response);
        })
        .catch((err) => {
          this.error = err;
          // In case a custom JSON error response was provided
          if (err.json) {
            return err.json.then((json) => {
              // set the JSON response message
              this.error.message = json.message;
            });
          }
        })
        .then(() => {
          this.loading = false;
          this.$emit('close');
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.upload-modal {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.5);
}

.scroll-view {
  height: calc(100% - 50px);
  overflow: auto;
}

.files-container {
  position: relative;
  width: 50%;
  height: 60%;
  margin: 5% auto;
  padding-top: 50px;
  background-color: white;
  box-shadow: 2px 2px 3px 0px darkgrey;
}

.file-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: cornflowerblue;
  color: white;
  border: none;
}

.file-upload-modal {
  position: absolute;
  bottom: 10px;
  left: calc(50% - 50px);
  width: 100px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  background-color: cornflowerblue;
  color: white;
}

.files-input input {
  display: none;
}

.files-input label {
  position: absolute;
  top: 10px;
  left: 10px;
  height: 30px;
  border-radius: 15px;
  background-color: cornflowerblue;
  color: white;
  padding: 5px 15px;
}

.file-cancel {
  border: none;
  background-color: transparent;
  color: red;
  font-weight: bolder;
}
</style>
