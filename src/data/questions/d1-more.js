// Domain 1: General Security Concepts (additional questions)
export default [
  {
    o: '1.1',
    q: 'A company reviews firewall logs every morning to identify unauthorized connection attempts from the previous day. Which of the following control types does the log review represent?',
    a: ['Preventive', 'Detective', 'Deterrent', 'Directive'],
    c: 1,
    e: 'Log review identifies events after they occur, which makes it a detective control.'
  },
  {
    o: '1.1',
    q: 'A security team installs motion-activated lighting around the perimeter of a warehouse to discourage intruders at night. Which of the following BEST describes this control?',
    a: ['Technical corrective', 'Physical deterrent', 'Managerial detective', 'Operational compensating'],
    c: 1,
    e: 'Lighting is a physical control whose main goal is to discourage intruders, so it is a deterrent.'
  },
  {
    o: '1.1',
    q: 'Which of the following is an example of a technical preventive control?',
    a: ['A security awareness poster', 'A badge reader log', 'Multifactor authentication on a VPN', 'A quarterly access review'],
    c: 2,
    e: 'MFA is implemented by technology and stops unauthorized access before it happens, making it technical and preventive.'
  },
  {
    o: '1.1',
    q: 'An organization performs an annual risk assessment and documents the results for executive review. Which of the following control categories does this activity fall under?',
    a: ['Technical', 'Physical', 'Managerial', 'Operational'],
    c: 2,
    e: 'Managerial (administrative) controls focus on risk management, governance, and policy, such as risk assessments.'
  },
  {
    o: '1.2',
    q: 'A web application verifies a user\'s username and password and then checks whether the user belongs to the "Finance" group before showing payroll reports. Which of the following describes the group check?',
    a: ['Authentication', 'Authorization', 'Accounting', 'Identification'],
    c: 1,
    e: 'Authorization determines what an authenticated user is permitted to access, such as reports allowed for a group.'
  },
  {
    o: '1.2',
    q: 'A distributed denial-of-service attack takes an e-commerce site offline for several hours. Which of the following security principles was MOST directly affected?',
    a: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
    c: 2,
    e: 'A DDoS attack prevents legitimate users from accessing the service, which is a loss of availability.'
  },
  {
    o: '1.2',
    q: 'A company deploys a set of decoy servers on an isolated subnet to study attacker techniques. Which of the following BEST describes this deployment?',
    a: ['Honeytoken', 'Honeynet', 'DMZ', 'Screened subnet'],
    c: 1,
    e: 'A honeynet is a network of multiple honeypots used to attract and observe attackers.'
  },
  {
    o: '1.2',
    q: 'A security architect wants to ensure that every access request is verified regardless of whether it originates inside or outside the corporate network. Which of the following concepts is the architect applying?',
    a: ['Defense in depth', 'Zero trust', 'Implicit trust', 'Security through obscurity'],
    c: 1,
    e: 'Zero trust assumes no implicit trust based on network location and verifies every request.'
  },
  {
    o: '1.2',
    q: 'Which of the following physical security controls detects an intruder by sensing changes in heat within a room?',
    a: ['Infrared sensor', 'Pressure sensor', 'Microwave sensor', 'Ultrasonic sensor'],
    c: 0,
    e: 'Infrared sensors detect body heat. Pressure sensors detect weight; microwave and ultrasonic sensors detect movement via reflected signals.'
  },
  {
    o: '1.2',
    q: 'In a zero trust architecture, which of the following components is located in the data plane and allows, monitors, or terminates the connection between a subject and a resource?',
    a: ['Policy engine', 'Policy administrator', 'Policy enforcement point', 'Adaptive identity'],
    c: 2,
    e: 'The policy enforcement point (PEP) sits in the data plane and enforces the decision made by the control plane.'
  },
  {
    o: '1.2',
    q: 'A company assigns a unique identifier to each device and requires it to authenticate with a certificate before joining the network. Which of the following concepts is being applied?',
    a: ['Authenticating systems', 'Authorization models', 'Gap analysis', 'Data sovereignty'],
    c: 0,
    e: 'Authenticating systems (devices) with certificates ensures only trusted devices can connect, not just trusted users.'
  },
  {
    o: '1.3',
    q: 'Which of the following individuals in the change management process is responsible for a system and must approve changes that affect it?',
    a: ['Stakeholder', 'Owner', 'Auditor', 'End user'],
    c: 1,
    e: 'The system or service owner is accountable for the asset and approves changes affecting it.'
  },
  {
    o: '1.3',
    q: 'After applying an approved change to an application server, the administrator updates the network diagrams and configuration records. Which of the following change management activities is this?',
    a: ['Impact analysis', 'Updating documentation', 'Test results', 'Backout planning'],
    c: 1,
    e: 'Updating diagrams, policies, and procedures after a change keeps documentation accurate.'
  },
  {
    o: '1.3',
    q: 'A change requires restarting a critical service. Which of the following technical implications should be considered to determine whether users will experience an outage?',
    a: ['Service restart and downtime', 'Version control', 'Allow lists', 'Legacy applications'],
    c: 0,
    e: 'Service restarts and downtime must be planned so the change does not cause unexpected outages.'
  },
  {
    o: '1.3',
    q: 'A development team tracks every modification to its infrastructure scripts so it can see who changed what and revert to earlier versions. Which of the following is the team using?',
    a: ['Version control', 'Change advisory board', 'Maintenance window', 'Standard operating procedure'],
    c: 0,
    e: 'Version control records the history of changes to code and configuration and allows rollback.'
  },
  {
    o: '1.4',
    q: 'A company wants to encrypt a database table that stores Social Security numbers without encrypting the entire database. Which of the following encryption levels should be used?',
    a: ['Full-disk', 'Partition', 'Record/field-level', 'Volume'],
    c: 2,
    e: 'Record- or field-level (column) encryption protects specific sensitive data within a database.'
  },
  {
    o: '1.4',
    q: 'Two parties need to agree on a shared symmetric key over an insecure network without ever sending the key itself. Which of the following should they use?',
    a: ['Diffie-Hellman', 'SHA-256', 'AES', 'HMAC'],
    c: 0,
    e: 'Diffie-Hellman is a key exchange algorithm that lets two parties derive a shared secret over an insecure channel.'
  },
  {
    o: '1.4',
    q: 'Which of the following provides confidentiality for data traveling between a browser and a web server?',
    a: ['TLS', 'Hashing', 'Digital signature', 'Code signing'],
    c: 0,
    e: 'TLS encrypts data in transit between the client and server.'
  },
  {
    o: '1.4',
    q: 'A mobile device manufacturer wants a dedicated, isolated processor area that protects biometric data even if the main operating system is compromised. Which of the following should be used?',
    a: ['Secure enclave', 'Key escrow', 'HSM cluster', 'Certificate authority'],
    c: 0,
    e: 'A secure enclave is an isolated hardware area that protects sensitive operations and data from the main OS.'
  },
  {
    o: '1.4',
    q: 'An organization runs its own internal certificate authority. The root CA is kept powered off and disconnected from the network. Which of the following BEST describes this practice?',
    a: ['Offline root CA', 'OCSP stapling', 'Certificate pinning', 'Self-signed certificate'],
    c: 0,
    e: 'Keeping the root CA offline protects its private key; intermediate CAs issue day-to-day certificates.'
  },
  {
    o: '1.4',
    q: 'A software company signs its application installers so customers can verify they came from the company and were not modified. Which of the following does this provide? (Select TWO).',
    a: ['Integrity', 'Authenticity', 'Availability', 'Confidentiality', 'Tokenization', 'Obfuscation'],
    c: [0, 1],
    e: 'Code signing proves the publisher\'s identity (authenticity) and that the code has not been altered (integrity).'
  },
  {
    o: '1.4',
    q: 'Which of the following allows a web server to include a time-stamped revocation status from the CA during the TLS handshake, reducing load on the CA?',
    a: ['OCSP stapling', 'CRL distribution point', 'Certificate pinning', 'Key escrow'],
    c: 0,
    e: 'With OCSP stapling, the server fetches a signed OCSP response and presents it to clients, so clients do not query the CA directly.'
  },
  {
    o: '1.4',
    q: 'An attacker finds two different files that produce the same hash value. Which of the following has occurred?',
    a: ['Collision', 'Salting', 'Key stretching', 'Downgrade'],
    c: 0,
    e: 'A collision occurs when two different inputs produce the same hash output, undermining integrity checks.'
  },
  {
    o: '1.4',
    q: 'A developer wants to make source code harder to read and reverse-engineer without changing what the code does. Which of the following should be used?',
    a: ['Obfuscation', 'Encryption at rest', 'Hashing', 'Tokenization'],
    c: 0,
    e: 'Obfuscation makes code or data difficult to understand while keeping its functionality.'
  },
  {
    o: '1.4',
    q: 'Which of the following asymmetric algorithms provides strong security with smaller key sizes, making it well suited to mobile and IoT devices?',
    a: ['ECC', 'RSA', '3DES', 'Blowfish'],
    c: 0,
    e: 'Elliptic curve cryptography (ECC) achieves equivalent strength to RSA with much smaller keys, saving power and processing.'
  },
  {
    o: '1.4',
    q: 'A company wants to ensure that if a server\'s long-term private key is compromised, previously recorded TLS sessions cannot be decrypted. Which of the following should be enabled?',
    a: ['Perfect forward secrecy', 'Key escrow', 'Certificate revocation', 'Wildcard certificates'],
    c: 0,
    e: 'Perfect forward secrecy uses ephemeral session keys (e.g., ECDHE), so compromising the long-term key does not expose past sessions.'
  }
]
