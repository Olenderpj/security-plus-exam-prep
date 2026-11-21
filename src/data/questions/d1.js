// Domain 1: General Security Concepts
// o = objective, q = question, a = options, c = correct index (or array for multi-select), e = explanation
export default [
  {
    o: '1.1',
    q: 'A company installs bollards in front of its data center entrance to prevent vehicles from ramming the building. Which of the following control types BEST describes this measure?',
    a: ['Physical preventive', 'Technical detective', 'Managerial corrective', 'Operational deterrent'],
    c: 0,
    e: 'Bollards are a physical control category whose primary purpose is to prevent an event (a vehicle reaching the building).'
  },
  {
    o: '1.1',
    q: 'After a ransomware incident, a systems administrator restores affected servers from known-good backups. Which of the following control types does the backup restoration represent?',
    a: ['Preventive', 'Detective', 'Corrective', 'Compensating'],
    c: 2,
    e: 'Corrective controls reduce the impact of an incident after it occurs and return systems to normal operation, such as restoring from backup.'
  },
  {
    o: '1.1',
    q: 'A legacy manufacturing system cannot be patched because the vendor no longer supports it. The security team places the system on an isolated VLAN with strict ACLs. Which of the following types of controls has the team implemented?',
    a: ['Deterrent', 'Compensating', 'Directive', 'Detective'],
    c: 1,
    e: 'A compensating control is an alternative measure used when the primary control (patching) cannot be implemented.'
  },
  {
    o: '1.1',
    q: 'A security manager publishes an acceptable use policy that all employees must read and sign. Which of the following control categories and types BEST describe this policy?',
    a: ['Technical, preventive', 'Physical, deterrent', 'Managerial, directive', 'Operational, corrective'],
    c: 2,
    e: 'Policies are managerial controls, and a policy telling users what they must or must not do is a directive control.'
  },
  {
    o: '1.1',
    q: 'Which of the following is an example of an operational control?',
    a: ['A firewall rule blocking inbound Telnet', 'A security guard checking badges at the lobby', 'A quarterly risk assessment report', 'Full-disk encryption on laptops'],
    c: 1,
    e: 'Operational controls are implemented by people rather than systems. Guards performing checks are an operational control (often also classed as physical).'
  },
  {
    o: '1.1',
    q: 'A company posts signs warning that the premises are monitored by CCTV and that trespassers will be prosecuted. Which of the following control types do the signs represent?',
    a: ['Deterrent', 'Corrective', 'Compensating', 'Detective'],
    c: 0,
    e: 'Warning signs discourage an attacker from attempting an action, which is the definition of a deterrent control.'
  },
  {
    o: '1.2',
    q: 'A user claims they never sent an email that contains a valid digital signature created with their private key. Which of the following security concepts prevents the user from successfully making this claim?',
    a: ['Confidentiality', 'Availability', 'Non-repudiation', 'Authorization'],
    c: 2,
    e: 'Non-repudiation provides proof of origin. Because only the user holds the private key, they cannot credibly deny signing the message.'
  },
  {
    o: '1.2',
    q: 'An organization is moving to a zero trust architecture. Which of the following components is responsible for making the decision to grant or deny a subject access to a resource?',
    a: ['Policy enforcement point', 'Policy engine', 'Implicit trust zone', 'Data plane'],
    c: 1,
    e: 'In the zero trust control plane, the policy engine decides whether to grant access; the policy administrator communicates that decision, and the policy enforcement point enforces it on the data plane.'
  },
  {
    o: '1.2',
    q: 'A security analyst places a fake file named "passwords.xlsx" on a file share and configures an alert whenever it is opened. Which of the following BEST describes this file?',
    a: ['Honeypot', 'Honeynet', 'Honeytoken', 'DNS sinkhole'],
    c: 2,
    e: 'A honeytoken is a fake piece of data (file, credential, record) that should never be accessed legitimately, so any access indicates malicious activity.'
  },
  {
    o: '1.2',
    q: 'A company wants to compare its current security posture against the requirements of a framework it plans to adopt. Which of the following should the company perform?',
    a: ['Penetration test', 'Gap analysis', 'Business impact analysis', 'Tabletop exercise'],
    c: 1,
    e: 'A gap analysis compares the current state against a desired state (such as a framework) to identify what is missing.'
  },
  {
    o: '1.2',
    q: 'Which of the following components of AAA is responsible for recording which resources a user accessed and for how long?',
    a: ['Authentication', 'Authorization', 'Accounting', 'Auditing'],
    c: 2,
    e: 'Accounting tracks user activity, such as resources accessed, session duration, and data transferred.'
  },
  {
    o: '1.2',
    q: 'A data center uses a small room with two interlocking doors where only one door can be open at a time to prevent tailgating. Which of the following BEST describes this control?',
    a: ['Access control vestibule', 'Bollard', 'Fencing', 'Pressure sensor'],
    c: 0,
    e: 'An access control vestibule (formerly mantrap) uses two doors that cannot be open at the same time, preventing piggybacking and tailgating.'
  },
  {
    o: '1.2',
    q: 'An attacker modifies financial records stored in a database without being detected. Which of the following principles of the CIA triad was violated?',
    a: ['Confidentiality', 'Integrity', 'Availability', 'Authenticity'],
    c: 1,
    e: 'Integrity ensures data is not altered without authorization. Unauthorized modification is an integrity violation.'
  },
  {
    o: '1.2',
    q: 'Which of the following zero trust concepts BEST describes dynamically adjusting access decisions based on user behavior, device posture, and location?',
    a: ['Implicit trust zones', 'Adaptive identity', 'Separation of duties', 'Threat scope reduction'],
    c: 1,
    e: 'Adaptive identity uses contextual signals (location, device health, behavior) to adjust authentication and authorization requirements in real time.'
  },
  {
    o: '1.3',
    q: 'A change request to upgrade a production database has been approved. Which of the following should be documented BEFORE the change is implemented in case the upgrade fails?',
    a: ['Backout plan', 'Impact analysis', 'Stakeholder list', 'Maintenance window'],
    c: 0,
    e: 'A backout (rollback) plan describes how to return the system to its previous state if the change fails.'
  },
  {
    o: '1.3',
    q: 'A security team must apply a critical patch to a web server. Which of the following would BEST minimize disruption to end users?',
    a: ['Applying the patch immediately during business hours', 'Scheduling the change during an approved maintenance window', 'Allow listing the patch in the firewall', 'Updating the version control repository'],
    c: 1,
    e: 'Maintenance windows are scheduled, approved periods when changes can be made with the least business impact.'
  },
  {
    o: '1.3',
    q: 'A developer updates a firewall configuration without submitting a change request. The change causes an outage. Which of the following processes would MOST likely have prevented this outage?',
    a: ['Change management', 'Asset management', 'Incident response', 'Vulnerability scanning'],
    c: 0,
    e: 'Change management requires changes to be requested, reviewed, tested, and approved, which reduces the chance of unplanned outages.'
  },
  {
    o: '1.3',
    q: 'During a change advisory board meeting, a member asks which applications rely on the server being upgraded. Which of the following technical change management considerations is being discussed?',
    a: ['Allow lists', 'Dependencies', 'Legacy applications', 'Restricted activities'],
    c: 1,
    e: 'Dependencies identify other systems or services that rely on the component being changed and could be affected.'
  },
  {
    o: '1.4',
    q: 'A company needs to ensure that data stored on employee laptops remains confidential if a laptop is stolen. Which of the following is the BEST solution?',
    a: ['Full-disk encryption', 'Hashing', 'Data masking', 'Digital signatures'],
    c: 0,
    e: 'Full-disk encryption protects data at rest so it cannot be read without the decryption key, even if the drive is removed.'
  },
  {
    o: '1.4',
    q: 'A security engineer needs to store user passwords so that identical passwords do NOT produce identical stored values. Which of the following should the engineer implement?',
    a: ['Symmetric encryption', 'Salting', 'Tokenization', 'Steganography'],
    c: 1,
    e: 'A salt is a random value added to each password before hashing, ensuring identical passwords yield different hashes and defeating rainbow tables.'
  },
  {
    o: '1.4',
    q: 'Which of the following hardware components is embedded on a motherboard and is used to store encryption keys for full-disk encryption and secure boot measurements?',
    a: ['HSM', 'TPM', 'Secure enclave', 'Key escrow'],
    c: 1,
    e: 'A Trusted Platform Module (TPM) is a chip on the motherboard that stores keys and platform integrity measurements. An HSM is typically a separate network or PCIe appliance.'
  },
  {
    o: '1.4',
    q: 'A certificate authority needs to inform clients in real time whether a specific certificate has been revoked. Which of the following should be used?',
    a: ['CRL', 'OCSP', 'CSR', 'Wildcard certificate'],
    c: 1,
    e: 'The Online Certificate Status Protocol (OCSP) provides real-time revocation status for an individual certificate. A CRL is a periodically published list.'
  },
  {
    o: '1.4',
    q: 'An administrator needs a single certificate that will secure www.example.com, mail.example.com, and shop.example.com. Which of the following is the MOST efficient choice?',
    a: ['Self-signed certificate', 'Wildcard certificate', 'Root certificate', 'Code-signing certificate'],
    c: 1,
    e: 'A wildcard certificate (*.example.com) covers all first-level subdomains of a domain with one certificate.'
  },
  {
    o: '1.4',
    q: 'Alice wants to send Bob a message that only Bob can read. Which key should Alice use to encrypt the message?',
    a: ["Alice's private key", "Alice's public key", "Bob's public key", "Bob's private key"],
    c: 2,
    e: "In asymmetric encryption, data encrypted with the recipient's public key can only be decrypted with the recipient's private key."
  },
  {
    o: '1.4',
    q: 'Which of the following techniques replaces sensitive data such as a credit card number with a random value that has no mathematical relationship to the original data?',
    a: ['Hashing', 'Tokenization', 'Encryption', 'Key stretching'],
    c: 1,
    e: 'Tokenization substitutes a random token for sensitive data; the mapping is stored in a secure token vault. Encrypted data can be reversed mathematically with the key.'
  },
  {
    o: '1.4',
    q: 'A company wants to make brute-force attacks against stored password hashes more time-consuming. Which of the following should be implemented? (Select TWO).',
    a: ['PBKDF2', 'bcrypt', 'MD5', 'ROT13', 'Base64', 'SHA-1'],
    c: [0, 1],
    e: 'PBKDF2 and bcrypt are key stretching algorithms that repeatedly hash input, increasing the computational cost of each guess.'
  },
  {
    o: '1.4',
    q: 'A user downloads an installer and compares its SHA-256 value to the one published on the vendor website. Which of the following is the user verifying?',
    a: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
    c: 1,
    e: 'Comparing hashes verifies the file has not been modified, which confirms integrity.'
  },
  {
    o: '1.4',
    q: 'Which of the following describes a decentralized, distributed ledger that records transactions in a way that makes them very difficult to alter?',
    a: ['Certificate revocation list', 'Blockchain', 'Key escrow', 'Open public ledger maintained by a CA'],
    c: 1,
    e: 'Blockchain is a distributed public ledger in which each block is cryptographically linked to the previous block, making tampering evident.'
  },
  {
    o: '1.4',
    q: 'An organization requires that a copy of all encryption keys be held by a trusted third party so data can be recovered if keys are lost. Which of the following does this describe?',
    a: ['Key stretching', 'Key exchange', 'Key escrow', 'Perfect forward secrecy'],
    c: 2,
    e: 'Key escrow is the practice of storing keys with a trusted third party for recovery purposes.'
  },
  {
    o: '1.4',
    q: 'Which of the following encryption algorithms is symmetric and is the current standard used for bulk data encryption?',
    a: ['RSA', 'ECC', 'AES', 'Diffie-Hellman'],
    c: 2,
    e: 'AES is a symmetric block cipher used for bulk encryption. RSA and ECC are asymmetric; Diffie-Hellman is a key exchange algorithm.'
  },
  {
    o: '1.4',
    q: 'A web server administrator generates a key pair and sends a file to a certificate authority to obtain a signed certificate. Which of the following did the administrator send?',
    a: ['CRL', 'CSR', 'OCSP stapling response', 'PFX file containing the private key'],
    c: 1,
    e: 'A certificate signing request (CSR) contains the public key and identifying information. The private key never leaves the server.'
  },
  {
    o: '1.4',
    q: 'A security analyst finds a seemingly ordinary image file that contains hidden instructions for malware. Which of the following techniques was used?',
    a: ['Steganography', 'Tokenization', 'Data masking', 'Salting'],
    c: 0,
    e: 'Steganography hides data inside other data, such as an image or audio file, to obscure its existence.'
  }
]
