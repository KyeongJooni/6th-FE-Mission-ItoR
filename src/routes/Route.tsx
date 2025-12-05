import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '@/layout/Layout';
import { ErrorBoundary, LoadingSpinner } from '@/components';
import KakaoLogin from '@/components/auth/KakaoLogin';
import { PublicRoute } from '@/routes/PublicRoute';
import { PrivateRoute } from '@/routes/PrivateRoute';

const MainPage = lazy(() => import('@/pages/main/MainPage'));
const BlogDetailPage = lazy(() => import('@/pages/blog/BlogDetailPage'));
const BlogWritePage = lazy(() => import('@/pages/blog/BlogWritePage'));
const MyPage = lazy(() => import('@/pages/mypage/MyPage'));
const MyPageForm = lazy(() => import('@/components/mypage/MyPageForm'));
const MyProfileForm = lazy(() => import('@/components/mypage/MyProfileForm'));
const EditProfileForm = lazy(() => import('@/components/mypage/EditProfileForm'));
const SignupForm = lazy(() => import('@/components/mypage/SignupForm'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <MainPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'blog/:id',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <BlogDetailPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'blog/write',
        element: (
          <ErrorBoundary>
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <BlogWritePage />
              </Suspense>
            </PrivateRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: 'mypage',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <MyPage />
            </Suspense>
          </ErrorBoundary>
        ),
        children: [
          {
            index: true,
            element: (
              <PublicRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <MyPageForm />
                </Suspense>
              </PublicRoute>
            ),
          },
          {
            path: 'myprofile',
            element: (
              <PrivateRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <MyProfileForm />
                </Suspense>
              </PrivateRoute>
            ),
          },
          {
            path: 'editprofile',
            element: (
              <PrivateRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <EditProfileForm />
                </Suspense>
              </PrivateRoute>
            ),
          },
          {
            path: 'signup',
            element: (
              <PublicRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <SignupForm />
                </Suspense>
              </PublicRoute>
            ),
          },
        ],
      },
      {
        path: 'oauth/kakao/success',
        element: <KakaoLogin />,
      },
    ],
  },
]);

export default router;
