app.component('file-view', {
    template: 
    /* html */
    `<div class="file-view-container">
        <div class="file-path"> File / File1 /</div>
        <div class="file-upload">
            <label for="files">Upload</label>
            <input type="file" id="files" name="files" multiple>
        </div>
        <ul class="file-list" v-for="file in files">
            <li>{{ file }}</li>
        </ul>
    </div>`,

    data() {
        return {
            files: [ 'File1.jpg', 'File2.jpg', 'File3.jpg']
        }
    }
})