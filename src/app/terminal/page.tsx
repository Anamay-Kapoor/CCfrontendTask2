'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './terminal.module.css';
import Image from 'next/image';
export default function TerminalPage() {
  const [departures, setDepartures] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tick, setTick] = useState<number>(0);
  //searcj query
  const [destQuery, setDestQuery] = useState<string>('');
  const [statusQuery, setStatusQuery] = useState<string>('');
  const [timeQuery, setTimeQuery] = useState<string>('');




  
  useEffect(() => {
    fetch('https://0201243d-ed25-4b62-8a3e-c376d4eef70a.mock.pstmn.io/departures', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setDepartures(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

 useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

    if (loading) {
    return <div className="text-[#00f2fe] text-4xl font-bold">Loading Terminal Matrix...</div>;
  }


  const currentSeconds = tick % 60;
  
  const processedRows = departures.map((d, index) => {
    const uniqueOffset = index * 10;
    const rowSeconds = (currentSeconds + uniqueOffset) % 60;

    let computedStatus = 'Recharging';
    let timeLeft = 0;

    if (rowSeconds >= 0 && rowSeconds < 10) {
      computedStatus = 'Boarding';
      timeLeft = 10 - rowSeconds;
    } else if (rowSeconds >= 10 && rowSeconds < 15) {
      computedStatus = 'Departing';
      timeLeft = 15 - rowSeconds;
    } else {
      computedStatus = 'Recharging';
      timeLeft = 60 - rowSeconds;
    }

    return {...d,computedStatus,timeLeft};
  });
  const filteredRows = processedRows.filter((row) => {
    const matchesDest = (row.destination || '').toLowerCase().includes(destQuery.toLowerCase());
    const matchesStatus = (row.computedStatus || '').toLowerCase().includes(statusQuery.toLowerCase());
    const matchesTime = (row.scheduledTime || '').toLowerCase().includes(timeQuery.toLowerCase());
    return matchesDest && matchesStatus && matchesTime;
  });


 
  if (loading) {
    return <div className="text-[#00f2fe] text-4xl font-bold">Loading Terminal Matrix...</div>;
  }
  

return (
 <>
     <link rel="icon" type="image/x-icon" href="logo.png"></link>
    
    

        <nav className={styles.NavigationBarType}>

          <div className={`${styles['nav-col']} ${styles['nav-left']}`}>
            <Image src="/logo.png" width={30} height={30} alt="logo" />
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

      <main style={{ padding: '40px' }}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              
              <th className={styles.th}>
                <div>Destination Hub</div>
                <input
                  type="text"
                  placeholder="Filter dest..."
                  value={destQuery}
                  onChange={(e) => setDestQuery(e.target.value)}
                />
              </th>
              
              <th className={styles.th}>Id</th>
              
              <th className={styles.th}>
                <div>Status</div>
                <input
                  type="text"
                  placeholder="Filter status..."
                  value={statusQuery}
                  onChange={(e) => setStatusQuery(e.target.value)}
                />
              </th>
              
              <th className={styles.th}>Time Remaining</th>
              
              <th className={styles.th}>
                <div>Details</div>
                <input
                  type="text"
                  placeholder="Filter departure..."
                  value={timeQuery}
                  onChange={(e) => setTimeQuery(e.target.value)}
                />
              </th>
            </tr>   
          </thead>
          <tbody className={styles.tbody}>
            {filteredRows.map((d) => (
              <tr className={styles.tr} key={d.id}>
                <td className={styles.td}>{d.destination}</td>
                <td className={styles.td}>{d.id}</td>
                <td className={styles.td} style={{ fontWeight: 'bold' }}>{d.computedStatus}</td>
                <td className={styles.td} style={{ fontFamily: 'monospace', color: '#00f2fe' }}>
                  {d.timeLeft}s
                </td>
                <td className={styles.td}>
                  <details>
                    <summary>View Link Metrics</summary>
                    <p>Origin: {d.originHub}</p>
                    <p>Scheduled Departure: {d.scheduledTime}</p>
                    <p>Transit Class Profile: {d.class}</p>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

     
        <div className="gallery-box">


<div className = {styles.FAQs}>
    <h2>Frequently Asked Questions</h2>
<details>
    <summary className = {styles.Question}>Q:What happens to my consciousness during molecular deconstruction?</summary>
    <div className = {styles.ans}>Aetheria Systems utilizes an advanced consciousness fragmentation system coupled with a continuous neural-flow network . The sensory perception of deconstruction is harmless. Customers will only feel a sensory dulling for approximately 0.000053 seconds during which the main areass of your conciousness is transferred.</div>
</details>

<details>
    <summary className ={styles.Question}>Q:What happens if the connection severs or becomes unstable during transfer?</summary>
    <div className = {styles.ans}>It is not possible for the connection to become unstable during the transfer window as neuro-className personal transfer couplers are deployed to make micro-adjustments and ensure safety.</div>
</details>
<details>
    <summary className = {styles.Question}>Q:How does Aetheria compare to legacy mechanical transit methods?</summary>
    <div className = {styles.ans}>There is no comparison. Burning fossil fuels to drag metal tubes through the dirt is a primitive relic of the past century. Aetheria does not travel across distance—we conquer it. We have rendered obstacles like oceans,borders, and time entirely obsolete.</div>
</details>
<details>
<summary className={styles.Question}>Q.Can I request a refund if my departure window faces a scheduling buffer?</summary>
  <div className={styles.ans}>
    Aetheria Systems is a triumph of human engineering, not a consumer entitlement.By booking with Aetheria, you are purchasing a privilege. Delays only occur to ensure your absolute protection. Refund requests will be permanently archived.Kindly do not load our esteemed customer service helpline with refund requests. Any and all attempts will suspend your access to this service for a set perioud of time.</div>
</details>
</div>
</div>
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
          <h2><Link href="https://instagram.com">📷 Instagram</Link></h2>
          <h2> 𝕏<Link href="https://x.com"><span className={styles.handleT}>Twitter</span></Link></h2>
          <h2>🌐<span className={styles.handle}> Matrix Space</span></h2>
        </div>
    </div>
    </>
  );
}












