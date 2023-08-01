import { useEffect, useMemo, useState } from "react";
import Home from "./view/Home";
import Search from "./view/Search";

const useSimpleRouter = () => {
  const [route, setRoute] = useState<'home' | 'search'>();

  useEffect(() => {
    const { location } = window;
    
    const updateLocation = () => {
      if(!location.hash) setRoute('home');
      else if(location.hash.startsWith('#search')) setRoute('search');
    };
    
    window.onhashchange = updateLocation;
    if(!route) updateLocation();
    
  }, [route]);
  
  return useMemo(() => {
    switch(route) {
      case 'search': return <Search />;
      default: return <Home />;
    }
  }, [route]);
};

function App() {
  const Page = useSimpleRouter();
  return <>{Page}</>;
}

export default App;