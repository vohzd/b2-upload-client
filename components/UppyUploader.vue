<template lang="html">
  <div class="">


    <div class="uppy"></div>

  </div>
</template>

<script>

import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import Tus from "@uppy/tus";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

export default {
  data(){
    return {
      uppy: null,
      imageThumbnails: []
    }
  },
  methods: {
    init(){
      this.uppy = new Uppy({ debug: false, autoProceed: false, restrictions: { allowedFileTypes: ['image/*', 'video/*'] } });
      this.uppy
        .use(Dashboard, {
          target: ".uppy",
          inline: true,
          replaceTargetContent: true,
          showProgressDetails: true,
          height: 470,
          metaFields: [
            { id: 'name', name: 'Name', placeholder: 'file name' },
            { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
          ],
          browserBackButtonClose: true
        })
        .use(Tus, { endpoint: 'http://localhost:1337/upload/', limit: 10, resume: true, chunkSize: 5242880, removeFingerprintOnSuccess: true  })
        .on("complete", (result) => { this.saveMetaData(result) })
    },
    toggleCrop(){
      this.needsCrop = !this.needsCrop;
    },
    upload(){
      console.log("get read.....");
      this.uppy.upload();
    },
    saveMetaData(result){
      console.log("SAVE TO DISK");
      console.log(result);
    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style lang="css" scoped>
</style>
