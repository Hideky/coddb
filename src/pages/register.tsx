import React, { useEffect } from 'react'
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
import { useState } from 'react'
import { selectCurrentUser, setCredentials } from '../stores/authSlice'
import { colorsText } from '../colors'
import { AppThunkDispatch } from '../stores/store'
import { useLoginMutation, useRegisterMutation } from '../services/auth.service'
import { useSelector } from 'react-redux'

export default function Register() {
  const router = useRouter()
  const user = useSelector(selectCurrentUser)
  const [error, setError] = useState<string>();
  const [register, { isLoading }] = useRegisterMutation()
  const [login, { isLoading: isLoginLoading }] = useLoginMutation()

  const initialValues = {
    username: '',
    email: '',
    password: '',
  }

  const dispatch = useDispatch<AppThunkDispatch>()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [dispatch])


  const handleRegister = async (values: {username: string, password: string, email: string}) => {
    try {
      await register(values).unwrap()
      const user = await login(values).unwrap()
      dispatch(setCredentials(user))
      router.push('/')
    } catch (err) {
      console.log(err)
      setError(err.data && err.data.password && err.data.password.join("\n"))
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen>
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik initialValues={initialValues} onSubmit={(values) => handleRegister(values)}>
            <Form className='whitespace-pre-line'>
              <FormField label="Username" help="Please enter your username">
                <Field name="username" required />
              </FormField>

              <FormField label="Email" help="Please enter your email">
                <Field name="email" type="email" required />
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
              <BaseButtons className="flex justify-between">
                <BaseButton type="submit" label="Register" color="info" disabled={isLoading || isLoginLoading} />
                <BaseButton className="self-right" href="/" label="Back" color="info" outline />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}