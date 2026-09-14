'use client';
import React , {useState,useEffect} from 'react';
import Link from 'next/link';
import styles from './booking.module.css';
import Image from 'next/image';
export default function BookingsPage() {


//live counter variable

const [animatedTotal, setAnimatedTotal] = useState<number>(0);
//Usestate stuff
const [fullName, setFullName] = useState<string>('');
const [email, setEmail] = useState<string>('');
const [plan, setPlan] = useState<string>('single');
const [currentDestination, setcurrentDestination] = useState<string>('');
const [targetDestination, settargetDestination] = useState<string>('');
const [departure, setdeparture] = useState<string>('');
const [weight, setweight] = useState<number>(0);
const [tier, setTier] = useState<string>('standard');
const [liveTotal, setTotal] = useState<number>(0);
const planMulti: Record<string, number> = {
  'single': 1.0,
  'family': 0.85,
  'group': 0.75,
};
const tierMulti: Record<string, number> = {
  'standard': 1.0,
  'premium': 1.8,
};
const [nodes, setNodes] = useState<any[]>([]);
const [departures, setDepartures] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [weightLimit, setWeightLimit] = useState<boolean>(false);//extra



useEffect(()=>{
  if (nodes.length === 0 || departures.length === 0) {
    setTotal(0);
    return;
  }
  if (!currentDestination || !targetDestination) {
    setTotal(0);
    return;
  }
  if (weight > 500) {
    setWeightLimit(true); 
    setTotal(0); 
    return; 
  }
  setWeightLimit(false);

  let currentCost = 0;
  let targetCost = 0;
  if (currentDestination == targetDestination)
    {
      setTotal(0);
    }
    else{
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].name === currentDestination) {
      currentCost = nodes[i].baseFare;
    }
    if (nodes[i].name === targetDestination) {
      targetCost = nodes[i].baseFare;
    }
  }}

  const planDiscount = planMulti[plan] || 1.0;
  const classMultiplier = tierMulti[tier] || 1.0;
  const baggageextracharge = Math.max(0,(weight-50)*5); 
  
  const Total = (currentCost + targetCost) * planDiscount * classMultiplier + baggageextracharge;
  setTotal(Total);
},[nodes, departures, plan, currentDestination, targetDestination, weight, tier]);

//booking
const [isBooked, setisBooked] = useState<boolean>(false);
const [bookingId, setbookingId] = useState<string>('');
const BookingSubmission = (e: React.ChangeEvent) => {
  e.preventDefault();
  const generatedId = "#AE-" + (32903 + Math.floor(Math.random() * 4988302));
  setbookingId(generatedId);
  setisBooked(true);
}
//animation counter
useEffect(() => {
  let animationFrameId: number;
  const duration = 400;
  const startValue = animatedTotal;
  const endValue = liveTotal;
  const startTime = performance.now();

  const animate = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); //to increase progress linearly
    const nextValue = startValue + (endValue - startValue) * progress;
    setAnimatedTotal(nextValue);

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      setAnimatedTotal(endValue);
    }
  };

  animationFrameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(animationFrameId);
}, [liveTotal]);
//Using API


useEffect(() => {
  fetch('https://0201243d-ed25-4b62-8a3e-c376d4eef70a.mock.pstmn.io/nodes', { method: 'GET' })
    .then(res => res.json())
    .then(nodeData => {
      setNodes(nodeData);
      if (nodeData && nodeData.length > 0) {
        setcurrentDestination(nodeData[0].name);
        settargetDestination(nodeData[0].name);
      }

      fetch('https://0201243d-ed25-4b62-8a3e-c376d4eef70a.mock.pstmn.io/departures', { method: 'GET' })
        .then(res => res.json())
        .then(depData => {
          setDepartures(depData);
          if (depData && depData.length > 0) {
            setdeparture(depData[0].scheduledTime);
          }
          setIsLoading(false);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
   
}, []);


if (isLoading) {
  return (
    <div className="flex items-center justify-center p-15">
      <p className="text-[#00f2fe] text-4xl font-bold">Loading destination hubs data...</p>
    </div>
  );
}


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
       
<main className={styles.inputs}>
  <div className={styles.blob}>
   
    <span className={styles.blobanim}></span> Quantum Core Status : ONLINE
  </div>
  <h1>Quantum Jump Booking Details</h1>

 <form action="#" method="post" onSubmit={BookingSubmission}>
    <label htmlFor="Name" className={styles.formLabel}>Full Name</label>
    <input type="text" id="Name" className={styles.textInput} value={fullName}   onChange={(e) => setFullName(e.target.value)} placeholder="Kael Cipher" required />

    <label htmlFor="Email" className={styles.formLabel}>Email</label>
    <input type="text" id="Email" className={styles.emailInput} value={email}   onChange={(e) => setEmail(e.target.value)} placeholder="kaelcipher@quantumail.com" required />
    
  
    <label htmlFor="plan" className={styles.formLabel}>Travel Plan Profile</label>
    <select id="plan" className={styles.selectInput} value={plan} onChange={(ev) => setPlan(ev.target.value)}  required>
      <option value="" disabled>Choose your travel configuration...</option>
      <option value="single">Single Dispatch Fare</option>
      <option value="family">Family Pack of 4(Save 15%)</option>
      <option value="group">Friend Group Pack of 8 (Save 25%)</option>
    </select>
<label htmlFor="destination-current" className={styles.formLabel}>Current Destination Core</label>
<select 
  id="destination-current" className={styles.selectInput} value={currentDestination} onChange={(e) => setcurrentDestination(e.target.value)} required>
  {nodes.map(n => (
    <option key={n.id} value={n.name}>
      {n.name}
    </option>
  ))}
</select>

<label htmlFor="departure" className={styles.formLabel}>Select Departure Date & Time</label>

<select id="destination-target" className={styles.selectInput} value={targetDestination} onChange={(e) => settargetDestination(e.target.value)} required>
  {nodes.map(n => (
    <option key={n.id} value={n.name}>
      {n.name}
    </option>
  ))}
</select>

    
    <label htmlFor="departure" className={styles.formLabel}>Select Destination</label>
   <select id="departure" className={styles.selectInput} value={departure} onChange={(e) => setdeparture(e.target.value)} required>
  {departures.map(d => (
    <option key={d.id} value={d.scheduledTime}>
      {d.scheduledTime}
    </option>
  ))}
</select>

    <label htmlFor="weight" className={styles.formLabel}>Baggage Net Weight Load in Kilograms (max = 500kg)*</label>
    <input type="number" id="weight" value = {weight} onChange={(e) => setweight(Number(e.target.value))} className={styles.numberInput} placeholder="0" min="0"  required />
    
    <label className={styles.formLabel}>Transit Seating Class Profile</label>
    <div className={styles['checkbox-group']}>
      <input type="radio" id="standard" name="tier" value="standard" checked={tier === 'standard'}  onChange={(e) => setTier(e.target.value)} />
      <label htmlFor="standard">Standard</label>
      
      <input type="radio" id="premium" name="tier" checked={tier === 'premium'} onChange={(e) => setTier(e.target.value)} value="premium" />
      <label htmlFor="premium">First-Class</label>
    </div>
    
    <label className={styles.formLabel}>Safety Declarations</label>
    <div className={styles['checkbox-group']}>
      <label htmlFor="terms">
        <input type="checkbox" required /> {"I accept molecular state reconstruction terms. (read our terms and conditions)"}
      </label>
    </div> 
    <div className={styles['checkbox-group']}>
      <label htmlFor="terms">
        <input type="checkbox" required /> {"I acknowledge that all provided data is to the best of my knowledge."}
      </label>
    </div>
    <div className={styles['checkbox-group']}>
      <label htmlFor="terms">
        <input type="checkbox"  required /> {"I acknowledge and accept all data retention protocols. (read our privacy policy)"}
      </label>
    </div>
    <div className={styles.fareBox}>
  <h2 className={styles.fareTitle}>
    Fare Estimate: ${animatedTotal.toFixed(1)} Credits
  </h2>
</div>
    <button type="submit" className={styles.button}>Submit</button>
  </form>

{isBooked && (
  <div className={styles.bcBox}>
    <h2 className={styles.bcHead}>Booking Confirmed</h2>
    
<p className={styles.bcText}>================================================== </p>
<p className={styles.bcText}>          AETHERIA QUANTUM LINK MANIFEST       </p>
<p className={styles.bcText}>==================================================</p>
<p className={styles.bcText}>  TRANSACTION STATUS: CONFIRMED</p>
<p className={styles.bcText}>  REGISTRY ID:        ${bookingId}</p>
<p className={styles.bcText}>  TIMESTAMP:          ${new Date().toUTCString()}</p>
<p className={styles.bcText}>--------------------------------------------------</p>
<p className={styles.bcText}>  PASSENGER CREDENTIALS:</p>
<p className={styles.bcText}> Name:  {fullName}</p>
<p className={styles.bcText}> Email:  {email}</p>
  <p className={styles.bcText}></p>
<p className={styles.bcText}>  TRANSIT TELEMETRY:</p>
<p className={styles.bcText}>  Origin Node:      {currentDestination}</p>
<p className={styles.bcText}>  Destination Hub:  {targetDestination}</p>
<p className={styles.bcText}> Plan:             {plan}</p>
<p className={styles.bcText}> Quantum Class:    {tier.toUpperCase()}</p>
<p className={styles.bcText}>  Weight Carried:   {weight>50? 50:weight}+{Math.max(0,weight-50)}</p>
<p className={styles.bcText}>--------------------------------------------------</p>
<p className={styles.bcText}>  FINANCIAL ACCOUNTING:</p>
<p className={styles.bcText}>  Total Fare:${parseFloat(String(liveTotal)).toFixed(1)} Credits</p>
<p className={styles.bcText}>==================================================</p>
<p className={styles.bcText}>   Thank you for choosing Aetheria Transit Node.  </p>
<p className={styles.bcText}>    jump parameters committed.   </p>
<p className={styles.bcText}>==================================================</p>
   
    
    <div className={styles.bcIdBox}>
      <span>ID: </span>
      <strong>{bookingId}</strong>
    </div>

    <button type="button"  onClick={() => {setisBooked(false);setbookingId('');  }} className={styles.bcBtn}>
      OK
    </button>
  </div>
)}
 
 <details>
  <summary className={styles.TAC}>Our Terms and Conditions</summary>
  <div className={styles.terms}>
    <h2>1. OPERATIONS AND MOLECULAR CONCURRENCE</h2>
    <p>Aetheria provides <span className={styles.highlight}>localized, point-to-point </span>transit across various sectors. We<span className={styles.highlight}> do not transport physical bodies</span> through quantum space. Our systems maps subatomic profiles, transmit the compiled data packet over a closed and secured quantum network, and <span className={styles.highlight}> reconstruct a neurological match</span> at the designated Earth terminal. By initiating transit, you <span className={styles.highlight}>grant authorization for the absolute deconstruction of your baseline molecular form</span> at the origin terminal and absolute reconstruction at target terminal.</p>
    
    <h2>2. BIO-COHERENCE SCREENING</h2>
    <p>Terrestrial passengers <span className={styles.highlight}>must pass a pre-jump biometric scan</span>. Access is denied to individuals presenting unstable neural implants or unshielded cardiac equipment.<span className={styles.highlight}> Aetheria reserves the right to terminate or blacklist your license to services</span> without notice or explanation if screening indicates equipment capable of tampering with synchronisations.</p>
    
    <h2>3. LIABILITY LIMITATION AND CLASSIFIED DISPUTE RESOLUTION</h2>
    <p>Aetheria, its unlisted parent entities and private anonymous benefactors will <span className={styles.highlight}>not be responsible for any transit-related injuries</span> including <span className={styles.highlight}>physical or psychological trauma</span> or <span className={styles.highlight}>permanent change in biological signature </span>. All disputes will be <span className={styles.highlight}>handled through private networks</span>.</p>
    
    <h2>4. COMPULSORY NON-DISCLOSURE AGREEMENT</h2>
    <p>All aspects of Aetheria transport - including our molecular deconstruction and reconstruction methods, transit line networks,terminal coupling frequencies are all classified corporate intel. You are strictly<span className={styles.highlight}> prohibited from documenting ,publishing or describing </span>any part of our system to third party companies. Any breach in confidentiality will <span className={styles.highlight}>result in blaclisting of your license to future access</span> of transit networks.</p>
    
    <h2>5. MANDATORY IMAGE PROTECTION AGREEMENT</h2>
    <p>You are strictly prohibited from generating, publishing, or sharing any digital or physical content—including reviews, audio-visual captures, or opinionated commentary—that directly or indirectly damages the corporate reputation of Aetheria.<span className={styles.highlight}>agree to create public content exclusively for the purpose of promoting Aetheria </span> efficiency and safety. Any <span className={styles.highlight}>unapproved disclosure or negative portrayal</span> of Aetheria systems will result in <span className={styles.highlight}>immediate legal action</span>. All disclosure material is <span className={styles.highlight}>to be submitted for review</span>.</p>
  </div>
</details>

<details>
  <summary className={styles.TAC}>Our Privacy Policy</summary>
  <div className={styles.terms}>
    <h2>1. WHAT DATA WE TAKE</h2>
    <p>To move you instantly, we must scan your whole body and mind. We record your <span className={styles.highlight}>synaptic brain maps</span> to check your memories after you arrive. We also scan your <span className={styles.highlight}>molecular signatures</span> and cellular stability before you jump, and keep logs of your exact departure coordinates.</p>

    <h2>2. HOW LONG WE KEEP IT</h2>
    <p>Your full physical profile and mind data stay inside our <span className={styles.highlight}>quantum matrix buffer</span> for forty-eight hours to fix any landing errors. After that, your physical file is deleted. However, a locked mathematical code of your <span className={styles.highlight}>molecular signature</span> is kept forever so no one can clone your identity.</p>

    <h2>3. WHO WE SHARE IT WITH</h2>
    <p>We never sell your brain maps or biological data to normal companies. But we will share your tracking data, genetic anomalies, and mental profiles with <span className={styles.highlight}>terrestrial security agencies</span> and network operators.</p>

    <h2>4. YOUR DATA RIGHTS</h2>
    <p>You can look at your regular account history, but you cannot see or delete your locked neural code. Because your profile keeps the network safe, all biological files are marked as <span className={styles.highlight}>classified corporate assets</span> and cannot be removed.</p>
  </div>
</details>




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
        

   
        {weightLimit && ( //boolean overlay
  <div className={styles.wlOverlay}> 
    <div className={styles.wlBox}>
      <h2 className={styles.wlHead}>⚠️Weight limit exceeded</h2>
      <p className={styles.wlText}>you have exceeded weight limit of 500kg</p>
      <button 
        type="button" 
        onClick={() => {
          setweight(500); 
          setWeightLimit(false); 
        }} 
        className={styles.wlBtn}
      >
        OK
      </button>
    </div>
  </div>
 
  )}
</>
);
}