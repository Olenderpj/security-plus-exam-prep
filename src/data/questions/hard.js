// Hard tier: exam-level questions where two options look plausible and the distinction matters.
// d = domain, o = objective, lv = difficulty on the 1–10 scale used by the adaptive system
// (see src/lib/difficulty.js), q = question, a = options, c = correct index (or array), e = explanation,
// x = optional exhibit. Correct answers are spread across positions; options are shuffled at runtime anyway.
export default [
  // ───────────── Domain 1 ─────────────
  {
    d: 1, o: '1.2', lv: 8,
    q: 'In a zero trust architecture, the policy engine has decided to grant a user access to an internal application. Which component is then responsible for generating the session-specific credential or token and instructing the policy enforcement point to open the communication path?',
    a: ['Policy enforcement point', 'Adaptive identity', 'Policy administrator', 'Data plane'],
    c: 2,
    e: 'The policy engine makes the decision; the policy administrator carries it out by creating the access token or credential and configuring the enforcement point. The policy enforcement point (data plane) only enforces that decision at the resource.'
  },
  {
    d: 1, o: '1.4', lv: 8,
    q: 'A vendor distributes firmware updates over a public website. Customers must be able to verify that an update was not modified AND that it genuinely came from the vendor, without sharing any secret with the vendor. Which of the following BEST meets both requirements?',
    a: [
      'Publishing a SHA-256 hash of the file beside the download',
      'Encrypting the file with a symmetric key shared with each customer',
      'Appending an HMAC computed with a key shared between the vendor and customers',
      'Signing the file with the vendor\'s private key and distributing the vendor\'s certificate'
    ],
    c: 3,
    e: 'A digital signature provides integrity and authenticity (and non-repudiation) using asymmetric keys, so no shared secret is needed. A bare hash can be replaced along with the file, and an HMAC needs a shared secret and cannot prove origin to a third party.'
  },
  {
    d: 1, o: '1.4', lv: 7.5,
    q: 'A company must send a 2 TB encrypted backup to a partner over an untrusted network and must also deliver the encryption key securely. Which approach is MOST appropriate?',
    a: [
      'Encrypt the backup with AES and encrypt the AES key with the partner\'s RSA public key',
      'Encrypt the entire backup with the partner\'s RSA public key',
      'Encrypt the backup with AES and send the AES key in a separate email',
      'Hash the backup with SHA-256 and send the hash and the file over TLS'
    ],
    c: 0,
    e: 'This is hybrid encryption: fast symmetric encryption for the bulk data and asymmetric encryption to protect (wrap) the symmetric key. Asymmetric algorithms are too slow for large data, and sending the key in the clear defeats the protection.'
  },
  {
    d: 1, o: '1.4', lv: 7,
    q: 'Which TWO of the following are designed to make password hashes slower to brute-force by applying many iterations or a tunable work factor? (Select TWO).',
    a: ['bcrypt', 'SHA-256', 'PBKDF2', 'AES-256', 'HMAC'],
    c: [0, 2],
    e: 'bcrypt and PBKDF2 are key-stretching functions that add a work factor. SHA-256 and HMAC are fast by design, and AES is a cipher rather than a password-hashing function.'
  },

  // ───────────── Domain 2 ─────────────
  {
    d: 2, o: '2.4', lv: 7.5,
    q: 'An administrator reviews authentication logs and sees one or two failed logins per account against 4,000 different accounts over several days, all using the password "Winter2025!". No account was locked out. Which of the following attacks does this MOST likely indicate?',
    a: ['Credential stuffing', 'Brute force', 'Rainbow table attack', 'Password spraying'],
    c: 3,
    e: 'Password spraying tries a few common passwords across many accounts to stay under lockout thresholds. Credential stuffing replays username/password pairs leaked from other breaches, and brute force hammers one account with many guesses.'
  },
  {
    d: 2, o: '2.3', lv: 8.5,
    q: 'A web application accepts XML uploads. A penetration tester submits a document whose DOCTYPE defines an external entity pointing to file:///etc/passwd, and the contents of that file appear in the application\'s response. Which vulnerability does this demonstrate?',
    a: ['Cross-site request forgery (CSRF)', 'XML external entity (XXE) injection', 'Server-side request forgery (SSRF)', 'Insecure deserialization of XML objects'],
    c: 1,
    e: 'Resolving an external entity in a DTD to read a local file is the signature of XXE. SSRF makes the server issue requests (usually HTTP to internal hosts) on the attacker\'s behalf, and the other options do not involve entity expansion.'
  },
  {
    d: 3, o: '3.2', lv: 8,
    q: 'Which TWO controls on an access-layer switch BEST mitigate ARP spoofing from a compromised host? (Select TWO).',
    a: ['Dynamic ARP inspection', 'BPDU guard', 'DHCP snooping', 'Increasing the ARP cache timeout', 'Disabling CDP'],
    c: [0, 2],
    e: 'Dynamic ARP inspection validates ARP packets against the DHCP snooping binding table, so the two work together. BPDU guard protects spanning tree, and ARP timeouts or CDP do not stop forged ARP replies.'
  },
  {
    d: 2, o: '2.4', lv: 8,
    q: 'An EDR platform alerts that winword.exe spawned powershell.exe, which then injected code into explorer.exe and opened an outbound connection to an unknown host. A scan finds no malicious executable on disk. Which of the following is the MOST likely explanation?',
    a: [
      'A rootkit has replaced a kernel driver to hide its processes',
      'A logic bomb has been triggered by a scheduled date and time',
      'Fileless malware is running in memory using built-in tools',
      'Ransomware has begun encrypting the user documents on the workstation'
    ],
    c: 2,
    e: 'Office spawning PowerShell, in-memory injection and no on-disk payload indicate fileless malware abusing built-in tools. Nothing in the alert points to a rootkit driver, a date-based logic bomb or encryption activity.'
  },
  {
    d: 2, o: '2.4', lv: 7.5,
    q: 'A SIEM reports that a finance manager logged in from the corporate office, and 12 minutes later successfully authenticated from a foreign country. Shortly afterward, a mailbox rule was created that forwards messages containing "invoice" to an external address. Which of the following is MOST likely occurring?',
    a: [
      'The user is traveling and using a VPN',
      'A compromised account is being used for business email compromise',
      'A rogue access point is performing an evil twin attack',
      'A DDoS attack is targeting the mail server'
    ],
    c: 1,
    e: 'Impossible travel plus a new forwarding rule is a classic sign of a compromised account being used to monitor and divert payment-related email (business email compromise). Legitimate travel would not explain the rule, and the other attacks do not match the indicators.'
  },
  {
    d: 2, o: '2.3', lv: 8,
    x: '203.0.113.77 - - [12/Mar/2025:10:14:22] "GET /products?id=5%27%20OR%20%271%27%3D%271 HTTP/1.1" 200 48211\n203.0.113.77 - - [12/Mar/2025:10:14:25] "GET /products?id=5%27%20UNION%20SELECT%20username,password%20FROM%20users-- HTTP/1.1" 200 9120',
    q: 'Review the web server log. Which of the following controls would be the MOST effective at eliminating the underlying vulnerability being exploited?',
    a: [
      'Deploying a web application firewall in front of the site',
      'Encoding all output returned to the browser by the application',
      'Using parameterized queries (prepared statements) in the application',
      'Rate-limiting requests from each source address at the load balancer'
    ],
    c: 2,
    e: 'The requests inject SQL (OR \'1\'=\'1\', UNION SELECT) through the id parameter. Parameterized queries fix the root cause. A WAF is a compensating control that can be bypassed, output encoding addresses XSS, and rate limiting only slows an attacker.'
  },

  // ───────────── Domain 3 ─────────────
  {
    d: 3, o: '3.2', lv: 8.5,
    x: 'Firewall rules (processed top to bottom, first match wins)\n10  permit tcp any         host 10.1.1.5  eq 443\n20  deny   tcp any         any\n30  permit tcp 10.2.0.0/16 host 10.1.1.5  eq 22\n40  permit icmp any any',
    q: 'Administrators on the 10.2.0.0/16 network report they cannot SSH to 10.1.1.5, although rule 30 appears to allow it. Which of the following is the MOST likely cause and fix?',
    a: [
      'Rule 30 is missing an implicit deny; add a deny any any at the end',
      'Rule 20 matches the SSH traffic first; move rule 30 above rule 20',
      'Rule 10 permits HTTPS only from internal hosts; change "any" to 10.2.0.0/16',
      'Rule 40 permits ICMP, which blocks TCP; remove rule 40'
    ],
    c: 1,
    e: 'Rules are evaluated in order and the first match applies. SSH (tcp/22) from 10.2.0.0/16 matches the broad deny in rule 20 before it reaches rule 30. Moving the specific permit above the deny fixes it.'
  },
  {
    d: 3, o: '3.1', lv: 7,
    q: 'A DevOps team adopts immutable infrastructure for its web tier. Which of the following is the PRIMARY security benefit of this approach?',
    a: [
      'It encrypts data at rest on every instance automatically using keys managed by the provider',
      'It allows administrators to log in and hot-fix production servers faster',
      'It eliminates the need to scan images for vulnerabilities because instances are never changed',
      'It prevents configuration drift because instances are replaced from a known-good image, not modified in place'
    ],
    c: 3,
    e: 'Immutable infrastructure replaces instances from a known-good image rather than patching or editing them in place, which prevents drift and unauthorized changes. It does not by itself provide encryption, and images still need vulnerability scanning.'
  },
  {
    d: 3, o: '3.3', lv: 8,
    q: 'Developers need a copy of the production customer database for testing. The data must keep realistic formats (such as valid-looking card and SSN patterns), but it must be impossible to recover the original values. Which of the following should be used?',
    a: ['Data masking', 'Tokenization with a secured token vault', 'Encrypting the columns with AES-256', 'Hashing the columns with SHA-256'],
    c: 0,
    e: 'Static data masking replaces sensitive values with realistic but fictitious data and cannot be reversed. Tokenization and encryption are reversible by design (through the vault or the key), and a hash would not preserve the format.'
  },
  {
    d: 3, o: '3.4', lv: 8.5,
    q: 'A business impact analysis sets an RPO of 15 minutes and an RTO of 4 hours for an order system. Which of the following is the MOST cost-effective strategy that meets both requirements?',
    a: [
      'Nightly tape backups with a contract for a hot site',
      'Synchronous replication to a hot site',
      'Hourly snapshots stored for restore at a cold site',
      'Asynchronous replication every 5 minutes to a warm site'
    ],
    c: 3,
    e: 'Five-minute replication satisfies the 15-minute RPO, and a warm site can be brought online within 4 hours. Nightly or hourly backups violate the RPO, a cold site cannot meet a 4-hour RTO, and synchronous replication to a hot site exceeds the requirements at higher cost.'
  },
  {
    d: 3, o: '3.2', lv: 7.5,
    q: 'A hospital places an in-line IPS in front of its patient-monitoring network. Leadership states that a device failure must never interrupt patient monitoring, even if that means temporarily losing protection. How should the IPS be configured?',
    a: ['Fail-closed', 'Fail-open', 'Passive tap (IDS) mode', 'Active/active clustering with fail-closed on both nodes'],
    c: 1,
    e: 'Fail-open lets traffic continue when the device fails, prioritizing availability over security. Fail-closed would block traffic and interrupt monitoring, and passive mode gives up prevention altogether.'
  },
  {
    d: 3, o: '3.2', lv: 7,
    q: 'Which TWO capabilities does a cloud access security broker (CASB) provide? (Select TWO).',
    a: [
      'Discovering unsanctioned SaaS usage (shadow IT)',
      'Absorbing volumetric DDoS attacks',
      'Issuing digital certificates to users',
      'Enforcing data loss prevention policies on data uploaded to SaaS applications',
      'Replacing the need for endpoint antivirus'
    ],
    c: [0, 3],
    e: 'A CASB sits between users and cloud services to discover shadow IT and enforce policies such as DLP. DDoS mitigation, certificate issuance and endpoint protection are handled by other tools.'
  },

  // ───────────── Domain 4 ─────────────
  {
    d: 4, o: '4.8', lv: 8,
    q: 'An analyst confirms that a workstation is running ransomware that is actively encrypting a mapped network share. The incident response plan requires preserving volatile evidence. Which of the following is the BEST immediate action?',
    a: [
      'Power off the workstation by holding the power button',
      'Restore the encrypted files from last night\'s backup',
      'Run a full antivirus scan and quarantine the detections',
      'Disconnect the workstation from the network but leave it powered on'
    ],
    c: 3,
    e: 'Isolating the host stops the encryption and spread while leaving memory intact for forensics. Powering off destroys volatile data, restoring is a recovery step done after eradication, and scanning a live infected host alters evidence and does not stop the encryption quickly.'
  },
  {
    d: 4, o: '4.9', lv: 9,
    x: '09:14:01 EventID=4625 Account=administrator  Src=203.0.113.50 LogonType=3\n09:14:02 EventID=4625 Account=backup         Src=203.0.113.50 LogonType=3\n09:14:03 EventID=4625 Account=jsmith         Src=203.0.113.50 LogonType=3\n09:14:04 EventID=4625 Account=svc-sql        Src=203.0.113.50 LogonType=3\n09:41:17 EventID=4625 Account=administrator  Src=203.0.113.50 LogonType=3\n09:41:18 EventID=4624 Account=jsmith         Src=203.0.113.50 LogonType=3\n09:41:55 EventID=4624 Account=jsmith         Src=203.0.113.50 LogonType=10',
    q: 'Which conclusion is BEST supported by this Windows security log excerpt?',
    a: [
      'A pass-the-hash attack moved laterally from jsmith to the administrator account',
      'Password guessing against several accounts succeeded for jsmith, followed by a remote desktop session',
      'A user forgot a password, tried several accounts, then logged in at the local console',
      'A Kerberoasting attack extracted service tickets and cracked the svc-sql password offline'
    ],
    c: 1,
    e: 'Event 4625 is a failed logon and 4624 a successful one. Failures across several accounts from one external IP, then a success for jsmith, then LogonType 10 (RemoteInteractive, i.e., RDP) indicate a successful guessing attack and remote access. Nothing shows hash reuse, a console logon (type 2) or ticket requests.'
  },
  {
    d: 4, o: '4.4', lv: 7,
    q: 'A SOC receives hundreds of daily alerts from a correlation rule that detects port scans. Nearly all of them come from the company\'s authorized vulnerability scanner. Which of the following BEST reduces alert fatigue without weakening detection of real reconnaissance?',
    a: [
      'Disable the port scan correlation rule',
      'Raise the rule threshold so it only triggers on scans of more than 10,000 ports',
      'Shorten log retention so fewer events are available to correlate',
      'Add the scanner\'s source IP address as an exception to the rule'
    ],
    c: 3,
    e: 'Tuning the rule with a narrowly scoped exception for the known scanner removes the false positives while keeping the rule active for everything else. Disabling it or raising thresholds blinds the SOC to real scans, and retention does not address the noise.'
  },
  {
    d: 4, o: '4.6', lv: 7.5,
    q: 'Developers need domain admin rights about once per quarter to deploy a release. The security team wants approval for each request, automatic expiration of the elevated rights, and recorded sessions. Which of the following BEST meets these requirements?',
    a: [
      'Just-in-time access through a privileged access management (PAM) solution',
      'Adding the developers to the Domain Admins group permanently',
      'Role-based access control with a "Release Manager" role',
      'Single sign-on with multifactor authentication for all developer accounts'
    ],
    c: 0,
    e: 'PAM with just-in-time elevation provides approval workflows, time-limited credentials and session recording. Permanent membership violates least privilege, RBAC alone does not expire or record access, and SSO/MFA authenticate users but do not govern privileged sessions.'
  },
  {
    d: 4, o: '4.6', lv: 8.5,
    q: 'A mobile application will let users sign in with their corporate identity provider and needs to receive a signed JSON Web Token containing the user\'s identity claims. Which of the following protocols is designed for this purpose?',
    a: ['SAML', 'OAuth 2.0 by itself', 'RADIUS', 'OpenID Connect'],
    c: 3,
    e: 'OpenID Connect is an authentication layer on top of OAuth 2.0 that returns an ID token (a JWT). OAuth 2.0 alone handles authorization and does not define user identity, SAML uses XML assertions (typically for browser SSO), and RADIUS is used for network access AAA.'
  },
  {
    d: 4, o: '4.3', lv: 8,
    q: 'A vulnerability scan returns two findings. Finding 1: CVSS 9.8 on an internal file server that has no inbound access from outside the data center and no known exploit. Finding 2: CVSS 6.5 on an internet-facing web server for which exploitation is being actively reported in the wild. Which of the following should be remediated FIRST?',
    a: [
      'Finding 1, because it has the higher CVSS base score',
      'Finding 2, because it is exposed and being actively exploited',
      'Finding 1, because file servers hold more data',
      'Neither; both should wait for the next patch cycle'
    ],
    c: 1,
    e: 'Prioritization should weigh exploitability, exposure and asset context, not the CVSS base score alone. An internet-facing system under active exploitation presents the greater immediate risk.'
  },
  {
    d: 4, o: '4.5', lv: 8.5,
    q: 'Attackers are sending phishing emails whose visible From address is ceo@example.com. The messages pass SPF because they are sent from a domain the attacker controls. Which of the following would help the organization detect and block this spoofing of its visible From domain?',
    a: [
      'Adding a stricter -all mechanism to the SPF record of the organization domain',
      'Enabling DKIM signing on all outbound mail from the organization domain',
      'Publishing a DMARC policy requiring SPF or DKIM alignment with the From domain',
      'Enforcing TLS on all inbound SMTP connections from external mail servers'
    ],
    c: 2,
    e: 'SPF validates the envelope sender, not the visible From header, so it can pass for an attacker\'s own domain. DMARC requires the authenticated domain (SPF or DKIM) to align with the From header and lets the domain owner request quarantine or reject.'
  },
  {
    d: 4, o: '4.1', lv: 6.5,
    q: 'A development team wants to find crashes and unexpected behavior in a running application by automatically sending it large volumes of malformed and random input. Which of the following testing techniques is this?',
    a: ['Static application security testing', 'Fuzzing', 'Software composition analysis', 'Code signing verification'],
    c: 1,
    e: 'Fuzzing feeds a running program invalid, unexpected or random input to expose crashes and vulnerabilities. SAST analyzes source code without running it, and SCA inventories third-party components.'
  },
  {
    d: 4, o: '4.2', lv: 7.5,
    q: 'A company will redeploy laptops with self-encrypting SSDs to other departments. The drives held regulated data and must be sanitized so they can be reused. Which of the following is the BEST method?',
    a: ['Degaussing the drives', 'Shredding the drives', 'Deleting the files and emptying the recycle bin', 'Cryptographic erase'],
    c: 3,
    e: 'Cryptographic erase destroys the media encryption key, rendering the data unrecoverable while leaving the drive usable. Degaussing is ineffective on flash storage, shredding prevents reuse, and deleting files leaves recoverable data.'
  },

  // ───────────── Domain 5 ─────────────
  {
    d: 5, o: '5.2', lv: 9,
    q: 'An asset is valued at $200,000 with an exposure factor of 25% and an annualized rate of occurrence (ARO) of 0.5. A proposed control costs $20,000 per year and would reduce the ARO to 0.1. Which of the following BEST describes the financial result of implementing the control?',
    a: [
      'It saves $25,000 per year, so it is justified',
      'The control costs more than it saves, so it should be rejected',
      'Annual savings equal the annual cost, so the control breaks even',
      'The new ALE is only $5,000, so it is clearly justified'
    ],
    c: 2,
    e: 'SLE = 200,000 × 0.25 = 50,000. The original ALE is 50,000 × 0.5 = 25,000 and the new ALE is 50,000 × 0.1 = 5,000, so savings are 20,000 per year, exactly the control\'s cost: a break-even result.'
  },
  {
    d: 5, o: '5.1', lv: 6.5,
    q: 'Which role is ultimately accountable for deciding how a dataset is classified and who may be granted access to it?',
    a: ['Data custodian', 'Data processor', 'Data subject', 'Data owner'],
    c: 3,
    e: 'The data owner is accountable for the data and sets its classification and access requirements. The custodian implements the controls, the processor handles data on the controller\'s behalf, and the subject is the person the data describes.'
  },
  {
    d: 5, o: '5.4', lv: 7,
    q: 'Under GDPR, a data controller discovers a breach of EU residents\' personal data that is likely to result in a risk to individuals. Within what timeframe must the controller notify the supervisory authority, where feasible?',
    a: ['Within 24 hours of the breach occurring', 'Within 72 hours of becoming aware', 'Within 30 days of becoming aware', 'Within 90 days of becoming aware'],
    c: 1,
    e: 'GDPR requires notification to the supervisory authority without undue delay and, where feasible, within 72 hours of becoming aware of the breach.'
  },
  {
    d: 5, o: '5.5', lv: 6.5,
    q: 'A penetration tester is given a valid low-privilege user account and a network diagram, but no source code or administrative credentials. Which type of engagement is this?',
    a: ['Unknown environment (black box)', 'Known environment (white box)', 'Purple team exercise', 'Partially known environment (gray box)'],
    c: 3,
    e: 'A partially known environment (gray box) gives the tester some information such as limited credentials or documentation. Unknown (black box) provides none and known (white box) provides full details.'
  }
]
