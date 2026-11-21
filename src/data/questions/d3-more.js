// Domain 3: Security Architecture (additional questions)
export default [
  {
    o: '3.1',
    q: 'A company uses a cloud provider for compute but keeps its customer database in its own on-premises data center, with the two environments connected. Which of the following BEST describes this model?',
    a: ['Hybrid cloud', 'Public cloud', 'Community cloud', 'Private cloud'],
    c: 0,
    e: 'A hybrid model combines on-premises (or private cloud) infrastructure with public cloud services.'
  },
  {
    o: '3.1',
    q: 'An application is packaged with its libraries and dependencies so it runs consistently on any host that shares the same OS kernel. Which of the following technologies is being used?',
    a: ['Containerization', 'Type 1 hypervisor', 'Air gap', 'Serverless'],
    c: 0,
    e: 'Containers package apps with dependencies and share the host kernel, making them lightweight and portable.'
  },
  {
    o: '3.1',
    q: 'Which of the following is a primary security benefit of a microservices architecture?',
    a: ['A compromise of one service can be contained without affecting the entire application', 'It removes the need for authentication between components', 'It eliminates all APIs', 'It requires no patching'],
    c: 0,
    e: 'Microservices isolate functions, which can limit the blast radius of a compromise (though APIs between them must be secured).'
  },
  {
    o: '3.1',
    q: 'A medical device runs a specialized operating system that must respond to sensor inputs within strict, guaranteed time limits. Which of the following BEST describes this OS?',
    a: ['RTOS', 'Hypervisor', 'Container', 'Thin client'],
    c: 0,
    e: 'A real-time operating system (RTOS) guarantees responses within defined time constraints.'
  },
  {
    o: '3.1',
    q: 'A network team wants to separate the control plane from the data plane so that network devices can be centrally programmed. Which of the following should the team implement?',
    a: ['Software-defined networking', 'Air gap', 'Physical isolation', 'Hub-based topology'],
    c: 0,
    e: 'SDN decouples the control plane from the data plane, allowing centralized programmable network management.'
  },
  {
    o: '3.1',
    q: 'When evaluating a new architecture, which of the following considerations refers to how quickly a system can be brought back online after a failure?',
    a: ['Ease of recovery', 'Scalability', 'Patch availability', 'Compute'],
    c: 0,
    e: 'Ease of recovery describes how readily a system can be restored after an incident or failure.'
  },
  {
    o: '3.2',
    q: 'A company places its public web servers in a network segment between the internet and the internal network. Which of the following BEST describes this segment?',
    a: ['Screened subnet', 'Intranet', 'Air-gapped network', 'VLAN trunk'],
    c: 0,
    e: 'A screened subnet (DMZ) hosts public-facing services while protecting the internal network.'
  },
  {
    o: '3.2',
    q: 'An IDS is connected to a switch\'s SPAN port to monitor traffic without being able to block it. Which of the following BEST describes this deployment?',
    a: ['Passive', 'Inline', 'Fail-closed', 'Active/active'],
    c: 0,
    e: 'A passive sensor receives a copy of traffic (via TAP or SPAN) and can alert but cannot block traffic.'
  },
  {
    o: '3.2',
    q: 'A company wants employees\' web traffic to be filtered for malicious sites and to hide internal IP addresses from websites. Which of the following should be deployed?',
    a: ['Forward proxy', 'Reverse proxy', 'Load balancer', 'Jump server'],
    c: 0,
    e: 'A forward proxy handles outbound client requests, enabling content filtering and masking internal addresses.'
  },
  {
    o: '3.2',
    q: 'Which of the following devices accepts inbound requests from the internet on behalf of internal web servers, often providing caching and TLS offloading?',
    a: ['Reverse proxy', 'Forward proxy', 'Network TAP', 'Unified threat management'],
    c: 0,
    e: 'A reverse proxy sits in front of servers and handles inbound client requests for them.'
  },
  {
    o: '3.2',
    q: 'A small business wants a single appliance that combines firewall, antivirus, content filtering, and VPN functions. Which of the following should it purchase?',
    a: ['UTM', 'WAF', 'NAC', 'HSM'],
    c: 0,
    e: 'Unified threat management (UTM) consolidates multiple security functions into one device.'
  },
  {
    o: '3.2',
    q: 'A remote employee\'s VPN is configured so only traffic destined for corporate resources goes through the tunnel, while other internet traffic goes directly out. Which of the following BEST describes this configuration?',
    a: ['Split tunnel', 'Full tunnel', 'Site-to-site', 'Clientless'],
    c: 0,
    e: 'A split tunnel sends only corporate traffic over the VPN. A full tunnel sends all traffic through the VPN.'
  },
  {
    o: '3.2',
    q: 'Which of the following secure protocols should replace Telnet for remote command-line administration of network devices?',
    a: ['SSH', 'FTP', 'SNMPv1', 'HTTP'],
    c: 0,
    e: 'SSH provides encrypted remote shell access, replacing cleartext Telnet.'
  },
  {
    o: '3.2',
    q: 'A security engineer is choosing controls for an enterprise network. Which of the following device attributes describes whether a security device sits directly in the traffic path?',
    a: ['Inline vs. tap/monitor', 'Active vs. passive authentication', 'Hot vs. cold', 'Symmetric vs. asymmetric'],
    c: 0,
    e: 'Inline devices are in the traffic path and can block; tap/monitor devices receive copies and only observe.'
  },
  {
    o: '3.3',
    q: 'Which of the following methods to secure data restricts access based on the physical or network location of the user requesting it?',
    a: ['Geographic restrictions', 'Hashing', 'Obfuscation', 'Segmentation by department'],
    c: 0,
    e: 'Geographic restrictions (geofencing/geo-IP) limit access to data based on location.'
  },
  {
    o: '3.3',
    q: 'An organization classifies information so that disclosure of it would cause serious harm to the business. Which of the following labels is MOST appropriate?',
    a: ['Sensitive/Confidential', 'Public', 'Unrestricted', 'Open'],
    c: 0,
    e: 'Data whose exposure could seriously harm the organization is labeled sensitive or confidential.'
  },
  {
    o: '3.3',
    q: 'A company wants to ensure that only authorized applications can read files in a storage bucket, even if the bucket is accidentally made public. Which of the following provides the BEST protection?',
    a: ['Encrypting the data with keys the application controls', 'Renaming the files', 'Compressing the files', 'Moving files to a different folder'],
    c: 0,
    e: 'Encryption ensures the data is unreadable without the key, even if access controls fail.'
  },
  {
    o: '3.3',
    q: 'Which of the following data types identifies a specific individual and must be protected under many privacy laws?',
    a: ['PII', 'Public financial filings', 'Anonymized statistics', 'Marketing copy'],
    c: 0,
    e: 'Personally identifiable information (PII) can identify an individual and is protected by privacy regulations.'
  },
  {
    o: '3.4',
    q: 'A company wants to ensure its web application stays available if one server fails. Which of the following should be implemented?',
    a: ['Server clustering with load balancing', 'Tape backups', 'Cold site', 'Annual tabletop exercise'],
    c: 0,
    e: 'Clustering and load balancing provide redundancy so the service continues if one node fails.'
  },
  {
    o: '3.4',
    q: 'A company takes a point-in-time copy of a virtual machine before applying a major update so it can quickly revert if needed. Which of the following is this?',
    a: ['Snapshot', 'Differential backup', 'Journaling', 'Replication'],
    c: 0,
    e: 'A snapshot captures the state of a VM or volume at a point in time for quick rollback.'
  },
  {
    o: '3.4',
    q: 'A database records every transaction in a log before applying it, so the database can be reconstructed after a crash. Which of the following does this describe?',
    a: ['Journaling', 'Snapshotting', 'Load balancing', 'Tokenization'],
    c: 0,
    e: 'Journaling records changes before they are committed, allowing recovery to a consistent state.'
  },
  {
    o: '3.4',
    q: 'A company stores backup copies at a location 300 miles away from its primary data center. Which of the following risks does this MOST directly address?',
    a: ['Regional disasters affecting the primary site', 'Insider threats', 'Phishing attacks', 'SQL injection'],
    c: 0,
    e: 'Geographic dispersal of backups protects against natural disasters or regional outages at the primary site.'
  },
  {
    o: '3.4',
    q: 'A company continuously copies data from its primary storage array to a secondary array in real time. Which of the following BEST describes this?',
    a: ['Replication', 'Incremental backup', 'Snapshot', 'Archiving'],
    c: 0,
    e: 'Replication copies data to another location in near real time, minimizing data loss.'
  },
  {
    o: '3.4',
    q: 'An organization examines whether it has enough staff, technology, and infrastructure to handle projected growth and surges in demand. Which of the following is this?',
    a: ['Capacity planning', 'Tabletop exercise', 'Risk transference', 'Gap analysis'],
    c: 0,
    e: 'Capacity planning ensures people, technology, and infrastructure can meet future demand.'
  },
  {
    o: '3.4',
    q: 'The DR team runs a test in which the backup systems are activated and processed in parallel with production, without shutting production down. Which of the following tests is this?',
    a: ['Parallel processing', 'Tabletop exercise', 'Full failover', 'Walk-through'],
    c: 0,
    e: 'Parallel processing tests run the backup systems alongside production to verify they work without disrupting operations.'
  }
]
