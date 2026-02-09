import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Menu } from './sections/Menu';
import { Gallery } from './sections/Gallery';
import { Location } from './sections/Location';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

function App() {
  return (
    <div className="bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Location />
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default App;