import {get_test_data} from './client/flask-client'

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (

        <div> {await get_test_data()}</div> 
  )
}
