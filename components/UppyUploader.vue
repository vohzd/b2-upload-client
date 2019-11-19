<template lang="html">
  <div class="">
    <button @click="test">Test Backblaze</button>
    <!--<div class="uppy"></div>-->
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
      imageThumbnails: [],
      fileMeta: []
    }
  },
  methods: {
    init(){
      //restrictions: { allowedFileTypes: ['image/*', 'video/*', 'audio/*'] }
      /*
      this.uppy = new Uppy({ debug: false, autoProceed: false  });
      this.uppy
        .use(Dashboard, {
          target: ".uppy",
          inline: true,
          replaceTargetContent: true,
          showProgressDetails: true,
          height: 470,
          browserBackButtonClose: true
        })
        .use(Tus, { endpoint: 'http://localhost:1337/upload/', limit: 10, resume: true, chunkSize: 5242880, removeFingerprintOnSuccess: true  })
        .on("complete", (result) => { this.saveMetaData(result) })
        */
    },
    async test(){
      const fileReq = await this.$axios.post("http://localhost:1337/save-file");
      console.log(fileReq);
    },
    toggleCrop(){
      this.needsCrop = !this.needsCrop;
    },
    upload(){
      console.log("get read.....");
      this.uppy.upload();
    },
    async saveMetaData(result){
      result.successful.forEach(async (v, i) => {
        console.log("looping...");
        let fileReq = await this.$axios.post("http://localhost:1337/save-file", {
          "file":
            {
              "fileName": v.data.name,
              "fileSize": v.data.size,
              "fileType": v.data.type,
              "fileExtension": v.extension,
              "fileExif": v.data.exifdata,
              "fileId": v.uploadURL.split("/upload/files/")[1]
            }
          });
        console.log(fileReq);
      });


      // now upload to express

    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style lang="css" scoped>
</style>
