import { ReactNode, useEffect } from 'react'
import { useState } from 'react'
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js'
import menuAside from '../menuAside'
import menuNavBar from '../menuNavBar'
import BaseIcon from '../components/BaseIcon'
import NavBar from '../components/NavBar'
import NavBarItemPlain from '../components/NavBarItemPlain'
import AsideMenu from '../components/AsideMenu'
import { useRouter } from 'next/router'
import { gradiantBgArmory } from '../colors'
import { AppThunkDispatch } from '../stores/store'
import { useDispatch } from 'react-redux'
import { useGetArtifactsQuery } from '../services/db.service'

// import Error from 'next/error'

type Props = {
  children: ReactNode
}

export default function MainLayout({ children }: Props) {
  const dispatch = useDispatch<AppThunkDispatch>();
  const { data, isLoading, error } = useGetArtifactsQuery()

  const router = useRouter()

  const layoutAsidePadding = 'xl:pl-60'

  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false)
  const [isAsideLgActive, setIsAsideLgActive] = useState(false)

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsAsideMobileExpanded(false)
      setIsAsideLgActive(false)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [router.events, dispatch])

  return (
    <div className={`overflow-hidden lg:overflow-visible ${gradiantBgArmory}`}>
      <div
        className={`${layoutAsidePadding} ${
          isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''
        } pt-14 min-h-screen w-screen transition-position lg:w-auto text-stone-100`}
      >
        <NavBar
          menu={menuNavBar}
          className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''}`}
        >
          <NavBarItemPlain
            display="flex lg:hidden"
            onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
          >
            <BaseIcon path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger} size="24" />
          </NavBarItemPlain>
          <NavBarItemPlain
            display="hidden lg:flex xl:hidden"
            onClick={() => setIsAsideLgActive(true)}
          >
            <BaseIcon path={mdiMenu} size="24" />
          </NavBarItemPlain>
          {/* <NavBarItemPlain useMargin>
                <Formik
                  initialValues={{
                    search: '',
                  }}
                  onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
                >
                  <Form>
                    <FormField isBorderless isTransparent>
                      <Field name="search" placeholder="Search" />
                    </FormField>
                  </Form>
                </Formik>
              </NavBarItemPlain> */}
        </NavBar>
        {/* Side bar */}
        <AsideMenu
          isAsideMobileExpanded={isAsideMobileExpanded}
          isAsideLgActive={isAsideLgActive}
          menu={menuAside}
          onAsideLgClose={() => setIsAsideLgActive(false)}
        />
        {children}
        {/* <FooterBar>
          </FooterBar> */}
      </div>
    </div>
  )
}
