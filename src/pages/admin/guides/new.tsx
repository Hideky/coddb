import { mdiBookOpenVariant } from '@mdi/js'
import Head from 'next/head'
import { useRef } from 'react'
import SectionMain from '../../../components/SectionMain'
import SectionTitleLineWithButton from '../../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../../config'
import { Editor } from '@tinymce/tinymce-react'
import { Form, Formik } from 'formik'
import BaseButtons from '../../../components/BaseButtons'
import BaseButton from '../../../components/BaseButton'
import InlineFormField from '../../../components/InlineFormField'
import { useRouter } from 'next/router'
import { useAddGuideMutation } from '../../../services/db.service'
import { tinyMceConfig } from '../../../componentsConfig'

const GuideEditor = () => {
  const [addGuide, { isLoading: isUpdating }] = useAddGuideMutation()
  const router = useRouter()
  const editorRef = useRef(null);

  const initialValues = {
    title: '',
    img_preview: '',
    visible: false,
    content: '',
  }

  const handlePost = (values) => {
    const { title, img_preview, visible } = values
    const content = editorRef.current.getContent();

    addGuide({ title, img_preview, visible, content })
      .unwrap()
      .then(() => {
        router.push('./')
      })
  }

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('Create Guide')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBookOpenVariant} title="Guide Editor" />
        <Formik initialValues={initialValues} onSubmit={(values) => handlePost(values)}>
          <Form>
            <div className='flex mb-2'>
              <InlineFormField className="basis-3/5 mr-4" label="Title" name="title" required />
              <InlineFormField className="basis-2/5 ml-4" label="Image Preview" name="img_preview" help="Image used in the guides gallery" />
              <InlineFormField className="basis-10 ml-4" label="Visible" checkbox={true} name="visible" />
            </div>

            <Editor
              tinymceScriptSrc={'/tinymce/tinymce.min.js'}
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue={initialValues.content}
              init={tinyMceConfig}
            />

            <BaseButtons className="flex flex-row-reverse mt-2">
              <BaseButton type="submit" label="Create" color="lightDark" disabled={isUpdating} />
            </BaseButtons>
          </Form>
        </Formik>
      </SectionMain>
    </>
  )
}

export default GuideEditor
