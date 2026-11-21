// Domain 5: Security Program Management and Oversight (additional questions)
export default [
  {
    o: '5.1',
    q: 'A board of directors establishes a committee responsible for overseeing the organization\'s security strategy and risk decisions. Which of the following does this represent?',
    a: ['Governance structure', 'Incident response team', 'Change advisory board', 'Red team'],
    c: 0,
    e: 'Boards and committees form the governance structure that oversees security strategy and accountability.'
  },
  {
    o: '5.1',
    q: 'Which of the following documents provides recommended, but not mandatory, practices for configuring secure workstations?',
    a: ['Guideline', 'Standard', 'Policy', 'Regulation'],
    c: 0,
    e: 'Guidelines are recommendations that offer flexibility, unlike mandatory standards and policies.'
  },
  {
    o: '5.1',
    q: 'An organization documents how it will continue critical business operations during a prolonged disruption. Which of the following policies does this describe?',
    a: ['Business continuity policy', 'Acceptable use policy', 'Password policy', 'Data classification policy'],
    c: 0,
    e: 'A business continuity policy addresses how essential functions continue during and after a disruption.'
  },
  {
    o: '5.1',
    q: 'Which of the following external considerations would MOST likely require a multinational company to adjust its data handling procedures in each country?',
    a: ['Local and national regulations', 'Internal team preferences', 'Office layout', 'Employee job titles'],
    c: 0,
    e: 'Regulatory, legal, and industry requirements vary by jurisdiction and drive governance decisions.'
  },
  {
    o: '5.1',
    q: 'A company documents the steps developers must follow to securely build, test, and release software. Which of the following does this BEST describe?',
    a: ['Software development lifecycle (SDLC) policy', 'Business impact analysis', 'Risk register', 'Memorandum of agreement'],
    c: 0,
    e: 'An SDLC policy defines secure processes for developing and releasing software.'
  },
  {
    o: '5.2',
    q: 'A risk analyst calculates that a server outage would cost $20,000 per incident and is expected to occur four times per year. What is the ALE?',
    a: ['$80,000', '$5,000', '$20,000', '$24,000'],
    c: 0,
    e: 'ALE = SLE × ARO = $20,000 × 4 = $80,000.'
  },
  {
    o: '5.2',
    q: 'A company installs a web application firewall to reduce the likelihood of a successful SQL injection attack. Which of the following risk responses is this?',
    a: ['Mitigate', 'Transfer', 'Accept', 'Avoid'],
    c: 0,
    e: 'Implementing controls to reduce likelihood or impact is risk mitigation.'
  },
  {
    o: '5.2',
    q: 'Management reviews a low-impact risk and decides the cost of controls outweighs the potential loss, so no action is taken. Which of the following risk responses is this?',
    a: ['Accept', 'Avoid', 'Transfer', 'Mitigate'],
    c: 0,
    e: 'Risk acceptance acknowledges the risk and chooses not to take further action, typically when cost exceeds benefit.'
  },
  {
    o: '5.2',
    q: 'Which of the following metrics measures the average time a repairable system operates between failures?',
    a: ['MTBF', 'MTTR', 'RPO', 'RTO'],
    c: 0,
    e: 'Mean time between failures (MTBF) measures reliability. MTTR measures the average time to repair.'
  },
  {
    o: '5.2',
    q: 'A risk register entry includes a metric that warns the security team when the number of unpatched critical systems exceeds 10. Which of the following does this metric represent?',
    a: ['Key risk indicator', 'Risk owner', 'Risk appetite statement', 'Inherent risk'],
    c: 0,
    e: 'Key risk indicators (KRIs) are metrics that signal increasing risk exposure.'
  },
  {
    o: '5.2',
    q: 'An organization performs a risk assessment only when a major change occurs, such as a merger. Which of the following BEST describes this type of assessment?',
    a: ['Ad hoc', 'Continuous', 'Recurring', 'Annual'],
    c: 0,
    e: 'Ad hoc assessments are performed as needed in response to specific events rather than on a schedule.'
  },
  {
    o: '5.2',
    q: 'Which of the following describes a company that is risk-averse?',
    a: ['Conservative risk appetite', 'Expansionary risk appetite', 'High risk tolerance', 'Neutral risk register'],
    c: 0,
    e: 'A conservative risk appetite indicates the organization prefers to avoid risk; expansionary indicates willingness to take more risk.'
  },
  {
    o: '5.3',
    q: 'A company wants to be notified within 24 hours if its cloud provider experiences a breach affecting company data. Where should this requirement be documented?',
    a: ['In the vendor contract/agreement', 'In the acceptable use policy', 'In the risk register only', 'In the employee handbook'],
    c: 0,
    e: 'Breach notification obligations should be written into the vendor agreement so they are enforceable.'
  },
  {
    o: '5.3',
    q: 'Which of the following agreements establishes the general terms, such as payment and liability, that will apply to all future work between two companies?',
    a: ['MSA', 'SOW', 'SLA', 'NDA'],
    c: 0,
    e: 'A master service agreement (MSA) defines overarching terms; individual SOWs define specific work.'
  },
  {
    o: '5.3',
    q: 'A company requires a vendor to fill out a detailed security questionnaire and provide its latest SOC 2 report before onboarding. Which of the following activities is this?',
    a: ['Vendor assessment', 'Penetration testing', 'Rules of engagement', 'Change management'],
    c: 0,
    e: 'Vendor assessments use questionnaires, audit reports, and evidence to evaluate a vendor\'s security.'
  },
  {
    o: '5.3',
    q: 'After onboarding, a company continues to review its vendor\'s security posture and performance on a regular basis. Which of the following is this?',
    a: ['Vendor monitoring', 'Due diligence', 'Vendor selection', 'Right-to-audit'],
    c: 0,
    e: 'Ongoing vendor monitoring ensures third parties continue to meet security and performance expectations.'
  },
  {
    o: '5.3',
    q: 'A company shares sensitive product plans with a contractor and wants to legally prevent the contractor from disclosing them. Which of the following should be signed?',
    a: ['NDA', 'SLA', 'MOU', 'BPA'],
    c: 0,
    e: 'A non-disclosure agreement (NDA) legally binds parties to keep shared information confidential.'
  },
  {
    o: '5.3',
    q: 'Which of the following is the BEST way to identify conflicts of interest when selecting a vendor?',
    a: ['Conduct due diligence on ownership and relationships', 'Choose the lowest bidder', 'Rely on the vendor\'s marketing materials', 'Skip the contract review'],
    c: 0,
    e: 'Due diligence during vendor selection includes identifying conflicts of interest.'
  },
  {
    o: '5.4',
    q: 'A healthcare provider in the United States must protect patient medical records. Which of the following regulations applies?',
    a: ['HIPAA', 'PCI DSS', 'GLBA', 'FERPA'],
    c: 0,
    e: 'HIPAA governs the protection of protected health information (PHI) in the United States.'
  },
  {
    o: '5.4',
    q: 'A company must submit an annual report to regulators confirming its security controls meet requirements. Which of the following compliance activities is this?',
    a: ['External compliance reporting', 'Internal monitoring', 'Phishing simulation', 'Risk transference'],
    c: 0,
    e: 'External compliance reporting communicates the organization\'s compliance status to regulators or other outside parties.'
  },
  {
    o: '5.4',
    q: 'A company uses automated tools to continuously check that its systems meet regulatory configuration requirements. Which of the following BEST describes this?',
    a: ['Compliance monitoring with automation', 'Attestation by an external auditor', 'Due care', 'Legal hold'],
    c: 0,
    e: 'Automated compliance monitoring continuously verifies controls against requirements.'
  },
  {
    o: '5.4',
    q: 'Under privacy regulations, which of the following refers to the individual whose personal data is being collected?',
    a: ['Data subject', 'Data controller', 'Data processor', 'Data custodian'],
    c: 0,
    e: 'The data subject is the person the personal data is about.'
  },
  {
    o: '5.5',
    q: 'A penetration tester is given only the company name and must discover everything else on their own. Which of the following BEST describes this test?',
    a: ['Unknown environment', 'Known environment', 'Partially known environment', 'Integrated audit'],
    c: 0,
    e: 'In an unknown environment (black box) test, the tester has no prior knowledge of the target.'
  },
  {
    o: '5.5',
    q: 'A penetration tester runs an Nmap scan against the target\'s public IP range to identify open ports. Which of the following BEST describes this activity?',
    a: ['Active reconnaissance', 'Passive reconnaissance', 'Persistence', 'Pivoting'],
    c: 0,
    e: 'Active reconnaissance directly interacts with target systems, such as port scanning.'
  },
  {
    o: '5.5',
    q: 'After gaining access to one system, a penetration tester uses it to attack other systems on an internal network that is not directly reachable. Which of the following is this?',
    a: ['Pivoting/lateral movement', 'Passive reconnaissance', 'Footprinting', 'Fuzzing'],
    c: 0,
    e: 'Pivoting uses a compromised host as a launch point to reach other systems.'
  },
  {
    o: '5.5',
    q: 'A company\'s internal audit team reviews the security program to verify that controls are in place and working. Which of the following BEST describes this?',
    a: ['Internal audit', 'External attestation', 'Regulatory examination', 'Vendor assessment'],
    c: 0,
    e: 'Internal audits are performed by the organization\'s own audit function to assess controls.'
  },
  {
    o: '5.5',
    q: 'A penetration test focuses on evaluating the physical security of a data center, including attempting to bypass badge readers. Which of the following types of test is this?',
    a: ['Physical penetration test', 'Defensive test', 'Integrated test', 'Code review'],
    c: 0,
    e: 'Physical penetration tests evaluate controls like locks, badges, and guards.'
  },
  {
    o: '5.6',
    q: 'An employee receives an email asking them to verify their credentials. They notice the sender\'s domain is misspelled. According to security awareness training, which of the following should the employee do FIRST?',
    a: ['Report the email using the phishing report process', 'Reply asking if it is legitimate', 'Click the link to check the site', 'Forward it to all coworkers'],
    c: 0,
    e: 'Users should report suspected phishing through the designated process rather than interacting with it.'
  },
  {
    o: '5.6',
    q: 'A security team tracks the percentage of employees who report simulated phishing emails over time. Which of the following is this an example of?',
    a: ['Measuring awareness program effectiveness', 'Risk transference', 'Due diligence', 'Change management'],
    c: 0,
    e: 'Reporting and monitoring metrics help measure and improve the security awareness program.'
  },
  {
    o: '5.6',
    q: 'Which of the following user behaviors should security awareness training teach employees to recognize as risky? (Select TWO).',
    a: ['Reusing passwords across sites', 'Leaving sensitive documents on a printer', 'Locking their screen when away', 'Using the company password manager', 'Reporting suspicious emails', 'Wearing a visible badge'],
    c: [0, 1],
    e: 'Password reuse and unattended sensitive documents are risky behaviors; the other options are good security practices.'
  },
  {
    o: '5.6',
    q: 'An organization updates its security awareness training to address threats like deepfake voice calls impersonating executives. Which of the following does this demonstrate?',
    a: ['Adapting training to emerging threats', 'Risk avoidance', 'Data sovereignty', 'Attestation'],
    c: 0,
    e: 'Awareness programs should be updated regularly to cover new and evolving social engineering techniques.'
  }
]
