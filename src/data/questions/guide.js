// Questions adapted from the SY0-701 practice-exam study guide supplied by the user (three practice exams).
// Each keeps the original question's concept, correct answer and exam objective, but the wording is our own, with
// two further wordings (w) and a difficulty level (lv). id = the guide's question number (e.g. A6 = exam A, Q6).
export default [
 {
  "id": "A6",
  "d": 5,
  "o": "5.5",
  "lv": 4.6,
  "q": "An outside firm is engaged to learn as much as it can about an organization's servers and data, but it will not be given any access to the internal network and must rely on other sources. Which of the following BEST describes this activity?",
  "a": [
   "Vulnerability scanning",
   "Passive reconnaissance",
   "Supply chain analysis",
   "Regulatory audit"
  ],
  "c": 1,
  "e": "Passive reconnaissance gathers information from open sources such as social media, websites and business registries without interacting with the target's systems. A vulnerability scan probes systems directly (active), a supply chain analysis looks at suppliers, and a regulatory audit normally requires internal access.",
  "w": [
   "A consultant collects information about a company's systems from public sources only, with no access to its internal network. What is this called?",
   "Which approach involves gathering information about a target from outside sources without touching its internal systems?"
  ]
 },
 {
  "id": "A7",
  "d": 4,
  "o": "4.5",
  "lv": 5.2,
  "q": "A mail server receives a message that claims to come from a partner's domain, but the sending server is not on that domain's list of authorized senders. Which of the following determines what the receiving server should do with the message?",
  "a": [
   "SPF",
   "NAC",
   "DMARC",
   "DKIM"
  ],
  "c": 2,
  "e": "DMARC lets the owner of a domain publish a policy telling receivers what to do with messages that fail SPF or DKIM: accept them, send them to spam, or reject them. SPF is the list of authorized senders itself, DKIM signs messages, and NAC controls network access.",
  "w": [
   "An inbound email fails the sender-authorization check for its domain. Which mechanism tells the recipient whether to accept, quarantine or reject it?",
   "Which email security standard lets a domain owner state how receivers should handle messages that fail authentication checks?"
  ]
 },
 {
  "id": "A8",
  "d": 2,
  "o": "2.1",
  "lv": 3.4,
  "q": "Which type of threat actor is MOST likely to attack systems purely for direct financial gain?",
  "a": [
   "Organized crime",
   "Hacktivist",
   "Nation state",
   "Shadow IT"
  ],
  "c": 0,
  "e": "Organized crime groups attack for money, choosing targets and techniques that convert easily into cash. Hacktivists pursue causes, nation states pursue political or strategic goals, and shadow IT is unapproved technology rather than an attacker.",
  "w": [
   "Which threat actor is primarily motivated by money?",
   "A group runs ransomware and fraud schemes to make a profit. Which kind of threat actor is this?"
  ]
 },
 {
  "id": "A9",
  "d": 4,
  "o": "4.8",
  "lv": 4.4,
  "q": "After investigating a compromised server, an administrator concludes that the attacker got in through a known, unpatched operating system flaw. Which of the following BEST describes this determination?",
  "a": [
   "Root cause analysis",
   "E-discovery",
   "Risk appetite",
   "Data subject"
  ],
  "c": 0,
  "e": "A root cause analysis determines the fundamental reason an incident happened, here an unpatched vulnerability, so the organization can prevent a repeat. E-discovery gathers documents for legal matters, risk appetite is a governance concept, and a data subject is the person data is about.",
  "w": [
   "An investigation identifies an unpatched OS vulnerability as the reason a server was breached. What activity produced this finding?",
   "Which incident-response activity explains the underlying reason an attack succeeded?"
  ]
 },
 {
  "id": "A10",
  "d": 3,
  "o": "3.1",
  "lv": 4.0,
  "q": "A city is designing the network used to dispatch ambulances to emergency calls. Which consideration should take the highest priority?",
  "a": [
   "Integration costs",
   "Patch availability",
   "System availability",
   "Power usage"
  ],
  "c": 2,
  "e": "Emergency calls can be life-or-death, so the dispatch system must always be available. Cost, patching and power are real considerations but come second to availability for this kind of system.",
  "w": [
   "For an emergency medical dispatch network, which architectural factor matters MOST?",
   "Which of the following should be prioritized above all else in a system that dispatches emergency services?"
  ]
 },
 {
  "id": "A11",
  "d": 5,
  "o": "5.4",
  "lv": 4.8,
  "q": "Whenever the permissions on a database of private customer records change, an administrator automatically receives a text message. Which of the following describes this alert?",
  "a": [
   "Maintenance window",
   "Attestation and acknowledgment",
   "Automation",
   "External audit"
  ],
  "c": 2,
  "e": "Automated compliance monitoring checks configurations continuously and alerts on changes without anyone having to look, which is ideal for catching a change that takes the organization out of compliance. Attestation is a formal declaration, an external audit is periodic, and a maintenance window is a scheduled time for changes.",
  "w": [
   "A system sends an automatic notification when access rights on a sensitive database are modified. What compliance practice does this show?",
   "Which compliance-monitoring approach is demonstrated by an automatic alert on any change to database access rights?"
  ]
 },
 {
  "id": "A12",
  "d": 2,
  "o": "2.2",
  "lv": 4.7,
  "q": "A security administrator wants to stop employees from copying data out of the organization on USB storage drives. Which of the following is the BEST way to prevent this?",
  "a": [
   "An operating system security policy that blocks removable media",
   "Monitoring removable media use in host-based firewall logs",
   "Allowing only applications that do not use removable media",
   "A removable media block rule on the UTM appliance"
  ],
  "c": 0,
  "e": "An operating system policy can block removable storage entirely, so files cannot be written to a USB drive. Logs only record what happened, application allow lists do not stop file copies, and a network UTM never sees a locally attached drive.",
  "w": [
   "What is the most effective way to block data exfiltration through removable storage devices?",
   "Which control BEST prevents users from writing company files to external USB drives?"
  ]
 },
 {
  "id": "A13",
  "d": 3,
  "o": "3.3",
  "lv": 3.6,
  "q": "Every quarter a company prepares a standard set of reports for a government agency. Which of the following describes this data?",
  "a": [
   "Data in use",
   "Obfuscated",
   "Trade secret",
   "Regulated"
  ],
  "c": 3,
  "e": "Information created for government reporting is subject to laws about how it is handled and disclosed, which makes it regulated data. The other options describe a data state, a protection technique and proprietary business information.",
  "w": [
   "Data produced to meet government reporting requirements is BEST classified as which type?",
   "Which data type describes information whose handling is governed by laws, such as mandatory government reports?"
  ]
 },
 {
  "id": "A14",
  "d": 4,
  "o": "4.6",
  "lv": 7.2,
  "q": "After a review of breach-handling policies, the security team at an insurer must ensure that: access records from every device are kept and archived; any access outside normal working hours is reported immediately; data may only be accessed from inside the country; and all audit reports come from a single data source. Which THREE measures should be implemented? (Select THREE).",
  "a": [
   "Restrict logins by IP address and GPS location",
   "Consolidate all logs in a SIEM",
   "Enable time-of-day restrictions on the authentication server",
   "Require government-issued ID during onboarding",
   "Add password complexity for accounts that access data",
   "Archive the encryption keys of disabled accounts"
  ],
  "c": [
   0,
   1,
   2
  ],
  "e": "Location-based restrictions keep access inside the country; a SIEM collects logs from every device and produces reports from one source; time-of-day restrictions flag or block access outside working hours. Onboarding ID checks, password complexity and archived keys do not address these requirements.",
  "w": [
   "Which THREE controls meet requirements for archived access logs from all devices, after-hours access alerts, in-country access only, and reporting from one central source? (Select THREE).",
   "Given requirements for central log reporting, time-based alerts and geographic access limits, which THREE measures should the security team deploy? (Select THREE)."
  ]
 },
 {
  "id": "A15",
  "d": 4,
  "o": "4.9",
  "lv": 6.4,
  "q": "A firewall logs this entry: 'AV Gateway Alert 136.127.92.171 80 -> 10.16.10.14 60818 Gateway Anti-Virus Alert: XPACK.A_7854 (Trojan) blocked.' Which conclusion is supported by the log?",
  "a": [
   "The victim's IP address is 136.127.92.171",
   "A file download from a web server was blocked",
   "A botnet DDoS attack was blocked",
   "The Trojan was blocked but the file was allowed"
  ],
  "c": 1,
  "e": "Traffic from port 80 on the external server to a high, temporary port on an internal device is the server responding to a request: a download. The gateway antivirus recognized a Trojan in that download and blocked it. The internal address 10.16.10.14 is the one being protected, and nothing points to a DDoS.",
  "w": [
   "Interpret this firewall log line: traffic from 136.127.92.171 port 80 to 10.16.10.14 port 60818, Trojan blocked by gateway antivirus. What happened?",
   "Based on a gateway antivirus alert showing traffic from a remote port 80 to an internal high port with a Trojan blocked, which statement is correct?"
  ]
 },
 {
  "id": "A16",
  "d": 2,
  "o": "2.4",
  "lv": 5.0,
  "q": "While visiting a third-party website, a user's browser warns: 'Your connection is not private. NET::ERR_CERT_INVALID.' Which attack is the MOST likely cause?",
  "a": [
   "Brute force",
   "Denial of service",
   "On-path",
   "Deauthentication"
  ],
  "c": 2,
  "e": "An on-path attacker intercepting the connection cannot present a valid certificate for the real site, so the browser reports an invalid certificate. Brute force, DoS and deauthentication do not produce certificate errors.",
  "w": [
   "A browser reports an invalid certificate for a well-known site. Which attack MOST likely explains the warning?",
   "Which attack commonly produces a certificate error because the attacker cannot present the real site's certificate?"
  ]
 },
 {
  "id": "A17",
  "d": 4,
  "o": "4.6",
  "lv": 4.2,
  "q": "Which of the following is the BEST way to let users log in to a website with credentials they already have on a third-party site?",
  "a": [
   "Federation",
   "802.1X",
   "EAP",
   "SSO"
  ],
  "c": 0,
  "e": "Federation allows identities managed by one organization to be trusted by another, so users sign in with their existing third-party credentials. SSO is single sign-on within one environment, 802.1X is port-based network access control, and EAP is an authentication framework.",
  "w": [
   "A web application wants visitors to sign in with an account from another organization. Which approach enables this?",
   "Which technology allows a user authenticated by one organization to access another organization's service?"
  ]
 },
 {
  "id": "A18",
  "d": 5,
  "o": "5.2",
  "lv": 4.6,
  "q": "An administrator is drafting a contract that sets minimum uptime for a set of internet-facing firewalls and needs a figure for how often the firewall hardware is expected to fail between repairs. Which metric is this?",
  "a": [
   "MTBF",
   "RTO",
   "MTTR",
   "RPO"
  ],
  "c": 0,
  "e": "Mean time between failures predicts how long a repairable system runs between failures. MTTR is the average time to repair it, RTO is the target time to restore a service, and RPO is the acceptable amount of data loss.",
  "w": [
   "Which metric predicts how often a repairable device will fail?",
   "A contract needs the expected interval between hardware failures of a firewall. What is that measure called?"
  ]
 },
 {
  "id": "A19",
  "d": 2,
  "o": "2.2",
  "lv": 3.5,
  "q": "A caller tells the help desk that they are the director of manufacturing, that they have forgotten their password, and that they need it reset immediately for an important meeting. Which type of attack does this BEST describe?",
  "a": [
   "Social engineering",
   "Supply chain",
   "Watering hole",
   "On-path"
  ],
  "c": 0,
  "e": "This is social engineering: the attacker impersonates someone with authority and creates urgency to persuade staff to bypass normal procedures. The other options involve suppliers, compromised websites or intercepted traffic.",
  "w": [
   "Someone impersonates a senior manager on the phone to pressure the help desk into an urgent password reset. What kind of attack is this?",
   "An attacker uses authority and urgency in a phone call to get a password reset. Which attack category fits?"
  ]
 },
 {
  "id": "A20",
  "d": 5,
  "o": "5.3",
  "lv": 4.9,
  "q": "Two companies that have worked together for several months want to formalize their partnership with a broad agreement covering shared goals. Which agreement fits BEST?",
  "a": [
   "SLA",
   "SOW",
   "MOA",
   "NDA"
  ],
  "c": 2,
  "e": "A memorandum of agreement (MOA) formally records broad goals and responsibilities between partners. An SLA sets service levels, a SOW defines specific work, and an NDA protects confidential information.",
  "w": [
   "Which document formally records a broad set of shared objectives between two partner organizations?",
   "Partners want a formal but general agreement on the goals of their relationship. Which agreement should they sign?"
  ]
 },
 {
  "id": "A21",
  "d": 1,
  "o": "1.2",
  "lv": 4.3,
  "q": "A company automatically adds a digital signature to every outgoing email. Which security goal does this PRIMARILY support?",
  "a": [
   "Confidentiality",
   "Integrity",
   "Authentication",
   "Availability"
  ],
  "c": 1,
  "e": "A digital signature lets the recipient confirm that the message has not changed since it was signed, which is integrity. Signatures also help prove the sender, but they do not encrypt the content (confidentiality) or affect availability.",
  "w": [
   "What does a digital signature on each outgoing message mainly provide to recipients?",
   "Why would an organization digitally sign all of its outbound email?"
  ]
 },
 {
  "id": "A22",
  "d": 2,
  "o": "2.3",
  "lv": 6.3,
  "q": "A time-clock appliance is set to repair its file system and reboot whenever a file system error is found. On one unit the error happens during startup, so the device reboots before the repair can finish and loops endlessly. Which of the following BEST describes this problem?",
  "a": [
   "Memory injection",
   "Resource consumption",
   "Race condition",
   "Malicious update"
  ],
  "c": 2,
  "e": "A race condition occurs when the outcome depends on the timing of two events. Here the reboot happens before the fix can complete, producing an endless loop. Nothing points to injected code, exhausted resources or a malicious update.",
  "w": [
   "A device keeps rebooting because its recovery step runs before a startup error can be fixed. What type of flaw is this?",
   "Two operations happen in the wrong order during boot, causing a constant reboot loop. Which vulnerability type describes it?"
  ]
 },
 {
  "id": "A23",
  "d": 4,
  "o": "4.6",
  "lv": 5.0,
  "q": "An audit finds that password policy places no limit on failed login attempts and never requires users to change their passwords. Which TWO settings would fix these issues? (Select TWO).",
  "a": [
   "Password complexity",
   "Password expiration",
   "Password reuse",
   "Account lockout",
   "Password managers"
  ],
  "c": [
   1,
   3
  ],
  "e": "Password expiration forces a change after a set period, and account lockout disables an account after a number of failed attempts. Complexity, reuse history and password managers do not address either finding.",
  "w": [
   "Which TWO password policy settings address unlimited login attempts and passwords that never change? (Select TWO).",
   "To limit guessing and force periodic password changes, which TWO controls should be enabled? (Select TWO)."
  ]
 },
 {
  "id": "A24",
  "d": 1,
  "o": "1.1",
  "lv": 3.7,
  "q": "A login banner warns that unauthorized use is prohibited and monitored. Which type of security control is this?",
  "a": [
   "Preventive",
   "Deterrent",
   "Corrective",
   "Detective",
   "Compensating",
   "Directive"
  ],
  "c": 1,
  "e": "A login banner does not technically stop anyone, but it discourages misuse, which makes it a deterrent control.",
  "w": [
   "What control type does a warning banner displayed at login represent?",
   "A message at sign-in states that misuse will be prosecuted. Which kind of control is it?"
  ]
 },
 {
  "id": "A25",
  "d": 4,
  "o": "4.3",
  "lv": 5.6,
  "q": "An audit finds four servers that have not been patched in over a year, and testing and deploying the patches will take two weeks. What is the BEST way to reduce the risk in the meantime?",
  "a": [
   "Purchase cybersecurity insurance",
   "Grant an exception for all data center services",
   "Move the servers to a protected network segment",
   "Hire a third party for an extensive audit"
  ],
  "c": 2,
  "e": "Placing the servers on a protected segment adds controls around them while keeping them running until patching is done. Insurance transfers financial loss but does not reduce exposure, a blanket exception accepts the risk, and an audit does not protect anything.",
  "w": [
   "Patching some outdated servers will take two weeks. Which interim step BEST lowers their exposure?",
   "Which temporary measure protects unpatched servers while updates are tested and deployed?"
  ]
 },
 {
  "id": "A26",
  "d": 3,
  "o": "3.4",
  "lv": 4.5,
  "q": "A business manager is documenting how orders will be processed if the primary internet connection fails. What do these steps BEST describe?",
  "a": [
   "Platform diversity",
   "Continuity of operations",
   "Cold site recovery",
   "Tabletop exercise"
  ],
  "c": 1,
  "e": "Continuity of operations planning defines how essential work continues during a disruption, such as an internet outage. Platform diversity, a cold site and a tabletop exercise are different resilience concepts.",
  "w": [
   "Which planning activity defines how a business keeps operating, such as processing orders, during an outage?",
   "A department writes alternate procedures to keep working when its internet link is down. What is this called?"
  ]
 },
 {
  "id": "A27",
  "d": 1,
  "o": "1.2",
  "lv": 4.0,
  "q": "A company wants every person entering its data center building to have their credentials checked individually. Which control BEST supports this?",
  "a": [
   "Access control vestibule",
   "Video surveillance",
   "Pressure sensors",
   "Bollards"
  ],
  "c": 0,
  "e": "An access control vestibule controls the flow of people so each can be checked before the inner door opens. Cameras and sensors only detect, and bollards stop vehicles.",
  "w": [
   "Which physical control forces each person to be verified before entering a secure area?",
   "To evaluate the credentials of everyone entering a data center one at a time, what should be installed?"
  ]
 },
 {
  "id": "A28",
  "d": 1,
  "o": "1.4",
  "lv": 4.9,
  "q": "A company encrypts sensitive employee fields in its database while leaving public details such as names and job titles in plaintext. Which encryption approach is this?",
  "a": [
   "Full-disk",
   "Record (field-level)",
   "Asymmetric",
   "Key escrow"
  ],
  "c": 1,
  "e": "Record- or field-level encryption protects individual columns in a database, leaving other data in plaintext. Full-disk encryption covers the whole drive, asymmetric describes a key type, and key escrow is key storage by a third party.",
  "w": [
   "Only some columns of an employee database are encrypted; the rest are plaintext. What kind of encryption is used?",
   "Which encryption strategy protects selected fields in a database without encrypting everything?"
  ]
 },
 {
  "id": "A29",
  "d": 3,
  "o": "3.4",
  "lv": 5.0,
  "q": "A company wants to reduce the chance of database corruption if a server suddenly loses power. Which strategy is BEST?",
  "a": [
   "Encryption",
   "Off-site backups",
   "Journaling",
   "Replication"
  ],
  "c": 2,
  "e": "Journaling writes each change to a journal before committing it, so after a power loss the database can replay or discard incomplete transactions. Backups restore older data, replication copies data elsewhere, and encryption protects confidentiality.",
  "w": [
   "Which technique lets a database recover its last transactions cleanly after a power failure?",
   "To protect a database against corruption from sudden power loss, what should be enabled?"
  ]
 },
 {
  "id": "A30",
  "d": 4,
  "o": "4.1",
  "lv": 4.7,
  "q": "A new corporate mobile policy requires that devices lock automatically after a period of inactivity, that each device's location can be tracked, and that personal data is kept separate from company data. Which of the following is the BEST way to enforce these rules?",
  "a": [
   "Segmentation",
   "Biometrics",
   "COPE",
   "MDM"
  ],
  "c": 3,
  "e": "Mobile device management applies policies such as auto-lock, location tracking and work/personal containerization from a central console. COPE is a device ownership model, and segmentation and biometrics address only part of the requirement.",
  "w": [
   "Which tool centrally enforces auto-lock, device location tracking and separation of personal and work data on company phones?",
   "How should an organization apply screen-lock, location and data-separation policies to all of its mobile devices?"
  ]
 },
 {
  "id": "A31",
  "d": 4,
  "o": "4.3",
  "lv": 5.3,
  "q": "A monthly vulnerability scan reports no issues on the Windows servers, even though a serious vulnerability affecting them was announced last week and none have been patched. Which of the following describes this result?",
  "a": [
   "Exploit",
   "Compensating controls",
   "Zero-day attack",
   "False negative"
  ],
  "c": 3,
  "e": "A false negative is a result that misses a problem that really exists, typically because the scanner's signatures have not been updated. Nothing indicates an exploit or an attack, and compensating controls are unrelated.",
  "w": [
   "A scan misses a known, unpatched vulnerability on servers. How is that scan result classified?",
   "Servers are vulnerable to a newly announced flaw, but the scan shows them as clean. What is this called?"
  ]
 },
 {
  "id": "A32",
  "d": 4,
  "o": "4.7",
  "lv": 4.6,
  "q": "An IT help desk is using automation to speed up its response to security events. Which use case does this describe?",
  "a": [
   "Escalation",
   "Guard rails",
   "Continuous integration",
   "Resource provisioning"
  ],
  "c": 0,
  "e": "Automated escalation recognizes a security event and passes the ticket to the right team without waiting for a person. Guard rails prevent misconfiguration, continuous integration is for code, and provisioning creates resources.",
  "w": [
   "Automation that routes a security ticket straight to the incident response team is an example of which use case?",
   "Which automation use case helps a help desk respond faster to security events?"
  ]
 },
 {
  "id": "A33",
  "d": 3,
  "o": "3.2",
  "lv": 4.7,
  "q": "A network administrator wants every user to sign in to the corporate wireless network with their own company username and password. What should be configured on the access points?",
  "a": [
   "WPA3",
   "802.1X",
   "PSK",
   "MFA"
  ],
  "c": 1,
  "e": "802.1X sends wireless authentication to a central server such as RADIUS, so each user signs in with their own corporate credentials. A pre-shared key is one shared password, WPA3 is the encryption protocol, and MFA alone does not define how the access point authenticates.",
  "w": [
   "Which technology lets wireless users authenticate with individual corporate credentials through a central server?",
   "To replace a shared Wi-Fi key with per-user corporate logins, what should the access points use?"
  ]
 },
 {
  "id": "A34",
  "d": 2,
  "o": "2.5",
  "lv": 5.4,
  "q": "A company's VPN checks each device's configuration during login and offers remediation if it is out of date. Which mitigation technique is this?",
  "a": [
   "Encryption",
   "Decommissioning",
   "Least privilege",
   "Configuration enforcement"
  ],
  "c": 3,
  "e": "A posture assessment checks patches, settings and software against a standard before allowing access, which enforces configuration requirements. It is not encryption, decommissioning or a privilege control.",
  "w": [
   "A posture assessment at VPN login is an example of which mitigation technique?",
   "Which technique is applied when a VPN checks that a device meets configuration standards before allowing access?"
  ]
 },
 {
  "id": "A35",
  "d": 4,
  "o": "4.6",
  "lv": 4.0,
  "q": "A user sets permissions on a file in their network folder and grants read-only access to three colleagues. Which access control model is this?",
  "a": [
   "Discretionary",
   "Mandatory",
   "Attribute-based",
   "Role-based"
  ],
  "c": 0,
  "e": "Under discretionary access control, the owner of a resource decides who can access it. Mandatory uses labels and clearances, attribute-based uses policies over attributes, and role-based uses job roles.",
  "w": [
   "When the owner of a file decides who else can read it, which access control model is in use?",
   "Which model lets resource owners grant access to others at their own discretion?"
  ]
 },
 {
  "id": "A36",
  "d": 2,
  "o": "2.2",
  "lv": 3.4,
  "q": "A remote employee receives a text message with a link asking them to log in and confirm their upcoming work schedule. Which attack is this?",
  "a": [
   "Brute force",
   "Watering hole",
   "Typosquatting",
   "Smishing"
  ],
  "c": 3,
  "e": "Smishing is phishing delivered by SMS or text message. A watering hole compromises a site the target visits, typosquatting uses lookalike domains, and brute force guesses passwords.",
  "w": [
   "A phishing attempt delivered through SMS is called what?",
   "Which social engineering attack uses text messages to lure victims to a login page?"
  ]
 },
 {
  "id": "A37",
  "d": 5,
  "o": "5.1",
  "lv": 4.4,
  "q": "A company is formalizing the process its developers follow to design, test and deploy applications. Which policy applies?",
  "a": [
   "Business continuity",
   "Acceptable use",
   "Incident response",
   "Software development lifecycle"
  ],
  "c": 3,
  "e": "A software development lifecycle policy defines how applications are designed, developed, tested, deployed and maintained. The other policies cover continuity, acceptable use of resources, and incident handling.",
  "w": [
   "Which policy governs how software is designed, built, tested, deployed and maintained?",
   "A formal policy for the stages of application development is known as what?"
  ]
 },
 {
  "id": "A38",
  "d": 4,
  "o": "4.8",
  "lv": 4.8,
  "q": "An administrator copies a suspected malware executable from a user's PC and runs it in a sandbox to see what it does. Which part of the incident response process is this?",
  "a": [
   "Eradication",
   "Preparation",
   "Recovery",
   "Containment"
  ],
  "c": 3,
  "e": "Isolating the malware in a sandbox is containment: it cannot spread while it is analyzed. Eradication removes it, recovery restores systems, and preparation happens before an incident.",
  "w": [
   "Running suspected malware in an isolated sandbox so it cannot spread belongs to which IR phase?",
   "Which incident-response phase includes isolating a malicious file for safe analysis?"
  ]
 },
 {
  "id": "A39",
  "d": 2,
  "o": "2.4",
  "lv": 5.0,
  "q": "A bank's website traffic has dropped, and investigation shows customers are being sent to an IP address that is not the bank's web server. Which attack is MOST likely?",
  "a": [
   "Deauthentication",
   "DDoS",
   "Buffer overflow",
   "DNS poisoning"
  ],
  "c": 3,
  "e": "DNS poisoning changes the address returned during name resolution, sending clients to whatever IP the attacker chooses. A DDoS would make the site unavailable, not redirect it.",
  "w": [
   "Users who type a bank's correct name end up at the wrong IP address. Which attack explains this?",
   "Which attack alters name resolution so that clients are directed to an attacker's server?"
  ]
 },
 {
  "id": "A40",
  "d": 3,
  "o": "3.1",
  "lv": 5.8,
  "q": "Which concern is MOST commonly associated with a hybrid cloud model?",
  "a": [
   "Microservice outages",
   "IoT support",
   "Inconsistent security controls between environments",
   "Container backups"
  ],
  "c": 2,
  "e": "A hybrid cloud spans several providers or a private and public cloud, so authentication, permissions and network protections are easily configured differently in each. The other options are not specific to hybrid designs.",
  "w": [
   "A company mixes private and public clouds. Which security challenge is most typical?",
   "What risk is most characteristic of running workloads across several different cloud environments?"
  ]
 },
 {
  "id": "A41",
  "d": 5,
  "o": "5.1",
  "lv": 5.2,
  "q": "A company employs many seasonal workers whose access should be disabled when they leave. The security administrator wants to confirm that no former employee can still get in. What is the BEST way to verify this?",
  "a": [
   "Confirm that no unauthorized accounts have administrator access",
   "Validate the account lockout policy",
   "Validate the offboarding process by comparing active accounts with current staff",
   "Report on all authentications for a 24-hour period"
  ],
  "c": 2,
  "e": "Disabling accounts is part of offboarding; auditing active accounts against the current employee list confirms it is working. The other options check admin rights, lockout, or one day of logins, which would not prove that departed staff are disabled.",
  "w": [
   "How can a company confirm that departed seasonal staff no longer have working accounts?",
   "Which activity BEST verifies that former employees' access has been removed?"
  ]
 },
 {
  "id": "A42",
  "d": 5,
  "o": "5.2",
  "lv": 4.3,
  "q": "Which term describes how willing an organization is to accept risk in pursuit of its goals?",
  "a": [
   "Risk appetite",
   "Risk register",
   "Risk transfer",
   "Risk reporting"
  ],
  "c": 0,
  "e": "Risk appetite describes how much risk an organization is willing to accept, from conservative to expansionary. A risk register lists risks, transfer shifts them to another party, and reporting communicates them.",
  "w": [
   "What is the name for the broad level of risk an organization is prepared to take?",
   "An organization describes itself as conservative about taking risks. Which concept is this?"
  ]
 },
 {
  "id": "A43",
  "d": 1,
  "o": "1.3",
  "lv": 4.9,
  "q": "During a maintenance window, a technician patches the first of fifty web servers and reboots it, and the web service fails with a critical error. What should the technician do NEXT?",
  "a": [
   "Contact stakeholders about the outage",
   "Follow the backout plan",
   "Test the upgrade in the lab",
   "Review the change's impact analysis"
  ],
  "c": 1,
  "e": "The backout plan exists for exactly this case: it explains how to return to the previous working state when a change fails. Notifications and analysis come later; testing in the lab should have happened before the window.",
  "w": [
   "The first server patched in a change window fails afterwards. What is the correct next step?",
   "A patch breaks the web service on the first server of a planned rollout. Which action comes next?"
  ]
 },
 {
  "id": "A44",
  "d": 2,
  "o": "2.4",
  "lv": 5.0,
  "q": "An attacker finds that specially crafted packets sent from many remote systems crash a server's operating system, which then has to be rebooted. Which attack is this?",
  "a": [
   "Privilege escalation",
   "SQL injection",
   "Replay attack",
   "DDoS"
  ],
  "c": 3,
  "e": "A distributed denial of service uses many sources to make a service unavailable, whether by flooding it or, as here, crashing it. Nothing here involves gaining privileges, injecting SQL or replaying captured data.",
  "w": [
   "Crafted packets from many sources repeatedly crash a server. Which attack type is this?",
   "Which attack disables a service using traffic from multiple remote devices?"
  ]
 },
 {
  "id": "A45",
  "d": 4,
  "o": "4.8",
  "lv": 4.2,
  "q": "After a data breach at an insurance company, an administrator is building new servers and security systems to bring the financial systems back online. Which incident response phase is this?",
  "a": [
   "Lessons learned",
   "Containment",
   "Recovery",
   "Analysis"
  ],
  "c": 2,
  "e": "Recovery returns systems to normal operation, which can take a phased approach over weeks or months. Containment limits spread, analysis investigates, and lessons learned reviews the incident afterwards.",
  "w": [
   "Rebuilding systems and returning them to service after a breach is part of which phase?",
   "Which incident-response phase involves restoring affected systems to normal operation?"
  ]
 },
 {
  "id": "A46",
  "d": 2,
  "o": "2.3",
  "lv": 4.8,
  "q": "Within a day of new wireless access points being installed for an application launch, attackers used the wireless network to reach private company data. What is the MOST likely cause?",
  "a": [
   "Race condition",
   "Jailbreaking",
   "Impersonation",
   "Misconfiguration"
  ],
  "c": 3,
  "e": "Access points have many settings, and a single wrong one (weak security mode, default credentials, an open network) can expose the internal network. Race conditions and jailbreaking are unrelated, and impersonation is an attack technique rather than the underlying weakness.",
  "w": [
   "New access points led to a breach within 24 hours. Which weakness is most likely to blame?",
   "Which vulnerability most commonly explains a wireless breach right after new access points are deployed?"
  ]
 },
 {
  "id": "A47",
  "d": 2,
  "o": "2.3",
  "lv": 4.4,
  "q": "A serious vulnerability is found in an internet-facing firewall. The vendor no longer sells the model and will not release a patch. Which of the following BEST describes this situation?",
  "a": [
   "End-of-life",
   "Improper input handling",
   "Improper key management",
   "Incompatible OS"
  ],
  "c": 0,
  "e": "A product that the vendor no longer supports or patches is end-of-life, leaving any newly found flaw permanently unfixed. The other options describe specific coding or configuration weaknesses.",
  "w": [
   "The vendor has stopped supporting a firewall and will not fix a known flaw. What is this vulnerability called?",
   "Which term describes a product the manufacturer no longer updates or supports?"
  ]
 },
 {
  "id": "A48",
  "d": 3,
  "o": "3.4",
  "lv": 4.1,
  "q": "At an annual meeting, IT and senior directors are presented with a simulated disaster and talk through the logistics and processes needed to recover. Which of the following BEST describes this exercise?",
  "a": [
   "Capacity planning",
   "Business impact analysis",
   "Continuity of operations",
   "Tabletop exercise"
  ],
  "c": 3,
  "e": "A tabletop exercise is a discussion-based walkthrough of a simulated incident, testing plans without a full-scale drill. The other options are planning activities, not exercises.",
  "w": [
   "A team discusses how it would respond to a hypothetical disaster without touching any systems. What is this?",
   "Which disaster recovery exercise walks participants through a simulated event in discussion only?"
  ]
 },
 {
  "id": "A49",
  "d": 4,
  "o": "4.5",
  "lv": 4.4,
  "q": "A security administrator needs to stop users from visiting websites that host malware. Which of the following is the BEST way to control this?",
  "a": [
   "Honeynet",
   "Data masking",
   "DNS filtering",
   "Data loss prevention"
  ],
  "c": 2,
  "e": "DNS filtering checks requested names against a list of known malicious sites and returns no valid address, so the browser cannot reach them. A honeynet attracts attackers, data masking hides data, and DLP stops data leaving.",
  "w": [
   "Which control prevents users from reaching known malicious websites by refusing to resolve their names?",
   "What is the most effective way to block access to sites known to distribute malware?"
  ]
 },
 {
  "id": "A50",
  "d": 4,
  "o": "4.8",
  "lv": 4.3,
  "q": "After a malware infection, an administrator re-images a computer's operating system to a known-good version. Which incident response step is this?",
  "a": [
   "Lessons learned",
   "Recovery",
   "Detection",
   "Containment"
  ],
  "c": 1,
  "e": "Recovery returns systems and data to their state before the incident; with malware that often means wiping and reinstalling from a known-good image. Containment would isolate the system, and detection finds the problem.",
  "w": [
   "Reinstalling a clean operating system image after malware is part of which IR phase?",
   "Which phase returns an infected system to its pre-incident state, for example by restoring a known-good image?"
  ]
 },
 {
  "id": "A51",
  "d": 4,
  "o": "4.1",
  "lv": 4.6,
  "q": "A company moves its SCADA system onto a segmented network with tightly limited access from the corporate network. Which of the following describes this?",
  "a": [
   "Load balancing",
   "Least privilege",
   "Data retention",
   "Hardening"
  ],
  "c": 3,
  "e": "Hardening reduces a system's attack surface; for SCADA that commonly means segmentation, firewall rules and access control lists. Least privilege concerns user rights, and the other options are unrelated.",
  "w": [
   "Isolating an industrial control system behind restricted network access is an example of what?",
   "Which security practice includes segmenting a SCADA network and limiting who can reach it?"
  ]
 },
 {
  "id": "A52",
  "d": 4,
  "o": "4.9",
  "lv": 5.2,
  "q": "An administrator sees repeated 'Failed password for root from 10.101.88.230' entries on a web server, followed by '445 more authentication failures; rhost=10.101.88.230 user=root'. Which attack is this?",
  "a": [
   "Password spraying",
   "Downgrade",
   "Brute force",
   "DDoS"
  ],
  "c": 2,
  "e": "Hundreds of attempts against one account from one source are a brute force attack. Spraying tries a few passwords against many accounts, a downgrade attack weakens encryption, and a DDoS aims at availability.",
  "w": [
   "Hundreds of failed root logins from one address in seconds indicate which attack?",
   "A log shows one source attempting the root password hundreds of times. What is happening?"
  ]
 },
 {
  "id": "A53",
  "d": 2,
  "o": "2.5",
  "lv": 5.0,
  "q": "When a user logs in one morning, their laptop is moved to a private VLAN and missing updates are installed automatically before it is allowed back. Which process is this?",
  "a": [
   "Account lockout",
   "Configuration enforcement",
   "Decommissioning",
   "Sideloading"
  ],
  "c": 1,
  "e": "A posture assessment at login checks that required security settings are in place; failing devices are quarantined and remediated, which enforces the configuration standard. Lockout, decommissioning and sideloading are unrelated.",
  "w": [
   "A device that fails a login posture check is quarantined and patched. Which mitigation does this demonstrate?",
   "Which technique places non-compliant devices in a quarantine network until they meet configuration standards?"
  ]
 },
 {
  "id": "A54",
  "d": 4,
  "o": "4.6",
  "lv": 4.4,
  "q": "Which of the following is an example of two-factor authentication?",
  "a": [
   "A printer that asks for a password and a PIN",
   "A building door that requires a fingerprint scan",
   "An application that requires a pseudo-random code",
   "A Windows domain that requires a password and a smart card"
  ],
  "c": 3,
  "e": "A password (something you know) plus a smart card (something you have) are two different factors. A password and PIN are both something you know, and the fingerprint or code alone are single factors.",
  "w": [
   "Which login combines two different authentication factors?",
   "Select the option that uses two distinct categories of authentication factor."
  ]
 },
 {
  "id": "A55",
  "d": 4,
  "o": "4.1",
  "lv": 5.2,
  "q": "A company rolling out a field application finds that it cannot manage employees' devices, that staff use many different types of phone, and that the same device must serve both work and personal use. Which deployment model addresses these issues?",
  "a": [
   "CYOD",
   "SSO",
   "COPE",
   "BYOD"
  ],
  "c": 2,
  "e": "With corporate-owned, personally enabled (COPE) devices, the company buys and manages standard devices that employees may also use personally. BYOD keeps the variety and lack of control, CYOD only lets users choose from a list, and SSO is an authentication method.",
  "w": [
   "Which mobile deployment model gives the company standardized, managed devices that employees may also use personally?",
   "To standardize field devices while allowing personal use on them, which model should be chosen?"
  ]
 },
 {
  "id": "A56",
  "d": 1,
  "o": "1.1",
  "lv": 4.6,
  "q": "An organization installs a UPS in its new data center. According to common control-type definitions, which type of control is this?",
  "a": [
   "Compensating",
   "Directive",
   "Deterrent",
   "Detective"
  ],
  "c": 0,
  "e": "A UPS does not stop a power outage; it supplies alternative power when one happens, compensating for the loss of utility power. It does not direct behavior, deter anyone or detect anything.",
  "w": [
   "A UPS does not prevent a power outage but keeps systems running through one. Which control type does it represent?",
   "Which control type BEST describes an uninterruptible power supply?"
  ]
 },
 {
  "id": "A57",
  "d": 1,
  "o": "1.4",
  "lv": 4.7,
  "q": "A manufacturer wants a tamper-evident record of each part's progress along the assembly line. Which technology fits BEST?",
  "a": [
   "Secure enclave",
   "Blockchain",
   "Hashing",
   "Asymmetric encryption"
  ],
  "c": 1,
  "e": "A blockchain's distributed ledger records transactions in a way that is very hard to alter, which suits tracking components, media or other assets. Hashing and encryption are building blocks, and a secure enclave protects data on a device.",
  "w": [
   "Which technology provides a shared, hard-to-alter ledger suitable for tracking components?",
   "To keep a trustworthy record of parts moving through production, which technology should be used?"
  ]
 },
 {
  "id": "A58",
  "d": 2,
  "o": "2.1",
  "lv": 3.5,
  "q": "A company's website is defaced and its content replaced with a political message. Which threat actor is MOST likely responsible?",
  "a": [
   "Insider",
   "Organized crime",
   "Shadow IT",
   "Hacktivist"
  ],
  "c": 3,
  "e": "Hacktivists are driven by a cause and spread their message through defacement, leaks and DDoS. Organized crime seeks money, and an insider or shadow IT would not usually post political content.",
  "w": [
   "Which threat actor typically defaces websites to promote a political cause?",
   "A site is replaced with a political statement. Who most likely did it?"
  ]
 },
 {
  "id": "A59",
  "d": 3,
  "o": "3.3",
  "lv": 4.0,
  "q": "A Linux download page shows a link to the ISO image along with its SHA-256 hash. What is the hash used for?",
  "a": [
   "To verify the file was not corrupted or altered during transfer",
   "To provide a key for decrypting the ISO",
   "To authenticate the site as an official source",
   "To confirm the file contains no malware"
  ],
  "c": 0,
  "e": "Comparing the hash of the downloaded file with the published value confirms the file is identical to the original, so it was not corrupted or modified in transit. A hash is not a key, does not authenticate the site, and cannot tell you whether the original file is malicious.",
  "w": [
   "Why would a download site publish the SHA-256 value of a file?",
   "After downloading an ISO, an administrator compares its SHA-256 value with the one on the website. What does this confirm?"
  ]
 },
 {
  "id": "A60",
  "d": 3,
  "o": "3.3",
  "lv": 4.8,
  "q": "Policy says a person may only log in to a server if they are physically present in the same building. Which authentication method BEST enforces this?",
  "a": [
   "USB security key",
   "Biometric scanner",
   "PIN",
   "SMS code"
  ],
  "c": 1,
  "e": "A biometric scanner attached to the server requires the person to be physically there. A USB key or PIN can be shared or used remotely in some setups, and an SMS code can be received anywhere.",
  "w": [
   "Which authentication factor requires the user to be physically present at the device?",
   "To ensure logins only happen in person at the server, which method should be used?"
  ]
 },
 {
  "id": "A61",
  "d": 3,
  "o": "3.3",
  "lv": 4.9,
  "q": "A development team deploys a new application and database to a cloud service. A scan shows that anyone on the internet can query the database without authenticating. Which vulnerability is MOST associated with this?",
  "a": [
   "Legacy software",
   "Open permissions",
   "Race condition",
   "Malicious update"
  ],
  "c": 1,
  "e": "Cloud resources need the same careful permissions as local systems; leaving them open allows anyone to access the data. Legacy software, race conditions and malicious updates are different problems.",
  "w": [
   "A cloud database accepts unauthenticated queries from anyone. What weakness is this?",
   "Which vulnerability type allows anyone to access cloud data because access rights were not configured correctly?"
  ]
 },
 {
  "id": "A62",
  "d": 5,
  "o": "5.6",
  "lv": 4.8,
  "q": "Employees receive an email offering a cash bonus for completing an internal training course, with a link to a server the company does not control. Which of the following BEST describes this email if it was sent by the security team?",
  "a": [
   "Watering hole attack",
   "Cross-site scripting",
   "Zero-day",
   "Phishing campaign"
  ],
  "c": 3,
  "e": "An internal phishing campaign sends realistic lures to employees to measure and improve how they respond. A watering hole compromises a site, XSS is a web flaw, and a zero-day is an unknown vulnerability.",
  "w": [
   "The IT department sends staff a tempting email with an external link to test their habits. What is this called?",
   "Which security awareness activity sends realistic lure emails to employees to measure their responses?"
  ]
 },
 {
  "id": "A63",
  "d": 3,
  "o": "3.2",
  "lv": 4.2,
  "q": "Buying and installing a next-generation firewall is an example of which risk management strategy?",
  "a": [
   "Transfer",
   "Mitigate",
   "Accept",
   "Avoid"
  ],
  "c": 1,
  "e": "Mitigation reduces the likelihood or impact of a risk, commonly by adding controls such as a next-generation firewall. Transfer shifts it (insurance), acceptance takes no action, and avoidance stops the activity.",
  "w": [
   "Which risk response is demonstrated by adding an NGFW to reduce threats?",
   "Deploying a new security device to lower the likelihood of an attack is which strategy?"
  ]
 },
 {
  "id": "A64",
  "d": 1,
  "o": "1.2",
  "lv": 4.7,
  "q": "An organization is adopting a model in which every application request must be validated at a policy enforcement point, with nothing trusted by default. Which model is this?",
  "a": [
   "Public key infrastructure",
   "Zero trust",
   "Discretionary access control",
   "Federation"
  ],
  "c": 1,
  "e": "Zero trust assumes nothing is trusted and verifies every request, typically through a policy enforcement point. PKI manages certificates, DAC is an access model, and federation links identity systems.",
  "w": [
   "Which security model verifies every request instead of trusting anything inside the network?",
   "A design where all access is checked at an enforcement point and nothing is implicitly trusted is called what?"
  ]
 },
 {
  "id": "A65",
  "d": 3,
  "o": "3.1",
  "lv": 4.6,
  "q": "A company is deploying a new application in a public cloud. Which of the following defines who is responsible for each part of data security in that environment?",
  "a": [
   "Playbook",
   "Audit committee",
   "Responsibility matrix",
   "Right-to-audit clause"
  ],
  "c": 2,
  "e": "A cloud responsibility matrix, published by the provider, shows which responsibilities belong to the provider and which to the customer for each service model. A playbook is a response procedure, and the other options are governance mechanisms.",
  "w": [
   "What document from a cloud provider shows which security tasks belong to the customer and which to the provider?",
   "Which artifact assigns security responsibilities between a cloud provider and its customer?"
  ]
 },
 {
  "id": "A66",
  "d": 4,
  "o": "4.2",
  "lv": 4.7,
  "q": "When retiring a computer, a company records the type and size of its drive, the amount of memory, and any installed adapter cards. Which process is this?",
  "a": [
   "Destruction",
   "Sanitization",
   "Certification",
   "Enumeration"
  ],
  "c": 3,
  "e": "Enumeration is the detailed listing of a device's components such as CPU, memory, storage and adapters. Sanitization wipes data, destruction physically ruins media, and certification documents disposal.",
  "w": [
   "Listing every component of a device during decommissioning is called what?",
   "Which asset management activity produces a detailed inventory of a device's parts?"
  ]
 },
 {
  "id": "A67",
  "d": 2,
  "o": "2.3",
  "lv": 5.2,
  "q": "An attacker sends far more data than expected in a single API call, and the server ends up executing the attacker's code. Which attack is this?",
  "a": [
   "Buffer overflow",
   "Replay attack",
   "Cross-site scripting",
   "DDoS"
  ],
  "c": 0,
  "e": "A buffer overflow writes past the end of an allocated buffer; with careful crafting it can overwrite memory so that attacker code runs. Replay reuses captured data, XSS runs script in browsers, and DDoS targets availability.",
  "w": [
   "Sending more input than a program allocated for, leading to arbitrary code execution, describes which attack?",
   "Which attack overwrites memory by exceeding the size of an input buffer?"
  ]
 },
 {
  "id": "A68",
  "d": 1,
  "o": "1.4",
  "lv": 5.0,
  "q": "Users encrypt confidential files on a central server using asymmetric keys, and the company wants key escrow as a recovery option. Which keys must be escrowed?",
  "a": [
   "Private keys",
   "CA keys",
   "Session keys",
   "Public keys"
  ],
  "c": 0,
  "e": "Data encrypted with a public key can only be decrypted with the matching private key, so the private keys must be escrowed. Public keys are already shared, and CA and session keys are not what decrypts these files.",
  "w": [
   "To guarantee access to data encrypted with users' public keys, which keys should the company escrow?",
   "Which key type must be held in escrow so encrypted files can still be decrypted if a user leaves?"
  ]
 },
 {
  "id": "A69",
  "d": 2,
  "o": "2.2",
  "lv": 5.6,
  "q": "A company is enabling host-based firewalls on all user devices. Which threat vector is it MOST directly addressing?",
  "a": [
   "Default credentials",
   "Vishing",
   "Instant messaging",
   "On-path"
  ],
  "c": 2,
  "e": "Instant messaging is a common vector for malicious links and file transfers, and a host-based firewall can block the resulting unwanted connections. Default credentials, phone-based vishing and on-path attacks are addressed by other controls.",
  "w": [
   "Host-based firewalls on every endpoint help protect against which common vector for malicious links?",
   "Which threat vector does enabling host-based firewalls on user devices help counter?"
  ]
 },
 {
  "id": "A70",
  "d": 2,
  "o": "2.5",
  "lv": 4.9,
  "q": "A manufacturer wants to separate its corporate network from the manufacturing floor using an existing router. Both networks share the same physical switch and no new hardware can be bought. Which option is BEST?",
  "a": [
   "Connect the networks with a VPN",
   "Build an air-gapped manufacturing network",
   "Use host-based firewalls on each device",
   "Create separate VLANs for each network"
  ],
  "c": 3,
  "e": "VLANs logically split one switch into separate networks, and the existing router can control traffic between them. An air gap needs separate hardware, a VPN connects rather than separates, and host firewalls do not segment the network.",
  "w": [
   "How can two networks on one physical switch be segmented without additional hardware?",
   "Which segmentation method separates corporate and production traffic on a shared switch?"
  ]
 },
 {
  "id": "A71",
  "d": 3,
  "o": "3.2",
  "lv": 5.3,
  "q": "Field technicians need secure remote access to a new cloud-based application from their mobile devices. Which solution is the BEST fit?",
  "a": [
   "RTOS",
   "CRL",
   "Zero trust",
   "SASE"
  ],
  "c": 3,
  "e": "Secure access service edge (SASE) combines VPN-like access with cloud-delivered security, optimized for reaching cloud services from anywhere. An RTOS is an operating system, a CRL lists revoked certificates, and zero trust is a model rather than an access product.",
  "w": [
   "Which cloud-delivered approach provides secure, optimized access to cloud apps for mobile users?",
   "What is the best remote access option for mobile staff using a cloud application?"
  ]
 },
 {
  "id": "A72",
  "d": 5,
  "o": "5.6",
  "lv": 4.4,
  "q": "A company runs a quarterly security awareness campaign. Which of the following is MOST likely to be part of it?",
  "a": [
   "A process for users to report suspicious messages",
   "An itemized statement of work",
   "An infrastructure-as-code configuration file",
   "An acceptable use policy document"
  ],
  "c": 0,
  "e": "Awareness campaigns usually include simulated phishing and a simple way for users to report suspicious messages to the security team. A SOW is a contract document, IaC files are for automation, and an AUP is a policy rather than an awareness activity.",
  "w": [
   "Which activity is a typical component of an ongoing security awareness campaign?",
   "A security awareness program usually includes which of the following?"
  ]
 },
 {
  "id": "A73",
  "d": 1,
  "o": "1.3",
  "lv": 5.0,
  "q": "A vulnerability that was patched four months ago has reappeared, and the security team finds that a recent update reintroduced it. Which process would BEST prevent this in the future?",
  "a": [
   "Containerization",
   "Data masking",
   "802.1X",
   "Change management"
  ],
  "c": 3,
  "e": "Change management includes testing and review before deployment, which would catch an update that reintroduces a known vulnerability. Containers, data masking and 802.1X are unrelated to controlling updates.",
  "w": [
   "A later update reintroduced an old vulnerability. What process should have caught it before deployment?",
   "Which practice, with its testing phase, helps stop updates from reintroducing fixed flaws?"
  ]
 },
 {
  "id": "A74",
  "d": 1,
  "o": "1.4",
  "lv": 4.3,
  "q": "A security manager wants stored password hashes to be unique even when two users choose the same password. Which technique adds random data before hashing?",
  "a": [
   "Salting",
   "Obfuscation",
   "Key stretching",
   "Digital signature"
  ],
  "c": 0,
  "e": "A salt is random data added to each password before hashing, so identical passwords produce different hashes and precomputed tables are useless. Key stretching slows hashing, obfuscation hides meaning, and signatures prove integrity and origin.",
  "w": [
   "What is the random value added to a password before hashing called?",
   "How can identical passwords be made to produce different stored hashes?"
  ]
 },
 {
  "id": "A75",
  "d": 1,
  "o": "1.4",
  "lv": 4.0,
  "q": "Which cryptographic mechanism gives users a reason to trust a digital certificate?",
  "a": [
   "Steganography",
   "Hash",
   "Symmetric encryption",
   "Digital signature"
  ],
  "c": 3,
  "e": "The certificate authority digitally signs the certificate; if you trust the CA, you can trust the certificates it has signed. A hash alone proves nothing about the issuer, and the other options are unrelated.",
  "w": [
   "How does a certificate authority make a certificate trustworthy?",
   "What does a CA apply to a certificate so that clients can trust it?"
  ]
 },
 {
  "id": "A76",
  "d": 4,
  "o": "4.4",
  "lv": 5.6,
  "q": "A company uses SCAP as part of its security monitoring. What does this MOST likely achieve?",
  "a": [
   "Training users to identify phishing",
   "Presenting internal audit results to the board",
   "Automating the checking and remediation of security issues consistently across tools",
   "Documenting authorized data center visitors"
  ],
  "c": 2,
  "e": "SCAP standardizes how vulnerabilities and configurations are described, so different tools can identify and act on the same security criteria automatically. It is not a training, reporting or visitor-management tool.",
  "w": [
   "What is the purpose of the Security Content Automation Protocol in security operations?",
   "Which outcome does adopting SCAP provide?"
  ]
 },
 {
  "id": "A77",
  "d": 5,
  "o": "5.1",
  "lv": 4.4,
  "q": "An organization keeps a large customer database for sales and support. Which role manages the access rights and security controls on this data day to day?",
  "a": [
   "Data processor",
   "Data owner",
   "Data subject",
   "Data custodian"
  ],
  "c": 3,
  "e": "The data custodian implements and manages access rights and security controls. The owner is accountable for the data, the processor handles it for a controller, and the subject is the person the data describes.",
  "w": [
   "Who is responsible for applying access rights and security controls to a data set on the owner's behalf?",
   "Which data role handles access permissions and protections for customer data?"
  ]
 },
 {
  "id": "A78",
  "d": 3,
  "o": "3.3",
  "lv": 5.2,
  "q": "A content management system labels files as 'Public' or 'Restricted'. A recent update adds a 'Private' label. What is the MOST likely reason?",
  "a": [
   "Minimizing the attack surface",
   "Simplifying categorization",
   "Expanding privacy compliance",
   "Reducing search time"
  ],
  "c": 2,
  "e": "A 'Private' label typically marks personal information that privacy regulations require to be handled differently. Adding a category does not simplify classification, shrink the attack surface or speed up searches.",
  "w": [
   "Why would an organization add a 'Private' classification to its data labels?",
   "Adding a 'Private' data label most likely supports which goal?"
  ]
 },
 {
  "id": "A79",
  "d": 1,
  "o": "1.4",
  "lv": 5.0,
  "q": "A security team wants to consolidate and protect the private keys used by all of its web servers. Which is the BEST way to store them?",
  "a": [
   "A hardware security module",
   "Full-disk encryption on the web servers",
   "A TPM in each server",
   "A UEFI BIOS upgrade"
  ],
  "c": 0,
  "e": "A hardware security module is a dedicated appliance that securely stores keys and performs cryptographic operations for many systems. A TPM protects one machine, full-disk encryption protects data at rest, and UEFI is firmware.",
  "w": [
   "Which device securely stores and manages cryptographic keys for many servers in one place?",
   "To centralize and protect private keys across a web farm, what should be deployed?"
  ]
 },
 {
  "id": "A80",
  "d": 4,
  "o": "4.9",
  "lv": 6.6,
  "q": "An IPS logs: 'ALERT Cross-Site Scripting in JSON Data 222.43.112.74:3332 -> 64.235.145.35:80 URL/index.html Method POST User Agent: curl/7.21.3 ... Detail: token=\"<script>\" value=\"<script>alert(2)</script>\"'. Which TWO conclusions are supported? (Select TWO).",
  "a": [
   "The alert was triggered by an embedded script",
   "The attacker's IP address is 222.43.112.74",
   "The alert was triggered by a malformed User-Agent header",
   "The attacker's IP address is 64.235.145.35",
   "The alert was triggered by an invalid client port number"
  ],
  "c": [
   0,
   1
  ],
  "e": "The detail shows a script value embedded in JSON data, which is what triggered the XSS alert. The arrow shows the flow from 222.43.112.74 (the source, the attacker) to the web server at 64.235.145.35 on port 80. The User-Agent and the client port are normal.",
  "w": [
   "From an IPS alert showing a <script> value in JSON sent from 222.43.112.74 to 64.235.145.35:80, which TWO statements are correct? (Select TWO).",
   "Which TWO facts can be determined from this cross-site scripting alert in the IPS log? (Select TWO)."
  ]
 },
 {
  "id": "A81",
  "d": 5,
  "o": "5.2",
  "lv": 4.0,
  "q": "Which term describes the monetary loss expected if a single incident occurs?",
  "a": [
   "ALE",
   "SLE",
   "RTO",
   "ARO"
  ],
  "c": 1,
  "e": "Single loss expectancy (SLE) is the cost of one occurrence. ALE is the yearly figure (SLE × ARO), ARO is how often per year, and RTO is a recovery time target.",
  "w": [
   "What is the financial impact of one occurrence of an event called?",
   "Which risk metric measures the cost of a single loss event?"
  ]
 },
 {
  "id": "A82",
  "d": 2,
  "o": "2.3",
  "lv": 4.6,
  "q": "A user with limited access types USER77' OR '1'='1 into the search box of an internal web application, and every record in the database is displayed. Which attack is this?",
  "a": [
   "Cross-site scripting",
   "Buffer overflow",
   "SQL injection",
   "SSL stripping"
  ],
  "c": 2,
  "e": "The input closes the expected string and adds a condition that is always true, changing the query to return everything: SQL injection, possible because input is not validated or parameterized.",
  "w": [
   "Entering a quote followed by OR '1'='1 into a search field returns all records. What attack is this?",
   "Which attack abuses poor input validation to change the logic of a database query?"
  ]
 },
 {
  "id": "A83",
  "d": 1,
  "o": "1.2",
  "lv": 4.7,
  "q": "After opening a spreadsheet of part numbers and prices from a vendor, a user reports slow performance, constant pop-ups and the cursor moving by itself. What is the MOST likely cause?",
  "a": [
   "On-path attack",
   "Worm",
   "Trojan horse",
   "Logic bomb"
  ],
  "c": 2,
  "e": "A Trojan horse arrives disguised as something legitimate, such as a vendor spreadsheet, and then gives the attacker control, consistent with pop-ups and a moving cursor. A worm self-propagates, a logic bomb waits for a trigger, and on-path is a network attack.",
  "w": [
   "A file that looked legitimate led to pop-ups and remote control of a PC. Which malware is most likely?",
   "Which type of malware disguises itself as a legitimate file and then lets an attacker control the system?"
  ]
 },
 {
  "id": "A84",
  "d": 5,
  "o": "5.4",
  "lv": 5.0,
  "q": "An online manufacturer charges customers monthly using card details stored in their profiles, which are encrypted and protected with additional authentication factors. What is the justification for these controls?",
  "a": [
   "Chain of custody",
   "Password vaulting",
   "Compliance requirements",
   "Sandboxing"
  ],
  "c": 2,
  "e": "Storing payment card data brings compliance obligations (such as PCI DSS) that require strong protections and reporting. Chain of custody, password vaulting and sandboxing do not explain these controls.",
  "w": [
   "Why would a company encrypt stored card data and add extra authentication to it?",
   "Encrypting saved payment details and adding MFA are most likely driven by what?"
  ]
 },
 {
  "id": "A85",
  "d": 2,
  "o": "2.4",
  "lv": 5.8,
  "q": "A report shows several internal workstations intermittently sending data to one external IP address at random times of day. What is the MOST likely explanation?",
  "a": [
   "On-path attack",
   "Keylogger",
   "Replay attack",
   "Brute force"
  ],
  "c": 1,
  "e": "A keylogger records keystrokes and periodically sends them to the attacker, producing intermittent transfers to one destination. On-path, replay and brute force attacks do not create this outbound pattern from workstations.",
  "w": [
   "Workstations occasionally send small amounts of data to the same external address at random times. Which malware does this suggest?",
   "Which malware type periodically transmits captured data from infected PCs to an attacker?"
  ]
 },
 {
  "id": "A86",
  "d": 4,
  "o": "4.4",
  "lv": 4.5,
  "q": "Company policy forbids transmitting customer information, yet an administrator receives an alert that card numbers were sent as an email attachment. Which system MOST likely generated the alert?",
  "a": [
   "IPS",
   "DLP",
   "RADIUS",
   "IPsec"
  ],
  "c": 1,
  "e": "Data loss prevention identifies and can block sensitive data, such as card numbers, as it leaves the organization. An IPS looks for attacks, RADIUS authenticates, and IPsec encrypts traffic.",
  "w": [
   "Which technology detects sensitive data such as card numbers leaving the network?",
   "An alert flags credit card numbers in an outgoing attachment. Which tool raised it?"
  ]
 },
 {
  "id": "A87",
  "d": 1,
  "o": "1.2",
  "lv": 4.9,
  "q": "An administrator sets up a virtual machine in the screened subnet with a guest account and no password. What is the MOST likely reason?",
  "a": [
   "It is a honeypot to attract attackers",
   "It is a cloud storage service for remote users",
   "It is a VPN concentrator",
   "It is a development sandbox for third parties"
  ],
  "c": 0,
  "e": "A deliberately easy-to-compromise system in a screened subnet is a honeypot, used to attract and study attackers. No legitimate service would be exposed with a passwordless guest account.",
  "w": [
   "Why would a system in the DMZ be deliberately left easy to break into?",
   "A purposely weak server is placed where internet users can reach it. What is its purpose?"
  ]
 },
 {
  "id": "A88",
  "d": 4,
  "o": "4.5",
  "lv": 4.3,
  "q": "An administrator adds an SPF record to the organization's DNS. What is this record for?",
  "a": [
   "To send all outbound email through an encrypted tunnel",
   "To list the servers authorized to send email for the domain",
   "To digitally sign outgoing email",
   "To give disposition instructions for messages marked as spam"
  ],
  "c": 1,
  "e": "SPF publishes the list of mail servers allowed to send email for a domain. Signing is DKIM, disposition instructions are DMARC, and SPF does not encrypt anything.",
  "w": [
   "What does a Sender Policy Framework record in DNS contain?",
   "Why would a domain publish an SPF record?"
  ]
 },
 {
  "id": "A89",
  "d": 3,
  "o": "3.1",
  "lv": 4.6,
  "q": "A company wants to deploy applications securely without the overhead of a separate virtual machine for each one. Which approach is BEST?",
  "a": [
   "Containerization",
   "IoT",
   "Proxy",
   "RTOS"
  ],
  "c": 0,
  "e": "Containers isolate applications from each other while sharing one host operating system, avoiding the overhead of a VM per application. IoT, proxies and real-time operating systems do not address this.",
  "w": [
   "Which technology isolates applications from one another without a full VM per application?",
   "To run isolated applications on shared infrastructure with less overhead than VMs, what should be used?"
  ]
 },
 {
  "id": "A90",
  "d": 4,
  "o": "4.3",
  "lv": 5.2,
  "q": "A new application server is installed in a test environment and will move to production next week. The security director wants to know whether any part of it can actually be exploited. Which approach is BEST?",
  "a": [
   "Tabletop exercise",
   "Vulnerability scanner",
   "DDoS test",
   "Penetration test"
  ],
  "c": 3,
  "e": "A penetration test actively attempts to exploit weaknesses, showing whether they are really exploitable; doing it in a test environment avoids harming production. A scanner only reports possible vulnerabilities, and a tabletop is a discussion.",
  "w": [
   "Which test actively attempts to exploit a system to prove whether its weaknesses are real?",
   "Before production, how can a team confirm whether a new server's vulnerabilities can really be exploited?"
  ]
 },
 {
  "id": "B6",
  "d": 2,
  "o": "2.5",
  "lv": 5.0,
  "q": "An audit of production web servers finds default configurations, web services running under a privileged account, and certificate inconsistencies. What is the BEST way to resolve these issues?",
  "a": [
   "Server hardening",
   "Multi-factor authentication",
   "Enabling HTTPS",
   "Running operating system updates"
  ],
  "c": 0,
  "e": "Hardening, usually guided by vendor secure configuration guides, removes defaults, runs services with least privilege and fixes certificate configuration. MFA, HTTPS or OS updates alone would not fix all three findings.",
  "w": [
   "Default settings, privileged service accounts and certificate problems are all fixed by which practice?",
   "Which approach addresses insecure defaults, over-privileged services and certificate inconsistencies together?"
  ]
 },
 {
  "id": "B7",
  "d": 1,
  "o": "1.1",
  "lv": 4.2,
  "q": "A shipping company runs an IPS at each of its regional warehouses to watch for suspicious traffic patterns. Which control type BEST describes how the IPS is being used?",
  "a": [
   "Deterrent",
   "Compensating",
   "Directive",
   "Detective"
  ],
  "c": 3,
  "e": "Watching for suspicious traffic and alerting on it is a detective function. An IPS can also be preventive because it blocks known attacks, but here it is described as monitoring.",
  "w": [
   "An IPS used to watch for and alert on suspicious traffic is BEST classified as which control type?",
   "Which control type describes a device that monitors traffic and reports intrusion attempts?"
  ]
 },
 {
  "id": "B8",
  "d": 5,
  "o": "5.1",
  "lv": 4.0,
  "q": "The vice president of sales asks IT to back up the sales data every day. In this situation the vice president is an example of which data role?",
  "a": [
   "Data owner",
   "Data controller",
   "Data steward",
   "Data processor"
  ],
  "c": 0,
  "e": "The data owner is accountable for a data set and decides how it is protected; this is often a senior manager such as a vice president. Stewards and custodians implement controls, and controllers and processors are privacy-law roles.",
  "w": [
   "A senior executive who is accountable for a department's data and decides how it is protected is which role?",
   "Which data role does a VP hold when deciding how the sales data must be protected?"
  ]
 },
 {
  "id": "B9",
  "d": 4,
  "o": "4.3",
  "lv": 4.3,
  "q": "While preparing a penetration test of a third-party website, a security engineer reads the company's social media posts for useful information. What is this practice called?",
  "a": [
   "Partially known environment",
   "OSINT",
   "Exfiltration",
   "Active reconnaissance"
  ],
  "c": 1,
  "e": "Open-source intelligence (OSINT) is information gathered from public sources such as social media, company sites and forums. Active reconnaissance probes the target's systems directly, and exfiltration is removing data.",
  "w": [
   "Gathering details about a target from social media and public websites is known as what?",
   "Which term describes collecting intelligence about a target from publicly available sources?"
  ]
 },
 {
  "id": "B10",
  "d": 4,
  "o": "4.7",
  "lv": 4.8,
  "q": "A company wants to orchestrate its response whenever a virus is detected on a company device. What is the BEST way to implement this?",
  "a": [
   "Active reconnaissance",
   "Log aggregation",
   "Vulnerability scanning",
   "Escalation scripting"
  ],
  "c": 3,
  "e": "Scripting and automation can trigger and coordinate the escalation and response steps as soon as a detection occurs. Log aggregation collects data, scanning finds weaknesses, and reconnaissance gathers information.",
  "w": [
   "Which approach automates the response steps when malware is found on endpoints?",
   "How can a company automatically coordinate and escalate its response to virus detections?"
  ]
 },
 {
  "id": "B11",
  "d": 2,
  "o": "2.1",
  "lv": 3.6,
  "q": "An accounting employee gets a text message that appears to be from the CEO asking for a cryptocurrency payment for a recently purchased tablet. Which attack is this?",
  "a": [
   "Brand impersonation",
   "Watering hole attack",
   "Smishing",
   "Typosquatting"
  ],
  "c": 2,
  "e": "Phishing by text message is smishing; an unusual payment request in cryptocurrency or gift cards from a supposed executive is a classic example. Brand impersonation copies a company's look, and watering holes and typosquatting use websites.",
  "w": [
   "A text supposedly from an executive requests an unusual cryptocurrency payment. What type of attack is this?",
   "Which attack uses SMS messages impersonating a leader to request payment?"
  ]
 },
 {
  "id": "B12",
  "d": 3,
  "o": "3.1",
  "lv": 4.9,
  "q": "A hypervisor vulnerability could let users on one virtual machine reach resources belonging to another virtual machine. Which term BEST describes this vulnerability?",
  "a": [
   "Containerization",
   "Jailbreaking",
   "SDN",
   "VM escape"
  ],
  "c": 3,
  "e": "A VM escape lets code break out of its virtual machine to reach the hypervisor or other guests. Jailbreaking removes mobile OS restrictions, and containerization and SDN are technologies, not vulnerabilities.",
  "w": [
   "A flaw lets a guest VM break out and access other VMs on the same host. What is it called?",
   "Which vulnerability type allows code in one virtual machine to access the hypervisor or other guests?"
  ]
 },
 {
  "id": "B13",
  "d": 2,
  "o": "2.4",
  "lv": 5.4,
  "q": "Remote employees typing a web conference link are taken to a different website, while office users reach the conference without problems. What is the MOST likely cause?",
  "a": [
   "Buffer overflow",
   "Wireless disassociation",
   "Amplified DDoS",
   "DNS poisoning"
  ],
  "c": 3,
  "e": "If the DNS server that remote users rely on has been poisoned, their requests resolve to the attacker's site, while office users using a different DNS server are unaffected. The other attacks do not redirect users to another site.",
  "w": [
   "Only home users are redirected to the wrong site when opening a meeting link. Which attack is most likely?",
   "A meeting URL resolves to the wrong website for remote workers but not for office staff. What explains this?"
  ]
 },
 {
  "id": "B14",
  "d": 1,
  "o": "1.2",
  "lv": 3.8,
  "q": "A new internal application will not start until the user enters a username and password and inserts a smart card. Which process does this describe?",
  "a": [
   "Federation",
   "Accounting",
   "Authentication",
   "Authorization"
  ],
  "c": 2,
  "e": "Authentication proves that users are who they claim to be, here with two factors. Authorization decides what they can do afterwards, accounting records activity, and federation links identity systems.",
  "w": [
   "Requiring a password and smart card before an app opens is an example of which security process?",
   "Proving identity with credentials and a smart card is which part of AAA?"
  ]
 },
 {
  "id": "B15",
  "d": 5,
  "o": "5.5",
  "lv": 4.7,
  "q": "An online retailer hires a third party for a PCI DSS penetration test and gives them only the internet-facing IP addresses of its web servers. Which testing approach is this?",
  "a": [
   "Known environment",
   "Passive reconnaissance",
   "Partially known environment",
   "Benchmarks"
  ],
  "c": 2,
  "e": "A partially known environment (gray box) test gives the tester some information, here only the external addresses. A known environment gives full details, and passive reconnaissance is an information-gathering technique.",
  "w": [
   "Testers receive some details, such as external IP addresses, but nothing more. What kind of test is this?",
   "Which penetration test type gives the tester limited information about the target?"
  ]
 },
 {
  "id": "B16",
  "d": 2,
  "o": "2.2",
  "lv": 5.5,
  "q": "A manufacturer of radar systems for commercial and military customers is considering allowing mobile phones inside its facility. What is the MOST significant concern with this change?",
  "a": [
   "Unauthorized software on rooted devices",
   "Remote access clients on the devices",
   "Out-of-date mobile operating systems",
   "Loss of intellectual property"
  ],
  "c": 3,
  "e": "Phones make it easy to photograph, record or copy sensitive designs, so loss of intellectual property is the main concern for a defense-related manufacturer. The other issues are real but secondary.",
  "w": [
   "Allowing phones into a facility that builds sensitive military equipment raises which main risk?",
   "What is the biggest threat-vector concern if employees can bring mobile devices into a sensitive manufacturing site?"
  ]
 },
 {
  "id": "B17",
  "d": 4,
  "o": "4.5",
  "lv": 5.0,
  "q": "How can an organization verify the digital signature applied by an external email server?",
  "a": [
   "Run a vulnerability scan",
   "View the server's device certificate",
   "Authenticate to a RADIUS server",
   "Check the DKIM record"
  ],
  "c": 3,
  "e": "A DKIM record in DNS publishes the public key that matches the sending server's email signatures, so receivers can verify them. RADIUS authenticates users, and a scan or certificate view does not validate message signatures.",
  "w": [
   "Which DNS record holds the public key used to check a sending server's email signatures?",
   "To validate the signature on an incoming email, what should the receiving server check?"
  ]
 },
 {
  "id": "B18",
  "d": 3,
  "o": "3.4",
  "lv": 4.7,
  "q": "A company runs its web service on older operating systems that are unstable under heavy load. What should it use to maximize uptime and availability?",
  "a": [
   "Cold site",
   "UPS",
   "Redundant routers",
   "Load balancer"
  ],
  "c": 3,
  "e": "A load balancer distributes traffic across a pool of servers and stops sending to any that fail, keeping the service available. A cold site is for disasters, a UPS covers power, and redundant routers do not address server failures.",
  "w": [
   "Which device spreads traffic across several servers and keeps a service running if one fails?",
   "To keep a web service available despite unstable servers, what should be added?"
  ]
 },
 {
  "id": "B19",
  "d": 1,
  "o": "1.4",
  "lv": 4.6,
  "q": "An accountant wants to email a spreadsheet of sensitive information to several external vendors. Which is the BEST way to protect the data in the message?",
  "a": [
   "Full-disk encryption",
   "A key exchange algorithm",
   "A salted hash",
   "Asymmetric encryption"
  ],
  "c": 3,
  "e": "Encrypting with each recipient's public key (as PGP or S/MIME do) means only their private key can decrypt it. Full-disk encryption protects a device, a hash cannot be reversed, and a key exchange algorithm alone does not encrypt the message.",
  "w": [
   "What protects a sensitive email attachment so only the intended recipients can read it?",
   "Which encryption approach lets a sender protect an email using each recipient's public key?"
  ]
 },
 {
  "id": "B20",
  "d": 2,
  "o": "2.5",
  "lv": 4.4,
  "q": "An administrator wants marketing, accounting and manufacturing each to have their own private network, with communication between them restricted. What should be configured?",
  "a": [
   "VPN",
   "RBAC",
   "VLAN",
   "SDN"
  ],
  "c": 2,
  "e": "VLANs logically segment a switched network so each department is isolated; a router or firewall between VLANs can restrict traffic. RBAC is an access model, a VPN is an encrypted tunnel, and SDN is a management architecture.",
  "w": [
   "Which technology logically separates departments on shared switches?",
   "How can an organization give each department its own network segment and control traffic between them?"
  ]
 },
 {
  "id": "B21",
  "d": 3,
  "o": "3.2",
  "lv": 4.8,
  "q": "A technician at a managed service provider needs command-line access to routers, switches and firewalls inside a customer's private network. What provides this access?",
  "a": [
   "HSM",
   "Jump server",
   "NAC",
   "Air gap"
  ],
  "c": 1,
  "e": "A jump server is a hardened, monitored host that administrators connect to first and from which they reach internal devices. An HSM stores keys, NAC controls network admission, and an air gap prevents any connection.",
  "w": [
   "Which hardened system lets administrators connect into a secure network and then reach internal devices?",
   "What should an MSP technician connect to first in order to manage devices inside a protected network?"
  ]
 },
 {
  "id": "B22",
  "d": 5,
  "o": "5.2",
  "lv": 4.0,
  "q": "A vendor estimates its new wireless access points will run an average of 100,000 hours before a hardware failure. Which metric is this?",
  "a": [
   "MTTR",
   "RPO",
   "RTO",
   "MTBF"
  ],
  "c": 3,
  "e": "Mean time between failures is the average expected operating time between hardware failures. MTTR is repair time, and RPO and RTO are recovery objectives.",
  "w": [
   "What is an estimated average running time before a device fails called?",
   "Which reliability metric describes how long hardware typically runs between failures?"
  ]
 },
 {
  "id": "B23",
  "d": 3,
  "o": "3.3",
  "lv": 4.2,
  "q": "In a customer support application, staff should only see the last four digits of a card number. Which technique provides this?",
  "a": [
   "Hashing",
   "Tokenization",
   "Masking",
   "Salting"
  ],
  "c": 2,
  "e": "Data masking hides part of the data from view while the full value remains stored. Tokenization replaces the data with a token, hashing is one-way, and salting is used with password hashes.",
  "w": [
   "Which technique shows only part of sensitive data, such as the last four digits of a card?",
   "How can an application display a partial card number while storing the full one?"
  ]
 },
 {
  "id": "B24",
  "d": 4,
  "o": "4.6",
  "lv": 3.4,
  "q": "A user authenticates with a PIN and a fingerprint. Which authentication factors are these?",
  "a": [
   "Something you know and something you are",
   "Something you are and somewhere you are",
   "Something you have and something you know",
   "Somewhere you are and something you are"
  ],
  "c": 0,
  "e": "A PIN is something you know, and a fingerprint is something you are.",
  "w": [
   "A PIN and a fingerprint represent which two factor types?",
   "Classify the factors used when logging in with a PIN plus a fingerprint scan."
  ]
 },
 {
  "id": "B25",
  "d": 4,
  "o": "4.1",
  "lv": 4.7,
  "q": "An administrator wants technicians' logins to access points and switches to be checked against a central database instead of local accounts. What is the BEST way to do this?",
  "a": [
   "COPE",
   "AAA",
   "IPsec",
   "SIEM"
  ],
  "c": 1,
  "e": "An AAA service such as RADIUS or TACACS+ centralizes authentication, authorization and accounting for network devices. COPE is a device model, IPsec encrypts traffic, and a SIEM correlates logs.",
  "w": [
   "How can logins to network devices be centralized instead of using local accounts on each one?",
   "Which approach sends device login requests to a central authentication server?"
  ]
 },
 {
  "id": "B26",
  "d": 4,
  "o": "4.6",
  "lv": 3.8,
  "q": "An audit finds that many IT staff accounts have administrator rights and recommends reducing them to only what each role needs. Which principle is this?",
  "a": [
   "Password vaulting",
   "Offboarding",
   "Least privilege",
   "Discretionary access control"
  ],
  "c": 2,
  "e": "Least privilege grants only the access each user needs, limiting the damage a compromised account can cause. Vaulting stores credentials, offboarding removes access when people leave, and DAC is an access model.",
  "w": [
   "Reducing accounts to the minimum rights required for their jobs follows which principle?",
   "Which policy limits every account to only the permissions needed for its tasks?"
  ]
 },
 {
  "id": "B27",
  "d": 4,
  "o": "4.5",
  "lv": 4.3,
  "q": "An audit finds usernames and passwords readable in a packet capture. What has the audit identified?",
  "a": [
   "Weak encryption",
   "Improper patch management",
   "Insecure protocols",
   "Open ports"
  ],
  "c": 2,
  "e": "Credentials visible in a capture mean a clear-text protocol (such as Telnet, FTP or HTTP) is in use. Weak encryption would still hide them to casual viewing, and patching and open ports are separate issues.",
  "w": [
   "Credentials visible in captured network traffic point to which weakness?",
   "If passwords can be read directly from a packet capture, what is the problem?"
  ]
 },
 {
  "id": "B28",
  "d": 5,
  "o": "5.4",
  "lv": 5.3,
  "q": "Before deploying a new application, a company audits its own servers to confirm they have the required security features configured. Which concept does this BEST describe?",
  "a": [
   "Due care",
   "Active reconnaissance",
   "Data retention",
   "Statement of work"
  ],
  "c": 0,
  "e": "Due care is the duty to act responsibly and in good faith, such as making sure your own systems are properly secured. Due diligence is investigation, often of third parties, before acting.",
  "w": [
   "An organization checking that its own systems are properly secured is exercising what?",
   "Which term describes the ongoing duty to act responsibly in securing one's own systems?"
  ]
 },
 {
  "id": "B29",
  "d": 5,
  "o": "5.2",
  "lv": 4.6,
  "q": "A company had insurance against ransomware, but premiums rose above its budget, so it cancelled the policy and will handle ransomware risk itself. Which risk response is this?",
  "a": [
   "Mitigation",
   "Acceptance",
   "Transference",
   "Avoidance"
  ],
  "c": 1,
  "e": "Cancelling the insurance means the company now carries the risk itself: risk acceptance. The insurance was transference, mitigation would add controls, and avoidance would stop the risky activity.",
  "w": [
   "Dropping a ransomware insurance policy and absorbing the risk internally is an example of what?",
   "Which risk strategy is chosen when an organization decides to bear a risk itself?"
  ]
 },
 {
  "id": "B30",
  "d": 2,
  "o": "2.1",
  "lv": 4.0,
  "q": "Which threat actor is MOST likely to install a company's internal application on a public cloud service without approval?",
  "a": [
   "Organized crime",
   "Nation state",
   "Shadow IT",
   "Hacktivist"
  ],
  "c": 2,
  "e": "Shadow IT is technology deployed by staff outside the IT department's control, often on public cloud services. It is usually well-intentioned but bypasses security policy.",
  "w": [
   "A department deploys a company app to a public cloud without involving IT. Which threat actor is this?",
   "Who is most likely to bypass IT policy by running company systems on unapproved cloud services?"
  ]
 },
 {
  "id": "B31",
  "d": 4,
  "o": "4.8",
  "lv": 5.0,
  "q": "An IPS reports exploit attempts against the public web servers, and their administrator finds unusual log entries on each one. What is the NEXT step in the incident response process?",
  "a": [
   "Check the IPS logs for other attacks",
   "Plan the removal of malware",
   "Disable any breached user accounts",
   "Disconnect the web servers from the network"
  ],
  "c": 3,
  "e": "Unusual entries suggest the servers may be compromised, so they should be contained by disconnecting them. Further analysis, account changes and eradication planning follow containment.",
  "w": [
   "Exploit attempts were detected and the servers show suspicious log entries. What should happen next?",
   "Which action should be taken immediately when web servers show signs of compromise after attack attempts?"
  ]
 },
 {
  "id": "B32",
  "d": 4,
  "o": "4.9",
  "lv": 5.9,
  "q": "On a shipping department laptop, an administrator sees these events: 'D:\\Downloads\\ChangeLog-5.0.4.scr - Quarantine Success', 'C:\\Program Files\\Photo Viewer\\ViewerBase.dll - Quarantine Failure', 'C:\\Sales\\Sample32.dat - Quarantine Success'. Which of the following BEST describes what happened?",
  "a": [
   "Antivirus detected three malicious files and quarantined two of them",
   "The host-based firewall blocked two traffic flows",
   "A host-based allow list blocked two applications from running",
   "A network IPS found two known vulnerabilities"
  ],
  "c": 0,
  "e": "File paths with quarantine results are antivirus activity: three files were flagged as malicious, two were moved to quarantine, and one could not be. A firewall logs traffic, an allow list logs blocked execution, and a network IPS would not report local files.",
  "w": [
   "A laptop log lists three files, two quarantined successfully and one not. What does this show?",
   "Interpret a local log of three suspicious files with quarantine results of success, failure and success."
  ]
 },
 {
  "id": "B33",
  "d": 2,
  "o": "2.3",
  "lv": 4.6,
  "q": "A company relies on the curated Apple App Store to keep malware off its phones, but an iPhone in the shipping department has apps that are not available in that store. How were they most likely installed?",
  "a": [
   "Side loading",
   "Malicious update",
   "VM escape",
   "Cross-site scripting"
  ],
  "c": 0,
  "e": "Installing apps manually from outside the curated store is side loading, usually possible on an iPhone only after jailbreaking. The other options are unrelated vulnerabilities.",
  "w": [
   "Apps from outside the official store are found on a company iPhone. How did they get there?",
   "What is installing apps without using the device's official app store called?"
  ]
 },
 {
  "id": "B34",
  "d": 5,
  "o": "5.6",
  "lv": 4.0,
  "q": "A company sees more support calls from attackers using social engineering to gain access to customer data. What is the BEST way to prevent these attacks?",
  "a": [
   "User training",
   "A next-generation firewall",
   "An internal audit",
   "Penetration testing"
  ],
  "c": 0,
  "e": "Social engineering targets people rather than technology, so training staff to recognize and refuse these requests is the best defense. Firewalls, audits and penetration tests do not stop a persuasive caller.",
  "w": [
   "Which control is most effective against phone-based social engineering of support staff?",
   "Attackers keep tricking support agents over the phone. What should the company do?"
  ]
 },
 {
  "id": "B35",
  "d": 5,
  "o": "5.5",
  "lv": 4.4,
  "q": "As part of an internal audit, every department is asked to list all the devices, operating systems and applications it uses. Which of the following BEST describes this audit?",
  "a": [
   "Attestation",
   "Self-assessment",
   "Regulatory compliance",
   "Vendor monitoring"
  ],
  "c": 1,
  "e": "A self-assessment is an organization performing its own security checks. Attestation is a formal statement, often by an outside auditor, and vendor monitoring looks at third parties.",
  "w": [
   "An organization checking its own environment with its own staff is performing what kind of assessment?",
   "Which assessment type has departments review and report on their own systems?"
  ]
 },
 {
  "id": "B36",
  "d": 1,
  "o": "1.2",
  "lv": 4.5,
  "q": "A company is worried about security weaknesses at its remote sites. Which activity would BEST show the IT team where they fall short?",
  "a": [
   "Gap analysis",
   "Policy administrator",
   "Change management",
   "Dependency list"
  ],
  "c": 0,
  "e": "A gap analysis compares the current security posture with the desired one and lists the shortcomings. Change management controls changes, and a policy administrator is a zero trust component.",
  "w": [
   "Which process compares current security with the desired state to find shortcomings?",
   "To identify the differences between how secure remote sites are and how secure they should be, what should be done?"
  ]
 },
 {
  "id": "B37",
  "d": 2,
  "o": "2.2",
  "lv": 3.5,
  "q": "An attacker finds several devices on a corporate network that accept the username 'admin' and the password 'admin'. Which of the following describes this situation?",
  "a": [
   "Open service ports",
   "Default credentials",
   "Unsupported systems",
   "Phishing"
  ],
  "c": 1,
  "e": "Devices often ship with default credentials such as admin/admin; if they are never changed, anyone who knows the default can log in.",
  "w": [
   "Devices still use the vendor's admin/admin login. What weakness is this?",
   "Which vulnerability exists when factory login credentials are never changed?"
  ]
 },
 {
  "id": "B38",
  "d": 2,
  "o": "2.2",
  "lv": 5.0,
  "q": "A security administrator attends a large annual industry convention with security professionals from around the world. Which attack is MOST likely to target attendees?",
  "a": [
   "Smishing",
   "Supply chain",
   "SQL injection",
   "Watering hole"
  ],
  "c": 3,
  "e": "A watering hole attack compromises something the intended victims gather around, such as a convention's website or network. The other attacks do not specifically exploit a shared gathering place.",
  "w": [
   "Attackers want to compromise many security professionals at once. Which attack would target a convention they all use?",
   "Which attack compromises a site or service that a specific group of targets is known to visit?"
  ]
 },
 {
  "id": "B39",
  "d": 3,
  "o": "3.4",
  "lv": 5.2,
  "q": "A company's headquarters suffers frequent power surges and outages, and the security administrator is worried about downtime and hardware damage. Which TWO measures provide the MOST protection? (Select TWO).",
  "a": [
   "UPS",
   "Parallel processing",
   "Snapshots",
   "Multi-cloud system",
   "Load balancing",
   "Generator"
  ],
  "c": [
   0,
   5
  ],
  "e": "A UPS conditions power and bridges short outages, and a generator keeps systems running for as long as it has fuel. The other options do not address power problems.",
  "w": [
   "Which TWO controls best protect systems from frequent power surges and outages? (Select TWO).",
   "To keep systems running through unreliable power, which TWO should be installed? (Select TWO)."
  ]
 },
 {
  "id": "B40",
  "d": 1,
  "o": "1.4",
  "lv": 6.2,
  "q": "An in-house mobile ordering app must detect revoked server certificates without sending any traffic over the corporate internet connection to the CA. What must be configured?",
  "a": [
   "CSR generation",
   "OCSP stapling",
   "Key escrow",
   "Wildcard certificate"
  ],
  "c": 1,
  "e": "With OCSP stapling, the server periodically gets a signed status from the CA and includes it in the TLS handshake, so clients do not have to contact the CA. A CSR requests a certificate, escrow stores keys, and a wildcard covers subdomains.",
  "w": [
   "How can clients learn a certificate's revocation status without contacting the CA themselves?",
   "Which feature lets the server provide signed revocation status so clients avoid querying the CA?"
  ]
 },
 {
  "id": "B41",
  "d": 3,
  "o": "3.2",
  "lv": 4.0,
  "q": "A security administrator must create a link that protects all communication between two remote offices. Which is the BEST choice?",
  "a": [
   "SCAP",
   "Screened subnet",
   "IPsec",
   "Network access control"
  ],
  "c": 2,
  "e": "IPsec builds an encrypted VPN tunnel between sites, protecting all traffic between them. SCAP is for vulnerability content, a screened subnet is a network zone, and NAC controls device admission.",
  "w": [
   "Which technology is commonly used to build an encrypted tunnel between two sites?",
   "To secure all traffic between two locations over the internet, what should be used?"
  ]
 },
 {
  "id": "B42",
  "d": 2,
  "o": "2.4",
  "lv": 4.8,
  "q": "Users report a slow database server. On the server, an administrator sees: '/dev/xvda1 Size 158G Used 158G Avail 0 Use% 100% Mounted on /'. What does this indicate?",
  "a": [
   "Buffer overflow",
   "Resource consumption",
   "SQL injection",
   "Race condition"
  ],
  "c": 1,
  "e": "The disk is completely full, so the server cannot write data and slows or fails: resource consumption (exhaustion). Nothing indicates an overflow, injection or timing problem.",
  "w": [
   "A server's root file system shows 100% used and 0 bytes available. Which issue does this describe?",
   "Which type of problem is shown by a full disk causing a server to respond slowly?"
  ]
 },
 {
  "id": "B43",
  "d": 3,
  "o": "3.3",
  "lv": 4.6,
  "q": "Which technique lets a mobile device make card payments without sending the real card number across the network?",
  "a": [
   "Tokenization",
   "Hashing",
   "Steganography",
   "Masking"
  ],
  "c": 0,
  "e": "Tokenization replaces the card number with a token that is meaningless outside the transaction, which is how mobile wallets work. Masking only hides digits from view, hashing is one-way, and steganography hides data inside other data.",
  "w": [
   "Mobile wallet payments send a one-time substitute instead of the card number. What is this technique?",
   "How do phone-based payments avoid transmitting the actual card number?"
  ]
 },
 {
  "id": "B44",
  "d": 4,
  "o": "4.4",
  "lv": 5.0,
  "q": "Every week a vulnerability report lists a Linux vulnerability against a Windows server. What would stop this incorrect finding from appearing?",
  "a": [
   "Alert tuning",
   "Application benchmarking",
   "SIEM aggregation",
   "Data archiving"
  ],
  "c": 0,
  "e": "Monitoring tools need ongoing tuning so they stop reporting irrelevant findings, such as a Linux issue on a Windows server. Aggregation and archiving would not remove the false positive.",
  "w": [
   "A monitoring report keeps showing a finding that cannot apply to the system. How should this be fixed?",
   "Which activity reduces false positives such as Linux findings on Windows hosts?"
  ]
 },
 {
  "id": "B45",
  "d": 4,
  "o": "4.3",
  "lv": 5.4,
  "q": "Which value does a company use to express how much of a business activity's value would be lost if a vulnerability were exploited?",
  "a": [
   "Risk tolerance",
   "Vulnerability classification",
   "Environmental variables",
   "Exposure factor"
  ],
  "c": 3,
  "e": "The exposure factor is the percentage of value lost in an incident: a slowdown affecting half the users might be 50%, a total outage 100%. It is multiplied by asset value to get the SLE.",
  "w": [
   "What is the percentage of an asset's value lost in a single incident called?",
   "Which risk term describes the fraction of value lost when a threat is realized?"
  ]
 },
 {
  "id": "B46",
  "d": 5,
  "o": "5.4",
  "lv": 5.0,
  "q": "An administrator is designing a network to comply with a security standard for storing card numbers. Which choice BEST supports compliance?",
  "a": [
   "RAID on all storage",
   "A UPS on all servers",
   "Redundant DNS servers",
   "Regular audits and vulnerability scans"
  ],
  "c": 3,
  "e": "Card-data standards focus on keeping the data confidential, and regular audits and vulnerability scans are required to show that. RAID, UPS and redundant DNS improve availability but do not demonstrate compliance.",
  "w": [
   "Which measure is most directly tied to compliance for systems that store card data?",
   "To meet a payment card security standard, which activity is most important?"
  ]
 },
 {
  "id": "B47",
  "d": 5,
  "o": "5.3",
  "lv": 4.3,
  "q": "One of the bids for an upcoming project comes from a business owned by a member of the company's board. Which of the following describes this situation?",
  "a": [
   "Due diligence",
   "Vendor monitoring",
   "Conflict of interest",
   "Right-to-audit"
  ],
  "c": 2,
  "e": "A conflict of interest exists when a personal or family interest could compromise the judgment of the people involved in a decision. Due diligence and vendor monitoring are assessment activities.",
  "w": [
   "A board member owns a company bidding for a contract. What issue does this raise?",
   "Which term describes a personal interest that could affect a business decision?"
  ]
 },
 {
  "id": "B48",
  "d": 4,
  "o": "4.6",
  "lv": 3.5,
  "q": "A new application requires a hardware token that generates codes. Which authentication factor does the token provide?",
  "a": [
   "Something you know",
   "Somewhere you are",
   "Something you are",
   "Something you have"
  ],
  "c": 3,
  "e": "The user must possess the physical token, which makes it something you have.",
  "w": [
   "Which factor category is a hardware code-generating token?",
   "A login requires possession of a physical token. What type of factor is this?"
  ]
 },
 {
  "id": "B49",
  "d": 5,
  "o": "5.3",
  "lv": 4.2,
  "q": "A company signs a service level agreement with its internet provider. Which statement BEST reflects what an SLA contains?",
  "a": [
   "The customer will connect to remote sites over IPsec",
   "The provider will deliver 99.99% uptime",
   "The customer's applications use HTTPS on TCP 443",
   "The customer's busiest day is the 15th of each month"
  ],
  "c": 1,
  "e": "An SLA sets minimum service terms such as uptime and response times. How the customer connects or when its traffic peaks are not provider commitments.",
  "w": [
   "Which of these is a typical term in a service level agreement?",
   "What kind of commitment does an SLA with a service provider usually include?"
  ]
 },
 {
  "id": "B50",
  "d": 2,
  "o": "2.4",
  "lv": 4.5,
  "q": "An attacker creates many social media accounts and posts false information to attract media attention. Which attack is this?",
  "a": [
   "On-path",
   "Watering hole",
   "Misinformation campaign",
   "Phishing"
  ],
  "c": 2,
  "e": "A misinformation or disinformation campaign spreads false information through social and traditional media to influence opinion. The other options are technical or phishing-based attacks.",
  "w": [
   "Using fake social media accounts to spread false stories is which type of attack?",
   "Which attack deliberately spreads false information through social and traditional media?"
  ]
 },
 {
  "id": "B51",
  "d": 3,
  "o": "3.3",
  "lv": 4.8,
  "q": "What is the BEST way to protect card account information during real-time purchase authorizations?",
  "a": [
   "Masking",
   "DLP",
   "Tokenization",
   "NGFW"
  ],
  "c": 2,
  "e": "Tokenization substitutes a token for the card number during the transaction, so the real number is not sent across the network. Masking only hides display, and DLP and firewalls do not protect the value in the transaction.",
  "w": [
   "Which technique protects a card number while a payment is being authorized?",
   "During live payment authorization, how can the card number be kept from exposure?"
  ]
 },
 {
  "id": "B52",
  "d": 3,
  "o": "3.3",
  "lv": 4.4,
  "q": "A company must, by law, store customer data in the same country as the customer's mailing address. Which concept does this requirement describe?",
  "a": [
   "Geographic dispersion",
   "Least privilege",
   "Data sovereignty",
   "Exfiltration"
  ],
  "c": 2,
  "e": "Data sovereignty means data is subject to the laws of the country where it resides, which can require it to stay within that country. Geographic dispersion spreads sites for resilience.",
  "w": [
   "Laws requiring data to stay inside a particular country relate to which concept?",
   "Which term describes legal control over data based on where it is stored?"
  ]
 },
 {
  "id": "B53",
  "d": 4,
  "o": "4.1",
  "lv": 4.0,
  "q": "A company is installing access points at all of its remote sites. Which option provides confidentiality for all wireless data?",
  "a": [
   "802.1X",
   "WPA3",
   "RADIUS",
   "MDM"
  ],
  "c": 1,
  "e": "WPA3 encrypts the data sent over the wireless network. 802.1X and RADIUS handle authentication, and MDM manages devices.",
  "w": [
   "Which wireless protocol encrypts all traffic over the air?",
   "To keep wireless traffic confidential, which technology should the access points use?"
  ]
 },
 {
  "id": "B54",
  "d": 2,
  "o": "2.4",
  "lv": 5.6,
  "q": "A keylogger was found inside an update to the company's accounting software. Which measure would stop the captured keystrokes from being sent to the attacker?",
  "a": [
   "Preventing the installation of all software",
   "Blocking unknown outbound traffic at the internet firewall",
   "Installing host-based antivirus",
   "Scanning incoming email attachments"
  ],
  "c": 1,
  "e": "A keylogger records keystrokes and then sends them out; blocking unknown outbound traffic stops the second step even though the software is already installed. The other options aim at preventing installation, which has already happened.",
  "w": [
   "What control prevents a keylogger from transmitting collected data off the network?",
   "A keylogger is already installed via a software update. Which control blocks it from sending its logs out?"
  ]
 },
 {
  "id": "B55",
  "d": 1,
  "o": "1.4",
  "lv": 6.6,
  "q": "A marketing user cannot join the WPA3/802.1X wireless network. After entering their username and password they see: 'The credentials provided by the server could not be validated. RADIUS server: radius.example.com. Root CA: Example.com Internal CA Root Certificate.' What is the MOST likely cause?",
  "a": [
   "The computer is in the wrong VLAN",
   "The RADIUS server is not responding",
   "The computer does not support WPA3",
   "The wireless signal is too weak",
   "The client does not have the internal root CA certificate installed"
  ],
  "c": 4,
  "e": "The message says the server's credentials could not be validated: the client does not trust the internal CA that signed the RADIUS certificate, so that root certificate needs to be installed. The server did respond, and VLAN, WPA3 support and signal strength would produce different errors.",
  "w": [
   "An 802.1X wireless login fails because the client cannot validate the RADIUS server's credentials. Why?",
   "Which issue causes an 802.1X client to reject a server whose certificate chains to an internal root CA?"
  ]
 },
 {
  "id": "B56",
  "d": 2,
  "o": "2.4",
  "lv": 4.6,
  "q": "A new policy bans MD5 hashes because of collision problems. What is a hash collision?",
  "a": [
   "Two different messages have different hashes",
   "The original message can be derived from the hash",
   "Two identical messages have the same hash",
   "Two different messages produce the same hash"
  ],
  "c": 3,
  "e": "A collision is two different inputs producing the same hash, which lets an attacker substitute content without changing the hash. Identical inputs should always give the same hash, and hashes cannot be reversed.",
  "w": [
   "Why is a hashing algorithm considered broken if it has collisions?",
   "What has happened when a hash algorithm produces a collision?"
  ]
 },
 {
  "id": "B57",
  "d": 2,
  "o": "2.5",
  "lv": 5.3,
  "q": "An administrator must harden internal web servers so that access can be limited to certain IP ranges and all transferred data stays confidential. Which TWO steps should be included? (Select TWO).",
  "a": [
   "Change the administrator password",
   "Use HTTPS for all server communication",
   "Uninstall unused software",
   "Enable a host-based firewall",
   "Install the latest operating system update"
  ],
  "c": [
   1,
   3
  ],
  "e": "HTTPS encrypts all traffic between clients and the server, and a host-based firewall can allow or deny connections by IP range. The other steps are good hardening practice but do not meet these two requirements.",
  "w": [
   "Which TWO controls restrict web server access by IP range and keep the traffic confidential? (Select TWO).",
   "To limit which addresses reach a web server and encrypt its traffic, which TWO measures are needed? (Select TWO)."
  ]
 },
 {
  "id": "B58",
  "d": 4,
  "o": "4.8",
  "lv": 4.3,
  "q": "Ransomware has been found on a database server, which has been quarantined. What should be followed to keep the evidence trustworthy?",
  "a": [
   "E-discovery",
   "Non-repudiation",
   "Chain of custody",
   "Legal hold"
  ],
  "c": 2,
  "e": "Chain of custody records who handled the evidence and when, which preserves its integrity for later use. Legal hold preserves records for litigation, and e-discovery is collecting documents for legal proceedings.",
  "w": [
   "Which process documents everyone who handles evidence so its integrity can be proven?",
   "What preserves the integrity of evidence collected from a compromised server?"
  ]
 },
 {
  "id": "B59",
  "d": 3,
  "o": "3.1",
  "lv": 4.0,
  "q": "What is the BEST option for testing applications in an environment that is completely separated from the production network?",
  "a": [
   "Virtualization",
   "VLANs",
   "Cloud computing",
   "Air gap"
  ],
  "c": 3,
  "e": "An air gap removes all connectivity between the networks, so no communication path exists. VLANs and virtualization separate logically but still share infrastructure.",
  "w": [
   "Which design guarantees no network path at all between a test environment and production?",
   "To fully isolate a test network from production, what should be used?"
  ]
 },
 {
  "id": "B60",
  "d": 3,
  "o": "3.2",
  "lv": 4.7,
  "q": "A new IPS is being installed, and the network must keep working if the IPS is switched off or fails. Which configuration is this?",
  "a": [
   "Containerization",
   "Load balancing",
   "Fail open",
   "Tunneling"
  ],
  "c": 2,
  "e": "A fail-open IPS lets traffic continue if it fails, keeping the network available at the cost of temporary inspection. Fail closed would stop all traffic.",
  "w": [
   "Which failure mode keeps traffic flowing when an in-line security device goes down?",
   "If an IPS fails, the network must stay up. How should the IPS be configured?"
  ]
 },
 {
  "id": "B61",
  "d": 3,
  "o": "3.3",
  "lv": 4.8,
  "q": "Which technique hides data from others by embedding it inside a different type of media, such as an image?",
  "a": [
   "Hashing",
   "Obfuscation",
   "Encryption",
   "Masking"
  ],
  "c": 1,
  "e": "Obfuscation makes information hard to see or understand; steganography, hiding a file inside an image, is one form. Encryption makes data unreadable without a key, but does not hide that it exists.",
  "w": [
   "Concealing a document inside an image file is an example of which data protection approach?",
   "What is the practice of hiding data inside other media to make it hard to see?"
  ]
 },
 {
  "id": "B62",
  "d": 2,
  "o": "2.1",
  "lv": 5.5,
  "q": "When defending against a hacktivist, which vulnerability is the MOST significant concern?",
  "a": [
   "Data center access that requires only one factor",
   "Spoofed internal IP addresses on an intranet server",
   "A weak cipher on employee VPN connections",
   "Missing patches on an internet-facing database server"
  ],
  "c": 3,
  "e": "A hacktivist usually attacks from the internet, so an unpatched internet-facing server is the easiest way in. The other weaknesses require physical presence, internal network access or a captured VPN session.",
  "w": [
   "Which weakness would a remote hacktivist most easily exploit?",
   "Of these vulnerabilities, which one is most exposed to an external hacktivist?"
  ]
 },
 {
  "id": "B63",
  "d": 3,
  "o": "3.2",
  "lv": 4.0,
  "q": "A company is installing an appliance to protect its web applications from SQL injection and unexpected input. Which of the following BEST describes it?",
  "a": [
   "WAF",
   "VPN concentrator",
   "UTM",
   "SASE"
  ],
  "c": 0,
  "e": "A web application firewall inspects HTTP traffic for application attacks such as injection, XSS and invalid input. A UTM is a general-purpose appliance, and the other options provide remote access.",
  "w": [
   "Which security device is designed to filter attacks against web applications?",
   "What appliance protects web apps from injection and malformed input?"
  ]
 },
 {
  "id": "B64",
  "d": 4,
  "o": "4.8",
  "lv": 4.4,
  "q": "What is the BEST way to tell whether files have been changed after forensic data was acquired?",
  "a": [
   "Use tamper seals on all storage devices",
   "Create a hash of the data",
   "Image each device again for comparison",
   "Take screenshots of directories and file sizes"
  ],
  "c": 1,
  "e": "A hash taken at acquisition can be recalculated at any time; if it still matches, the data is unchanged. Seals protect the physical media, and screenshots or file sizes cannot reliably detect content changes.",
  "w": [
   "How can investigators later prove that acquired evidence has not been modified?",
   "Which method detects any change to forensic data after collection?"
  ]
 },
 {
  "id": "B65",
  "d": 4,
  "o": "4.6",
  "lv": 3.6,
  "q": "A new password policy requires letters, numbers and special characters in every password. Which setting enforces this?",
  "a": [
   "Length",
   "Expiration",
   "Reuse",
   "Complexity"
  ],
  "c": 3,
  "e": "Complexity rules require a mix of character types. Length sets a minimum number of characters, expiration forces changes, and reuse prevents old passwords.",
  "w": [
   "Requiring different character types in passwords is which password setting?",
   "Which password control mandates a mix of letters, digits and symbols?"
  ]
 },
 {
  "id": "B66",
  "d": 1,
  "o": "1.3",
  "lv": 3.6,
  "q": "Which process should a company follow to deploy a weekly operating system patch?",
  "a": [
   "Tabletop exercise",
   "Penetration testing",
   "Change management",
   "Internal audit"
  ],
  "c": 2,
  "e": "Change management is the formal process for planning, approving, testing and deploying changes, including patches.",
  "w": [
   "Rolling out a routine OS patch should go through which formal process?",
   "Which process controls and manages planned changes such as patches?"
  ]
 },
 {
  "id": "B67",
  "d": 2,
  "o": "2.4",
  "lv": 4.8,
  "q": "What is the MOST likely consequence of an application communicating in plaintext?",
  "a": [
   "Buffer overflow",
   "Replay attack",
   "Resource consumption",
   "Directory traversal"
  ],
  "c": 1,
  "e": "A replay attack requires capturing valid traffic, which is easy when it is not encrypted. The other attacks do not depend on capturing plaintext traffic.",
  "w": [
   "Unencrypted application traffic makes which attack easy?",
   "If an application sends data without encryption, which attack becomes simple to carry out?"
  ]
 },
 {
  "id": "B68",
  "d": 4,
  "o": "4.5",
  "lv": 4.7,
  "q": "A Linux administrator restores some configuration files that were changed without authorization and wants to be alerted if they change again. Which tool is BEST?",
  "a": [
   "HIPS",
   "File integrity monitoring",
   "Application allow list",
   "WAF"
  ],
  "c": 1,
  "e": "File integrity monitoring tracks file contents (typically with hashes) and alerts when they change. A HIPS blocks attacks, an allow list controls which apps run, and a WAF protects web apps.",
  "w": [
   "Which tool raises an alert when the contents of important files change?",
   "What should be deployed to detect future unauthorized changes to configuration files?"
  ]
 },
 {
  "id": "B69",
  "d": 4,
  "o": "4.6",
  "lv": 5.3,
  "q": "An administrator is updating the network to support 802.1X. Which of the following is the BEST choice to provide the back-end authentication?",
  "a": [
   "LDAP",
   "SIEM",
   "SNMP traps",
   "SPF"
  ],
  "c": 0,
  "e": "802.1X relies on a central authentication source; LDAP (as well as RADIUS, TACACS+ or Kerberos) can provide it. A SIEM collects logs, SNMP traps report events, and SPF is for email.",
  "w": [
   "Which protocol can supply centralized credentials for 802.1X authentication?",
   "802.1X needs a central identity source. Which of these provides it?"
  ]
 },
 {
  "id": "B70",
  "d": 3,
  "o": "3.1",
  "lv": 4.3,
  "q": "A company's time-clock appliance gives no access to its operating system and offers no way to update its firmware. Which of the following describes it?",
  "a": [
   "End-of-life",
   "ICS",
   "SDN",
   "Embedded system"
  ],
  "c": 3,
  "e": "Embedded systems are purpose-built devices that often expose no OS and may offer no firmware upgrade path. End-of-life refers to support status, ICS to industrial control, and SDN to networking.",
  "w": [
   "A purpose-built device with no OS access and no firmware updates is what type of system?",
   "Which term describes a single-purpose device whose software cannot be accessed or upgraded?"
  ]
 },
 {
  "id": "B71",
  "d": 4,
  "o": "4.2",
  "lv": 5.3,
  "q": "Every company laptop is enumerated each time a user logs in. Which capability does this support?",
  "a": [
   "Alerting the security team if the hardware is changed",
   "Automatically deleting any malware found",
   "Requiring two authentication factors",
   "Placing the laptop in a private VLAN after login"
  ],
  "c": 0,
  "e": "Enumeration records the installed hardware and software, so a change between logins can trigger an alert. It does not remove malware, add factors or change VLANs.",
  "w": [
   "What does inventorying a laptop's hardware and software at each login allow the security team to do?",
   "Which benefit comes from enumerating devices at every login?"
  ]
 },
 {
  "id": "B72",
  "d": 2,
  "o": "2.5",
  "lv": 6.4,
  "q": "A manager suspects an employee is bypassing corporate internet controls by connecting their laptop to a cellular hotspot. Which TWO sources could confirm this? (Select TWO).",
  "a": [
   "HIPS logs",
   "UTM logs",
   "Web application firewall events",
   "Host-based firewall logs",
   "Next-generation firewall logs"
  ],
  "c": [
   0,
   3
  ],
  "e": "Traffic over a hotspot never reaches corporate network devices, so the only evidence is on the laptop itself: its host-based IPS and host-based firewall logs. UTM, WAF and NGFW logs would show nothing.",
  "w": [
   "Traffic sent over a personal hotspot never crosses the corporate network. Which TWO data sources would still show it? (Select TWO).",
   "To prove a laptop used a cellular hotspot, which TWO logs should be checked? (Select TWO)."
  ]
 },
 {
  "id": "B73",
  "d": 1,
  "o": "1.4",
  "lv": 5.5,
  "q": "A mobile app needs a true random number generator and real-time memory encryption. Which technology is the BEST choice?",
  "a": [
   "HSM",
   "Secure enclave",
   "NGFW",
   "Self-signed certificates"
  ],
  "c": 1,
  "e": "A secure enclave is a protected processor area that can generate true random numbers, encrypt memory, store keys and monitor the boot process. An HSM is a separate appliance, not part of a phone.",
  "w": [
   "Which hardware security feature in a phone provides true random numbers and protected memory?",
   "What processor feature should a mobile app use for hardware randomness and memory encryption?"
  ]
 },
 {
  "id": "B74",
  "d": 4,
  "o": "4.3",
  "lv": 3.8,
  "q": "What is a typical output of a successful vulnerability scan?",
  "a": [
   "Usernames and password hashes from a server",
   "A list of missing software patches",
   "Copies of files from a private share",
   "A server's BIOS configuration"
  ],
  "c": 1,
  "e": "A vulnerability scan identifies weaknesses and the patches or fixes associated with them. It does not extract credentials, files or firmware settings.",
  "w": [
   "Which result does a vulnerability scan normally produce?",
   "A completed vulnerability scan usually provides what?"
  ]
 },
 {
  "id": "B75",
  "d": 2,
  "o": "2.2",
  "lv": 5.0,
  "q": "At a remote site, wireless users receive IP addresses outside the corporate address scheme, and the connection is slower than elsewhere in the building. What is the MOST likely cause?",
  "a": [
   "Rogue access point",
   "Domain hijack",
   "DDoS",
   "Encryption is enabled"
  ],
  "c": 0,
  "e": "An unauthorized access point added to the network can hand out its own addresses and perform poorly, which matches these symptoms. Domain hijacking and DDoS would not change the client addresses.",
  "w": [
   "Wi-Fi clients get unexpected IP addresses and slow connections at one site. What is most likely?",
   "An unauthorized wireless device is handing out its own addresses. Which issue is this?"
  ]
 },
 {
  "id": "B76",
  "d": 4,
  "o": "4.4",
  "lv": 5.2,
  "q": "A server has been compromised, and the security team wants to know whether the attacker used it to reach other systems. Which source is BEST for this?",
  "a": [
   "DNS server logs",
   "A penetration test",
   "NetFlow logs",
   "Email metadata"
  ],
  "c": 2,
  "e": "NetFlow records summaries of network conversations, showing every system the compromised server talked to. DNS logs show only name lookups, email metadata covers mail, and a penetration test generates new activity rather than revealing past activity.",
  "w": [
   "Which data source summarizes every network conversation a compromised host had with other systems?",
   "To trace lateral movement from a breached server, which logs should be reviewed?"
  ]
 },
 {
  "id": "B77",
  "d": 1,
  "o": "1.4",
  "lv": 3.6,
  "q": "An administrator encrypts system backups with a key and uses the same key to decrypt them during a restore. Which type of encryption is this?",
  "a": [
   "Asymmetric",
   "Key escrow",
   "Symmetric",
   "Out-of-band key exchange"
  ],
  "c": 2,
  "e": "Symmetric encryption uses a single shared key for both encryption and decryption. Asymmetric uses a key pair, and escrow and key exchange concern how keys are stored or shared.",
  "w": [
   "Encryption that uses one shared key for both encrypting and decrypting is called what?",
   "Which encryption type uses the same key to lock and unlock data?"
  ]
 },
 {
  "id": "B78",
  "d": 4,
  "o": "4.5",
  "lv": 5.7,
  "q": "New malware exploits a popular email client and forwards every attachment containing card numbers to an outside address. What would limit the scope of this attack?",
  "a": [
   "Enable MFA on the email client",
   "Scan outgoing traffic with DLP",
   "Require the VPN when using email",
   "Update the firewall's malicious URL list"
  ],
  "c": 1,
  "e": "Data loss prevention inspects outgoing traffic for sensitive information such as card numbers and can block the transfer. MFA, VPN use and URL lists do not stop installed malware from sending mail.",
  "w": [
   "Which control could block malware from emailing card data outside the company?",
   "Malware forwards sensitive attachments externally. Which measure would stop the data leaving?"
  ]
 },
 {
  "id": "B79",
  "d": 4,
  "o": "4.8",
  "lv": 4.4,
  "q": "An organization has detected a breach and removed the affected servers from the network. What is the NEXT step in the incident response process?",
  "a": [
   "Eradication",
   "Preparation",
   "Recovery",
   "Detection",
   "Containment"
  ],
  "c": 0,
  "e": "Removing the servers from the network was containment; next comes eradication, removing the malware and compromised accounts, followed by recovery. The full sequence is preparation, detection, analysis, containment, eradication, recovery and lessons learned.",
  "w": [
   "After containment, which incident-response phase comes next?",
   "The compromised servers are isolated. What should the team do now?"
  ]
 },
 {
  "id": "B80",
  "d": 5,
  "o": "5.4",
  "lv": 4.5,
  "q": "A security administrator must store and protect customers' payment and shipping details for three years. Who is the source of this personal data?",
  "a": [
   "Controller",
   "Owner",
   "Data subject",
   "Processor"
  ],
  "c": 2,
  "e": "The data subject is the individual the personal data describes, here the customer. The controller decides how the data is used, and the processor handles it on the controller's behalf.",
  "w": [
   "In privacy terms, what is the individual whose personal information is collected called?",
   "Customers' payment and shipping details come from which privacy role?"
  ]
 },
 {
  "id": "B81",
  "d": 3,
  "o": "3.2",
  "lv": 5.8,
  "q": "Why would an administrator use a TPM when setting up full-disk encryption? (Select TWO).",
  "a": [
   "It allows encryption of multiple volumes",
   "It provides keys burned into the hardware",
   "It stores certificates in a hardware security module",
   "It keeps a copy of the CRL",
   "It has built-in protection against brute-force attacks"
  ],
  "c": [
   1,
   4
  ],
  "e": "A TPM is a chip on the motherboard that provides hardware-bound keys and includes anti-hammering protection against brute-force attempts. It is not an HSM and does not handle CRLs or volume counts.",
  "w": [
   "Which TWO benefits does a TPM provide for full-disk encryption? (Select TWO).",
   "Choose the TWO main reasons a TPM is used with full-disk encryption. (Select TWO)."
  ]
 },
 {
  "id": "B82",
  "d": 4,
  "o": "4.6",
  "lv": 4.3,
  "q": "Each file and folder is assigned a classification such as 'confidential' or 'secret', and each user is given a maximum clearance level. Which access control model is this?",
  "a": [
   "Mandatory",
   "Rule-based",
   "Discretionary",
   "Role-based"
  ],
  "c": 0,
  "e": "Mandatory access control assigns labels to objects and clearances to users; users can access only objects at or below their clearance. Owners cannot change this, unlike discretionary access control.",
  "w": [
   "Access based on matching user clearance to object classification labels is which model?",
   "Which access control model uses security labels on objects and clearances for users?"
  ]
 },
 {
  "id": "B83",
  "d": 2,
  "o": "2.5",
  "lv": 4.6,
  "q": "A report shows many internal devices connecting to servers in the data center network. What should be added to prevent internal systems from reaching data center devices?",
  "a": [
   "VPN",
   "IPS",
   "SIEM",
   "ACL"
  ],
  "c": 3,
  "e": "An access control list on a router or firewall allows or denies traffic between networks. A SIEM reports, an IPS looks for attacks, and a VPN creates tunnels.",
  "w": [
   "Which control on a router can restrict which internal hosts reach the data center?",
   "To block traffic from user networks to data center servers, what should be configured?"
  ]
 },
 {
  "id": "B84",
  "d": 4,
  "o": "4.2",
  "lv": 4.3,
  "q": "A financial company is based in an area frequently hit by tropical storms and hurricanes. What is MOST important for restoring services after a storm?",
  "a": [
   "Disaster recovery plan",
   "Stakeholder management",
   "Change management",
   "Retention policies"
  ],
  "c": 0,
  "e": "A disaster recovery plan defines how to restore services after large-scale outages such as natural disasters. Change management controls routine changes, and retention policies govern how long data is kept.",
  "w": [
   "Which plan guides the restoration of services after a large-scale natural disaster?",
   "After a hurricane takes services offline, which document should the company follow?"
  ]
 },
 {
  "id": "B85",
  "d": 2,
  "o": "2.4",
  "lv": 5.0,
  "q": "A user's shipping software has slowed down. An antivirus scan found nothing, but a deeper malware scan found a kernel driver that was not part of the original operating system. Which malware is this?",
  "a": [
   "Rootkit",
   "Logic bomb",
   "Bloatware",
   "Ransomware",
   "Keylogger"
  ],
  "c": 0,
  "e": "Rootkits hide at the kernel level, often through added drivers or modified system files, so normal antivirus may miss them. The other types do not typically install hidden kernel drivers.",
  "w": [
   "Malware hidden in an unauthorized kernel driver that evades normal antivirus is most likely what?",
   "Which malware type modifies the OS kernel to stay invisible?"
  ]
 },
 {
  "id": "B86",
  "d": 4,
  "o": "4.9",
  "lv": 4.0,
  "q": "A virus scanner finds a macro virus in a word-processing file attached to an email. Which information can be obtained from the file's metadata?",
  "a": [
   "The IPS signature name and number",
   "The operating system version",
   "The date and time the file was created",
   "The alert disposition"
  ],
  "c": 2,
  "e": "Document metadata commonly includes creation and modification dates, the author and the application used. Signature names and dispositions come from the security tools, not the file.",
  "w": [
   "What kind of information is stored in a document's metadata?",
   "Which detail would a document's metadata typically reveal?"
  ]
 },
 {
  "id": "B87",
  "d": 1,
  "o": "1.2",
  "lv": 4.0,
  "q": "People entering a data center must check in before going further, and people leaving must be checked out before they can exit. Which control BEST supports this?",
  "a": [
   "Access control vestibule",
   "Air gap",
   "Pressure sensors",
   "Bollards"
  ],
  "c": 0,
  "e": "An access control vestibule has interlocking doors so people must stop and be verified before moving through in either direction. An air gap is a network concept, sensors detect, and bollards stop vehicles.",
  "w": [
   "Which physical control makes each person stop and be processed when entering or leaving a secure facility?",
   "To control the flow of people in and out of a data center, what should be installed?"
  ]
 },
 {
  "id": "B88",
  "d": 1,
  "o": "1.4",
  "lv": 4.0,
  "q": "An employee is caught leaking confidential information by hiding it inside image files and emailing the images to a third party. Which technique is this?",
  "a": [
   "Digital signatures",
   "Steganography",
   "Salting",
   "Data masking"
  ],
  "c": 1,
  "e": "Steganography hides data inside other files, commonly images, so it is not noticed. The other options are integrity, hashing and display-protection techniques.",
  "w": [
   "Hiding data inside pictures to sneak it out of an organization is called what?",
   "Which technique conceals one file inside another, such as data inside an image?"
  ]
 },
 {
  "id": "B89",
  "d": 5,
  "o": "5.5",
  "lv": 4.4,
  "q": "A testing firm hired to assess a company's public web servers is given the servers' external IP addresses and nothing else. Which describes this test?",
  "a": [
   "Defensive",
   "Active reconnaissance",
   "Partially known environment",
   "Regulatory"
  ],
  "c": 2,
  "e": "Providing some but not all information, such as the external IPs, makes it a partially known (gray box) environment.",
  "w": [
   "Testers get only the external IP addresses of the targets. Which test type is this?",
   "A penetration test with limited information about the target is called what?"
  ]
 },
 {
  "id": "B90",
  "d": 5,
  "o": "5.2",
  "lv": 4.4,
  "q": "Which term describes the estimated number of laptops that might be stolen in one fiscal year?",
  "a": [
   "ALE",
   "SLE",
   "ARO",
   "MTTR"
  ],
  "c": 2,
  "e": "The annualized rate of occurrence (ARO) is how many times an event is expected per year. SLE is the cost of one event and ALE is the yearly cost.",
  "w": [
   "How many times an event is expected to happen in a year is described by which metric?",
   "If a company expects seven laptop thefts a year, which risk metric is seven?"
  ]
 },
 {
  "id": "C6",
  "d": 4,
  "o": "4.2",
  "lv": 5.0,
  "q": "A finance company must legally keep seven years of tax records for every customer. What is the BEST way to meet this requirement?",
  "a": [
   "A script that deletes tax data older than seven years",
   "Print and store records on a seven-year cycle",
   "Let users download records from their accounts",
   "A separate daily backup archive of all applicable tax records"
  ],
  "c": 3,
  "e": "Retention means the data must remain available for the full period; a dedicated daily archive ensures it is preserved. Deleting old data does not preserve anything, printing is unreliable, and user downloads do not meet the obligation.",
  "w": [
   "How should a company make sure seven years of required tax records are always available?",
   "Which approach BEST satisfies a seven-year retention mandate for customer tax records?"
  ]
 },
 {
  "id": "C7",
  "d": 1,
  "o": "1.4",
  "lv": 4.6,
  "q": "An administrator designing a public cloud deployment for an insurer wants encryption keys rotated automatically on a regular schedule. What provides this?",
  "a": [
   "TPM",
   "Key management system",
   "Secure enclave",
   "XDR"
  ],
  "c": 1,
  "e": "A key management system creates, assigns, rotates and logs keys from a central console. A TPM and secure enclave protect keys on a single device, and XDR is a detection platform.",
  "w": [
   "Which system centrally creates, rotates and audits encryption keys?",
   "What should be used to automate regular key rotation in the cloud?"
  ]
 },
 {
  "id": "C8",
  "d": 4,
  "o": "4.4",
  "lv": 4.6,
  "q": "A newly installed IPS flags a legitimate corporate application's traffic as malicious. What is the BEST way to fix this?",
  "a": [
   "Disable the IPS signature",
   "Block the application",
   "Log all IPS events",
   "Tune the IPS alerts"
  ],
  "c": 3,
  "e": "Tuning adjusts the signature so legitimate traffic passes while real attacks are still caught. Disabling the signature removes protection, and blocking the app breaks the business.",
  "w": [
   "An IPS blocks a legitimate business application. What should be done?",
   "How should a false positive from an IPS signature be handled?"
  ]
 },
 {
  "id": "C9",
  "d": 4,
  "o": "4.1",
  "lv": 4.4,
  "q": "An internally developed web application lets users modify SQL queries through its front end. Which change would fix this?",
  "a": [
   "Store credentials as salted hashes",
   "Verify the application's digital signature",
   "Validate all application input",
   "Obfuscate the source code"
  ],
  "c": 2,
  "e": "Input validation (with parameterized queries) ensures user input is what is expected and cannot change the query. Hashes, signatures and obfuscation do not address injection.",
  "w": [
   "Which coding practice prevents users from altering SQL queries through a web form?",
   "To stop SQL manipulation through an application's front end, what should developers add?"
  ]
 },
 {
  "id": "C10",
  "d": 4,
  "o": "4.6",
  "lv": 3.4,
  "q": "A fingerprint scanner is being installed to control access to the data center. Which authentication factor does it use?",
  "a": [
   "Digital signature",
   "Hard authentication token",
   "Security key",
   "Something you are"
  ],
  "c": 3,
  "e": "A fingerprint is a physical characteristic: something you are.",
  "w": [
   "A fingerprint reader authenticates using which factor?",
   "Which factor category is a biometric such as a fingerprint?"
  ]
 },
 {
  "id": "C11",
  "d": 5,
  "o": "5.2",
  "lv": 4.5,
  "q": "A company keeps spare switch interface cards on site; when one fails, a technician replaces it and has the system running again in sixty minutes. Which metric describes this?",
  "a": [
   "MTBF",
   "MTTR",
   "RPO",
   "RTO"
  ],
  "c": 1,
  "e": "Mean time to repair (or restore) is the time needed to get a failed system working again. MTBF is time between failures, and RPO and RTO are business recovery objectives.",
  "w": [
   "The typical time to get a failed component working again is which metric?",
   "Which recovery metric is improved by keeping spare parts on site?"
  ]
 },
 {
  "id": "C12",
  "d": 2,
  "o": "2.1",
  "lv": 5.6,
  "q": "Servers in a data center are only reachable internally. A group of them was breached before the latest patches were applied, and no breach attempts were logged on any other servers. Which threat actor is MOST likely responsible?",
  "a": [
   "Organized crime",
   "Insider",
   "Nation state",
   "Unskilled attacker"
  ],
  "c": 1,
  "e": "The servers are not reachable from outside, and only the vulnerable ones were targeted, which needs internal access and specific knowledge: an insider. External actors would have to get inside first and would probably have touched other systems.",
  "w": [
   "Only the unpatched internal servers were hit, with no attempts on others. Which attacker is most likely?",
   "An attacker with precise knowledge of which internal servers were vulnerable breached them. Who is the likely threat actor?"
  ]
 },
 {
  "id": "C13",
  "d": 4,
  "o": "4.3",
  "lv": 5.4,
  "q": "A vulnerability scan of the public web servers reports several Java Runtime Environment vulnerabilities, but the administrator confirms Java is not installed on those servers. What is the BEST way to handle the report?",
  "a": [
   "Install the latest JRE",
   "Quarantine the server and scan for malware",
   "Harden the operating system",
   "Dismiss it as a false positive once verified"
  ],
  "c": 3,
  "e": "A finding for software that is not present is a false positive, common with non-credentialed scans; once verified it can be dismissed. Installing Java would add risk, and nothing suggests malware.",
  "w": [
   "A scan reports flaws in software that is not installed on the server. How should the finding be treated?",
   "Scan results list Java vulnerabilities on servers without Java. What is the correct response?"
  ]
 },
 {
  "id": "C14",
  "d": 2,
  "o": "2.4",
  "lv": 4.7,
  "q": "Right after a user installs a free file compression utility, their workstation becomes twice as slow. Which BEST describes this infection?",
  "a": [
   "Ransomware",
   "Bloatware",
   "Logic bomb",
   "Trojan"
  ],
  "c": 3,
  "e": "A Trojan pretends to be legitimate software; the user installs it expecting a useful function and gets malware as well. Bloatware is unwanted but not malicious pre-installed software.",
  "w": [
   "A utility that seemed harmless brought malware with it. What type of malware is this?",
   "Which malware type is disguised as useful software but installs something malicious?"
  ]
 },
 {
  "id": "C15",
  "d": 3,
  "o": "3.3",
  "lv": 3.8,
  "q": "Which process replaces sensitive data with a non-sensitive placeholder that can still be used to complete a transaction?",
  "a": [
   "Steganography",
   "Tokenization",
   "Retention",
   "Masking"
  ],
  "c": 1,
  "e": "Tokenization substitutes a token that works in place of the real value, for example in card payments. Masking only hides it on screen.",
  "w": [
   "What is the substitution of real data with a usable surrogate value called?",
   "Which technique swaps sensitive values for functional tokens?"
  ]
 },
 {
  "id": "C16",
  "d": 4,
  "o": "4.5",
  "lv": 5.0,
  "q": "A new firewall protects a web server VLAN, and the application owner requires all web sessions to be encrypted. Which rule should be added?",
  "a": [
   "Source ANY, Destination ANY, TCP 23, Deny",
   "Source ANY, Destination ANY, TCP 22, Allow",
   "Source ANY, Destination ANY, TCP 80, Allow",
   "Source ANY, Destination ANY, TCP 443, Allow"
  ],
  "c": 3,
  "e": "HTTPS normally uses TCP 443, so allowing 443 permits encrypted web sessions. Port 80 is unencrypted HTTP, 22 is SSH, and 23 is Telnet.",
  "w": [
   "Which firewall rule allows only encrypted web traffic to the web servers?",
   "To permit encrypted web sessions to a server VLAN, which rule is correct?"
  ]
 },
 {
  "id": "C17",
  "d": 4,
  "o": "4.6",
  "lv": 4.3,
  "q": "Which of the following is used to provide multi-factor authentication?",
  "a": [
   "A USB drive with full-disk encryption",
   "An employee policy manual",
   "Just-in-time permissions",
   "A smart card with a picture ID"
  ],
  "c": 3,
  "e": "A smart card holds a certificate (something you have) and is usually combined with a PIN (something you know). The other options are not authentication factors.",
  "w": [
   "Which item is commonly used as an additional authentication factor?",
   "Select the option that serves as a factor in multi-factor authentication."
  ]
 },
 {
  "id": "C18",
  "d": 2,
  "o": "2.2",
  "lv": 5.4,
  "q": "The network team is asked to build an IPsec tunnel to a new business partner. Which security risk is MOST important to consider?",
  "a": [
   "Supply chain attack",
   "Unsupported systems",
   "Business email compromise",
   "Typosquatting"
  ],
  "c": 0,
  "e": "A direct link to a partner gives an attacker who compromises that partner a path into your network, a supply chain risk; a firewall on the link helps. The other risks are not created by the tunnel.",
  "w": [
   "A direct network connection to a partner raises which main security concern?",
   "Which risk grows when an organization links its network to a third party?"
  ]
 },
 {
  "id": "C19",
  "d": 5,
  "o": "5.1",
  "lv": 4.7,
  "q": "HR keeps a list of employees in the savings plan, and an outside financial company uses it to manage their investments. Which role does the financial company have?",
  "a": [
   "Processor",
   "Owner",
   "Controller",
   "Custodian"
  ],
  "c": 0,
  "e": "A data processor acts on the data for the controller, often as a third party. The employer is the controller, deciding why and how the data is used.",
  "w": [
   "A third party that handles personal data on an organization's behalf is called what?",
   "Which privacy role describes an outside firm processing employee data for the employer?"
  ]
 },
 {
  "id": "C20",
  "d": 3,
  "o": "3.1",
  "lv": 4.6,
  "q": "A company builds a military radar system that must detect nearby drones and react instantly without delay. Which of the following BEST describes the system?",
  "a": [
   "RTOS",
   "IoT",
   "ICS",
   "SDN"
  ],
  "c": 0,
  "e": "A real-time operating system processes inputs without significant delay or queuing, which suits military and industrial systems. IoT devices and ICS do not require real-time processing by definition.",
  "w": [
   "A system that must respond to inputs immediately and predictably uses which kind of OS?",
   "Which operating system type guarantees an immediate response for systems like military trackers?"
  ]
 },
 {
  "id": "C21",
  "d": 4,
  "o": "4.7",
  "lv": 4.6,
  "q": "An administrator writes a script that turns an email into a help desk ticket and assigns it to the correct department. What is the script an example of?",
  "a": [
   "Role-based access controls",
   "Federation",
   "Due diligence",
   "Orchestration"
  ],
  "c": 3,
  "e": "Orchestration automates processes, often across multiple systems, such as turning an email into a routed ticket. The other options are access, identity and governance concepts.",
  "w": [
   "Automating the conversion of emails into routed tickets is called what?",
   "Which term describes automating a process across different systems?"
  ]
 },
 {
  "id": "C22",
  "d": 4,
  "o": "4.9",
  "lv": 4.8,
  "q": "A security administrator wants a report of how many attackers are trying to exploit a known vulnerability on the corporate web server. Which source should be used?",
  "a": [
   "Application log",
   "Metadata",
   "IPS log",
   "Windows log"
  ],
  "c": 2,
  "e": "An IPS matches traffic against signatures of known exploits and logs each attempt. Application and Windows logs would not reliably identify exploit attempts.",
  "w": [
   "Which log records attempted exploits of known vulnerabilities?",
   "To count attempts to exploit a known web server flaw, which data source is best?"
  ]
 },
 {
  "id": "C23",
  "d": 4,
  "o": "4.8",
  "lv": 4.0,
  "q": "During a ransomware outbreak, database servers were rebuilt from known-good backups and brought back online. In which incident response phase did this happen?",
  "a": [
   "Recovery",
   "Lessons learned",
   "Containment",
   "Detection"
  ],
  "c": 0,
  "e": "Recovery returns systems to normal operation from clean sources. Containment stops the spread, and lessons learned happens afterward.",
  "w": [
   "Bringing rebuilt servers back into service happens in which phase?",
   "Which phase of incident response restores systems to normal operation?"
  ]
 },
 {
  "id": "C24",
  "d": 2,
  "o": "2.5",
  "lv": 3.8,
  "q": "An administrator is installing a web server on a freshly built operating system. Which step BEST hardens the OS?",
  "a": [
   "Create a backup schedule",
   "Install a device certificate",
   "Remove unnecessary software",
   "Disable power management"
  ],
  "c": 2,
  "e": "Removing unneeded software reduces the attack surface, which is the essence of hardening. Backups, certificates and power settings do not reduce the exposure of the OS.",
  "w": [
   "Which action reduces the attack surface of a new server?",
   "To harden a newly installed operating system, what should be done first?"
  ]
 },
 {
  "id": "C25",
  "d": 2,
  "o": "2.4",
  "lv": 5.6,
  "q": "A network IPS logs this packet: 'TCP 172.16.22.7:3863 -> 10.8.122.244:1433, Application Data: SELECT * FROM users WHERE username='x' or 'x'='x' AND password='x' or 'x'='x''. Which attack is this?",
  "a": [
   "Phishing",
   "Brute force",
   "SQL injection",
   "Cross-site scripting"
  ],
  "c": 2,
  "e": "The query adds conditions that are always true ('x'='x'), bypassing the username and password checks: SQL injection, sent to TCP 1433 (Microsoft SQL Server).",
  "w": [
   "A packet to SQL Server port 1433 contains a login query with 'x'='x' conditions. What is it?",
   "Which attack is shown by a query that makes the username and password checks always true?"
  ]
 },
 {
  "id": "C26",
  "d": 3,
  "o": "3.4",
  "lv": 4.0,
  "q": "An incident response team wants to validate its disaster recovery plans without making any changes to the infrastructure. What is the best approach?",
  "a": [
   "Tabletop exercise",
   "Hot site failover",
   "Simulation",
   "Penetration test"
  ],
  "c": 0,
  "e": "A tabletop exercise walks through the plan in discussion, changing nothing. A failover or simulation exercises real systems, and a penetration test is a different activity.",
  "w": [
   "Which exercise tests a DR plan by discussion only, without touching systems?",
   "How can a team check its recovery plans without changing any infrastructure?"
  ]
 },
 {
  "id": "C27",
  "d": 4,
  "o": "4.5",
  "lv": 5.0,
  "q": "A new firewall is placed between the user network and the data center with default settings, and users can no longer reach an application in the data center. What is the BEST fix?",
  "a": [
   "Add a single rule with an explicit deny",
   "Build a separate VLAN for the application",
   "Create rules that match the application's traffic flows",
   "Enable threat blocking"
  ],
  "c": 2,
  "e": "Firewalls deny traffic by default (implicit deny), so rules must be added for the application's required flows. An explicit deny or threat blocking would block even more.",
  "w": [
   "After enabling a firewall with defaults, an application stops working. How should this be corrected?",
   "A new firewall with default settings blocks a needed application. What should the administrator do?"
  ]
 },
 {
  "id": "C28",
  "d": 3,
  "o": "3.4",
  "lv": 4.5,
  "q": "Which of the following provides high availability for a web-based database application?",
  "a": [
   "SIEM",
   "UPS",
   "DLP",
   "VPN concentrator"
  ],
  "c": 1,
  "e": "A UPS keeps systems running when power is lost, contributing to high availability. A SIEM, DLP and VPN concentrator provide monitoring, data protection and remote access.",
  "w": [
   "Which item on this list keeps a service running if utility power fails?",
   "Of these options, which one contributes to high availability?"
  ]
 },
 {
  "id": "C29",
  "d": 5,
  "o": "5.2",
  "lv": 4.2,
  "q": "Each year a number of laptops are lost or stolen and must be replaced. Which term describes the total yearly cost of these replacements?",
  "a": [
   "SLE",
   "SLA",
   "ALE",
   "ARO"
  ],
  "c": 2,
  "e": "The annualized loss expectancy is the total expected loss over a year (SLE × ARO). The SLE is one event's cost and the ARO is how often it happens.",
  "w": [
   "What is the expected financial loss from a risk over one year called?",
   "Which metric gives the yearly cost of recurring laptop losses?"
  ]
 },
 {
  "id": "C30",
  "d": 4,
  "o": "4.1",
  "lv": 6.2,
  "q": "A web server log contains this request: '/?s=/Index/think/app/invokefunction&function=call_user_func_array&vars[0]=md5&vars[1][0]=__HelloThinkPHP'. What is the BEST way to prevent this attack?",
  "a": [
   "A static code analyzer",
   "Input validation",
   "An allow list",
   "Secure cookies"
  ],
  "c": 1,
  "e": "The request tries to make the application call arbitrary functions, a remote code execution attempt. Strict input validation would reject such unexpected parameters. Static analysis finds bugs in development, and secure cookies are unrelated.",
  "w": [
   "A request tries to call server-side functions through URL parameters. Which control prevents it?",
   "Which secure coding practice stops a remote code execution attempt passed in query parameters?"
  ]
 },
 {
  "id": "C31",
  "d": 1,
  "o": "1.4",
  "lv": 4.6,
  "q": "Sam wants to email Jack so that Jack can confirm the message really came from Sam. What should Sam do?",
  "a": [
   "Sign it with Sam's private key",
   "Sign it with Sam's public key",
   "Sign it with Jack's private key",
   "Sign it with Jack's public key"
  ],
  "c": 0,
  "e": "A sender signs with their own private key, and anyone can verify the signature with the sender's public key. Sam does not have Jack's private key, and public keys cannot create signatures.",
  "w": [
   "How does a sender let the recipient verify who sent a message?",
   "Which key does a sender use to sign a message so others can verify its origin?"
  ]
 },
 {
  "id": "C32",
  "d": 5,
  "o": "5.1",
  "lv": 5.2,
  "q": "A long-term temporary employee's contract is ending. What is the MOST important part of their offboarding?",
  "a": [
   "An on-demand audit of the user's privileges",
   "Archiving the decryption keys tied to the account",
   "Documenting outstanding tasks",
   "Obtaining a signed acceptable use policy"
  ],
  "c": 1,
  "e": "Without the user's decryption keys, files they encrypted could never be recovered once they leave. The other steps are useful but would not cause permanent data loss if missed.",
  "w": [
   "During offboarding, what must be done to avoid losing access to the user's encrypted files?",
   "Which offboarding step would cause unrecoverable data loss if it were missed?"
  ]
 },
 {
  "id": "C33",
  "d": 4,
  "o": "4.8",
  "lv": 4.4,
  "q": "An analyst responding to a denial-of-service attack collects log files and data from a web server. What will let a future analyst confirm that the data is original and unaltered?",
  "a": [
   "E-discovery",
   "Root cause analysis",
   "Legal hold",
   "Hashing the data"
  ],
  "c": 3,
  "e": "A hash calculated at collection will differ if the data is changed, proving whether it is original. Legal hold and e-discovery concern preservation and legal collection.",
  "w": [
   "How can collected evidence later be proven unmodified?",
   "Which technique allows investigators to verify the integrity of collected logs?"
  ]
 },
 {
  "id": "C34",
  "d": 2,
  "o": "2.4",
  "lv": 5.5,
  "q": "Authentication logs show a large number of accounts, each with about three failed logins over the past week. What BEST explains this?",
  "a": [
   "Downgrade attack",
   "Phishing",
   "Injection",
   "Password spraying"
  ],
  "c": 3,
  "e": "Password spraying tries a few common passwords against many accounts, staying under lockout thresholds. A brute force would hammer one account, and the other options do not produce failed logins like this.",
  "w": [
   "Many accounts each have a few failed logins spread over days. Which attack fits?",
   "Which attack makes only a small number of attempts per account to avoid lockouts?"
  ]
 },
 {
  "id": "C35",
  "d": 4,
  "o": "4.5",
  "lv": 4.0,
  "q": "A security administrator is asked to block all browsing to casino gambling websites. What is the BEST way to do this?",
  "a": [
   "Tune the IPS signatures",
   "Block TCP 443 on the firewall",
   "Configure 802.1X for web browsing",
   "Add a content filter rule"
  ],
  "c": 3,
  "e": "Content filters categorize websites, so a rule can block a category such as gambling. Blocking 443 would break all HTTPS, and IPS tuning or 802.1X do not filter by category.",
  "w": [
   "How can an organization block a whole category of websites such as gambling?",
   "Which control blocks web browsing by site category?"
  ]
 },
 {
  "id": "C36",
  "d": 1,
  "o": "1.3",
  "lv": 4.2,
  "q": "Patches and updates deployed during the week keep causing outages. What would help resolve this?",
  "a": [
   "Onboarding considerations",
   "Incident response policies",
   "Change management procedures",
   "Decentralized governance"
  ],
  "c": 2,
  "e": "Change management plans, tests, schedules and approves changes, minimizing disruption to critical systems.",
  "w": [
   "Which practice lets organizations deploy updates while maintaining uptime?",
   "Frequent outages follow midweek updates. What should be improved?"
  ]
 },
 {
  "id": "C37",
  "d": 5,
  "o": "5.1",
  "lv": 4.0,
  "q": "A company is defining the steps to follow when responding to a specific type of security event. What provides this set of procedures?",
  "a": [
   "MDM",
   "DLP",
   "Playbook",
   "Zero trust"
  ],
  "c": 2,
  "e": "A playbook is a set of steps for a specific type of event, such as a data breach, virus infection or ransomware. MDM, DLP and zero trust are technologies and models.",
  "w": [
   "What document gives step-by-step instructions for responding to a particular incident?",
   "Which resource lists the conditional steps to follow for a specific security event?"
  ]
 },
 {
  "id": "C38",
  "d": 3,
  "o": "3.4",
  "lv": 4.3,
  "q": "A company runs a scheduling application and its database on virtual machines in the cloud. What is the BEST way to back up these services?",
  "a": [
   "Journaling",
   "Snapshot",
   "RTOS",
   "Containerization"
  ],
  "c": 1,
  "e": "VM snapshots capture the whole virtual system at a point in time (and later changes), making them a natural backup for virtualized services. Journaling protects database transactions, and RTOS and containers are unrelated.",
  "w": [
   "Which backup method captures the full state of a virtual machine at a point in time?",
   "To back up applications running in cloud VMs, which technique is most suitable?"
  ]
 },
 {
  "id": "C39",
  "d": 4,
  "o": "4.6",
  "lv": 3.6,
  "q": "Under discretionary access control, who controls the rights and permissions on a file or directory?",
  "a": [
   "Administrator",
   "Owner",
   "Group",
   "System"
  ],
  "c": 1,
  "e": "In discretionary access control, the owner of an object decides who may access it and how.",
  "w": [
   "In a DAC model, which party decides who can access a file?",
   "Who grants access to an object when discretionary access control is used?"
  ]
 },
 {
  "id": "C40",
  "d": 3,
  "o": "3.3",
  "lv": 3.8,
  "q": "A network-based DLP system inspects file transfers for personal information. In which state is the data while it is being transferred?",
  "a": [
   "In use",
   "In transit",
   "Highly available",
   "At rest"
  ],
  "c": 1,
  "e": "Data moving across the network is in transit. At rest means stored, and in use means being processed in memory.",
  "w": [
   "Data moving across switches and routers is in which state?",
   "Which data state applies to a file while it crosses the network?"
  ]
 },
 {
  "id": "C41",
  "d": 5,
  "o": "5.3",
  "lv": 4.5,
  "q": "A medical imaging company needs high-speed links between its sites that maintain high throughput and are always available during working hours. Where should these requirements be enforced with the network provider?",
  "a": [
   "Service level agreement",
   "Memorandum of understanding",
   "Non-disclosure agreement",
   "Acceptable use policy"
  ],
  "c": 0,
  "e": "A service level agreement contractually defines minimum service terms such as throughput and uptime. An MOU is non-binding, an NDA covers confidentiality, and an AUP governs users.",
  "w": [
   "Which agreement contractually guarantees a provider's throughput and uptime?",
   "Throughput and availability commitments from a carrier belong in which document?"
  ]
 },
 {
  "id": "C42",
  "d": 5,
  "o": "5.6",
  "lv": 3.6,
  "q": "A company is launching a security awareness program for its users. Which topic should be included?",
  "a": [
   "Daily firewall exception reports",
   "Proper password management",
   "Periodic vulnerability scans of external services",
   "Adjustments to annualized loss expectancy"
  ],
  "c": 1,
  "e": "Awareness training covers fundamentals every employee can apply, such as protecting and managing passwords. The other items are technical or risk-management tasks for specialists.",
  "w": [
   "Which subject belongs in user security awareness training?",
   "What guidance is most appropriate for an awareness program aimed at all employees?"
  ]
 },
 {
  "id": "C43",
  "d": 5,
  "o": "5.6",
  "lv": 4.0,
  "q": "As part of an awareness campaign, the security team sends a spoofed email from an unknown third party urging employees to click a link immediately or lose their state licensing. What should users be expected to do?",
  "a": [
   "Delete the message",
   "Click the link and note the URL",
   "Forward the message to the department",
   "Report the suspicious message to the help desk"
  ],
  "c": 3,
  "e": "Users should report anything suspicious so the security team can act. Deleting it hides the threat from others, clicking it is exactly what attackers want, and forwarding spreads it.",
  "w": [
   "An urgent email from an unknown sender demands that you click a link. What is the correct response?",
   "What should a trained employee do with a suspicious, urgent link in an email?"
  ]
 },
 {
  "id": "C44",
  "d": 1,
  "o": "1.4",
  "lv": 5.2,
  "q": "A security administrator wants to reduce the number of certificate status checks that website visitors make to the certificate authority. Which option is BEST?",
  "a": [
   "OCSP stapling",
   "Self-signed certificates",
   "CRL",
   "Wildcard certificates"
  ],
  "c": 0,
  "e": "With OCSP stapling, the server includes a signed, recent status in the TLS handshake, so clients do not need to contact the CA. A CRL still requires clients to download lists, and self-signed or wildcard certificates do not address status checks.",
  "w": [
   "Which feature lets a web server provide its own certificate status so clients do not query the CA?",
   "How can certificate revocation checks against the CA be minimized for website visitors?"
  ]
 },
 {
  "id": "C45",
  "d": 1,
  "o": "1.1",
  "lv": 4.9,
  "q": "A company worries its EDR will not stop newer ransomware variants, so technicians build a backup and restore utility that brings most systems back within an hour. Which control type is the restore process?",
  "a": [
   "Directive",
   "Compensating",
   "Preventive",
   "Detective"
  ],
  "c": 1,
  "e": "The restore process does not prevent ransomware; it compensates for the EDR's limits by restoring systems by other means. That is a compensating control.",
  "w": [
   "A fast restore process that offsets weaknesses in endpoint protection is which control type?",
   "Which control type uses other means to restore systems when the primary control may fail?"
  ]
 },
 {
  "id": "C46",
  "d": 1,
  "o": "1.3",
  "lv": 4.6,
  "q": "Before upgrading an internal application, developers give operations instructions for backing up, patching and reverting the patch if needed; operations schedules the work, informs the business and tests afterwards. What does this describe?",
  "a": [
   "Code signing",
   "Continuity planning",
   "Usage auditing",
   "Change management"
  ],
  "c": 3,
  "e": "Change management covers planning, approval, scheduling, communication, backout plans and post-change testing, reducing the risk of any change.",
  "w": [
   "Planning, scheduling, communicating and testing an application upgrade with a rollback option is which process?",
   "Which formal process includes backout instructions, scheduling and post-change testing?"
  ]
 },
 {
  "id": "C47",
  "d": 4,
  "o": "4.6",
  "lv": 4.4,
  "q": "A company launching a public cloud file-sharing service wants users to sign in with existing accounts from a trusted third-party website. What should it implement?",
  "a": [
   "SSO",
   "Federation",
   "Least privilege",
   "Discretionary access controls"
  ],
  "c": 1,
  "e": "Federation lets one organization trust authentication performed by another, such as signing in with a social media account. SSO is single sign-on within a trusted environment.",
  "w": [
   "Which approach lets users authenticate with their accounts from another trusted organization?",
   "To allow logins using a third-party identity provider, what should a service implement?"
  ]
 },
 {
  "id": "C48",
  "d": 2,
  "o": "2.4",
  "lv": 5.7,
  "q": "A file integrity monitoring report shows: 'Repairing corrupted file C:\\Windows\\System32\\kernel32.dll', then netapi32.dll and user32.dll, then 'Repair complete'. Which malware is MOST likely the cause?",
  "a": [
   "Ransomware",
   "Logic bomb",
   "Rootkit",
   "Keylogger"
  ],
  "c": 2,
  "e": "Rootkits modify core operating system files, such as the kernel, user and networking libraries, to hide inside the OS. Ransomware encrypts data, and logic bombs and keyloggers do not typically replace system DLLs.",
  "w": [
   "Core Windows system DLLs were modified and had to be repaired. Which malware type is most likely?",
   "Which malware modifies core OS libraries such as kernel32.dll to embed itself?"
  ]
 },
 {
  "id": "C49",
  "d": 2,
  "o": "2.4",
  "lv": 5.0,
  "q": "A web log shows the request 'GET http://example.com/show.asp?view=../../Windows/system.ini'. Which vulnerability is being targeted?",
  "a": [
   "Buffer overflow",
   "Directory traversal",
   "DoS",
   "Cross-site scripting"
  ],
  "c": 1,
  "e": "The ../ sequences move up parent directories to reach a file outside the web server's directory: directory traversal.",
  "w": [
   "A request uses ../../ in a parameter to reach a Windows system file. What attack is this?",
   "Which attack tries to read files outside the web root using parent-directory references?"
  ]
 },
 {
  "id": "C50",
  "d": 3,
  "o": "3.3",
  "lv": 4.0,
  "q": "A developer stores passwords in a database. Which technique protects them by adding random data to each password before hashing?",
  "a": [
   "Hashing",
   "Data masking",
   "Salting",
   "Asymmetric encryption"
  ],
  "c": 2,
  "e": "Salting adds random data to each password before hashing, defeating rainbow tables and making identical passwords produce different hashes.",
  "w": [
   "What is the random value combined with a password before hashing?",
   "Which technique ensures that identical passwords result in different stored hashes?"
  ]
 },
 {
  "id": "C51",
  "d": 4,
  "o": "4.7",
  "lv": 3.8,
  "q": "Which process continually builds and tests newly written code as it is merged?",
  "a": [
   "Continuous integration",
   "Continuity of operations",
   "Version control",
   "Race condition"
  ],
  "c": 0,
  "e": "Continuous integration merges code into a shared repository many times a day and automatically builds and tests it. Version control tracks changes but does not test them.",
  "w": [
   "What is the practice of frequently merging code and automatically building and testing it?",
   "Which development automation runs builds and tests every time code is merged?"
  ]
 },
 {
  "id": "C52",
  "d": 3,
  "o": "3.1",
  "lv": 3.9,
  "q": "Which of the following BEST describes a cloud responsibility matrix?",
  "a": [
   "A summary of which responsibilities belong to the provider and which to the customer",
   "A list of tasks for each step of a project plan",
   "Security requirements derived from identified risks",
   "Ongoing group discussions about security"
  ],
  "c": 0,
  "e": "A responsibility matrix shows which security tasks the cloud provider handles and which the customer handles, for each service type.",
  "w": [
   "What does a cloud provider's responsibility matrix show?",
   "Which description fits a cloud responsibility matrix?"
  ]
 },
 {
  "id": "C53",
  "d": 4,
  "o": "4.6",
  "lv": 4.4,
  "q": "A company is building an authentication system. Which choice is BEST for validating every username and password against a central directory?",
  "a": [
   "CA",
   "SIEM",
   "LDAP",
   "WAF"
  ],
  "c": 2,
  "e": "LDAP is a widely supported open standard for querying a central directory and validating credentials. A CA issues certificates, a SIEM analyzes logs, and a WAF protects web apps.",
  "w": [
   "Which open standard is commonly used to authenticate users against a central directory?",
   "What directory protocol should be used to validate login credentials centrally?"
  ]
 },
 {
  "id": "C54",
  "d": 4,
  "o": "4.9",
  "lv": 6.3,
  "q": "An IPS log shows: 'reject 10.1.111.7 Alert: HTTP Suspicious Webdav OPTIONS Method Request; Severity medium; Category info-leak; Proto tcp; dst 192.168.11.1; src 10.1.111.7'. Which TWO statements are supported? (Select TWO).",
  "a": [
   "The source of the attack is 10.1.111.7",
   "The attacker sent an unusual HTTP request that triggered the IPS",
   "The attacker sent a non-authenticated BGP packet",
   "The source of the attack is 192.168.11.1",
   "The event was logged but no packets were dropped"
  ],
  "c": [
   0,
   1
  ],
  "e": "The alert describes a suspicious HTTP WebDAV OPTIONS request, and the last fields show the source as 10.1.111.7 and the destination as 192.168.11.1. The action 'reject' means traffic was blocked, and BGP is not involved.",
  "w": [
   "From an IPS alert about a suspicious WebDAV OPTIONS request from 10.1.111.7 to 192.168.11.1, which TWO conclusions are correct? (Select TWO).",
   "Which TWO facts can be read from this rejected HTTP WebDAV alert? (Select TWO)."
  ]
 },
 {
  "id": "C55",
  "d": 5,
  "o": "5.5",
  "lv": 4.3,
  "q": "A penetration testing contract includes a port scan of every external-facing device. What is the port scan an example of?",
  "a": [
   "Initial exploitation",
   "Privilege escalation",
   "Known environment",
   "Active reconnaissance"
  ],
  "c": 3,
  "e": "A port scan sends traffic to the target and can be detected and logged, which makes it active reconnaissance. It gathers information rather than exploiting anything.",
  "w": [
   "Sending scan traffic directly to a target's systems is which phase of testing?",
   "Which activity does a port scan of internet-facing hosts represent?"
  ]
 },
 {
  "id": "C56",
  "d": 2,
  "o": "2.2",
  "lv": 5.0,
  "q": "An access point is configured with: IP 10.1.10.1, mask 255.255.255.0, DHCP enabled, SSID 'Wireless', 802.11n, Security mode WEP-PSK, 2.4 GHz, IPv4 firewall enabled. Which problem applies to this configuration?",
  "a": [
   "Invalid frequency band",
   "Weak encryption",
   "Incorrect IP address and mask",
   "Invalid software version"
  ],
  "c": 1,
  "e": "WEP is obsolete and easily broken; the network should use WPA3 or at least WPA2. 2.4 GHz, the addressing and 802.11n are all valid.",
  "w": [
   "Which setting in this access point configuration is a security weakness: WEP-PSK, 2.4 GHz, 10.1.10.1/24 or 802.11n?",
   "Review an access point set to WEP-PSK on 2.4 GHz. What is the issue?"
  ]
 },
 {
  "id": "C57",
  "d": 2,
  "o": "2.4",
  "lv": 4.4,
  "q": "An attacker gains access to an application using information from packet captures. Which attack is MOST likely?",
  "a": [
   "Overflow",
   "Forgery",
   "Replay",
   "Injection"
  ],
  "c": 2,
  "e": "A replay attack resends previously captured traffic, such as authentication data, to gain access.",
  "w": [
   "Reusing captured authentication traffic to get into an application is which attack?",
   "Which attack relies on retransmitting previously captured network data?"
  ]
 },
 {
  "id": "C58",
  "d": 2,
  "o": "2.4",
  "lv": 4.0,
  "q": "A public web server is slow and dropping connections, and the internet link shows heavy bandwidth use from thousands of different IP addresses. What is the MOST likely cause?",
  "a": [
   "DDoS",
   "DNS spoofing",
   "RFID cloning",
   "Wireless jamming"
  ],
  "c": 0,
  "e": "Thousands of sources exhausting bandwidth to one server is a distributed denial of service.",
  "w": [
   "Traffic from thousands of addresses saturates a web server's link. Which attack is this?",
   "Which attack overwhelms a service using traffic from many different sources?"
  ]
 },
 {
  "id": "C59",
  "d": 5,
  "o": "5.3",
  "lv": 4.3,
  "q": "A company writes an itemized list of tasks a third-party provider must complete, which will later be used to confirm the work was done. Which agreement is this?",
  "a": [
   "SLA",
   "SOW",
   "NDA",
   "BPA"
  ],
  "c": 1,
  "e": "A statement of work details the scope, tasks and deliverables, and serves as a checklist to verify completion. An SLA sets service levels, an NDA covers confidentiality, and a BPA defines a partnership.",
  "w": [
   "Which document lists the specific deliverables of a contracted engagement?",
   "A detailed task list used to verify a vendor's completed work is called what?"
  ]
 },
 {
  "id": "C60",
  "d": 3,
  "o": "3.2",
  "lv": 5.4,
  "q": "A company is deploying internal applications across several different cloud providers. Which connection type should be used?",
  "a": [
   "Air gap",
   "802.1X",
   "Site-to-site IPsec VPN",
   "Jump server",
   "SD-WAN"
  ],
  "c": 4,
  "e": "SD-WAN lets sites reach cloud-based applications directly and efficiently across providers. Site-to-site VPNs work but are built around fixed sites rather than many cloud destinations.",
  "w": [
   "Which networking approach efficiently connects users directly to applications in multiple clouds?",
   "To connect sites to applications hosted with several cloud providers, what should be deployed?"
  ]
 },
 {
  "id": "C61",
  "d": 1,
  "o": "1.2",
  "lv": 4.7,
  "q": "A company is updating components in the control plane of its zero trust architecture. Which component is part of this update?",
  "a": [
   "Policy engine",
   "Subjects",
   "Policy enforcement point",
   "Zone configurations"
  ],
  "c": 0,
  "e": "The policy engine is in the control plane and decides whether access is granted, denied or revoked. Subjects and the enforcement point are in the data plane.",
  "w": [
   "Which zero trust component belongs to the control plane?",
   "Name the control-plane element that decides whether access is granted."
  ]
 },
 {
  "id": "C62",
  "d": 2,
  "o": "2.4",
  "lv": 3.6,
  "q": "Which type of malware makes a workstation take part in a DDoS attack?",
  "a": [
   "Bot",
   "Logic bomb",
   "Ransomware",
   "Keylogger"
  ],
  "c": 0,
  "e": "A bot waits for instructions from its controller; botnets of thousands of bots are commonly used for DDoS attacks.",
  "w": [
   "Malware that waits for commands and joins coordinated attacks is called what?",
   "Which malware turns an infected PC into part of a botnet?"
  ]
 },
 {
  "id": "C63",
  "d": 4,
  "o": "4.8",
  "lv": 4.0,
  "q": "Which mechanism forces data to be preserved for later use in court?",
  "a": [
   "Chain of custody",
   "Data loss prevention",
   "Legal hold",
   "E-discovery"
  ],
  "c": 2,
  "e": "A legal hold requires relevant data to be preserved for litigation. Chain of custody documents evidence handling, and e-discovery is the collection of documents.",
  "w": [
   "What requires an organization to keep relevant information intact ahead of litigation?",
   "Which legal process prevents data from being deleted because it may be needed as evidence?"
  ]
 },
 {
  "id": "C64",
  "d": 1,
  "o": "1.2",
  "lv": 4.4,
  "q": "A company wants to automatically detect and report any movement across an open field on its data center property. Which option is BEST?",
  "a": [
   "Bollard",
   "Microwave sensor",
   "Access control vestibule",
   "Fencing"
  ],
  "c": 1,
  "e": "Microwave sensors detect movement across large areas such as open ground. Bollards and fencing are barriers, and a vestibule controls entry through a door.",
  "w": [
   "Which sensor can detect motion across a large outdoor area?",
   "To monitor movement in an open field around a facility, what should be installed?"
  ]
 },
 {
  "id": "C65",
  "d": 3,
  "o": "3.4",
  "lv": 4.6,
  "q": "As part of a product launch, a company adds load balancers to its public website to handle the expected surge in visitors. What does this BEST describe?",
  "a": [
   "Platform diversity",
   "Capacity planning",
   "Multi-cloud systems",
   "Permission restrictions"
  ],
  "c": 1,
  "e": "Capacity planning matches resources to expected demand; here the company is increasing web capacity ahead of a launch. Platform diversity and multi-cloud concern avoiding single-vendor failures.",
  "w": [
   "Adding resources ahead of an expected increase in demand is which practice?",
   "Which practice matches resource supply to anticipated demand, such as adding web capacity for a launch?"
  ]
 },
 {
  "id": "C66",
  "d": 1,
  "o": "1.2",
  "lv": 3.9,
  "q": "An administrator wants to prove that an email was sent by a specific person. Which concept describes this verification of the message's source?",
  "a": [
   "Non-repudiation",
   "Key escrow",
   "Asymmetric encryption",
   "Steganography"
  ],
  "c": 0,
  "e": "Non-repudiation proves who sent a message so the sender cannot deny it; digital signatures are the usual mechanism.",
  "w": [
   "Proof that a specific person sent a message, so they cannot deny it, is called what?",
   "Which security concept do digital signatures provide that verifies the message source?"
  ]
 },
 {
  "id": "C67",
  "d": 5,
  "o": "5.6",
  "lv": 5.0,
  "q": "A security policy raises an alert whenever a user modifies the hosts file on their computer. Which kind of user behavior is this policy addressing?",
  "a": [
   "Unexpected",
   "Self-assessment",
   "Unintentional",
   "Risky"
  ],
  "c": 3,
  "e": "Modifying the hosts file can redirect traffic and is usually restricted, so it is classed as risky behavior. Unintentional behavior is accidental, and unexpected behavior is simply unusual.",
  "w": [
   "Changing the hosts file without a business need is classified as which behavior?",
   "In awareness programs, which category describes users making security-sensitive system changes?"
  ]
 },
 {
  "id": "C68",
  "d": 2,
  "o": "2.5",
  "lv": 4.2,
  "q": "A web server breach exposed the financial records of 150 million customers. A security update for the web server software had been available for two months before the attack. What would have prevented the breach?",
  "a": [
   "Patch management",
   "Full-disk encryption",
   "Disabling unnecessary services",
   "Application allow lists"
  ],
  "c": 0,
  "e": "The fix already existed; applying it promptly through patch management would have closed the hole. Encryption at rest and allow lists would not stop exploitation of a vulnerable, running web application.",
  "w": [
   "An available update was not applied for two months before a major breach. Which process failed?",
   "Which practice would have closed the vulnerability exploited in this breach?"
  ]
 },
 {
  "id": "C69",
  "d": 5,
  "o": "5.1",
  "lv": 4.2,
  "q": "During onboarding, IT asks for a list of applications a new employee needs for their job. What is this information used for?",
  "a": [
   "Configuring access controls",
   "Setting encryption options",
   "Physical security requirements",
   "Change management"
  ],
  "c": 0,
  "e": "Knowing which applications and data a role needs lets IT grant exactly the right access controls for the new employee.",
  "w": [
   "Why does IT need to know which applications a new hire will use?",
   "A list of job-related applications during onboarding supports which task?"
  ]
 },
 {
  "id": "C70",
  "d": 4,
  "o": "4.8",
  "lv": 4.7,
  "q": "An administrator finds an unknown account on a database server transferring files to an external server. They unplug the server's network cable, disable the account, and add a firewall rule blocking transfers from the server. Which incident response phase is this?",
  "a": [
   "Eradication",
   "Containment",
   "Lessons learned",
   "Preparation"
  ],
  "c": 1,
  "e": "These actions stop the ongoing transfer and isolate the server: containment. Eradication would remove the root cause, and lessons learned follows the incident.",
  "w": [
   "Disconnecting a server, disabling an unknown account and blocking outbound transfers belong to which phase?",
   "Which phase stops an active incident from spreading or continuing?"
  ]
 },
 {
  "id": "C71",
  "d": 1,
  "o": "1.4",
  "lv": 5.3,
  "q": "Which of the following is the MOST effective use of asymmetric encryption?",
  "a": [
   "Encrypting real-time video",
   "Securely storing passwords",
   "Protecting data on mobile devices",
   "Creating a shared session key"
  ],
  "c": 3,
  "e": "Asymmetric algorithms such as Diffie-Hellman let two parties derive a shared session key without sending it; the faster symmetric key then protects the data. Bulk encryption of video or devices uses symmetric ciphers, and passwords are hashed.",
  "w": [
   "Asymmetric cryptography is best suited to which task?",
   "Which job is asymmetric encryption typically used for, rather than bulk data?"
  ]
 },
 {
  "id": "C72",
  "d": 1,
  "o": "1.4",
  "lv": 3.8,
  "q": "Salespeople carry laptops with applications and customer data. The IT manager wants the data to stay protected if a laptop is stolen. What is the BEST protection?",
  "a": [
   "Remote wipe",
   "Full-disk encryption",
   "Biometrics",
   "VPN"
  ],
  "c": 1,
  "e": "Full-disk encryption makes everything on the drive unreadable without the credentials. Remote wipe requires the device to connect to a network first, and biometrics or a VPN do not protect the stored data.",
  "w": [
   "Which control keeps data on a stolen laptop unreadable?",
   "To protect sales data if a laptop is lost, what should be enabled?"
  ]
 },
 {
  "id": "C73",
  "d": 5,
  "o": "5.4",
  "lv": 4.3,
  "q": "A security administrator compiles a list of all the information stored and managed by the organization, including owners and formats. What is this list?",
  "a": [
   "Sanitization",
   "Metadata",
   "Known environment",
   "Data inventory"
  ],
  "c": 3,
  "e": "A data inventory lists all data the organization manages, with details such as owner, format and update frequency.",
  "w": [
   "A record of all data an organization holds, with its owners and formats, is called what?",
   "Which compliance artifact lists every data set managed by an organization?"
  ]
 },
 {
  "id": "C74",
  "d": 3,
  "o": "3.2",
  "lv": 4.4,
  "q": "A security administrator wants to inspect all outbound internet connections for malicious software. What provides this?",
  "a": [
   "Jump server",
   "IPsec tunnel",
   "Forward proxy",
   "Load balancer"
  ],
  "c": 2,
  "e": "A forward proxy handles users' outbound requests and can inspect them for malware, filter content and cache. A jump server is for administrative access, and a load balancer distributes inbound traffic.",
  "w": [
   "Which device sits between users and the internet to inspect and filter their outbound traffic?",
   "What should be deployed to monitor users' internet traffic for malware?"
  ]
 },
 {
  "id": "C75",
  "d": 1,
  "o": "1.1",
  "lv": 3.5,
  "q": "Which type of security control is a corporate security policy?",
  "a": [
   "Technical",
   "Operational",
   "Managerial",
   "Physical"
  ],
  "c": 2,
  "e": "Policies and procedures are managerial controls, concerned with security design, governance and direction.",
  "w": [
   "Security policies and standard operating procedures are which control category?",
   "A written corporate security policy falls into which control category?"
  ]
 },
 {
  "id": "C76",
  "d": 2,
  "o": "2.1",
  "lv": 5.2,
  "q": "When protecting against organized crime, which measure addresses the MOST significant concern?",
  "a": [
   "Stopping users from posting passwords near their desks",
   "Requiring ID cards for all employees and guests",
   "Maintaining reliable backups",
   "Using access control vestibules at data centers"
  ],
  "c": 2,
  "e": "Organized crime often targets data with ransomware or destruction; reliable backups allow recovery without paying. The other measures address physical or minor threats.",
  "w": [
   "Which control best limits the impact of ransomware from criminal groups?",
   "Given that organized crime often encrypts or deletes data for money, what is the most important protection?"
  ]
 },
 {
  "id": "C77",
  "d": 2,
  "o": "2.5",
  "lv": 5.3,
  "q": "An application team is given a hardened Linux server and will install a web service and the application on it. What will BEST protect the application from attack?",
  "a": [
   "Build a backup server",
   "Run the application in the cloud",
   "Implement a secure configuration of the web service",
   "Send application logs to the SIEM"
  ],
  "c": 2,
  "e": "The web service itself must be hardened too, using vendor recommendations for accounts, file permissions and settings. Backups, hosting location and logging do not reduce the attack surface.",
  "w": [
   "The OS is already hardened. What should be done next to protect the application?",
   "Which step best secures a newly installed web service on a hardened server?"
  ]
 },
 {
  "id": "C78",
  "d": 4,
  "o": "4.1",
  "lv": 5.0,
  "q": "An administrator has configured MAC filtering on the corporate access point, but logs show unauthorized users on the network. What should be configured to prevent this?",
  "a": [
   "Enable WPA3",
   "Remove the unauthorized MAC addresses",
   "Change the SSID",
   "Change the channel frequencies"
  ],
  "c": 0,
  "e": "MAC addresses can be observed and spoofed, so filtering is easily bypassed. WPA3 provides real authentication and encryption. Changing the SSID or channel does nothing for security.",
  "w": [
   "MAC filtering is being bypassed. Which change actually prevents unauthorized wireless access?",
   "Why is MAC filtering weak, and what should replace it?"
  ]
 },
 {
  "id": "C79",
  "d": 1,
  "o": "1.3",
  "lv": 4.4,
  "q": "An application upgrade is delayed because a separate scheduled installation of an updated device driver must happen first. Which change management issue is this?",
  "a": [
   "Deny list",
   "Legacy application",
   "Dependency",
   "Restricted activity"
  ],
  "c": 2,
  "e": "The application upgrade depends on the driver update, which is a dependency to account for in change planning.",
  "w": [
   "One change must wait until another component is updated. What is this called in change management?",
   "Which term describes a change that relies on another change being completed first?"
  ]
 },
 {
  "id": "C80",
  "d": 3,
  "o": "3.2",
  "lv": 4.6,
  "q": "When a device first connects to the network, a supplicant talks to an authenticator, which forwards the request to an Active Directory database. Which technology is this?",
  "a": [
   "Federation",
   "UTM",
   "802.1X",
   "PKI"
  ],
  "c": 2,
  "e": "802.1X uses a supplicant (the client), an authenticator (the switch or access point) and an authentication server; devices get no access until they authenticate.",
  "w": [
   "Supplicant, authenticator and authentication server are the components of which standard?",
   "Which port-based network access control standard is described by this exchange?"
  ]
 },
 {
  "id": "C81",
  "d": 2,
  "o": "2.3",
  "lv": 4.6,
  "q": "A researcher is told of a possible hardware vulnerability. What should be evaluated as the potential issue?",
  "a": [
   "Firmware versions",
   "Firewall configuration",
   "SQL requests",
   "XSS attachments"
  ],
  "c": 0,
  "e": "Firmware is the software inside hardware, and hardware vulnerabilities are usually fixed by firmware updates. The other options are network or application issues.",
  "w": [
   "Hardware vulnerabilities are usually fixed by updating what?",
   "Which component is most relevant when assessing a hardware vulnerability?"
  ]
 },
 {
  "id": "C82",
  "d": 1,
  "o": "1.2",
  "lv": 4.8,
  "q": "Visitors to a corporate data center must use the building's main doors. Which TWO controls BEST guide people to the front entrance? (Select TWO).",
  "a": [
   "Infrared sensors",
   "Bollards",
   "Biometrics",
   "Fencing",
   "Access badges",
   "Video surveillance"
  ],
  "c": [
   1,
   3
  ],
  "e": "Bollards and fencing physically limit where people can go, directing them to the intended entrance. Sensors and cameras detect, and badges and biometrics authenticate.",
  "w": [
   "Which TWO physical barriers channel visitors toward a building's main entrance? (Select TWO).",
   "To steer people to a single front door, which TWO controls should be used? (Select TWO)."
  ]
 },
 {
  "id": "C83",
  "d": 4,
  "o": "4.6",
  "lv": 4.0,
  "q": "Employees must authenticate every time they use a file share, printer or SAN imaging system. What should be used to reduce the number of authentication prompts?",
  "a": [
   "SSO",
   "OSINT",
   "MFA",
   "SCAP"
  ],
  "c": 0,
  "e": "Single sign-on lets one authentication grant access to multiple resources. MFA adds factors rather than reducing prompts.",
  "w": [
   "Which technology lets users authenticate once and access many resources?",
   "How can repeated logins to different internal services be reduced?"
  ]
 },
 {
  "id": "C84",
  "d": 5,
  "o": "5.5",
  "lv": 5.0,
  "q": "A company moves to a new accounting system that integrates with many divisions. How can it confirm that the right employees in each division have the correct access?",
  "a": [
   "Geolocation",
   "Onboarding process",
   "Account deprovisioning",
   "Internal self-assessment"
  ],
  "c": 3,
  "e": "An internal self-assessment (audit) of access verifies that users have exactly the permissions they need. Onboarding and deprovisioning handle individual joiners and leavers.",
  "w": [
   "After a system migration, which activity verifies that every user has the appropriate access?",
   "Which review confirms correct permissions across divisions after a new system goes live?"
  ]
 },
 {
  "id": "C85",
  "d": 2,
  "o": "2.3",
  "lv": 3.8,
  "q": "An attacker bypasses a web application to send commands directly to its database. Which attack type is this?",
  "a": [
   "Downgrade",
   "SQL injection",
   "Cross-site scripting",
   "On-path"
  ],
  "c": 1,
  "e": "SQL injection takes advantage of poor input handling to send commands straight to the database.",
  "w": [
   "Injecting database commands through a poorly validated web form is which attack?",
   "Which attack lets an attacker query a database directly through a web application?"
  ]
 },
 {
  "id": "C86",
  "d": 1,
  "o": "1.4",
  "lv": 4.3,
  "q": "Business partners use blockchain to track raw materials as they move between companies. Where would a partner find the tracking details?",
  "a": [
   "Ledger",
   "HSM",
   "SIEM",
   "HIPS"
  ],
  "c": 0,
  "e": "The ledger is the shared record of all blockchain transactions, visible to all participants.",
  "w": [
   "In a blockchain, where are all recorded transactions viewable by participants?",
   "Which blockchain component holds the shared record of every transaction?"
  ]
 },
 {
  "id": "C87",
  "d": 2,
  "o": "2.4",
  "lv": 5.8,
  "q": "Traffic to a bank's website has dropped sharply, and users are being sent to a lookalike site the bank does not control. Flushing local DNS caches and correcting the local DNS entry make no difference. What has MOST likely happened?",
  "a": [
   "DDoS",
   "Disassociation attack",
   "Buffer overflow",
   "Domain hijacking"
  ],
  "c": 3,
  "e": "If local caches and entries are fine, the authoritative registration itself has been changed: domain hijacking, which redirects everyone to the attacker's address.",
  "w": [
   "Users are redirected to a fake bank site, and local DNS fixes do not help. What is most likely?",
   "Which attack changes a domain's authoritative settings so all users are sent to an attacker's server?"
  ]
 },
 {
  "id": "C88",
  "d": 3,
  "o": "3.1",
  "lv": 4.4,
  "q": "A company runs two applications in its data center and must prevent any communication between them. What is the BEST way to meet this requirement?",
  "a": [
   "Firewall",
   "SDN",
   "Air gap",
   "VLANs"
  ],
  "c": 2,
  "e": "An air gap physically separates the systems so no communication is possible. Firewalls, SDN and VLANs separate logically and can be misconfigured.",
  "w": [
   "Which method guarantees two systems can never communicate with each other?",
   "To ensure two applications have no network path between them, what should be used?"
  ]
 },
 {
  "id": "C89",
  "d": 5,
  "o": "5.6",
  "lv": 4.2,
  "q": "A receptionist receives an email apparently from the CEO asking for a copy of the internal employee directory. It turns out the email came from a non-corporate domain. Which training would help staff spot this in future?",
  "a": [
   "Recognizing social engineering",
   "Proper password management",
   "Securing remote work",
   "Understanding insider threats"
  ],
  "c": 0,
  "e": "Impersonating an executive is a classic social engineering technique, and training people to recognize it is the best defense.",
  "w": [
   "Which awareness topic teaches employees to spot impersonation of executives?",
   "What training helps employees identify fraudulent requests that appear to come from leadership?"
  ]
 },
 {
  "id": "C90",
  "d": 4,
  "o": "4.1",
  "lv": 3.5,
  "q": "Which deployment model has employees use their own personal phones for work?",
  "a": [
   "CYOD",
   "MDM",
   "BYOD",
   "COPE"
  ],
  "c": 2,
  "e": "Bring your own device (BYOD) uses employee-owned devices for work. COPE and CYOD are company-owned, and MDM is a management tool.",
  "w": [
   "When staff use phones they personally own for company work, which model is in use?",
   "Which mobile model is based on employee-owned devices?"
  ]
 }
]
