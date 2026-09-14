// src/app/page.tsx
import Link from 'next/link';
import styles from './index.module.css';
import Image from 'next/image';

export default function IndexPage() {
  return (
  <>
      <link rel="icon" type="image/x-icon" href="logo.png"></link>
    
    

       <nav className={styles.NavigationBarType}>

          <div className={`${styles['nav-col']} ${styles['nav-left']}`}>
            <Image 
                src="/logo.png" 
                 width={30} 
                    height={30} 
                      alt="logo" 
                              />
            </div>


          <div className={`${styles['nav-col']} ${styles['nav-center']}`}>
            <Link href="/" className={styles.logo} title="Go to Home Page">AETHERIA</Link>
          </div>


          <div className={`${styles['nav-col']} ${styles['nav-right']}`}>
            <div className={styles['navig-links']}>
              <Link href="/" title="Home Page">Home</Link>
              <Link href="/terminal" title="Learn About Us">Terminal</Link>
              <Link href="/booking" title="Book your Next Jump">Bookings</Link>
            </div>
          </div>
        </nav>

        <header className={styles.HeroSection}>
          <h1>Travel <span className={styles.keywords}>Anywhere</span> <span className={styles.keywords}>Anytime</span> <span className={styles.keywords}>Instantly</span></h1>
         <p>{"The world's first ever teleportation network."}</p>

          <Link href="/booking">Book your Next Jump</Link>
        </header>

        <main className={styles['features-box']}>
          <h2>Why Us?</h2>
          <div className={styles.FeatureGrid}>
            <div className={styles['flex-card']}>
              <h3>Zero Travel Time</h3>
              <p>Arrive in <span className={styles.highlight}>zero time </span> regardless of location.</p>
            </div>
            <div className={styles['flex-card']}>
              <h3>Luxury Lounges</h3>
              <p><span className={styles.highlight}>Relax comfortably in the luxury suites</span> while waiting for your signature atomic profile to be prepared.</p>
            </div>
            <div className={styles['flex-card']}>
              <h3>Safety comes first for us</h3>
              <p>Our advanced micro-adjusters <span className={styles.highlight}>ensure utmost care</span> in capturing your complete physical structure.</p>
            </div>
          </div>

        </main>

        <div className={styles.QueriesHandles}>
          <div className={styles.Queries}>
            <h1>For Queries , Contact:</h1>
            <h2>📞+3279203283005</h2>
            <h2>📞+3279203283006</h2>
            <h2>📞+3279203283007</h2>
            <h2>📞+3279203283008</h2>


          </div>
          <div className={styles.Handles}>
            <h1>Follow us for Updates:</h1>
            <h2><Link href="https://instagram.com" title="Check us out on Instagram">📷 Instagram</Link></h2>
            <h2> 𝕏<Link href="https://x.com" title="Check us out on Twitter"><span className={styles.handleT}>Twitter</span> </Link></h2>
            <h2>🌐<span className={styles.handle} title="Check us out on Matrix Space">   Matrix Space</span> </h2>



          </div>
        </div>

      </>


  );
}
