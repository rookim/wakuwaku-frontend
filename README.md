# **wakuwaku Frontend** <img src="https://media.giphy.com/media/MUQh4OnHr2z5ttrFkm/giphy.gif" width="60">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" height="35"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" height="40"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="35" />

## **Check It Out!**

wakuwaku is officially _[deployed](https://waku-waku.netlify.app/)_! You can either click on that link, or type in this URL: https://waku-waku.netlify.app.

## **Overview**

This is the codebase for the frontend of my web app wakuwaku. It is a part of my capstone project during my time at the Actualize Coding Bootcamp. You can also check out the [backend](https://github.com/rookim/wakuwaku-api)!

My main motivation behind building this app was wanting to have fun. Now don't get me wrong, I would've enjoyed the process no matter what I built. However, my instructor pretty much gave us free reign, and being a huge anime enthusiast, I naturally gravitated towards making an app that was anime-related! This was how wakuwaku was born!

wakuwaku (all lowercase) is a program that allows users to make an account to easily keep track of all the upcoming episodes in their favorites list. As such, it is primarily for anime watchers who enjoy keeping up with current anime. For me personally, I am usually watching anywhere from 7 to 9 ongoing anime (depending on the season), and it's hard to remember exactly when episodes of each anime I'm watching airs. So, I wanted a place where I can easily see that information.

_Welcome to wakuwaku!_

You can watch [this video](https://vimeo.com/697800031) where I demo wakuwaku in its entirety if you don't feel like reading the wall of text below ㅇㅈㅇ

## **Name Origins**

If you don't speak Japanese or if you don't watch anime, you're probably wondering what in the world wakuwaku means! To put it simply, the word wakuwaku (わくわく) is Japanese onomatopoeia for excitement or nervousness. This was the perfect word for my web app because I get SO excited when a new episode releases. My significant other, who knows nothing about anime and programming (read: a normie haha!), also gave his seal of approval, and so that made it a done deal.

## **Disclaimer**

This web app is more a proof of concept and an understanding of web app fundamentals rather than an actual product. It can most certainly still be used for its intended purpose (look up ongoing anime and see when the next episode comes out), but because of the third-party API I am using, web responses are slow, and therefore, wakuwaku is slow. Features like linking your Google Calendar and text messaging through Twilio are also not available to everyone that uses wakuwaku due to limitations such as waiting on Google approval to use their services and hefty prices that could potentially be incurred.

## **Features**

- **Account Creation**

  Users can signup for an account. This will allow them to save anime to their favorites list and have information of all anime they're watching in one place.

- **Next Episode Info**

  Each anime is organized into cards. Each card will supply the name of the anime, the current season, and details about the upcoming episode. Here's an example:

  ![kaguya-sama card example](public/kaguya-sama-card.png)

- **Google OAuth2**

  Users can sign in with their Google account to view their Google Calendar events in wakuwaku's calendar interface. It is worth noting that only users whose google account I have manually approved in my Google Console can access this feature. But do not fear! You can [watch me](https://vimeo.com/697800031#t=4m20s) demo this feature instead :)

- **Text Message Notifications**

  wakuwaku will send users a text message anytime an anime is added to their favorites list. I am using the free trial of the Twilio API, which means I can only send texts to phone numbers that have been verified. Essentially, Twilio will have me manually register a phone number and then verify it by entering the code that was sent to the number. That definitely does not work for a user I don't know personally. But no worries! You can [watch me](https://vimeo.com/697800031#t=2m32s) demo this feature.

- **Discord Bot**

  Beep boop, I made a discord bot! This cute bot can pull from my backend to tell users when the next episode of an anime airs. It can also tell you all the anime in your favorites list of your wakuwaku account!! [Watch me](https://vimeo.com/697800031#t=6m34s) demo it, pretty please!

## **Credits**

This app would not have been possible without the help of these awesome APIs, libraries and modules.

### **APIs**

- [TVmaze API](https://www.tvmaze.com/api): This is the third-party API where I'm pulling all my anime information from. This includes the title of the anime, when the next episode airs, the current season, pictures, and more.
- [Google Calendar API](https://developers.google.com/calendar/api): This allows me access to a user's Google Calendar events. With the user's approval, I then pull that information on to a calendar interface in wakuwaku.
- [Twilio API](https://www.twilio.com/sms): I can communicate with users via text messages thanks to this nifty API! My usage of this API in wakuwaku, however, was very limited because I am using the free trial.

### **JavaScript Libraries**

- [Day.js](https://day.js.org/): I used this library to implement relative timing, which allows for users to know in how many days, hours, and minutes the next episode of an anime airs.
- [FullCalendar](https://fullcalendar.io/): This is how I was able to implement an actual calendar into wakuwaku. It displays both anime episode information and the user's Google Calendar events!
- [Vuelidate](https://vuelidate.js.org/): I implemented frontend validations for when a user creates an account using this library. For example, it can detect a valid email and make sure that the inputted username and password meet certain requirements.

### **Node Modules**

- [axios](https://www.npmjs.com/package/axios): An awesome promise-based HTTP client to make web requests.
- [vue3-google-oauth2](https://github.com/guruahn/vue3-google-oauth2): In order to pull from the user's Google Calendar in the front place, I have to first have the user sign in with their Google credentials. This process was made much simpler with this module! It is Vue3 specific.
- [discord.js](https://discord.js.org/#/): A powerful module that makes communicating with the Discord API straightforward and simple!
- [Vue Router](https://router.vuejs.org/): Page navigation is made easy in Vue.js with this module! I believe it's the official router for Vue applications.
