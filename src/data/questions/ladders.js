// Difficulty ladders: one concept asked at four rungs of increasing difficulty (lv 5.5 → 9.5).
// Harder rungs raise the bar on BOTH the question and the answers: scenarios get more specific, options
// become look-alikes that are each partly true, answers need qualifiers (the BEST or MOST complete one),
// and the top rungs use "Select TWO". Only one rung per ladder is served in a session, favouring the rung
// closest to the learner's level in that sub-section.
//   d = domain, o = objective (a rung may override with its own o), topic = label for the concept
export default [
  // ═════════════ Domain 1 ═════════════
  {
    d: 1, o: '1.4', topic: 'Certificate revocation and chains',
    rungs: [
      {
        lv: 5.5,
        q: 'A browser must check whether a single server certificate has been revoked without downloading a complete list of revoked certificates. Which mechanism does this?',
        a: ['CRL distribution point', 'OCSP', 'Certificate pinning', 'Key escrow'],
        c: 1,
        e: 'The Online Certificate Status Protocol answers a status query for an individual certificate. A CRL is a complete list that the client must download and search.'
      },
      {
        lv: 7,
        q: "A web server's OCSP responder is slow, which delays page loads, and each lookup also reveals to the CA which sites users visit. Which configuration BEST addresses both problems?",
        a: [
          'Switch clients to download CRLs once a day',
          'Enable OCSP stapling on the web server',
          'Store the private key in a hardware security module',
          'Replace the certificate with a wildcard certificate'
        ],
        c: 1,
        e: 'With stapling, the server periodically fetches a signed OCSP response and presents it during the handshake, so clients no longer query the CA (faster, and no privacy leak). CRLs, HSMs and wildcards do not change how revocation is checked.'
      },
      {
        lv: 8.5,
        q: 'Users report a certificate warning for an internal site on some devices but not others. The server presents only its own (leaf) certificate, and the affected devices have never visited another site issued by the same intermediate CA. Which is the MOST likely cause and fix?',
        a: [
          'The root CA is untrusted on those devices; replace the root with a self-signed certificate',
          'The wildcard does not cover the hostname; reissue the certificate with a SAN entry',
          'The certificate has been revoked; generate a new key pair and request another certificate',
          'The server is not sending the intermediate certificate; configure it to present the full chain'
        ],
        c: 3,
        e: 'Devices that already cached the intermediate can build the chain; the rest cannot because the server never sends it. Configuring the server to send the full chain fixes it. A revoked or mismatched certificate would fail on every device.'
      },
      {
        lv: 9.5,
        q: "An organization's internal intermediate CA signing key is suspected to be compromised. Which TWO actions are MOST appropriate? (Select TWO).",
        a: [
          'Revoke the intermediate CA certificate and publish updated revocation information from the root',
          'Reissue the intermediate certificate using the same key pair to avoid re-enrolling endpoints',
          'Generate a new intermediate key pair and reissue certificates signed by the new intermediate',
          'Extend the validity period of the intermediate so existing certificates keep working',
          'Disable certificate validation on endpoints until the investigation ends'
        ],
        c: [0, 2],
        e: 'A compromised signing key must be revoked, and trust rebuilt under a new key pair. Reusing the compromised key, extending its validity or disabling validation all leave attackers able to issue trusted certificates.'
      }
    ]
  },
  {
    d: 1, o: '1.4', topic: 'Integrity and authenticity mechanisms',
    rungs: [
      {
        lv: 5.5,
        q: 'Which of the following provides integrity for a file but does NOT authenticate who created it?',
        a: ['A SHA-256 hash', 'A digital signature', 'HMAC-SHA256', 'An X.509 certificate'],
        c: 0,
        e: 'Anyone can compute a plain hash, so it detects changes but proves nothing about the sender. HMACs and signatures add authentication.'
      },
      {
        lv: 7,
        q: 'Two internal services share a secret key. They must verify that API messages were not altered and came from the other service, with minimal processing overhead. Which is MOST appropriate?',
        a: [
          'A SHA-3 hash appended to each message',
          'An HMAC computed with the shared key',
          'An RSA digital signature using each service\'s key pair',
          'AES-CBC encryption without a separate integrity check'
        ],
        c: 1,
        e: 'An HMAC gives integrity and authenticity cheaply when both sides hold the key. A bare hash can be recomputed by an attacker, signatures are heavier than needed, and unauthenticated CBC encryption can be tampered with.'
      },
      {
        lv: 8.5,
        q: 'A design requires a single symmetric-key operation that keeps data confidential, makes tampering detectable, and authenticates the data. Which of the following BEST meets this?',
        a: ['AES in ECB mode with a random key', 'AES-GCM', 'AES-CBC with PKCS#7 padding', 'RSA-OAEP'],
        c: 1,
        e: 'AES-GCM is an authenticated-encryption (AEAD) mode that provides confidentiality and integrity together. ECB leaks patterns, CBC alone has no integrity, and RSA-OAEP is asymmetric.'
      },
      {
        lv: 9.5,
        q: "A payment platform's auditors require that a sender cannot later deny creating a transaction, even if the receiver's systems are fully compromised. Which design BEST provides this?",
        a: [
          "Authenticate each transaction with an HMAC using a key shared with the receiver",
          "Encrypt each transaction with the receiver public key and log the ciphertext",
          "Sign each transaction with a private key that only the sender holds, stored in an HSM",
          "Hash each transaction and store the hash in the receiver's database"
        ],
        c: 2,
        e: 'Non-repudiation requires a key only the sender holds. With an HMAC, the receiver also holds the key and could forge messages, so it proves nothing to a third party. Encryption to the receiver and stored hashes prove nothing about origin.'
      }
    ]
  },
  {
    d: 1, o: '1.2', topic: 'Zero trust architecture',
    rungs: [
      {
        lv: 5.5,
        q: 'In zero trust architecture, which of the following BEST describes the control plane?',
        a: [
          'The policy engine and policy administrator that decide and configure access',
          'The switches that forward user traffic between segments',
          'The enforcement point that sits in front of the resource',
          'The encrypted tunnel between a device and the application'
        ],
        c: 0,
        e: 'The control plane makes and applies access decisions (policy engine, policy administrator). The data plane carries traffic and includes the policy enforcement point.'
      },
      {
        lv: 7,
        q: 'A zero trust deployment adjusts how strongly a user must authenticate based on signals such as device posture, location and behavior. Which concept does this describe?',
        a: ['Implicit trust zones', 'Threat scope reduction', 'Adaptive identity', 'Subject/system separation'],
        c: 2,
        e: 'Adaptive identity changes authentication requirements according to context and risk. Threat scope reduction limits what a compromise can reach, and implicit trust zones are what zero trust tries to eliminate.'
      },
      {
        lv: 8.5,
        q: 'A user passed MFA at 09:00 from a managed laptop. At 09:30 the endpoint agent reports that EDR was disabled and the user begins bulk-downloading files. Under zero trust principles, which response is BEST?',
        a: [
          'Keep the session open until the token expires, because MFA already succeeded',
          'Require a password change at the next sign-in and then restore full access',
          'Re-evaluate the session continuously and restrict or revoke access based on the new risk signals',
          'Move the device into an implicit trust zone to reduce authentication prompts'
        ],
        c: 2,
        e: 'Zero trust verifies continuously, not only at login. New signals (EDR disabled, abnormal downloads) should trigger a policy re-evaluation that limits or ends the session.'
      },
      {
        lv: 9.5,
        q: 'Which TWO design choices BEST apply zero trust principles when giving a contractor access to a single internal web application? (Select TWO).',
        a: [
          "Provide a VPN into the flat internal network and rely on the corporate firewall",
          'Publish the application through an identity-aware proxy that evaluates user and device posture on every request',
          'Create a shared contractor account with a long-lived password to simplify offboarding',
          'Grant least-privilege access that is time-boxed and expires automatically',
          "Place the contractor's laptop in the trusted internal VLAN"
        ],
        c: [1, 3],
        e: 'Per-request evaluation through an identity-aware proxy and least-privilege, expiring access fit zero trust. A flat VPN, shared long-lived credentials and an internal trusted VLAN all grant broad implicit trust.'
      }
    ]
  },

  // ═════════════ Domain 2 ═════════════
  {
    d: 2, o: '2.2', topic: 'Social engineering and delivery',
    rungs: [
      {
        lv: 5.5,
        q: 'An attacker phones a help desk pretending to be an executive who is locked out and pressures the agent to reset the account password immediately. Which attack is this?',
        a: ['Vishing', 'Smishing', 'Pharming', 'Typosquatting'],
        c: 0,
        e: 'Vishing is social engineering over voice calls. Smishing uses SMS, pharming redirects traffic, and typosquatting relies on mistyped domains.'
      },
      {
        lv: 7,
        q: 'The finance team receives an email from a lookalike domain that references a real vendor and invoice number and asks them to send the next payment to "updated" bank details. Which attack is this?',
        a: ['Generic mass-mailed phishing', 'Business email compromise', 'Pharming through DNS redirection', 'Watering hole attack on a vendor website'],
        c: 1,
        e: 'Impersonating a trusted party to redirect payments is business email compromise. It is targeted and fraud-focused rather than a mass credential phish.'
      },
      {
        lv: 8.5,
        q: 'Users who type the correct URL of their bank are sent to a fraudulent site because the attacker altered DNS resolution on the local network. No link was clicked. Which attack is this?',
        a: ['Typosquatting', 'Pharming', 'Watering hole attack', 'Smishing'],
        c: 1,
        e: 'Pharming redirects users to a fake site by corrupting name resolution (DNS or hosts files). Typosquatting depends on mistyped addresses and a watering hole compromises a site users already visit.'
      },
      {
        lv: 9.5,
        q: 'Attackers compromised a trade association website that employees of a defense contractor visit often and added a script that delivers malware only to visitors from the contractor. Which TWO controls would BEST reduce the success of this attack? (Select TWO).',
        a: [
          'Browser isolation or sandboxed browsing for web access',
          'Annual awareness training as the only control',
          'EDR with behavioral blocking, plus timely browser and plugin patching',
          'Blocking all email attachments at the gateway',
          "Rotating the CEO's password"
        ],
        c: [0, 2],
        e: 'This is a watering hole attack, so the defenses must stop drive-by exploitation and detect post-exploitation behavior. Email controls, passwords and training alone do not address a trusted site delivering malware.'
      }
    ]
  },
  {
    d: 2, o: '2.3', topic: 'Web application vulnerabilities',
    rungs: [
      {
        lv: 5.5,
        q: 'A comment field accepts <script> tags and the script executes in the browser of every visitor who views the page. Which vulnerability is this?',
        a: ['Reflected cross-site scripting', 'Stored cross-site scripting', 'Cross-site request forgery', 'SQL injection'],
        c: 1,
        e: 'The malicious script is saved on the server and served to every visitor: stored XSS. Reflected XSS only runs for the victim who follows a crafted link.'
      },
      {
        lv: 7,
        q: 'A banking site relies only on session cookies for authentication. A malicious web page causes a logged-in user\'s browser to submit a funds transfer to the bank. Which control BEST prevents this attack?',
        a: ['Output encoding', 'Parameterized queries', 'Limiting input length', 'Anti-CSRF tokens'],
        c: 3,
        e: 'This is cross-site request forgery. Unpredictable per-session anti-CSRF tokens (and SameSite cookies) make forged cross-origin requests fail. The other controls address XSS and injection.'
      },
      {
        lv: 8.5,
        q: 'An application fetches a user-supplied URL to build a link preview. An attacker supplies http://169.254.169.254/latest/meta-data/ and obtains cloud credentials. Which vulnerability is this, and which control BEST mitigates it?',
        a: [
          'CSRF; add anti-forgery tokens and SameSite cookie attributes to the preview form',
          'SSRF; allow-list outbound destinations and block link-local address ranges',
          'XXE; disable DTD processing and external entity resolution in the XML parser',
          'Open redirect; validate the Location header values against an allow-list of domains'
        ],
        c: 1,
        e: 'The server is being tricked into making requests to internal resources: server-side request forgery. Restricting where the server may connect (and blocking the metadata range) is the mitigation.'
      },
      {
        lv: 9.5,
        q: 'A server deserializes an object taken from a cookie, and an attacker achieves remote code execution by supplying a crafted serialized object. Which TWO mitigations are MOST effective? (Select TWO).',
        a: [
          'Avoid deserializing untrusted data, or switch to a plain data format such as JSON with schema validation',
          'Encrypt the cookie with a symmetric key stored on the same server',
          'Verify an integrity signature and enforce a type allow-list before deserializing',
          'Increase the cookie lifetime to reduce re-authentication',
          'Rely on a web application firewall as the only control'
        ],
        c: [0, 2],
        e: 'Do not deserialize untrusted input, or at least verify integrity and restrict permitted types first. Encryption without authentication does not prove integrity, and lifetime or a WAF alone do not remove the flaw.'
      }
    ]
  },
  {
    d: 2, o: '2.4', topic: 'Malware and indicators',
    rungs: [
      {
        lv: 5.5,
        q: 'Malware that spreads between hosts without user interaction by exploiting a vulnerability in a network service is BEST described as a:',
        a: ['Worm', 'Virus', 'Trojan', 'Keylogger'],
        c: 0,
        e: 'Worms self-propagate across networks. Viruses need a host file and user action, and trojans masquerade as legitimate software.'
      },
      {
        lv: 7,
        q: 'After patching, a server still shows network connections and processes that Task Manager and installed tools cannot see. Booting from external media reveals a modified kernel driver. Which type of malware is MOST likely present?',
        a: ['Logic bomb', 'Worm', 'Rootkit', 'Spyware'],
        c: 2,
        e: 'A rootkit hides its presence by modifying the OS (here, a kernel driver), so tools running inside the compromised OS cannot see it. Booting from clean media bypasses the concealment.'
      },
      {
        lv: 8.5,
        q: "A script that deletes backups executes only when a specific administrator's account is disabled. Which TWO terms BEST describe this? (Select TWO).",
        a: ['Logic bomb', 'Rootkit', 'Botnet', 'Insider threat', 'Ransomware'],
        c: [0, 3],
        e: 'Code that triggers on a condition is a logic bomb, and one planted by someone with authorized access to retaliate is an insider threat. Nothing indicates concealment, remote control or extortion.'
      },
      {
        lv: 9.5,
        q: 'An analyst finds a scheduled task that runs PowerShell with an encoded command every hour; the script pulls instructions from a reputable cloud storage service, and no new binaries exist on disk. Which TWO indicators BEST support living-off-the-land persistence? (Select TWO).',
        a: [
          'A scheduled task invoking PowerShell with an encoded command',
          'A newly installed, validly signed vendor application',
          'Outbound requests to a legitimate cloud storage service at regular intervals',
          'An increase in failed logons from one source address',
          'The hash of a known malicious executable on disk'
        ],
        c: [0, 2],
        e: 'Abusing built-in tools (PowerShell via a scheduled task) and beaconing to a legitimate service at regular intervals are hallmarks of living-off-the-land persistence. There is no malicious file hash to match, and the other items do not fit.'
      }
    ]
  },
  {
    d: 2, o: '2.4', topic: 'Network attacks',
    rungs: [
      {
        lv: 5.5,
        q: 'An attacker sends small DNS queries with the victim\'s spoofed source IP address to many open resolvers, producing large responses aimed at the victim. Which attack is this?',
        a: ['DNS cache poisoning', 'DNS amplification DDoS attack', 'DNS tunneling for data exfiltration', 'Domain hijacking at the registrar'],
        c: 1,
        e: 'Spoofed requests that trigger much larger responses toward the victim are a reflection/amplification DDoS.'
      },
      {
        lv: 7,
        q: "Hosts on a LAN suddenly show the default gateway's IP address mapped to a workstation's MAC address, and their traffic now passes through that workstation. Which attack is occurring?",
        a: ['MAC flooding', 'DHCP starvation', 'VLAN hopping', 'ARP poisoning'],
        c: 3,
        e: 'Forged ARP replies map the gateway IP to the attacker\'s MAC, putting the attacker on-path. MAC flooding overflows a switch table, and the other attacks target DHCP and VLANs.'
      },
      {
        lv: 8.5,
        q: "An attacker on an access port sends frames with two 802.1Q tags so traffic reaches a VLAN other than their own. Which attack is this, and which mitigation is BEST?",
        a: [
          'MAC flooding; enable port security and limit the number of learned addresses per port',
          'Double-tagging VLAN hopping; disable unused trunking and move the native VLAN to an unused ID',
          'ARP poisoning; enable dynamic ARP inspection together with DHCP snooping',
          'DHCP starvation; enable DHCP snooping with rate limiting on untrusted ports'
        ],
        c: 1,
        e: 'Double tagging abuses the native VLAN on trunks. Moving the native VLAN to an unused ID and disabling unneeded trunking prevents it. The other mitigations address different attacks.'
      },
      {
        lv: 9.5,
        q: 'An authentication protocol is vulnerable to replay attacks. Which TWO controls would BEST prevent replay? (Select TWO).',
        a: [
          'Include a nonce or timestamp that the server validates and rejects when reused',
          'Require longer passwords',
          'Use a challenge-response exchange with a fresh server-generated nonce',
          'Increase the session timeout',
          'Enable DNSSEC on the authentication domain'
        ],
        c: [0, 2],
        e: 'Replay defenses make each authentication message unique and single-use (nonces, timestamps, fresh challenges). Password length, longer sessions and DNSSEC do not stop a captured message from being resubmitted.'
      }
    ]
  },

  // ═════════════ Domain 3 ═════════════
  {
    d: 3, o: '3.2', topic: 'Network security devices and placement',
    rungs: [
      {
        lv: 5.5,
        q: 'Which device inspects HTTP traffic for patterns such as SQL injection and cross-site scripting before it reaches the web servers?',
        a: ['Web application firewall (WAF)', 'Stateless packet filter at the network edge', 'Layer 2 switch with VLANs configured', 'Load balancer distributing requests across servers'],
        c: 0,
        e: 'A WAF understands HTTP and application-layer attacks. Packet filters and switches do not inspect request content.'
      },
      {
        lv: 7,
        q: "Which of the following BEST describes a stateful firewall's advantage over a stateless packet filter?",
        a: [
          'It inspects application payloads for malware signatures and blocks known bad files',
          'It terminates TLS sessions and caches frequently requested content for clients',
          'It filters traffic only by MAC address at the data link layer',
          'It tracks connection state, so return traffic for permitted sessions is allowed automatically'
        ],
        c: 3,
        e: 'Stateful firewalls remember established connections and permit the related return traffic without separate rules. Payload inspection and TLS termination are next-generation or proxy features.'
      },
      {
        lv: 8.5,
        q: 'A company wants all outbound web traffic inspected (including TLS), with URL-category enforcement, malware blocking on downloads, and internal client addresses hidden from the internet. Which solution is BEST?',
        a: [
          'A reverse proxy in the DMZ in front of the web servers',
          'A forward proxy performing TLS inspection and URL filtering',
          'A router with extended ACLs on the outbound interface',
          'A passive IDS connected to a network tap on the internet link'
        ],
        c: 1,
        e: 'A forward proxy sits between internal clients and the internet, so it can decrypt/inspect, categorize and block traffic and mask client IPs. A reverse proxy protects servers, ACLs cannot inspect content and a passive IDS cannot block.'
      },
      {
        lv: 9.5,
        q: "A web application is published through a reverse proxy. Which TWO design choices BEST prevent a compromise of the web tier from reaching the database? (Select TWO).",
        a: [
          'Place the database in a separate subnet behind an internal firewall that only permits the application port from the web tier',
          'Put the database on the same VLAN as the web servers for performance',
          'Use least-privilege database accounts and disable interactive logins for them',
          'Allow the web tier to connect to the database on all ports to simplify troubleshooting',
          'Use one shared administrator account for all application connections'
        ],
        c: [0, 2],
        e: 'Segmentation with a tightly scoped firewall rule and least-privilege accounts limit what a compromised web server can do. Flat networks, open ports and shared admin credentials let the attacker move freely.'
      }
    ]
  },
  {
    d: 3, o: '3.1', topic: 'Shared responsibility in the cloud',
    rungs: [
      {
        lv: 5.5,
        q: 'Under the shared responsibility model for IaaS, which of the following is the customer\'s responsibility?',
        a: ['Patching the hypervisor that hosts the virtual machines', 'Physical security of the data center facilities', 'Patching the guest operating system on the virtual machines', 'Network cabling inside the provider data center'],
        c: 2,
        e: 'In IaaS the provider secures the facility and virtualization layer; the customer manages the guest OS and everything above it.'
      },
      {
        lv: 7,
        q: 'A company uses a SaaS email platform. Which of the following remains the customer\'s responsibility?',
        a: [
          'Patching the application and its underlying operating system',
          'Managing user access and the data stored in the service',
          'Patching the hypervisor and virtualization layer',
          'Physical security of the provider data center servers'
        ],
        c: 1,
        e: 'Even with SaaS, the customer is responsible for identities, access and the data it puts in the service. The provider handles the application, platform and facility.'
      },
      {
        lv: 8.5,
        q: 'A company runs containers on a managed Kubernetes service. Which of the following is the customer\'s responsibility?',
        a: [
          "Patching the control plane that the provider operates for the cluster",
          "Securing the data center facilities that host the cluster nodes",
          'Securing container images, workload configuration and role bindings',
          "Patching the hypervisor beneath the cluster virtual machines"
        ],
        c: 2,
        e: 'The provider operates the managed control plane and infrastructure; the customer secures what it deploys: images, workload settings and access (RBAC).'
      },
      {
        lv: 9.5,
        q: "A penetration test finds that a serverless function's execution role can read every storage bucket in the account. Which TWO statements are correct? (Select TWO).",
        a: [
          "The provider is responsible for patching the underlying operating system and runtime host",
          "The customer is responsible for limiting the function's permissions to least privilege",
          'The provider automatically restricts overly permissive roles',
          "The customer must patch the host operating system running the function",
          "The customer is not responsible for vulnerabilities in the function's own code"
        ],
        c: [0, 1],
        e: 'In serverless the provider patches the platform, while the customer owns identity and permission configuration and its own code. Providers do not rewrite permissive roles for you.'
      }
    ]
  },
  {
    d: 3, o: '3.4', topic: 'Resilience, backups and recovery objectives',
    rungs: [
      {
        lv: 5.5,
        q: 'Which RAID level stripes data with distributed parity and tolerates the failure of a single disk?',
        a: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 10'],
        c: 2,
        e: 'RAID 5 stripes data and parity across the disks and survives one disk failure. RAID 0 has no redundancy, RAID 1 mirrors, and RAID 10 combines mirroring and striping.'
      },
      {
        lv: 7,
        q: 'A system owner states that no more than one hour of data may be lost after an outage. Which metric defines this requirement?',
        a: ['RTO of one hour', 'RPO of one hour', 'MTBF of one hour', 'MTTR of one hour'],
        c: 1,
        e: 'The recovery point objective is the maximum tolerable data loss measured in time. RTO is how long recovery may take, MTBF is time between failures and MTTR is the repair time.'
      },
      {
        lv: 8.5,
        q: 'Daily backup windows are short, and a restore may use at most the last full backup plus one other backup set. Which daily backup type BEST meets this?',
        a: ['Incremental', 'Differential', 'Full', 'Snapshot of the backup server'],
        c: 1,
        e: 'A differential backup captures everything changed since the last full backup, so a restore needs only the full plus the latest differential. Incrementals require every set since the last full, and daily fulls take the longest window.'
      },
      {
        lv: 9.5,
        q: 'A hospital radiology system requires an RTO of 2 hours and an RPO of 5 minutes. Which TWO measures BEST meet these requirements? (Select TWO).',
        a: [
          'Asynchronous replication to a warm site every few minutes',
          'Daily tape backups stored offsite',
          'Documented failover runbooks that are tested regularly',
          'A cold site with spare hardware',
          'Monthly full backups with weekly incrementals'
        ],
        c: [0, 2],
        e: 'Frequent replication meets the 5-minute RPO and a warm site with tested failover procedures meets the 2-hour RTO. Daily or monthly backups and a cold site cannot meet either target.'
      }
    ]
  },

  // ═════════════ Domain 4 ═════════════
  {
    d: 4, o: '4.6', topic: 'Access control models and federation',
    rungs: [
      {
        lv: 5.5,
        q: 'Which access control model allows the owner of an object to decide who else may access it?',
        a: ['Mandatory access control', 'Role-based access control', 'Discretionary access control', 'Rule-based access control'],
        c: 2,
        e: 'In DAC the owner grants permissions at their discretion. MAC enforces labels set by policy, and RBAC assigns permissions by role.'
      },
      {
        lv: 7,
        q: 'An organization wants access decisions based on department, device type, time of day and data classification. Which model BEST supports this?',
        a: ['Discretionary access control', 'Role-based access control', 'Mandatory access control', 'Attribute-based access control'],
        c: 3,
        e: 'ABAC evaluates multiple attributes of the user, resource and environment at request time. RBAC only considers the role.'
      },
      {
        lv: 8.5,
        q: 'A user can authenticate to the domain but cannot obtain access to a file server. Logs on the domain controller show "clock skew too great." Which is the MOST likely fix?',
        a: [
          "Reset the user password and require a change at next sign-in",
          'Synchronize time between the client and the domain controller using NTP',
          "Reissue the file server TLS certificate with the correct hostname",
          'Open UDP 1812 on the firewall between the client and the domain controller'
        ],
        c: 1,
        e: 'Kerberos tickets are time-sensitive and fail when clocks differ by more than the allowed skew (five minutes by default). Synchronizing time resolves it. UDP 1812 is RADIUS.'
      },
      {
        lv: 9.5,
        q: 'A company federates with a SaaS application using SAML. Which TWO statements are correct? (Select TWO).',
        a: [
          'The identity provider issues a signed assertion after authenticating the user',
          'The service provider stores the password hashes of federated users',
          "Assertions are typically XML and are validated using the identity provider's signing certificate",
          'SAML is the standard protocol for administering network devices',
          'The service provider authenticates users and then issues tokens to the identity provider'
        ],
        c: [0, 2],
        e: 'The IdP authenticates the user and sends a signed (XML) assertion, which the SP validates with the IdP\'s certificate. The SP never sees the user\'s password, and device administration uses TACACS+/RADIUS.'
      }
    ]
  },
  {
    d: 4, o: '4.8', topic: 'Incident response and forensics',
    rungs: [
      {
        lv: 5.5,
        q: 'During which incident response phase would an analyst isolate infected hosts from the network to stop the spread?',
        a: ['Eradication', 'Containment', 'Recovery', 'Lessons learned'],
        c: 1,
        e: 'Containment limits the scope and impact of an incident, for example by isolating affected hosts. Eradication removes the cause, and recovery restores service.'
      },
      {
        lv: 7,
        q: 'According to the order of volatility, which evidence should be collected FIRST?',
        a: ['CPU registers, cache and RAM', 'Data on the local disk of the affected host', 'Logs forwarded to a remote syslog server', 'Archived backup tapes stored offsite'],
        c: 0,
        e: 'The most volatile data (registers, cache and memory) disappears first, so it is collected before disk and remote or archival data.'
      },
      {
        lv: 8.5,
        q: "A forensic analyst images a compromised server's disk. Which TWO actions BEST preserve the evidence's integrity and admissibility? (Select TWO).",
        a: [
          'Compute and record hashes of the source drive and the image',
          'Mount the original drive read-write to analyze it faster',
          'Analyze a bit-for-bit copy while the original is sealed under chain of custody',
          'Delete temporary files first to reduce the image size',
          "Run the analysis tools from the suspect system's own operating system"
        ],
        c: [0, 2],
        e: 'Hashing proves the image matches the original, and working from a copy with documented custody protects the original. Modifying or running tools on the original system alters evidence.'
      },
      {
        lv: 9.5,
        q: 'Ransomware is confirmed on a file server. Backups exist, legal wants evidence preserved, and the business wants service restored quickly. Which sequence is BEST?',
        a: [
          'Restore from backups immediately to meet the business deadline, then isolate the server and image it afterward',
          'Isolate the server, capture memory and disk images, rebuild from known-good media, restore clean data, then document lessons learned',
          'Power off the server, reimage it immediately to remove the malware, and notify legal after recovery',
          'Run antivirus on the live server, quarantine the detections, and reconnect it once the scan is clean'
        ],
        c: 1,
        e: 'Contain first, preserve evidence, remove the cause, then recover from clean sources and review. Restoring or reimaging early destroys evidence or risks reinfection, and an AV scan alone does not prove the system is clean.'
      }
    ]
  },
  {
    d: 4, o: '4.3', topic: 'Vulnerability management',
    rungs: [
      {
        lv: 5.5,
        q: 'Which type of scan gives the MOST accurate view of missing patches on a host by authenticating to it?',
        a: ['Non-credentialed scan', 'Credentialed scan', 'Passive banner grabbing', 'Port scan only'],
        c: 1,
        e: 'A credentialed scan logs in and inspects installed software and patch levels directly, producing fewer false positives than an unauthenticated scan.'
      },
      {
        lv: 7,
        q: 'A vulnerability scan reports no findings for a host, but a penetration tester later exploits an unpatched service on that same host. How should the scan result be classified?',
        a: ['False positive', 'False negative', 'True negative', 'Informational finding'],
        c: 1,
        e: 'A false negative means a real vulnerability was not reported. A false positive is a reported issue that does not exist.'
      },
      {
        lv: 8.5,
        q: 'Which TWO factors should MOST increase the remediation priority of a vulnerability? (Select TWO).',
        a: [
          'The asset is internet-facing and holds regulated data',
          'The CVSS base score is the only number the scanner reports',
          'A public exploit exists and the flaw is being exploited in the wild',
          'The affected vendor is well known',
          'The patch file is large'
        ],
        c: [0, 2],
        e: 'Exposure, asset value and active exploitation drive real risk. Base score alone, vendor reputation and patch size do not.'
      },
      {
        lv: 9.5,
        q: 'A critical vulnerability cannot be patched for 90 days because the vendor has not released a fix. Which approach BEST aligns with risk management?',
        a: [
          'Accept the risk informally, close the ticket, and revisit it when the vendor releases a patch',
          'Apply compensating controls such as segmentation, document a time-limited exception with an owner, and monitor the asset',
          'Exclude the host from vulnerability scans so the finding stops appearing in reports',
          'Remove the asset from the inventory until a patch exists so it is not counted as exposed'
        ],
        c: 1,
        e: 'When a fix is not available, reduce exposure with compensating controls, formally document and time-box the exception, and keep monitoring. Hiding or ignoring the issue leaves it unmanaged.'
      }
    ]
  },
  {
    d: 4, o: '4.4', topic: 'Logging, monitoring and SIEM',
    rungs: [
      {
        lv: 5.5,
        q: 'What does NetFlow data provide?',
        a: [
          'Metadata about network conversations, such as endpoints, ports and volume',
          'Full packet payloads that can be reassembled for deep inspection',
          'Authentication events from domain controllers and VPN concentrators',
          'File hashes of executables transferred across the network'
        ],
        c: 0,
        e: 'NetFlow records summarize traffic (who talked to whom, on which ports, how much), not payloads.'
      },
      {
        lv: 7,
        q: 'A SIEM links a VPN login from another country, a new membership in an administrators group and a large outbound data transfer into one alert. Which SIEM capability is this?',
        a: ['Log normalization', 'Event correlation', 'Log rotation', 'Log compression'],
        c: 1,
        e: 'Correlation combines related events from different sources into a meaningful alert. Normalization only converts logs into a common format.'
      },
      {
        lv: 8.5,
        q: 'During an investigation, the timestamps from several devices do not line up. Which action BEST prevents this problem?',
        a: [
          'Increase log retention so older entries remain available for comparison',
          'Enable verbose logging on every device to capture more detail per event',
          'Move older logs to cold storage to reduce load on the SIEM indexers',
          'Synchronize all devices to a trusted NTP source and record times in UTC'
        ],
        c: 3,
        e: 'Consistent, synchronized time is required to reconstruct a timeline across systems. Retention, verbosity and storage tiers do not fix clock drift.'
      },
      {
        lv: 9.5,
        q: 'An organization must be able to prove that logs were not altered after collection. Which TWO controls BEST support this? (Select TWO).',
        a: [
          'Forward logs in real time to a remote write-once (WORM) or append-only store',
          'Let administrators edit logs to fix formatting problems',
          'Hash or sign log batches and store the hashes separately from the logs',
          'Keep logs only on the device that generated them',
          'Compress logs every day'
        ],
        c: [0, 2],
        e: 'Immutable remote storage and separately stored hashes or signatures make tampering detectable. Local-only storage, editable logs and compression provide no integrity assurance.'
      }
    ]
  },
  {
    d: 4, o: '4.5', topic: 'IPsec and VPNs',
    rungs: [
      {
        lv: 5.5,
        q: 'Which IPsec component provides confidentiality for the protected traffic?',
        a: ['Authentication Header (AH)', 'Encapsulating Security Payload (ESP)', 'Generic routing encapsulation (GRE)', 'Internet Key Exchange alone'],
        c: 1,
        e: 'ESP encrypts the payload (and can provide integrity). AH provides integrity and authentication but no encryption.'
      },
      {
        lv: 7,
        q: 'A site-to-site VPN must encrypt traffic AND hide the original packet\'s IP header. Which configuration achieves this?',
        a: ['Transport mode with ESP', 'Transport mode with AH', 'Tunnel mode with AH', 'Tunnel mode with ESP'],
        c: 3,
        e: 'Tunnel mode encapsulates the entire original packet, and ESP encrypts it. AH never encrypts, and transport mode leaves the original IP header visible.'
      },
      {
        lv: 8.5,
        q: 'An IPsec tunnel completes the first negotiation phase but no traffic passes, and the second phase fails with "no proposal chosen." Which is the MOST likely cause?',
        a: [
          'The peers have mismatched IPsec transform sets or traffic selectors',
          "The CA clock is incorrect, so peer certificates fail validation",
          'UDP 53 is blocked, so DNS lookups of the peer name fail',
          "An unrelated web server TLS certificate has expired"
        ],
        c: 0,
        e: 'The second negotiation phase agrees on the IPsec SA parameters, so a "no proposal chosen" failure points to mismatched transform sets or traffic selectors.'
      },
      {
        lv: 9.5,
        q: 'Which TWO configurations provide perfect forward secrecy for a VPN? (Select TWO).',
        a: [
          'Ephemeral Diffie-Hellman (DHE or ECDHE) key exchange for each session',
          'Reusing the same pre-shared key for all sessions',
          'Static RSA key transport using the server\'s long-term key',
          'A new ephemeral Diffie-Hellman exchange at every rekey with PFS enabled',
          'Using a longer pre-shared key'
        ],
        c: [0, 3],
        e: 'PFS requires session keys that are not derivable from long-term keys, which ephemeral DH achieves. Pre-shared keys and static RSA key transport let a later key compromise decrypt recorded sessions.'
      }
    ]
  },

  // ═════════════ Domain 5 ═════════════
  {
    d: 5, o: '5.2', topic: 'Risk analysis and responses',
    rungs: [
      {
        lv: 5.5,
        q: 'An asset is worth $50,000 and a single incident would damage 40% of its value. What is the single loss expectancy (SLE)?',
        a: ['$10,000', '$20,000', '$25,000', '$40,000'],
        c: 1,
        e: 'SLE = asset value × exposure factor = $50,000 × 0.40 = $20,000.'
      },
      {
        lv: 7,
        q: 'A single loss expectancy is $20,000 and the event is expected once every four years. What is the annualized loss expectancy (ALE)?',
        a: ['$4,000', '$5,000', '$20,000', '$80,000'],
        c: 1,
        e: 'ARO = 1 / 4 = 0.25, so ALE = SLE × ARO = $20,000 × 0.25 = $5,000.'
      },
      {
        lv: 8.5,
        q: 'A company buys a cyber insurance policy with a $50,000 deductible and also deploys MFA to reduce account takeovers. Which TWO risk responses does this represent? (Select TWO).',
        a: ['Transfer', 'Avoid', 'Mitigate', 'Accept', 'Exempt'],
        c: [0, 2],
        e: 'Insurance transfers part of the financial risk, and MFA mitigates the likelihood. The company has not eliminated the activity (avoid) or simply tolerated the risk (accept).'
      },
      {
        lv: 9.5,
        q: 'A control reduces the annualized loss expectancy from $120,000 to $30,000. It costs $60,000 per year to operate plus a $15,000 one-time purchase that is amortized over three years. Which statement is correct?',
        a: [
          'It is justified, with a net benefit of $25,000 per year',
          'It is not justified, with a net loss of $25,000 per year',
          'It breaks even',
          'The decision cannot be made without the exposure factor'
        ],
        c: 0,
        e: 'Annual savings are $120,000 − $30,000 = $90,000. Annual cost is $60,000 + ($15,000 ÷ 3) = $65,000. The net benefit is $25,000 per year.'
      }
    ]
  },
  {
    d: 5, o: '5.1', topic: 'Governance, privacy and assurance',
    rungs: [
      {
        lv: 5.5,
        q: 'Which governance document sets mandatory, specific technical requirements, such as requiring AES-256 for data at rest?',
        a: ['Policy', 'Standard', 'Guideline', 'Procedure'],
        c: 1,
        e: 'Standards define specific mandatory requirements that support policies. Guidelines are recommendations and procedures are step-by-step instructions.'
      },
      {
        lv: 7,
        q: 'Under privacy regulations, which role processes personal data on behalf of the data controller?',
        a: ['Data owner', 'Data subject', 'Data steward', 'Data processor'],
        c: 3,
        e: 'The processor handles personal data on the controller\'s instructions. The controller decides why and how the data is processed, and the subject is the individual the data describes.'
      },
      {
        lv: 8.5, o: '5.4',
        q: 'A US-based SaaS provider stores data belonging to EU residents. Which TWO obligations clearly apply under GDPR? (Select TWO).',
        a: [
          'Honor valid data subject requests for erasure',
          'Encrypt all data using AES-256 specifically',
          'Notify the supervisory authority of qualifying breaches within 72 hours of becoming aware',
          'Store all personal data exclusively on servers located in the EU',
          'Register every employee with the regulator'
        ],
        c: [0, 2],
        e: 'GDPR grants erasure rights and requires timely breach notification. It does not mandate a specific cipher, does not strictly require EU-only storage (transfers need a lawful mechanism) and has no employee registration requirement.'
      },
      {
        lv: 9.5, o: '5.4',
        q: "A customer wants assurance that a vendor's security, availability and confidentiality controls operated effectively over a six-month period. Which report BEST provides this?",
        a: ['SOC 2 Type I report', 'SOC 2 Type II report', 'A completed PCI DSS SAQ A', 'A signed non-disclosure agreement'],
        c: 1,
        e: 'A SOC 2 Type II report tests whether controls operated effectively over a period of time. Type I only describes the design of controls at a single point in time.'
      }
    ]
  },
  {
    d: 5, o: '5.3', topic: 'Third-party risk and assessments',
    rungs: [
      {
        lv: 5.5,
        q: 'Which contract provision allows a customer to examine a vendor\'s security controls?',
        a: ['Non-disclosure agreement', 'Right-to-audit clause', 'Service level agreement', 'Memorandum of understanding'],
        c: 1,
        e: 'A right-to-audit clause gives the customer the ability to assess the vendor\'s controls. SLAs define service targets and NDAs protect confidentiality.'
      },
      {
        lv: 7,
        q: 'Two organizations want to document shared goals and responsibilities for a joint project in a form that is generally not legally binding. Which document fits BEST?',
        a: ['Master services agreement', 'Non-disclosure agreement', 'Memorandum of understanding', 'Statement of work'],
        c: 2,
        e: 'An MOU records intent and mutual expectations without the force of a contract. An MSA and SOW are contractual, and an NDA covers confidentiality.'
      },
      {
        lv: 8.5,
        q: "A vendor's SOC 2 report contains a qualified opinion on access control. As the customer, which action is BEST?",
        a: [
          "Treat the finding as non-binding and rely on the other certifications that the vendor holds",
          "Accept a verbal assurance from the vendor that the control weakness has been corrected",
          'Terminate the contract at once and report the vendor to regulators for a breach',
          "Assess the impact on your data, obtain remediation evidence, and add compensating controls or contract terms"
        ],
        c: 3,
        e: 'A qualified opinion means an auditor found a control weakness. The customer should evaluate the impact on its own risk and require evidence of remediation or compensating measures rather than ignoring or overreacting.'
      },
      {
        lv: 9.5, o: '5.5',
        q: 'A penetration test is scoped as an unknown-environment test. The rules of engagement allow social engineering of employees but prohibit denial of service against production. During testing, the team finds a SQL injection in production that could expose customer records. Which action is BEST?',
        a: [
          'Dump a sample of the records to prove the impact to the client',
          'Continue exploiting the flaw to establish persistence and map the internal network',
          'Stop exploitation, notify the designated contact as the rules of engagement require, and document the finding',
          'Hold the finding until the final report so the test timeline is not disrupted'
        ],
        c: 2,
        e: 'Testers must stay within the rules of engagement and escalate serious findings (especially those that expose live customer data) to the agreed contact rather than exfiltrating data or delaying notification.'
      }
    ]
  }
]
