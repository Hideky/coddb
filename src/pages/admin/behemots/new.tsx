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
import CardBox from '../../../components/CardBox'
import CardBoxComponentBody from '../../../components/CardBoxComponentBody'
import CardBoxComponentFooter from '../../../components/CardBoxComponentFooter'

const BehemotsEditor = () => {
  const [addGuide, { isLoading: isUpdating }] = useAddGuideMutation()
  const router = useRouter()
  const editorRef = useRef(null)

  const initialValues = {
    title: '',
    img_preview: '',
    visible: false,
    content: '',
  }

  const handlePost = (values) => {
    const { title, img_preview, visible } = values
    const content = editorRef.current.getContent()

    addGuide({ title, img_preview, visible, content })
      .unwrap()
      .then(() => {
        router.push('./')
      })
  }

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Create Behemots Guide')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBookOpenVariant} title="Behemots Editor" />
        <Formik initialValues={initialValues} onSubmit={(values) => handlePost(values)}>
          <Form>
            <div className="flex mb-2">
              <InlineFormField className="basis-3/5 mr-4" label="Title" name="title" required />
              <InlineFormField
                className="basis-2/5 ml-4"
                label="Image Preview"
                name="img_preview"
                help="Image used in the behemots gallery"
              />
              <InlineFormField
                className="basis-10 ml-4"
                label="Visible"
                checkbox={true}
                name="visible"
              />
            </div>

            <CardBox className="mt-4" hasComponentLayout>
              <CardBoxComponentBody>
                <div className="flex place-content-center">
                  <h2 className="block mb-4 text-lg text-center font-medium text-white">
                    {'Composition'}
                  </h2>
                </div>
                <div className="flex mb-2">
                  <InlineFormField
                    className="basis-2/5 ml-4"
                    label="Tank"
                    name="composition_tank"
                  />
                  <InlineFormField
                    className="basis-2/5 ml-4"
                    label="Archer"
                    name="composition_archer"
                  />
                  <InlineFormField
                    className="basis-2/5 ml-4"
                    label="Mage"
                    name="composition_mage"
                  />
                </div>
                <div className="flex mb-2">
                  <InlineFormField
                    className="basis-2/5 ml-4"
                    label="Artifact(s) Tank"
                    name="artifact_tank"
                  />
                  <InlineFormField
                    className="basis-2/5 ml-4"
                    label="Artifact(s) Archer"
                    name="artifact_archer"
                  />
                  <InlineFormField
                    className="basis-2/5 ml-4"
                    label="Artifact(s) Mage"
                    name="artifact_mage"
                  />
                </div>
              </CardBoxComponentBody>
            </CardBox>

            <CardBox className="mt-4" hasComponentLayout>
              <CardBoxComponentBody>
                <div className="flex place-content-center">
                  <h2 className="block mb-4 text-lg text-center font-medium text-white">
                    {'Skills'}
                  </h2>
                </div>
                <div className="flex mb-2">
                  <InlineFormField className="basis-2/5 ml-4" label="Name" name="skill_name" />
                  <InlineFormField className="basis-2/5 ml-4" label="Role" name="skill_role" />
                  <InlineFormField className="basis-2/5 ml-4" label="Icon" name="skill_icon" />
                  <InlineFormField
                    className="basis-1/5 ml-4"
                    label="Phase/Intermission"
                    checkbox={true}
                    name="skill_is_phase"
                  />
                </div>
                <div className="flex mb-2">
                  <InlineFormField
                    className="basis-4/5 ml-4"
                    label="Details"
                    name="skill_details"
                  />
                  <InlineFormField className="basis-1/5 ml-4" label="Image" name="skill_image" />
                </div>
              </CardBoxComponentBody>
            </CardBox>

            {/* <Editor
              tinymceScriptSrc={'/tinymce/tinymce.min.js'}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={initialValues.content}
              init={tinyMceConfig}
            /> */}

            <BaseButtons className="flex flex-row-reverse mt-2">
              <BaseButton type="submit" label="Create" color="lightDark" disabled={isUpdating} />
            </BaseButtons>
          </Form>
        </Formik>
      </SectionMain>
    </>
  )
}

export default BehemotsEditor
