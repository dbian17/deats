import {get_test_data} from './client/flask-client'

export default async function Home() {
  return (

        <div> {await get_test_data()}</div> 
  )
}
