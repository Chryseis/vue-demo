module.exports = {
  configureWebpack: {
    entry: {
      main: './src/main.js',
      'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
    }
  }
};
