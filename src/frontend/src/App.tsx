import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { HailBackground } from './components/HailBackground';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <HailBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Gallery />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
