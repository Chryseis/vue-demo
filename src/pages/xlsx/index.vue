<template>
  <div>xlsx</div>
</template>

<script>
const XLSX = require('xlsx');

function readWorkbookFromLocalFile(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(e) {
    if (xhr.status === 200) {
      const data = new Uint8Array(xhr.response);
      const workbook = XLSX.read(data, { type: 'array' });
      if (callback) callback(workbook);
    }
  };
  xhr.send();
}

readWorkbookFromLocalFile('/test.xlsx', workbook => workbook);

export default {
  name: 'index',
  method: {}
};
</script>

<style scoped></style>
