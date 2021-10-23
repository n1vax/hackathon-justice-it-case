import type { NextPage } from 'next'
import dynamic from 'next/dynamic';
// import App from '@components/layout/App'
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect } from 'react';
import { GOOGLE_API_KEY } from '@utils/config';

const App = dynamic(() => import('@components/layout/App'), {
  ssr: false
})


const AppPage: NextPage = () => {
  return <App />
}

export default AppPage
