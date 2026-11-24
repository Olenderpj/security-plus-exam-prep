// Resilience, availability and recovery questions in the exam's own style: a short scenario with a constraint,
// then "which of the following BEST...". They replace the availability-percentage and storage-arithmetic
// generators. Difficulty rises with the reasoning needed (look-alike options that are each partly true, several
// constraints at once, trade-offs, reading an architecture, troubleshooting a failed failover, spotting hidden
// shared dependencies), not with harder arithmetic.
// d = domain, o = objective, lv = difficulty (1-10), q, a = options, c = correct index (or array), e = explanation,
// x = exhibit, w = two alternative wordings of the question. RTO/RPO/MTBF/MTTR sit under 5.2 (business impact analysis).
export default [
  // ───────────── Applied (about 4.5–6) ─────────────
  {
    d: 3, o: '3.4', lv: 4.6,
    q: 'Which of the following SLA availability targets allows the LEAST unplanned downtime in a year?',
    a: ['99%', '99.5%', '99.9%', '99.99%'],
    c: 3,
    e: 'Each additional nine cuts the permitted downtime by about a factor of ten: 99% allows roughly three and a half days a year, 99.9% about nine hours, and 99.99% under an hour. The exam expects you to know that more nines means less downtime, not to compute the exact figure.',
    w: ['A provider offers four availability targets. Which one guarantees the least downtime over a year?', 'Which uptime commitment in an SLA is the strictest?']
  },
  {
    d: 5, o: '5.2', lv: 5.2,
    q: 'A procurement team is comparing two storage arrays. Vendor A lists a mean time between failures (MTBF) of 200,000 hours and Vendor B lists 120,000 hours. Which of the following does Vendor A\'s figure indicate?',
    a: ['The array is expected to run longer between failures', 'The array can be repaired faster after a failure', 'Less data will be lost when the array fails', 'The array meets a shorter recovery time objective'],
    c: 0,
    e: 'MTBF measures reliability: the average time a repairable system runs between failures. It says nothing about repair speed (that is MTTR), data loss (RPO) or the time the business needs to be restored (RTO).',
    w: ['Two vendors publish MTBF figures for their arrays: 200,000 hours and 120,000 hours. What does the higher figure tell the buyer?', 'What does a longer MTBF on a vendor datasheet indicate?']
  },
  {
    d: 5, o: '5.2', lv: 5.4,
    q: 'After a ransomware incident, the CFO states that payroll must be back online within six hours, even if staff have to re-enter the last day of timesheets by hand. Which of the following does the six-hour requirement define?',
    a: ['Recovery point objective (RPO)', 'Recovery time objective (RTO)', 'Mean time to repair (MTTR)', 'Mean time between failures (MTBF)'],
    c: 1,
    e: 'The RTO is the business target for how quickly a service must be restored. The tolerated loss of a day of timesheets would be the RPO. MTTR is an average that is measured after the fact, not a business requirement.',
    w: ['Payroll must be running again within six hours of an outage, even if the last day of entries has to be redone. What is the six-hour figure?', 'Management sets a six-hour limit on how long payroll may be unavailable. Which metric is this?']
  },
  {
    d: 3, o: '3.4', lv: 5.5,
    q: 'A small credit union\'s business impact analysis shows that its loan-origination system can be down for up to five days without serious harm, and leadership wants to spend as little as possible on recovery. Which of the following recovery sites BEST meets these requirements?',
    a: ['Hot site', 'Warm site', 'Cold site', 'Active/active deployment in a second cloud region'],
    c: 2,
    e: 'A long tolerated outage and a minimal budget point to a cold site (space, power and connectivity only). The other options buy recovery speed the business does not need.',
    w: ['A system can tolerate five days of downtime and the budget for recovery is minimal. Which recovery site is MOST appropriate?', 'Given a five-day tolerable outage and a very low recovery budget, which site type should the organization choose?']
  },
  {
    d: 3, o: '3.4', lv: 5.5,
    q: 'A data center must keep operating through a six-hour utility power outage. Which of the following BEST meets this requirement?',
    a: ['A UPS only', 'A generator only', 'A UPS together with a generator', 'Dual internet service providers'],
    c: 2,
    e: 'A UPS bridges the gap while a generator starts and then carries the load for as long as it has fuel. A UPS alone runs out of battery in minutes; a generator alone leaves a gap while it starts, which would crash unprotected equipment. Dual ISPs protect connectivity, not power.',
    w: ['Utility power is lost for six hours. Which power design keeps a data center running without interruption?', 'Which combination provides both immediate and long-duration power protection?']
  },
  {
    d: 3, o: '3.4', lv: 5.6,
    q: 'A company has run nightly backups for three years but has never restored from them. Which of the following activities BEST validates that the backups will work when needed?',
    a: ['Increasing the retention period', 'Performing periodic test restores', 'Compressing the backup files', 'Adding a second backup schedule'],
    c: 1,
    e: 'Only a test restore proves that data can actually be recovered and that the procedure and timing work. Retention, compression and additional schedules say nothing about whether a restore succeeds.',
    w: ['Backups have never been restored in three years of operation. What should the team do to know they are usable?', 'How can an organization confirm that its backups are reliable?']
  },
  {
    d: 3, o: '3.4', lv: 5.7,
    q: 'Backup tapes are sent to a third-party vault each week. Which of the following BEST protects the confidentiality of the data if a tape is lost in transit?',
    a: ['Encrypting the backups, with the keys stored separately from the media', 'Labeling the tapes with generic names', 'Storing two copies in the same case', 'Shortening the retention period'],
    c: 0,
    e: 'Encryption makes a lost tape unreadable, and keeping keys apart from the media means a thief does not get both. Generic labels hide nothing from a determined attacker, and the other options do not address confidentiality.',
    w: ['Weekly backup tapes travel offsite. What control protects the data if a tape goes missing?', 'Which measure keeps data on an offsite backup tape confidential if it is lost?']
  },
  {
    d: 3, o: '3.4', lv: 5.8,
    q: 'A company runs a stateful database on two servers that share storage. If the active server fails, the second must take over automatically. Which of the following is the MOST appropriate high-availability approach?',
    a: ['A round-robin load balancer in front of both servers', 'A failover cluster', 'A reverse proxy with caching', 'A warm site in another city'],
    c: 1,
    e: 'Clustering makes several servers act as one system with shared state or storage and automatic failover. A load balancer spreads requests across independent servers, which does not suit a single shared, stateful database. A reverse proxy and a warm site do not provide automatic local failover.',
    w: ['Two database servers share storage and one must automatically assume the workload if the other fails. Which approach fits?', 'Which high-availability technique BEST suits a stateful database that must fail over automatically between two nodes?']
  },
  {
    d: 3, o: '3.4', lv: 6.0,
    q: 'A company wants to verify that its backup site can carry the production workload without interrupting the live systems. Which of the following tests should it run?',
    a: ['Tabletop exercise', 'Walk-through', 'Parallel processing test', 'Full failover test'],
    c: 2,
    e: 'In a parallel test the recovery systems run alongside production, so capacity and results can be checked while production stays up. A full failover test moves production and risks disruption; tabletop exercises and walk-throughs only discuss the plan.',
    w: ['Which disaster-recovery test checks the backup site under real load while production keeps running?', 'The team needs to prove that the recovery site works without taking production offline. Which test is appropriate?']
  },
  {
    d: 3, o: '3.2', lv: 6.0,
    q: 'Electronic locks on the exit doors of an office building must behave safely when power is lost. Which of the following configurations BEST protects people?',
    a: ['Fail-open, so the doors unlock', 'Fail-closed, so the doors stay locked', 'Fail-closed, with a UPS for the badge readers only', 'Disable the locks permanently during working hours'],
    c: 0,
    e: 'When human safety is at stake, a device should fail open (fail-safe): exit doors unlock so people can leave. Failing closed traps occupants. Security can be preserved by other means, but safety comes first.',
    w: ['What should happen to exit-door electronic locks when power fails, to protect occupants?', 'Which failure mode is appropriate for life-safety door locks?']
  },
  {
    d: 3, o: '3.2', lv: 6.4,
    q: 'Which of the following devices should be configured to fail closed if it stops working?',
    a: ['An in-line firewall protecting a payment-card network', 'A network monitoring tap in front of a patient-monitoring system', 'The electronic exit doors on a fire escape', 'A load balancer in front of a public marketing site'],
    c: 0,
    e: 'Failing closed blocks all traffic when a device fails, which protects a high-value network at the cost of availability. Life-safety systems and monitoring that must not interrupt care should fail open, and a marketing site favours availability.',
    w: ['In which case is it correct for the device to block everything when it fails?', 'Choose the device whose failure should stop all traffic rather than let it through.']
  },

  // ───────────── Analytical (about 6–7.5) ─────────────
  {
    d: 3, o: '3.4', lv: 6.5,
    q: 'A company runs a payment API in two data centers. Leadership wants both sites serving customers during normal operation, with traffic shifting automatically if either site fails. Which of the following BEST meets these requirements?',
    a: ['Active/active load balancing across both sites', 'An active/passive failover cluster with the second site on standby', 'A warm site with nightly data replication', 'Geographically dispersed offsite backups'],
    c: 0,
    e: 'Active/active uses the hardware at both sites day to day and shifts traffic on failure. Active/passive also fails over automatically but leaves the standby site idle; a warm site and backups need manual recovery steps.',
    w: ['Both data centers must serve live traffic at all times and take over for each other automatically. Which design fits?', 'Which high-availability design uses the capacity of both sites during normal operations?']
  },
  {
    d: 3, o: '3.4', lv: 6.8,
    x: `Internet
  ISP-A, ISP-B (two providers, diverse paths)
      |
  FW-1 / FW-2            (high-availability pair)
      |
  LB-1 / LB-2            (high-availability pair)
      |
  WEB-1  WEB-2  WEB-3    (identical, load balanced)
      |
  DB-1                   (single database server)
      |
  SAN-1                  (dual controllers, RAID 6)

Power: two utility feeds, UPS and generator`,
    q: 'Which component in the exhibit is the single point of failure for the application?',
    a: ['ISP-A', 'LB-1', 'DB-1', 'SAN-1'],
    c: 2,
    e: 'Everything else in the design is duplicated: two ISPs, paired firewalls and load balancers, three web servers, dual controllers with RAID 6, and redundant power. Only the single database server DB-1 would take the application down if it failed.',
    w: ['Review the architecture in the exhibit. Which element, if it failed, would stop the whole application?', 'Using the exhibit, identify the single point of failure.']
  },
  {
    d: 3, o: '3.4', lv: 6.8,
    q: 'Switching a nightly backup job from incremental to differential changes which TWO of the following? (Select TWO).',
    a: ['A restore needs fewer backup sets', 'Each night\'s backup grows larger as the week goes on', 'Each night\'s backup becomes smaller', 'A full backup is no longer required', 'A restore needs every nightly set since the full backup', 'Backups no longer need to be encrypted'],
    c: [0, 1],
    e: 'A differential backup holds everything changed since the last full backup, so it grows each night and uses more storage, but a restore needs only the full backup plus the latest differential. An incremental chain is smaller each night but a restore needs every set. A full backup is still the starting point.',
    w: ['Moving from incremental to differential backups affects which TWO things? (Select TWO).', 'Which TWO statements describe the effect of using differential instead of incremental backups? (Select TWO).']
  },
  {
    d: 3, o: '3.4', lv: 7.0,
    q: 'An order system must not lose more than fifteen minutes of data. Which of the following BEST meets this requirement?',
    a: ['Nightly differential backups', 'Hourly snapshots', 'Asynchronous replication to a standby site every few minutes', 'A weekly full backup with daily incrementals'],
    c: 2,
    e: 'Every option helps, but only frequent replication keeps the data loss window under fifteen minutes. Nightly or weekly backups can lose a day or more, and hourly snapshots can lose up to an hour.',
    w: ['The recovery point objective for an order system is fifteen minutes. Which solution satisfies it?', 'Which protection keeps data loss within a fifteen-minute limit?']
  },
  {
    d: 3, o: '3.4', lv: 7.3,
    q: 'Both application tiers of a company\'s service were unavailable when its cloud provider suffered a region-wide control-plane outage. Leadership wants resilience against a provider-wide failure. Which of the following BEST addresses this?',
    a: ['Deploy to a second availability zone in the same region', 'Deploy across two regions of the same provider', 'Use a multi-cloud design with a second provider', 'Increase the instance size in the current region'],
    c: 2,
    e: 'Extra zones or regions from the same provider still share the provider\'s identity, control plane and operational failures. Using a second provider (multi-cloud, with platform diversity) is what protects against a provider-wide failure. A larger instance does nothing for availability.',
    w: ['A single cloud provider\'s outage took the whole service down. Which strategy reduces dependence on that provider?', 'Which design protects against failure of an entire cloud provider?']
  },
  {
    d: 3, o: '3.4', lv: 7.4,
    q: 'A company\'s tabletop exercise concluded that its two-hour recovery time objective is achievable. Why is that conclusion unreliable compared with a failover test?',
    a: ['The tabletop only discussed the plan, so actual restore times were never measured', 'Tabletop exercises are only for physical security', 'Failover tests do not involve the recovery team', 'A tabletop exercise requires production to be shut down'],
    c: 0,
    e: 'A tabletop exercise is a discussion: no systems are actually recovered, so real restore times, hidden dependencies and failures are never exposed. A failover or parallel test exercises the real recovery and measures it.',
    w: ['Why does a successful tabletop exercise not prove that an RTO can be met?', 'What is the main limitation of validating a recovery time objective with a tabletop exercise?']
  },
  {
    d: 5, o: '5.2', lv: 7.6,
    q: 'A core switch fails about once every five years, but each failure takes 14 hours to resolve because spares are ordered on demand. Which of the following would MOST reduce the availability impact?',
    a: ['Keeping an on-site spare and a documented replacement procedure', 'Replacing the switch with a model that has a higher MTBF', 'Adding a second internet service provider', 'Increasing log retention on the switch'],
    c: 0,
    e: 'The failures are rare but the repair is slow, so the best fix lowers the mean time to repair: an on-site spare and a rehearsed procedure. A higher-MTBF model reduces an already rare event, and a second ISP and log retention do not address switch repair time.',
    w: ['A rarely failing core switch takes 14 hours to replace because there is no spare. What change helps availability the MOST?', 'Which action would best reduce downtime from a hardware failure that is infrequent but slow to repair?']
  },

  // ───────────── Advanced (about 7.5–8.9) ─────────────
  {
    d: 3, o: '3.4', lv: 8.0,
    q: 'A hospital system has a recovery time objective of two hours and a recovery point objective of five minutes. The budget rules out a hot site, and patient data must remain in the country. Which TWO measures BEST meet these requirements? (Select TWO).',
    a: ['Near-real-time replication of the data to a standby environment in the same country', 'Pre-provisioned warm standby capacity with a documented, regularly tested failover procedure', 'Daily encrypted tape backups stored offsite', 'Replicating to a lower-cost region in another country', 'A cold site with hardware to be shipped after a disaster', 'Monthly full backups with weekly incrementals'],
    c: [0, 1],
    e: 'Replication to an in-country standby meets the five-minute RPO without breaking the data-residency rule, and a warm standby with a rehearsed failover meets the two-hour RTO within a modest budget. Daily tapes and monthly fulls lose far more than five minutes, a foreign region violates residency, and a cold site cannot recover in two hours.',
    w: ['Which TWO measures satisfy a 2-hour RTO and a 5-minute RPO when a hot site is unaffordable and the data cannot leave the country? (Select TWO).', 'Choose the TWO actions that best meet the recovery requirements and constraints described. (Select TWO).']
  },
  {
    d: 3, o: '3.4', lv: 8.2,
    q: 'During a failover test, the warm site came up and passed its health checks, but about 40% of users could not reach the application for several hours. The application\'s DNS record has a TTL of 24 hours and was changed to the recovery site\'s address. What is the MOST likely cause?',
    a: ['Resolvers and clients are still using the cached record for the old address', 'The warm site has insufficient storage capacity', 'The backup encryption keys have expired', 'The load balancer has a hardware fault'],
    c: 0,
    e: 'A 24-hour TTL lets resolvers keep serving the old address long after the record changed, so some users still reach the failed site. The fix is planning: lower the TTL ahead of a failover (or use a failover method that does not depend on long-lived caches). The site itself passed its checks.',
    w: ['A recovery site tested healthy, yet many users still could not connect after failover. DNS TTL for the record is 86,400 seconds. What explains this?', 'Why did some users fail to reach the recovery site after a DNS change with a 24-hour TTL?']
  },
  {
    d: 5, o: '5.3', lv: 8.3,
    q: 'A cloud provider\'s SLA promises 99.9% availability with service credits for downtime but no commitment on restoration time. The company\'s business impact analysis requires a two-hour RTO for the system. Which statement BEST describes the situation?',
    a: ['The SLA credits satisfy the requirement because the provider is liable for downtime', 'The SLA compensates for outages but does not guarantee recovery within the RTO, so the company needs its own recovery measures or a different agreement', 'The RTO is irrelevant for cloud services', 'The SLA percentage is high enough that no further planning is needed'],
    c: 1,
    e: 'Credits are financial compensation, not recovery. A 99.9% target allows several hours of downtime a year and says nothing about how quickly service comes back after a given outage. The company must close the gap with its own redundancy and recovery plan or negotiate contractual restoration commitments.',
    w: ['The provider\'s SLA gives service credits but no restoration time, while the business needs a two-hour RTO. What is the correct assessment?', 'How should the company treat an SLA that does not guarantee restoration within the required RTO?']
  },
  {
    d: 3, o: '3.4', lv: 8.4,
    q: 'Backups were copied nightly to a network share mapped with domain administrator credentials. Ransomware that compromised an administrator encrypted both production data and the backups. Which of the following would have BEST prevented the loss of the backups?',
    a: ['Immutable or offline backups protected by separate credentials', 'More frequent backups to the same share', 'A larger backup share', 'Antivirus on the backup server only'],
    c: 0,
    e: 'Backups that an attacker with administrator rights can reach are as exposed as production. Immutable (write-once) or offline copies, with credentials separate from the domain, cannot be encrypted or deleted by the intruder. More frequent copies to the same reachable location simply give the ransomware more to encrypt.',
    w: ['Ransomware encrypted production data and the nightly backups on an admin-mapped share. Which control would have preserved the backups?', 'What would BEST protect backups from an attacker who has administrator access?']
  },
  {
    d: 3, o: '3.4', lv: 8.5,
    q: 'To achieve a near-zero RPO, an organization synchronously replicates its primary data center to a hot site ten miles away. A risk review finds that both sites share the same utility and the same hurricane zone. Which of the following BEST addresses the finding while keeping a near-zero RPO for local failures?',
    a: ['Move the hot site 800 miles away and keep synchronous replication', 'Keep the nearby site and add an asynchronous replica in a distant region', 'Install generators and UPS units at both sites', 'Replace replication with nightly encrypted backups stored offsite'],
    c: 1,
    e: 'Synchronous replication over very long distances adds latency that most applications cannot tolerate, and generators do nothing for a shared regional disaster. A tiered design keeps the nearby synchronous copy for local failures and adds a distant asynchronous replica for geographic dispersion.',
    w: ['A nearby hot site with synchronous replication shares the same hurricane zone as the primary. What is the BEST improvement that preserves the low RPO?', 'How can the organization add geographic dispersion without giving up near-zero data loss for local failures?']
  },
  {
    d: 3, o: '3.4', lv: 8.6,
    q: 'Order these steps for recovering from a ransomware attack when the attacker is known to have been in the network for a week before the data was encrypted.',
    t: 'order',
    items: [
      'Isolate the affected systems from the network',
      'Determine when the attacker first gained access',
      'Select a backup taken before that date and verify it is clean',
      'Restore to an isolated network and scan the restored systems',
      'Reconnect the systems and monitor closely'
    ],
    e: 'Contain first. Because the attacker had a week of access, the most recent backups may already contain their tools, so find the first compromise date and restore from a verified clean point before it. Restore and test in isolation before reconnecting, then monitor for re-infection.',
    w: ['Put the ransomware recovery actions in the correct order, given that the intruder had been present for a week.', 'Arrange the steps to recover safely after ransomware when the dwell time was a week.']
  },
  {
    d: 3, o: '3.4', lv: 8.8,
    q: 'Ransomware was detected on Friday. Forensics show the attacker had access since the previous Monday and encrypted files only on Friday. Backups run nightly and are kept for 30 days. Which approach BEST ensures the restored systems do not reintroduce the attacker?',
    a: ['Restore Thursday night\'s backup because it is the most recent', 'Restore from a backup taken before the first compromise after verifying that it is clean', 'Restore the latest backup and run antivirus afterwards', 'Rebuild nothing and rely on the endpoint detection tool'],
    c: 1,
    e: 'The attacker\'s access began before the encryption, so recent backups can contain implants and persistence. The safest approach is to restore from a point before the compromise, verify that it is clean, and then reapply legitimate changes. The newest backup minimizes data loss but may reintroduce the attacker.',
    w: ['The intruder was in the network for four days before encrypting data. Which restore choice is the SAFEST?', 'Which backup should be used to recover from ransomware when the attacker\'s dwell time was several days?']
  },
  {
    d: 3, o: '3.4', lv: 8.9,
    q: 'A software bug corrupted customer records at 14:10. Synchronous replication copied the corruption to the standby database immediately. Which capability would have allowed the company to recover the data as it was at 14:09?',
    a: ['Point-in-time recovery using database journaling or snapshots', 'A third replica in another region', 'Faster network links between the sites', 'An active/active database cluster'],
    c: 0,
    e: 'Replication and clustering protect against hardware and site failures, but they faithfully copy bad data. Recovering to an earlier moment needs point-in-time recovery from transaction journals or snapshots. More replicas or faster links only copy the corruption faster.',
    w: ['Replication copied corrupted records to the standby instantly. What would let the team return to the state just before the corruption?', 'Which control protects against logical corruption that high-availability replication cannot?']
  },
  {
    d: 3, o: '3.4', lv: 9.3,
    q: 'A company\'s two data centers are described as fully redundant, but a failover test shows that both fail whenever the authentication service in the primary site is down, because both sites authenticate against it. What does this test reveal?',
    a: ['A hidden shared dependency that is a single point of failure', 'That the sites need a faster network connection', 'That the standby site needs more storage', 'That a third data center is the only fix'],
    c: 0,
    e: 'Redundant sites are only as independent as the services they rely on. A shared authentication service is a hidden single point of failure; the remedy is redundant, independently available identity services at each site (and testing dependencies, not only servers). Bandwidth, storage or another site would not remove the shared dependency.',
    w: ['Two redundant sites both stop working when one authentication server fails. What is the underlying design flaw?', 'A failover test exposes that both sites depend on the same service. How should this finding be described?']
  }
]
