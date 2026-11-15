# EgoAgent: plan for the first working version

Status: plan only. Nothing is built. No existing file is changed.
Written 15 November 2026. Changed the same day: the app now starts on Google Cloud.

## The plan in short

- The goal is the five steps in your brief, unchanged.
- Your fixed rules and your left-out list hold.
- What changed: you expect real patients within one to three months. So the app starts on Google Cloud. Nothing is built twice.
- Cost now: about $14 a month. For the first 90 days Google pays its own part from a free credit. In that time about $3 a month leaves your card.
- Cost with real patients: about $80 a month at the least. About $150 a month with a standby database and your own web address.
- Google's HIPAA agreement: you accept it yourself, by a click inside your Google account. Extra cost: $0. Part B says what I could not confirm.
- You open three accounts. Google Cloud is the long one. I estimate one to two hours for it, and half an hour for the other two together.
- I build seven stages. You test each one on your iPad. I estimate 10 to 30 minutes for each test. Expect to repeat some tests after a fix, because I cannot try Safari or VoiceOver myself.
- Every test can be done by sight and with VoiceOver. Each test names the words you should see and hear.
- Part F is new. It lists what must be done before the first real patient recording, and what can start now.
- One to three months: three is realistic. One is unlikely. That is my judgement. Each stage still waits for your test.
- I need two new answers from you. They are near the end.

## Words used in this plan

- Secret key: a long password that lets our server use another company's service.
- HIPAA agreement: the HIPAA business associate agreement, often written B A A. A company signs it before it may handle patient data for you.
- VoiceOver: the screen reader built into the iPad and the iPhone. I build for it. Tell me if you use another.
- Google Cloud console: Google's website where you manage your Google Cloud account. Console is Google's word for it.
- Project: Google's word for one separate work space inside your account. The app lives in one project.
- Free trial: your first 90 days at Google Cloud. Google gives $300 of credit for them.
- Cloud Shell: a command window inside the Google Cloud console. You paste one line of text into it.

## Part A. What is in the repository now

- It is a design mockup of 16 files: one main page with nine screens, one walkthrough page, one helper script, ten films, two pictures and one empty settings file. GitHub shows it as plain web pages. No server stands behind it.
- The look is settled. Dark pages and gold headings. Night blue for sign in. Study green for the Casebook, Case and Hour screens.
- Nothing real runs. Sign in is only a link. Anyone can open the Casebook by typing its address. The patients and the transcript are samples. The upload box reads only the file's name and date.
- The Analyze button calls Anthropic straight from the page, with no secret key. On a public website that cannot work.
- General Psychoanalytic already exists, with a one-sentence instruction.
- The pages make many promises. Three bear on this first version, and the plan keeps them. The audio is deleted after transcription. The material is never used to train AI. Nothing is analyzed until the therapist presses the button.

## Part B. The choices: server, database, sign-in and transcription

Every price and agreement fact below was read on the company's own pages on 15 November 2026. Where that is not so, I say it. Now means this first version. Later means from the first real patient recording.

All Google parts sit in one Google Cloud account, in Google's Iowa region. One HIPAA agreement with Google covers all of them.

### 1. The server: Google Cloud Run

- Choice: Cloud Run. It runs our app on Google's machines, and wakes it when someone opens a page.
- Reason: it is on the list of services that Google's HIPAA agreement covers. And there is no machine that anyone has to look after.
- Cost now: about $0 to $1 a month. The server sleeps when nobody uses it. The first page after a pause then takes some seconds. I measure how many in stage 1.
- Cost later: about $14 to $20 a month. That keeps one copy of the server awake, so pages open at once. This is my calculation from Google's price page.
- HIPAA agreement later: yes. Google's one agreement covers it.

### 2. The database: Google Cloud SQL

- Choice: Cloud SQL, running Postgres. Postgres is the same standard database as in the earlier plan.
- Reason: Google runs it, backs it up every day and repairs it. It is on Google's covered list.
- Cost now: about $9.50 a month, on the smallest test size, with daily backups.
- Cost later: about $51 a month, on the smallest size that Google allows for real use. Or about $102 a month with a standby copy in a second data centre.
- Google's pages say plainly: the small test sizes are not for real use. And Google's promise about uptime holds only with the standby copy.
- Without the standby copy, a fault in that one data centre stops the app until Google repairs it. The data stays safe in the backups.
- You choose between $51 and $102 just before real patients. I recommend starting without the standby copy while you are the only therapist. That is my judgement.
- Moving from the test size to the real size takes the database offline for under one minute. No data is lost. Google's pages say so.
- HIPAA agreement later: yes. The same Google agreement.

### 3. A holding place for the recording: Google Cloud Storage

This part is new.

- Choice: one private storage space at Google. The recording waits there only until the transcript is made.
- Reason: Google's server accepts at most 32 megabytes in one request, and it has no disk of its own. So a recording cannot rest on the server. The storage space sits in the same Google account. There is no extra account and no extra agreement.
- Making the delete real: Google keeps a deleted file for seven more days unless that is switched off. I switch it off. Our server deletes the file, asks for it once more, and must get the answer not found. As a safety net, a rule at Google deletes anything older than one day.
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
- Cost later: about $5 a month, for fifteen sessions of 90 minutes.
- One change: how the recording reaches AssemblyAI. Our server gives AssemblyAI a link to the recording. The link works for one hour only. AssemblyAI's pages say that links from Google's storage are accepted. But their only worked example is for Amazon. Stage 5 proves it with a made-up recording. If it fails, our server passes the file on itself.
- HIPAA agreement later: yes. It is separate from Google's. The account owner signs it online, on a paid account.
- Weak point: Serbian. Your website offers Serbian. Their best model does not. Their wider model does, but by their own figures more than half the words come out wrong. Question 2 in Part E is about this.

### 6. The AI: the Anthropic API

You fixed this choice. This is what I checked.

- Model: Claude Opus 5.5. A model is one version of the AI. Anthropic's pages recommend starting with it. A cheaper model would save about $1.50 a month.
- Cost now: about 20 cents for one analysis. Fifteen a month is about $3. This is my calculation from Anthropic's price list.
- HIPAA agreement later: yes, with one unknown. It is separate from Google's. One Anthropic page says eligible organizations accept it themselves inside their account. It does not say who is eligible. A help article says to contact the sales team. We learn which applies when you open the account.
- A fallback, if Anthropic's route is slow or closed to you: Claude can also be reached through Google, inside the same Google account. Google's page calls that offer HIPAA eligible. But Google's covered list does not name Claude. Before relying on it, I would ask Google in writing.
- Anthropic's terms say it may not train its models on your content. Its standard setting keeps the text for up to 30 days. Text flagged by its safety system can be kept for up to two years.

### 7. Four small Google parts

- Secret Manager: Google's safe for secret keys. Our server reads the keys from it.
- Cloud Tasks: it hands long work back to our server, and tries again if the work fails.
- Artifact Registry: a store for each built version of the app.
- Cloud Logging: the server's diary of errors. Google keeps it for 30 days. No patient text is ever written into it.
- All four are on Google's covered list. Together they cost about $0 to $1 a month at our size.
- Each new version is built on GitHub's machines. I expect that to cost $0. I could not re-read GitHub's price page today.

### Google's HIPAA agreement: how, by whom, at what cost

I read three of Google's own pages on 15 November 2026: the help page with the steps, the agreement text, and the HIPAA page with the covered list. The covered list is dated 11 November 2026.

- How: by a click, inside your Google Cloud account. Google's help page gives these steps. Open the page named IAM and Admin. Select a project. Below the heading Google Cloud Platform HIPAA Business Associate Addendum, press Review and Accept. Read the agreement. Press I Accept.
- When it counts: the agreement text says it takes effect when the customer clicks to accept.
- By whom: by you. The text says the person who clicks must have full legal authority to bind the customer. So I never press it. The customer is whoever owns the Google account. That is why the first new question matters.
- At what cost: $0 extra. The agreement text names no fee. Google's HIPAA page says HIPAA customers get the same services at the same pricing as everyone else. That the extra cost is zero is my reading of those two pages. No page says the word free.
- How often: once. Google says one click, in one project, counts for your account.
- What it covers: only the services on Google's list. Every Google part in this plan is on that list. It does not cover test features that Google has not fully released. It does not cover AssemblyAI or Anthropic.
- What it does not do: it does not make the app lawful by itself. Google says there is no HIPAA certificate, and that you stay responsible for what you build on its services.

What I could not confirm:

- Whether the button appears for an account opened by one person with an ordinary Google email. Google's steps ask only for a project. I cannot see the screen. So on the first day you look, and press nothing.
- Which role a person needs in the account to press it. Google's pages name none.
- Whether it can be accepted during the free trial. No page says yes or no. In this plan you leave the trial first.
- What the page shows after the click, and whether Google sends any proof. Google describes none. So you save your own proof.
- Whether projects made later are covered without a new click. My reading is yes. We look at the page again after any such change.
- One other Google page, with no date, says organizations should talk to their account managers. The help page and the agreement text describe the click. We follow the click.
- How well that page works with VoiceOver.

### Total monthly cost

- Now: about $14 a month. That is about $10.50 to Google and about $3 to Anthropic. AssemblyAI is free while its credit lasts.
- During Google's free trial, Google pays its part from the $300 credit. Google says the card is not charged in the trial. So about $3 a month leaves your card.
- With real patients, at the least: about $80 a month. That is about $70 to Google, about $5 to AssemblyAI and about $3 to Anthropic. The $70 is the server at about $17, the database at about $51, and the small parts.
- With the standby database: add about $51 a month.
- With your own web address: add about $18 a month. Until then the app's address is one that Google gives. It ends in run.app.
- With both: about $150 a month.
- If the test copy keeps running beside the live copy: add about $10 a month.
- Every Google sum is my calculation from Google's list prices for Iowa.
- Once-only costs that I could not verify: the lawyer, the security review by a person, and insurance. Ask each for a price.
- A promise. I add no paid part without telling you the price and getting your yes.
- Not counted: sales tax, and your Claude plan, which the build itself uses. If your Claude plan reaches its limit, the build waits until it resets.

## Part C. Accounts you open, in order

Three rules first.

- Never paste a secret key into our chat, into GitHub or into an email. If one lands there by mistake, tell me. We cancel it and make a new one.
- One warning about Google's safe for keys. Each secret there has two fields. The field called Name is for the secret's name. I give you that name. Your secret goes into the field called Secret value.
- I cannot see your screens. Where I could not confirm a screen, the step says: not confirmed. If the screen shows a different name, or VoiceOver says one, stop. Tell me what it says. Press nothing you are unsure of.

### Account 1. GitHub

- You already have it. Cost: $0 a month. It holds code only, so it needs no HIPAA agreement.
- You create a new private repository named egoagent-app, and you allow Claude to work in it. Then you tell me in this same conversation.
- Turn on two-step sign-in for GitHub. It asks for a code from your phone at each sign-in. Save the recovery codes GitHub gives you. The path from the code to Google will depend on GitHub.

### Account 2. Google Cloud

- What for: the server, the database and the storage space. Needed for stage 1.
- Time: I estimate one to two hours, best split over two or three sittings.
- Cost to open: $0.
- The steps are numbered from 1 to 47. If a step goes wrong, tell me its number.

#### Before you start

1. Choose the device. For its console, Google recommends VoiceOver with the Chrome browser on a Mac. For the iPad it names no browser at all. So use a Mac with Chrome if you have one. Otherwise use Safari on the iPad. That path is untested. A helper who can see the screen is a good fallback, above all for the card screen.
2. Put these within reach: the inbox of your EgoAgent email address, your iPhone, your password app, and one credit or debit card. Prepaid cards are refused.
3. Decide: Individual or Business. This is the first new question, near the end of this plan. It can never be changed later.
4. Decide the country. It is the country of your billing address. I assume the United States. It sets the currency, and it can never be changed later.

#### A Google Account for EgoAgent

Skip to step 10 if a Google Account with your EgoAgent email already exists. A Gmail address is not needed.

5. Open accounts.google.com/signin. Find the link named Create account. Press it.
6. A small menu opens. Choose: For my personal use. This is only the kind of sign-in. The owner of the Cloud account is set later, in step 18.
7. Not confirmed: type your first and last name, and your birthday if asked. Press Next.
8. Find the link named Use your existing email. Press it. Type your EgoAgent email address. Press Next.
9. Google sends a code to that inbox. Type the code. Press Next. Then make a password, and save it in your password app.

#### The second sign-in step

Google requires a second sign-in step before it lets anyone into the console. Turn it on a few days before the Google Cloud sign-up if you can. Google may take up to seven days to trust a new phone number.

10. Open myaccount.google.com/signinoptions/two-step-verification.
11. Find Turn on 2-Step Verification. Press it.
12. Not confirmed: follow the steps on the screen. Choose a Google prompt on your iPhone, or an authenticator app. If a screen asks you to scan a square code with the camera and that is hard, stop and tell me.
13. Create backup codes in the same place. Save them in your password app. Never paste them into our chat. Without them, a lost phone locks you out while the card can still be charged.

#### Sign up for Google Cloud

I could not see these screens. Google's pages say what is asked, but not the exact names of the buttons. So steps 15 to 20 are not confirmed.

14. Open console.cloud.google.com/freetrial. Sign in with the EgoAgent Google Account. Complete the second sign-in step.
15. Find the field named Country. Choose your country.
16. Find the tick box about the Terms of Service. Tick it. If there is a second tick box about news or email updates, leave it unticked.
17. Press the button that moves on. From memory its name is Continue, or Agree and continue.
18. Find Account type. Choose Individual or Business, as you decided in step 3. If any field asks about tax, stop and read it to me.
19. Type your name and billing address. Then type the card number, the expiry date and the security code.
20. Press the last button. From memory its name is Start free. If you see or hear Activate, or Upgrade, or anything about a paid or full account, do not press it. Read it to me first.
21. Wait for a page named Welcome. Tell me the first heading on it.
22. In the next days your bank may show a pending amount from Google, between $0 and $1. Google says it is a hold, not a charge. It goes away by itself.
23. Open console.cloud.google.com/billing/overview. Find the words Free trial, the credit that is left, and the days that are left. Tell me what you find. Not confirmed: the exact words on this page.
24. Write down today's date. The free trial ends 90 days after it.
25. Until I say so, do not press Activate and do not press Upgrade. Either one ends the free trial.

#### Create the project

Google makes a first project by itself, named My First Project. We do not use it.

26. Open console.cloud.google.com/cloud-resource-manager. The heading is Manage resources.
27. Press the button named Create project.
28. In the field for the project name, type the name I give you. It has no personal words in it.
29. Google makes a project ID from the name. Read it to me before you go on. It can never be changed after this screen.
30. If there is a field for the billing account, it should say My Billing Account. Leave it.
31. Find the field named Parent resource. Leave what is already there. Do not choose No organization.
32. Press the button named Create. Wait about one minute.

#### A warning for spending

This makes Google send you an email when the month's cost passes a mark. It only warns. It stops nothing.

33. Open console.cloud.google.com/billing/budgets. The heading is Budgets and alerts. If asked for a billing account, choose My Billing Account.
34. Press the button named Create budget.
35. In the part named Define, choose Alerts only. In the field named Name, type: Monthly warning. Press Next.
36. In the part named Scope, leave the time range on Monthly. Find the tick box named Promotions, or Promotional credits. Untick it. Without this, no warning arrives while the free credit pays. Press Next.
37. In the part named Amount, set Budget type to Specified amount. In the field named Target amount, type 25. Press Next.
38. In the part named Actions, three rows are already there: 50 percent, 90 percent and 100 percent. Leave them. Press Finish.
39. You now get an email at $12.50, at $22.50 and at $25. The amount of $25 is my judgement. A usual month now costs about $10.50, so an email means something is wrong. We raise the amount before real patients.

#### Look at the HIPAA page, and press nothing

40. Open console.cloud.google.com/iam-admin/privacy. If asked, select the project you made.
41. Find the heading Google Cloud Platform HIPAA Business Associate Addendum. If it is not there, find a tab or link named Legal and Compliance. Press that, and look again.
42. Press nothing else. Tell me which headings and buttons you find. This settles early the main thing I could not confirm.

#### Hand the building over to me

Wait for this until I say the setup line is ready. A second AI helper will have checked the line. It holds no secret.

43. Open console.cloud.google.com/welcome. Find the project number and the project ID. Tell me both. Neither is a secret.
44. I send you one line of text. Copy it.
45. Open console.cloud.google.com/?cloudshell=true. A command window opens in the lower part of the page. Wait a few seconds until it is ready.
46. Paste the line and press Return. If a small window named Authorize Cloud Shell appears, press the button named Authorize.
47. Wait two minutes. You do not need to read anything in that window. Then tell me: pasted. I check from my side and tell you whether it worked.

What the line does:

- It lets each new version that I save in egoagent-app go live on Google by itself.
- It creates no password and no key file. So nothing secret can land in our chat or in GitHub.
- It works only from that one repository.
- It lets my build path create and change the server, the database, the storage space and the task list. It does not let it read your secret keys.
- One limit you should know. I write the code that later uses the keys. So that I never read them is a rule I keep. It is not a lock.
- You can switch my access off at any time. Open the page named Workload Identity Pools. Press the pool's name. Press the switch named Status, then the button named Disable.

What is untested: pasting into that command window with VoiceOver. Google's pages say the window is not read aloud by itself. That is why the steps never ask you to read it. If the paste fails, there are two fallbacks. A helper who can see pastes the line for you. Or we use Google's forms instead. I estimate about 15 presses for the server, and more for the database and the storage space.

#### Later visits to Google Cloud

I give the exact steps when we reach each one.

- Stage 2: your setup phrase goes into the safe for keys.
- Stages 5 and 6: the AssemblyAI key and the Anthropic key go into the same safe.
- Before real patients: you leave the free trial, you accept the HIPAA agreement, and we raise the spending warning. Part F has the order.
- One fixed date. Leave the free trial by day 75 after sign-up. On day 90 everything stops. Thirty days after that, Google deletes it.
- An emergency stop, if a warning email worries you. Open console.cloud.google.com/billing/projects. In the project's row, open the menu named Actions. Choose Disable billing, and confirm. This stops the app at once. Some data may be lost for good. So tell me first if you can.

### Account 3. AssemblyAI, at assemblyai.com

- What for: the transcript. Needed for stage 5.
- Sign up. Add a payment card before the first upload. The page may ask for a deposit. I could not confirm the amount. Choose the smallest amount offered. If it is over $20, stop and tell me. Leave auto-pay off, because it charges your card by itself.
- On the page named Data Controls, turn on the switch named Opt Out of Data Sharing for Model Improvement Program. On means they may not train on your audio.
- On the same page, find the setting named time-to-live. It is a timer that deletes your files there by itself. Choose Custom and set one hour. If that is hard, choose 1 day.
- On the same page, find the part named Business Associate Agreement. It should say: Not signed. Do not press the button named Review and sign BAA yet. Tell me what the part says.
- Put the secret key into Google's safe for keys. Before stage 5, I ask you to confirm both settings.
- Cost: most likely $0, beyond any deposit.

### Account 4. Anthropic, at platform.claude.com

- What for: the analysis. Open it right after Google Cloud, so we learn the HIPAA answer. On that first visit, do only the last step in this list. If sign-up demands payment, stop and tell me.
- It is a different website from the Claude app, and it is billed apart.
- If your Claude plan is Max, Ultra or Team, it includes credit for this. Tell me before you connect your plan to this account. That connection is hard to change.
- Otherwise, before stage 6, buy $10 of credit. It lasts about three months here. It expires after one year and is not refunded. Leave auto-reload off. Set the monthly spend limit to $10.
- Put the secret key into Google's safe for keys.
- Last step: on the page named Data retention, find a section headed HIPAA compliance. If it is not there, choose Organization in the menu at the top of that page, and look once more. Tell me whether it is there. Do not press anything in it. Turning it on cannot be undone.

Not needed now: a web address that you own, and an email-sending service. Do not accept or sign any HIPAA agreement now, even where a page offers it. Each one is a legal act in the name of the account's owner. At Anthropic it cannot be undone. Part F says when.

## Part D. The build, in seven small stages

### How we work

- I build one stage and test it on my side first. My side is a copy of the app in my workspace, in a desktop browser set to iPhone, iPad and desktop sizes. I have no iPhone, no iPad and no VoiceOver.
- On Google itself I can open only pages that need no sign-in. So you are the first to test each signed-in page there.
- Everything on a real iPhone or iPad, and everything with VoiceOver, is tested only by you.
- Every test works by sight and with VoiceOver. Each test names the words to expect. Those words appear on the screen in large, clear type, and they stay there. VoiceOver speaks the same words. Where a test says you should see and hear something, either way counts. Tell me which way you tested.
- The earlier plan named only what you should hear. That was a gap. It is closed here.
- The look is my job. I put pictures of each new page beside the mockup and list every difference. The pictures come from a desktop browser, not from Safari.
- Before each stage goes live, a second AI helper that has not seen my reasoning checks it. It is not a person.
- I never see your secret keys. For stages 5 and 6, the Claude app can show you a secure form for a key. That form is the one exception to the rule about our chat. Type the key only into the form, never into a message. I can then use the key, but I cannot read it. The key stays saved in your Claude settings until you delete it. If the form fails, I test with stand-in answers and tell you.
- The Claude app will ask you to approve a few things, such as opening the app's web address. Before each one I say what it is for.
- I put no new version live while you are testing.
- If Google cannot start the app, I read the reason myself, through GitHub. You do not have to copy anything for me. This is better than in the earlier plan.
- The existing website is not touched. Its Sign in button still opens the mockup.

### Rules the build follows

- Every signed-in page says at the top: test version, made-up names and made-up recordings only.
- Secret keys stay in Google's safe for keys and on the server.
- Transcript text is saved only in our database. It passes through AssemblyAI, which makes it, and through Anthropic when you press Analyze. It is never written into the server's diary or kept by the browser.
- No patient name and no transcript text appears in a web address, in a file name or in any name at Google.
- If the server restarts during long work, the work picks up again or says stopped. Nothing may say working for longer than 15 minutes.
- Every button and field has a name you can see, and the same name spoken. Progress and errors are shown as words and spoken. Nothing is told by colour alone. A gold day also says transcript waiting. A green day also says analyzed.
- Everything I set up at Google is written down in files in the repository. So a second, clean copy for real patients can be made from the same files. Nothing is rebuilt.
- The look is copied from the mockup as it stands today, version 304. A few small fields get slightly larger type, so the iPhone does not zoom. Buttons for things not built yet are left off, the EgoAgent Guide included.
- Three small additions you did not ask for: a button that deletes a test day, working Read aloud and text-size buttons, and a page of test recordings. Say no and I leave them out.

### Stage 1. The new address opens

- Needs: the new repository, and the Google Cloud account with steps 1 to 47 done.
- I build: the bare app on Google, with the small test database, the storage space and the safe for keys. The sign-in page is in the existing look. It does not sign in yet. The address is one that Google gives. It ends in run.app.
- I measure how long the first page takes after a pause. I tell you the number.
- You test on your iPad: open the link I send. The first opening can take some seconds. Then you should see and hear the heading Sign in. Then two fields: Professional email, and Password. Then one button, named: Sign in and open your casebook. The button does nothing yet. Then open the link once on your iPhone.

### Stage 2. Real sign-in

- Needs: a setup phrase that you invent, at least 20 characters long. Capital letters and spaces count. You save it in your password app and put it into Google's safe for keys. I give the steps.
- I build: a setup page where you create your account with your setup phrase. Each phrase works once. Then sign in and sign out. After five wrong tries, sign-in pauses for 15 minutes. The setup page has the same pause.
- You test on your iPad: create your account and sign in. You should see and hear the heading Casebook. Sign out. Type a wrong password. You should see and hear: email or password is not right. Open the Casebook link while signed out. You should land on Sign in.

### Stage 3. One patient and the calendar

- I build: the smallest Casebook. You add a patient by a made-up first name and last initial, find the patient in the list, and move through the month calendar. Each day shows and speaks its number and its state.
- You test on your iPad: add a patient named Test P. Sign out and in. You should still see and hear Test P. in the list. Then add a second made-up patient on your iPhone.

### Stage 4. Upload

- I build: the upload box on the Casebook, where the mockup has it. It has a tick box that says the recording is made up, and a field where you confirm the day. The browser sends the recording in small pieces, straight to the private storage space at Google. Our server first gives the browser an upload address that works once. No key ever reaches the browser. Progress is shown and spoken at the start, at the half and at the end. In this stage the server reports the size and length, deletes the file, and checks that it is gone. On my side I test with a slowed connection and with a cut connection.
- Limits: files up to 200 megabytes. A photo or a larger file gets a refusal, shown and spoken.
- Test recordings: a page named Test files holds made-up recordings of 5, 50 and 90 minutes, and a short one with talk of self-harm. I make them with two computer voices reading sessions I invent. You tap one. Safari asks whether to download it. Choose Download. The file lands in the Downloads folder of the Files app. I have not tried this on a real iPad.
- Risk: sending straight from Safari to Google's storage space is untested on a real iPad. The fallback is that the pieces go through our own server, which passes them on. That costs nothing extra and needs no new account.
- You test on your iPad: record a five-minute made-up memo in Voice Memos. Share it and choose Save to Files. On the page, tick the box, choose that file and confirm the day. You should see and hear: upload started. Then: upload complete. Then: received and deleted. Next, upload the 90-minute test file. As soon as upload started appears, lock the iPad. Count to ten. Unlock it. The upload will most likely have paused. It should pick up where it stopped, or be complete, and say so. Then choose a photo, and see and hear the refusal. Then repeat the short upload on your iPhone, with the five-minute test file.

### Stage 5. Transcript

- Needs: the AssemblyAI account, and its key in Google's safe for keys.
- I build: the server gives AssemblyAI a link to the recording. The link works for one hour. The transcript comes back labelled Speaker A and Speaker B. It is saved under the patient and the day. The day turns gold and is labelled transcript waiting. One recording per day for each patient. If the day is taken, the page says so and asks for another.
- Deleting the audio: when the transcript is saved, or if transcription fails, our server deletes the recording at Google. It checks that the recording is gone. It also tells AssemblyAI to delete its own record, and checks that AssemblyAI reports it deleted. We cannot look inside AssemblyAI ourselves. The page shows the time of each deletion.
- Two safety nets: the rule at Google that deletes anything older than one day, and AssemblyAI's own timer of one hour. That timer can run late. In one rare case, a crash at the moment of hand-over, only the safety nets remove the copies.
- The app does not delete the copies on your iPad.
- You test on your iPad: upload the five-minute memo. You should see and hear: upload complete, you may lock the iPad. Do not lock it this first time. Within about two minutes you should see and hear: transcript ready. Open the day. Read or listen to the transcript, and find the time the audio was deleted. With one voice there is only Speaker A. That is correct. Sign out and in. The transcript is still there. Then repeat on a second day with the 50-minute test file. Then on a third day with one short made-up memo in Serbian.

### Stage 6. Analysis

- Needs: the Anthropic account, and its key in Google's safe for keys.
- I build: the Hour page shows one perspective, General Psychoanalytic, already chosen. The instruction is the one in your mockup: three to five short paragraphs, addressed to the therapist. I change three things. I add: answer in English. I take out the sample patient's name. I replace the older AI model and the short length limit that the mockup names. When you press Analyze, the server sends the transcript and the instruction to the Anthropic API. The analysis appears under the transcript and is saved. The day turns green and is labelled analyzed.
- If the AI fails, declines or is cut off, the page says so in plain words, shown and spoken. The transcript is safe. You can press again.
- You test on your iPad: open the day that holds the 50-minute test file and press Analyze. Within about three minutes you should see and hear: analysis ready. Read it or listen to it. Tell me whether it reads like a real consultation. If not, tell me what is missing, and I change the instruction. Sign out and in, and open it again. Then upload the test recording with talk of self-harm to a new day, and analyze it. We learn whether the AI declines such sessions.

### Stage 7. The whole path again, and the final check

- I do: every test of mine again. The 90-minute recording through the whole path. A restart of the server in the middle of the work. Desktop sizes. Then the second AI helper does a full review of the code and the security.
- You test on your iPad: the whole path, start to finish, with the 50-minute test recording. Then the same on your iPhone. If you have a Mac or a PC, sign in there once and open the saved day.
- Afterwards I send a short report: what works, what does not, and what was not tested.

### After stage 7

The first version ends here. It holds made-up recordings only. Part F lists what must happen before the first real patient recording.

## Part E. Five open questions for you

Each question has my recommended answer first. Your answers are recorded below, after Part F. Parts B, C and D now follow them.

### Question 1. How soon do you expect real patient recordings?

This decides where the app runs. The cost figures in this question are the earlier ones. Part B has the newer ones.

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

This part is new. It is for planning. It is not legal advice.

One limit first. The website of the United States health department refused my requests today. So I read none of its pages. Every point about the law in this part comes from search summaries or from memory. The lawyer must confirm each one.

### Start now, alongside the build. These are yours.

1. The lawyer. Engage a lawyer who knows health privacy law in your state. Do it this week. It is the longest wait on this list. Your own main page says it is not for publication until counsel answers. I estimate one to two weeks to engage, and three to six weeks of work.
2. What the lawyer decides. Who legally owns EgoAgent and signs the agreements. The consent form for recording, by your state's law. Whether a transcript counts as psychotherapy notes, which decides what a patient may ask to see. Yes, no or reworded for each promise on the public pages. How long transcripts are kept.
3. The owner of the accounts. This is the first new question below. If a company must be registered first, start now. I estimate one to three weeks.
4. Three looks, with no press. Google's HIPAA page, in step 40. The agreement part at AssemblyAI. The HIPAA section at Anthropic. If Anthropic's section is missing, write to its sales team the same day. I draft the message for you.
5. A security review by a person. Book it now, for the week after stage 7. I estimate two to six weeks to book, one week for the review, and one to two weeks for my fixes.
6. Insurance. Ask your broker whether your cover allows recording and AI analysis. This is my judgement, not a rule that I verified.

### Built by me, alongside or right after stage 7

None of these is in the seven stages. I show you each one, with its price, before I build it.

7. A second sign-in step for the app, such as a code from a phone app.
8. Sign-out by itself after a pause. And a record of who opened or deleted what.
9. A consent check. The app refuses an upload until you confirm a signed consent for that patient.
10. A list of every promise on the public pages, each beside what the system really does. It is for you and the lawyer. The rule for how long transcripts are kept is one item. The main page and the demo page describe two different rules today.
11. The short written rules that the law asks for. How risks were weighed. What happens after a data leak. How a backup is restored. I draft them. You, the lawyer and the reviewer check them.

### Last, just before the first real recording

12. A clean live copy, apart from the test copy. It is the same code, set up from the same files. It gets the real-size database, fresh secret keys, and Google's own record of who read data, switched on. Then I restore one backup as a test.
13. My access to the live copy is cut down. I can publish a new version only after your yes. I cannot read the database or the recordings. The reviewer checks this. The reason: the AI builder and GitHub have no HIPAA agreement.
14. You leave Google's free trial. You press Activate. Do this by day 75 at the latest.
15. You accept the three agreements, in this order: Google, AssemblyAI, Anthropic. Each in the name of the legal owner. Each after the lawyer's yes. Save your own proof each time: a picture of the page, the date, the time, and the email you were signed in with.
16. At Anthropic the HIPAA setting is permanent and covers the whole account space. So real patient work gets its own account space there. I give the steps then. I have not confirmed them.
17. The whole path once more, on the live copy, with a made-up recording. Accepting changes some settings. AssemblyAI's timer moves to 72 hours and must be set back to one hour. Anthropic then refuses features that the agreement does not cover.
18. Go or no-go. It is your decision. The reviewer's findings are fixed. The restore worked. The lawyer has said yes in writing to the pages and the consent form. Then one consenting patient.

From that day on, never paste real transcript text, real names or real server records into our chat.

### Is one to three months realistic?

- Three months: realistic. The conditions: the lawyer and the owner question start in the first week, and the first real use is you alone, with one consenting patient. This is my judgement.
- One month: unlikely. By my estimates, the lawyer and the security review alone take longer.
- Three things set the date. The lawyer. The security review with its fixes. And the build, which waits for your test after each stage.
- What would break three months: the lawyer starts late or asks for a redesign. Anthropic's HIPAA route is closed to you. The review finds serious faults. Upload fails on your iPad. Or the first real version must also have other therapists, Serbian, or consent by email.
- One fixed date: Google's free trial ends 90 days after you sign up.

## Your answers

- Question 1, changed on 15 November 2026: soon. You intend to have real patients within one to three months. The app starts on Google Cloud.
- Question 2: English, plus one short Serbian memo in stage 5.
- Question 3: private. A new repository named egoagent-app.
- Question 4: only you sign in.
- Question 5: one EgoAgent email on the three accounts.

Questions 2 to 5 are the recommended answers. Question 1 is your own choice. Parts B, C and D are rewritten for it.

## Two new questions for you

### New question 1. In whose name do you open the Google Cloud account?

Google asks for Individual or Business at sign-up. It can never be changed. The HIPAA agreement is later accepted in that name.

- Answer 1, recommended if it exists today: a registered company or practice that will own EgoAgent. Then choose Business, in its name. Nothing is opened twice.
- Answer 2, recommended if no such company exists yet: your own name, as Individual, for the test copy only. The lawyer decides in the first weeks who must own the live copy. If that is a company, you open one more Google account in its name later. I estimate one hour. No code is rebuilt.
- Answer 3: wait for the lawyer before opening anything. Then the build waits too. I do not recommend this.

### New question 2. Which device will you use for the Google set-up?

- Answer 1, recommended: a Mac with the Chrome browser. It is the pairing Google recommends for VoiceOver.
- Answer 2: another desktop computer. Tell me which, and which screen reader.
- Answer 3: the iPad only. Then we use Safari and treat every screen as untested. Plan for a helper who can see, above all at the card screen.

## What was checked, and what was not

- Read on each company's own pages on 15 November 2026. Google Cloud: the HIPAA help page, the agreement text, the covered list, the price pages for the server, the database and the storage space, the free trial terms, and the pages on budgets and projects. AssemblyAI: prices, languages, links to recordings, deletion and agreement terms. Anthropic: prices and agreement terms.
- Checked against the repository files: every statement in Part A.
- Calculated by me: every monthly Google sum. They use Google's list prices for Iowa, at 730 hours a month.
- Not confirmed about Google's HIPAA agreement: the seven points listed in Part B.
- Not confirmed: the exact screens of the Google Cloud sign-up, which I could not open. The deposit at AssemblyAI. Whether $10 is an allowed credit purchase at Anthropic. GitHub's price page, which was blocked today. The Voice Memos steps, because Apple's help page was blocked.
- Not read at all: the United States health department's pages. Every legal point in Part F needs the lawyer.
- Not run: nothing was tried against Google with a real account. The setup line, the upload to Google's storage space and the link for AssemblyAI are designs taken from the companies' pages. Stages 1, 4 and 5 prove them.
- Not checked: how well the pages of Google Cloud, AssemblyAI and Anthropic work with VoiceOver. For Google I have only Google's own advice: VoiceOver with Chrome on a Mac.
- Not tested on a real device: nothing has run on an iPhone or iPad yet. A browser reference that I read today warns about the iPhone's file chooser. It does not handle a chooser that asks for audio only. Stage 4 is built to avoid this and to test it.
- Not tested: whether two computer voices are told apart as two speakers, and how often the AI declines talk of self-harm. Stages 5 and 6 test both.

## What I need from you now

- I stop here. I build nothing until you approve.
- Your change to question 1 is recorded above.
- I need your answers to the two new questions.
- Say approved, or tell me what to change.
- This plan is saved as PLAN.md on the branch named thin-path-plan. The main branch and every other file are untouched.
