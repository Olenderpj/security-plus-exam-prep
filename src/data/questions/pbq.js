// Performance-based and exhibit questions.
// d = domain, t = type ('match' | 'order' | default multiple choice), x = exhibit text
// match: items = [label, correctChoice, ownChoices?], choices = shared choice list
// order: items listed in the CORRECT order (shuffled at runtime)
export default [
  // ───────────── Domain 1 ─────────────
  {
    d: 1, t: 'match', o: '1.1',
    q: 'Match each security measure to the control type it BEST represents.',
    choices: ['Preventive', 'Detective', 'Corrective', 'Deterrent', 'Compensating', 'Directive'],
    items: [
      ['Bollards in front of the building entrance', 'Preventive'],
      ['Reviewing CCTV footage after a break-in', 'Detective'],
      ['Restoring a server from backup after ransomware', 'Corrective'],
      ['"Trespassers will be prosecuted" signs', 'Deterrent'],
      ['Isolating an unpatchable legacy system on its own VLAN', 'Compensating'],
      ['An acceptable use policy employees must follow', 'Directive']
    ],
    e: 'Preventive stops an event, detective identifies it, corrective fixes the impact, deterrent discourages, compensating substitutes for a control that cannot be used, and directive tells people what to do.'
  },
  {
    d: 1, t: 'match', o: '1.4',
    q: 'A security engineer must meet several requirements. Match each requirement to the BEST cryptographic technique.',
    choices: ['Hashing', 'Full-disk encryption', 'Digital signature', 'Tokenization', 'Key stretching', 'Steganography'],
    items: [
      ['Confirm a downloaded file was not modified', 'Hashing'],
      ['Protect data on a laptop if it is stolen', 'Full-disk encryption'],
      ['Prove who sent an email and prevent denial', 'Digital signature'],
      ['Replace card numbers in a database with random values', 'Tokenization'],
      ['Make offline password cracking slower', 'Key stretching'],
      ['Conceal a message inside an image file', 'Steganography']
    ],
    e: 'Hashing = integrity; FDE = data at rest; digital signatures = authenticity and non-repudiation; tokenization = substitution; key stretching (bcrypt, PBKDF2) = slower brute force; steganography = hiding data.'
  },
  {
    d: 1, t: 'match', o: '1.2',
    q: 'Classify each zero trust component by the plane in which it operates.',
    choices: ['Control plane', 'Data plane'],
    items: [
      ['Policy engine', 'Control plane'],
      ['Policy administrator', 'Control plane'],
      ['Adaptive identity', 'Control plane'],
      ['Policy enforcement point', 'Data plane'],
      ['Implicit trust zones', 'Data plane'],
      ['Subject/system', 'Data plane']
    ],
    e: 'The control plane makes and communicates decisions (policy engine, policy administrator, adaptive identity, threat scope reduction). The data plane carries traffic and enforces decisions (PEP, subjects, implicit trust zones).'
  },
  {
    d: 1, t: 'order', o: '1.4',
    q: 'A web administrator needs a publicly trusted TLS certificate for a new server. Place the steps in the correct order.',
    items: [
      'Generate a public/private key pair on the server',
      'Create a certificate signing request (CSR)',
      'Submit the CSR to the certificate authority',
      'The CA validates the requester\'s identity/domain',
      'The CA issues the signed certificate',
      'Install the certificate on the web server'
    ],
    e: 'The key pair is created first; the CSR carries the public key; the CA validates and signs; the certificate is then installed. The private key never leaves the server.'
  },
  {
    d: 1, t: 'order', o: '1.3',
    q: 'Place the following change management activities in the order they should occur.',
    items: [
      'Submit a change request',
      'Perform an impact analysis and write a backout plan',
      'Obtain approval from the change advisory board',
      'Implement the change during the maintenance window',
      'Validate that the change works as expected',
      'Update diagrams and documentation'
    ],
    e: 'Changes are requested, analyzed (including a backout plan), approved, implemented in an approved window, validated, and then documented.'
  },
  {
    d: 1, o: '1.4',
    q: 'A security analyst reviews the certificate details shown in the exhibit for a public website. Users report browser warnings. Which of the following is the MOST likely cause?',
    x: `Subject:        CN=shop.example.com
Issuer:         CN=shop.example.com
Valid From:     2026-01-10
Valid To:       2027-01-10
Key:            RSA 2048
SAN:            shop.example.com`,
    a: ['The certificate is self-signed', 'The certificate has expired', 'The key length is too short', 'The certificate is missing a SAN entry'],
    c: 0,
    e: 'The subject and issuer are identical, so the certificate is self-signed and not trusted by browsers. It is within its validity period, uses a 2048-bit key, and includes a SAN.'
  },

  // ───────────── Domain 2 ─────────────
  {
    d: 2, t: 'match', o: '2.4',
    q: 'Match each scenario to the password attack it describes.',
    choices: ['Brute force', 'Password spraying', 'Credential stuffing', 'Replay'],
    items: [
      ['Thousands of passwords are tried against a single administrator account', 'Brute force'],
      ['"Winter2026!" is tried once against every account in the directory', 'Password spraying'],
      ['Username/password pairs from another site\'s breach are tried on the VPN', 'Credential stuffing'],
      ['A captured authentication token is resent to gain access', 'Replay']
    ],
    e: 'Brute force targets one account with many guesses; spraying uses few passwords across many accounts; credential stuffing reuses leaked pairs; replay retransmits captured authentication data.'
  },
  {
    d: 2, t: 'match', o: '2.2',
    q: 'Match each social engineering attempt to its name.',
    choices: ['Smishing', 'Vishing', 'Whaling', 'Watering hole', 'Typosquatting', 'Pretexting'],
    items: [
      ['A text message claims a package is held and links to a payment page', 'Smishing'],
      ['A caller pretends to be from the bank\'s fraud department', 'Vishing'],
      ['A spear-phishing email is aimed specifically at the CEO', 'Whaling'],
      ['An industry forum the target\'s engineers use is compromised', 'Watering hole'],
      ['A domain named "rnicrosoft.com" hosts a fake login page', 'Typosquatting'],
      ['An attacker poses as a new auditor needing urgent access, with a detailed backstory', 'Pretexting']
    ],
    e: 'Smishing = SMS; vishing = voice; whaling = executives; watering hole = compromised site the target visits; typosquatting = look-alike domains; pretexting = a fabricated scenario to gain trust.'
  },
  {
    d: 2, t: 'match', o: '2.4',
    q: 'Match each observed behavior to the type of malware MOST likely responsible.',
    choices: ['Ransomware', 'Worm', 'Trojan', 'Logic bomb', 'Keylogger', 'Rootkit'],
    items: [
      ['Files are encrypted and a payment note appears', 'Ransomware'],
      ['Spreads across the network via an SMB flaw with no user action', 'Worm'],
      ['A "free PDF converter" installs a backdoor', 'Trojan'],
      ['Code deletes records when a specific employee is terminated', 'Logic bomb'],
      ['Everything typed, including passwords, is sent to a remote server', 'Keylogger'],
      ['Malicious processes are hidden from Task Manager and AV by kernel hooks', 'Rootkit']
    ],
    e: 'Each malware type has a signature behavior: encryption for ransom, self-propagation, disguise as legitimate software, a trigger condition, keystroke capture, and stealth at a privileged level.'
  },
  {
    d: 2, t: 'match', o: '2.5',
    q: 'Match each vulnerability to the BEST mitigation.',
    choices: ['Parameterized queries', 'Output encoding', 'Network isolation', 'Change default credentials', 'ASLR/DEP memory protections'],
    items: [
      ['SQL injection in a login form', 'Parameterized queries'],
      ['Reflected cross-site scripting in a search page', 'Output encoding'],
      ['An end-of-life SCADA controller that cannot be patched', 'Network isolation'],
      ['IP cameras shipped with admin/admin', 'Change default credentials'],
      ['A buffer overflow in a legacy C application', 'ASLR/DEP memory protections']
    ],
    e: 'Parameterized queries stop SQLi; output encoding neutralizes XSS; isolation compensates for unpatchable systems; default credentials must be changed; ASLR/DEP make memory exploits harder.'
  },
  {
    d: 2, o: '2.4',
    q: 'A security analyst reviews the web server log in the exhibit. Which of the following attacks was attempted?',
    x: `203.0.113.45 - - [14/Nov/2026:02:14:07] "GET /products.php?id=7 HTTP/1.1" 200 5120
203.0.113.45 - - [14/Nov/2026:02:14:09] "GET /products.php?id=7' HTTP/1.1" 500 312
203.0.113.45 - - [14/Nov/2026:02:14:12] "GET /products.php?id=7 UNION SELECT username,password FROM users-- HTTP/1.1" 200 9876`,
    a: ['SQL injection', 'Directory traversal', 'Cross-site scripting', 'Server-side request forgery'],
    c: 0,
    e: 'The single quote causing a 500 error, followed by a UNION SELECT against the users table, is a classic SQL injection pattern.'
  },
  {
    d: 2, o: '2.4',
    q: 'Review the authentication log in the exhibit. Which of the following attacks is MOST likely occurring?',
    x: `09:01:02  FAIL  user=jsmith     src=198.51.100.23
09:01:03  FAIL  user=mlopez     src=198.51.100.23
09:01:03  FAIL  user=akhan      src=198.51.100.23
09:01:04  FAIL  user=tnguyen    src=198.51.100.23
09:01:05  SUCCESS user=rpatel  src=198.51.100.23
09:01:05  FAIL  user=cwilson    src=198.51.100.23`,
    a: ['Password spraying', 'Brute force against a single account', 'Pass-the-hash', 'Impossible travel'],
    c: 0,
    e: 'One source tries one attempt per account across many accounts in rapid succession, which is password spraying. One account eventually succeeded.'
  },
  {
    d: 2, o: '2.3',
    q: 'An analyst finds the request in the exhibit in an application log. Which of the following vulnerabilities was the attacker attempting to exploit?',
    x: `GET /download?file=../../../../etc/shadow HTTP/1.1
Host: files.example.com
User-Agent: curl/8.4.0`,
    a: ['Directory traversal', 'SQL injection', 'Cross-site request forgery', 'Race condition'],
    c: 0,
    e: 'The ../ sequences attempt to move outside the web root to read /etc/shadow, which is directory (path) traversal.'
  },
  {
    d: 2, o: '2.4',
    q: 'A SOC analyst notices the endpoint event shown in the exhibit on a finance workstation. Which of the following BEST describes this activity?',
    x: `Process:  powershell.exe
Parent:   winword.exe
Command:  powershell.exe -NoP -W Hidden -Enc SQBFAFgAIAAoAE4AZQB3AC0ATwBi...
Network:  outbound TCP 443 -> 45.33.12.9`,
    a: ['A malicious macro launching fileless malware', 'A scheduled Windows update', 'A user running a legitimate script', 'A vulnerability scanner performing a credentialed scan'],
    c: 0,
    e: 'Word spawning a hidden, encoded PowerShell command that connects outbound is a classic indicator of a malicious macro delivering fileless malware.'
  },

  // ───────────── Domain 3 ─────────────
  {
    d: 3, t: 'match', o: '3.2',
    q: 'Match each secure protocol to its default port.',
    choices: ['22', '23', '25', '53', '80', '389', '443', '636', '3389'],
    items: [
      ['SSH / SFTP', '22'],
      ['SMTP', '25'],
      ['DNS', '53'],
      ['HTTPS', '443'],
      ['LDAPS', '636'],
      ['RDP', '3389']
    ],
    e: 'SSH/SFTP 22, SMTP 25, DNS 53, HTTPS 443, LDAPS 636, RDP 3389. Telnet (23), HTTP (80), and LDAP (389) are insecure equivalents.'
  },
  {
    d: 3, t: 'match', o: '3.2', mono: true,
    q: 'SIMULATION: Configure the DMZ firewall to meet the requirements in the exhibit. Set each rule to ALLOW or DENY.',
    x: `Requirements:
 1. Internet users must reach the web server (10.1.1.10) over HTTPS only.
 2. Admins on the internal network (10.2.0.0/16) must manage the web server over SSH.
 3. Insecure protocols must not be permitted anywhere.
 4. The internet must never initiate connections to the internal network.`,
    choices: ['ALLOW', 'DENY'],
    items: [
      ['ANY          -> 10.1.1.10    TCP 443', 'ALLOW'],
      ['ANY          -> 10.1.1.10    TCP 80', 'DENY'],
      ['10.2.0.0/16  -> 10.1.1.10    TCP 22', 'ALLOW'],
      ['ANY          -> 10.1.1.10    TCP 22', 'DENY'],
      ['10.2.0.0/16  -> 10.1.1.10    TCP 23', 'DENY'],
      ['ANY          -> 10.2.0.0/16  ANY', 'DENY']
    ],
    e: 'Only HTTPS from anywhere and SSH from the internal admin range are allowed. HTTP and Telnet are insecure, SSH from the internet violates requirement 2, and inbound traffic to the internal network is denied.'
  },
  {
    d: 3, t: 'match', o: '3.4',
    q: 'Match each description to the correct resilience or backup term.',
    choices: ['Hot site', 'Warm site', 'Cold site', 'Incremental backup', 'Differential backup', 'Snapshot'],
    items: [
      ['Fully equipped with near-real-time data; failover in minutes', 'Hot site'],
      ['Hardware and network ready, but current data must be restored', 'Warm site'],
      ['Space, power, and cooling only', 'Cold site'],
      ['Copies changes since the last backup of any type', 'Incremental backup'],
      ['Copies all changes since the last full backup', 'Differential backup'],
      ['Point-in-time image of a VM taken before an upgrade', 'Snapshot']
    ],
    e: 'Site readiness goes hot > warm > cold. Incremental backups are smallest but slowest to restore; differentials grow until the next full backup.'
  },
  {
    d: 3, t: 'match', o: '3.3',
    q: 'Identify the state of the data in each scenario.',
    choices: ['Data at rest', 'Data in transit', 'Data in use'],
    items: [
      ['A customer database file stored on a SAN', 'Data at rest'],
      ['A spreadsheet being edited and held in RAM', 'Data in use'],
      ['A file being uploaded to cloud storage over TLS', 'Data in transit'],
      ['Backup tapes stored in an offsite vault', 'Data at rest'],
      ['An email crossing the internet between mail servers', 'Data in transit'],
      ['A CPU processing a decrypted credit card number', 'Data in use']
    ],
    e: 'At rest = stored; in transit = moving across a network; in use = actively processed in memory or CPU.'
  },
  {
    d: 3, o: '3.4',
    q: 'Based on the backup schedule in the exhibit, a server fails on Thursday at 3 p.m. Which backups are needed to restore the server to its most recent backed-up state?',
    x: `Sunday     23:00  Full backup
Monday     23:00  Differential backup
Tuesday    23:00  Differential backup
Wednesday  23:00  Differential backup`,
    a: ['Sunday full and Wednesday differential', 'Sunday full only', 'Sunday full plus Monday, Tuesday, and Wednesday', 'Wednesday differential only'],
    c: 0,
    e: 'Each differential contains all changes since the last full backup, so only the full backup and the most recent differential are needed.'
  },

  // ───────────── Domain 4 ─────────────
  {
    d: 4, t: 'order', o: '4.8',
    q: 'Place the phases of the incident response process in the correct order.',
    items: ['Preparation', 'Detection', 'Analysis', 'Containment', 'Eradication', 'Recovery', 'Lessons learned'],
    e: 'The SY0-701 incident response process is Preparation, Detection, Analysis, Containment, Eradication, Recovery, and Lessons learned.'
  },
  {
    d: 4, t: 'order', o: '4.8',
    q: 'A forensic analyst is collecting evidence from a compromised, running server. Place the sources in the order they should be collected, based on the order of volatility.',
    items: ['CPU registers and cache', 'RAM contents', 'Swap/page file', 'Files on the local disk', 'Remote logs on the SIEM', 'Archived backup media'],
    e: 'Collect the most volatile data first: CPU cache/registers, memory, swap, disk, remote logging, then archival media.'
  },
  {
    d: 4, t: 'order', o: '4.3',
    q: 'Place the vulnerability management activities in the correct order.',
    items: [
      'Identify vulnerabilities with a scan',
      'Analyze and prioritize findings using CVSS and exposure',
      'Remediate by patching or applying compensating controls',
      'Validate remediation with a rescan',
      'Report results to stakeholders'
    ],
    e: 'Vulnerability management is a cycle of identification, analysis/prioritization, response/remediation, validation, and reporting.'
  },
  {
    d: 4, t: 'match', o: '4.1',
    q: 'SIMULATION: Configure a new corporate wireless network so employees authenticate with individual credentials and certificates using the strongest available options.',
    items: [
      ['Security protocol', 'WPA3-Enterprise', ['WEP', 'WPA2-TKIP', 'WPA3-Personal', 'WPA3-Enterprise']],
      ['Authentication framework', '802.1X', ['Pre-shared key', '802.1X', 'Open', 'Captive portal']],
      ['Authentication server', 'RADIUS', ['RADIUS', 'SNMP', 'NTP', 'Syslog']],
      ['EAP method', 'EAP-TLS', ['EAP-TLS', 'LEAP', 'PAP', 'CHAP']],
      ['Wi-Fi Protected Setup (WPS)', 'Disabled', ['Enabled', 'Disabled']]
    ],
    e: 'WPA3-Enterprise uses 802.1X with a RADIUS server for per-user authentication. EAP-TLS uses certificates on both sides and is the strongest EAP method. WPS should be disabled because its PIN can be brute-forced.'
  },
  {
    d: 4, t: 'match', o: '4.9',
    q: 'An analyst must answer several questions during an investigation. Match each question to the BEST data source.',
    choices: ['Web proxy logs', 'Packet capture', 'NetFlow', 'Endpoint/EDR logs', 'Vulnerability scan', 'Firewall logs'],
    items: [
      ['Which users visited the phishing URL?', 'Web proxy logs'],
      ['What exact data was in the exfiltrated HTTP session?', 'Packet capture'],
      ['Which internal hosts talked to the C2 IP and how many bytes moved?', 'NetFlow'],
      ['Which process created the malicious file on a laptop?', 'Endpoint/EDR logs'],
      ['Does the server have the exploited CVE?', 'Vulnerability scan'],
      ['Was the inbound connection on TCP 3389 blocked or permitted?', 'Firewall logs']
    ],
    e: 'Proxy logs show web requests by user; PCAP holds full payloads; NetFlow gives flow metadata; EDR logs show process activity; scans reveal vulnerabilities; firewall logs show allowed/denied connections.'
  },
  {
    d: 4, t: 'match', o: '4.6',
    q: 'Match each access policy to the access control model it represents.',
    choices: ['Role-based', 'Mandatory', 'Discretionary', 'Attribute-based', 'Rule-based'],
    items: [
      ['Permissions come from job title, e.g., "Nurse" or "Billing Clerk"', 'Role-based'],
      ['Users need a clearance that matches the data\'s classification label', 'Mandatory'],
      ['The file creator decides who else can read the file', 'Discretionary'],
      ['Access allowed only for full-time staff, on managed devices, during business hours', 'Attribute-based'],
      ['A firewall ACL allows or denies traffic based on configured conditions', 'Rule-based']
    ],
    e: 'RBAC uses roles; MAC uses labels/clearances; DAC lets owners decide; ABAC evaluates multiple attributes; rule-based applies system-wide rules such as ACLs.'
  },
  {
    d: 4, t: 'match', o: '4.6',
    q: 'Identify the authentication factor represented by each item.',
    choices: ['Something you know', 'Something you have', 'Something you are', 'Somewhere you are'],
    items: [
      ['Account password', 'Something you know'],
      ['Smart card', 'Something you have'],
      ['Fingerprint scan', 'Something you are'],
      ['Login allowed only from inside the corporate geofence', 'Somewhere you are'],
      ['Authenticator app producing a TOTP code', 'Something you have'],
      ['PIN', 'Something you know']
    ],
    e: 'A TOTP app proves possession of the enrolled device (something you have). Passwords and PINs are knowledge; biometrics are inherence; location is somewhere you are.'
  },
  {
    d: 4, t: 'match', o: '4.5',
    q: 'Match each email security technology to its function.',
    choices: ['SPF', 'DKIM', 'DMARC', 'S/MIME'],
    items: [
      ['Publishes which servers may send mail for a domain', 'SPF'],
      ['Adds a domain-level cryptographic signature to messages', 'DKIM'],
      ['Tells receivers how to handle messages that fail checks and sends reports', 'DMARC'],
      ['Lets individual users encrypt and sign messages with certificates', 'S/MIME']
    ],
    e: 'SPF, DKIM, and DMARC work together at the domain level; S/MIME provides end-to-end encryption and signing for individual users.'
  },
  {
    d: 4, o: '4.3',
    q: 'Review the vulnerability scan results in the exhibit. Which finding should be remediated FIRST?',
    x: `Host           Exposure        Finding                          CVSS
web01          Internet-facing  Remote code execution (Apache)   9.8
hr-db01        Internal only    Remote code execution (MySQL)    9.8
print02        Internal only    Weak TLS cipher                  5.3
web01          Internet-facing  Missing HTTP security headers    4.3`,
    a: ['web01 – Remote code execution', 'hr-db01 – Remote code execution', 'print02 – Weak TLS cipher', 'web01 – Missing HTTP security headers'],
    c: 0,
    e: 'Both RCE findings are critical, but web01 is internet-facing, so its exposure makes it the highest priority.'
  },
  {
    d: 4, o: '4.4',
    q: 'A SIEM generates the alert shown in the exhibit. Which of the following should the analyst suspect?',
    x: `User:   k.morris@example.com
08:02  Login SUCCESS  Chicago, US     Managed laptop   MFA: push approved
08:19  Login SUCCESS  Bucharest, RO   Unknown device   MFA: push approved`,
    a: ['Compromised credentials and MFA fatigue', 'A misconfigured NTP server', 'A legitimate VPN connection', 'A DNS sinkhole'],
    c: 0,
    e: 'Logins from two distant countries 17 minutes apart (impossible travel) from an unknown device, with MFA approved, suggest stolen credentials and a user approving a push they did not initiate.'
  },
  {
    d: 4, o: '4.8',
    q: 'An analyst runs the command shown in the exhibit on a workstation suspected of compromise. Which of the following is the MOST likely explanation?',
    x: `C:\\> netstat -ano
Proto  Local Address        Foreign Address       State        PID
TCP    10.0.5.21:49822      52.96.14.10:443       ESTABLISHED  1204
TCP    10.0.5.21:51544      185.220.101.7:4444    ESTABLISHED  6612
TCP    10.0.5.21:445        0.0.0.0:0             LISTENING    4`,
    a: ['A remote access trojan connected to a command-and-control server', 'Normal Microsoft 365 traffic', 'A file share used by the user', 'A DNS lookup in progress'],
    c: 0,
    e: 'An established connection to an unknown external host on port 4444 (a common Metasploit/reverse-shell port) indicates a RAT or backdoor. The other entries are typical HTTPS and SMB activity.'
  },

  // ───────────── Domain 5 ─────────────
  {
    d: 5, t: 'match', o: '5.2',
    q: 'Match each management decision to the risk response it represents.',
    choices: ['Transfer', 'Avoid', 'Mitigate', 'Accept'],
    items: [
      ['Purchase cybersecurity insurance', 'Transfer'],
      ['Discontinue a product line that handles high-risk data', 'Avoid'],
      ['Deploy a WAF in front of the web application', 'Mitigate'],
      ['Document a low-impact risk and take no further action', 'Accept']
    ],
    e: 'Insurance transfers financial impact; stopping the activity avoids the risk; controls mitigate it; documenting and taking no action accepts it.'
  },
  {
    d: 5, t: 'match', o: '5.3',
    q: 'Match each need to the agreement that BEST addresses it.',
    choices: ['SLA', 'MOU', 'NDA', 'MSA', 'SOW', 'BPA'],
    items: [
      ['Guarantee 99.95% uptime with penalties', 'SLA'],
      ['A non-binding statement of intent to collaborate', 'MOU'],
      ['Keep shared product designs confidential', 'NDA'],
      ['Set general payment and liability terms for all future work', 'MSA'],
      ['Define deliverables and timeline for a specific project', 'SOW'],
      ['Define profit sharing and responsibilities between partners', 'BPA']
    ],
    e: 'Each agreement serves a distinct purpose: service levels, intent, confidentiality, master terms, project scope, and partnership terms.'
  },
  {
    d: 5, t: 'match', o: '5.1',
    q: 'Match each responsibility to the correct data role.',
    choices: ['Data owner', 'Data custodian', 'Data controller', 'Data processor', 'Data subject'],
    items: [
      ['Senior manager accountable for the data and its classification', 'Data owner'],
      ['Administrator who applies backups and access controls', 'Data custodian'],
      ['Organization that decides why and how personal data is processed', 'Data controller'],
      ['Payroll vendor handling data on the company\'s behalf', 'Data processor'],
      ['Customer whose personal information is collected', 'Data subject']
    ],
    e: 'Owners are accountable, custodians implement controls, controllers determine purpose, processors act on the controller\'s behalf, and subjects are the people the data describes.'
  },
  {
    d: 5, t: 'match', o: '5.5',
    q: 'Match each security exercise role to its responsibility.',
    choices: ['Red team', 'Blue team', 'Purple team', 'White team'],
    items: [
      ['Simulates attackers and tries to breach defenses', 'Red team'],
      ['Monitors and defends the environment', 'Blue team'],
      ['Shares findings between offense and defense to improve controls', 'Purple team'],
      ['Sets rules, referees, and evaluates the exercise', 'White team']
    ],
    e: 'Red attacks, blue defends, purple bridges the two, and white manages the exercise.'
  },
  {
    d: 5, o: '5.2',
    q: 'Using the data in the exhibit, what is the annualized loss expectancy (ALE) for the customer database?',
    x: `Asset:              Customer database
Asset value (AV):   $500,000
Exposure factor:    30%
Expected incidents: 1 every 5 years`,
    a: ['$30,000', '$150,000', '$100,000', '$750,000'],
    c: 0,
    e: 'SLE = $500,000 × 0.30 = $150,000. ARO = 1/5 = 0.2. ALE = $150,000 × 0.2 = $30,000.'
  },
  {
    d: 5, o: '5.2',
    q: 'Based on the risk matrix in the exhibit, which risk should be addressed FIRST?',
    x: `Risk                          Likelihood   Impact
A  Ransomware on file servers   High         High
B  Lost unencrypted USB drive   Medium       High
C  Website defacement           Medium       Low
D  Data center flood            Low          High`,
    a: ['Risk A', 'Risk B', 'Risk C', 'Risk D'],
    c: 0,
    e: 'Risk A has both high likelihood and high impact, giving it the highest qualitative risk rating.'
  },
  {
    d: 1, t: 'match', o: '1.4',
    q: 'Classify each encryption algorithm found in this study guide as symmetric or asymmetric.',
    choices: ['Symmetric', 'Asymmetric'],
    items: [
      ['AES', 'Symmetric'],
      ['3DES', 'Symmetric'],
      ['DES', 'Symmetric'],
      ['Blowfish', 'Symmetric'],
      ['RC4', 'Symmetric'],
      ['ChaCha20', 'Symmetric'],
      ['IDEA', 'Symmetric'],
      ['RSA', 'Asymmetric'],
      ['ECC', 'Asymmetric'],
      ['Diffie-Hellman', 'Asymmetric'],
      ['ECDHE', 'Asymmetric'],
      ['DSA', 'Asymmetric'],
      ['ECDSA', 'Asymmetric']
    ],
    e: 'Symmetric algorithms use one shared secret key for both encryption and decryption (AES, 3DES, DES, Blowfish, RC4, ChaCha20, IDEA) and are fast enough for bulk data. Asymmetric algorithms use a public/private key pair (RSA, ECC) or build on one: Diffie-Hellman and ECDHE agree on a shared key over an untrusted network, and DSA/ECDSA create digital signatures.'
  }
]
