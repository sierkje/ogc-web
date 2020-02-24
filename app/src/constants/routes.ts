import AboutUs from '../components/Routes/AboutUs'
import Blog from '../components/Routes/Blog'
import ContactUs from '../components/Routes/ContactUs'
import Resources from '../components/Routes/Resources'

interface Route {
  path?: string
  exact?: boolean
  component: React.FC
  weight: number
  menu: { label: string; weight: number }
}

const routes: Record<string, Route> = {
  about: {
    path: '/about',
    component: AboutUs,
    weight: 0,
    menu: { label: 'About', weight: 1 },
  },
  blog: {
    path: '/blog',
    component: Blog,
    weight: 0,
    menu: { label: 'Blog', weight: 1 },
  },
  contact: {
    path: '/contact',
    component: ContactUs,
    weight: 0,
    menu: { label: 'Contact', weight: 1 },
  },
  resources: {
    path: '/resources',
    component: Resources,
    weight: 0,
    menu: { label: 'Resources', weight: 2 },
  },
}

export default routes
