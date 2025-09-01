// ** React Imports
import { Suspense, lazy, useEffect, useState } from 'react'
import { useAuthCtx } from '@context/authContext'
// ** Utils
import { isUserLoggedIn } from '@utils'
import { useLayout } from '@hooks/useLayout'
import { useRouterTransition } from '@hooks/useRouterTransition'

// ** Custom Components
// import Spinner from '@components/spinner/Loading-spinner' // Uncomment if your require content fallback
import LayoutWrapper from '@layouts/components/layout-wrapper'

// ** Router Components
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'

// ** Routes & Default Routes
import { DefaultRoute, Routes as routes } from './routes'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import HorizontalLayout from '@src/layouts/HorizontalLayout'
import LoadingSpinner from '@components/spinner/Loading-spinner'

const Router = () => {
  // ** Hooks
  const [layout, setLayout] = useLayout()
  const [transition, setTransition] = useRouterTransition()
  const [loading, setLoading] = useState(true)
  const [authedUser, setAuthedUser] = useState()
  const [hasResetPassword, setHasResetPassword] = useState(true)
  const { userData, getAuth } = useAuthCtx()

  // ** Default Layout
  const DefaultLayout =
    layout === 'horizontal' ? 'HorizontalLayout' : 'VerticalLayout'

  // ** All of the available layouts
  const Layouts = { BlankLayout, VerticalLayout, HorizontalLayout }

  // ** Current Active Item
  const currentActiveItem = null

  // ** Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = []
    const LayoutPaths = []

    if (routes) {
      routes.filter((route) => {
        // ** Checks if Route layout or Default layout matches current layout
        if (
          route.layout === layout ||
          (route.layout === undefined && DefaultLayout === layout)
        ) {
          LayoutRoutes.push(route)
          LayoutPaths.push(route.path)
        }
      })
    }

    return { LayoutRoutes, LayoutPaths }
  }

  const NotAuthorized = lazy(() => import('@src/views/NotAuthorized'))

  // ** Init Error Component
  const Error = lazy(() => import('@src/views/Error'))

  // ** Return Route to Render
  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      // ** Convert Layout parameter to Layout Component
      // ? Note: make sure to keep layout and component name equal

      const LayoutTag = Layouts[layout]

      // ** Get Routes and Paths of the Layout
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout)

      // ** We have freedom to display different layout for different route
      // ** We have made LayoutTag dynamic based on layout, we can also replace it with the only layout component,
      // ** that we want to implement like VerticalLayout or HorizontalLayout
      // ** We segregated all the routes based on the layouts and Resolved all those routes inside layouts

      // ** RouterProps to pass them to Layouts
      const routerProps = {}

      return (
        <Route
          key={index}
          element={
            <LayoutTag
              routerProps={routerProps}
              layout={layout}
              // setLayout={setLayout}
              transition={transition}
              setTransition={setTransition}
              currentActiveItem={currentActiveItem}
            >
              <Outlet />
            </LayoutTag>
          }
        >
          {LayoutRoutes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact === true}
                element={
                  // ** Assign props to routerProps
                  // Object.assign(routerProps, {
                  //   ...props,
                  //   meta: route.meta,
                  // })
                  route.private && !authedUser ? (
                    <Navigate to="/login" />
                  ) : route.private && !hasResetPassword ? (
                    <Navigate to="/force-reset-password" />
                  ) : (
                    <Suspense fallback={null}>
                      {/* Layout Wrapper to add classes based on route's layout, appLayout and className */}
                      <LayoutWrapper
                        layout={DefaultLayout}
                        transition={transition}
                        setTransition={setTransition}
                        /* Conditional props */
                        /*eslint-disable */
                        {...(route.appLayout
                          ? {
                              appLayout: route.appLayout,
                            }
                          : {})}
                        {...(route.meta
                          ? {
                              routeMeta: route.meta,
                            }
                          : {})}
                        {...(route.className
                          ? {
                              wrapperClass: route.className,
                            }
                          : {})}
                        /*eslint-enable */
                      >
                        <route.component />
                        {/* <FinalRoute route={route} {...props} /> */}
                      </LayoutWrapper>
                    </Suspense>
                  )
                }
              />
            )
          })}
        </Route>
      )
    })
  }

  useEffect(() => {
    if (isUserLoggedIn()) {
      getAuth()
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (userData) {
      setLoading(false)
      setAuthedUser(isUserLoggedIn())
      setHasResetPassword(userData.hasResetPassword)
    }
  }, [userData])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      <Route exact path="/" element={<Navigate to={DefaultRoute} />} />
      {/* Not Auth Route */}
      <Route
        exact
        path="/not-authorized"
        element={
          <Layouts.BlankLayout>
            <Route component={NotAuthorized} />
          </Layouts.BlankLayout>
        }
      />
      {ResolveRoutes()}
      {/* NotFound Error page */}
      <Route path="*" element={Error} />/
    </Routes>
  )
}

export default Router
