<template lang="html">
  <div class="">
    <file-pond
      name="fileUploader"
      ref="fileUploader"
      label-idle="Drop file here..."
      :allow-multiple="false"
      instant-upload="false"
      allowImageCrop="true"
      :server="serverConfig"  />
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginImageCrop);

export default {
  components: {
    FilePond,
  },
  computed: {
    ...mapGetters([
      "serverEndpoint"
    ]),
    serverConfig() {
      return {
        url: `http://localhost:1337/upload`,
        process: {
          onload: async (meta) => {
            console.log(meta);
            //const newFileMeta = JSON.parse(meta).file;
            //console.log(newFileMeta);
            //await this.$axios.post(`http://localhost:1337/upload/`, fileMeta);

            setTimeout(() => {
              this.$refs.fileUploader.removeFile();
            }, 500);
          }
        },
      }
    },
  },
  methods: {
    ...mapActions([
      "saveNewFile"
    ])
  }
}
</script>

<style lang="css" scoped>
</style>
