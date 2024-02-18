import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/SectionFullScreen'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/FormField'
import BaseDivider from '../components/BaseDivider'
import BaseButtons from '../components/BaseButtons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import { selectCurrentUser, setCredentials } from '../stores/authSlice'
import { colorsText } from '../colors'
import { AppThunkDispatch } from '../stores/store'
import Link from 'next/link'
import { useLoginMutation } from '../services/auth.service'
import { useSelector } from 'react-redux'

export default function Login() {
  const router = useRouter()
  const user = useSelector(selectCurrentUser)
  const [error, setError] = useState<string>();

  const [login, { isLoading }] = useLoginMutation()

  const initialValues = {
    username: '',
    password: '',
  }

  const dispatch = useDispatch<AppThunkDispatch>()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [dispatch])


  const handleLogin = async (values: {username: string, password: string}) => {
    try {
      const user = await login(values).unwrap()
      dispatch(setCredentials(user))
      router.push('/')
    } catch (err) {
      setError("Incorrect username and/or password.")
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen>
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik initialValues={initialValues} onSubmit={(values) => handleLogin(values)}>
            <Form>
              <FormField label="Username" help="Please enter your username">
                <Field name="username" required />
              </FormField>

              <FormField label="Password" help="Please enter your password">
                <Field name="password" type="password" required />
              </FormField>

              {error && (
                <div className={colorsText["danger"]}>
                  {error}
                </div>
              )}
              <BaseDivider />
              <BaseButtons className="flex">
                <BaseButton type="submit" label="Login" color="info" disabled={isLoading} />
                <Link href="register/" className={"text-sm align-left grow"}>
                  <p className='hover:text-stone-300'>Create a account</p>
                </Link>
                <BaseButton className="self-right" href="/" label="Back" color="info" outline />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}