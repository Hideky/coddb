import { mdiBookOpenVariant } from '@mdi/js'
import Head from 'next/head'
import { useRef } from 'react'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle } from '../config'
import { Editor } from '@tinymce/tinymce-react'
import { Form, Formik } from 'formik'
import BaseButtons from '../components/BaseButtons'
import BaseButton from '../components/BaseButton'
import { tinyMceConfigDecree } from '../componentsConfig'
import { rgbToHex } from '../colors'
import { toast } from 'react-toastify'

const DecreeEditor = () => {
  const editorRef = useRef(null);

  const handleCopyContent = (values) => {
    let content = editorRef.current.getContent();

    // Transform <span style="font-size: x"> to <size=x>
    const regSize = /<span style="font-size: (\d{1,2})px;">/g;
    let result;
    let tempContent = content

    while ((result = regSize.exec(content)) !== null) {
      // Conversion px to pt ?
        tempContent = tempContent.replace(result[0], `<size=${result[1]}>`)
    }
    content = tempContent
    content = content.replaceAll('</span>', '</size>')

    // Transform <label style="font-size: x"> to <size=x>
    const regColor = /<label style="color: rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\);">/g;
    tempContent = content
    while ((result = regColor.exec(content)) !== null) {
      tempContent = tempContent.replace(result[0], `<color=${rgbToHex(result[1], result[2], result[3])}>`)
    }
    content = tempContent
    content = content.replaceAll('</label>', '</color>')

    // Transform <em> to <i>
    content = content.replaceAll('</em>', '</i>')
    content = content.replaceAll('<em>', '<i>')


    // Transform <strong> to <b>
    content = content.replaceAll('</strong>', '</b>')
    content = content.replaceAll('<strong>', '<b>')

    // Remove <p></p>
    content = content.replaceAll('</p>', '')
    content = content.replaceAll('<p>', '')

    content = content.replaceAll('<br>', '\n')

    // replace nbsp with space
    content= content.replace(/&nbsp;/g, ' ');

    navigator.clipboard.writeText(content)
    toast.success('📋 Decree copied to your clipboard', {
      position: "top-center",
      theme: "dark",
    });
    return content
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Decree Editor')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBookOpenVariant} title="Decree Editor" />
        <Formik initialValues={{}} onSubmit={(values) => handleCopyContent(values)}>
          <Form>
            <Editor
              tinymceScriptSrc={'/tinymce/tinymce.min.js'}
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue={""}
              init={tinyMceConfigDecree}
            />

            <BaseButtons className="flex flex-row-reverse justify-between mt-2 mb-2">
              <BaseButton type="submit" label="Copy Content" color="success"/>
            </BaseButtons>
          </Form>
        </Formik>
      </SectionMain>
    </>
  )
}

export default DecreeEditor
