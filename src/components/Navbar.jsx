import { Link, useLocation } from 'react-router-dom'
import { IconHome, IconSearch } from '../icons/Icons'

export const Navbar = () => {
  const location = useLocation()

  return (
    <nav className='bg-groundColor w-full h-28 rounded-lg pl-[17px] flex flex-col justify-evenly p-2'>
      <ul className='flex flex-col h-full gap-2 w-full justify-evenly'>
        <li>
          <Link
            to='/'
            className={`${
              location.pathname === '/'
                ? 'opacity-100'
                : 'opacity-75 hover:opacity-100'
            } flex gap-5 font-bold text-base scale-100 text-textWhite items-center  transition-opacity p-2 duration-200`}
          >
            <figure className='scale-100'>
              <IconHome />
            </figure>
            <span>Inicio</span>
          </Link>
        </li>

        <li>
          <Link
            to='#'
            className='flex opacity-75 gap-5 font-semibold text-base text-textWhite items-center hover:opacity-100 transition-opacity p-2 duration-200'
          >
            <figure className='scale-95'>
              <IconSearch />
            </figure>
            <span>Buscar</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
