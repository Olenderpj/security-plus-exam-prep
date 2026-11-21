// Domain 2: Threats, Vulnerabilities, and Mitigations
export default [
  {
    o: '2.1',
    q: 'A well-funded group with long-term objectives infiltrates a government network and remains undetected for months while exfiltrating classified data. Which of the following threat actors is MOST likely responsible?',
    a: ['Hacktivist', 'Unskilled attacker', 'Nation-state', 'Insider threat'],
    c: 2,
    e: 'Nation-state actors have significant resources and pursue long-term espionage goals, often as advanced persistent threats (APTs).'
  },
  {
    o: '2.1',
    q: 'A group defaces a corporation\'s website with messages protesting the company\'s environmental policies. Which of the following BEST describes the motivation of this threat actor?',
    a: ['Financial gain', 'Philosophical/political beliefs', 'Espionage', 'Revenge'],
    c: 1,
    e: 'Hacktivists are motivated by philosophical or political beliefs and often use defacement or DDoS to make a statement.'
  },
  {
    o: '2.1',
    q: 'An employee in the marketing department installs an unapproved cloud file-sharing app to collaborate with a vendor. Which of the following does this represent?',
    a: ['Shadow IT', 'Organized crime', 'Nation-state activity', 'Supply chain attack'],
    c: 0,
    e: 'Shadow IT is the use of hardware or software without IT department approval, typically for convenience rather than malice.'
  },
  {
    o: '2.1',
    q: 'An attacker uses a downloaded exploit kit without understanding how it works to attack random internet-facing servers. Which of the following BEST describes this attacker?',
    a: ['Unskilled attacker', 'APT', 'Insider threat', 'Hacktivist'],
    c: 0,
    e: 'Unskilled attackers (formerly script kiddies) rely on tools created by others and have limited resources and sophistication.'
  },
  {
    o: '2.2',
    q: 'Several employees receive a text message that appears to be from the company\'s payroll provider, asking them to click a link to update their direct deposit information. Which of the following attacks is occurring?',
    a: ['Vishing', 'Smishing', 'Whaling', 'Pretexting'],
    c: 1,
    e: 'Smishing is phishing conducted via SMS/text messages.'
  },
  {
    o: '2.2',
    q: 'An attacker compromises a website frequently visited by employees of a target organization and plants malware on it. Which of the following attacks does this describe?',
    a: ['Typosquatting', 'Watering hole', 'Brand impersonation', 'Business email compromise'],
    c: 1,
    e: 'A watering hole attack compromises a site the target group is known to visit, infecting visitors.'
  },
  {
    o: '2.2',
    q: 'A user mistypes a well-known banking URL and lands on a look-alike site that harvests credentials. Which of the following BEST describes this attack?',
    a: ['Typosquatting', 'DNS poisoning', 'Pharming via hosts file', 'Watering hole'],
    c: 0,
    e: 'Typosquatting registers domains that are common misspellings of legitimate domains to capture users who mistype URLs.'
  },
  {
    o: '2.2',
    q: 'A company discovers that a firmware update provided by a trusted hardware vendor contained a backdoor. Which of the following attack vectors was used?',
    a: ['Removable media', 'Supply chain', 'Unsecure network', 'Open service port'],
    c: 1,
    e: 'A supply chain attack compromises a trusted vendor, supplier, or service provider to reach the ultimate target.'
  },
  {
    o: '2.2',
    q: 'The CFO receives an email that appears to be from the CEO, urgently requesting a wire transfer to a new vendor. The email came from a legitimate but compromised executive mailbox. Which of the following attacks is this?',
    a: ['Smishing', 'Business email compromise', 'Watering hole', 'Typosquatting'],
    c: 1,
    e: 'Business email compromise (BEC) uses a compromised or spoofed business account to trick staff into transferring money or data.'
  },
  {
    o: '2.3',
    q: 'A web application accepts user input and inserts it directly into a database query. An attacker enters \' OR 1=1 -- into the login field. Which of the following vulnerabilities is being exploited?',
    a: ['Cross-site scripting', 'SQL injection', 'Buffer overflow', 'Directory traversal'],
    c: 1,
    e: 'SQL injection manipulates database queries by inserting SQL syntax into unsanitized input fields.'
  },
  {
    o: '2.3',
    q: 'A security analyst notices a URL containing ../../../../etc/passwd in web server logs. Which of the following attacks was attempted?',
    a: ['Directory traversal', 'Cross-site request forgery', 'Privilege escalation', 'Replay attack'],
    c: 0,
    e: 'Directory (path) traversal uses ../ sequences to access files outside the web root.'
  },
  {
    o: '2.3',
    q: 'An application checks whether a user has permission to access a file and then opens the file. An attacker swaps the file with a symbolic link between the check and the open. Which of the following vulnerabilities does this describe?',
    a: ['Memory injection', 'Race condition (TOC/TOU)', 'Integer overflow', 'Resource reuse'],
    c: 1,
    e: 'A time-of-check to time-of-use (TOC/TOU) race condition exploits the gap between validating a resource and using it.'
  },
  {
    o: '2.3',
    q: 'A user is able to install unauthorized applications on a corporate smartphone by modifying the operating system to remove manufacturer restrictions. Which of the following BEST describes this activity?',
    a: ['Sideloading', 'Jailbreaking', 'Rooting a VM', 'Bluejacking'],
    c: 1,
    e: 'Jailbreaking (iOS) or rooting (Android) removes OS restrictions. Sideloading is installing apps from outside the official store, which jailbreaking often enables.'
  },
  {
    o: '2.3',
    q: 'An attacker exploits a vulnerability that the software vendor is not yet aware of and for which no patch exists. Which of the following BEST describes this vulnerability?',
    a: ['Zero-day', 'Misconfiguration', 'Legacy', 'End-of-life'],
    c: 0,
    e: 'A zero-day vulnerability is unknown to the vendor or has no available fix at the time it is exploited.'
  },
  {
    o: '2.3',
    q: 'An attacker running code inside a guest virtual machine gains access to the hypervisor and other guest VMs on the same host. Which of the following attacks occurred?',
    a: ['VM escape', 'Resource reuse', 'Side loading', 'Pass-the-hash'],
    c: 0,
    e: 'VM escape breaks out of the guest OS isolation to interact with the hypervisor or other VMs.'
  },
  {
    o: '2.3',
    q: 'A web forum allows users to post comments. An attacker posts a comment containing a script that steals session cookies from other users who view the page. Which of the following vulnerabilities is this?',
    a: ['Stored cross-site scripting', 'SQL injection', 'Server-side request forgery', 'LDAP injection'],
    c: 0,
    e: 'Stored (persistent) XSS saves malicious script on the server, which then executes in the browsers of users who view the content.'
  },
  {
    o: '2.4',
    q: 'A security analyst notices a user account authenticated from New York and then from Singapore 10 minutes later. Which of the following indicators does this represent?',
    a: ['Impossible travel', 'Resource consumption', 'Account lockout', 'Concurrent session usage only'],
    c: 0,
    e: 'Impossible travel occurs when logins from geographically distant locations happen faster than a person could physically travel.'
  },
  {
    o: '2.4',
    q: 'Users report that files on a shared drive now have a .locked extension and a text file demanding cryptocurrency payment appears in each folder. Which of the following types of malware is MOST likely responsible?',
    a: ['Spyware', 'Ransomware', 'Rootkit', 'Logic bomb'],
    c: 1,
    e: 'Ransomware encrypts files and demands payment, typically in cryptocurrency, for the decryption key.'
  },
  {
    o: '2.4',
    q: 'A former developer left code in a payroll application that deletes all employee records if their own account is ever removed from the HR system. Which of the following BEST describes this malware?',
    a: ['Trojan', 'Worm', 'Logic bomb', 'Keylogger'],
    c: 2,
    e: 'A logic bomb executes a malicious payload when a specific condition or event occurs.'
  },
  {
    o: '2.4',
    q: 'A security analyst sees a single source IP attempt one common password against hundreds of different user accounts. Which of the following attacks is this?',
    a: ['Brute force', 'Password spraying', 'Credential stuffing', 'Rainbow table'],
    c: 1,
    e: 'Password spraying tries a few common passwords across many accounts to avoid lockout thresholds.'
  },
  {
    o: '2.4',
    q: 'Malware spreads across a network by itself, exploiting an unpatched SMB vulnerability without any user interaction. Which of the following types of malware is this?',
    a: ['Virus', 'Worm', 'Trojan', 'Bloatware'],
    c: 1,
    e: 'Worms self-replicate and spread across networks without user interaction, often by exploiting vulnerabilities.'
  },
  {
    o: '2.4',
    q: 'An attacker captures an authentication exchange on the network and later resends it to gain access to a system. Which of the following attacks is this?',
    a: ['On-path', 'Replay', 'Downgrade', 'Birthday'],
    c: 1,
    e: 'A replay attack retransmits captured valid data, such as authentication tokens, to impersonate a user.'
  },
  {
    o: '2.4',
    q: 'An attacker forces a client and server to negotiate an older, weaker version of TLS so the traffic can be decrypted. Which of the following attacks is this?',
    a: ['Downgrade', 'Collision', 'Replay', 'Pass-the-hash'],
    c: 0,
    e: 'A downgrade attack forces systems to use weaker protocols or cipher suites that are easier to exploit.'
  },
  {
    o: '2.4',
    q: 'A security team observes a large number of DNS queries with long, random-looking subdomains being sent to a single external domain. Which of the following is MOST likely occurring?',
    a: ['DNS tunneling for data exfiltration', 'DDoS amplification', 'Domain hijacking', 'ARP poisoning'],
    c: 0,
    e: 'Encoding data in DNS subdomain queries is a common technique to tunnel or exfiltrate data through DNS, which is often allowed outbound.'
  },
  {
    o: '2.4',
    q: 'An attacker sends small spoofed requests to open DNS resolvers, which then send large responses to the victim. Which of the following attacks does this describe?',
    a: ['Amplified DDoS', 'DNS poisoning', 'Credential replay', 'Wireless deauthentication'],
    c: 0,
    e: 'Amplification attacks spoof the victim\'s IP and abuse services that return much larger responses than the requests, overwhelming the victim.'
  },
  {
    o: '2.5',
    q: 'A company wants to limit the damage an attacker can do if a single workstation is compromised. Which of the following mitigation techniques would BEST reduce lateral movement?',
    a: ['Network segmentation', 'Data masking', 'Encryption at rest', 'Patching only servers'],
    c: 0,
    e: 'Segmentation isolates systems into separate zones so a compromise in one segment cannot easily spread to others.'
  },
  {
    o: '2.5',
    q: 'A security administrator wants to ensure that only approved applications can run on point-of-sale terminals. Which of the following should be implemented?',
    a: ['Application allow list', 'Deny list', 'Host-based firewall', 'Sandboxing'],
    c: 0,
    e: 'An allow list permits only explicitly approved applications to execute and blocks everything else.'
  },
  {
    o: '2.5',
    q: 'Which of the following hardening techniques would BEST reduce the attack surface of a newly deployed server? (Select TWO).',
    a: ['Disable unnecessary services and ports', 'Change default passwords', 'Enable all logging verbosity levels', 'Install additional browser plug-ins', 'Grant local admin to all users', 'Enable guest accounts'],
    c: [0, 1],
    e: 'Removing unneeded services/ports and changing default credentials are core hardening steps that reduce the attack surface.'
  },
  {
    o: '2.5',
    q: 'A database administrator is given only the permissions required to back up databases and nothing more. Which of the following principles is being applied?',
    a: ['Least privilege', 'Separation of duties', 'Job rotation', 'Mandatory vacation'],
    c: 0,
    e: 'Least privilege grants users only the minimum access needed to perform their job functions.'
  },
  {
    o: '2.5',
    q: 'A company plans to securely dispose of a server and wants to ensure the data cannot be recovered. Which of the following is the MOST secure method for hard drives that will not be reused?',
    a: ['Formatting the drive', 'Deleting all partitions', 'Physical destruction such as shredding', 'Reinstalling the operating system'],
    c: 2,
    e: 'Physical destruction (shredding, pulverizing, incineration) is the most secure method when media will not be reused.'
  }
]
