# Thea - Din portal til studentidrettsnorge og [eufori](https://no.wikipedia.org/wiki/Eufori)

In order to get things working, you need one file named "settings.json". This file is added to .gitignore, so it wont be included in the repository. The contents of the file should be something like the following:

<pre>
<code>
{
    "frontend":
    {
        "api_base_url": "http://localhost:8080/thea-backend/v1/",
        "payment_redirect_url": "http://127.0.0.1/thea2/entry_frontend/completed.php",
        "entry_frontend_base_url": "http://127.0.0.1/thea2/entry_frontend",
        "thea_app_base_url": "http://127.0.0.1/thea2/thea_app"
    }
}
</code>
</pre>

The URL should of course point to the correct URL in your development environment. On the production server for instance, the values are set to the values below:

<pre>
<code>
{
  "frontend":
  {
    "api_base_url": "https://thea.grevlingbo.no:8443/thea-backend/v1/",
    "payment_redirect_url": "https://pamelding.theachnology.com/completed.php",
    "entry_frontend_base_url": "https://pamelding.theachnology.com",
    "thea_app_base_url": "https://thea.theachnology.com"
  }
}
</code>
</pre>
