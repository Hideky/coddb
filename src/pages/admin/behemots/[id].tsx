import { mdiBookOpenVariant } from '@mdi/js'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import SectionMain from '../../../components/SectionMain'
import SectionTitleLineWithButton from '../../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../../config'
import { Editor } from '@tinymce/tinymce-react'
import { Form, Formik } from 'formik'
import BaseButtons from '../../../components/BaseButtons'
import BaseButton from '../../../components/BaseButton'
import InlineFormField from '../../../components/InlineFormField'
import { useRouter } from 'next/router'
import { useUpdateGuideMutation, useDeleteGuideMutation, useLazyGetGuideQuery } from '../../../services/db.service'
import CardBoxModal from '../../../components/CardBoxModal'
import { tinyMceConfig } from '../../../componentsConfig'

const GuideEditor = () => {
  const router = useRouter()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [updateGuide, { isLoading: isUpdating }] = useUpdateGuideMutation()
  const [deleteGuide, { isLoading: isDeleting }] = useDeleteGuideMutation()
  const [getGuide, { data, isLoading, error }] = useLazyGetGuideQuery()

  const editorRef = useRef(null);

  useEffect(() => {
    if (router.isReady) {
      getGuide(router.query.id.toString())
    }
  }, [router.isReady])


  const handleUpdate = (values) => {
    const { title, img_preview, visible } = values
    const content = editorRef.current.getContent();

    updateGuide({ id: data.id, title, img_preview, visible, content })
      .unwrap()
      .then(() => {
        // Message update réussi
        // router.push('./')
      })
  }

  const handleDelete = () => {
    deleteGuide(data.id)
      .unwrap()
      .then(() => {
        // Guide supprimé, un toast serais cool
        router.push('./')
      })
  }

  return (!isLoading && data &&
    <>
      <Head>
        <title>{getPageTitle('Guide Editor')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBookOpenVariant} title="Guide Editor" />
        <Formik initialValues={{
          title: data.title,
          img_preview: data.img_preview,
          visible: data.visible,
          content: data.content,
        }} onSubmit={(values) => handleUpdate(values)}>
          <Form>
            <div className='flex mb-2'>
              <InlineFormField className="basis-3/5 mr-4" label="Title" name="title" required />
              <InlineFormField className="basis-2/5 ml-4" label="Image Preview" name="img_preview" help="Image used in the guides gallery" />
              <InlineFormField className="basis-10 ml-4" label="Visible" checkbox={true} name="visible" />
            </div>

            <Editor
              tinymceScriptSrc={'/tinymce/tinymce.min.js'}
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue={data.content}
              disabled={isUpdating}
              init={tinyMceConfig}
            />

            <BaseButtons className="flex flex-row-reverse justify-between mt-2 mb-2">
              <BaseButton type="submit" label="Update" color="lightDark" disabled={isUpdating} />
              <BaseButton onClick={() => setIsDeleteModalOpen(true)} label="Delete" color="danger" disabled={isUpdating} />
            </BaseButtons>
          </Form>
        </Formik>
        <CardBoxModal
          title="Please confirm action"
          buttonColor="danger"
          buttonLabel="Confirm"
          isActive={isDeleteModalOpen}
          onConfirm={() => handleDelete()}
          onCancel={() => setIsDeleteModalOpen(false)}
        >
          {"Do you really want to delete this?"}
        </CardBoxModal>
      </SectionMain>
    </>
  )
}

export default GuideEditor
