# EgoAgent: plan for the first working version

Status: plan only. Nothing is built. No existing file is changed.
Written 15 November 2026.

## The plan in short

- The goal is the five steps in your brief, unchanged.
- Your fixed rules and your left-out list hold.
- Cost now: about $16 a month.
- Cost with real patients: about $520 a month if the app stays where it starts. Roughly $60 to $110 a month after a move. Question 1 is about this.
- You open three accounts. I estimate one hour in all.
- I build seven stages. You test each one on your iPad. I estimate 10 to 30 minutes for each test. Expect to repeat some tests after a fix, because I cannot try Safari or VoiceOver myself.
- I cannot promise a date. Each stage waits for your test.
- I need your answers to five questions. They are in Part E.

## Words used in this plan

- Secret key: a long password that lets our server use another company's service.
- HIPAA agreement: the HIPAA business associate agreement, often written B A A. A company signs it before it may handle patient data for you.
- VoiceOver: the screen reader built into the iPad and the iPhone. I build for it. Tell me if you use another.

## Part A. What is in the repository now

- It is a design mockup of 16 files: one main page with nine screens, one walkthrough page, one helper script, ten films, two pictures and one empty settings file. GitHub shows it as plain web pages. No server stands behind it.
- The look is settled. Dark pages and gold headings. Night blue for sign in. Study green for the Casebook, Case and Hour screens.
- Nothing real runs. Sign in is only a link. Anyone can open the Casebook by typing its address. The patients and the transcript are samples. The upload box reads only the file's name and date.
- The Analyze button calls Anthropic straight from the page, with no secret key. On a public website that cannot work.
- General Psychoanalytic already exists, with a one-sentence instruction.
- The pages make many promises. Three bear on this first version, and the plan keeps them. The audio is deleted after transcription. The material is never used to train AI. Nothing is analyzed until the therapist presses the button.

## Part B. The choices: server, database, sign-in and transcription

Every price and agreement fact below was read on the company's own pages on 15 November 2026. Where that is not so, I say it. Now means this first version. Later means before the first real patient recording.

### 1. The server: Render

- Choice: Render's smallest always-on server.
- Reason: it has the fewest steps for you. You sign in with GitHub and approve one setup file. After that, each new version I make goes live by itself. That it is the simplest is my judgement.
- Cost now: $7 a month.
- HIPAA agreement later: yes, but it is costly. Render signs it only on its Scale plan or higher. Scale costs $499 a month. On top you still pay for the server and the database, plus a 20 percent fee on them. The Render bill then becomes about $515 a month. The sum is my calculation. You sign online, with no sales call.
- Because of that price, I build the app so that it can move. Question 1 in Part E asks you to choose.

### 2. The database: Render Postgres

- Choice: Render's smallest paid database. It is Postgres, a standard database that runs at almost every hosting company.
- Reason: it sits in the same Render account. There is nothing extra to open.
- Cost now: $6.30 a month, storage included.
- HIPAA agreement later: yes. The same Render agreement covers it.

### 3. Sign-in: built into the app

- Choice: sign-in is part of our own app. It uses the sign-in system of Django, a long-established free toolkit for building websites.
- Reason: there is no extra company, no extra account and no extra agreement.
- Cost now: $0 a month.
- HIPAA agreement later: none is needed for sign-in by itself. The server and database agreement covers it.

### 4. Transcription: AssemblyAI

- Choice: AssemblyAI.
- Reason: you can sign its HIPAA agreement yourself, online, at no extra charge. Of the ten services I compared, it is the only specialist where I could confirm that.
- Cost now: about $2.30 a month, for ten hours of test audio. That is 23 cents an hour, including speaker labels, which tell the voices apart. New accounts get $50 of free credit. So the first version should cost nothing here.
- HIPAA agreement later: yes. It needs a payment card on file.
- Weak point: Serbian. Your website offers Serbian. Their best model does not. Their wider model does, but by their own figures more than half the words come out wrong. Question 2 in Part E is about this.

### 5. The AI: the Anthropic API

You fixed this choice. This is what I checked.

- Model: Claude Opus 5.5. A model is one version of the AI. Anthropic's pages recommend starting with it. A cheaper model would save about $1.50 a month.
- Cost now: about 20 cents for one analysis. Fifteen a month is about $3. This is my calculation from Anthropic's price list.
- HIPAA agreement later: yes, with one unknown. One Anthropic page says eligible organizations accept it themselves inside their account. It does not say who is eligible. A help article says to contact the sales team. We learn which applies when you open the account.
- Anthropic's terms say it may not train its models on your content. Its standard setting keeps the text for up to 30 days. Text flagged by its safety system can be kept for up to two years.

### Total monthly cost

- Now: about $16 a month. That is $13.30 to Render and about $3 to Anthropic. AssemblyAI is free while its credit lasts.
- Later, staying on Render: about $520 a month. That is the Render bill of about $515, plus about $5 for transcription and the AI.
- Later, after a move to Google Cloud: roughly $60 to $110 a month. The low figure uses the smallest database that Google does not rule out for real use. The high figure adds a standby copy. This is my calculation from Google's price pages.
- Google's HIPAA pages say you accept its agreement by a click, at no extra price. One other Google page says to talk to an account manager. We check this before any move.
- A third host, Fly.io, may cost about $145 a month later. It is the same kind of host as Render, so a move there should need little rebuilding. I saw its prices in search results only. Say so if you want me to check it.
- A promise. I add no paid part without telling you the price and getting your yes.
- Not counted: sales tax, and your Claude plan, which the build itself uses. If your Claude plan reaches its limit, the build waits until it resets.

## Part C. Accounts you open, in order

Three rules first.

- Never paste a secret key into our chat, into GitHub or into an email. If one lands there by mistake, tell me. We cancel it and make a new one.
- One warning about Render. Each setting there has two boxes. The box called Key is for the setting's name. I give you that name. Your secret goes into the box called Value.
- When we reach each account, I give you the exact steps. I cannot see your screens. If VoiceOver says a different name, tell me what it says.

### Account 1. GitHub

- You already have it. Cost: $0 a month. It holds code only, so it needs no HIPAA agreement.
- If you agree with question 3, you create a new private repository named egoagent-app, and you allow Claude to work in it. Then you tell me in this same conversation.
- Turn on two-step sign-in for GitHub. It asks for a code from your phone at each sign-in. Save the recovery codes GitHub gives you. Your Render account will depend on GitHub.

### Account 2. Render, at render.com

- What for: the server and the database. Needed for stage 1.
- Sign up with your GitHub account. If Render asks you to pick a plan, choose Hobby, at $0 a month. Add a payment card. Render tests it with a $1 charge and refunds it.
- Then wait until I say the setup file is ready.
- During setup, GitHub asks which repositories Render may read. Choose egoagent-app. Render asks for one value: a setup phrase that you invent, at least 20 characters long. Save it in your password app for stage 2. Capital letters and spaces count.
- Then read me the web address that Render shows.
- Cost: $13.30 a month, from the day the server exists until you delete it.

### Account 3. AssemblyAI, at assemblyai.com

- What for: the transcript. Needed for stage 5.
- Sign up. Add a payment card before the first upload. The page may ask for a deposit. I could not confirm the amount. Choose the smallest amount offered. If it is over $20, stop and tell me. Leave auto-pay off, because it charges your card by itself.
- On the page named Data Controls, turn on the switch named Opt Out of Data Sharing for Model Improvement Program. On means they may not train on your audio.
- On the same page, find the setting named time-to-live. It is a timer that deletes your files there by itself. Choose Custom and set one hour. If that is hard, choose 1 day.
- Put the secret key into Render. Before stage 5, I ask you to confirm both settings.
- Cost: most likely $0, beyond any deposit.

### Account 4. Anthropic, at platform.claude.com

- What for: the analysis. Open it right after Render, so we learn the HIPAA answer. On that first visit, do only the last step in this list. If sign-up demands payment, stop and tell me.
- It is a different website from the Claude app, and it is billed apart.
- If your Claude plan is Max, Ultra or Team, it includes credit for this. Tell me before you connect your plan to this account. That connection is hard to change.
- Otherwise, before stage 6, buy $10 of credit. It lasts about three months here. It expires after one year and is not refunded. Leave auto-reload off. Set the monthly spend limit to $10.
- Put the secret key into Render.
- Last step: on the page named Data retention, listen for a section headed HIPAA compliance. If you do not hear it, choose Organization in the menu at the top of that page, and listen once more. Tell me whether it is there. Do not press anything in it. Turning it on cannot be undone.

Not needed now: a web address that you own, and an email-sending service. Do not sign any HIPAA agreement now, even where a page offers it. At Render that step needs the $499 plan and cannot be undone.

## Part D. The build, in seven small stages

### How we work

- I build one stage and test it on my side first. My side is a copy of the app in my workspace, in a desktop browser set to iPhone, iPad and desktop sizes. I have no iPhone, no iPad and no VoiceOver.
- On Render itself I can open only pages that need no sign-in. So you are the first to test each signed-in page there.
- Everything on a real iPhone or iPad, and everything with VoiceOver, is tested only by you. Each test tells you the words you should hear. If you hear them, the test passes.
- The look is my job. I put pictures of each new page beside the mockup and list every difference. The pictures come from a desktop browser, not from Safari.
- Before each stage goes live, a second AI helper that has not seen my reasoning checks it. It is not a person.
- I never see your secret keys. For stages 5 and 6, the Claude app can show you a secure form for a key. That form is the one exception to the rule about our chat. Type the key only into the form, never into a message. I can then use the key, but I cannot read it. The key stays saved in your Claude settings until you delete it. If the form fails, I test with stand-in answers and tell you.
- The Claude app will ask you to approve a few things, such as opening the app's web address. Before each one I say what it is for.
- I put no new version live while you are testing.
- If Render cannot start the app, only you can see why. I then ask you to copy the last lines of Render's page named Logs.
- The existing website is not touched. Its Sign in button still opens the mockup.

### Rules the build follows

- Every signed-in page says at the top: test version, made-up names and made-up recordings only.
- Secret keys stay on the server.
- Transcript text is saved only in our database. It passes through AssemblyAI, which makes it, and through Anthropic when you press Analyze. It is never written into the server's own records or kept by the browser.
- If the server restarts during long work, the work picks up again or says stopped. Nothing may say working for longer than 15 minutes.
- Every button and field has a spoken name. Progress and errors are spoken.
- The look is copied from the mockup as it stands today, version 304. A few small fields get slightly larger type, so the iPhone does not zoom. Buttons for things not built yet are left off, the EgoAgent Guide included.
- Three small additions you did not ask for: a button that deletes a test day, working Read aloud and text-size buttons, and a page of test recordings. Say no and I leave them out.

### Stage 1. The new address opens

- Needs: the new repository and the Render account.
- I build: the bare app on Render, with the sign-in page in the existing look. It does not sign in yet.
- You test on your iPad: open the link I send. You should hear the heading Sign in. Then two fields: Professional email, and Password. Then one button, named: Sign in and open your casebook. The button does nothing yet. Then open the link once on your iPhone.

### Stage 2. Real sign-in

- I build: a setup page where you create your account with your setup phrase. Each phrase works once. Then sign in and sign out. After five wrong tries, sign-in pauses for 15 minutes. The setup page has the same pause.
- You test on your iPad: create your account and sign in. You should hear the heading Casebook. Sign out. Type a wrong password. You should hear: email or password is not right. Open the Casebook link while signed out. You should land on Sign in.

### Stage 3. One patient and the calendar

- I build: the smallest Casebook. You add a patient by a made-up first name and last initial, hear the patient list, and move through the month calendar. Each day speaks its number and its state.
- You test on your iPad: add a patient named Test P. Sign out and in. You should still hear Test P. in the list. Then add a second made-up patient on your iPhone.

### Stage 4. Upload

- I build: the upload box on the Casebook, where the mockup has it. It has a tick box that says the recording is made up, and a field where you confirm the day. The browser sends the recording in small pieces. Progress is spoken at the start, at the half and at the end. In this stage the server reports the size and length, then deletes the file. On my side I test with a slowed connection and with a cut connection.
- Limits: files up to 200 megabytes. A photo or a larger file gets a spoken refusal.
- Test recordings: a page named Test files holds made-up recordings of 5, 50 and 90 minutes, and a short one with talk of self-harm. I make them with two computer voices reading sessions I invent. You tap one. Safari asks whether to download it. Choose Download. The file lands in the Downloads folder of the Files app. I have not tried this on a real iPad.
- Risk: if sending in pieces fails on your devices, the fallback is a private storage space at Amazon or Google. That means one more account, and one more HIPAA agreement later. I would ask you first.
- You test on your iPad: record a five-minute made-up memo in Voice Memos. Share it and choose Save to Files. On the page, tick the box, choose that file and confirm the day. You should hear: upload started. Then: upload complete. Then: received and deleted. Next, upload the 90-minute test file. As soon as you hear upload started, lock the iPad. Count to ten. Unlock it. The upload will most likely have paused. It should pick up where it stopped, or be complete, and say so. Then choose a photo and hear the refusal. Then repeat the short upload on your iPhone, with the five-minute test file.

### Stage 5. Transcript

- Needs: the AssemblyAI account.
- I build: the server hands the recording to AssemblyAI. The transcript comes back labelled Speaker A and Speaker B. It is saved under the patient and the day. The day turns gold and is labelled transcript waiting. One recording per day for each patient. If the day is taken, the page says so and asks for another.
- Deleting the audio: our server removes its copy as soon as the recording is handed over. When the transcript is saved, or if transcription fails, our server tells AssemblyAI to delete the recording. It then checks that AssemblyAI reports it deleted. We cannot look inside AssemblyAI ourselves. The page shows the time of deletion. In one rare case, a crash during the hand-over, only AssemblyAI's own timer deletes the recording, and that timer can run late. The app does not delete the copies on your iPad.
- You test on your iPad: upload the five-minute memo. You should hear: upload complete, you may lock the iPad. Do not lock it this first time. Within about two minutes you should hear: transcript ready. Open the day. Hear the transcript, and the time the audio was deleted. With one voice you hear only Speaker A. That is correct. Sign out and in. The transcript is still there. Then repeat on a second day with the 50-minute test file. Then on a third day with one short made-up memo in Serbian.

### Stage 6. Analysis

- Needs: the Anthropic account.
- I build: the Hour page shows one perspective, General Psychoanalytic, already chosen. The instruction is the one in your mockup: three to five short paragraphs, addressed to the therapist. I change three things. I add: answer in English. I take out the sample patient's name. I replace the older AI model and the short length limit that the mockup names. When you press Analyze, the server sends the transcript and the instruction to the Anthropic API. The analysis appears under the transcript and is saved. The day turns green and is labelled analyzed.
- If the AI fails, declines or is cut off, the page says so in plain words. The transcript is safe. You can press again.
- You test on your iPad: open the day that holds the 50-minute test file and press Analyze. Within about three minutes you should hear: analysis ready. Listen to it. Tell me whether it reads like a real consultation. If not, tell me what is missing, and I change the instruction. Sign out and in, and open it again. Then upload the test recording with talk of self-harm to a new day, and analyze it. We learn whether the AI declines such sessions.

### Stage 7. The whole path again, and the final check

- I do: every test of mine again. The 90-minute recording through the whole path. A restart of the server in the middle of the work. Desktop sizes. Then the second AI helper does a full review of the code and the security.
- You test on your iPad: the whole path, start to finish, with the 50-minute test recording. Then the same on your iPhone. If you have a Mac or a PC, sign in there once and open the saved day.
- Afterwards I send a short report: what works, what does not, and what was not tested.

### After stage 7. What must happen before real patient data

None of this is in the first version.

- The three HIPAA agreements are signed: the server and database, AssemblyAI, and Anthropic.
- A second sign-in step is added, such as a code from a phone app.
- A lawyer has checked the promises on the public pages against what the system really does.
- A person who is a security expert has reviewed the app.
- The rule for how long transcripts are kept is settled. The main page and the demo page describe two different rules today.

## Part E. Five open questions for you

Each question has my recommended answer first. Parts B, C and D assume the recommended answers. If you choose another, I change those parts and show you before I build.

### Question 1. How soon do you expect real patient recordings?

This decides where the app runs.

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

- Answer 1, recommended: only you. One account. No password-reset emails. If you forget the password, you put a new setup phrase into Render and use the setup page once more.
- Answer 2: you and a few colleagues. Then password-reset emails are needed now. That means a web address that you own, one more account, and one more stage.

### Question 5. Whose name and which email go on the three accounts?

- Answer 1, recommended: one email address that you will keep for EgoAgent. If EgoAgent is a registered company, use the company's name. Each HIPAA agreement is later signed for the organization that owns the account. Changing the owner later is extra work.
- Answer 2: your personal name and email for now. That is fine for made-up data. We may have to open new accounts before real patients.

## Your answers, given 15 November 2026

- Question 1: not soon, or unsure. The app starts on Render.
- Question 2: English, plus one short Serbian memo in stage 5.
- Question 3: private. A new repository named egoagent-app.
- Question 4: only you sign in.
- Question 5: one EgoAgent email on the three accounts.

All five are the recommended answers. So Parts B, C and D stand as written.

## What was checked, and what was not

- Read on each company's own pages on 15 November 2026. Render: prices and HIPAA terms. AssemblyAI: prices, languages, deletion and agreement terms. Anthropic: prices and agreement terms. Google Cloud: prices and agreement terms.
- Checked against the repository files: every statement in Part A.
- Not confirmed: Fly.io's prices. Render's largest upload size, which Render does not publish. The deposit at AssemblyAI. Whether $10 is an allowed credit purchase at Anthropic. The exact steps of Google's click to accept. The Voice Memos steps, because Apple's help page was blocked.
- Not checked: how well the account pages of Render, AssemblyAI and Anthropic work with VoiceOver. My remark that Google Cloud is harder is an estimate.
- Not tested on a real device: nothing has run on an iPhone or iPad yet. A browser reference that I read today warns about the iPhone's file chooser. It does not handle a chooser that asks for audio only. Stage 4 is built to avoid this and to test it.
- Not tested: whether two computer voices are told apart as two speakers, and how often the AI declines talk of self-harm. Stages 5 and 6 test both.

## What I need from you now

- I stop here. I build nothing until you approve.
- Your five answers are recorded above.
- Say approved, or tell me what to change.
- This plan is saved as PLAN.md on a new branch named thin-path-plan. The main branch and every existing file are untouched.
