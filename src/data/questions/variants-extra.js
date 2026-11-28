// Two additional wordings for every question, keyed by question ID.
// Same concept, same options and correct answers; picked at random alongside the other wordings.
export default {
  "d1-0": [
    "A data center operator places concrete bollards along its entrance to stop a vehicle from being driven into the building. Which control type does this measure MOST accurately represent?",
    "To keep cars from being driven through the lobby doors, a facility installs steel posts outside the entrance. Which of the following BEST classifies this control?"
  ],
  "d1-1": [
    "Following a ransomware infection, an administrator rebuilds the affected servers from clean backups. Into which control type does this recovery action fall?",
    "A company recovers its encrypted file servers by restoring known-good backup copies after an attack. Which control type does the restoration represent?"
  ],
  "d1-2": [
    "An unsupported industrial controller can no longer receive vendor patches, so the team moves it onto its own VLAN with tight access rules. Which type of control is this?",
    "Because a legacy production system is end-of-life and cannot be patched, administrators isolate it behind strict ACLs on a separate VLAN. Which control type have they applied?"
  ],
  "d1-3": [
    "All staff must read and sign a newly published acceptable use policy. Which category and type BEST describe this policy?",
    "The security manager issues an acceptable use policy that every employee has to acknowledge in writing. Which of the following correctly classifies it?"
  ],
  "d1-4": [
    "Which one of these controls is carried out mainly by people through day-to-day procedures rather than by technology?",
    "Identify the operational control from the list below."
  ],
  "d1-5": [
    "Signage at a facility states that it is under video surveillance and that intruders will face prosecution. Which control type do these signs illustrate?",
    "A business displays warnings that cameras are recording and that trespassers will be reported to the police. Which type of control are these warnings?"
  ],
  "d1-6": [
    "A sender denies writing an email even though it carries a valid digital signature generated with their private key. Which security concept stops the sender from successfully disputing authorship?",
    "Someone disputes having sent a message that is signed with their private key. Which principle makes that denial ineffective?"
  ],
  "d1-7": [
    "In a zero trust deployment, which component decides whether a subject is allowed to reach a particular resource?",
    "As an organization adopts a zero trust architecture, which element evaluates each access request and makes the grant-or-deny determination?"
  ],
  "d1-8": [
    "An analyst saves a decoy spreadsheet called \"passwords.xlsx\" on a shared drive and sets an alert for any attempt to open it. What does this decoy file represent?",
    "A security team plants a bogus credentials file on a network share and monitors it for access. Which term BEST describes the planted file?"
  ],
  "d1-9": [
    "Before adopting a new security framework, a company wants to measure where its current controls fall short of the framework's requirements. Which activity should it carry out?",
    "An organization plans to align with a security standard and needs to identify the differences between its present state and the standard. Which of the following should it perform?"
  ],
  "d1-10": [
    "Which part of the AAA model records what resources a user accessed and how long they used them?",
    "In AAA, which component tracks user activity such as the resources accessed and the duration of each session?"
  ],
  "d1-11": [
    "To stop unauthorized people from following authorized staff inside, a data center uses a small entry space with two doors that can never be open at the same time. What is this control called?",
    "A facility prevents tailgating with a compartment between two interlocking doors so that only one can open at a time. Which control BEST describes it?"
  ],
  "d1-12": [
    "Without leaving any trace, an attacker alters the financial figures held in a company database. Which element of the CIA triad has been compromised?",
    "Financial data in a database is silently changed by an intruder. Which CIA principle has been violated?"
  ],
  "d1-13": [
    "Which zero trust concept refers to changing access decisions on the fly according to user behavior, device health, and location?",
    "A zero trust system continually reevaluates access using the user's behavior, the device posture, and where the request originates. Which concept does this describe?"
  ],
  "d1-14": [
    "A change to upgrade a production database has been approved. What should be documented before the upgrade starts so the team can revert if it fails?",
    "Before implementing an approved production database upgrade, which item must be prepared in case the change has to be reversed?"
  ],
  "d1-15": [
    "A critical web server patch must be applied. Which approach would cause the LEAST disruption for users?",
    "To install an urgent web server patch while affecting as few users as possible, which of the following is the BEST practice?"
  ],
  "d1-16": [
    "A developer alters a firewall configuration without filing a change request, and the alteration triggers an outage. Which process would MOST likely have prevented it?",
    "An unapproved, undocumented firewall modification causes downtime. Which process, if followed, would MOST likely have avoided it?"
  ],
  "d1-17": [
    "At a change advisory board meeting, someone asks which applications depend on the server scheduled for an upgrade. Which technical consideration is being raised?",
    "While reviewing a proposed server upgrade, the board wants to know what other systems will be affected by it. Which technical change management consideration is this?"
  ],
  "d1-18": [
    "A company wants employee laptop data to stay confidential even if a device is stolen. Which solution is the BEST fit?",
    "If an employee's laptop is lost or stolen, the data on it must remain unreadable. Which of the following should be deployed?"
  ],
  "d1-19": [
    "An engineer must store user passwords so that two users with the same password end up with different stored values. Which technique should be used?",
    "Which technique ensures that identical passwords do not produce identical stored hashes?"
  ],
  "d1-20": [
    "Which hardware component, built into the motherboard, holds disk-encryption keys and secure boot measurements?",
    "A chip attached to a system board stores keys used for full-disk encryption and records secure boot measurements. What is it?"
  ],
  "d1-21": [
    "Clients need to learn in real time whether a particular certificate has been revoked. Which mechanism should be used?",
    "Which of the following lets a client check the revocation status of an individual certificate on demand?"
  ],
  "d1-22": [
    "One certificate must protect www.example.com, mail.example.com, and shop.example.com. Which option is the MOST efficient?",
    "An administrator wants a single certificate to cover several hostnames under example.com. Which choice is the MOST efficient?"
  ],
  "d1-23": [
    "Alice wants only Bob to be able to read her message. Which key should she use to encrypt it?",
    "To send a confidential message that only Bob can decrypt, which key should Alice encrypt it with?"
  ],
  "d1-24": [
    "Which technique substitutes sensitive data, such as a payment card number, with a random surrogate value that has no mathematical link to the original?",
    "A system swaps a credit card number for a random placeholder that cannot be mathematically derived back to it. Which technique is this?"
  ],
  "d1-25": [
    "To slow down brute-force cracking of stored password hashes, which TWO should be implemented? (Select TWO).",
    "A company wants password-cracking attempts against its hash database to take much longer. Which TWO of the following would help? (Select TWO)."
  ],
  "d1-26": [
    "After downloading an installer, a user checks its SHA-256 hash against the value on the vendor's site. Which property is the user confirming?",
    "A user compares the SHA-256 digest of a downloaded installer with the published digest. What is being verified?"
  ],
  "d1-27": [
    "Which technology is a distributed, decentralized ledger whose recorded transactions are extremely hard to modify?",
    "Transactions are written to a shared ledger copied across many nodes so that altering them afterward is very difficult. What is this called?"
  ],
  "d1-28": [
    "Policy requires that a trusted third party hold a copy of every encryption key so data can be recovered if keys are lost. What does this describe?",
    "An organization deposits copies of its encryption keys with a trusted outside party for recovery purposes. Which concept is this?"
  ],
  "d1-29": [
    "Which symmetric algorithm is the current standard for encrypting bulk data?",
    "Which of the following symmetric ciphers is widely used today as the standard for bulk data encryption?"
  ],
  "d1-30": [
    "An administrator creates a key pair for a web server and submits a request file to a certificate authority in order to receive a signed certificate. What did the administrator submit?",
    "To obtain a CA-signed certificate for a web server, an administrator generates a key pair and sends an item to the certificate authority. Which item was sent?"
  ],
  "d1-31": [
    "An analyst discovers a normal-looking picture file that conceals instructions for malware inside it. Which technique was used to hide them?",
    "Malware commands are embedded within an image that appears harmless. Which technique does this describe?"
  ],
  "d1-32": [
    "Every morning, a company examines the previous day's firewall logs for unauthorized connection attempts. Which control type does this review represent?",
    "A team reviews yesterday's firewall logs each day to spot unauthorized connections. Which type of control is the log review?"
  ],
  "d1-33": [
    "Motion-activated lights are installed around a warehouse perimeter so that intruders are discouraged at night. Which control BEST describes them?",
    "To dissuade trespassers after dark, a company puts motion-triggered lighting around its warehouse. How is this control BEST classified?"
  ],
  "d1-34": [
    "Which of the following is the BEST example of a technical control that stops unauthorized access before it happens?",
    "Select the example of a technical preventive control."
  ],
  "d1-35": [
    "Each year an organization carries out a risk assessment and presents the documented results to executives. Which control category does this belong to?",
    "A company documents an annual risk assessment for senior management. Under which control category does this activity fall?"
  ],
  "d1-36": [
    "A web application authenticates a username and password, then confirms the user is in the 'Finance' group before displaying payroll reports. What does the group membership check represent?",
    "After a user logs in successfully, an application verifies that the account is a member of the Finance group before allowing access to payroll data. Which process is the group check?"
  ],
  "d1-37": [
    "A distributed denial-of-service attack leaves an online store unreachable for hours. Which security principle was affected MOST directly?",
    "An e-commerce website is knocked offline for several hours by a DDoS attack. Which principle suffered the most direct impact?"
  ],
  "d1-38": [
    "To observe attacker techniques, a company sets up several decoy servers on an isolated subnet. Which term BEST describes this setup?",
    "A group of fake servers on a separate network segment is built to study how attackers behave. What is this deployment called?"
  ],
  "d1-39": [
    "An architect requires every access request to be verified, whether it comes from inside or outside the corporate network. Which concept is being applied?",
    "A security design verifies each request regardless of the network location it comes from. Which concept does this reflect?"
  ],
  "d1-40": [
    "Which physical security sensor detects an intruder by picking up changes in heat inside a room?",
    "A room sensor raises an alert when it detects the heat signature of a person entering. Which type of sensor is this?"
  ],
  "d1-41": [
    "In a zero trust architecture, which data plane component allows, monitors, and ends the connection between a subject and a resource?",
    "Which zero trust component sits in the data plane and is responsible for enabling, observing, and terminating sessions between subjects and resources?"
  ],
  "d1-42": [
    "A company gives every device a unique identifier and requires a certificate before a device may join the network. Which concept is being applied?",
    "Before any device can connect to the network, it must prove its identity with a certificate. Which concept does this describe?"
  ],
  "d1-43": [
    "In the change management process, who is responsible for a system and must approve changes that affect it?",
    "Which role in change management has responsibility for a given system and has to sign off on changes to it?"
  ],
  "d1-44": [
    "Once an approved change has been made to an application server, the administrator updates the network diagrams and configuration records. Which change management activity is this?",
    "After a change is completed, an administrator revises the diagrams and records to reflect the new configuration. Which activity is this?"
  ],
  "d1-45": [
    "A change will require restarting a critical service. Which technical implication should be reviewed to decide whether users will see an outage?",
    "Planning a change that restarts a critical service, a team wants to know if users will lose access. Which technical implication does this relate to?"
  ],
  "d1-46": [
    "A development team records every modification to its infrastructure scripts so it can see who changed what and return to earlier versions. What is the team using?",
    "Infrastructure code changes are tracked so that authorship is visible and previous versions can be restored. Which practice is this?"
  ],
  "d1-47": [
    "A company wants to encrypt only the table holding Social Security numbers rather than the whole database. At which level should encryption be applied?",
    "A database holds a table of Social Security numbers, and only that data needs encryption instead of the entire database. Which encryption level is appropriate?"
  ],
  "d1-48": [
    "Two parties must agree on a shared symmetric key across an insecure network without transmitting the key. Which method should they use?",
    "How can two systems establish a shared secret key over an untrusted network without ever sending the key itself?"
  ],
  "d1-49": [
    "Which technology protects the confidentiality of data moving between a browser and a web server?",
    "What provides confidentiality for traffic exchanged between a web browser and a web server?"
  ],
  "d1-50": [
    "A phone maker wants an isolated processor area that keeps biometric data safe even if the main operating system is compromised. What should be used?",
    "Which feature provides a separate, protected execution area that safeguards biometric data from a compromised operating system?"
  ],
  "d1-51": [
    "An organization operates an internal certificate authority and keeps the root CA powered off and disconnected from the network. Which term BEST describes this practice?",
    "To protect its trust anchor, a company stores its root certificate authority offline, powered down and unplugged. What is this practice called?"
  ],
  "d1-52": [
    "A software vendor digitally signs its installers so customers can confirm who published them and that they were not altered. Which TWO properties does this provide? (Select TWO).",
    "By signing its application installers, a company lets customers check the source and detect modification. Which TWO benefits result? (Select TWO)."
  ],
  "d1-53": [
    "Which feature lets a web server present a time-stamped revocation status from the CA during the TLS handshake, easing the load on the CA?",
    "To reduce load on the certificate authority, a server attaches a signed, time-stamped revocation response to its TLS handshake. What is this called?"
  ],
  "d1-54": [
    "An attacker discovers two different files that generate the same hash. What has occurred?",
    "Two distinct inputs produce an identical hash value. Which term describes this?"
  ],
  "d1-55": [
    "A developer wants source code to be harder to read and reverse-engineer while behaving exactly the same. Which technique should be used?",
    "Which technique makes code difficult to understand without altering its function?"
  ],
  "d1-56": [
    "Which asymmetric algorithm offers strong security with smaller keys, making it well suited to mobile and IoT devices?",
    "Mobile and IoT devices benefit from an asymmetric algorithm that gives strong security using relatively small keys. Which algorithm is it?"
  ],
  "d1-57": [
    "A company wants previously recorded TLS sessions to stay undecryptable even if a server's long-term private key is later compromised. What should be enabled?",
    "Which feature ensures that stealing a server's long-term private key does not expose past encrypted sessions?"
  ],
  "d2-0": [
    "A highly resourced group pursuing long-term strategic goals quietly breaches a government network and steals classified data over several months without being detected. Which threat actor is MOST likely responsible?",
    "Over many months, attackers with significant funding and strategic objectives siphon classified material from a government network without being noticed. Which of the following threat actors BEST fits?"
  ],
  "d2-1": [
    "A group vandalizes a corporation's website with messages opposing the company's environmental practices. What is the primary motivation of this threat actor?",
    "Activists replace a company's homepage with protest messages about its environmental record. Which motivation BEST describes the attackers?"
  ],
  "d2-2": [
    "A marketing employee starts using a cloud file-sharing service that IT has not approved so they can share files with a vendor. What does this represent?",
    "To collaborate with an outside vendor, an employee signs up for an unsanctioned cloud storage app. Which of the following does this describe?"
  ],
  "d2-3": [
    "An attacker runs a prebuilt exploit kit they do not understand against random servers exposed to the internet. Which term BEST describes this attacker?",
    "Using tools downloaded from the internet that they cannot explain, someone attacks arbitrary public-facing servers. What type of threat actor is this?"
  ],
  "d2-4": [
    "Employees receive a text message that seems to come from the payroll provider and urges them to follow a link to update direct deposit details. Which attack is this?",
    "A group of staff gets an SMS claiming to be from the company's payroll service, asking them to tap a link to confirm their bank information. Which attack is occurring?"
  ],
  "d2-5": [
    "An attacker infects a website that a target company's employees regularly visit with malware. Which attack does this describe?",
    "Instead of attacking the organization directly, an adversary plants malware on a site its staff routinely browse. What is this attack called?"
  ],
  "d2-6": [
    "After mistyping the address of a well-known bank, a user ends up on a look-alike site that collects credentials. Which attack BEST describes this?",
    "A user types a slightly wrong bank URL and reaches a fraudulent copy of the bank's website. Which attack is this?"
  ],
  "d2-7": [
    "A company learns that a firmware update delivered by a trusted hardware vendor contained a backdoor. Which attack vector was used?",
    "A backdoor arrives inside a legitimate firmware update from a vendor the company trusts. Through which vector did the attack occur?"
  ],
  "d2-8": [
    "The CFO gets an urgent email that appears to be from the CEO asking for a wire transfer to a new vendor; it was sent from the CEO's real mailbox, which has been compromised. Which attack is this?",
    "An executive's compromised mailbox is used to email the finance chief an urgent request to wire money to an unfamiliar vendor. Which attack does this represent?"
  ],
  "d2-9": [
    "A web application places user input directly into a database query, and an attacker types ' OR 1=1 -- into the login field. Which vulnerability is being exploited?",
    "An attacker submits ' OR 1=1 -- in a login form, and the application concatenates it straight into a database query. What vulnerability is being abused?"
  ],
  "d2-10": [
    "Web server logs show a request containing ../../../../etc/passwd. Which attack was attempted?",
    "An analyst finds a URL with repeated ../ sequences pointing to /etc/passwd in the access logs. What type of attack is this?"
  ],
  "d2-11": [
    "An application verifies a user's permission to a file and then opens it. Between those two steps, an attacker replaces the file with a symbolic link. Which vulnerability does this describe?",
    "A program checks access rights on a file, then opens it; in the gap, an attacker substitutes a symlink. Which vulnerability is this?"
  ],
  "d2-12": [
    "A user removes manufacturer restrictions from a corporate smartphone's operating system so they can install unauthorized apps. Which term BEST describes this?",
    "An employee modifies their company phone's OS to bypass vendor limits and load unapproved applications. What is this activity called?"
  ],
  "d2-13": [
    "An attacker exploits a flaw that the vendor does not know about and for which no patch is available. Which term BEST describes the vulnerability?",
    "A vulnerability is being exploited before the vendor has become aware of it or released any fix. What is it called?"
  ],
  "d2-14": [
    "Code running inside a guest virtual machine breaks out and gains access to the hypervisor and the other guests on the host. Which attack occurred?",
    "An attacker in one VM compromises the hypervisor and can now reach other virtual machines on the same host. What type of attack is this?"
  ],
  "d2-15": [
    "A forum lets users post comments. An attacker posts a comment containing a script that steals session cookies from anyone who views it. Which vulnerability is this?",
    "A malicious script saved in a forum comment runs in the browsers of later visitors and steals their cookies. Which vulnerability is being exploited?"
  ],
  "d2-16": [
    "An analyst sees an account sign in from New York and then from Singapore ten minutes later. Which indicator does this represent?",
    "Ten minutes after logging in from New York, the same account authenticates from Singapore. What does this indicate?"
  ],
  "d2-17": [
    "Files on a shared drive now carry a .locked extension, and every folder contains a note demanding cryptocurrency. Which malware type is MOST likely responsible?",
    "Users find their shared files renamed with a .locked extension along with a ransom note requesting cryptocurrency payment. Which type of malware is this MOST likely?"
  ],
  "d2-18": [
    "A former developer left code in a payroll application that wipes all employee records if the developer's own account is ever removed from the HR system. Which term BEST describes this malware?",
    "Malicious code planted by an ex-employee deletes payroll data when it detects their account has been deleted. What is this malware called?"
  ],
  "d2-19": [
    "A single source IP attempts one common password against hundreds of different user accounts. Which attack is this?",
    "One address tries the same widely used password across a large number of user accounts. Which attack does this describe?"
  ],
  "d2-20": [
    "Malware moves through a network on its own by exploiting an unpatched SMB flaw, with no user action required. Which type of malware is this?",
    "Without any user interaction, malicious code spreads between hosts by taking advantage of an SMB vulnerability that was never patched. What type of malware is it?"
  ],
  "d2-21": [
    "An attacker records an authentication exchange on the network and later retransmits it to gain access. Which attack is this?",
    "A captured login exchange is sent again later by an attacker to get into a system. Which attack does this describe?"
  ],
  "d2-22": [
    "An attacker pushes a client and server to negotiate an older, weaker TLS version so the traffic can be decrypted. Which attack is this?",
    "By interfering with the handshake, an attacker makes both sides settle on a weaker, outdated TLS version. Which attack is this?"
  ],
  "d2-23": [
    "A security team sees many DNS queries with long, random-looking subdomains all directed at one external domain. What is MOST likely happening?",
    "An analyst notices heavy DNS traffic containing long, random-looking hostnames to a single outside domain. Which activity is MOST likely occurring?"
  ],
  "d2-24": [
    "An attacker sends small spoofed queries to open DNS resolvers, which return much larger responses to the victim. Which attack does this describe?",
    "Open DNS resolvers flood a victim with large replies in response to tiny spoofed requests. Which attack is this?"
  ],
  "d2-25": [
    "A company wants to limit what an attacker can do if one workstation is compromised. Which mitigation would BEST reduce lateral movement?",
    "Which technique would MOST effectively keep an attacker who has compromised one workstation from moving to other systems?"
  ],
  "d2-26": [
    "An administrator wants only approved applications to run on point-of-sale terminals. What should be implemented?",
    "Which control ensures that nothing but pre-approved software can execute on checkout terminals?"
  ],
  "d2-27": [
    "To reduce the attack surface of a newly deployed server, which TWO hardening steps would be BEST? (Select TWO).",
    "A new server is being prepared for production. Which TWO actions would MOST reduce its attack surface? (Select TWO)."
  ],
  "d2-28": [
    "A database administrator receives only the permissions needed to back up databases, and nothing beyond that. Which principle is being applied?",
    "Access for a DBA is limited strictly to what backup tasks require. Which security principle does this reflect?"
  ],
  "d2-29": [
    "A company is disposing of a server and must ensure data cannot be recovered from hard drives that will not be reused. Which method is the MOST secure?",
    "Retired server drives will never be reused. Which disposal method gives the strongest assurance that the data cannot be recovered?"
  ],
  "d2-30": [
    "A system administrator who was passed over for a promotion deletes critical backups before resigning. Which of the following BEST describes the threat actor and motivation?",
    "Angry about being overlooked for a promotion, a sysadmin erases key backups on the way out. Which threat actor and motivation does this represent?"
  ],
  "d2-31": [
    "A criminal gang infects hospitals with ransomware and demands cryptocurrency. What is the MOST likely motivation?",
    "Attackers lock hospital systems with ransomware and ask for payment in cryptocurrency. Which motivation is MOST likely?"
  ],
  "d2-32": [
    "Which threat actor attribute indicates whether an attacker works from within the organization or from outside it?",
    "When profiling a threat actor, which attribute distinguishes insiders from outsiders?"
  ],
  "d2-33": [
    "An employee picks up a USB drive labeled 'Executive Salaries' in the parking lot and connects it to a work computer, which becomes infected. Which attack vector was used?",
    "A found flash drive marked 'Executive Salaries' is plugged into a corporate PC and infects it. Through which vector did the malware arrive?"
  ],
  "d2-34": [
    "Someone claiming to be from the IT help desk calls an employee and asks them to read out the one-time code sent to their phone to 'verify the account.' Which attack is this?",
    "A phone caller posing as help desk staff persuades an employee to disclose a one-time passcode, saying it is needed to verify their account. Which attack is this?"
  ],
  "d2-35": [
    "An attacker creates a wireless access point using the same SSID as the corporate network in order to capture user credentials. Which attack BEST describes this?",
    "To harvest credentials, a rogue access point broadcasts the corporate network's name. What is this attack called?"
  ],
  "d2-36": [
    "A company leaves Telnet and FTP running on internet-facing servers. Which TWO attack surfaces does this create? (Select TWO).",
    "Internet-facing servers at a company still have Telnet and FTP enabled. Which TWO weaknesses does this expose? (Select TWO)."
  ],
  "d2-37": [
    "An attacker emails recipients a message that precisely imitates a well-known shipping company's logo and layout and asks them to pay a customs fee. Which technique BEST describes this?",
    "Emails mimicking a familiar courier's branding ask people to pay a customs charge. Which technique is the attacker using?"
  ],
  "d2-38": [
    "Which social engineering technique involves spreading false information to shape public opinion about an organization?",
    "Deliberately circulating untrue information to influence how the public views a company is an example of which technique?"
  ],
  "d2-39": [
    "A program copies user input into a fixed-size memory buffer without checking the length, allowing an attacker to overwrite the return address. Which vulnerability exists?",
    "An application does not validate the size of input before copying it into a fixed memory buffer, letting an attacker overwrite the saved return address. What vulnerability is this?"
  ],
  "d2-40": [
    "A cloud storage bucket holding customer records was set to allow public read access. Which vulnerability type BEST describes this?",
    "Customer data stored in a cloud bucket can be read by anyone on the internet because of its access settings. Which vulnerability type is this?"
  ],
  "d2-41": [
    "A company continues to run a server operating system for which the vendor no longer provides security updates. Which term BEST describes the vulnerability?",
    "A production server runs an OS that has reached the end of vendor support and will no longer receive patches. What is this vulnerability called?"
  ],
  "d2-42": [
    "A user installs an app on an Android phone from a third-party website rather than the official store. What is this activity called?",
    "Instead of using the official app store, someone downloads and installs an Android application from an outside website. Which term BEST describes this?"
  ],
  "d2-43": [
    "An attacker causes a logged-in user's browser to submit an unwanted transfer request to a banking site. Which attack is this?",
    "A malicious page makes a victim's authenticated browser send a funds transfer request to their bank without their knowledge. What attack is this?"
  ],
  "d2-44": [
    "A web application retrieves a URL supplied by the user. An attacker provides an internal address that reaches the cloud metadata service. Which vulnerability is being exploited?",
    "By submitting an internal URL to a feature that fetches web content, an attacker reaches a cloud provider's metadata service. Which vulnerability is this?"
  ],
  "d2-45": [
    "A cloud provider does not properly clear memory before reassigning it to a different tenant, exposing earlier data. Which vulnerability BEST describes this?",
    "Data from a previous customer is visible to a new tenant because memory was not wiped before being reallocated. What is this vulnerability?"
  ],
  "d2-46": [
    "Users complain of constant pop-up ads and a browser home page that changes without their permission. What is MOST likely installed?",
    "Unwanted advertisements keep appearing and browsers keep resetting their start page on several workstations. Which type of software is MOST likely responsible?"
  ],
  "d2-47": [
    "Analysts find malware that runs only in memory, using built-in tools such as PowerShell, and leaves no files on disk. Which term BEST describes it?",
    "A threat executes entirely in RAM using native system utilities and writes nothing to disk. What type of malware is it?"
  ],
  "d2-48": [
    "An attacker takes usernames and passwords exposed in a social media breach and uses them to sign in to employees' corporate accounts. Which attack is this?",
    "Credentials leaked from an unrelated website breach are tried against a company's login portal. Which attack does this describe?"
  ],
  "d2-49": [
    "An attacker sends forged ARP replies to tie their own MAC address to the default gateway's IP address. Which attack is this?",
    "Forged ARP responses make hosts believe the gateway's IP address belongs to the attacker's MAC address. Which attack does this describe?"
  ],
  "d2-50": [
    "A user's account locks out every few minutes even after password resets, and logs show failed attempts from many external IPs. What is the MOST likely cause?",
    "An account keeps getting locked despite repeated password resets, with failed logins arriving from numerous outside addresses. What is the MOST probable cause?"
  ],
  "d2-51": [
    "An analyst sees a user account open a sensitive file share at 3 a.m. on a Sunday, which is unusual for that user. Which indicator does this represent?",
    "A user who normally works weekday business hours accesses a sensitive share at 3 a.m. on a Sunday. Which indicator is this?"
  ],
  "d2-52": [
    "An attacker buries malicious code in the operating system kernel to keep privileged access and avoid detection tools. Which type of malware is this?",
    "Malware embedded at kernel level preserves elevated access while hiding from security software. What type of malware is it?"
  ],
  "d2-53": [
    "The security logs on a compromised server were deleted soon after suspicious activity started. Which indicator is this?",
    "Soon after unusual activity began on a server, its security logs disappeared. Which indicator does this represent?"
  ],
  "d2-54": [
    "An attacker extracts an NTLM hash from memory and uses it to authenticate to other systems without cracking it. Which attack is this?",
    "A stolen NTLM hash is presented directly to other systems to log in, with no password cracking involved. Which attack is this?"
  ],
  "d2-55": [
    "After detecting malware on one host, a security team places it in a restricted network so it cannot reach any other system. Which mitigation technique is this?",
    "To stop an infected machine from contacting other systems, it is moved onto a quarantined network segment. Which mitigation technique does this describe?"
  ],
  "d2-56": [
    "An organization uses Group Policy to ensure every workstation has the screen lock, firewall, and audit settings defined in its security baseline. Which mitigation technique is this?",
    "Group Policy automatically applies the screen lock, firewall, and auditing settings from the company's baseline to all workstations. Which mitigation technique does this represent?"
  ],
  "d2-57": [
    "Which measure is the BEST way to reduce the risk of SQL injection in a web application?",
    "What should developers use to most effectively prevent SQL injection in a web application?"
  ],
  "d2-58": [
    "Which endpoint hardening technique would BEST protect against unauthorized changes to the boot process?",
    "To prevent tampering with how a computer starts up, which hardening technique is MOST effective?"
  ],
  "d3-0": [
    "An organization subscribes to a cloud provider's hosted email service (SaaS). According to the shared responsibility model, what is the customer MOST likely responsible for?",
    "In a SaaS email deployment, which task falls to the customer under the shared responsibility model?"
  ],
  "d3-1": [
    "Developers want their code to run automatically when events occur, with no servers or operating systems for them to manage. Which architecture fits?",
    "Which architecture lets a team execute event-triggered functions without provisioning or maintaining any servers?"
  ],
  "d3-2": [
    "A security architect wants network settings stored in version-controlled files so that environments can be rebuilt identically every time. Which concept is this?",
    "Defining infrastructure in code files kept in version control, so deployments are consistent and repeatable, describes which concept?"
  ],
  "d3-3": [
    "Specialized systems monitor and control physical processes at several geographically dispersed power plant sites. Which term BEST describes them?",
    "Which term describes the systems used to supervise and control industrial processes across widely distributed locations, such as a utility's plants?"
  ],
  "d3-4": [
    "A laboratory keeps highly sensitive data on a system with no wired or wireless link to any other network. How is this system BEST described?",
    "A system holding sensitive research data is physically disconnected from every other network. Which term describes it?"
  ],
  "d3-5": [
    "Which security concern is particularly associated with embedded systems and IoT devices?",
    "What is a common security challenge for embedded and IoT devices?"
  ],
  "d3-6": [
    "One appliance needs to perform application-layer inspection, intrusion prevention, and URL filtering. Which should the company deploy?",
    "A company wants a single device that inspects traffic at the application layer, blocks intrusions, and filters web addresses. Which device fits?"
  ],
  "d3-7": [
    "Which device is BEST for protecting a web application from SQL injection and cross-site scripting?",
    "A security engineer needs to defend a web app against injection and XSS attacks. Which device should be deployed?"
  ],
  "d3-8": [
    "All administrative connections to servers in a secure segment must pass through one hardened, monitored system. What should be implemented?",
    "To funnel administrator access into a protected network segment through a single hardened and monitored host, which should be used?"
  ],
  "d3-9": [
    "An inline IPS can drop malicious packets, but the company wants traffic to keep flowing if the IPS itself fails. Which configuration is needed?",
    "If an in-line IPS fails, the company requires network traffic to continue passing. Which failure mode should be configured?"
  ],
  "d3-10": [
    "A company wants remote workers to reach internal resources securely while their internet traffic is inspected by cloud-delivered security services. Which BEST meets this need?",
    "Which solution combines secure remote access with cloud-delivered inspection of users' internet traffic?"
  ],
  "d3-11": [
    "Which protocol provides port-based network access control, authenticating a device before it can join a wired or wireless network?",
    "Devices must authenticate before gaining access to a switch port or wireless network. Which protocol enforces this?"
  ],
  "d3-12": [
    "Two branch offices need a VPN that encrypts the whole IP packet, original header included. Which should be used?",
    "Which VPN configuration encapsulates and encrypts the entire original IP packet between two sites?"
  ],
  "d3-13": [
    "Which device spreads incoming requests across several servers to improve availability and performance?",
    "What device distributes client traffic among multiple servers so that no single server is overwhelmed?"
  ],
  "d3-14": [
    "A company must keep customer data only in data centers physically located inside the European Union. Which concept does this requirement address?",
    "Legal rules require that data remain stored within a certain country or region. Which concept is this?"
  ],
  "d3-15": [
    "A support portal shows only the final four digits of a customer's Social Security number. Which technique is in use?",
    "Only the last four digits of an SSN appear on screen in a customer portal. Which data protection technique does this represent?"
  ],
  "d3-16": [
    "In which state is data that is being processed in a system's RAM?",
    "Data actively being handled by a CPU and held in memory is in which state?"
  ],
  "d3-17": [
    "Which data classification would MOST likely be assigned to a company's unreleased product designs?",
    "Unreleased product designs would typically fall under which classification?"
  ],
  "d3-18": [
    "Which TWO types of data would be classified as regulated? (Select TWO).",
    "Which TWO of the following are examples of regulated data? (Select TWO)."
  ],
  "d3-19": [
    "A backup site has power, networking, and hardware installed, but the latest data must be restored before it can take over. Which site type is this?",
    "Which type of recovery site already has equipment and connectivity in place but needs current data restored before operations can move there?"
  ],
  "d3-20": [
    "A business can accept losing at most 4 hours of transaction data during an outage. Which metric defines this?",
    "The maximum amount of data loss, measured in time, that an organization can tolerate is defined by which metric?"
  ],
  "d3-21": [
    "A backup plan performs a full backup on Sunday, then each day copies only the data changed since the previous day's backup. What type is used Monday to Saturday?",
    "After a Sunday full backup, each daily backup captures only changes since the last backup of any kind. Which backup type is this?"
  ],
  "d3-22": [
    "Which device supplies short-term power during an outage so systems can shut down cleanly or bridge the time until a generator starts?",
    "What provides temporary battery power to equipment when utility power fails?"
  ],
  "d3-23": [
    "An application runs in two cloud regions, and both serve traffic at the same time. If one fails, the other handles every user. Which BEST describes this?",
    "Two regions concurrently serve an application so that either can take on the full load if the other fails. Which design is this?"
  ],
  "d3-24": [
    "A company tests its disaster recovery plan by really shifting production operations to the backup site. Which test is this?",
    "Which type of test actually moves live operations to the alternate site to validate the DR plan?"
  ],
  "d3-25": [
    "Servers from several hardware vendors and two cloud providers are used so that one vendor's flaw cannot bring down every system. Which concept does this represent?",
    "Using a mix of vendors and cloud providers to avoid a single common point of failure demonstrates which concept?"
  ],
  "d3-26": [
    "A company runs its compute workloads in a cloud provider's environment while keeping its customer database in its own data center, with the two linked. Which model BEST describes this?",
    "Some workloads live with a cloud provider and others stay in the company's own data center, connected together. Which cloud model is this?"
  ],
  "d3-27": [
    "An application is bundled with its libraries and dependencies so it behaves the same on any host sharing the same OS kernel. Which technology is this?",
    "Which technology packages an app with its dependencies so it runs consistently across hosts that use the same kernel?"
  ],
  "d3-28": [
    "What is a primary security benefit of a microservices architecture?",
    "Which advantage does a microservices design offer from a security standpoint?"
  ],
  "d3-29": [
    "A medical device uses a specialized OS that must react to sensor inputs within strict, guaranteed time limits. Which BEST describes the OS?",
    "Which type of operating system guarantees responses to inputs within fixed deadlines, as used in many medical and industrial devices?"
  ],
  "d3-30": [
    "A network team wants to decouple the control plane from the data plane so devices can be programmed from a central point. What should be implemented?",
    "Which technology separates network control from packet forwarding and allows central programming of devices?"
  ],
  "d3-31": [
    "When evaluating a new architecture, which consideration describes how quickly a system can be restored after a failure?",
    "Which architectural consideration refers to the speed and simplicity of bringing a system back online after an outage?"
  ],
  "d3-32": [
    "Public web servers are placed in a network segment that sits between the internet and the internal network. Which term BEST describes the segment?",
    "Which term names the network zone that hosts public-facing servers between the internet and the internal LAN?"
  ],
  "d3-33": [
    "An IDS is attached to a switch SPAN port so it can watch traffic but cannot block it. Which BEST describes this deployment?",
    "A sensor that only receives a copy of network traffic from a SPAN port and cannot stop anything is deployed in which mode?"
  ],
  "d3-34": [
    "A company wants employees' web traffic filtered for malicious sites while hiding internal IP addresses from the websites they visit. What should be deployed?",
    "Which device filters outbound web requests from users and masks internal addresses from external sites?"
  ],
  "d3-35": [
    "Which device receives inbound internet requests on behalf of internal web servers, frequently offering caching and TLS offloading?",
    "What accepts client requests from the internet for backend web servers and may cache content and terminate TLS?"
  ],
  "d3-36": [
    "A small business wants a single appliance combining firewall, antivirus, content filtering, and VPN capabilities. What should it buy?",
    "Which all-in-one security appliance integrates firewall, anti-malware, content filtering, and VPN features?"
  ],
  "d3-37": [
    "A remote worker's VPN sends only traffic bound for corporate resources through the tunnel, while other internet traffic goes straight out. Which BEST describes this setup?",
    "In a VPN, only company-bound traffic is tunneled and everything else uses the local internet connection. What is this configuration called?"
  ],
  "d3-38": [
    "Which secure protocol should replace Telnet for command-line administration of network devices?",
    "Administrators currently use Telnet to manage routers and switches. Which protocol should replace it?"
  ],
  "d3-39": [
    "A security engineer is selecting controls for an enterprise network. Which device attribute indicates whether a security device sits directly in the traffic path?",
    "Which attribute describes whether a security appliance is placed in the data path or only monitors a copy of the traffic?"
  ],
  "d3-40": [
    "Which data protection method restricts access according to the physical or network location of the requester?",
    "Limiting who can reach data based on where they are connecting from is an example of which method?"
  ],
  "d3-41": [
    "An organization labels information whose disclosure would seriously harm the business. Which label is MOST appropriate?",
    "Information whose exposure would cause serious damage to the company should receive which classification label?"
  ],
  "d3-42": [
    "A company wants only authorized applications to read files in a storage bucket, even if the bucket is accidentally exposed publicly. Which provides the BEST protection?",
    "If a storage bucket is mistakenly made public, which measure keeps the files readable only by authorized applications?"
  ],
  "d3-43": [
    "Which data type identifies a specific individual and must be protected under many privacy laws?",
    "Information that can be used to identify a particular person is protected by many privacy regulations. What is it called?"
  ],
  "d3-44": [
    "A company wants its web application to stay available if one server fails. What should be implemented?",
    "Which solution BEST keeps a web application running when a single server goes down?"
  ],
  "d3-45": [
    "Before a major update, a company captures a point-in-time copy of a virtual machine so it can quickly roll back. What is this?",
    "Which feature saves a virtual machine's state at a moment in time so it can be reverted if an update fails?"
  ],
  "d3-46": [
    "A database writes each transaction to a log before applying it, so the database can be rebuilt after a crash. Which does this describe?",
    "Recording transactions in a log ahead of committing them, to enable recovery after failure, is known as what?"
  ],
  "d3-47": [
    "A company keeps backup copies 300 miles from its main data center. Which risk does this MOST directly address?",
    "Storing backups at a distant location primarily protects against which risk?"
  ],
  "d3-48": [
    "A company copies data from its primary storage array to a secondary array continuously and in real time. Which BEST describes this?",
    "Which technique keeps a second storage system synchronized with the primary as changes occur?"
  ],
  "d3-49": [
    "An organization reviews whether it has enough personnel, technology, and infrastructure to handle expected growth and demand surges. What is this?",
    "Evaluating whether resources can support projected growth and peak demand is an example of which activity?"
  ],
  "d3-50": [
    "The DR team activates backup systems and runs them alongside production without shutting production down. Which test is this?",
    "Which DR test runs the recovery systems in parallel with live production, leaving production in service?"
  ],
  "d4-0": [
    "A company wants every new server deployed with the same approved, hardened configuration. What should be created first?",
    "To make sure all newly deployed servers share one approved hardened configuration, which item should be established first?"
  ],
  "d4-1": [
    "A company issues smartphones to employees and wants to remotely wipe them, enforce screen locks, and push apps. What should be implemented?",
    "Which solution lets a company enforce screen locks, deploy applications, and remotely wipe company-issued phones?"
  ],
  "d4-2": [
    "Which deployment model lets employees pick from a list of company-approved devices that the company buys and owns?",
    "Employees select a phone from an approved catalog; the company purchases and owns it. Which model is this?"
  ],
  "d4-3": [
    "A security administrator is setting up a new employee wireless network. Which option provides the STRONGEST security?",
    "Which wireless security configuration is the strongest choice for a corporate employee network?"
  ],
  "d4-4": [
    "A developer wants to find vulnerabilities in source code without running the application. Which should be used?",
    "Which technique examines source code for flaws without executing the program?"
  ],
  "d4-5": [
    "A web developer wants to block injection attacks by making sure user-supplied data fits an expected format before it is processed. What should be implemented?",
    "Which secure coding practice checks that user data matches the expected format before the application uses it?"
  ],
  "d4-6": [
    "A company is retiring laptops and needs proof that a third-party vendor destroyed the hard drives. What should it obtain?",
    "Which document gives a company evidence that a vendor destroyed its decommissioned hard drives?"
  ],
  "d4-7": [
    "Which asset management activity assigns each device to a responsible owner and tracks it through its lifecycle?",
    "Assigning every device an accountable owner and following it from acquisition to disposal is part of which activity?"
  ],
  "d4-8": [
    "A vulnerability scan flags a critical flaw on a server, but the administrator finds the affected software isn't installed. How is this result BEST described?",
    "A scanner reports a vulnerability that does not actually exist on the system. What is this result called?"
  ],
  "d4-9": [
    "An analyst needs to prioritize vulnerability remediation across the organization. Which provides a standardized severity score for each vulnerability?",
    "Which standard assigns a numeric severity rating to vulnerabilities so they can be prioritized?"
  ],
  "d4-10": [
    "A vulnerability scanner signs in to target systems using administrative credentials to check installed patches and configurations. Which scan type is this?",
    "Which type of vulnerability scan authenticates to hosts so it can inspect patch levels and settings from the inside?"
  ],
  "d4-11": [
    "After a patch is applied for a reported vulnerability, what should the security team do NEXT?",
    "Once a fix for a reported vulnerability has been deployed, which step should come next?"
  ],
  "d4-12": [
    "A company pays external researchers who responsibly report vulnerabilities in its web applications. Which does this describe?",
    "Rewarding outside researchers for disclosing security flaws responsibly is a feature of which program?"
  ],
  "d4-13": [
    "A security team wants one platform that collects logs from firewalls, servers, and endpoints and correlates events to raise alerts. What should be deployed?",
    "Which tool aggregates logs from many sources and correlates them to generate security alerts?"
  ],
  "d4-14": [
    "Which SNMP version supports authentication and encryption and should be used to monitor network devices securely?",
    "To monitor network devices securely with authentication and encryption, which SNMP version should be used?"
  ],
  "d4-15": [
    "A SOC analyst gets so many low-priority alerts that important ones are being missed. What should the analyst do FIRST?",
    "Alert volume in the SIEM is hiding critical events. Which action should be taken first?"
  ],
  "d4-16": [
    "A company wants to stop employees from emailing documents that contain credit card numbers outside the organization. What should be implemented?",
    "Which control prevents sensitive data such as payment card numbers from leaving the organization by email?"
  ],
  "d4-17": [
    "Which email security mechanism lets a domain owner publish the mail servers authorized to send email for the domain?",
    "A domain owner wants to list the servers allowed to send mail on its behalf in DNS. Which mechanism is used?"
  ],
  "d4-18": [
    "A security team wants a tool on each workstation that continuously monitors behavior, detects threats, and can automatically isolate the host. Which BEST meets this requirement?",
    "Which endpoint solution monitors behavior continuously, detects threats, and can cut an infected host off from the network?"
  ],
  "d4-19": [
    "A company points requests for known malicious domains to an internal address so infected hosts cannot reach command-and-control servers. What is this?",
    "Which technique redirects queries for malicious domains to a harmless internal IP to block malware communications?"
  ],
  "d4-20": [
    "Employees sign in once at their workstation and can then open email, the HR portal, and the CRM without entering credentials again. What is being used?",
    "A user authenticates one time and gains access to several applications without logging in to each. Which is this?"
  ],
  "d4-21": [
    "A user types a password and then approves a push notification on their phone. Which TWO authentication factors are used? (Select TWO).",
    "Logging in requires a password plus approval of a phone push prompt. Which TWO factors does this involve? (Select TWO)."
  ],
  "d4-22": [
    "An access control model grants permissions based on job functions such as 'Accountant' or 'HR Manager.' Which model is this?",
    "Which access control model assigns permissions according to a user's job role?"
  ],
  "d4-23": [
    "A government system labels data Secret or Top Secret and permits access only to users with matching clearance. Which access control model is in use?",
    "Access is granted only when a user's clearance matches the data's classification label. Which model is this?"
  ],
  "d4-24": [
    "A company wants administrators to check out privileged credentials only when needed, with passwords rotated automatically afterward. What should be implemented?",
    "Which solution issues privileged credentials on demand and changes the passwords automatically after use?"
  ],
  "d4-25": [
    "Users sign in to a partner's web application with their corporate credentials through XML-based assertions. Which protocol is MOST likely in use?",
    "Which protocol uses XML assertions to let a user's corporate identity provider authenticate them to a partner's web app?"
  ],
  "d4-26": [
    "A SOC wants alerts enriched, malicious IPs blocked on the firewall, and tickets opened, all without analyst intervention. What should be implemented?",
    "Which technology automates alert enrichment, firewall blocking, and ticket creation in a security operations center?"
  ],
  "d4-27": [
    "Which is a potential DRAWBACK of extensive security automation?",
    "What downside can result from relying heavily on security automation?"
  ],
  "d4-28": [
    "An analyst confirms malware on several workstations. According to the incident response process, what should be done NEXT?",
    "Malware infection has been confirmed on multiple workstations. Which incident response phase comes next?"
  ],
  "d4-29": [
    "A forensic investigator is collecting evidence from a running system. What should be collected FIRST?",
    "Following the order of volatility, which evidence should be gathered first from a live system?"
  ],
  "d4-30": [
    "Which document records every person who handled a piece of evidence, when, and why?",
    "What tracks who possessed evidence, when they had it, and the reason for the transfer?"
  ],
  "d4-31": [
    "The incident response team meets in a conference room to discuss how they would respond to a hypothetical ransomware scenario. What is this?",
    "Stakeholders talk through their response to a fictional ransomware incident without touching any systems. Which exercise is this?"
  ],
  "d4-32": [
    "Legal counsel tells IT to preserve all email and documents tied to a pending lawsuit and pause normal deletion schedules. What is this?",
    "Because of impending litigation, normal deletion of relevant records is suspended. Which term describes this?"
  ],
  "d4-33": [
    "An analyst wants to know which internal hosts talked to a suspicious external IP and how much data moved, without capturing full packets. Which data source is BEST?",
    "Which data source shows who communicated with a suspicious address and the volume of data, without full packet contents?"
  ],
  "d4-34": [
    "An analyst must see the exact contents of a suspicious HTTP session to determine what data was exfiltrated. Which data source should be used?",
    "Which data source reveals the full payload of a suspicious web session?"
  ],
  "d4-35": [
    "A company wants newly deployed servers to keep matching the approved secure configuration over time. Which activity should be performed regularly?",
    "Which ongoing activity ensures servers do not stray from their approved secure configuration?"
  ],
  "d4-36": [
    "A security team wants to stop smartphones from joining corporate Wi-Fi unless they are enrolled in management. What should be used?",
    "Which combination admits phones to the corporate wireless network only if they are managed devices?"
  ],
  "d4-37": [
    "A developer feeds an application large volumes of random, malformed input to see if it crashes. Which testing method is this?",
    "Which testing technique bombards a program with unexpected or malformed data to expose crashes and flaws?"
  ],
  "d4-38": [
    "Which wireless authentication method relies on a RADIUS server and individual user credentials instead of a shared passphrase?",
    "Wi-Fi access should use per-user credentials verified by a RADIUS server rather than a common password. Which method provides this?"
  ],
  "d4-39": [
    "An administrator is hardening a Linux web server. Which action would BEST reduce its attack surface?",
    "Which step would most effectively shrink the attack surface of a Linux web server?"
  ],
  "d4-40": [
    "Ahead of a site survey for a new office, the network team wants to visualize wireless signal strength and locate dead zones. What should it produce?",
    "Which deliverable shows Wi-Fi coverage and signal strength across a floor plan?"
  ],
  "d4-41": [
    "Before reusing hard drives inside the organization, IT overwrites every sector several times. Which process is this?",
    "Drives that will be reused internally are wiped by overwriting all sectors multiple times. What is this process called?"
  ],
  "d4-42": [
    "What should an organization define to determine how long data must be kept before it can be disposed of?",
    "Which policy states the length of time data must be retained before disposal?"
  ],
  "d4-43": [
    "An organization automatically detects every new device that joins the network and adds it to its asset database. Which asset management practice is this?",
    "Which practice finds new devices on the network and records them in the inventory automatically?"
  ],
  "d4-44": [
    "A vulnerability scan failed to report a known vulnerability present on a server. How is this result BEST described?",
    "A scanner misses a real vulnerability on a host. What is this outcome called?"
  ],
  "d4-45": [
    "An organization subscribes to a feed of indicators of compromise shared by other companies in its industry. Which BEST describes this source?",
    "Companies in one sector exchange indicators of compromise through a shared feed. Which source is this?"
  ],
  "d4-46": [
    "A critical vulnerability cannot be patched until next quarter due to vendor certification requirements, so the risk committee formally documents permission to run the system in the meantime. What is this?",
    "A risk committee officially approves temporarily operating an unpatched critical system. Which term describes this?"
  ],
  "d4-47": [
    "An analyst needs a list of publicly disclosed vulnerabilities with unique identifiers to cite in a report. What should be used?",
    "Which resource assigns unique identifiers to publicly known vulnerabilities?"
  ],
  "d4-48": [
    "Which TWO factors should a security team consider when prioritizing vulnerabilities for remediation? (Select TWO).",
    "When deciding which vulnerabilities to fix first, which TWO factors are relevant? (Select TWO)."
  ],
  "d4-49": [
    "A SOC analyst wants to send logs from many Linux servers and network devices to one central server using a standard protocol. What should be used?",
    "Which standard protocol forwards logs from servers and network devices to a central collector?"
  ],
  "d4-50": [
    "Which tool monitors cloud application usage, enforces policies, and detects shadow IT across SaaS services?",
    "An organization wants to find unsanctioned SaaS use and apply policy to cloud applications. Which tool is designed for this?"
  ],
  "d4-51": [
    "A security analyst must keep logs for one year to satisfy a compliance requirement. Which alerting and monitoring activity does this describe?",
    "Retaining logs for a year to meet a regulatory obligation is an example of which activity?"
  ],
  "d4-52": [
    "An agent on each server checks file integrity and reports whenever system binaries are modified. Which tool is this?",
    "Which tool alerts administrators when critical system files on a server are changed?"
  ],
  "d4-53": [
    "An email gateway verifies that incoming messages are signed with a valid domain key, then applies the sender domain's published policy to quarantine failures. Which TWO are being used? (Select TWO).",
    "Incoming mail is checked for a valid domain signature, and messages that fail are handled per the sender domain's published policy. Which TWO mechanisms are involved? (Select TWO)."
  ],
  "d4-54": [
    "A company wants to block employees from reaching gambling and malware sites based on website categories. What should be implemented?",
    "Which control blocks access to websites according to their category, such as gambling or malware?"
  ],
  "d4-55": [
    "Which technology analyzes normal user and device behavior and alerts on deviations, such as a user suddenly downloading large amounts of data?",
    "A tool baselines typical user activity and flags anomalies like an unexpected bulk download. What is it?"
  ],
  "d4-56": [
    "A firewall administrator allows only TCP port 443 from the internet to the web server and denies everything else. Which principle does the final rule represent?",
    "A firewall rule set permits specific traffic and ends by blocking all other traffic. Which principle does that last rule illustrate?"
  ],
  "d4-57": [
    "Which DNS extension uses digital signatures to verify that DNS responses were not tampered with?",
    "What adds cryptographic signatures to DNS data so clients can confirm responses are authentic?"
  ],
  "d4-58": [
    "A switch limits each port to a set number of MAC addresses and shuts the port down if an unknown device connects. What is this?",
    "Which switch feature restricts the MAC addresses allowed on a port and disables the port on a violation?"
  ],
  "d4-59": [
    "When someone is hired, an automated workflow creates their accounts and grants access based on job title; when they leave, access is removed. Which process is this?",
    "Automatically creating accounts and entitlements at hire and removing them at departure describes which process?"
  ],
  "d4-60": [
    "A mobile app needs permission to post to a user's social media account without ever receiving the user's password. Which protocol is designed for this?",
    "Which protocol lets an application act on a user's behalf at another service without handling the user's password?"
  ],
  "d4-61": [
    "A policy lets contractors view project files only during business hours and only from company-managed devices. Which access control model BEST describes this?",
    "Access depends on conditions such as time of day and device management status. Which access control model does this reflect?"
  ],
  "d4-62": [
    "Which authentication method is MOST resistant to phishing?",
    "Which of the following authentication options best withstands phishing attacks?"
  ],
  "d4-63": [
    "A manager reviews a quarterly report of everyone with access to the finance application and confirms each person still needs it. What is this?",
    "Periodically verifying that each user's existing access is still required is known as what?"
  ],
  "d4-64": [
    "A privileged access management tool gives an administrator elevated permissions for 30 minutes, then revokes them automatically. What is this?",
    "Elevated rights are granted only for a limited window and then removed automatically. Which concept is this?"
  ],
  "d4-65": [
    "A company uses scripts to create user accounts, assign groups, and provision resources automatically when employees are added to the HR system. What benefit does this PRIMARILY provide?",
    "Automating account creation and group assignment when new hires are entered into HR mainly provides which benefit?"
  ],
  "d4-66": [
    "Which use of automation would BEST support enforcing security baselines across hundreds of servers?",
    "To keep hundreds of servers aligned with a security baseline, which automated approach works BEST?"
  ],
  "d4-67": [
    "After an incident is resolved, the team meets to review what happened, what worked, and how to improve. Which incident response phase is this?",
    "A post-incident meeting examines what went well and what should change. Which phase does this describe?"
  ],
  "d4-68": [
    "An incident responder removes malware, deletes unauthorized accounts, and patches the exploited vulnerability. Which incident response phase is this?",
    "Eliminating the malware, rogue accounts, and the exploited weakness belongs to which phase of incident response?"
  ],
  "d4-69": [
    "A security team determines the underlying reason an incident occurred so it can be prevented in the future. What is this?",
    "Identifying why an incident happened in order to stop it from recurring is called what?"
  ],
  "d4-70": [
    "Analysts proactively search logs and endpoint data for signs of an attacker that existing tools never alerted on. What is this?",
    "Which activity involves actively looking for hidden threats that have not triggered any alerts?"
  ],
  "d4-71": [
    "A forensic analyst makes a bit-by-bit copy of a hard drive and hashes both the original and the copy. What is the PRIMARY purpose of the hash?",
    "Why does a forensic examiner calculate hashes of both a source drive and its image?"
  ],
  "d4-72": [
    "A company must find and produce electronic documents relevant to a lawsuit. Which process is this?",
    "Identifying, collecting, and producing electronically stored information for litigation is known as what?"
  ],
  "d4-73": [
    "An analyst investigating a phishing incident wants to know which users clicked the malicious link. Which data source would MOST likely provide this?",
    "Which log source would show which employees visited a malicious URL from a phishing email?"
  ],
  "d4-74": [
    "On a Windows workstation, an analyst must determine which process created a suspicious file and which user account ran it. Which data source is BEST?",
    "To find the process and user account behind a suspicious file on a Windows host, which data source should be consulted?"
  ],
  "d4-75": [
    "An analyst wants one view showing real-time trends of alerts, top attacked hosts, and incident counts for the SOC. What should be used?",
    "Which tool presents real-time SOC metrics such as alert trends and incident counts in a single view?"
  ],
  "d5-0": [
    "Which document provides mandatory, specific requirements such as 'passwords must be at least 14 characters'?",
    "A document states exact mandatory requirements, for example a minimum password length of 14 characters. What is it?"
  ],
  "d5-1": [
    "A company writes step-by-step instructions for onboarding new employees, including account creation and badge issuance. Which BEST describes this document?",
    "Which type of document gives detailed step-by-step instructions for carrying out a task such as employee onboarding?"
  ],
  "d5-2": [
    "In a data governance program, which role is ultimately accountable for a specific data set and decides its classification?",
    "Who is responsible for deciding the classification of a data set and is accountable for it?"
  ],
  "d5-3": [
    "A system administrator performs backups and applies access controls to a database following the data owner's instructions. Which role does the administrator fill?",
    "Which role handles the day-to-day technical protection of data, such as backups and access controls, as directed by the owner?"
  ],
  "d5-4": [
    "A cloud payroll provider handles employee data for a company that determines how and why the data is used. Under GDPR, what role does the provider hold?",
    "Under GDPR, which role describes an entity that processes personal data on behalf of the organization that decides its purpose?"
  ],
  "d5-5": [
    "An asset is worth $100,000, a fire would destroy 40% of it, and a fire is expected once every 10 years. What is the ALE?",
    "Given an asset value of $100,000, an exposure factor of 40%, and an expected fire frequency of once per decade, what is the annualized loss expectancy?"
  ],
  "d5-6": [
    "A company buys cybersecurity insurance to cover possible losses from a data breach. Which risk management strategy is this?",
    "Purchasing insurance to shift the financial impact of a breach represents which risk strategy?"
  ],
  "d5-7": [
    "A company stops offering a service because its risks are too high to justify the revenue. Which risk strategy is this?",
    "Which risk strategy is demonstrated when a business discontinues an activity to eliminate the associated risk?"
  ],
  "d5-8": [
    "Which document lists identified risks along with their owners, likelihood, impact, and planned responses?",
    "What is the name of the document used to track risks, their owners, ratings, and responses?"
  ],
  "d5-9": [
    "The amount of risk an organization is willing to accept in pursuit of its objectives is known as what?",
    "Which term describes the overall level of risk an organization is prepared to take on to achieve its goals?"
  ],
  "d5-10": [
    "After new controls are implemented, some risk remains. What is this remaining risk called?",
    "Which term describes the risk that is left over once controls have been applied?"
  ],
  "d5-11": [
    "A business impact analysis finds that a payment system must be restored within 2 hours of an outage. Which metric is this?",
    "The maximum acceptable time to restore a payment system after an outage is 2 hours. Which metric does this describe?"
  ],
  "d5-12": [
    "A risk assessment rates risks as high, medium, or low instead of using dollar amounts. Which type of risk analysis is this?",
    "Which kind of risk analysis relies on descriptive ratings rather than monetary values?"
  ],
  "d5-13": [
    "Before signing with a new managed service provider, a company reviews the vendor's security practices, financial stability, and past breaches. What is this?",
    "Researching a prospective vendor's security posture and track record before contracting is an example of what?"
  ],
  "d5-14": [
    "Which agreement specifies measurable service levels, such as 99.9% uptime and response times, between a provider and a customer?",
    "What type of agreement defines uptime and response-time commitments between a service provider and its customer?"
  ],
  "d5-15": [
    "Two organizations want to record a non-binding mutual understanding of their intent to collaborate on a project. What should be used?",
    "Which document captures a general, non-binding understanding between two parties planning to cooperate?"
  ],
  "d5-16": [
    "A company wants a contract clause that lets it inspect a vendor's security controls at any time. What should be included?",
    "Which contract provision allows a customer to examine a vendor's security controls on demand?"
  ],
  "d5-17": [
    "Which agreement defines the specific tasks, deliverables, and timeline for one project under an existing master agreement?",
    "Under an existing master agreement, which document spells out the work, deliverables, and schedule for a single project?"
  ],
  "d5-18": [
    "A company that processes credit card payments must comply with which standard?",
    "Which compliance standard applies to organizations that handle payment card data?"
  ],
  "d5-19": [
    "Under GDPR, a customer asks a company to delete all of their personal data. Which right are they exercising?",
    "Which GDPR right allows an individual to demand erasure of their personal data?"
  ],
  "d5-20": [
    "Which TWO are potential consequences of non-compliance with regulations? (Select TWO).",
    "Failing to comply with regulations can lead to which TWO outcomes? (Select TWO)."
  ],
  "d5-21": [
    "A penetration tester receives full network diagrams, source code, and credentials before beginning. Which BEST describes this test environment?",
    "Which type of penetration test gives the tester complete information about the target in advance?"
  ],
  "d5-22": [
    "Before a penetration test starts, the tester and client agree on scope, testing hours, and off-limits systems. Which document captures this?",
    "Which document sets out the scope, timing, and boundaries of a penetration test?"
  ],
  "d5-23": [
    "A penetration tester uses social media and public company websites to find employee names and email formats without touching the target's systems. What is this?",
    "Gathering information about a target from public sources without interacting with its systems is known as what?"
  ],
  "d5-24": [
    "In a security exercise, one team attacks, another defends, and a third works with both to share findings and strengthen defenses. Which is the third team?",
    "Which team collaborates with both the attackers and defenders in an exercise to improve defenses?"
  ],
  "d5-25": [
    "An independent firm reviews a company's controls and issues a formal statement that they meet a standard. Which BEST describes this statement?",
    "What is the term for a formal declaration by a third party that an organization's controls meet a standard?"
  ],
  "d5-26": [
    "The security team sends simulated phishing emails to employees and tracks who clicks the links. What is the PRIMARY purpose?",
    "Why does an organization run simulated phishing campaigns against its own staff?"
  ],
  "d5-27": [
    "An employee notices an unfamiliar person following closely behind them through a secure door. According to awareness training, what should the employee do?",
    "A stranger tries to slip through a secure door behind an employee. What does security awareness training say to do?"
  ],
  "d5-28": [
    "Which security awareness topic BEST addresses the risk of employees working from coffee shops?",
    "Employees often work remotely from cafes. Which awareness topic is MOST relevant?"
  ],
  "d5-29": [
    "A board of directors forms a committee to oversee the organization's security strategy and risk decisions. What does this represent?",
    "Which term describes a committee set up by the board to oversee security strategy and risk decisions?"
  ],
  "d5-30": [
    "Which document offers recommended, but not mandatory, practices for configuring secure workstations?",
    "What type of document provides optional, suggested practices rather than mandatory requirements?"
  ],
  "d5-31": [
    "An organization documents how it will keep critical business operations running during a prolonged disruption. Which policy does this describe?",
    "Which policy describes how an organization will continue essential operations through an extended outage or disaster?"
  ],
  "d5-32": [
    "Which external consideration would MOST likely require a multinational company to adjust its data handling procedures in each country?",
    "Why might a global company need different data handling procedures in different countries?"
  ],
  "d5-33": [
    "A company documents the steps developers must follow to securely build, test, and release software. What does this BEST describe?",
    "Which policy defines the secure stages developers follow when building, testing, and releasing software?"
  ],
  "d5-34": [
    "An outage would cost $20,000 per incident and is expected four times per year. What is the ALE?",
    "A server outage costs $20,000 each time and happens about four times a year. What is the annualized loss expectancy?"
  ],
  "d5-35": [
    "A company installs a web application firewall to lower the likelihood of a successful SQL injection attack. Which risk response is this?",
    "Deploying a control to reduce the likelihood of an attack succeeding represents which risk response?"
  ],
  "d5-36": [
    "Management reviews a low-impact risk and decides the cost of controls outweighs the potential loss, so it takes no action. Which risk response is this?",
    "Choosing to do nothing about a minor risk because mitigation would cost more than the loss is which risk response?"
  ],
  "d5-37": [
    "Which metric measures the average time a repairable system operates between failures?",
    "What term describes the average operating time between failures of a repairable system?"
  ],
  "d5-38": [
    "A risk register entry includes a metric that warns the security team when unpatched critical systems exceed 10. What does this metric represent?",
    "Which term describes a metric that signals rising risk, such as a growing count of unpatched critical systems?"
  ],
  "d5-39": [
    "An organization performs a risk assessment only when a major change occurs, such as a merger. Which BEST describes this type of assessment?",
    "Which type of risk assessment is triggered by specific events rather than a schedule?"
  ],
  "d5-40": [
    "Which describes a company that is risk-averse?",
    "A risk-averse organization is said to have which kind of risk appetite?"
  ],
  "d5-41": [
    "A company wants to be notified within 24 hours if its cloud provider suffers a breach affecting company data. Where should this requirement be documented?",
    "In which document should a customer specify that its provider must report breaches within 24 hours?"
  ],
  "d5-42": [
    "Which agreement sets the general terms, such as payment and liability, that apply to all future work between two companies?",
    "What type of agreement establishes the overarching terms for all later engagements between two organizations?"
  ],
  "d5-43": [
    "A company requires a vendor to complete a detailed security questionnaire and provide its latest SOC 2 report before onboarding. Which activity is this?",
    "Reviewing a vendor's questionnaire responses and SOC 2 report before onboarding is an example of what?"
  ],
  "d5-44": [
    "After onboarding, a company keeps reviewing its vendor's security posture and performance regularly. What is this?",
    "Which activity involves continuing to evaluate a vendor's security and performance after the contract has begun?"
  ],
  "d5-45": [
    "A company shares sensitive product plans with a contractor and wants to legally prevent the contractor from disclosing them. What should be signed?",
    "Which agreement legally prohibits a contractor from revealing confidential information?"
  ],
  "d5-46": [
    "What is the BEST way to identify conflicts of interest when selecting a vendor?",
    "Which approach best uncovers potential conflicts of interest during vendor selection?"
  ],
  "d5-47": [
    "A U.S. healthcare provider must protect patient medical records. Which regulation applies?",
    "Which U.S. regulation governs the protection of patient health information?"
  ],
  "d5-48": [
    "A company must submit an annual report to regulators confirming its security controls meet requirements. Which compliance activity is this?",
    "Reporting to regulators each year that controls satisfy requirements is an example of which activity?"
  ],
  "d5-49": [
    "A company uses automated tools to continuously check that its systems meet regulatory configuration requirements. What BEST describes this?",
    "Which activity uses tooling to continuously verify systems against compliance configuration requirements?"
  ],
  "d5-50": [
    "Under privacy regulations, which term refers to the individual whose personal data is being collected?",
    "In privacy law, what is the person whom the personal data is about called?"
  ],
  "d5-51": [
    "A penetration tester is given only the company name and must find everything else independently. Which BEST describes this test?",
    "Which penetration testing approach gives the tester almost no information about the target in advance?"
  ],
  "d5-52": [
    "A penetration tester runs an Nmap scan against the target's public IP range to find open ports. Which BEST describes this activity?",
    "Directly probing a target's systems with a port scan is which kind of activity?"
  ],
  "d5-53": [
    "After compromising one system, a penetration tester uses it to attack other systems on an internal network that cannot be reached directly. What is this?",
    "Using a compromised host as a stepping stone to reach otherwise inaccessible internal systems is known as what?"
  ],
  "d5-54": [
    "The security program is reviewed by a company's own audit staff to confirm that controls are in place and working. Which BEST describes this?",
    "Which activity has an organization's own staff verify that security controls exist and function?"
  ],
  "d5-55": [
    "A penetration test evaluates the physical security of a data center, including attempts to bypass badge readers. Which type of test is this?",
    "Trying to get past badge readers and locks to assess a facility's defenses is which type of test?"
  ],
  "d5-56": [
    "An employee receives an email asking them to verify their credentials and notices the sender's domain is misspelled. According to awareness training, what should they do FIRST?",
    "A credential-verification email arrives from a misspelled domain. What is the correct first action under security awareness training?"
  ],
  "d5-57": [
    "A security team tracks the percentage of employees who report simulated phishing emails over time. What is this an example of?",
    "Monitoring the reporting rate of simulated phishing emails over time is an example of what?"
  ],
  "d5-58": [
    "Which TWO user behaviors should security awareness training teach employees to recognize as risky? (Select TWO).",
    "Which TWO behaviors should employees learn to identify as risky? (Select TWO)."
  ],
  "d5-59": [
    "An organization updates its security awareness training to cover threats such as deepfake voice calls impersonating executives. What does this demonstrate?",
    "Adding deepfake voice impersonation to the awareness curriculum shows which principle?"
  ],
  "p-0": [
    "Pair each security measure with the control type it BEST represents.",
    "For each security measure listed, choose the control type that fits it BEST."
  ],
  "p-1": [
    "A security engineer has several requirements to satisfy. Pair each requirement with the BEST cryptographic technique.",
    "Choose the most suitable cryptographic technique for each requirement below."
  ],
  "p-2": [
    "Sort each zero trust component into the plane in which it operates.",
    "For each zero trust component, indicate whether it operates in the control plane or the data plane."
  ],
  "p-3": [
    "A web administrator needs a publicly trusted TLS certificate for a new server. Arrange the steps in the proper sequence.",
    "Put the steps for obtaining a publicly trusted TLS certificate for a new web server in the correct order."
  ],
  "p-4": [
    "Arrange the following change management activities in the order in which they should occur.",
    "Put these change management activities into the correct sequence."
  ],
  "p-5": [
    "Review the certificate details in the exhibit for a public website. Users are seeing browser warnings. What is the MOST likely cause?",
    "A security analyst examines the certificate shown in the exhibit after users report browser warnings on a public site. Which is the MOST likely reason?"
  ],
  "p-6": [
    "Pair each scenario with the password attack it describes.",
    "For each scenario, name the password attack being carried out."
  ],
  "p-7": [
    "Pair each social engineering attempt with its name.",
    "Identify the social engineering technique used in each attempt."
  ],
  "p-8": [
    "Pair each observed behavior with the type of malware MOST likely responsible.",
    "For each behavior described, choose the malware type that MOST likely causes it."
  ],
  "p-9": [
    "Pair each vulnerability with the BEST mitigation.",
    "Select the most effective mitigation for each listed vulnerability."
  ],
  "p-10": [
    "A security analyst examines the web server log in the exhibit. Which attack was attempted?",
    "Based on the web server log in the exhibit, which attack is being attempted?"
  ],
  "p-11": [
    "Examine the authentication log in the exhibit. Which attack is MOST likely taking place?",
    "Based on the authentication log in the exhibit, which attack is MOST probably occurring?"
  ],
  "p-12": [
    "An analyst discovers the request in the exhibit in an application log. Which vulnerability was the attacker trying to exploit?",
    "The exhibit shows a request found in an application log. Which vulnerability is it attempting to exploit?"
  ],
  "p-13": [
    "A SOC analyst sees the endpoint event in the exhibit on a finance workstation. Which BEST describes this activity?",
    "The exhibit shows an event on a finance workstation. What does it MOST likely indicate?"
  ],
  "p-14": [
    "Pair each secure protocol with its default port.",
    "Select the default port number for each protocol listed."
  ],
  "p-15": [
    "SIMULATION: Configure the DMZ firewall to satisfy the requirements in the exhibit by setting each rule to ALLOW or DENY.",
    "SIMULATION: Using the requirements in the exhibit, decide whether each DMZ firewall rule should be ALLOW or DENY."
  ],
  "p-16": [
    "Pair each description with the correct resilience or backup term.",
    "For each description, choose the matching recovery site or backup term."
  ],
  "p-17": [
    "Determine the state of the data in each scenario.",
    "For each scenario, indicate whether the data is at rest, in transit, or in use."
  ],
  "p-18": [
    "Using the backup schedule in the exhibit, a server fails on Thursday at 3 p.m. Which backups are required to restore it to its most recent backed-up state?",
    "The exhibit shows a backup schedule. If a server fails Thursday at 3 p.m., which backups must be restored to reach the latest backed-up state?"
  ],
  "p-19": [
    "Arrange the phases of the incident response process in the correct order.",
    "Put the incident response phases into their proper sequence."
  ],
  "p-20": [
    "A forensic analyst is collecting evidence from a compromised running server. Arrange the sources in collection order according to the order of volatility.",
    "Order these evidence sources from most volatile to least volatile for collection from a live, compromised server."
  ],
  "p-21": [
    "Arrange the vulnerability management activities in the correct order.",
    "Put these vulnerability management steps into the proper sequence."
  ],
  "p-22": [
    "SIMULATION: Set up a new corporate wireless network in which employees authenticate with individual credentials and certificates, using the strongest options available.",
    "SIMULATION: Choose the settings for a corporate Wi-Fi network that uses per-user credentials and certificates with the strongest available options."
  ],
  "p-23": [
    "An analyst has several questions to answer during an investigation. Pair each question with the BEST data source.",
    "For each investigative question, choose the data source that answers it BEST."
  ],
  "p-24": [
    "Pair each access policy with the access control model it represents.",
    "Identify the access control model illustrated by each policy."
  ],
  "p-25": [
    "Name the authentication factor represented by each item.",
    "For each item, indicate which authentication factor it represents."
  ],
  "p-26": [
    "Pair each email security technology with its function.",
    "For each function described, select the email security technology that provides it."
  ],
  "p-27": [
    "Which finding in the vulnerability scan results shown in the exhibit should be remediated FIRST?",
    "Using the scan results in the exhibit, which vulnerability should be fixed first?"
  ],
  "p-28": [
    "A SIEM raises the alert shown in the exhibit. What should the analyst suspect?",
    "Based on the SIEM alert in the exhibit, which explanation should the analyst consider MOST likely?"
  ],
  "p-29": [
    "An analyst runs the command in the exhibit on a workstation suspected of compromise. What is the MOST likely explanation?",
    "The exhibit shows the output of a command run on a possibly compromised workstation. Which explanation is MOST likely?"
  ],
  "p-30": [
    "Pair each management decision with the risk response it represents.",
    "For each decision, identify the risk response it demonstrates."
  ],
  "p-31": [
    "Pair each need with the agreement that BEST addresses it.",
    "For each need, choose the agreement type that fits BEST."
  ],
  "p-32": [
    "Pair each responsibility with the correct data role.",
    "For each responsibility, choose the data role that holds it."
  ],
  "p-33": [
    "Pair each security exercise role with its responsibility.",
    "For each responsibility, identify the exercise team that performs it."
  ],
  "p-34": [
    "Using the data in the exhibit, calculate the annualized loss expectancy (ALE) for the customer database.",
    "What is the ALE for the customer database based on the figures in the exhibit?"
  ],
  "p-35": [
    "Using the risk matrix in the exhibit, which risk should be addressed FIRST?",
    "According to the risk matrix in the exhibit, which risk takes priority for treatment?"
  ],
  "h-0": [
    "In a zero trust architecture, the policy engine has approved a user's access to an internal application. Which component then creates the session-specific credential or token and tells the policy enforcement point to open the communication path?",
    "After a zero trust policy engine grants access to an internal app, which component issues the session credential or token and directs the policy enforcement point to allow the connection?"
  ],
  "h-1": [
    "A vendor posts firmware updates on a public website. Customers need to verify that an update was not altered and that it truly came from the vendor, without sharing any secret with the vendor. Which option BEST meets both needs?",
    "Customers must be able to confirm both the integrity and the origin of a firmware download from a vendor's public site, with no shared secrets. Which approach BEST achieves this?"
  ],
  "h-2": [
    "A company must send a 2 TB encrypted backup to a partner across an untrusted network and also deliver the encryption key securely. Which approach is MOST appropriate?",
    "A 2 TB backup is to be sent to a partner over an untrusted network, and the key must also reach them securely. Which method is the MOST appropriate?"
  ],
  "h-3": [
    "Which TWO of the following are designed to slow brute-force attacks on password hashes by using many iterations or an adjustable work factor? (Select TWO).",
    "Which TWO algorithms deliberately make password hashing slower through repeated iterations or a configurable cost? (Select TWO)."
  ],
  "h-4": [
    "Authentication logs show one or two failed logins on each of 4,000 accounts over several days, all with the password 'Winter2025!', and no account was locked out. Which attack does this MOST likely indicate?",
    "Over several days, a single password, 'Winter2025!', is tried once or twice against 4,000 different accounts, and nothing gets locked. Which attack is MOST likely?"
  ],
  "h-5": [
    "A web application accepts XML uploads. A penetration tester submits a document whose DOCTYPE defines an external entity pointing to file:///etc/passwd, and the file's contents appear in the response. Which vulnerability is demonstrated?",
    "An XML upload feature returns the contents of /etc/passwd after a tester includes an external entity referencing file:///etc/passwd in the DOCTYPE. Which vulnerability does this show?"
  ],
  "h-6": [
    "Which TWO controls on an access-layer switch BEST mitigate ARP spoofing by a compromised host? (Select TWO).",
    "To defend against ARP spoofing from a compromised host, which TWO access-layer switch features are MOST effective? (Select TWO)."
  ],
  "h-7": [
    "An EDR platform alerts that winword.exe launched powershell.exe, which injected code into explorer.exe and opened an outbound connection to an unknown host, yet a scan finds no malicious file on disk. What is the MOST likely explanation?",
    "winword.exe spawns powershell.exe, which injects into explorer.exe and calls out to an unknown host, but no malicious executable exists on disk. Which explanation is MOST likely?"
  ],
  "h-8": [
    "A SIEM shows a finance manager logging in from the corporate office and then, 12 minutes later, authenticating successfully from another country. Soon afterward a mailbox rule is created forwarding messages containing 'invoice' to an external address. What is MOST likely occurring?",
    "A finance manager's account signs in from the office, then from a foreign country 12 minutes afterward, and a rule is added to forward 'invoice' emails externally. Which is MOST likely happening?"
  ],
  "h-9": [
    "Review the web server log in the exhibit. Which control would be the MOST effective at eliminating the underlying vulnerability being exploited?",
    "Based on the web server log in the exhibit, which measure would MOST effectively remove the root vulnerability being attacked?"
  ],
  "h-10": [
    "Administrators on the 10.2.0.0/16 network cannot SSH to 10.1.1.5 even though rule 30 appears to permit it. Based on the exhibit, what is the MOST likely cause and fix?",
    "In the exhibit, rule 30 seems to allow SSH from 10.2.0.0/16 to 10.1.1.5, yet administrators are blocked. What is the MOST likely cause and remedy?"
  ],
  "h-11": [
    "A DevOps team adopts immutable infrastructure for its web tier. What is the PRIMARY security benefit?",
    "Which is the main security advantage of using immutable infrastructure for a web tier?"
  ],
  "h-12": [
    "Developers need a copy of the production customer database for testing. The data must keep realistic formats, such as valid-looking card and SSN patterns, but the original values must be impossible to recover. What should be used?",
    "A test copy of a production customer database must retain realistic-looking card and SSN formats while making recovery of the real values impossible. Which technique should be used?"
  ],
  "h-13": [
    "A business impact analysis sets an RPO of 15 minutes and an RTO of 4 hours for an order system. Which strategy is the MOST cost-effective way to meet both?",
    "An order system must lose no more than 15 minutes of data and be restored within 4 hours. Which is the MOST cost-effective strategy that satisfies both?"
  ],
  "h-14": [
    "A hospital places an in-line IPS in front of its patient-monitoring network, and leadership requires that a device failure never interrupt monitoring, even if protection is temporarily lost. How should the IPS be configured?",
    "To guarantee that an IPS failure never interrupts patient monitoring, even at the cost of temporary protection, how should the in-line device be set up?"
  ],
  "h-15": [
    "Which TWO of the following are functions of a cloud access security broker (CASB)? (Select TWO).",
    "A CASB offers which TWO of the following capabilities? (Select TWO)."
  ],
  "h-16": [
    "An analyst confirms a workstation is running ransomware that is actively encrypting a mapped network share, and the IR plan requires preserving volatile evidence. What is the BEST immediate action?",
    "Ransomware is encrypting a network share from a workstation, and volatile evidence must be preserved. Which action should be taken immediately?"
  ],
  "h-17": [
    "Which conclusion is BEST supported by the Windows security log excerpt in the exhibit?",
    "Based on the Windows security log excerpt in the exhibit, which conclusion is BEST supported?"
  ],
  "h-18": [
    "A SOC receives hundreds of daily alerts from a port-scan correlation rule, nearly all from the company's authorized vulnerability scanner. Which action BEST reduces alert fatigue without weakening detection of real reconnaissance?",
    "Almost every alert from a port-scan rule comes from the authorized vulnerability scanner. How can the SOC cut the noise without reducing detection of genuine reconnaissance?"
  ],
  "h-19": [
    "Developers need domain admin rights about once a quarter to deploy a release, and security wants per-request approval, automatic expiration, and session recording. Which option BEST meets these requirements?",
    "For quarterly release deployments requiring domain admin rights, the security team wants approvals, auto-expiring elevation, and recorded sessions. Which solution BEST fits?"
  ],
  "h-20": [
    "A mobile application will let users sign in through their corporate identity provider and must receive a signed JSON Web Token with the user's identity claims. Which protocol is designed for this?",
    "Which protocol lets an app authenticate users via their corporate identity provider and obtain a signed JWT containing identity claims?"
  ],
  "h-21": [
    "A vulnerability scan has two findings. Finding 1: CVSS 9.8 on an internal file server with no inbound access from outside the data center and no known exploit. Finding 2: CVSS 6.5 on an internet-facing web server being actively exploited in the wild. Which should be remediated FIRST?",
    "Which of these two vulnerabilities should be fixed first? Finding 1 is a CVSS 9.8 on an isolated internal file server with no known exploit; Finding 2 is a CVSS 6.5 on an internet-facing web server that attackers are actively exploiting."
  ],
  "h-22": [
    "Attackers send phishing emails whose visible From address is ceo@example.com, and the messages pass SPF because they come from a domain the attacker controls. Which measure would help the organization detect and block this spoofing of its visible From domain?",
    "Spoofed emails show ceo@example.com in the From line yet still pass SPF, since the attacker's own domain sends them. What would help detect and block this spoofing?"
  ],
  "h-23": [
    "A development team wants to uncover crashes and unexpected behavior in a running application by automatically sending it large volumes of malformed and random input. Which testing technique is this?",
    "Which technique automatically feeds a live application massive amounts of malformed and random data to expose crashes?"
  ],
  "h-24": [
    "A company will redeploy laptops with self-encrypting SSDs to other departments. The drives held regulated data and must be sanitized for reuse. What is the BEST method?",
    "Self-encrypting SSDs that held regulated data are being reused elsewhere in the company. Which sanitization method is BEST?"
  ],
  "h-25": [
    "An asset is valued at $200,000 with a 25% exposure factor and an ARO of 0.5. A proposed control costs $20,000 per year and would lower the ARO to 0.1. Which BEST describes the financial result of the control?",
    "With an asset value of $200,000, an exposure factor of 25%, and an ARO of 0.5, a $20,000-per-year control would reduce the ARO to 0.1. What is the financial outcome of adopting it?"
  ],
  "h-26": [
    "Which role carries final accountability for how a dataset is classified and for deciding who is granted access to it?",
    "Who has final accountability for a dataset's classification and for approving who may access it?"
  ],
  "h-27": [
    "Under GDPR, a data controller discovers a breach of EU residents' personal data that is likely to put individuals at risk. Within what timeframe must the controller notify the supervisory authority, where feasible?",
    "How soon must a GDPR data controller notify the supervisory authority of a breach likely to risk individuals' rights, where feasible?"
  ],
  "h-28": [
    "A penetration tester is given a valid low-privilege user account and a network diagram but no source code or administrative credentials. Which type of engagement is this?",
    "Which engagement type is it when a tester starts with a standard user login and a network diagram, but has no source code or admin credentials?"
  ],
  "l-0-0": [
    "A browser needs to check whether one specific server certificate has been revoked, without downloading a full list of revoked certificates. Which mechanism does this?",
    "Which mechanism lets a client query the revocation status of a single certificate instead of retrieving an entire revocation list?"
  ],
  "l-0-1": [
    "A web server's OCSP responder is slow, delaying page loads, and every lookup also tells the CA which sites users visit. Which configuration BEST fixes both problems?",
    "OCSP lookups slow down page loads and leak users' browsing destinations to the CA. Which configuration BEST resolves both issues?"
  ],
  "l-0-2": [
    "Some devices show a certificate warning for an internal site while others do not. The server sends only its own leaf certificate, and the affected devices have never visited another site issued by the same intermediate CA. What is the MOST likely cause and fix?",
    "An internal site triggers certificate warnings only on devices that have not previously seen its intermediate CA, and the server presents just its leaf certificate. Which cause and fix is MOST likely?"
  ],
  "l-0-3": [
    "An organization suspects the signing key of its internal intermediate CA has been compromised. Which TWO actions are MOST appropriate? (Select TWO).",
    "The private key of an internal intermediate CA may have been exposed. Which TWO responses are MOST appropriate? (Select TWO)."
  ],
  "l-1-0": [
    "Which provides integrity for a file but does NOT authenticate who created it?",
    "Which of the following verifies that a file has not changed but cannot show who produced it?"
  ],
  "l-1-1": [
    "Two internal services share a secret key and need to confirm that API messages were not altered and came from the other service, with minimal overhead. Which is MOST appropriate?",
    "Which method best verifies the integrity and origin of API messages between two services that already share a secret key, while keeping processing low?"
  ],
  "l-1-2": [
    "A design calls for one symmetric-key operation that keeps data confidential, makes tampering detectable, and authenticates the data. Which BEST meets this?",
    "Which cipher mode provides confidentiality, integrity, and authentication together in a single symmetric operation?"
  ],
  "l-1-3": [
    "A payment platform's auditors require that a sender cannot later deny creating a transaction, even if the receiver's systems are completely compromised. Which design BEST provides this?",
    "To ensure a sender can never credibly deny originating a transaction, even if the receiver is fully breached, which design is BEST?"
  ],
  "l-2-0": [
    "In zero trust architecture, which BEST describes the control plane?",
    "Which statement BEST defines the control plane in a zero trust architecture?"
  ],
  "l-2-1": [
    "A zero trust deployment varies how strongly a user must authenticate based on signals such as device posture, location, and behavior. Which concept is this?",
    "Adjusting authentication requirements dynamically from device health, location, and behavior is which zero trust concept?"
  ],
  "l-2-2": [
    "A user passed MFA at 09:00 on a managed laptop. At 09:30 the endpoint agent reports EDR was disabled and the user begins bulk-downloading files. Under zero trust principles, which response is BEST?",
    "Thirty minutes after a successful MFA login, EDR on the user's laptop is disabled and mass downloads begin. Which response aligns BEST with zero trust?"
  ],
  "l-2-3": [
    "Which TWO design choices BEST apply zero trust principles when granting a contractor access to one internal web application? (Select TWO).",
    "A contractor needs access to a single internal web app. Which TWO choices BEST reflect zero trust principles? (Select TWO)."
  ],
  "l-3-0": [
    "An attacker calls a help desk posing as a locked-out executive and pressures the agent to reset the account password right away. Which attack is this?",
    "Someone phones the help desk pretending to be an executive who cannot log in and pushes for an immediate password reset. What attack is this?"
  ],
  "l-3-1": [
    "The finance team gets an email from a lookalike domain that cites a real vendor and invoice number and asks them to send the next payment to 'updated' bank details. Which attack is this?",
    "A lookalike-domain email referencing a genuine vendor and invoice asks finance to pay to new bank details. Which attack does this describe?"
  ],
  "l-3-2": [
    "Users who type their bank's correct URL are sent to a fraudulent site because an attacker altered DNS resolution on the local network. No link was clicked. Which attack is this?",
    "Even with the correct address typed, users land on a fake bank site due to tampered local DNS resolution. Which attack is this?"
  ],
  "l-3-3": [
    "Attackers compromised a trade association website often visited by a defense contractor's employees and added a script that delivers malware only to visitors from the contractor. Which TWO controls would BEST reduce the attack's success? (Select TWO).",
    "A site frequently visited by a defense contractor's staff was altered to serve malware only to that contractor's visitors. Which TWO controls would MOST reduce its success? (Select TWO)."
  ],
  "l-4-0": [
    "A comment field accepts <script> tags, and the script runs in the browser of everyone who views the page. Which vulnerability is this?",
    "Scripts submitted in a comment field are saved and execute for every visitor who loads the page. Which vulnerability is this?"
  ],
  "l-4-1": [
    "A banking site relies only on session cookies for authentication. A malicious web page makes a logged-in user's browser submit a funds transfer to the bank. Which control BEST prevents this?",
    "Because a bank uses session cookies alone for authentication, a hostile page can trigger transfers from a logged-in user's browser. Which control BEST prevents this?"
  ],
  "l-4-2": [
    "A link-preview feature retrieves whatever URL a user supplies. An attacker submits http://169.254.169.254/latest/meta-data/ and gets cloud credentials back. Which vulnerability does this show, and which control BEST mitigates it?",
    "By entering http://169.254.169.254/latest/meta-data/ into a link-preview feature, an attacker retrieves cloud credentials. Which vulnerability is this, and what BEST mitigates it?"
  ],
  "l-4-3": [
    "A server deserializes an object taken from a cookie, and an attacker gets remote code execution by supplying a crafted serialized object. Which TWO mitigations are MOST effective? (Select TWO).",
    "Attackers achieve remote code execution through a crafted serialized object in a cookie that the server deserializes. Which TWO mitigations are MOST effective? (Select TWO)."
  ],
  "l-5-0": [
    "Malware that spreads between hosts without user interaction by exploiting a vulnerability in a network service is BEST described as which of the following?",
    "Which type of malware propagates on its own across hosts by exploiting a network service vulnerability, with no user action needed?"
  ],
  "l-5-1": [
    "After patching, a server still shows network connections and processes that Task Manager and installed tools cannot see, and booting from external media reveals a modified kernel driver. Which malware type is MOST likely present?",
    "A server hides connections and processes from its tools even after patching, and a modified kernel driver is found when booting from external media. Which malware is MOST likely?"
  ],
  "l-5-2": [
    "A script that deletes backups runs only when a specific administrator's account is disabled. Which TWO terms BEST describe this? (Select TWO).",
    "Backups are wiped by a script that triggers only when one administrator's account is disabled. Which TWO terms fit BEST? (Select TWO)."
  ],
  "l-5-3": [
    "Every hour a scheduled task runs PowerShell with an encoded command that pulls instructions from a reputable cloud storage service, and nothing new has been written to disk as a binary. Which TWO indicators BEST support living-off-the-land persistence? (Select TWO).",
    "No new binaries are on disk, but an hourly scheduled task runs encoded PowerShell that fetches instructions from a well-known cloud storage service. Which TWO indicators BEST suggest living-off-the-land persistence? (Select TWO)."
  ],
  "l-6-0": [
    "An attacker sends small DNS queries with the victim's spoofed source IP to many open resolvers, producing large responses aimed at the victim. Which attack is this?",
    "Spoofed small DNS requests to open resolvers cause large replies to flood a victim. Which attack is this?"
  ],
  "l-6-1": [
    "Hosts on a LAN suddenly map the default gateway's IP address to a workstation's MAC address, and their traffic now passes through that workstation. Which attack is occurring?",
    "All hosts on the LAN now associate the gateway's IP with one workstation's MAC address and send traffic through it. Which attack is this?"
  ],
  "l-6-2": [
    "From an access port, an attacker transmits frames bearing two 802.1Q tags in order to reach a VLAN that is not their own. Which attack is this, and which mitigation is BEST?",
    "Frames carrying two stacked 802.1Q tags are sent from an access port to reach another VLAN. Identify the attack and the BEST mitigation."
  ],
  "l-6-3": [
    "A protocol used for authentication can be abused through replay attacks. Which TWO controls would BEST stop replay? (Select TWO).",
    "Which TWO controls would BEST stop replay attacks against an authentication protocol? (Select TWO)."
  ],
  "l-7-0": [
    "Which device examines HTTP traffic for SQL injection and cross-site scripting patterns ahead of the web servers?",
    "What inspects web requests for injection and XSS patterns before they reach the servers?"
  ],
  "l-7-1": [
    "Which BEST describes a stateful firewall's advantage over a stateless packet filter?",
    "What is the main advantage a stateful firewall has over a stateless packet filter?"
  ],
  "l-7-2": [
    "A company wants all outbound web traffic inspected, including TLS, with URL-category enforcement, malware blocking on downloads, and internal client addresses hidden from the internet. Which solution is BEST?",
    "Which solution inspects outbound web traffic including TLS, enforces URL categories, blocks malicious downloads, and masks internal addresses?"
  ],
  "l-7-3": [
    "A web application sits behind a reverse proxy. Which TWO design choices BEST stop a compromised web tier from reaching the database? (Select TWO).",
    "A web app sits behind a reverse proxy. Which TWO design choices BEST keep a web-tier compromise from reaching the database? (Select TWO)."
  ],
  "l-8-0": [
    "Under the shared responsibility model for IaaS, which is the customer's responsibility?",
    "In an IaaS deployment, which task belongs to the customer according to the shared responsibility model?"
  ],
  "l-8-1": [
    "A company uses a SaaS email platform. Which remains the customer's responsibility?",
    "With a SaaS email service, which responsibility stays with the customer?"
  ],
  "l-8-2": [
    "A company runs containers on a managed Kubernetes service. Which is the customer's responsibility?",
    "On a managed Kubernetes service, which task falls to the customer?"
  ],
  "l-8-3": [
    "Testers discover that the execution role of a serverless function can read every storage bucket in the account. Which TWO statements are correct? (Select TWO).",
    "A serverless function's execution role has read access to all storage buckets in the account. Which TWO statements are correct? (Select TWO)."
  ],
  "l-9-0": [
    "Which RAID level stripes data with distributed parity and tolerates the failure of one disk?",
    "Which RAID level combines striping and distributed parity so that a single disk can fail without data loss?"
  ],
  "l-9-1": [
    "A system owner says no more than one hour of data may be lost after an outage. Which metric defines this requirement?",
    "Which metric captures the requirement that at most one hour of data can be lost in an outage?"
  ],
  "l-9-2": [
    "Backup windows each night are short, and recovery may use only the last full backup plus one additional backup set. Which daily backup type BEST satisfies this?",
    "With short nightly backup windows and a restore limited to the last full backup plus one more set, which daily backup type fits BEST?"
  ],
  "l-9-3": [
    "A hospital's radiology system needs an RTO of 2 hours and an RPO of 5 minutes. Which TWO measures BEST achieve this? (Select TWO).",
    "To satisfy a 2-hour RTO and a 5-minute RPO for a radiology system, which TWO measures are BEST? (Select TWO)."
  ],
  "l-10-0": [
    "Which access control model lets the owner of an object decide who else may access it?",
    "In which access control model does the creator or owner of a resource control who else can use it?"
  ],
  "l-10-1": [
    "An organization wants access decisions to depend on department, device type, time of day, and data classification. Which model BEST supports this?",
    "Which access control model can evaluate attributes such as department, device type, time, and data classification when granting access?"
  ],
  "l-10-2": [
    "A user can authenticate to the domain but cannot get access to a file server, and domain controller logs show 'clock skew too great.' What is the MOST likely fix?",
    "Domain controller logs report 'clock skew too great' for a user who cannot reach a file server. Which fix is MOST likely?"
  ],
  "l-10-3": [
    "An organization sets up SAML federation with a SaaS application. Which TWO statements are correct? (Select TWO).",
    "Which TWO statements about SAML federation with a SaaS application are correct? (Select TWO)."
  ],
  "l-11-0": [
    "Which incident response phase involves isolating infected hosts from the network so the infection stops spreading?",
    "Isolating infected machines to prevent further spread belongs to which incident response phase?"
  ],
  "l-11-1": [
    "Under the order of volatility, which evidence is collected FIRST?",
    "Following the order of volatility, which evidence source should an investigator capture first?"
  ],
  "l-11-2": [
    "An analyst creates an image of a compromised server's disk. Which TWO actions BEST maintain the evidence's integrity and admissibility? (Select TWO).",
    "While imaging a compromised server's disk, which TWO actions BEST protect the evidence's integrity and admissibility? (Select TWO)."
  ],
  "l-11-3": [
    "A file server has confirmed ransomware, backups are available, legal wants evidence kept, and the business wants service back fast. Which sequence of actions is BEST?",
    "After confirming ransomware on a file server, the team must balance backups, legal evidence preservation, and fast restoration. Which sequence of actions is BEST?"
  ],
  "l-12-0": [
    "Which scan type provides the MOST accurate picture of missing patches on a host because it logs in to the host?",
    "To get the most accurate picture of a host's missing patches, which scan should be run?"
  ],
  "l-12-1": [
    "A scan shows nothing for a host, yet a penetration tester later exploits an unpatched service running on it. How should the scan result be classified?",
    "A clean scan result is contradicted when a tester exploits an unpatched service on the same host. How is the scan result classified?"
  ],
  "l-12-2": [
    "Which TWO factors should MOST increase a vulnerability's remediation priority? (Select TWO).",
    "Which TWO considerations should MOST raise the urgency of remediating a vulnerability? (Select TWO)."
  ],
  "l-12-3": [
    "The vendor has not released a patch, so a critical vulnerability must stay unpatched for 90 days. Which approach BEST fits risk management?",
    "No vendor patch will exist for 90 days for a critical vulnerability. Which approach is BEST from a risk management standpoint?"
  ],
  "l-13-0": [
    "Which information does NetFlow data supply?",
    "Which information does NetFlow supply?"
  ],
  "l-13-1": [
    "A SIEM ties together a foreign VPN login, a new membership in an administrators group, and a large outbound data transfer into a single alert. Which SIEM capability is this?",
    "Combining a VPN login from abroad, a new admin group membership, and a big outbound transfer into one alert demonstrates which SIEM capability?"
  ],
  "l-13-2": [
    "During an investigation, timestamps from several devices do not line up. Which action BEST prevents this problem?",
    "Log timestamps from different devices are inconsistent during an investigation. What would BEST prevent this?"
  ],
  "l-13-3": [
    "An organization needs to prove that logs were not changed after they were collected. Which TWO controls BEST support this? (Select TWO).",
    "To demonstrate that logs have not been tampered with since they were collected, which TWO controls are BEST? (Select TWO)."
  ],
  "l-14-0": [
    "Which component of IPsec supplies confidentiality for the traffic it protects?",
    "Which IPsec protocol encrypts the traffic it protects?"
  ],
  "l-14-1": [
    "A site-to-site VPN has to encrypt traffic and also conceal the original packet's IP header. Which configuration does this?",
    "Which IPsec configuration both encrypts data and conceals the original IP header?"
  ],
  "l-14-2": [
    "An IPsec tunnel finishes the first negotiation phase, but no traffic passes and the second phase fails with 'no proposal chosen.' What is the MOST likely cause?",
    "Phase 1 of an IPsec tunnel succeeds, yet phase 2 fails with 'no proposal chosen' and no traffic flows. Which cause is MOST likely?"
  ],
  "l-14-3": [
    "Which TWO configurations give a VPN perfect forward secrecy? (Select TWO).",
    "Which TWO setups give a VPN perfect forward secrecy? (Select TWO)."
  ],
  "l-15-0": [
    "A single incident would damage 40% of an asset worth $50,000. What is the single loss expectancy (SLE)?",
    "With an asset value of $50,000 and a 40% exposure factor, what is the SLE?"
  ],
  "l-15-1": [
    "An event with a single loss expectancy of $20,000 is expected to happen once every four years. What is the annualized loss expectancy (ALE)?",
    "If the SLE is $20,000 and the event occurs once every four years, what is the ALE?"
  ],
  "l-15-2": [
    "A company takes out a cyber insurance policy with a $50,000 deductible and also rolls out MFA to curb account takeovers. Which TWO risk responses are represented? (Select TWO).",
    "Purchasing cyber insurance and also rolling out MFA to cut account takeovers reflects which TWO risk responses? (Select TWO)."
  ],
  "l-15-3": [
    "A control lowers the annualized loss expectancy from $120,000 to $30,000. It costs $60,000 per year to run plus a $15,000 one-time purchase amortized over three years. Which statement is correct?",
    "A control cuts ALE from $120,000 to $30,000, with $60,000 yearly operating cost and a $15,000 purchase spread over three years. Which statement is correct?"
  ],
  "l-16-0": [
    "Which governance document lays down mandatory, specific technical requirements, such as AES-256 for data at rest?",
    "A document requires AES-256 for data at rest as a mandatory specific rule. What type of governance document is it?"
  ],
  "l-16-1": [
    "Which role, under privacy regulations, processes personal data on behalf of the data controller?",
    "Which role handles personal data for, and on the instructions of, the data controller?"
  ],
  "l-16-2": [
    "A US-based SaaS provider hosts data about EU residents. Which TWO obligations clearly apply under GDPR? (Select TWO).",
    "A US SaaS company holds personal data of EU residents. Which TWO GDPR obligations clearly apply? (Select TWO)."
  ],
  "l-16-3": [
    "A customer wants assurance that a vendor's security, availability, and confidentiality controls operated effectively over a six-month period. Which report BEST provides this?",
    "Which report best demonstrates that a vendor's security, availability, and confidentiality controls worked effectively across six months?"
  ],
  "l-17-0": [
    "Which provision in a contract lets a customer inspect a vendor's security controls?",
    "What clause in a vendor contract lets the customer inspect the vendor's security controls?"
  ],
  "l-17-1": [
    "Two organizations want to record shared goals and responsibilities for a joint project in a form that is generally not legally binding. Which document fits BEST?",
    "Which document captures the shared goals and responsibilities of two organizations on a joint project without being generally legally binding?"
  ],
  "l-17-2": [
    "A vendor's SOC 2 report includes a qualified opinion on access control. What is the customer's BEST course of action?",
    "The SOC 2 report from a vendor has a qualified opinion regarding access control. What should the customer do?"
  ],
  "l-17-3": [
    "A penetration test is scoped as unknown-environment. The rules of engagement allow social engineering of employees but prohibit denial of service against production. The team finds a SQL injection in production that could expose customer records. Which action is BEST?",
    "During an unknown-environment test whose rules of engagement permit social engineering but forbid denial of service on production, testers discover a SQL injection that could expose customer records. What is the BEST action?"
  ],
  "p-36": [
    "Sort each encryption algorithm from the study guide into symmetric or asymmetric.",
    "For every algorithm listed, choose whether it is symmetric or asymmetric."
  ]
}
