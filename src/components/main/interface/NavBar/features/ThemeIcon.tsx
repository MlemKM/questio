import { useDispatch } from 'react-redux'
import { toggleDarkMode } from './../NavBarSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from '../../../../../store'
import {
  setLocalStorage,
  useLocalStorage,
} from '../../../../../hooks/useLocalStorage'
import { useEffect } from 'react'

const ThemeIcon = () => {
  const dispatch = useDispatch()
  const className = 'dark'
  const bodyClass = window.document.body.classList
  const dark = useSelector((state) => state.nav.isDark)
  const storage = useLocalStorage('dark-mode', 'true')

  useEffect(() => {
    if (dark != storage) {
      dispatch(toggleDarkMode())
      if (dark == 'true') bodyClass.remove(className)
      else bodyClass.add(className)
    }
  }, [bodyClass, dark, dispatch, storage])

  const modeToggleHandler = () => {
    dispatch(toggleDarkMode())
    if (dark == 'true') {
      bodyClass.remove(className)
      setLocalStorage('dark-mode', 'false')
      return
    }
    bodyClass.add(className)
    setLocalStorage('dark-mode', 'true')
  }

  return (
    <button onClick={modeToggleHandler}>
      <FontAwesomeIcon className="mx-6" icon={faMoon} />
    </button>
  )
}

export default ThemeIcon