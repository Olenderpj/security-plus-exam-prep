// Domain 2: Threats, Vulnerabilities, and Mitigations (additional questions)
export default [
  {
    o: '2.1',
    q: 'A disgruntled system administrator who was recently passed over for promotion deletes critical backups before resigning. Which of the following BEST describes this threat actor and motivation?',
    a: ['Nation-state, espionage', 'Insider threat, revenge', 'Hacktivist, political beliefs', 'Organized crime, financial gain'],
    c: 1,
    e: 'An insider with legitimate access acting out of a grievance is an insider threat motivated by revenge.'
  },
  {
    o: '2.1',
    q: 'A criminal group deploys ransomware against hospitals and demands payment in cryptocurrency. Which of the following is the MOST likely motivation?',
    a: ['Financial gain', 'Espionage', 'Ethical disclosure', 'Philosophical beliefs'],
    c: 0,
    e: 'Organized crime groups are typically motivated by money, and ransomware is a common monetization method.'
  },
  {
    o: '2.1',
    q: 'Which of the following threat actor attributes describes whether the attacker operates from inside or outside the organization?',
    a: ['Internal/external', 'Resources/funding', 'Level of sophistication', 'Motivation'],
    c: 0,
    e: 'Internal/external describes where the threat actor is located relative to the organization.'
  },
  {
    o: '2.2',
    q: 'An employee finds a USB drive labeled "Executive Salaries" in the parking lot and plugs it into a work computer, which then becomes infected. Which of the following attack vectors was used?',
    a: ['Removable media', 'Watering hole', 'Vishing', 'Open service ports'],
    c: 0,
    e: 'Dropping infected removable media (baiting) relies on curiosity to get users to connect the device.'
  },
  {
    o: '2.2',
    q: 'A caller claiming to be from the IT help desk asks an employee to read back the one-time code sent to their phone to "verify the account." Which of the following attacks is this?',
    a: ['Vishing', 'Smishing', 'Typosquatting', 'Watering hole'],
    c: 0,
    e: 'Vishing is voice phishing—social engineering over the phone.'
  },
  {
    o: '2.2',
    q: 'An attacker sets up a wireless access point with the same SSID as the corporate network to capture user credentials. Which of the following BEST describes this attack?',
    a: ['Evil twin', 'Bluesnarfing', 'Jamming', 'MAC flooding'],
    c: 0,
    e: 'An evil twin is a rogue access point that impersonates a legitimate network to intercept traffic.'
  },
  {
    o: '2.2',
    q: 'A company leaves Telnet and FTP enabled on internet-facing servers. Which of the following attack surfaces does this create? (Select TWO).',
    a: ['Unsecure protocols', 'Open service ports', 'Removable media', 'Supply chain', 'Image-based', 'Default SSID'],
    c: [0, 1],
    e: 'Telnet and FTP send data in cleartext (unsecure protocols) and expose listening services (open ports) to attackers.'
  },
  {
    o: '2.2',
    q: 'An attacker sends an email that perfectly imitates a well-known shipping company\'s logo and layout, asking recipients to pay a customs fee. Which of the following BEST describes this technique?',
    a: ['Brand impersonation', 'Pretexting', 'Whaling', 'Watering hole'],
    c: 0,
    e: 'Brand impersonation copies the look of a trusted company to make phishing more convincing.'
  },
  {
    o: '2.2',
    q: 'Which of the following social engineering techniques involves spreading false information to manipulate public opinion about an organization?',
    a: ['Disinformation', 'Tailgating', 'Shoulder surfing', 'Dumpster diving'],
    c: 0,
    e: 'Disinformation and misinformation campaigns spread false information to influence perception or behavior.'
  },
  {
    o: '2.3',
    q: 'A program copies user input into a fixed-size memory buffer without checking its length, allowing an attacker to overwrite the return address. Which of the following vulnerabilities exists?',
    a: ['Buffer overflow', 'Race condition', 'SQL injection', 'Cross-site request forgery'],
    c: 0,
    e: 'A buffer overflow writes past the end of a buffer, potentially overwriting memory and executing attacker code.'
  },
  {
    o: '2.3',
    q: 'A cloud storage bucket containing customer records was configured to allow public read access. Which of the following vulnerability types BEST describes this?',
    a: ['Misconfiguration', 'Zero-day', 'Firmware', 'Race condition'],
    c: 0,
    e: 'Incorrect permission settings are a misconfiguration, one of the most common cloud vulnerabilities.'
  },
  {
    o: '2.3',
    q: 'A company still runs a server operating system that the vendor no longer supports with security updates. Which of the following BEST describes the vulnerability?',
    a: ['End-of-life', 'Zero-day', 'Memory injection', 'Supply chain'],
    c: 0,
    e: 'End-of-life (EOL) systems no longer receive vendor patches, leaving known vulnerabilities unfixed.'
  },
  {
    o: '2.3',
    q: 'A user installs an app on an Android phone from a third-party website instead of the official app store. Which of the following BEST describes this activity?',
    a: ['Sideloading', 'Jailbreaking', 'Bluejacking', 'Tethering'],
    c: 0,
    e: 'Sideloading installs applications from sources outside the official store, bypassing store vetting.'
  },
  {
    o: '2.3',
    q: 'An attacker tricks a logged-in user\'s browser into submitting an unwanted funds transfer request to a banking site. Which of the following attacks is this?',
    a: ['Cross-site request forgery', 'Cross-site scripting', 'Directory traversal', 'Server-side request forgery'],
    c: 0,
    e: 'CSRF abuses the trust a site has in an authenticated user\'s browser to perform unwanted actions.'
  },
  {
    o: '2.3',
    q: 'A web application fetches a URL provided by the user. An attacker supplies an internal address to access the cloud metadata service. Which of the following vulnerabilities is being exploited?',
    a: ['Server-side request forgery', 'Cross-site request forgery', 'Clickjacking', 'Session fixation'],
    c: 0,
    e: 'SSRF makes the server issue requests to internal resources on the attacker\'s behalf.'
  },
  {
    o: '2.3',
    q: 'A cloud provider fails to properly clear memory before reallocating it to another tenant, exposing previous data. Which of the following BEST describes this vulnerability?',
    a: ['Resource reuse', 'VM escape', 'Sideloading', 'Malicious update'],
    c: 0,
    e: 'Resource reuse vulnerabilities occur when resources are reassigned without being sanitized.'
  },
  {
    o: '2.4',
    q: 'Users report pop-up advertisements appearing constantly and their browser home page changing without permission. Which of the following is MOST likely installed?',
    a: ['Adware/PUP', 'Rootkit', 'Logic bomb', 'Ransomware'],
    c: 0,
    e: 'Adware and potentially unwanted programs (PUPs) display ads and change browser settings.'
  },
  {
    o: '2.4',
    q: 'Malware is found that runs entirely in memory using built-in tools like PowerShell and leaves no files on disk. Which of the following BEST describes it?',
    a: ['Fileless malware', 'Bloatware', 'Worm', 'Logic bomb'],
    c: 0,
    e: 'Fileless malware lives in memory and abuses legitimate system tools, making signature-based detection difficult.'
  },
  {
    o: '2.4',
    q: 'An attacker uses usernames and passwords leaked from a social media breach to log in to employees\' corporate accounts. Which of the following attacks is this?',
    a: ['Credential stuffing', 'Password spraying', 'Brute force', 'Birthday attack'],
    c: 0,
    e: 'Credential stuffing reuses known username/password pairs from other breaches, exploiting password reuse.'
  },
  {
    o: '2.4',
    q: 'An attacker sends forged ARP replies to associate their MAC address with the default gateway\'s IP address. Which of the following attacks is this?',
    a: ['ARP poisoning (on-path)', 'DNS poisoning', 'MAC flooding', 'Replay'],
    c: 0,
    e: 'ARP poisoning redirects traffic through the attacker, enabling an on-path (man-in-the-middle) attack.'
  },
  {
    o: '2.4',
    q: 'A user\'s account is locked out repeatedly every few minutes even after password resets, and logs show failed attempts from many external IPs. Which of the following is the MOST likely cause?',
    a: ['Brute-force attack against the account', 'Expired certificate', 'Misconfigured DLP', 'Impossible travel'],
    c: 0,
    e: 'Repeated failed logins causing lockouts are an indicator of a brute-force or password-guessing attack.'
  },
  {
    o: '2.4',
    q: 'An analyst finds that a user account accessed a sensitive file share at 3 a.m. on a Sunday, which is unusual for that user. Which of the following indicators does this represent?',
    a: ['Out-of-cycle logging', 'Resource inaccessibility', 'Blocked content', 'Missing logs'],
    c: 0,
    e: 'Out-of-cycle activity—events at unusual times—is an indicator of possible compromise.'
  },
  {
    o: '2.4',
    q: 'An attacker hides malicious code deep in the operating system kernel so it can maintain privileged access and evade detection tools. Which of the following types of malware is this?',
    a: ['Rootkit', 'Keylogger', 'Spyware', 'Virus'],
    c: 0,
    e: 'Rootkits operate at a privileged level (often kernel) and hide their presence from the OS and security tools.'
  },
  {
    o: '2.4',
    q: 'Security logs on a compromised server were deleted shortly after suspicious activity began. Which of the following indicators is this?',
    a: ['Missing logs', 'Concurrent session usage', 'Account lockout', 'Published/documented'],
    c: 0,
    e: 'Attackers often delete or tamper with logs to cover their tracks; missing logs are a key indicator.'
  },
  {
    o: '2.4',
    q: 'An attacker steals an NTLM hash from memory and uses it to authenticate to other systems without cracking it. Which of the following attacks is this?',
    a: ['Pass-the-hash', 'Rainbow table', 'Birthday', 'Downgrade'],
    c: 0,
    e: 'Pass-the-hash uses a captured password hash directly for authentication.'
  },
  {
    o: '2.5',
    q: 'A security team wants to prevent malware on one host from reaching any other system by placing it in a restricted network after detection. Which of the following mitigation techniques is this?',
    a: ['Isolation', 'Decommissioning', 'Encryption', 'Least privilege'],
    c: 0,
    e: 'Isolation (quarantine) removes or restricts the affected system\'s network access to stop spread.'
  },
  {
    o: '2.5',
    q: 'An organization uses Group Policy to ensure every workstation has the screen lock, firewall, and audit settings defined in its security baseline. Which of the following mitigation techniques is this?',
    a: ['Configuration enforcement', 'Segmentation', 'Decommissioning', 'Monitoring'],
    c: 0,
    e: 'Configuration enforcement automatically applies and maintains required settings across systems.'
  },
  {
    o: '2.5',
    q: 'Which of the following is the BEST way to reduce the risk of SQL injection in a web application?',
    a: ['Parameterized queries (prepared statements)', 'Increasing password length', 'Enabling full-disk encryption', 'Using a wildcard certificate'],
    c: 0,
    e: 'Parameterized queries separate code from data so user input cannot alter the query structure.'
  },
  {
    o: '2.5',
    q: 'Which of the following endpoint hardening techniques would BEST protect against unauthorized changes to the boot process?',
    a: ['Secure boot with a TPM', 'Disabling the screen saver', 'Installing a web browser', 'Enabling guest accounts'],
    c: 0,
    e: 'Secure boot verifies that only signed bootloaders and OS components run, preventing bootkits.'
  }
]
