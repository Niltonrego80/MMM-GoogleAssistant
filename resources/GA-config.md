# Google Assistant configuration

1. in a browser open [Google Developers Console](https://console.developers.google.com/apis)

  you must logon with a google userid
  ![project page](./GA_devconsole.png)

2. create a new project

  open the dropdown (says fribble in this picture) next to Google APIs
  ![new project](./create_project.png)

  top right, push **NEW PROJECT**, it **MUST** be connected to a valid credit card billing account
  ![project_form](./new_project.png)
  provide some name so you can find it later

  push **CREATE**
  ![project_select](./select_project.png)
  click **SELECT PROJECT**

3. enable apis needed by project

  ![no apis](./no-apis.png)
  click **ENABLE APIS AND SERVICES**

  ![search api](./api-search.png)
  type **assist**

  ![select api](./ga-api.png)
  click the **Google Assistant API** box

  ![need to enable](./need_to_enable.png)
  click **ENABLE**

4. create credentials needed by app tp access apis

  ![create creds](./create_credentials.png)
  click **CREATE CREDENTIALS** upper right

  ![start creds](./start_creds.png)
  drop down api are you using

  select Google Assistant API
  ![start creds](./next_creds.png)

  select web server node js/tomcat,
  select user data
  ![start creds](./server-creds.png)
  push **what Credentials do I need** button

  ![start creds](./oath-popup.png)
  push **SET UP CONSENT SCREEN** button

5. setup access consent screen

  ![start creds](./oauth-consent.png)
  enter some name, doesn't matter what you use

  select the support email box, your email (from your logged on account) should be filled in here

  ![start creds](./consent-1.png)

  scroll down to bottom of page
  ![start creds](./consent2.png)
  push **Save**

6. finish creating credentials

  ![start creds](./consent-finished.png)
  click **Credentials** in the left navigation area

  click **CREATE CREDENTIALS**
  ![start creds](./setup-creds.png)

  click **OAuth client ID**

  ![start creds](./creds-type.png)
  select **Desktop App**

  ![start creds](./creds-created.png)
  click **OK**

7. download credentials file

  ![start creds](./creds-download.png)
  click the down arrow to the right to download the credentials file,

  it will have a long generated name like, <br>
  **client_secret_178141000278-92hku401cvcs19uuqv57b3t9drcvml56.apps.googleusercontent.com.json**

  you need to copy this file from the Downloads folder to the<br>
   ~/MagicMirror/modules/MMM-GoogleAssistant folder with the name **credentials.json** (you can do that with a copy and then rename)

  we also need the project ID for the plugin configuration above
  select the project name in the dropdown top left, and this panel will pop up
  copy/paste the project ID from the right hand column of this project
  ![start creds](./get-project-id.png)
