// Domain 3: Security Architecture
export default [
  {
    o: '3.1',
    q: 'A company uses a cloud provider\'s SaaS email platform. Under the shared responsibility model, which of the following is the customer MOST likely responsible for?',
    a: ['Patching the underlying hypervisor', 'Physical security of the data center', 'Managing user accounts and access permissions', 'Maintaining the email server operating system'],
    c: 2,
    e: 'In SaaS, the provider manages the infrastructure, OS, and application; the customer remains responsible for data and identity/access management.'
  },
  {
    o: '3.1',
    q: 'A development team wants to run code in response to events without managing any servers or operating systems. Which of the following architectures should the team use?',
    a: ['Serverless', 'Virtual machines', 'On-premises', 'Air-gapped'],
    c: 0,
    e: 'Serverless computing (function as a service) runs code on demand while the provider manages all infrastructure.'
  },
  {
    o: '3.1',
    q: 'A security architect wants network configurations to be defined in version-controlled files so environments can be deployed consistently and repeatably. Which of the following concepts does this describe?',
    a: ['Infrastructure as code', 'Software-defined WAN', 'Microservices', 'Containerization'],
    c: 0,
    e: 'Infrastructure as code (IaC) manages and provisions infrastructure through machine-readable definition files, enabling consistency and reducing configuration drift.'
  },
  {
    o: '3.1',
    q: 'A power plant uses specialized systems to monitor and control physical processes across geographically distributed sites. Which of the following BEST describes these systems?',
    a: ['SCADA/ICS', 'IoT', 'RTOS only', 'SD-WAN'],
    c: 0,
    e: 'Supervisory Control and Data Acquisition (SCADA) systems are a type of industrial control system (ICS) used to manage critical infrastructure.'
  },
  {
    o: '3.1',
    q: 'A research lab stores highly sensitive data on a system that has no physical or wireless connection to any other network. Which of the following BEST describes this system?',
    a: ['Air-gapped', 'Segmented', 'Logically isolated', 'Hybrid'],
    c: 0,
    e: 'An air-gapped system is physically isolated from all other networks.'
  },
  {
    o: '3.1',
    q: 'Which of the following is a security concern specific to embedded systems and IoT devices?',
    a: ['They often cannot be easily patched', 'They always run full desktop operating systems', 'They require hypervisors', 'They are only deployed in the cloud'],
    c: 0,
    e: 'Embedded and IoT devices often have limited resources, long lifecycles, and limited or no patching capability.'
  },
  {
    o: '3.2',
    q: 'A company wants to inspect traffic at the application layer, perform intrusion prevention, and filter URLs using a single device. Which of the following should the company deploy?',
    a: ['Next-generation firewall', 'Layer 4 stateless firewall', 'Network hub', 'Jump server'],
    c: 0,
    e: 'A next-generation firewall (NGFW) combines traditional firewalling with application awareness, IPS, and URL filtering.'
  },
  {
    o: '3.2',
    q: 'A security engineer needs to protect a web application from SQL injection and cross-site scripting attacks. Which of the following is the BEST device to deploy?',
    a: ['Web application firewall', 'Load balancer', 'Forward proxy', 'IDS in passive mode'],
    c: 0,
    e: 'A WAF inspects HTTP/HTTPS traffic and protects web applications from attacks such as SQLi and XSS.'
  },
  {
    o: '3.2',
    q: 'Administrators must connect to servers in a secure network segment. The company wants all administrative access to pass through a single hardened, monitored system. Which of the following should be implemented?',
    a: ['Jump server', 'Reverse proxy', 'Load balancer', 'Honeypot'],
    c: 0,
    e: 'A jump server (jump box) is a hardened host used as a single controlled point of entry for administering systems in a secure zone.'
  },
  {
    o: '3.2',
    q: 'An IPS is placed directly in the path of network traffic and can drop malicious packets. If the IPS fails, the company wants traffic to continue flowing. Which of the following configurations should be used?',
    a: ['Fail-open', 'Fail-closed', 'Passive monitoring', 'Tap/monitor port'],
    c: 0,
    e: 'Fail-open allows traffic to pass if the device fails, prioritizing availability. Fail-closed blocks traffic, prioritizing security.'
  },
  {
    o: '3.2',
    q: 'A company wants remote employees to securely access internal resources while also inspecting their internet traffic through cloud-delivered security services. Which of the following BEST meets this requirement?',
    a: ['SASE', 'Site-to-site VPN', 'NAC', '802.1X only'],
    c: 0,
    e: 'Secure Access Service Edge (SASE) combines networking (SD-WAN) with cloud-delivered security such as SWG, CASB, ZTNA, and FWaaS.'
  },
  {
    o: '3.2',
    q: 'Which of the following protocols should be used to provide port-based network access control that authenticates devices before they are allowed on a wired or wireless network?',
    a: ['802.1X', 'SNMPv3', 'STP', 'LDAPS'],
    c: 0,
    e: 'IEEE 802.1X provides port-based authentication, typically using EAP with a RADIUS server.'
  },
  {
    o: '3.2',
    q: 'A company requires a VPN that encrypts the entire IP packet, including the original header, between two branch offices. Which of the following should be used?',
    a: ['IPsec in tunnel mode', 'IPsec in transport mode', 'TLS with split tunneling', 'GRE without encryption'],
    c: 0,
    e: 'IPsec tunnel mode encapsulates and encrypts the entire original packet, which is typical for site-to-site VPNs.'
  },
  {
    o: '3.2',
    q: 'Which of the following devices distributes incoming requests across multiple servers to improve availability and performance?',
    a: ['Load balancer', 'Proxy server', 'Sensor', 'Jump server'],
    c: 0,
    e: 'A load balancer distributes traffic across a pool of servers, improving availability and scalability.'
  },
  {
    o: '3.3',
    q: 'A company must ensure customer data is stored only in data centers located within the European Union. Which of the following concepts does this requirement address?',
    a: ['Data sovereignty', 'Data masking', 'Data classification', 'Data retention'],
    c: 0,
    e: 'Data sovereignty means data is subject to the laws of the country where it is stored, so organizations may restrict storage locations (geographic restrictions).'
  },
  {
    o: '3.3',
    q: 'A customer service portal displays only the last four digits of a customer\'s Social Security number. Which of the following techniques is being used?',
    a: ['Masking', 'Hashing', 'Tokenization', 'Encryption'],
    c: 0,
    e: 'Data masking hides part of the data (e.g., ***-**-1234) so users see only what they need.'
  },
  {
    o: '3.3',
    q: 'Data that is being processed in a system\'s RAM is in which of the following states?',
    a: ['Data in use', 'Data at rest', 'Data in transit', 'Data sovereignty'],
    c: 0,
    e: 'Data in use is actively being processed in memory or CPU. Data at rest is stored; data in transit is moving across a network.'
  },
  {
    o: '3.3',
    q: 'Which of the following data classifications would MOST likely apply to a company\'s unreleased product designs?',
    a: ['Confidential/Proprietary', 'Public', 'Unclassified', 'Open source'],
    c: 0,
    e: 'Trade secrets and intellectual property such as unreleased designs are proprietary/confidential data.'
  },
  {
    o: '3.3',
    q: 'Which of the following types of data would be classified as regulated? (Select TWO).',
    a: ['Protected health information', 'Payment cardholder data', 'Published press releases', 'Public marketing brochures', 'Company holiday calendar', 'Open-source code'],
    c: [0, 1],
    e: 'PHI (HIPAA) and cardholder data (PCI DSS) are subject to regulatory and contractual requirements.'
  },
  {
    o: '3.4',
    q: 'A company needs a backup site that has power, networking, and hardware already installed but requires restoring the latest data before it can take over operations. Which of the following site types does this describe?',
    a: ['Warm site', 'Hot site', 'Cold site', 'Mobile site'],
    c: 0,
    e: 'A warm site has equipment and connectivity but needs current data restored. A hot site is fully ready; a cold site is just space and power.'
  },
  {
    o: '3.4',
    q: 'A business determines it can tolerate losing no more than 4 hours of transaction data during an outage. Which of the following metrics does this define?',
    a: ['RPO', 'RTO', 'MTTR', 'MTBF'],
    c: 0,
    e: 'Recovery point objective (RPO) is the maximum acceptable amount of data loss measured in time.'
  },
  {
    o: '3.4',
    q: 'A backup strategy performs a full backup on Sunday and each day backs up only the changes since the previous day\'s backup. Which of the following backup types is used Monday through Saturday?',
    a: ['Incremental', 'Differential', 'Full', 'Snapshot'],
    c: 0,
    e: 'Incremental backups capture changes since the last backup of any type. Differential captures all changes since the last full backup.'
  },
  {
    o: '3.4',
    q: 'Which of the following provides short-term power during an outage, allowing systems to shut down gracefully or until a generator starts?',
    a: ['UPS', 'PDU', 'Generator', 'Load balancer'],
    c: 0,
    e: 'An uninterruptible power supply (UPS) provides immediate, short-term battery power.'
  },
  {
    o: '3.4',
    q: 'An organization deploys its application in two cloud regions, both actively serving traffic. If one region fails, the other continues serving all users. Which of the following does this BEST describe?',
    a: ['Active/active high availability', 'Cold site', 'Active/passive with manual failover', 'Tape backup rotation'],
    c: 0,
    e: 'In an active/active configuration, all nodes or sites handle traffic simultaneously, providing high availability.'
  },
  {
    o: '3.4',
    q: 'A company wants to verify its disaster recovery plan by actually moving production operations to the backup site. Which of the following tests is this?',
    a: ['Failover test', 'Tabletop exercise', 'Simulation', 'Walk-through'],
    c: 0,
    e: 'A failover test actually switches operations to the backup systems, making it the most thorough—and disruptive—DR test.'
  },
  {
    o: '3.4',
    q: 'A company uses servers from multiple hardware vendors and two different cloud providers so that a single vendor flaw cannot take down all systems. Which of the following concepts does this represent?',
    a: ['Platform diversity', 'Capacity planning', 'Load balancing', 'Journaling'],
    c: 0,
    e: 'Platform (vendor/technology) diversity reduces the risk of a single point of failure caused by one vendor\'s flaw.'
  }
]
