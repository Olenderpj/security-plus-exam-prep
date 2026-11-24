// Performance-based questions adapted from the SY0-701 practice-exam study guide supplied by the user. The scenarios
// and answers follow the guide; the wording is our own. Same format as pbq.js (match items: [label, answer,
// own choices?]; order items listed in the correct order).
export default [
  {
    d: 2, t: 'match', o: '2.4', lv: 5.2,
    q: 'Match each description with the attack it BEST represents. Not every attack type is used.',
    choices: ['Vishing', 'Injection', 'On-path', 'DDoS', 'Keylogger', 'Rainbow table', 'Spraying'],
    items: [
      ['A caller tricks the victim into giving their bank account number and date of birth', 'Vishing'],
      ['The attacker reaches the database directly through a web form', 'Injection'],
      ['All traffic between a client and a web server is intercepted', 'On-path'],
      ['Many systems flood a web server until it stops responding', 'DDoS'],
      ['Every credential typed over the last day is captured and sent to the attacker', 'Keylogger']
    ],
    e: 'Phone-based social engineering is vishing. Sending database commands through a vulnerable web application is injection. Sitting invisibly between two devices to read or alter traffic is an on-path attack. Many sources overwhelming a service is a DDoS. Capturing everything typed, including logins, is a keylogger.',
    w: ['Choose the attack type that fits each scenario. Some attack types will not be used.', 'For each scenario, select the attack being described.']
  },
  {
    d: 1, t: 'match', o: '1.2', lv: 5.6,
    q: 'A manufacturer is defining physical security standards for staff and visitors. Place each control at the location where it fits BEST. Every control is used once.',
    choices: ['Parking and drop-off area', 'Reception lobby', 'Data center door', 'Server console'],
    items: [
      ['Fencing', 'Parking and drop-off area'],
      ['Lighting', 'Parking and drop-off area'],
      ['Security guard', 'Reception lobby'],
      ['Access control vestibule', 'Reception lobby'],
      ['Access badge reader', 'Data center door'],
      ['Biometric scanner', 'Data center door'],
      ['Authentication token', 'Server console']
    ],
    e: 'Outside, fencing controls access and lighting keeps parking and drop-off areas safe. At reception, guards check authorization and a vestibule controls the flow of people. Sensitive interior areas such as the data center need a badge plus a biometric check, and console access to a server still requires its own login with a token (multifactor).',
    w: ['Assign each physical security control to the area of the site where it belongs.', 'Choose the location where each control would be MOST effective.']
  },
  {
    d: 1, t: 'match', o: '1.1', lv: 4.6,
    q: 'Select the control category for each example. Categories may be used more than once.',
    choices: ['Operational', 'Managerial', 'Physical', 'Technical'],
    items: [
      ['A guard checks every visitor\'s identification', 'Operational'],
      ['All product returns require a vice president\'s approval', 'Managerial'],
      ['A generator supplies power during an outage', 'Physical'],
      ['Building doors open with an access card', 'Physical'],
      ['System logs are sent automatically to the SIEM', 'Technical']
    ],
    e: 'Operational controls are carried out by people (guards, awareness programs). Managerial controls are policies and procedures, such as an approval rule. Physical controls deal with the physical environment, such as generators and card-controlled doors. Technical controls are implemented by systems, such as automated log forwarding.',
    w: ['Classify each example by its security control category.', 'Which control category does each item belong to?']
  },
  {
    d: 4, t: 'match', o: '4.6', lv: 4.4,
    q: 'Match each scenario to the authentication factor it uses. Each factor is used once.',
    choices: ['Something you know', 'Something you have', 'Something you are', 'Somewhere you are'],
    items: [
      ['A one-time passcode arrives by text message on your phone during login', 'Something you have'],
      ['You enter your PIN at an ATM to make a deposit', 'Something you know'],
      ['Your fingerprint unlocks the data center door', 'Something you are'],
      ['Your login only works while you are connected through the VPN', 'Somewhere you are']
    ],
    e: 'A code sent to your phone proves possession of the phone (something you have). A PIN is something you know. A fingerprint is something you are. Requiring a particular network location such as the VPN is somewhere you are.',
    w: ['Identify the authentication factor in each example.', 'For each login scenario, choose the factor being used.']
  },
  {
    d: 4, t: 'match', o: '4.5', lv: 6.8,
    x: `DMZ:       File Server 10.1.1.3    Video Server 10.1.1.7    Web Server 10.1.1.2
Internal:  Storage Server 10.2.1.33   Management Server 10.2.1.47   Database Server 10.2.1.20
A stateful firewall sits between the DMZ, the internal network and the Internet.

Requirements
 1. Block HTTP sessions from the Web Server to the Database Server
 2. Allow the Storage Server to send files to the Video Server over HTTPS
 3. Allow the Management Server to use a secure terminal on the File Server`,
    q: 'Build the stateful firewall rules for the requirements in the exhibit. Choose the correct value for each field.',
    items: [
      ['Rule 1: source IP', '10.1.1.2', ['10.1.1.2', '10.2.1.20', '10.2.1.47', '10.1.1.7']],
      ['Rule 1: destination IP', '10.2.1.20', ['10.1.1.2', '10.2.1.20', '10.2.1.33', '10.1.1.3']],
      ['Rule 1: protocol and port', 'TCP 80', ['TCP 22', 'TCP 80', 'TCP 443', 'UDP 53']],
      ['Rule 1: action', 'Block', ['Allow', 'Block']],
      ['Rule 2: source IP', '10.2.1.33', ['10.2.1.33', '10.1.1.7', '10.2.1.47', '10.1.1.2']],
      ['Rule 2: destination IP', '10.1.1.7', ['10.1.1.3', '10.1.1.7', '10.2.1.33', '10.2.1.20']],
      ['Rule 2: protocol and port', 'TCP 443', ['TCP 21', 'TCP 80', 'TCP 443', 'TCP 3389']],
      ['Rule 2: action', 'Allow', ['Allow', 'Block']],
      ['Rule 3: source IP', '10.2.1.47', ['10.1.1.3', '10.2.1.47', '10.2.1.33', '10.1.1.2']],
      ['Rule 3: destination IP', '10.1.1.3', ['10.1.1.3', '10.2.1.47', '10.1.1.7', '10.2.1.20']],
      ['Rule 3: protocol and port', 'TCP 22', ['TCP 22', 'TCP 23', 'TCP 3389', 'TCP 443']],
      ['Rule 3: action', 'Allow', ['Allow', 'Block']]
    ],
    e: 'Work out the source, destination, port and action for each requirement from the diagram. HTTP is TCP 80, from the web server (10.1.1.2) to the database (10.2.1.20), blocked. HTTPS is TCP 443, from the storage server (10.2.1.33) to the video server (10.1.1.7), allowed. A secure terminal is SSH on TCP 22, from the management server (10.2.1.47) to the file server (10.1.1.3), allowed. Because the firewall is stateful, return traffic needs no separate rule.',
    w: ['Use the network details in the exhibit to complete each firewall rule.', 'Fill in source, destination, port and action for the three firewall requirements in the exhibit.']
  },
  {
    d: 1, t: 'match', o: '1.4', lv: 5.0,
    q: 'Match each certificate term to its description.',
    choices: ['CRL', 'OCSP', 'CA', 'CSR'],
    items: [
      ['A published list of certificates that are no longer valid', 'CRL'],
      ['Sends the public key and identity details to be signed', 'CSR'],
      ['Issues, deploys and manages certificates', 'CA'],
      ['Lets a browser check whether one certificate has been revoked', 'OCSP']
    ],
    e: 'The certificate revocation list is the CA\'s list of revoked certificates. A certificate signing request carries the public key to the CA for signing. The certificate authority is the trusted issuer that manages certificates. OCSP lets a client ask about the revocation status of a single certificate.',
    w: ['Select the certificate component that each description refers to.', 'Which PKI term matches each description?']
  },
  {
    d: 4, t: 'match', o: '4.1', lv: 6.2,
    q: 'A sensitive sales application is used on tablets by field staff and through a browser on office desktops, and two authentication factors are required. Choose the platform for each security feature, or mark it as not needed. Each feature is used once.',
    choices: ['Field sales tablet', 'Office desktop (browser)', 'Not needed'],
    items: [
      ['MDM integration', 'Field sales tablet'],
      ['Full device encryption', 'Field sales tablet'],
      ['Biometric (face) authentication', 'Field sales tablet'],
      ['Host-based firewall', 'Office desktop (browser)'],
      ['Anti-malware', 'Office desktop (browser)'],
      ['Infrared sensors', 'Not needed'],
      ['OSINT', 'Not needed']
    ],
    e: 'Tablets travel, so they need MDM management, full device encryption in case they are lost, and the built-in camera can add biometric authentication. Desktops stay in the office and rely on a host-based firewall and anti-malware. Infrared sensors are a physical control and OSINT is a reconnaissance technique, so neither applies.',
    w: ['Assign each security feature to the device that needs it, or mark it as not needed.', 'Decide which security features belong on the field tablets and which on the office desktops.']
  },
  {
    d: 4, t: 'order', o: '4.8', lv: 4.8,
    q: 'Put the incident response activities in the correct order.',
    items: ['Preparation', 'Detection', 'Analysis', 'Containment', 'Eradication', 'Recovery', 'Lessons learned'],
    e: 'Preparation happens before any incident. Detection identifies that something is happening, and analysis gathers the evidence. Containment stops it spreading, eradication removes the malware and fixes the vulnerability, recovery rebuilds and restores, and lessons learned improves the process afterwards.',
    w: ['Arrange these incident response phases in sequence.', 'Order the steps of the incident response process from first to last.']
  },
  {
    d: 1, t: 'match', o: '1.4', lv: 5.0,
    q: 'Match each security technology to the job it does.',
    choices: ['Hashing', 'Digital signature', 'SPF', 'Key escrow', 'Journaling', 'Obfuscation'],
    items: [
      ['Store a password on an authentication server', 'Hashing'],
      ['Verify who sent a message', 'Digital signature'],
      ['Confirm that the server sending an email is authorized', 'SPF'],
      ['Keep copies of keys with a trusted third party', 'Key escrow'],
      ['Avoid data corruption if a system fails mid-write', 'Journaling'],
      ['Make a script hard for people to understand', 'Obfuscation']
    ],
    e: 'Passwords are stored as one-way hashes. Digital signatures prove the sender and protect integrity. SPF lists the servers allowed to send mail for a domain. Key escrow keeps keys with a trusted third party. Journaling writes changes to a journal first so they survive a failure. Obfuscation makes code hard to read.',
    w: ['Select the technology that fits each use.', 'Which technology provides each of these functions?']
  },
  {
    d: 3, t: 'match', o: '3.3', lv: 5.4,
    q: 'Choose the data state that BEST fits each description. Each state is used more than once.',
    choices: ['Data in transit', 'Data at rest', 'Data in use'],
    items: [
      ['Traffic crossing an 802.1Q trunk between data center switches', 'Data in transit'],
      ['Daily sales figures uploaded from a remote site over a satellite link', 'Data in transit'],
      ['Customer purchase records stored in a MySQL database', 'Data at rest'],
      ['An application decrypts card numbers in memory to approve a payment', 'Data in use'],
      ['An authentication program hashes a password at login', 'Data in use'],
      ['An IPS removes SQL injection frames from the network', 'Data in transit'],
      ['An ATM checks a customer\'s PIN before a deposit', 'Data in use'],
      ['Weekly backup tapes in an offsite vault', 'Data at rest'],
      ['User spreadsheets kept on a cloud file-sharing service', 'Data at rest']
    ],
    e: 'Data moving across a network or link is in transit. Data stored on a disk, database, tape or cloud storage is at rest. Data being processed in a device\'s memory, such as decryption, hashing or PIN checks, is in use.',
    w: ['Classify each example by data state.', 'For each scenario, is the data in transit, at rest or in use?']
  },
  {
    d: 4, t: 'match', o: '4.5', lv: 6.4,
    x: `Rule  Source  Destination   Protocol  Port   Action
1     Any     10.1.10.88    TCP       22     Allow
2     Any     10.1.10.120   TCP       80     Allow
3     Any     10.1.10.120   TCP       443    Allow
4     Any     10.1.10.61    TCP       3389   Allow
5     Any     Any           UDP       53     Allow
6     Any     Any           UDP       123    Allow
7     Any     Any           ICMP      -      Block
(An implicit deny follows the last rule.)`,
    q: 'Using the firewall rules in the exhibit, decide whether each traffic flow is allowed or blocked.',
    choices: ['Allowed', 'Blocked'],
    items: [
      ['Open a secure terminal session to 10.1.10.88', 'Allowed'],
      ['Share the desktop of server 10.1.10.120 with RDP', 'Blocked'],
      ['Send a DNS query from 10.1.10.88 to 9.9.9.9', 'Allowed'],
      ['Browse web pages on 10.1.10.120', 'Allowed'],
      ['Authenticate to an LDAP server at 10.1.10.61', 'Blocked'],
      ['Synchronize the clock of a server at 10.1.10.17', 'Allowed']
    ],
    e: 'SSH uses TCP 22 and rule 1 allows it to 10.1.10.88. RDP uses TCP 3389, which is only allowed to 10.1.10.61, not 10.1.10.120. DNS uses UDP 53 (rule 5) and NTP uses UDP 123 (rule 6), both allowed to any address. Web traffic to 10.1.10.120 is allowed by rules 2 and 3. LDAP uses TCP 389, which no rule permits, so the implicit deny blocks it.',
    w: ['Evaluate each connection against the rule set in the exhibit.', 'Apply the firewall rules in the exhibit to each traffic flow.']
  },
  {
    d: 3, t: 'match', o: '3.2', lv: 5.2,
    q: 'Match each network device to the job it performs. Not every device is used.',
    choices: ['IPS', 'Proxy', 'Router', 'Load balancer', 'WAF', 'Jump server', 'Sensor'],
    items: [
      ['Block SQL injection attempts arriving over the internet connection', 'IPS'],
      ['Intercept browser requests and cache the results', 'Proxy'],
      ['Forward packets between separate VLANs', 'Router'],
      ['Spread traffic across a group of redundant web servers', 'Load balancer'],
      ['Check the input sent to a browser-based application', 'WAF']
    ],
    e: 'An IPS watches traffic for known exploits and blocks them. A proxy makes requests on users\' behalf and can scan and cache content. A router forwards traffic between subnets or VLANs. A load balancer distributes traffic across a server farm for scale and fault tolerance. A WAF evaluates input to web applications to stop injection and XSS.',
    w: ['Select the device that performs each function. Some devices will not be used.', 'Which network device fits each description?']
  },
  {
    d: 2, t: 'match', o: '2.4', lv: 4.8,
    q: 'Match each attack to its characteristic.',
    choices: ['DDoS', 'Replay', 'Rootkit', 'Brute force', 'Phishing', 'Injection'],
    items: [
      ['A website stops answering normal requests', 'DDoS'],
      ['Captured data is sent to a server again', 'Replay'],
      ['Malware built to stay hidden on the system', 'Rootkit'],
      ['A list of passwords is tried against a known username', 'Brute force'],
      ['An email link leads to a site asking for login credentials', 'Phishing'],
      ['Extra code added to application input bypasses permissions', 'Injection']
    ],
    e: 'A DDoS overwhelms a service until it stops responding. A replay resends captured data. A rootkit modifies core system files to stay hidden. Brute force tries many passwords for one account. Phishing lures victims to a fake login page. Injection adds code to input to bypass the application\'s controls.',
    w: ['Select the attack described by each characteristic.', 'Which attack type matches each description?']
  },
  {
    d: 1, t: 'match', o: '1.4', lv: 5.0,
    q: 'Match each cryptographic concept to its description.',
    choices: ['Key stretching', 'Steganography', 'Collision', 'Masking', 'Asymmetric encryption', 'Salting'],
    items: [
      ['Strengthen a key by running it through many processing rounds', 'Key stretching'],
      ['Hide data inside a different type of media', 'Steganography'],
      ['Two different inputs produce the same hash', 'Collision'],
      ['Hide sensitive data from view on screen or paper', 'Masking'],
      ['Use one key to encrypt and a different key to decrypt', 'Asymmetric encryption'],
      ['Add random data so each password hash is unique', 'Salting']
    ],
    e: 'Key stretching repeats hashing or processing to make keys harder to brute force. Steganography hides data in other media such as images. A collision is two inputs with the same hash. Masking hides data from people, for example asterisks on a receipt. Asymmetric encryption uses a key pair. Salting makes identical passwords hash differently.',
    w: ['Select the cryptography term that each description refers to.', 'Which cryptographic concept fits each description?']
  },
  {
    d: 3, t: 'match', o: '3.2', lv: 5.6,
    q: 'Choose the security technology that BEST fits each scenario.',
    choices: ['VPN', 'Sandboxing', 'NGFW', 'SD-WAN', '802.1X'],
    items: [
      ['A field engineer works on a company laptop from coffee shops and hotels', 'VPN'],
      ['Developers test an application before it is deployed', 'Sandboxing'],
      ['An administrator stops employees from visiting known malicious websites', 'NGFW'],
      ['Every office connects directly to cloud-based services', 'SD-WAN'],
      ['Users must sign in to the network with their corporate credentials', '802.1X']
    ],
    e: 'A VPN encrypts traffic on public Wi-Fi. A sandbox is an isolated place to test code. A next-generation firewall adds application awareness and content filtering. SD-WAN connects every location directly to cloud services. 802.1X requires users to authenticate with corporate credentials before getting network access.',
    w: ['Assign the most appropriate technology to each scenario.', 'Which technology best addresses each requirement?']
  }
]
