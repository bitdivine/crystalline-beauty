import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { RainBackground } from './components/RainBackground';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <RainBackground />
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
