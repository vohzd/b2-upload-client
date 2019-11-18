<template lang="html">
  <div class="">
    <div class="for-DragDrop"></div>

    <!-- Progress bar #2 -->
    <div class="for-ProgressBar"></div>

    <button class="upload-button" @click="upload">Upload</button>

    <img :src="thumbnail" />
    <!-- Uploaded files list #2 -->
    <div class="uploaded-files">
      <h5>Uploaded files:</h5>
      <ol></ol>
    </div>
  </div>
</template>

<script>

import Uppy from "@uppy/core";
import "@uppy/core/dist/style.min.css";

import Tus from "@uppy/tus";
import DragDrop from "@uppy/drag-drop";
import ProgressBar from "@uppy/progress-bar";
import ThumbnailGenerator from "@uppy/thumbnail-generator";

export default {
  data(){
    return {
      uppy: null,
      thumbnail: null
    }
  },
  methods: {
    onSuccess(){
      console.log("success!");
    },
    init(){
      this.uppy = new Uppy({ debug: true, autoProceed: false });
      this.uppy
        .use(DragDrop, { target: '.for-DragDrop' })
        .use(Tus, { endpoint: 'https://master.tus.io/files/', limit: 10 })
        .use(ProgressBar, { target: '.for-ProgressBar', hideAfterFinish: false })
        .use(ThumbnailGenerator, {
          thumbnailWidth: 200,
          thumbnailHeight: 200,
          waitForThumbnailsBeforeUpload: false
        })
        .on('upload-success', this.onSuccess('.example-two .uploaded-files ol'));

      this.uppy.on('thumbnail:generated', (file, preview) => {
        this.thumbnail = preview;
        console.log("thumb");
      })
    },
    upload(){
      console.log("get read.....");
      this.uppy.upload();
    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style lang="css" scoped>
</style>
