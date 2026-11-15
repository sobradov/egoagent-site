# EgoAgent: plan for the first working version

Status: plan only. Nothing is built. No existing file is changed.
Written 15 November 2026. Changed the same day: the app now starts on Google Cloud.

## The plan in short

- The goal is the five steps in your brief, unchanged.
- Your fixed rules and your left-out list hold.
- What changed: you expect real patients within one to three months. So the app starts on Google Cloud. Nothing is built twice.
- Cost now: about $14 a month. For the first 90 days Google pays its own part from a free credit. In that time only Anthropic costs you money: about $3 a month, paid ahead as one purchase of $10. AssemblyAI may ask for a small deposit.
- Cost with real patients: about $80 a month at the least. About $130 a month with the standby database that Google recommends for real use. About $150 a month with your own web address as well.
- Google's HIPAA agreement: you accept it yourself, by a click inside your Google account. Extra cost: $0. Part B says what I could not confirm.
- You open three new accounts. GitHub, which you have, is the fourth. Google Cloud is the long one: I estimate one to two hours.
- I build seven stages. You test each one on your iPad. I estimate 10 to 30 minutes for each test. Expect to repeat some tests after a fix, because I cannot try Safari or VoiceOver myself.
- Every test can be done by sight and with VoiceOver. Each test names the words you should see and hear.
- Part F is new. It lists what must be done before the first real patient recording, and what can start now.
- One to three months: three is realistic only if the build is finished by about week nine. One is unlikely. That is my judgement. I cannot promise a date. Each stage still waits for your test.
- I need three new answers from you. They are near the end.

## What changed since the earlier plan

- Rewritten: Part B, Part C, Part D and the costs.
- New in Part B: the part on Google's HIPAA agreement, the holding place for the recording, and four small Google parts.
- New: Part F, and three new questions near the end.
- Changed because of that: the short summary, the word list, the opening of Part E, one line each in questions 1 and 4, your answers, and the list of what was checked.
- Changed for your request about sight and VoiceOver: every test now names words to see and hear. The earlier plan named only what you should hear. That was a gap.
- Not changed: Part A, questions 2, 3 and 5, and your answers 2 to 5.

## Words used in this plan

- Secret key: a long password that lets our server use another company's service.
- HIPAA agreement: the HIPAA business associate agreement, often written B A A. A company signs it before it may handle patient data for you.
- VoiceOver: the screen reader built into the iPad, the iPhone and the Mac. I build for it. Tell me if you use another.
- Google Cloud: Google's service that rents out servers, databases and storage over the internet.
- Google Cloud console: Google's website where you manage your Google Cloud account. Console is Google's word for it.
- Project: Google's word for one separate work space inside your account. The test copy of the app lives in one project. The live copy later gets its own.
- Free trial: your first 90 days at Google Cloud. Google gives $300 of credit for them.
- Standby copy: a second copy of the database, in another data centre. It takes over if the first one fails.
- Cloud Shell: a command window inside the Google Cloud console. You paste one line of text into it.
- My build path: GitHub's machines, which put each new version of the app onto Google.

## Part A. What is in the repository now

- It is a design mockup of 16 files: one main page with nine screens, one walkthrough page, one helper script, ten films, two pictures and one empty settings file. GitHub shows it as plain web pages. No server stands behind it.
- The look is settled. Dark pages and gold headings. Night blue for sign in. Study green for the Casebook, Case and Hour screens.
- Nothing real runs. Sign in is only a link. Anyone can open the Casebook by typing its address. The patients and the transcript are samples. The upload box reads only the file's name and date.
- The Analyze button calls Anthropic straight from the page, with no secret key. On a public website that cannot work.
- General Psychoanalytic already exists, with a one-sentence instruction.
- The pages make many promises. Three bear on this first version, and the plan keeps them. The audio is deleted after transcription. The material is never used to train AI. Nothing is analyzed until the therapist presses the button.

## Part B. The choices: server, database, sign-in and transcription

Every price and agreement fact below was read on the company's own pages on 15 November 2026. Where that is not so, I say it. Now means this first version. Later means from the first real patient recording.

- All Google parts sit in one Google Cloud account, in the United States. The server, the database and the storage space are in Google's data centres in Iowa.
- One HIPAA agreement with Google covers every part I chose.
- Google stores all of it in encrypted form. Every connection to the app, and from the app to the database, is encrypted too. Both are Google's standard settings.
- The choice of Iowa, and of each Google part below, is my judgement. The facts beside each choice are from Google's pages.

### 1. The server: Google Cloud Run

- Choice: Cloud Run. It runs our app on Google's machines, and wakes it when someone opens a page.
- Reason: it is on the list of services that Google's HIPAA agreement covers. And there is no machine that anyone has to look after.
- Cost now: about $0 to $1 a month. The server sleeps when nobody uses it. The first page after a pause then takes some seconds. I measure how many in stage 1.
- Cost later: about $17 a month, give or take $3. That keeps one copy of the server awake, so pages open at once. This is my calculation from Google's price page.
- HIPAA agreement later: yes. Google's one agreement covers it.

### 2. The database: Google Cloud SQL

- Choice: Cloud SQL, running Postgres. Postgres is the same standard database as in the earlier plan. I compared other Google databases and found none both cheaper and fit for this app.
- Reason: Google runs it, backs it up every day and repairs it. It is on Google's covered list.
- Cost now: about $9.50 a month, on the smallest test size, with daily backups.
- Cost later: about $51 a month, on the smallest size that is not a test size, without a standby copy. Or about $102 a month with a standby copy.
- Google's pages say plainly: the small test sizes are not for real use. They also say a database without a standby copy is recommended only for tests. For real use Google recommends the standby copy. Only with the standby copy does Google promise how much of the time the database runs.
- Without the standby copy, a fault in that one data centre stops the app until the data centre works again, or until the database is restored by hand. Google's page says such a restore can lose the latest changes: up to one day with daily backups alone, about five minutes with Google's running record of changes. For the live copy I switch that record on, and tell you its price first.
- You choose between $51 and $102 just before real patients. Google's advice points to $102. I still suggest $51 while you are the only therapist, because a stop of some hours is bearable for one therapist. That is my judgement, and it goes against Google's advice. Ask the security reviewer.
- The live copy gets its own database at the real size from its first day. So nothing is moved. Adding the standby copy later takes the database offline for several minutes. Google's page says so.
- HIPAA agreement later: yes. The same Google agreement.

### 3. A holding place for the recording: Google Cloud Storage

This part is new.

- Choice: one private storage space at Google. The recording waits there only until the transcript is made.
- Reason: Google's server accepts at most 32 megabytes in one upload, and it has no disk of its own. So a recording cannot rest on the server. The storage space sits in the same Google account. There is no extra account and no extra agreement.
- Making the delete real: Google keeps a deleted file for seven more days unless that is switched off. I switch it off. Our server deletes the file, asks for it once more, and must get the answer not found.
- Google's HIPAA page advises the opposite for stored files: keep old versions. For this one storage space I keep none, so that deleted audio is really gone. The lawyer should know this.
- A safety net: a rule at Google deletes any finished file older than one day. Google does not promise the hour, so it can run late.
- One gap: an upload that breaks off half-way is not yet a file. The rule does not reach it. So our server cancels every unfinished upload itself, two hours after it began. If our server could not, Google closes the unfinished upload after one week.
- One limit you should know. Google's own pages say Google finishes wiping deleted data from its machines and backups within about 180 days. After our delete, we cannot bring the file back. The lawyer settles how the public promise is worded.
- Cost: about $0 a month at our size.
- HIPAA agreement later: yes. The same Google agreement.

### 4. Sign-in: built into the app

- Choice: sign-in is part of our own app. It uses the sign-in system of Django, a long-established free toolkit for building websites.
- Reason: there is no extra company, no extra account and no extra agreement.
- Cost now: $0 a month.
- HIPAA agreement later: none is needed for sign-in by itself. The Google agreement covers the server and the database.

### 5. Transcription: AssemblyAI

- Choice: AssemblyAI. This is unchanged.
- Reason: you can sign its HIPAA agreement yourself, online, at no extra charge. Of the ten services I compared, it is the only specialist where I could confirm that.
- Cost now: about $2.30 a month, for ten hours of test audio. That is 23 cents an hour, including speaker labels, which tell the voices apart. New accounts get $50 of free credit. So the first version should cost nothing here.
- Cost later: about $5 a month, for fifteen sessions of 90 minutes. This is my calculation. The fifteen sessions are my assumption. Tell me your real number.
- One change: how the recording reaches AssemblyAI. Our server gives AssemblyAI a link to the recording. The link works for one hour only. AssemblyAI's pages say that links from Google's storage are accepted. But their only worked example is for Amazon. Stage 5 proves it with a made-up recording. If it fails, our server passes the file on itself.
- HIPAA agreement later: yes. It is separate from Google's. The account owner signs it online, on a paid account.
- Weak point: Serbian. Your website offers Serbian. Their best model does not. Their wider model does, but by their own figures more than half the words come out wrong. Question 2 in Part E is about this.

### 6. The AI: the Anthropic API

You fixed this choice. This is what I checked.

- Model: Claude Opus 5.5. A model is one version of the AI. Anthropic's pages recommend starting with it. A cheaper model would save about $1.50 a month.
- Cost now: about 20 cents for one analysis. Fifteen a month is about $3. This is my calculation from Anthropic's price list.
- HIPAA agreement later: yes, with one unknown. It is separate from Google's. One Anthropic page says most organizations can accept it themselves inside their account. It does not say which ones cannot. A help article says to contact the sales team. We learn which applies when you open the account.
- A possible fallback, which you did not ask for: Claude reached through Google, in the same Google account. It would change the choice you fixed, so I would ask you first. It is not confirmed. One Google page speaks of HIPAA eligibility for one of its two Claude offers. Another says Claude models are not a Google product, and Google's covered list does not name Claude. I would use it only after Google says yes in writing.
- Anthropic's terms say it may not train its models on your content. Its standard setting keeps the text for up to 30 days. Text flagged by its safety system can be kept for up to two years.

### 7. Four small Google parts

- Secret Manager: Google's safe for secret keys. Our server reads the keys from it.
- Cloud Tasks: a queue for long work. It hands the work back to our server, and tries again if the work fails.
- Artifact Registry: a store for each built version of the app.
- Cloud Logging: the server's diary of errors. Google keeps it for 30 days. No patient text is ever written into it.
- All four are on Google's covered list. Together they cost about $0 to $1 a month at our size.
- Each new version is built on GitHub's machines. I expect that to cost $0. I could not re-read GitHub's price page today.

### Google's HIPAA agreement: how, by whom, at what cost

I read three of Google's own pages on 15 November 2026. The help page with the steps: it carries no date. The agreement text: last changed 22 September 2025. The HIPAA page with the covered list: updated 11 November 2026.

- How: by a click, inside your Google Cloud account. Google's help page gives these steps. Open the page named I A M and Admin. It is Google's page for access rights. Select a project. Below the heading Google Cloud Platform HIPAA Business Associate Addendum, press Review and Accept. Read the agreement. Press I Accept.
- When it counts: the agreement text says it takes effect when the customer clicks to accept.
- By whom: by you. The text says the person who clicks must have full legal authority to bind the customer. So I never press it.
- Who the customer is: whoever agreed to Google's terms for the account. My reading: your choice of Individual or Business names this customer. No Google page says it in those words. The lawyer confirms it. That is why the first new question matters.
- At what cost: $0 extra. The agreement text names no fee. Google's HIPAA page says HIPAA customers get the same services at the same pricing as everyone else. Zero extra cost is my reading of those two pages. No page says the word free.
- How often: once. Google says one click, in one project, counts for your account.
- What it covers: only the services on Google's list. Every Google part that I chose for this plan is on that list. Error Reporting, below, is the one open case. The agreement does not cover AssemblyAI or Anthropic.
- One rule from Google's page: do not put patient data into test features that Google has not fully released.
- What it does not do: it does not make the app lawful by itself. Google's page says the United States health department offers no HIPAA certificate, and that you stay responsible for what you build on Google's services.

What I could not confirm:

- Whether the button appears for an account opened by one person with an ordinary Google email. Google's steps ask only for a project. I cannot see the screen. So on the first day you look, and press nothing.
- Which role a person needs in the account to press it. Google's pages name none.
- Whether it can be accepted during the free trial. No page says yes or no. In this plan you leave the trial first.
- Whether the click can be taken back. The agreement text names no way. It ends only after a breach, or when your whole contract with Google ends. Treat the click as final.
- What the page shows after the click, and whether Google sends any proof. Google describes none. So you save your own proof.
- Whether projects made later are covered without a new click. My reading is yes. We look at the page again after any such change.
- Whether Google's error collector, named Error Reporting, is covered. The server copies errors into it by itself. It is not on the covered list under that name. So error messages never hold patient text. Before real patients I ask Google in writing.
- One other Google page, with no date, says organizations should talk to their account managers. The help page with the click steps has no date either. But Google's HIPAA page of 11 November 2026 points to that help page, and the agreement text describes the click. So we follow the click.
- How well that page works with VoiceOver.

### Total monthly cost

- Now: about $14 a month. That is about $10.50 to Google and about $3 to Anthropic. AssemblyAI is free while its credit lasts.
- During Google's free trial, Google pays its part from the $300 credit. Google says the card is not charged in the trial. So only Anthropic's part comes from your card. It is paid ahead, as one purchase of $10. AssemblyAI may ask for a small deposit as well.
- The free trial is only for a first-time customer of Google Cloud. Without it, about $14 a month leaves your card from the first day.
- With real patients, at the least: about $80 a month. That is about $70 to Google, about $5 to AssemblyAI and about $3 to Anthropic. The $70 is the server at about $17, the database at about $51, and the small parts.
- With the standby database that Google recommends for real use: add about $51 a month. That makes about $130.
- With your own web address: add about $18 a month to Google. The name itself also has a yearly fee. I have not priced it. Until then the app's address is one that Google gives. It ends in run.app.
- With both: about $150 a month.
- If the test copy keeps running beside the live copy: add about $10 a month.
- Every Google sum is my calculation from Google's list prices for Iowa.
- Once-only costs that I could not verify: the lawyer, the security review by a person, and insurance. Ask each for a price.
- A promise. I add no paid part without telling you the price and getting your yes.
- Not counted: sales tax, and your Claude plan, which the build itself uses. If your Claude plan reaches its limit, the build waits until it resets.

## Part C. Accounts you open, in order

Five rules first.

- Never paste a secret key into our chat, into GitHub or into an email. The same holds for your passwords, your backup codes and your card number. If one lands there by mistake, tell me. We cancel it and make a new one.
- When a step says read it to me, read only the words that the company put on the page.
- You never have to type a web address. Each step that says open names a link. I send the links in our chat, and you press them there.
- I cannot see your screens. Where I could not confirm a screen, the step says: not confirmed. If the screen shows a different name, or VoiceOver says one, stop. Tell me what it says. Press nothing you are unsure of. Where a name on the screen has the sign for and, I write the word and.
- At the start of every sitting with Google, check who is signed in. From memory: at the top right of each Google page is a round button for your account. VoiceOver reads your email there. By sight, press it to see the email. It must be the EgoAgent email. If it is another, stop and tell me.

### Account 1. GitHub

- You already have it. Cost: $0 a month. It holds code only, so it needs no HIPAA agreement.
- You create a new private repository named egoagent-app, and you allow Claude to work in it. Then you tell me in this same conversation.
- Turn on two-step sign-in for GitHub. It asks for a code from your phone at each sign-in. Save the recovery codes GitHub gives you. Whoever gets into your GitHub account can change the app on Google. So this lock matters.

### Account 2. Google Cloud

- What for: the server, the database and the storage space. Needed for stage 1.
- Time: I estimate one to two hours, best split over three sittings.
- Good places to stop: after step 17, after step 30 and after step 48. Do not stop between step 18 and step 27. I do not know whether the sign-up form keeps what you typed.
- Cost to open: $0.
- The steps are numbered from 1 to 54. If a step goes wrong, tell me its number.

#### Before you start

1. Use the device you name in new question 2. Do not start in the Google Cloud app for the iPhone or iPad. It cannot do the sign-up.
2. Check the browser. If you use Gmail, YouTube or another Google service in it, you are already signed in to a Google account. Sign out there first, or use a browser where you never sign in to Google. Otherwise the card and the sign-up can land on the wrong account. Treat that as final. Do not use a private window. In Safari, Google's command window does not work in one.
3. Put these within reach: the inbox of your EgoAgent email address, your iPhone, your password app, and one card. A credit card is the safer choice. Prepaid cards are refused. So are debit cards that ask for a code from your bank at each payment.
4. Know your answer to new question 1: Individual or Business. It can never be changed later.
5. Know the country. It is the country of your card's billing address. New question 3 asks about it. It sets the currency, and it can never be changed later.
6. Ask me for the first links and for the project name. I send them in one message.

#### A Google Account for EgoAgent

Skip to step 14 if a Google Account with your EgoAgent email already exists. A Gmail address is not needed.

Two things to tell me first, if they apply. One: this Google Account ever paid for Google Cloud, Google Maps Platform or Firebase, or had a free trial before. Then there is no free credit. Two: your EgoAgent email is a mailbox at Google Workspace. Then the steps differ, and I have not read Google's rules for that case.

7. Open the link named Google sign-in. If the page shows an account and no sign-in form, another Google account is signed in. Stop and tell me. Otherwise find the link named Create account. Press it.
8. A small menu opens. Choose: For my personal use. This is only the kind of sign-in. The owner of the Cloud account is set later, in step 22.
9. Not confirmed: type your first and last name. Press Next. Type your birthday and gender if asked. Press Next.
10. Find the link named Use your existing email. Press it. Type your EgoAgent email address. Press Next.
11. Google sends a code to that inbox. Type the code. Press Next.
12. Not confirmed: make a password when Google asks for one. Save it in your password app.
13. Not confirmed: if Google asks for a phone number, type your iPhone's number, then the code that Google sends by text message. If Google offers a recovery email, add one. If Google shows its terms, press the button to agree.

#### The second sign-in step

Google requires a second sign-in step before it lets anyone into the console. There are three kinds. A Google prompt is a yes-or-no question that Google sends to your iPhone. An authenticator app is a phone app that shows a fresh six-digit code. The third is a code by text message. Google says a new phone number can take up to seven days to be trusted. So choose the prompt or the app, and you need not wait.

14. Open the link named Second sign-in step. If the wrong page opens, find Security and sign-in, then the heading How you sign in to Google.
15. Find Turn on 2-Step Verification. Press it.
16. Not confirmed: follow the steps on the screen. Choose a Google prompt or an authenticator app. The prompt arrives only if the Gmail app or the Google app is on your iPhone, signed in with the EgoAgent email. If a screen asks you to scan a square code with the camera, stop and tell me.
17. Not confirmed, the name of the button: create backup codes in the same place. They are one-time codes for a day when the phone is missing. Save them in your password app. Without them, a lost phone locks you out while the card can still be charged.

#### Sign up for Google Cloud

I could not see these screens. Google's pages say what is asked, but not the exact names of the buttons. So steps 19 to 27 are not confirmed.

18. Open the link named Google Cloud sign-up. Check that the page shows your EgoAgent email, not another one. Complete the second sign-in step: answer Yes on the iPhone, or type the six-digit code.
19. Find the field named Country. Choose your country.
20. Find the tick box about the Terms of Service. Tick it. If there is a second tick box about news or email updates, leave it unticked.
21. Press the button that moves on. From memory its name is Continue, or Agree and continue.
22. Find Account type. Choose Individual or Business, as in step 4. Google also calls Business by the name Organization. If there is no Account type field, or the page speaks of an existing payments profile, stop and tell me. The type may be set already, and it cannot be changed. If any field asks about tax, stop and read it to me.
23. Type your name and billing address. If you chose Business, type the company's legal name where the page asks for it.
24. Type the card number, the expiry date and the security code.
25. A warning before you press. The next two pages, Welcome and billing, each carry a button named Activate. One Google page calls it Upgrade. Do not press it until I say so. It ends the free trial and lets Google charge your card. If you press it by mistake, a second window asks you to confirm. Do not confirm. Tell me.
26. Check that the page speaks of a free trial or of $300 in credit. If it does not, stop and tell me. Find the last button. From memory its name is Start free. If it is named Activate, Upgrade, Submit and enable billing, or anything about a paid or full account, do not press it. Read it to me first. Otherwise press it.
27. Wait for a page named Welcome. Tell me the first heading on it.
28. In the next days your bank may show a pending amount from Google, between $0 and $1. Google says it is a hold, not a charge. It goes away by itself.
29. Open the link named Billing. Google's page says you should find the words Free trial account, and a part named Free credit, with the credit and the days that are left. The Activate button sits in that same part. Leave it. Tell me what you find. If you find the words Paid account, stop and tell me.
30. Tell me today's date. I write it into this plan, with the dates of day 75 and day 90. Put day 75 into your own calendar too.

#### Create the project

Google makes a first project by itself, named My First Project. We do not use it.

31. Open the link named Manage resources. The heading is Manage resources.
32. Press the button named Create project.
33. In the field for the project name, type the name I sent you. It has no personal words in it.
34. Google makes a project ID from the name. Read it to me, and wait for my yes before you go on. It can never be changed after this screen.
35. If there is a field for the billing account, it should say My Billing Account. Leave it.
36. Find the field named Parent resource. Leave what is already there. It should be a name that ends in -org. Google made it by itself. Do not choose No organization.
37. Press the button named Create. Wait about one minute. Then I send new links for the steps that follow. Each holds your project ID, so that the right project opens. From memory this works. It is not confirmed.

#### A warning for spending

This makes Google send you an email when the month's cost passes a mark. It only warns. It stops nothing.

38. Open the link named Budgets. The heading is Budgets and alerts. If asked for a billing account, choose My Billing Account. Not confirmed: that a budget can be made during the free trial. If the page refuses, tell me.
39. Press the button named Create budget. One Google page calls it Create new budget.
40. In the part named Define, choose Alerts only. In the field named Name, type: Monthly warning. Press Next.
41. In the part named Scope, find the time range. It should say Monthly. Leave it.
42. Still in Scope, find the tick box named Promotions, or Promotional credits. Untick it. Without this, no warning arrives while the free credit pays. Press Next.
43. In the part named Amount, set Budget type to Specified amount. In the field named Target amount, type 30. Press Next.
44. In the part named Actions, three rows are already there: 50 percent, 90 percent and 100 percent. Leave them. Press Finish.
45. You now get an email at $15, at $27 and at $30. The amount of $30 is my judgement. A usual month now costs about $10.50. If an email comes, send it on to me, and press nothing. We raise the amount before real patients.

#### Look at the HIPAA page, and press nothing

46. Open the link named Privacy and Security. Not confirmed: the page's own name. It may say Privacy and Security, or I A M and Admin. Check that it shows your project, not My First Project.
47. Find the heading Google Cloud Platform HIPAA Business Associate Addendum. Not confirmed: if it is not there, find a tab or link named Legal and Compliance. Press that, and look again.
48. Press nothing else. Above all, press no button named Review and Accept. Google's help page shows two of them on this page. One belongs to a different agreement. Tell me the headings and buttons in the order you find them. This settles early the main thing I could not confirm.

#### Hand the building over to me

Wait for this until I say I am ready. I first test my own half on GitHub. That needs nothing from you.

What kind of step this is. You paste one line of text that I wrote. For about two minutes it acts with your own full powers over the Google account. It is the most powerful single step in this plan. You cannot check it yourself. A second AI helper will have checked it. That helper is not a person. If you want a person who knows such commands to read it first, say so.

49. Open the link named Welcome. After the heading Welcome come the project name, the project number and the project ID. The name must be the one from step 33. If it is My First Project, find the project picker at the top of the page and choose your project. Tell me the number and the ID. Neither is a secret.
50. I send you one line of text. Open our chat on the same device as the Google page. Copy the line. Copy nothing else after it.
51. Open the link named Command window. The window opens in the lower part of the page. Wait one full minute. Not confirmed: on a first visit a small window may ask you to continue or to agree to terms. Read it to me before you press.
52. Paste the line. On a Mac, press Command and V. Then press Return. The focus must be inside the command window. Not confirmed: whether it lands there by itself. If nothing happens, tell me, and press nothing else.
53. If a small window named Authorize Cloud Shell appears, press the button named Authorize. It lets the command window act with your sign-in for this one visit.
54. Wait two minutes. You do not need to read anything in that window. Two keys from Google's own page: Control and M frees the Tab key, and Control and comma reads the current line. Then tell me: pasted. I check from my side and tell you whether it worked.

What the line does:

- It lets each new version that I save in egoagent-app go live on Google by itself. It works only from that one repository.
- It carries all its commands inside itself, and fetches nothing from the internet. Pasting it twice does no harm.
- It creates no password and no key file. So nothing secret can land in our chat or in GitHub.
- It lets my build path create, change and delete the server, the database, the storage space and the queue for long work. My build path can also read the test database and the test storage space. That is one more reason this copy holds made-up data only.
- It lets my build path replace or delete your secret keys, but not read them.
- One limit you should know. My build path publishes the server, and the server reads the keys. So I promise never to read them. That is a rule I keep. It is not a lock. Your real protection: you can cancel a key at AssemblyAI or at Anthropic at any time, and each key can spend only a small amount.

How you switch my access off. Open the link named Workload Identity Pools. Press the pool's name, which I tell you. Press the switch named Status, then the button named Disable. Do not press Delete. After that, Google accepts no new sign-in from my build path. One already handed out can last up to an hour. The app itself keeps running. To switch it on again, press Status, then Enable. In stage 1 you try this once, off and on.

What is untested. The line itself: it has never been run against Google. Whether one of Google's default safety rules accepts the link to GitHub: if it refuses, I change the line and you paste again. And the paste into that window with VoiceOver, on a Mac or on an iPad. Google's pages say the window is not read aloud by itself. That is why the steps never ask you to read it.

One of my own researchers advised against sending you to this window at all. I chose it because it is one paste instead of many forms. That is my judgement.

If the paste fails, there are two fallbacks. A second person beside you pastes the line on your device. Or we use Google's forms: about 15 presses for the server, about 20 for the database and about 10 for the storage space. Two traps wait on those forms. The database form opens on Google's dearest kind, at about $185 a month or more. The storage form has the seven-day keeping of deleted files switched on. So with the forms, you read the summary to me before you press Create. If you prefer the forms from the start, say so.

#### Later visits to Google Cloud

I give the exact steps when we reach each one.

- Stage 2: your setup phrase goes into Google's safe for keys. Stages 5 and 6: the AssemblyAI key and the Anthropic key go there too.
- The form for a secret has several fields. Two matter. The field called Name is for the secret's name. I give you that name. Your secret goes into the field called Secret value. Leave the rest as it is.
- Before real patients: you leave the free trial and you accept the HIPAA agreement. Part F has the order.
- One fixed date. Leave the free trial by day 75 after sign-up. If you have not left it by day 90, everything stops. It stops sooner if the $300 is used up. Thirty days later Google deletes everything.
- A second person. If you want one trusted person to be able to get in when you cannot, tell me. Not confirmed: whether Google's default rules allow it.
- An emergency stop. It stops the app at once, and some data may be lost for good. With real patients that can mean the transcripts. During the free trial you never need it, because Google does not charge the card. After the trial, use it only if you cannot reach me and the cost is far above the warning amount. An email at the warning amount is not reason enough. Then open the link named Billing projects. In the project's row, open the menu named Actions. Choose Disable billing, and confirm.

### Account 3. AssemblyAI, at assemblyai.com

- What for: the transcript. Needed for stage 5. Open it early all the same, and add the card. The agreement part shows only after that.
- I did not see AssemblyAI's screens. The names below come from its help pages. I give you the exact steps, one at a time, when we reach this account.
- Sign up. Add a payment card before the first upload. The page may ask for a deposit. I could not confirm the amount. Choose the smallest amount offered. If it is over $20, stop and tell me. Leave auto-pay off, because it charges your card by itself.
- Open the link named Data Controls. On that page, turn on the switch named Opt Out of Data Sharing for Model Improvement Program. On means they may not train on your audio.
- On the same page, find the setting for time-to-live. It is a timer that deletes your files there by itself. Not confirmed: its exact name on the screen. It may also say T T L, or data retention. Choose Custom and set one hour. If that is hard, choose 1 day.
- On the same page, find the part named Business Associate Agreement. It should say: Not signed. Do not press the button named Review and sign B A A yet. Tell me what the part says.
- Put the secret key into Google's safe for keys. Before stage 5, I ask you to confirm both settings.
- Cost: most likely $0, beyond any deposit.

### Account 4. Anthropic, at platform.claude.com

- What for: the analysis. Open it right after Google Cloud, so we learn the HIPAA answer. On that first visit, do only the last step in this list. If sign-up demands payment, stop and tell me.
- I did not see Anthropic's screens either. I give you the exact steps when we reach this account.
- It is a different website from the Claude app, and it is billed apart.
- If your Claude plan is Max, Ultra or Team, it includes credit for this. Tell me before you connect your plan to this account. That connection is hard to change.
- Otherwise, before stage 6, buy $10 of credit. It lasts about three months here. It expires after one year and is not refunded. Leave auto-reload off. Set the monthly spend limit to $10.
- Put the secret key into Google's safe for keys.
- Last step: open the link named Data retention. On that page, find a section headed HIPAA compliance. If it is not there, choose Organization in the menu at the top of that page, and look once more. Tell me whether it is there. Do not press anything in it. Turning it on cannot be undone.

Not needed now: a web address that you own, and an email-sending service. Do not accept or sign any HIPAA agreement now, even where a page offers it. Each one is a legal act in the name of the account's owner. At Anthropic it cannot be undone. For Google and AssemblyAI I found no way to undo it either. So treat all three as final. Part F says when.

## Part D. The build, in seven small stages

### How we work

- I build one stage and test it on my side first. My side is a copy of the app in my workspace, in a desktop browser set to iPhone, iPad and desktop sizes. I have no iPhone, no iPad and no VoiceOver.
- On Google itself I can open only pages that need no sign-in. So you are the first to test each signed-in page there.
- Everything on a real iPhone or iPad, and everything with VoiceOver, is tested only by you.
- Every test works by sight and with VoiceOver. Each test names the words to expect. Those words appear on the screen in large, clear type, and they stay there. VoiceOver speaks the same words.
- Where a test says you should see and hear something, either way counts for that test. Tell me which way you tested. I keep a list. Before stage 7 ends, each stage should have been tried once by sight and once with VoiceOver. My report names each stage that was tried only one way.
- The look is my job. I put pictures of each new page beside the mockup and list every difference. The pictures come from a desktop browser, not from Safari.
- Before each stage goes live, a second AI helper that has not seen my reasoning checks it. It is not a person.
- I never see your secret keys. For stages 5 and 6, the Claude app can show you a secure form for a key. That form is the one exception to the rule about our chat. Type the key only into the form, never into a message. I can then use the key, but I cannot read it. The key stays saved in your Claude settings until you delete it. If the form fails, I test with stand-in answers and tell you.
- The Claude app will ask you to approve a few things, such as opening the app's web address. Before each one I say what it is for.
- I put no new version live while you are testing.
- If Google cannot start the test copy, I read the reason myself, through GitHub. You do not have to copy anything for me. This is untested until stage 1. For the live copy I may not. Part F, point F10, says why.
- The existing website is not touched. Its Sign in button still opens the mockup.

### Rules the build follows

- Every signed-in page says at the top: test version, made-up names and made-up recordings only.
- Secret keys stay in Google's safe for keys and on the server.
- Transcript text is saved only in our database. It passes through AssemblyAI, which makes it, and through Anthropic when you press Analyze. It is never written into the server's diary or kept by the browser.
- No patient name and no transcript text appears in a web address, in a file name, in an error message or in any name at Google.
- If the server restarts during long work, the work picks up again or says stopped. Nothing may say working for longer than 15 minutes.
- Every button and field has a name you can see, and the same name spoken. Progress and errors are shown as words and spoken. Nothing is told by colour alone. A gold day also says transcript waiting. A green day also says analyzed.
- Everything I set up at Google is written down in files in the repository. So a second, clean copy for real patients can be made from the same files. Nothing is rebuilt.
- The look is copied from the mockup as it stands today, version 304. A few small fields get slightly larger type, so the iPhone does not zoom. Buttons for things not built yet are left off, the EgoAgent Guide included.
- Three small additions you did not ask for: a button that deletes a test day, working Read aloud and text-size buttons, and a page of test recordings. Say no and I leave them out.

### Stage 1. The new address opens

- Needs: the new repository, and the Google Cloud account with steps 1 to 54 done.
- I build: the bare app on Google, with the small test database, the storage space and the safe for keys. The sign-in page is in the existing look. It does not sign in yet. The address is one that Google gives. It ends in run.app.
- I measure how long the first page takes after a pause. I tell you the number.
- You test on your iPad: open the link I send. The first opening can take some seconds. Then you should see and hear the heading Sign in. Then two fields: Professional email, and Password. Then one button, named: Sign in and open your casebook. The button does nothing yet. Then open the link once on your iPhone.
- You also try the switch for my access once: Status, then Disable. Then Status, then Enable. Tell me what you found.

### Stage 2. Real sign-in

- Needs: a setup phrase that you invent, at least 20 characters long. Capital letters and spaces count. You save it in your password app and put it into Google's safe for keys. I give the steps.
- I build: a setup page where you create your account with your setup phrase. Each phrase works once. Then sign in and sign out. After five wrong tries, sign-in pauses for 15 minutes. The setup page has the same pause.
- You test on your iPad: open the setup link I send. You should see and hear the heading Create your account. Create your account and sign in. You should see and hear the heading Casebook. Sign out. Type a wrong password. You should see and hear: email or password is not right. Open the Casebook link while signed out. You should see and hear the heading Sign in.

### Stage 3. One patient and the calendar

- I build: the smallest Casebook. You add a patient by a made-up first name and last initial, find the patient in the list, and move through the month calendar. Each day shows and speaks its number and its state.
- You test on your iPad: add a patient named Test P. Sign out and in. You should still see and hear Test P. in the list. Open the month calendar and move to today. You should see and hear today's number and the words: no recording. Then add a second made-up patient on your iPhone.

### Stage 4. Upload

- I build: the upload box on the Casebook, where the mockup has it. It has a tick box that says the recording is made up, and a field where you confirm the day. The browser sends the recording in small pieces, straight to the private storage space at Google.
- How the browser is let in: our server first gives the browser an upload address for that one file. The address works like a one-time key. Whoever holds it can add that one file and nothing else. It cannot read or delete anything. Our server cancels it when the upload ends. None of our secret keys reaches the browser.
- Progress is shown and spoken at the start, at the half and at the end. In this stage the server reports the size and length, deletes the file, and checks that it is gone. An upload that is not finished after two hours is cancelled by our server. On my side I test with a slowed connection and with a cut connection.
- Limits: files up to 200 megabytes. A photo or a larger file gets a refusal, shown and spoken.
- Test recordings: a page named Test files holds made-up recordings of 5, 50 and 90 minutes, and a short one with talk of self-harm. I make them with two computer voices reading sessions I invent. You tap one. Safari asks whether to download it. Choose Download. The file lands in the Downloads folder of the Files app. I have not tried this on a real iPad.
- Risk: sending straight from Safari to Google's storage space is untested on a real iPad. The fallback is that the pieces go through our own server, which passes them on. That costs nothing extra and needs no new account.
- You test on your iPad: record a five-minute made-up memo in Voice Memos. Share it and choose Save to Files. On the page, tick the box, choose that file and confirm the day. You should see and hear: upload started. Then: upload complete. Then: received and deleted.
- Next, upload the 90-minute test file. As soon as you see or hear upload started, lock the iPad. Count to ten. Unlock it. The upload will most likely have paused. You should then see and hear one of two things: upload resumed, or upload complete.
- Then choose a photo. You should see and hear: this file is not a recording. Then repeat the short upload on your iPhone, with the five-minute test file.

### Stage 5. Transcript

- Needs: the AssemblyAI account, and its key in Google's safe for keys.
- I build: the server gives AssemblyAI a link to the recording. The link works for one hour. The transcript comes back labelled Speaker A and Speaker B. It is saved under the patient and the day. The day turns gold and is labelled transcript waiting. One recording per day for each patient. If the day is taken, the page says so and asks for another.
- Deleting the audio: when the transcript is saved, or if transcription fails, our server deletes the recording at Google. It checks that the recording is gone. It also tells AssemblyAI to delete its own record, and checks that AssemblyAI reports it deleted. We cannot look inside AssemblyAI ourselves. The page shows the time of each deletion.
- Two safety nets: the rule at Google that deletes any finished file older than one day, and AssemblyAI's own timer, set to one hour, or to one day if you chose that. That timer can run late. In one rare case, a crash at the moment of hand-over, only the safety nets remove the copies.
- The app does not delete the copies on your iPad.
- You test on your iPad: upload the five-minute memo. You should see and hear: upload complete, you may lock the iPad. Do not lock it this first time. Within about two minutes you should see and hear: transcript ready. On the calendar, the day should show and say: transcript waiting. Open the day. Read or listen to the transcript. Find the line that starts: audio deleted at. With one voice there is only Speaker A. That is correct. Sign out and in. The transcript is still there.
- Then repeat on a second day with the 50-minute test file. There you should see and hear Speaker A and Speaker B. Then on a third day with one short made-up memo in Serbian.

### Stage 6. Analysis

- Needs: the Anthropic account, and its key in Google's safe for keys.
- I build: the Hour page shows one perspective, General Psychoanalytic, already chosen. The instruction is the one in your mockup: three to five short paragraphs, addressed to the therapist. I change three things. I add: answer in English. I take out the sample patient's name. I replace the older AI model and the short length limit that the mockup names. When you press Analyze, the server sends the transcript and the instruction to the Anthropic API. The analysis appears under the transcript and is saved. The day turns green and is labelled analyzed.
- If the AI fails, declines or is cut off, the page says so in plain words, shown and spoken. The transcript is safe. You can press again.
- You test on your iPad: open the day that holds the 50-minute test file and press Analyze. Right away you should see and hear: analysis started. Within about three minutes you should see and hear: analysis ready. On the calendar, the day should show and say: analyzed. Read the analysis or listen to it. Tell me whether it reads like a real consultation. If not, tell me what is missing, and I change the instruction. Sign out and in, and open it again.
- Then upload the test recording with talk of self-harm to a new day, and analyze it. We learn whether the AI declines such sessions. If it declines, you should see and hear: the AI declined this session.

### Stage 7. The whole path again, and the final check

- I do: every test of mine again. The 90-minute recording through the whole path. A restart of the server in the middle of the work. Desktop sizes. Then the second AI helper does a full review of the code and the security.
- You test on your iPad: the whole path, start to finish, with the 50-minute test recording. The words are the ones from the earlier stages, in this order. The heading Casebook. Upload started. Upload complete, you may lock the iPad. Transcript ready. Analysis started. Analysis ready. On the calendar, the day should show and say: analyzed.
- Then the same on your iPhone. If you have a Mac or a PC, sign in there once and open the saved day. You should find the transcript and the analysis there.
- Afterwards I send a short report: what works, what does not, and what was not tested.

### After stage 7

The first version ends here. It holds made-up recordings only. Part F lists what must happen before the first real patient recording.

## Part E. The five earlier questions, now answered

Each question has my recommended answer first. Your answers are recorded below, after Part F. Parts B, C and D now follow them. If you change an answer, I change those parts and show you before I build.

### Question 1. How soon do you expect real patient recordings?

This decided where the app runs. You have answered it. The text below is the earlier one, kept for the record. Its costs and its count of steps are out of date. My estimate of eight to ten steps for Google was too low. Parts B and C have the new figures.

- Answer 1, recommended: not within the next few months, or you do not know yet. Then Render now, with the fewest steps for you. Before real patients you choose again. Stay, at about $520 a month. Or move to Google Cloud, at roughly $60 to $110 a month. A move is real work. You open a Google Cloud account, which I estimate at eight to ten steps on a crowded website. I rebuild part of the upload. You repeat the tests from stage 4 on.
- Answer 2: soon. Then Google Cloud from the start. The harder setup comes now, and nothing is built twice. The cost now is about the same as on Render, on Google's small test database.

### Question 2. Which languages do we test?

- Answer 1, recommended: English, plus one short Serbian memo in stage 5. English is among the service's strongest languages, so a failure there points to our build. The Serbian memo costs you five minutes and about one cent. I expect it to come out badly. Then we know early, and I compare services for Serbian.
- Answer 2: English only.
- Answer 3: Serbian matters most. Then I change the transcription service before stage 5. The likely choice is Amazon Transcribe. It lists Serbian, and you can sign its HIPAA agreement yourself. But you would open an Amazon account.

### Question 3. Should the code be private?

- Answer 1, recommended: yes. A new private repository named egoagent-app. The code and the AI instructions stay private. It costs you one extra step.
- Answer 2: no. Use this repository, on its own branch. A branch is a side copy of the code. No extra step. But this repository is public, so anyone can read the code. Secret keys and patient data never go into it either way.

### Question 4. Who signs in during the first version?

- Answer 1, recommended: only you. One account. No password-reset emails. If you forget the password, you put a new setup phrase into Google's safe for keys and use the setup page once more.
- Answer 2: you and a few colleagues. Then password-reset emails are needed now. That means a web address that you own, one more account, and one more stage.

### Question 5. Whose name and which email go on the three accounts?

- Answer 1, recommended: one email address that you will keep for EgoAgent. If EgoAgent is a registered company, use the company's name. Each HIPAA agreement is later signed for the organization that owns the account. Changing the owner later is extra work.
- Answer 2: your personal name and email for now. That is fine for made-up data. We may have to open new accounts before real patients.

## Part F. Before the first real patient recording

This part is for planning. It is not legal advice. The times in it are my estimates. I could not read the United States health department's pages today. So the lawyer must confirm every point about the law here.

### Start today. These are yours, and they need no approval of this plan.

- F1. The lawyer. If you already have a lawyer who knows health privacy law in your state, brief that lawyer this week. If not, engage one this week. It is the longest wait on this list. I estimate one to two weeks to engage, and three to six weeks of work.
- F2. What the lawyer decides. Whether HIPAA applies to your practice at all. Who legally owns EgoAgent and signs the agreements. Whether you as therapist need an agreement with that owner, if it is a company. The consent form for recording, by your state's law. Whether a transcript counts as psychotherapy notes. For each promise on the public pages: keep it, drop it or reword it. How long transcripts are kept. And the Privacy page and the Terms page that your main page links to. They are not written yet.
- F3. The owner of the accounts. This is the first new question below. If a company must be registered first, start now. I estimate one to three weeks.
- F4. A security review by a person. Find the reviewer now. I estimate two to six weeks to book, one week for the review, and one to two weeks for my fixes.
- F5. Insurance. Ask your broker whether your cover allows recording and AI analysis. This is my judgement, not a rule that I verified.

### Start after your approval

- F6. Yours: the three looks from Part C, with no press. If the HIPAA section at Anthropic is missing, write to its sales team the same day. I draft the message.
- F7. Mine: a list of every promise on the public pages, each beside what the planned system really does. It is for you and the lawyer. It builds nothing. With it go the addresses of Google's and AssemblyAI's agreement texts. Anthropic's text I could not read.
- Three items on that list need the lawyer's eye. The main page and the demo page give two different rules for how long transcripts are kept. A deleted transcript stays in the database's backups for up to seven more days. And Google's 180 days from Part B.

### After stage 7. These are mine.

None of this is in the seven stages. I show you each item, with its price, before I build it.

- F8. Five additions to the app. A second sign-in step, such as a code from a phone app. Sign-out by itself after a pause. A record of who opened or deleted what. A consent check: no upload until you confirm a signed consent for that patient. And the short written rules that the law asks for.
- F9. A clean live copy, in its own Google project, apart from the test copy. It gets the real-size database, an alarm by email if the app stops, and Google's record of who read data, kept as long as the lawyer says. You first choose two things: the standby database, yes or no, and your own web address, yes or no. Your part is a second project, one pasted line, a new Anthropic organization and fresh secret keys. Organization is Anthropic's word for one separate work space. I have not confirmed its steps.
- F10. My access to the live copy is cut down, because you have no HIPAA agreement that covers me or GitHub. My build path gets no right there to read the database, the recordings or the secret keys. A new version goes live only when you act yourself. How that is done is not designed yet. One limit stays. I write the code that runs there, and that code can reach patient data. So I promise that no version of mine sends patient data anywhere else. That is a rule I keep. It is not a lock. The second AI helper checks every version, and the reviewer checks the set-up.

### Last, just before the first real recording

- F11. The security review, and my fixes.
- F12. You leave Google's free trial. You press Activate, and confirm once. From then on Google charges your card by itself. Google may first ask for a one-time advance payment. It does not state the amount. If a screen asks for money, stop and tell me. Do this by day 75, wherever the build stands. Then we raise the spending warning.
- F13. You accept the three agreements, in this order: Google, AssemblyAI, Anthropic. Each in the name of the legal owner. Each after the lawyer's yes. Before each press, check which account you are signed in to. At Anthropic, accept only inside the new organization, never in the test one. The setting there is permanent. Save your own proof each time: a picture of the page, the date and the time.
- F14. The whole path once more, on the live copy, with a made-up recording. Accepting can change settings. At AssemblyAI you check that the timer still says one hour.
- F15. Go or no-go. It is your decision. Go only when three things are true. The reviewer's findings are fixed. A restore from a backup worked. The lawyer has said yes in writing to the pages and the consent form. Then start with one consenting patient.

From that day on, never paste real transcript text, real names or real server records into our chat, or into Anthropic's website.

### Is one to three months realistic?

- Three months: realistic under three conditions. The lawyer and the owner question start in the first week. The first real use is you alone, with one consenting patient. And everything up to point F10 is finished by about week nine.
- Week nine is my calculation from my own estimates: the review, my fixes and the last steps need three to four weeks. I have no measured figure for how long the build takes.
- One month: unlikely. By my estimates, the lawyer and the security review alone take longer.
- What would break three months: the lawyer starts late or asks for a redesign. Anthropic's HIPAA route is closed to you. The review finds serious faults. Upload fails on your iPad. Or the first real version must also have other therapists, Serbian, or consent by email.

## Your answers

- Question 1, changed on 15 November 2026: soon. You intend to have real patients within one to three months. The app starts on Google Cloud.
- Question 2: English, plus one short Serbian memo in stage 5.
- Question 3: private. A new repository named egoagent-app.
- Question 4: only you sign in.
- Question 5: one EgoAgent email on the three accounts.

Questions 2 to 5 were answered on 15 November 2026, with the recommended answers. Question 1 is your own choice. Parts B, C and D are rewritten for it.

## Three new questions for you

### New question 1. In whose name do you open the Google Cloud account?

Google asks for Individual or Business at sign-up. It can never be changed. By my reading, the HIPAA agreement is later accepted in that name.

- Answer 1, recommended if it exists today: a company or practice that is registered, for example an LLC, and that will own EgoAgent. Then choose Business, in its name. Nothing is opened twice. Google warns against Business for a person with no such organization.
- Answer 2, recommended if no such company exists yet: your own name, as Individual, for the test copy only. The lawyer decides in the first weeks who must own the live copy. If that is a company, you open a second Google Cloud account in its name later, and repeat steps 1 to 54 there. I estimate one hour, because the steps are known by then. No code is rebuilt. Not confirmed: whether that second account can use the same email, and whether it gets a free trial.
- Answer 3: wait for the lawyer before opening anything. Then the build waits too. I do not recommend this.

### New question 2. Which device will you use for the Google set-up?

- Answer 1, recommended: a Mac with the Chrome browser. It is the pairing Google recommends for VoiceOver.
- Answer 2: another desktop computer. Tell me which, and which screen reader.
- Answer 3: the iPad only. Then we use Safari and treat every screen as untested. Plan for a second person beside you, above all at the card screen in step 24 and at the paste in step 52.

### New question 3. Is your card's billing address in the United States?

Google fixes the country and the currency at sign-up, for good. Every price in this plan is in US dollars.

- Answer 1: yes.
- Answer 2: no. Then tell me the country before you start. Some prices and steps may differ.

## What was checked, and what was not

- Read on each company's own pages on 15 November 2026. Google Cloud: the HIPAA help page, the agreement text and the covered list. Also the price pages for the server, the database and the storage space. Also the free trial terms, and the pages on budgets and projects.
- AssemblyAI: prices, languages, links to recordings, deletion, and the text of its HIPAA agreement. Anthropic: prices, its commercial terms, and its help pages about the HIPAA agreement.
- Checked against the repository files: every statement in Part A.
- Calculated by me: every monthly Google sum. They use Google's list prices for Iowa, at 730 hours a month.
- Not confirmed about Google's HIPAA agreement: the nine points listed in Part B.
- Not confirmed: the exact screens of the Google Cloud sign-up, which I could not open. The screens of AssemblyAI and Anthropic. Their names come from the companies' help pages. The text of Anthropic's HIPAA agreement, which I could not open. The deposit at AssemblyAI. Whether $10 is an allowed credit purchase at Anthropic. GitHub's pages, which were blocked today. The Voice Memos steps, because Apple's help page was blocked.
- Not read at all: the United States health department's pages. Every legal point in Part F needs the lawyer.
- Not run: nothing was tried against Google with a real account. The setup line, the upload to Google's storage space and the link for AssemblyAI are designs taken from the companies' pages. Stages 1, 4 and 5 prove them.
- Not designed yet: how a new version of the live copy goes live only by your own act. Point F10 says so.
- Not checked: how well the pages of Google Cloud, AssemblyAI and Anthropic work with VoiceOver. For Google I have only Google's own advice: VoiceOver with Chrome on a Mac.
- Not tested on a real device: nothing has run on an iPhone or iPad yet. A browser reference that I read today warns about the iPhone's file chooser. It does not handle a chooser that asks for audio only. Stage 4 is built to avoid this and to test it.
- Not tested: whether two computer voices are told apart as two speakers, and how often the AI declines talk of self-harm. Stages 5 and 6 test both.

## What I need from you now

- I stop here. I build nothing until you approve.
- Your change to question 1 is recorded above.
- I need your answers to the three new questions.
- Say approved, or tell me what to change.
- This plan is saved as PLAN.md on the branch named thin-path-plan. The main branch and every other file are untouched.
