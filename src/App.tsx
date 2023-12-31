import { Link, Outlet, useRoutes } from "react-router-dom";
import ClassComponentSample from "./pages/ClassComponentSample";
import FunctionComponentSample from "./pages/FunctionComponentSample";
import TodosFunctionComponent from "./pages/TodosFunctionComponent";

function App() {
  // uygulamadaki tüm js dosya pathleri useRoutes hook ile uygulamaya tanıtılır
  // routing dosyamız
 const routes =  useRoutes([{
  path:'',
  element: <div style={{padding:'10px'}}>
    <nav>
      <Link to="/" >Anasayfa</Link>
      {' '}
      <Link to="/home" >Anasayfa</Link>
      {' '}
      <Link to="/about">Hakkımızda</Link>
      {' '}
            {/* sayfalar yenilenmeden js üzerinden spa uygulama yönlendirme için kullandık */}
      {/* a href yerine Link kullanıyoruz */}
      <Link to='/class-component'>Class Component Örnek</Link>
      {' '}
      <Link to='/func-component'>Function Component Örnek</Link>
      {' '}
      <Link to="/todo-component">Todo Component Sample</Link>
    </nav>
    <main style={{padding:'10px'}}>
      <Outlet /> 
      {/* componentlerin layout girip çıkması için özel bir işaretleme kullandık */}
    </main>
  </div>,
  children: [
    {
      path:'',
      element: <HomeComponent />
    },
    {
      path:'home',
      element: <HomeComponent />
    },
    {
      path:'about',
      element:<>About Page</>
    },
    {
      path:'class-component',
      element: <ClassComponentSample title="React Class Component" />
    },
    {
      path:'func-component',
      element: <FunctionComponentSample title="React Function Component" />
    },
    {
      path:'todo-component',
      element:<TodosFunctionComponent />
    }
  ]

 }])

 return routes;
  
}

// dosya için bir component oluşturup referansını element olarak verebiliriz.
function HomeComponent() {
  return <>Home Page</>
}

export default App;
