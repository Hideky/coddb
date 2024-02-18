export const tinyMceConfig = {
  skin_url: '/tinymce-theme/ui/cod',
  height: 500,
  menubar: false,
  content_css: '/tinymce-theme/content/cod/content.css',
  plugins: [
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'preview',
    'help',
    'wordcount',
    'accordion',
  ],
  toolbar:
    'undo redo | blocks |' +
    'bold italic forecolor | alignleft aligncenter ' +
    'alignright alignjustify | link media image | bullist numlist outdent indent | table | ' +
    'removeformat | preview', //  | help
  content_style: 'body img.md\\:float-right{ float: right ; margin-left: 2.5rem;}',
  style_formats: [
    {
      title: 'Image Left',
      selector: 'img',
      styles: {
        float: 'left',
        margin: '0 10px 0 10px',
      },
    },
    {
      title: 'Image Right',
      selector: 'img',
      styles: {
        float: 'right',
        margin: '0 0 10px 10px',
      },
    },
  ],
  image_class_list: [
    { title: 'Left', value: '' },
    { title: 'Right', value: 'md:float-right ml-10' },
  ],
  branding: false,
}

export const tinyMceConfigDecree = {
  skin_url: '/tinymce-theme/ui/cod',
  height: 500,
  menubar: false,
  content_css: '/tinymce-theme/content/coddecree/content.css',
  content_style: "@import url('https://fonts.googleapis.com/css?family=Noto+Sans:300,400,500,600,700,800');",
  plugins: [
    'searchreplace',
    'wordcount',
  ],
  toolbar:
    'undo redo |' +
    'bold italic forecolor fontsizeinput',
  branding: false,
  elementpath: false,
  text_patterns: false as const,
  entity_encoding : "raw" as const,
  font_size_input_default_unit: "px",
  font_size_formats: '10px 14px 17px 20px 24px 28px 32px 36px',
  formats: {
    forecolor: {inline : 'label', styles : {color : '%value'}},
    // fontsize: {inline : 'font', attributes: {size : '%value'}},
  }
}
