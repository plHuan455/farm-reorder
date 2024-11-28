import { Outlet } from 'react-router-dom'

export default function Empty() {
  return (
    <div className='fixed inset-0'>
      <Outlet />
    </div>
  )
}
